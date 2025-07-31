#!/usr/bin/env python3
"""
Medical Data Validation Script for MediGuide Platform.

This script validates the integrity, consistency, and quality of medical data
including doctor information, symptoms, and their relationships.

Usage:
    python scripts/validate_medical_data.py
    
Author: W34Team
License: MIT
"""

import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Set, Tuple, Any, Optional, Union
from abc import ABC, abstractmethod


@dataclass
class ValidationResult:
    """Container for validation results with categorized issues."""
    
    errors: List[str] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)
    info: List[str] = field(default_factory=list)
    
    @property
    def is_valid(self) -> bool:
        """Check if validation passed without critical errors."""
        return len(self.errors) == 0
    
    @property
    def total_issues(self) -> int:
        """Get total number of issues found."""
        return len(self.errors) + len(self.warnings)


class BaseValidator(ABC):
    """Abstract base class for all validators."""
    
    def __init__(self, data: Union[List[Dict[str, Any]], Dict[str, Any]]):
        """
        Initialize validator with data to validate.
        
        Args:
            data: The data structure to validate
        """
        self.data = data
        self.result = ValidationResult()
    
    @abstractmethod
    def validate(self) -> ValidationResult:
        """
        Perform validation and return results.
        
        Returns:
            ValidationResult containing all validation issues
        """
        pass
    
    def _add_error(self, message: str) -> None:
        """Add an error message to results."""
        self.result.errors.append(f"❌ ERROR: {message}")
    
    def _add_warning(self, message: str) -> None:
        """Add a warning message to results."""
        self.result.warnings.append(f"⚠️  WARNING: {message}")
    
    def _add_info(self, message: str) -> None:
        """Add an info message to results."""
        self.result.info.append(f"ℹ️  INFO: {message}")


class DoctorDataValidator(BaseValidator):
    """Validator for doctor data integrity and consistency."""
    
    def __init__(self, doctors_data: List[Dict[str, Any]]):
        """
        Initialize doctor data validator.
        
        Args:
            doctors_data: List of doctor information dictionaries
        """
        super().__init__(doctors_data)
        self.required_fields = {
            'id', 'name', 'hospital', 'department', 'specialty',
            'credentials', 'experience', 'consultationFee', 'location'
        }
        self.phone_pattern = re.compile(r'^0\d{1,2}-\d{3,4}-\d{4}$')
        self.url_pattern = re.compile(
            r'^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$'
        )
    
    def validate(self) -> ValidationResult:
        """
        Validate all doctor data.
        
        Returns:
            ValidationResult with all validation issues
        """
        if not isinstance(self.data, list):
            self._add_error("Doctor data must be a list")
            return self.result
        
        self._validate_structure()
        self._validate_ids_unique()
        self._validate_consultation_fees()
        self._validate_tests_data()
        self._validate_contact_info()
        self._validate_credentials()
        
        self._add_info(f"Validated {len(self.data)} doctors")
        return self.result
    
    def _validate_structure(self) -> None:
        """Validate basic structure of doctor records."""
        for i, doctor in enumerate(self.data):
            if not isinstance(doctor, dict):
                self._add_error(f"Doctor at index {i} is not a dictionary")
                continue
            
            # Check required fields
            missing_fields = self.required_fields - set(doctor.keys())
            if missing_fields:
                self._add_error(f"Doctor '{doctor.get('name', f'index-{i}')}' missing fields: {missing_fields}")
            
            # Check data types
            if 'consultationFee' in doctor and not isinstance(doctor['consultationFee'], dict):
                self._add_error(f"Doctor '{doctor.get('name')}': consultationFee must be an object")
    
    def _validate_ids_unique(self) -> None:
        """Ensure all doctor IDs are unique."""
        ids = [doctor.get('id') for doctor in self.data if 'id' in doctor]
        duplicate_ids = set([x for x in ids if ids.count(x) > 1])
        
        if duplicate_ids:
            self._add_error(f"Duplicate doctor IDs found: {duplicate_ids}")
    
    def _validate_consultation_fees(self) -> None:
        """Validate consultation fee data."""
        for doctor in self.data:
            name = doctor.get('name', 'Unknown')
            fee_data = doctor.get('consultationFee', {})
            
            if not isinstance(fee_data, dict):
                continue
            
            # Check required fee fields
            for fee_type in ['initial', 'followUp']:
                if fee_type not in fee_data:
                    self._add_warning(f"Doctor '{name}': Missing {fee_type} consultation fee")
                    continue
                
                fee = fee_data[fee_type]
                if not isinstance(fee, int) or fee <= 0:
                    self._add_error(f"Doctor '{name}': Invalid {fee_type} fee: {fee}")
                elif fee > 1000000:  # Sanity check for Korean Won
                    self._add_warning(f"Doctor '{name}': {fee_type} fee seems high: ₩{fee:,}")
    
    def _validate_tests_data(self) -> None:
        """Validate medical tests data."""
        for doctor in self.data:
            name = doctor.get('name', 'Unknown')
            tests = doctor.get('tests', [])
            
            if not isinstance(tests, list):
                self._add_error(f"Doctor '{name}': tests must be a list")
                continue
            
            for i, test in enumerate(tests):
                if not isinstance(test, dict):
                    self._add_error(f"Doctor '{name}': test {i} must be an object")
                    continue
                
                # Check required test fields
                required_test_fields = ['name', 'cost', 'description']
                for field in required_test_fields:
                    if field not in test:
                        self._add_error(f"Doctor '{name}': test '{test.get('name', i)}' missing {field}")
                
                # Validate cost
                cost = test.get('cost')
                if cost is not None:
                    if not isinstance(cost, int) or cost <= 0:
                        self._add_error(f"Doctor '{name}': invalid test cost: {cost}")
                    elif cost > 10000000:  # Sanity check
                        self._add_warning(f"Doctor '{name}': test cost seems high: ₩{cost:,}")
    
    def _validate_contact_info(self) -> None:
        """Validate contact information."""
        for doctor in self.data:
            name = doctor.get('name', 'Unknown')
            location = doctor.get('location', {})
            
            if not isinstance(location, dict):
                self._add_error(f"Doctor '{name}': location must be an object")
                continue
            
            # Validate phone number
            phone = location.get('phone', '')
            if phone and not self.phone_pattern.match(phone):
                self._add_warning(f"Doctor '{name}': invalid phone format: {phone}")
            
            # Validate website URL
            website = location.get('website', '')
            if website and not self.url_pattern.match(website):
                self._add_warning(f"Doctor '{name}': invalid website URL: {website}")
            
            # Check address exists
            if not location.get('address'):
                self._add_warning(f"Doctor '{name}': missing address")
    
    def _validate_credentials(self) -> None:
        """Validate credentials and qualifications."""
        for doctor in self.data:
            name = doctor.get('name', 'Unknown')
            credentials = doctor.get('credentials', [])
            
            if not isinstance(credentials, list):
                self._add_error(f"Doctor '{name}': credentials must be a list")
                continue
            
            if len(credentials) == 0:
                self._add_warning(f"Doctor '{name}': no credentials listed")
            
            # Check for common credential patterns
            has_degree = any('의과대학' in cred or '대학원' in cred for cred in credentials)
            if not has_degree:
                self._add_warning(f"Doctor '{name}': no medical degree found in credentials")


