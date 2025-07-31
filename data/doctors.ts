import { Doctor } from '../types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: '나영무',
    hospital: '솔병원',
    department: '재활의학과',
    specialty: '신체 불균형, 체형 교정, 스포츠의학',
    credentials: [
      '연세대학교 의과대학 졸업',
      '연세대학교 대학원 박사',
      '대한스포츠의학회 회장',
      '축구 국가대표팀 주치의 (17년)'
    ],
    experience: '김연아, 박세리, 손연재 등 국가대표 선수들의 주치의',
    awards: [
      '대한스포츠의학회 우수상',
      '올해의 의사상'
    ],
    publications: [
      '운동이 내 몸을 망친다',
      '수술 없이 통증 잡는 법'
    ],
    mediaAppearances: [
      '다양한 건강 프로그램 출연',
      '교육하는 의사 TV'
    ],
    consultationFee: {
      initial: 30000,
      followUp: 20000
    },
    tests: [
      {
        name: '전신 체열 검사 (DITI)',
        cost: 150000,
        description: '신체 각 부위의 미세한 온도 차이를 감지하여 신경 손상이나 염증, 순환 장애 부위를 객관적으로 확인'
      },
      {
        name: '3D 체형 분석 검사',
        cost: 80000,
        description: '카메라와 센서를 이용해 신체의 전후, 좌우, 상하 불균형 정도를 3차원적으로 정밀하게 측정'
      }
    ],
    location: {
      address: '서울특별시 강남구 테헤란로 123',
      phone: '02-1234-5678',
      website: 'https://solhospital.com'
    },
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 127
  },
  {
    id: '2',
    name: '이동환',
    hospital: '고도일병원',
    department: '가정의학과',
    specialty: '만성피로, 기능의학, 영양치료',
    credentials: [
      '연세대학교 세브란스병원 수련',
      '미국가정의학 교육자협의회 정회원',
      '대한만성피로학회 명예회장',
      '만성피로연구회 회장'
    ],
    experience: '만성피로와 기능의학 분야 20년 경력',
    awards: [
      '대한가정의학회 우수상',
      '환자만족도 최우수상'
    ],
    publications: [
      '만성피로의 원인과 해결책',
      '기능의학으로 건강 찾기'
    ],
    mediaAppearances: [
      '교육하는 의사 이동환 TV (유튜브)',
      '다양한 건강 프로그램 출연'
    ],
    consultationFee: {
      initial: 25000,
      followUp: 15000
    },
    tests: [
      {
        name: '타액호르몬검사 (부신피로/스트레스 검사)',
        cost: 250000,
        description: '스트레스 호르몬과 부신피로 상태를 정확히 진단'
      },
      {
        name: '모발 미네랄 중금속 검사',
        cost: 120000,
        description: '체내 미네랄 균형과 중금속 노출 정도를 확인'
      },
      {
        name: '유기산 대사 균형 검사',
        cost: 350000,
        description: '에너지 대사 능력과 영양 상태를 종합적으로 평가'
      }
    ],
    location: {
      address: '서울특별시 서초구 서초대로 456',
      phone: '02-2345-6789',
      website: 'https://godailhospital.com'
    },
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 89
  },
  {
    id: '3',
    name: '김주성',
    hospital: '서울대학교병원',
    department: '소화기내과',
    specialty: '염증성 장질환, 과민성 대장 증후군',
    credentials: [
      '서울대학교 의과대학 졸업',
      '아시아 염증성 장질환학회 회장',
      '대한장연구학회 회장',
      '대한소화기학회 이사장'
    ],
    experience: '염증성 장질환 분야 국내 최고 권위자',
    awards: [
      '대한소화기학회 학술상',
      '아시아 염증성 장질환학회 공로상'
    ],
    publications: [
      '염증성 장질환의 최신 치료법',
      '과민성 대장 증후군 진단과 치료'
    ],
    mediaAppearances: [
      '의학 전문 프로그램 다수 출연',
      '학술 대회 발표 다수'
    ],
    consultationFee: {
      initial: 35000,
      followUp: 25000
    },
    tests: [
      {
        name: '수면 위/대장 내시경',
        cost: 200000,
        description: '소화기 질환의 정확한 진단을 위한 내시경 검사'
      },
      {
        name: '장내 세균 분석 (마이크로바이옴) 검사',
        cost: 300000,
        description: '장내 미생물 균형을 분석하여 소화기 건강 상태 평가'
      }
    ],
    location: {
      address: '서울특별시 종로구 대학로 101',
      phone: '02-3456-7890',
      website: 'https://www.snuh.org'
    },
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 156
  },
  {
    id: '4',
    name: '김병건',
    hospital: '을지대학교병원',
    department: '신경과',
    specialty: '두통, 편두통, 어지럼증',
    credentials: [
      '을지대학교 의과대학 졸업',
      '대한두통학회 회장',
      '세계두통학회 정회원',
      '두통 전문의 자격'
    ],
    experience: '두통 치료 분야 25년 경력',
    awards: [
      '대한두통학회 학술상',
      '환자 치료 우수상'
    ],
    publications: [
      '두통의 진단과 치료',
      '편두통의 새로운 치료법'
    ],
    mediaAppearances: [
      '두통 전문 프로그램 출연',
      '건강 강연 다수'
    ],
    consultationFee: {
      initial: 30000,
      followUp: 20000
    },
    tests: [
      {
        name: '뇌 MRI',
        cost: 500000,
        description: '뇌 구조와 혈관 상태를 정밀하게 확인'
      },
      {
        name: '경동맥 초음파',
        cost: 120000,
        description: '뇌로 가는 혈관의 상태를 확인'
      }
    ],
    location: {
      address: '서울특별시 성동구 왕십리로 222',
      phone: '02-4567-8901',
      website: 'https://www.eulji.ac.kr'
    },
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 98
  },
  {
    id: '5',
    name: '홍승철',
    hospital: '가톨릭대학교 성빈센트병원',
    department: '정신건강의학과',
    specialty: '수면의학, 불면증, 수면장애',
    credentials: [
      '가톨릭대학교 의과대학 졸업',
      '아시아수면학회 사무총장',
      '한국수면학회 회장',
      '미국 스탠포드대학 수면클리닉 연수'
    ],
    experience: '수면의학 분야 30년 경력',
    awards: [
      '한국수면학회 학술상',
      '수면의학 공로상'
    ],
    publications: [
      '나는 왜 졸릴까?',
      '수면장애의 진단과 치료'
    ],
    mediaAppearances: [
      '수면 전문 프로그램 출연',
      '건강 강연 및 저서 활동'
    ],
    consultationFee: {
      initial: 40000,
      followUp: 30000
    },
    tests: [
      {
        name: '수면다원검사',
        cost: 700000,
        description: '수면의 질과 문제를 객관적으로 평가하는 종합 검사'
      },
      {
        name: '정신건강의학과 상담',
        cost: 50000,
        description: '수면 문제와 관련된 정신건강 상태 평가'
      }
    ],
    location: {
      address: '서울특별시 강남구 논현로 333',
      phone: '02-5678-9012',
      website: 'https://www.cmcvincent.or.kr'
    },
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 134
  },
  {
    id: '6',
    name: '박정호',
    hospital: '세브란스병원',
    department: '정형외과',
    specialty: '외상골절, 관절경수술, 스포츠손상',
    credentials: [
      '연세대학교 의과대학 졸업',
      '대한정형외과학회 회장',
      '국제외상학회 정회원',
      '미국 Mayo Clinic 연수'
    ],
    experience: '외상 및 골절 치료 분야 25년 경력',
    awards: [
      '대한정형외과학회 학술상',
      '외상치료 우수의사상',
      '대한골절학회 공로상'
    ],
    publications: [
      '현대 골절 치료의 원칙',
      '스포츠 손상과 재활',
      '관절경 수술의 실제'
    ],
    mediaAppearances: [
      '의학 전문 프로그램 다수 출연',
      '스포츠 의학 강연 활동',
      '정형외과 교육 콘텐츠 제작'
    ],
    consultationFee: {
      initial: 45000,
      followUp: 30000
    },
    tests: [
      {
        name: '단순 X-ray 촬영',
        cost: 80000,
        description: '골절 진단을 위한 기본적인 영상 검사'
      },
      {
        name: 'CT 스캔',
        cost: 350000,
        description: '복잡한 골절이나 관절 내 골절의 정밀 진단'
      },
      {
        name: 'MRI 검사',
        cost: 600000,
        description: '연조직 손상과 미세골절, 스트레스 골절 진단'
      },
      {
        name: '골밀도 검사 (DEXA)',
        cost: 120000,
        description: '골다공증 진단 및 골절 위험도 평가'
      },
      {
        name: '3D 영상재구성',
        cost: 200000,
        description: '복잡한 골절의 3차원적 분석 및 수술 계획'
      }
    ],
    location: {
      address: '서울특별시 서대문구 연세로 50-1',
      phone: '02-2228-2180',
      website: 'https://www.severance.healthcare'
    },
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 189
  },
  {
    id: '7',
    name: '김현수',
    hospital: '서울아산병원',
    department: '정형외과',
    specialty: '척추골절, 골다공증성골절, 미세침습수술',
    credentials: [
      '울산대학교 의과대학 졸업',
      '대한척추외과학회 이사장',
      '아시아 척추학회 부회장',
      '독일 척추센터 연수'
    ],
    experience: '척추 및 골다공증성 골절 치료 분야 22년 경력',
    awards: [
      '대한척추외과학회 우수상',
      '골다공증 치료 공로상',
      '미세침습수술 발전상'
    ],
    publications: [
      '척추골절의 최신 치료법',
      '골다공증성 골절 예방과 치료',
      '미세침습 척추수술'
    ],
    mediaAppearances: [
      '척추 건강 프로그램 출연',
      '골다공증 예방 캠페인 참여',
      '의료진 교육 강의'
    ],
    consultationFee: {
      initial: 40000,
      followUp: 25000
    },
    tests: [
      {
        name: '척추 X-ray (전후면, 측면)',
        cost: 100000,
        description: '척추골절 및 변형 진단을 위한 기본 검사'
      },
      {
        name: '척추 MRI',
        cost: 650000,
        description: '척추골절의 정확한 위치와 신경 압박 정도 확인'
      },
      {
        name: '골밀도 검사 (DEXA)',
        cost: 120000,
        description: '골다공증 진단 및 골절 위험도 평가'
      },
      {
        name: '척추 CT',
        cost: 400000,
        description: '척추골절의 상세한 형태와 안정성 평가'
      },
      {
        name: '골대사 표지자 검사',
        cost: 150000,
        description: '골 생성과 파괴 정도를 평가하는 혈액검사'
      }
    ],
    location: {
      address: '서울특별시 송파구 올림픽로43길 88',
      phone: '02-3010-3530',
      website: 'https://www.amc.seoul.kr'
    },
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: '8',
    name: '이상민',
    hospital: '고려대학교 안암병원',
    department: '정형외과',
    specialty: '소아골절, 성장판손상, 선천성기형',
    credentials: [
      '고려대학교 의과대학 졸업',
      '대한소아정형외과학회 회장',
      '국제소아정형외과학회 정회원',
      '미국 Boston Children\'s Hospital 연수'
    ],
    experience: '소아 골절 및 성장판 손상 치료 분야 18년 경력',
    awards: [
      '대한소아정형외과학회 학술상',
      '소아 외상 치료 우수상',
      '성장판 손상 연구 공로상'
    ],
    publications: [
      '소아 골절의 진단과 치료',
      '성장판 손상의 예후',
      '소아 정형외과 응급처치'
    ],
    mediaAppearances: [
      '소아 외상 예방 캠페인',
      '부모 교육 프로그램 출연',
      '소아과 협진 교육'
    ],
    consultationFee: {
      initial: 35000,
      followUp: 25000
    },
    tests: [
      {
        name: '성장판 X-ray',
        cost: 70000,
        description: '성장판 손상 여부와 정도를 평가하는 특수 촬영'
      },
      {
        name: '소아용 CT (저선량)',
        cost: 280000,
        description: '방사선 노출을 최소화한 소아 전용 CT 검사'
      },
      {
        name: '성장호르몬 검사',
        cost: 180000,
        description: '성장판 손상 후 성장 능력 평가'
      },
      {
        name: '소아 MRI (수면유도)',
        cost: 500000,
        description: '정확한 진단을 위한 수면 유도 하 MRI 검사'
      },
      {
        name: '사지길이 측정',
        cost: 50000,
        description: '골절 후 사지 길이 차이와 각도 변형 측정'
      }
    ],
    location: {
      address: '서울특별시 성북구 고려대로 73',
      phone: '02-920-5114',
      website: 'https://www.kumc.or.kr'
    },
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 98
  },
  {
    id: '9',
    name: '정재훈',
    hospital: '연세대학교 강남세브란스병원',
    department: '정형외과',
    specialty: '족부족관절, 발목골절, 스포츠재활',
    credentials: [
      '연세대학교 의과대학 졸업',
      '대한족부족관절학회 회장',
      '국제족부외과학회 정회원',
      '미국 HSS 족부센터 연수'
    ],
    experience: '족부 골절 및 재활 치료 분야 20년 경력, 프로 운동선수 발목 재활 전문',
    awards: [
      '대한족부족관절학회 학술상',
      '스포츠 재활 우수상',
      '족부 기능회복 연구상'
    ],
    publications: [
      '발목골절 후 완전회복을 위한 재활',
      '족부 기능회복의 과학적 접근',
      '운동선수 발목 손상 관리'
    ],
    mediaAppearances: [
      '족부 건강 전문 프로그램 출연',
      '운동선수 재활 다큐멘터리 출연',
      '발목 건강 캠페인 참여'
    ],
    consultationFee: {
      initial: 42000,
      followUp: 28000
    },
    tests: [
      {
        name: '족부 정밀 X-ray (체중부하)',
        cost: 90000,
        description: '체중을 실은 상태에서 족부 정렬과 골절 치유 상태 평가'
      },
      {
        name: '족부 기능 평가',
        cost: 150000,
        description: '보행분석과 족부 기능을 종합적으로 평가하는 특수검사'
      },
      {
        name: '발목 관절경 검사',
        cost: 450000,
        description: '발목 내부 연골 손상과 유착 상태를 직접 확인'
      },
      {
        name: '족부 CT (3D)',
        cost: 320000,
        description: '복잡한 족부 골절의 3차원적 분석 및 치유 평가'
      },
      {
        name: '보행분석 검사',
        cost: 200000,
        description: '족부 골절 후 보행 패턴과 기능회복 정도 객관적 측정'
      }
    ],
    location: {
      address: '서울특별시 강남구 언주로 211',
      phone: '02-2019-3114',
      website: 'https://gs.iseverance.com'
    },
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 142
  },
  {
    id: '10',
    name: '박수진',
    hospital: '삼성서울병원',
    department: '정형외과',
    specialty: '수부외과, 손목골절, 미세수술',
    credentials: [
      '성균관대학교 의과대학 졸업',
      '대한수부외과학회 이사장',
      '아시아 수부외과학회 부회장',
      '미국 Mayo Clinic 수부센터 연수'
    ],
    experience: '수부 골절 및 미세수술 분야 18년 경력, 손목 기능회복 전문',
    awards: [
      '대한수부외과학회 우수상',
      '미세수술 기술혁신상',
      '손목 재활 연구 공로상'
    ],
    publications: [
      '손목골절 후 기능회복의 새로운 접근',
      '수부 미세수술의 실제',
      '손목 관절 재활의 과학'
    ],
    mediaAppearances: [
      '수부외과 전문 의료 프로그램',
      '손목 건강 교육 콘텐츠 제작',
      '재활의학 컨퍼런스 강연'
    ],
    consultationFee: {
      initial: 38000,
      followUp: 26000
    },
    tests: [
      {
        name: '손목 정밀 X-ray (다방향)',
        cost: 85000,
        description: '손목 골절 치유 상태와 관절 정렬을 다각도로 평가'
      },
      {
        name: '손목 MRI (고해상도)',
        cost: 580000,
        description: '손목 인대, 연골, 건의 손상과 회복 상태 정밀 진단'
      },
      {
        name: '손목 기능 평가',
        cost: 120000,
        description: '손목 관절 가동범위, 근력, 세밀한 손동작 능력 종합 평가'
      },
      {
        name: '수부 CT (고해상도)',
        cost: 280000,
        description: '복잡한 손목 골절의 세밀한 구조 분석'
      },
      {
        name: '악력 및 파악력 측정',
        cost: 60000,
        description: '손목 골절 후 기능회복 정도를 객관적으로 측정'
      }
    ],
    location: {
      address: '서울특별시 강남구 일원로 81',
      phone: '02-3410-2114',
      website: 'https://www.samsunghospital.com'
    },
    image: 'https://images.unsplash.com/photo-1594824804732-da3342994fb5?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 118
  },
  {
    id: '11',
    name: '임동규',
    hospital: 'HIMCHAN병원',
    department: '정형외과',
    specialty: '손가락골절, 수지재건, 작업치료',
    credentials: [
      '중앙대학교 의과대학 졸업',
      '대한정형외과학회 수부분과 전문의',
      '손가락 재건술 전문가 과정 수료',
      '일본 게이오대학 수부센터 연수'
    ],
    experience: '손가락 골절 및 재건 분야 15년 경력, 세밀한 기능회복 전문',
    awards: [
      '손가락 재건술 우수상',
      '작업치료 협력 공로상',
      '수지 기능회복 연구상'
    ],
    publications: [
      '손가락 골절 후 완전한 기능회복',
      '수지 재건과 작업치료의 조화',
      '손가락 미세동작 회복법'
    ],
    mediaAppearances: [
      '손가락 재활 교육 프로그램',
      '수공예 작가 손 건강 관리 강의',
      '음악가를 위한 손가락 케어'
    ],
    consultationFee: {
      initial: 35000,
      followUp: 23000
    },
    tests: [
      {
        name: '손가락 정밀 X-ray',
        cost: 70000,
        description: '손가락 각 관절의 골절 치유와 정렬 상태 세밀 평가'
      },
      {
        name: '손가락 기능 평가 (DASH)',
        cost: 100000,
        description: '일상생활 및 작업 능력 회복 정도를 표준화된 도구로 평가'
      },
      {
        name: '손가락 관절 가동범위 측정',
        cost: 80000,
        description: '각 손가락 관절의 굽힘과 펴짐 정도를 정밀 측정'
      },
      {
        name: '핀치력 및 그립력 검사',
        cost: 90000,
        description: '손가락 끝의 집기 힘과 전체 쥐기 힘 객관적 측정'
      },
      {
        name: '미세동작 능력 평가',
        cost: 120000,
        description: '세밀한 손가락 동작과 협응 능력 종합 평가'
      }
    ],
    location: {
      address: '서울특별시 강동구 성내로 45',
      phone: '02-2224-2114',
      website: 'https://www.himchan.co.kr'
    },
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 87
  }
];