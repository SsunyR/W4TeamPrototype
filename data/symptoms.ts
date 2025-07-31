import { Symptom } from '../types';

export const symptoms: Symptom[] = [
  {
    id: '1',
    name: '신체 비대칭',
    description: '몸이 뭔가 명확하게 아프진 않지만 비대칭인 느낌이 들어서 병원을 찾아가서 진료를 받고 싶은데, 어떤 병원을 가야할지 알려줘.',
    category: '근골격계',
    severity: 'medium',
    relatedSymptoms: ['통증', '불편감', '자세 불균형']
  },
  {
    id: '2',
    name: '만성피로',
    description: '푹 쉬어도 풀리지 않는 피로, 잠을 자도 개운하지 않고, 늘 기운이 없으며, 온몸이 쑤시는 듯한 느낌',
    category: '전신증상',
    severity: 'high',
    relatedSymptoms: ['수면장애', '기운없음', '스트레스']
  },
  {
    id: '3',
    name: '소화불량',
    description: '자주 속이 더부룩하고, 가스가 차며, 스트레스를 받으면 바로 설사나 변비가 생기는 과민성 대장 증후군',
    category: '소화기계',
    severity: 'medium',
    relatedSymptoms: ['복부팽만', '설사', '변비', '복통']
  },
  {
    id: '4',
    name: '두통',
    description: '진통제를 먹어도 그때뿐인 두통, 갑자기 세상이 빙 도는 듯한 어지럼증',
    category: '신경계',
    severity: 'high',
    relatedSymptoms: ['어지럼증', '메스꺼움', '시야장애']
  },
  {
    id: '5',
    name: '수면장애',
    description: '잠자리에 누워도 2~3시간 뒤척이고, 자다 깨다를 반복하며, 낮에는 심하게 졸린 증상',
    category: '정신건강',
    severity: 'high',
    relatedSymptoms: ['불면증', '과다수면', '피로']
  },
  {
    id: '6',
    name: '관절통',
    description: '특별한 이유 없이 관절이 아프고, 움직일 때마다 불편함을 느끼는 증상',
    category: '근골격계',
    severity: 'medium',
    relatedSymptoms: ['통증', '부종', '관절강직']
  },
  {
    id: '7',
    name: '호흡곤란',
    description: '가벼운 활동에도 숨이 차고, 가슴이 답답한 느낌이 드는 증상',
    category: '호흡기계',
    severity: 'high',
    relatedSymptoms: ['기침', '가래', '흉통']
  },
  {
    id: '8',
    name: '피부문제',
    description: '갑자기 생긴 발진이나 가려움증, 피부가 건조하고 거칠어지는 증상',
    category: '피부계',
    severity: 'low',
    relatedSymptoms: ['가려움', '발진', '건조함']
  },
  {
    id: '9',
    name: '골절의심',
    description: '넘어지거나 부딪힌 후 특정 부위가 심하게 아프고, 움직이기 어려우며, 부어오르는 증상',
    category: '근골격계',
    severity: 'high',
    relatedSymptoms: ['통증', '부종', '운동제한', '변형']
  },
  {
    id: '10',
    name: '스트레스골절',
    description: '운동 후 지속적인 뼈 통증, 특히 달리기나 점프 후 악화되는 증상',
    category: '근골격계',
    severity: 'medium',
    relatedSymptoms: ['운동통증', '압통', '활동제한']
  },
  {
    id: '11',
    name: '골다공증성골절',
    description: '경미한 외상에도 쉽게 발생하는 골절, 특히 손목, 척추, 고관절 부위',
    category: '근골격계',
    severity: 'high',
    relatedSymptoms: ['약한외상', '척추통증', '키감소']
  },
  {
    id: '12',
    name: '발목골절회복',
    description: '발목 골절 치료는 받았지만 아직 예전처럼 자유롭게 걷지 못하고, 운동이나 계단 오르내리기가 어려운 상태',
    category: '근골격계',
    severity: 'medium',
    relatedSymptoms: ['보행제한', '운동제한', '발목경직', '균형감각저하']
  },
  {
    id: '13',
    name: '손목골절회복',
    description: '손목 골절 치료 후 깁스를 제거했지만 손목 움직임이 제한되고, 무거운 물건을 들거나 세밀한 작업이 어려운 상태',
    category: '근골격계',
    severity: 'medium',
    relatedSymptoms: ['손목경직', '악력저하', '세밀동작제한', '통증재발']
  },
  {
    id: '14',
    name: '손가락골절회복',
    description: '손가락 골절 치료 후 기본적인 움직임은 가능하지만 완전히 구부리거나 펴지지 않고, 정교한 작업이나 악기연주가 어려운 상태',
    category: '근골격계',
    severity: 'medium',
    relatedSymptoms: ['관절경직', '미세동작제한', '감각저하', '기능제한']
  }
];