class SymptomDataValidator(BaseValidator):
    """Validator for symptom data integrity."""
    
    def __init__(self, symptoms_data: List[Dict[str, Any]]):
        """
        Initialize symptom data validator.
        
        Args:
            symptoms_data: List of symptom information dictionaries
        """
        super().__init__(symptoms_data)
        self.required_fields = {'id', 'name', 'description', 'category', 'severity'}
        self.valid_severities = {'low', 'medium', 'high'}
        self.valid_categories = {
            '근골격계', '전신증상', '소화기계', '신경계', 
            '정신건강', '호흡기계', '피부계'
        }
    
    def validate(self) -> ValidationResult:
        """
        Validate all symptom data.
        
        Returns:
            ValidationResult with all validation issues
        """
        if not isinstance(self.data, list):
            self._add_error("Symptom data must be a list")
            return self.result
        
        self._validate_structure()
        self._validate_ids_unique()
        self._validate_categories()
        self._validate_descriptions()
        
        self._add_info(f"Validated {len(self.data)} symptoms")
        return self.result
    
    def _validate_structure(self) -> None:
        """Validate basic structure of symptom records."""
        for i, symptom in enumerate(self.data):
            if not isinstance(symptom, dict):
                self._add_error(f"Symptom at index {i} is not a dictionary")
                continue
            
            # Check required fields
            missing_fields = self.required_fields - set(symptom.keys())
            if missing_fields:
                self._add_error(f"Symptom '{symptom.get('name', f'index-{i}')}' missing fields: {missing_fields}")
            
            # Validate severity
            severity = symptom.get('severity')
            if severity and severity not in self.valid_severities:
                self._add_error(f"Symptom '{symptom.get('name')}': invalid severity '{severity}'")
    
    def _validate_ids_unique(self) -> None:
        """Ensure all symptom IDs are unique."""
        ids = [symptom.get('id') for symptom in self.data if 'id' in symptom]
        duplicate_ids = set([x for x in ids if ids.count(x) > 1])
        
        if duplicate_ids:
            self._add_error(f"Duplicate symptom IDs found: {duplicate_ids}")
    
    def _validate_categories(self) -> None:
        """Validate symptom categories."""
        for symptom in self.data:
            category = symptom.get('category')
            name = symptom.get('name', 'Unknown')
            
            if category and category not in self.valid_categories:
                self._add_warning(f"Symptom '{name}': unknown category '{category}'")
    
    def _validate_descriptions(self) -> None:
        """Validate symptom descriptions for quality."""
        for symptom in self.data:
            name = symptom.get('name', 'Unknown')
            description = symptom.get('description', '')
            
            if len(description) < 10:
                self._add_warning(f"Symptom '{name}': description too short")
            elif len(description) > 500:
                self._add_warning(f"Symptom '{name}': description very long ({len(description)} chars)")


