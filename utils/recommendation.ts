import { Doctor, Symptom, Recommendation } from '../types';
import { doctors } from '../data/doctors';
import { symptoms } from '../data/symptoms';

// 증상과 의사 전문 분야 매핑
const symptomToSpecialty: { [key: string]: string[] } = {
  '신체 비대칭': ['재활의학과', '정형외과', '스포츠의학'],
  '만성피로': ['가정의학과', '내분비내과', '기능의학'],
  '소화불량': ['소화기내과', '가정의학과'],
  '두통': ['신경과', '내과'],
  '수면장애': ['정신건강의학과', '신경과'],
  '관절통': ['정형외과', '재활의학과', '류마티스내과'],
  '호흡곤란': ['호흡기내과', '심장내과'],
  '피부문제': ['피부과', '알레르기내과']
};

// 의사 전문 분야 매핑
const doctorSpecialties: { [key: string]: string[] } = {
  '나영무': ['재활의학과', '스포츠의학', '체형교정'],
  '이동환': ['가정의학과', '기능의학', '만성피로'],
  '김주성': ['소화기내과', '염증성장질환'],
  '김병건': ['신경과', '두통', '어지럼증'],
  '홍승철': ['정신건강의학과', '수면의학']
};

export function getRecommendations(
  selectedSymptoms: string[],
  maxCost: number = 1000000,
  location: string = '서울'
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  for (const doctor of doctors) {
    let reasoning = '';
    let recommendedTests: string[] = [];
    let estimatedTotalCost = doctor.consultationFee.initial;
    let hasSpecialtyMatch = false;

    // 증상과 의사 전문 분야 매칭
    for (const symptom of selectedSymptoms) {
      const symptomData = symptoms.find(s => s.name === symptom);
      if (!symptomData) continue;

      const specialties = symptomToSpecialty[symptom] || [];
      const doctorSpecialty = doctorSpecialties[doctor.name] || [];

      // 전문 분야 매칭 확인
      const specialtyMatch = specialties.some(specialty => 
        doctorSpecialty.includes(specialty) || 
        doctor.department.includes(specialty) ||
        doctor.specialty.includes(specialty)
      );

      if (specialtyMatch) {
        hasSpecialtyMatch = true;
        reasoning += `${symptom} 증상에 대한 ${doctor.department} 전문의입니다. `;
      }
    }

    // 비용 계산
    const relevantTests = doctor.tests.filter(test => {
      // 증상과 관련된 검사 선택
      const isRelevant = selectedSymptoms.some(symptom => {
        const symptomData = symptoms.find(s => s.name === symptom);
        return symptomData && (
          test.name.includes(symptomData.category) ||
          test.description.includes(symptomData.category)
        );
      });
      return isRelevant;
    });

    for (const test of relevantTests) {
      recommendedTests.push(test.name);
      estimatedTotalCost += test.cost;
    }

    // 비용 제한 확인
    if (estimatedTotalCost > maxCost) {
      continue;
    }

    // 전문 분야 매칭이 있거나 경험이 풍부한 의사 추천
    if (hasSpecialtyMatch || doctor.credentials.length > 2) {
      recommendations.push({
        doctor,
        reasoning: reasoning || `${doctor.name} 원장은 ${doctor.department} 전문의로 ${selectedSymptoms.join(', ')} 증상에 대한 풍부한 경험을 가지고 있습니다.`,
        estimatedTotalCost,
        recommendedTests
      });
    }
  }

  // 경험과 자격을 기준으로 정렬 (credentials, awards, publications 순)
  return recommendations.sort((a, b) => {
    const scoreA = a.doctor.credentials.length + a.doctor.awards.length + a.doctor.publications.length;
    const scoreB = b.doctor.credentials.length + b.doctor.awards.length + b.doctor.publications.length;
    return scoreB - scoreA;
  });
}

export function getSymptomSuggestions(input: string): Symptom[] {
  if (!input.trim()) return symptoms.slice(0, 5);
  
  return symptoms.filter(symptom => 
    symptom.name.toLowerCase().includes(input.toLowerCase()) ||
    symptom.description.toLowerCase().includes(input.toLowerCase()) ||
    symptom.category.toLowerCase().includes(input.toLowerCase())
  ).slice(0, 5);
}

export function formatCost(cost: number): string {
  return new Intl.NumberFormat('ko-KR').format(cost) + '원';
} 