'use client';

import { useState } from 'react';
import { Search, Heart, Star, MapPin, Phone, Globe } from 'lucide-react';
import { symptoms } from '../data/symptoms';
import { getRecommendations, getSymptomSuggestions, formatCost } from '../utils/recommendation';
import { Recommendation } from '../types';

export default function Home() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState(symptoms.slice(0, 5));
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [maxCost, setMaxCost] = useState(500000);
  const [showResults, setShowResults] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setSuggestions(getSymptomSuggestions(value));
  };

  const addSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
    setSearchInput('');
    setSuggestions(symptoms.slice(0, 5));
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const handleSearch = () => {
    if (selectedSymptoms.length > 0) {
      const results = getRecommendations(selectedSymptoms, maxCost);
      setRecommendations(results);
      setShowResults(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          MediGuide
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          증상에 맞는 최고의 전문의를 찾아드리는 의료 상담 플랫폼
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto">
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            증상을 선택해주세요
          </h2>
          
          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="증상을 검색하세요 (예: 두통, 소화불량, 만성피로)"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="input-field pl-10"
            />
            
            {/* Suggestions */}
            {searchInput && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                {suggestions.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => addSymptom(symptom.name)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900">{symptom.name}</div>
                    <div className="text-sm text-gray-600">{symptom.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Symptoms */}
          {selectedSymptoms.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-700">선택된 증상</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map((symptom) => (
                  <span
                    key={symptom}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                  >
                    {symptom}
                    <button
                      onClick={() => removeSymptom(symptom)}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cost Filter */}
          <div className="mb-6">
            <label htmlFor="cost-range" className="block text-lg font-medium mb-3 text-gray-700">
              최대 예상 비용
            </label>
            <div className="flex items-center gap-4">
              <input
                id="cost-range"
                type="range"
                min="100000"
                max="1000000"
                step="50000"
                value={maxCost}
                onChange={(e) => setMaxCost(Number(e.target.value))}
                className="flex-1"
                aria-label="최대 예상 비용 선택"
              />
              <span className="text-lg font-medium text-gray-900 min-w-[120px]">
                {formatCost(maxCost)}
              </span>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={selectedSymptoms.length === 0}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            전문의 찾기
          </button>
        </div>

        {/* Results */}
        {showResults && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              추천 전문의 ({recommendations.length}명)
            </h2>
            
            {recommendations.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-gray-600 text-lg">
                  조건에 맞는 전문의를 찾을 수 없습니다.
                  <br />
                  증상이나 비용 범위를 조정해보세요.
                </p>
              </div>
            ) : (
              recommendations.map((recommendation, index) => (
                <div key={recommendation.doctor.id} className="card">
                  <div className="flex gap-6">
                    {/* Doctor Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={recommendation.doctor.image}
                        alt={recommendation.doctor.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {recommendation.doctor.name} 원장
                          </h3>
                          <p className="text-gray-600">{recommendation.doctor.hospital}</p>
                          <p className="text-primary-600 font-medium">{recommendation.doctor.department}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{recommendation.doctor.rating}</span>
                            <span className="text-gray-500">({recommendation.doctor.reviewCount})</span>
                          </div>
                        </div>
                      </div>

                      {/* Specialty */}
                      <p className="text-gray-700 mb-3">
                        <strong>전문분야:</strong> {recommendation.doctor.specialty}
                      </p>

                      {/* Reasoning */}
                      <p className="text-gray-600 mb-4 text-sm">
                        {recommendation.reasoning}
                      </p>

                      {/* Experience */}
                      <p className="text-gray-700 mb-4">
                        <strong>주요 경력:</strong> {recommendation.doctor.experience}
                      </p>

                      {/* Credentials */}
                      <div className="mb-4">
                        <strong className="text-gray-700">학력 및 자격:</strong>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                          {recommendation.doctor.credentials.slice(0, 3).map((credential, idx) => (
                            <li key={idx}>{credential}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Cost Information */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">예상 비용</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>초진 진찰료:</span>
                            <span>{formatCost(recommendation.doctor.consultationFee.initial)}</span>
                          </div>
                          {recommendation.recommendedTests.length > 0 && (
                            <>
                              <div className="text-gray-600 mt-2">추천 검사:</div>
                              {recommendation.recommendedTests.map((test, idx) => (
                                <div key={idx} className="flex justify-between text-gray-600">
                                  <span>• {test}</span>
                                </div>
                              ))}
                            </>
                          )}
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-medium">
                              <span>총 예상 비용:</span>
                              <span className="text-primary-600">{formatCost(recommendation.estimatedTotalCost)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{recommendation.doctor.location.address}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <span>{recommendation.doctor.location.phone}</span>
                        </div>
                        {recommendation.doctor.location.website && (
                          <a
                            href={recommendation.doctor.location.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary-600 hover:text-primary-800"
                          >
                            <Globe className="w-4 h-4" />
                            <span>웹사이트</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
} 