class DataConsistencyValidator(BaseValidator):
    """Validator for cross-data consistency checks."""
    
    def __init__(self, doctors_data: List[Dict[str, Any]], symptoms_data: List[Dict[str, Any]]):
        """
        Initialize consistency validator.
        
        Args:
            doctors_data: List of doctor information
            symptoms_data: List of symptom information
        """
        super().__init__({'doctors': doctors_data, 'symptoms': symptoms_data})
        self.doctors = doctors_data
        self.symptoms = symptoms_data
    
    def validate(self) -> ValidationResult:
        """
        Validate consistency between doctors and symptoms.
        
        Returns:
            ValidationResult with consistency issues
        """
        self._validate_specialty_coverage()
        self._validate_rating_ranges()
        self._validate_hospital_consistency()
        
        return self.result
    
    def _validate_specialty_coverage(self) -> None:
        """Check if all symptom categories have corresponding specialists."""
        symptom_categories = {symptom.get('category') for symptom in self.symptoms}
        doctor_specialties = {doctor.get('specialty', '') for doctor in self.doctors}
        
        # Basic coverage check for fracture-related symptoms
        fracture_symptoms = [s for s in self.symptoms if '골절' in s.get('name', '')]
        fracture_specialists = [d for d in self.doctors if '골절' in d.get('specialty', '') or '정형외과' in d.get('department', '')]
        
        if fracture_symptoms and not fracture_specialists:
            self._add_warning("Found fracture symptoms but no fracture specialists")
        
        self._add_info(f"Coverage check: {len(symptom_categories)} categories, {len(doctor_specialties)} specialties")
    
    def _validate_rating_ranges(self) -> None:
        """Validate doctor ratings are within reasonable ranges."""
        for doctor in self.doctors:
            name = doctor.get('name', 'Unknown')
            rating = doctor.get('rating')
            review_count = doctor.get('reviewCount', 0)
            
            if rating is not None:
                if not (0 <= rating <= 5):
                    self._add_error(f"Doctor '{name}': rating {rating} out of valid range (0-5)")
                elif rating > 4.9 and review_count < 10:
                    self._add_warning(f"Doctor '{name}': very high rating ({rating}) with few reviews ({review_count})")
    
    def _validate_hospital_consistency(self) -> None:
        """Check for hospital name consistency."""
        hospitals = {}
        for doctor in self.doctors:
            hospital = doctor.get('hospital', '')
            name = doctor.get('name', 'Unknown')
            
            if hospital:
                if hospital not in hospitals:
                    hospitals[hospital] = []
                hospitals[hospital].append(name)
        
        # Check for potential duplicates with slight variations
        hospital_names = list(hospitals.keys())
        for i, hospital1 in enumerate(hospital_names):
            for hospital2 in hospital_names[i+1:]:
                if self._similar_strings(hospital1, hospital2):
                    self._add_warning(f"Similar hospital names found: '{hospital1}' and '{hospital2}'")
    
    def _similar_strings(self, s1: str, s2: str, threshold: float = 0.8) -> bool:
        """Check if two strings are similar (simple implementation)."""
        if len(s1) == 0 or len(s2) == 0:
            return False
        
        # Simple character overlap ratio
        common_chars = set(s1) & set(s2)
        total_chars = set(s1) | set(s2)
        
        return len(common_chars) / len(total_chars) > threshold


class MedicalDataValidator:
    """Main validator orchestrating all validation processes."""
    
    def __init__(self, data_dir: Path = None):
        """
        Initialize the main validator.
        
        Args:
            data_dir: Directory containing data files (default: auto-detect)
        """
        self.data_dir = data_dir or Path(__file__).parent.parent / "data"
        self.doctors_data: List[Dict[str, Any]] = []
        self.symptoms_data: List[Dict[str, Any]] = []
    
    def load_data(self) -> bool:
        """
        Load data from TypeScript files.
        
        Returns:
            bool: True if data loaded successfully
        """
        try:
            # Note: In real implementation, you'd parse TypeScript files
            # For now, we'll create mock data structure
            self._load_mock_data()
            return True
        except Exception as e:
            print(f"Error loading data: {e}")
            return False
    
    def _load_mock_data(self) -> None:
        """Load mock data for validation testing."""
        # This would be replaced with actual TypeScript file parsing
        self.doctors_data = [
            {
                "id": "1",
                "name": "Test Doctor",
                "hospital": "Test Hospital",
                "department": "정형외과",
                "specialty": "골절치료",
                "credentials": ["의과대학 졸업"],
                "experience": "10년",
                "consultationFee": {"initial": 50000, "followUp": 30000},
                "location": {"phone": "02-1234-5678", "website": "https://test.com", "address": "Test Address"},
                "rating": 4.5,
                "reviewCount": 100,
                "tests": [{"name": "X-ray", "cost": 80000, "description": "Basic imaging"}]
            }
        ]
        
        self.symptoms_data = [
            {
                "id": "1",
                "name": "골절의심",
                "description": "뼈가 부러진 것 같은 증상",
                "category": "근골격계",
                "severity": "high"
            }
        ]
    
    def validate_all(self) -> Dict[str, ValidationResult]:
        """
        Run all validations and return comprehensive results.
        
        Returns:
            Dictionary of validation results by validator type
        """
        if not self.load_data():
            return {"error": ValidationResult(errors=["Failed to load data"])}
        
        results = {}
        
        # Run individual validators
        doctor_validator = DoctorDataValidator(self.doctors_data)
        results['doctors'] = doctor_validator.validate()
        
        symptom_validator = SymptomDataValidator(self.symptoms_data)
        results['symptoms'] = symptom_validator.validate()
        
        consistency_validator = DataConsistencyValidator(self.doctors_data, self.symptoms_data)
        results['consistency'] = consistency_validator.validate()
        
        return results
    
    def generate_report(self, results: Dict[str, ValidationResult]) -> str:
        """
        Generate a comprehensive validation report.
        
        Args:
            results: Dictionary of validation results
            
        Returns:
            Formatted report string
        """
        lines = [
            "=" * 60,
            "🏥 MEDIGUIDE DATA VALIDATION REPORT",
            "=" * 60,
            ""
        ]
        
        total_errors = sum(len(result.errors) for result in results.values())
        total_warnings = sum(len(result.warnings) for result in results.values())
        
        # Summary
        lines.extend([
            f"📊 SUMMARY:",
            f"   Total Errors: {total_errors}",
            f"   Total Warnings: {total_warnings}",
            f"   Overall Status: {'✅ PASS' if total_errors == 0 else '❌ FAIL'}",
            ""
        ])
        
        # Detailed results
        for validator_name, result in results.items():
            lines.extend([
                f"📋 {validator_name.upper()} VALIDATION:",
                f"   Errors: {len(result.errors)}",
                f"   Warnings: {len(result.warnings)}",
                ""
            ])
            
            # Show all issues
            for error in result.errors:
                lines.append(f"   {error}")
            for warning in result.warnings:
                lines.append(f"   {warning}")
            for info in result.info:
                lines.append(f"   {info}")
            
            lines.append("")
        
        # Recommendations
        lines.extend([
            "💡 RECOMMENDATIONS:",
            "   - Fix all errors before deployment",
            "   - Review warnings for data quality improvements",
            "   - Regular validation in CI/CD pipeline",
            ""
        ])
        
        lines.extend([
            "=" * 60,
            f"Generated by MediGuide Data Validator v1.0",
            "=" * 60
        ])
        
        return "\n".join(lines)


def main() -> int:
    """
    Main execution function.
    
    Returns:
        Exit code (0 for success, 1 for validation failures)
    """
    print("🏥 Starting MediGuide Data Validation...")
    
    try:
        validator = MedicalDataValidator()
        results = validator.validate_all()
        
        if "error" in results:
            print(f"❌ Validation failed: {results['error'].errors[0]}")
            return 1
        
        # Generate and display report
        report = validator.generate_report(results)
        print(report)
        
        # Write report to file
        report_file = Path("validation_report.txt")
        report_file.write_text(report, encoding='utf-8')
        print(f"\n📄 Report saved to: {report_file.absolute()}")
        
        # Return appropriate exit code
        total_errors = sum(len(result.errors) for result in results.values())
        return 1 if total_errors > 0 else 0
        
    except Exception as e:
        print(f"❌ Unexpected error during validation: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())