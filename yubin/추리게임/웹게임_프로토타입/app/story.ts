export type Choice = {
  label: string;
  next?: string;
  action?: 'title' | 'unlock' | 'reset';
  emphasis?: boolean;
};

export type Scene = {
  id: string;
  run: 1 | 2;
  chapter: string;
  time: string;
  background: string;
  speaker: string;
  text: string;
  sprite?: string;
  spriteSide?: 'left' | 'center' | 'right';
  evidence?: string[];
  dossiers?: string[];
  choices: Choice[];
  ending?: 'normal' | 'bad' | 'true';
};

export const evidenceCatalog: Record<string, { name: string; detail: string; run: 1 | 2 }> = {
  medicine: {
    name: '칼리고 정제와 빈 물잔',
    detail: '브램웰 진료소가 처방한 후유증 완화용 약. 약병에는 “두통과 손 떨림이 심할 때 1정”이라고 적혀 있다.',
    run: 1,
  },
  detectiveId: {
    name: '탐정 신분증',
    detail: '아서의 사진과 이름, “사립 탐정”이라는 직함이 적혀 있다. 종이와 압인이 유난히 새것처럼 보인다.',
    run: 1,
  },
  policeLetter: {
    name: '철도 경찰 협조 공문',
    detail: '아서에게 열차 내 사건 조사를 협조하라는 문서. 발급 기관 표기가 낯설다.',
    run: 1,
  },
  notebook: {
    name: '아서의 탐정 수첩',
    detail: '앞부분 여러 장이 칼로 반듯하게 잘려 나갔다. 남은 페이지에는 날짜 없는 관찰 기록과 빈 종이만 이어진다.',
    run: 1,
  },
  fakeWatch: {
    name: '9시 10분에 멈춘 회중시계',
    detail: '하그리브스의 손 아래에서 발견됐다. 겉면에는 닦은 기름과 짙은 천 섬유가 남아 있다.',
    run: 1,
  },
  telegram: {
    name: '반쯤 탄 전보',
    detail: '“중요한 기록은 객실 안에서 직접 확인하라”는 문장만 남아 있다. 접수 번호가 없다.',
    run: 1,
  },
  glove: {
    name: '젖은 검은 장갑',
    detail: '엘리너의 장갑과 같은 모양. 연결 통로의 빗물과 석탄가루가 묻어 있다.',
    run: 1,
  },
  letterOpener: {
    name: '은제 편지칼',
    detail: '베일 가문의 문장이 새겨져 있다. 칼날에는 피가 없고 종이 섬유만 남아 있다.',
    run: 1,
  },
  keyLedger: {
    name: '예비 열쇠 관리 대장',
    detail: '20시 41분, 7호 객실 예비 열쇠 확인 칸만 비어 있다. 당시 토머스는 서신 배달로 자리를 비웠다.',
    run: 1,
  },
  research: {
    name: '봉인된 원본 연구 기록',
    detail: '하그리브스의 기억 치료 실험 원본. 가족 단위 실험의 사망·후유증 기록과, 이를 “불가피한 손실”로 축소한 정정 흔적이 남아 있다.',
    run: 1,
  },
  journalistNote: {
    name: '조너선의 취재 메모',
    detail: '피해자들의 증언과 병원 회계 기록이 정리되어 있다. 취재원의 이름 한 곳은 찢겨 있다.',
    run: 1,
  },
  ticket: {
    name: '낡고 찢어진 승차권',
    detail: '브램웰 진료소가 있던 지역에서 출발한 오래된 승차권. 사무엘이 보관하고 있었다.',
    run: 1,
  },
  trueWatch: {
    name: '하그리브스의 진짜 회중시계',
    detail: '경찰이 아서의 수하물에서 발견했다. 피해자의 이름이 새겨져 있고 9시 10분 뒤에도 작동했다.',
    run: 2,
  },
  workReceipt: {
    name: '시계 작업 영수증',
    detail: '사건 사흘 전, “A. Bell”이 진짜 시계와 같은 외형의 물건을 맡긴 기록이다.',
    run: 2,
  },
  forgedDocuments: {
    name: '위조 문서 감정서',
    detail: '탐정 신분증과 협조 공문 모두 같은 인쇄소에서 제작된 위조품이다. 의뢰인은 아서 벨이었다.',
    run: 2,
  },
  medicalRecord: {
    name: '아서 벨의 진료 기록',
    detail: '어린 아서가 벨 가족 단위 실험의 유일한 생존자였음을 보여 주는 기록. 성인이 된 뒤까지 후유증 관찰이 이어졌다.',
    run: 2,
  },
  bellFamilyFile: {
    name: '벨 가족 실험 원본과 정정본',
    detail: '원본에는 가족들의 사망과 아서의 후유증이 적혀 있다. 정정본은 이를 기존 질환과 비협조 탓으로 바꾸었고, 엘리너의 확인 서명이 남아 있다.',
    run: 2,
  },
  medicineAnalysis: {
    name: '칼리고 정제 성분 분석서',
    detail: '후유증 완화용 허구의 처방약. 극도의 피로 상태에서는 직전 기억의 회상을 흐릴 수 있으나 범행 계획을 만들지는 않는다.',
    run: 2,
  },
  telegramDraft: {
    name: '전보 초안과 필적 감정',
    detail: '불탄 전보의 문장과 아서의 수첩 필체가 일치한다. “안에서 문을 잠그고 확인하라”는 지시가 있다.',
    run: 2,
  },
  spareKey: {
    name: '7호 객실 예비 열쇠',
    detail: '엘리너의 가방에서 나왔지만, 가방 바깥 주머니에 타인의 손으로 넣어진 흔적이 확인됐다.',
    run: 2,
  },
  lastPage: {
    name: '수첩에서 찢어 숨긴 계획서',
    detail: '뒤표지의 이중 가죽 안에 접혀 있던 종이들. 전보, 열쇠, 시계 교체와 장갑 배치 순서가 적혀 있다.',
    run: 2,
  },
};

export const dossierCatalog: Record<string, { name: string; role: string; detail: string }> = {
  eleanor: {
    name: '엘리너 쇼',
    role: '하그리브스의 연구 조수',
    detail: '훗날 벨 가족 실험 기록을 정리하며 진상을 알았지만, 더 큰 의학적 진보를 위해 필요했다는 하그리브스의 논리에 동조해 기록을 수정하고 침묵했다.',
  },
  margaret: {
    name: '마거릿 베일',
    role: '피해 환자의 누나',
    detail: '동생 에드먼드의 치료 기록을 되찾으려 열차에 탔다. 가문의 체면보다 동생의 명예를 지키려 자신의 목적을 숨긴다.',
  },
  thomas: {
    name: '토머스 리드',
    role: '블랙손 특급열차 차장',
    detail: '아서의 위조 공문을 믿고 객실과 열쇠 관리 방식을 안내했다. 자신의 실수로 사건이 가능해졌다는 두려움 때문에 거짓말한다.',
  },
  jonathan: {
    name: '조너선 크로우',
    role: '탐사 보도 기자',
    detail: '하그리브스의 불법 실험을 추적한다. 취재원과 생존자들을 보호하기 위해 정보를 숨기지만 아서의 신분을 가장 먼저 의심한다.',
  },
  samuel: {
    name: '사무엘 워드',
    role: '브램웰 진료소의 전 환자',
    detail: '하그리브스의 치료를 겪은 생존자. 낙인과 보복이 두려워 이름을 감췄으며 아서를 같은 병동에서 본 적이 있다.',
  },
  hargreaves: {
    name: '에드윈 하그리브스',
    role: '기억 치료 연구자이자 피해자',
    detail: '기억을 객관적인 사건처럼 재구성하면 고통을 통제할 수 있다고 믿었다. 성과를 위해 환자의 동의와 피해를 무시했다.',
  },
  arthur: {
    name: '아서 벨',
    role: '자칭 탐정 / 하그리브스의 전 환자',
    detail: '어린 시절 하그리브스의 가족 단위 실험에서 홀로 살아남았다. 가족의 죽음이 연구를 위한 희생으로 지워진 뒤, 관찰자 역할을 탐정이라는 자아로 발전시키고 복수를 계획했다.',
  },
};

export const scenes: Scene[] = [
  {
    id: 'p00', run: 1, chapter: '프롤로그 · 약병 소리', time: '21:18', background: 'arthur-cabin.png',
    speaker: '내레이션',
    text: '1897년 겨울. 런던행 블랙손 특급열차가 눈과 비가 섞인 밤을 가른다. 객실 탁자 위에서 유리 약병이 열차의 진동에 맞춰 가늘게 떨린다.',
    choices: [{ label: '떨리는 손으로 약병을 집는다', next: 'p01' }],
  },
  {
    id: 'p01', run: 1, chapter: '프롤로그 · 약병 소리', time: '21:18', background: 'arthur-cabin.png',
    speaker: '아서 벨',
    text: '괜찮아. 늘 먹던 약이다. 손 떨림이 멎으면 생각도 돌아올 거야. 브램웰 진료소… 왜 그 이름만 보면 속이 불편하지?',
    sprite: 'arthur-confused.png', evidence: ['medicine'],
    choices: [{ label: '칼리고 정제 한 알을 물과 함께 삼킨다', next: 'p02', emphasis: true }],
  },
  {
    id: 'p02', run: 1, chapter: '프롤로그 · 사라진 시간', time: '21:20', background: 'arthur-cabin.png',
    speaker: '내레이션',
    text: '시계 초침이 귀 바로 옆에서 뛰는 것처럼 커진다. 검은 장갑, 금빛 시계, 닫히는 객실 문이 한 장면씩 번쩍인 뒤 모든 소리가 끊긴다. 아서가 다시 눈을 떴을 때, 직전의 마흔 분은 형태 없는 안개가 되어 있다.',
    sprite: 'arthur-confused.png', choices: [{ label: '탁자 위에 놓인 물건을 확인한다', next: 'p03' }],
  },
  {
    id: 'p03', run: 1, chapter: '프롤로그 · 탐정의 이름', time: '21:20', background: 'arthur-cabin.png',
    speaker: '아서 벨',
    text: '내 이름은 아서 벨. 그것만은 분명하다. 사진도 내 얼굴이다. 하지만 이름 아래의 “사립 탐정”이라는 직함은 이상하리만큼 낯설다. 함께 놓인 문서라면 이유를 알려 줄지도 모른다.',
    sprite: 'arthur-default.png', evidence: ['detectiveId'],
    choices: [{ label: '함께 놓인 공문을 펼친다', next: 'p04' }],
  },
  {
    id: 'p04', run: 1, chapter: '프롤로그 · 탐정의 이름', time: '21:21', background: 'arthur-cabin.png',
    speaker: '아서 벨',
    text: '“철도 내 안전을 위협하는 사안을 조사할 수 있도록 아서 벨의 객차 출입과 승무원 협조를 허가한다.” 서명과 직인까지 있다. …맞아. 나는 이 일을 하려고 이 열차에 탔었지, 참.',
    sprite: 'arthur-default.png', evidence: ['policeLetter'],
    choices: [{ label: '공문 아래 놓인 낡은 수첩을 확인한다', next: 'p05' }],
  },
  {
    id: 'p05', run: 1, chapter: '프롤로그 · 찢긴 수첩', time: '21:21', background: 'arthur-cabin.png',
    speaker: '아서 벨',
    text: '앞부분의 여러 장이 칼로 반듯하게 잘려 있다. 남은 것은 날짜 없는 관찰 기록과 빈 종이뿐이다. 오래 써 온 내 수첩인 듯 손에는 익숙하지만, 지금 해야 할 일을 알려 줄 문장은 없다.',
    sprite: 'arthur-default.png', evidence: ['notebook'],
    choices: [{ label: '수첩을 외투 안주머니에 넣는다', next: 'p06' }],
  },
  {
    id: 'p06', run: 1, chapter: '프롤로그 · 답답한 객실', time: '21:21', background: 'arthur-cabin.png',
    speaker: '아서 벨',
    text: '공문이 있으니 임무는 열차 안에 있다. 자세한 내용은 움직이다 보면 떠오르겠지. 약 냄새와 난방 연기가 뒤섞인 객실 공기가 갑자기 견디기 어렵다. 우선 바깥 공기를 마셔야겠다.',
    sprite: 'arthur-confused.png', choices: [{ label: '답답한 객실을 나선다', next: 'p07', emphasis: true }],
  },
  {
    id: 'p07', run: 1, chapter: '프롤로그 · 7호 객실의 소란', time: '21:22', background: 'train-corridor.png',
    speaker: '토머스 리드',
    text: '객실 문을 닫자 복도 끝에 사람들이 모여 있는 것이 보인다. “하그리브스 박사님, 차를 가져왔습니다!” 토머스가 문을 두드린다. “외부 자물쇠는 열리는데 안쪽 걸쇠가 버티고 있어요. 모두 물러서십시오. 문을 부수겠습니다.”',
    sprite: 'thomas-default.png', choices: [{ label: '부서진 문 너머로 들어간다', next: 'p08' }],
  },
  {
    id: 'p08', run: 1, chapter: '프롤로그 · 확인되지 않은 죽음', time: '21:23', background: 'crime-scene.png',
    speaker: '엘리너 쇼',
    text: '박사님, 들리십니까? …맥박이 없습니다. 몸은 아직 완전히 식지 않았어요. 하지만 겉으로 보이는 큰 상처도 없습니다. 사인은 경찰과 의사가 확인해야 합니다.',
    sprite: 'eleanor-sad.png', dossiers: ['eleanor', 'hargreaves'],
    choices: [{ label: '현장을 건드리지 못하게 한다', next: 'p09' }],
  },
  {
    id: 'p09', run: 1, chapter: '프롤로그 · 아직 살인이라 부르지 않았다', time: '21:24', background: 'crime-scene.png',
    speaker: '마거릿 베일',
    text: '문이 안에서 잠겨 있었는데 사람이 죽었다면… 이 열차 안에 살인자가 있다는 뜻인가요?',
    sprite: 'margaret-default.png', dossiers: ['margaret'],
    choices: [{ label: '마거릿의 말에 주목한다', next: 'p10' }],
  },
  {
    id: 'p10', run: 1, chapter: '프롤로그 · 아직 살인이라 부르지 않았다', time: '21:24', background: 'crime-scene.png',
    speaker: '조너선 크로우',
    text: '쇼 양은 사인을 모른다고 했습니다. 그런데 베일 부인은 벌써 살인이라 단정했군요. 그리고 저쪽 신사도 시신보다 방 안의 물건부터 훑어보고 있고요.',
    sprite: 'jonathan-default.png', dossiers: ['jonathan'],
    choices: [{ label: '탐정 신분을 밝힌다', next: 'p11' }],
  },
  {
    id: 'p11', run: 1, chapter: '프롤로그 · 임시 수사 권한', time: '21:25', background: 'train-corridor.png',
    speaker: '아서 벨',
    text: '아서 벨, 사립 탐정입니다. 철도 경찰의 협조 공문도 있습니다. 다음 역까지 현장을 보존하고 승객들의 진술을 받겠습니다. 체포는 경찰에게 맡기죠.',
    sprite: 'arthur-default.png', choices: [{ label: '차장에게 문서를 건넨다', next: 'p12' }],
  },
  {
    id: 'p12', run: 1, chapter: '프롤로그 · 의심하는 기자', time: '21:26', background: 'train-corridor.png',
    speaker: '조너선 크로우',
    text: '사립 탐정에게 철도 경찰 공문이라… 직인 테두리와 발급 기관 표기가 낯섭니다. 차장이 허가했다고 문서가 진짜가 되는 건 아니죠. 그래도 좋습니다. 당신이 무엇을 찾는지 지켜보겠습니다.',
    sprite: 'jonathan-doubt.png', choices: [{ label: '7호 객실 조사로 돌아간다', next: 'c10' }],
  },
  {
    id: 'c10', run: 1, chapter: '1막 · 잠긴 객실', time: '21:31', background: 'crime-scene.png',
    speaker: '아서 벨',
    text: '시신의 손 아래 회중시계가 있다. 초침은 9시 10분에서 멎었다. 엘리너는 자신이 평소 박사의 시간을 맞췄다고 말했다. 사망 시각을 알려 주는 증거일까, 누군가 보여 주려는 시간일까.',
    sprite: 'arthur-deduction.png', evidence: ['fakeWatch'],
    choices: [{ label: '시계 주변을 더 조사한다', next: 'c11' }],
  },
  {
    id: 'c11', run: 1, chapter: '1막 · 네 개의 물건', time: '21:35', background: 'crime-scene.png',
    speaker: '내레이션',
    text: '재떨이에는 접수 번호가 없는 전보가 반쯤 타 있다. 바닥에는 젖은 검은 장갑, 책상에는 베일 가문의 은제 편지칼이 놓였다. 너무 많은 물건이 너무 정확하게 사람을 가리킨다.',
    evidence: ['telegram', 'glove', 'letterOpener'], choices: [{ label: '문과 내부 걸쇠를 확인한다', next: 'c12' }],
  },
  {
    id: 'c12', run: 1, chapter: '1막 · 밀실의 조건', time: '21:39', background: 'crime-scene.png',
    speaker: '토머스 리드',
    text: '외부 자물쇠는 열쇠로 열 수 있지만 내부 걸쇠는 안에서만 움직입니다. 박사가 누군가를 들인 뒤 직접 잠갔거나, 죽음의 원인이 사람이 나간 뒤에 작동했어야 합니다.',
    sprite: 'thomas-default.png', dossiers: ['thomas'],
    choices: [{ label: '용의자들을 응접실에 모은다', next: 'c13' }],
  },
  {
    id: 'c13', run: 1, chapter: '1막 · 다섯 사람의 비밀', time: '21:44', background: 'lounge.png',
    speaker: '아서의 내면',
    text: '엘리너는 시계를 관리했고 장갑을 잃었다. 마거릿의 편지칼이 현장에 있다. 토머스는 열쇠와 객실 구조를 안다. 조너선은 피해자를 추적했다. 이름을 숨긴 승객은 하그리브스를 알아본다. 모두 거짓말하고 있다. 그러나 거짓말이 곧 살인은 아니다.',
    choices: [{ label: '엘리너 쇼부터 심문한다', next: 'e10' }],
  },
  {
    id: 'e10', run: 1, chapter: '2막 · 엘리너의 시간', time: '21:47', background: 'lounge.png',
    speaker: '엘리너 쇼',
    text: '저는 박사의 연구 조수였습니다. 원고 정리, 환자 기록 분류, 일정 관리, 회중시계의 시간 조정까지 맡았어요. 사건 전에는 제 객실에서 발표 자료를 정리했다고 말했지만… 혼자였다는 걸 증명할 사람은 없습니다.',
    sprite: 'eleanor-talking.png', choices: [{ label: '박사와 다툰 이유를 묻는다', next: 'e11' }],
  },
  {
    id: 'e11', run: 1, chapter: '2막 · 엘리너의 시간', time: '21:49', background: 'lounge.png',
    speaker: '엘리너 쇼',
    text: '연구 기록 때문이었습니다. 처음에는 일부 희생이 더 많은 환자를 살리기 위해 필요하다는 박사의 말을 믿었습니다. 잘못된 줄 알면서도 기록의 표현을 고치고 침묵했어요. 이제 박사는 실패한 환자의 기록마저 없애려 했고, 저는 원본만은 보존해야 한다고 주장했습니다.',
    sprite: 'eleanor-sad.png', choices: [{ label: '멈춘 시계와 장갑을 함께 제시한다', next: 'e12' }],
  },
  {
    id: 'e12', run: 1, chapter: '2막 · 엘리너의 첫 거짓말', time: '21:52', background: 'lounge.png',
    speaker: '엘리너 쇼',
    text: '…8시 47분쯤 박사의 시계를 맞춘 것은 사실입니다. 처음에는 숨겼어요. 시계가 사망 시각을 가리키면 제가 가장 먼저 의심받을 테니까요. 장갑은 오후에 연결 통로 건조대에 두었고, 그 뒤 사라졌습니다.',
    sprite: 'eleanor-sad.png', choices: [{ label: '“거짓말은 인정하지만 살인은 아니라는 겁니까?”', next: 'e13' }],
  },
  {
    id: 'e13', run: 1, chapter: '2막 · 엘리너의 첫 거짓말', time: '21:53', background: 'lounge.png',
    speaker: '엘리너 쇼',
    text: '제가 시간을 숨겼다는 사실은 증명했습니다. 이제 제가 사람을 죽였다는 사실을 증명하세요. 그리고 아서… 당신은 다른 사람의 거짓말은 의심하면서, 왜 자신이 이미 정해 둔 결론은 의심하지 않죠?',
    sprite: 'eleanor-talking.png', choices: [{ label: '마거릿 베일을 심문한다', next: 'm10' }],
  },
  {
    id: 'm10', run: 1, chapter: '2막 · 되찾으려는 이름', time: '21:57', background: 'lounge.png',
    speaker: '마거릿 베일',
    text: '편지칼은 제 것입니다. 하그리브스에게 동생 에드먼드의 기록을 돌려달라고 요구하다 꺼냈고, 그가 빼앗아 책상에 두었습니다. 칼날에 피가 없다면 살해 도구가 아니라는 뜻이겠죠.',
    sprite: 'margaret-default.png', choices: [{ label: '에드먼드의 기록을 왜 찾는지 묻는다', next: 'm11' }],
  },
  {
    id: 'm11', run: 1, chapter: '2막 · 되찾으려는 이름', time: '21:59', background: 'lounge.png',
    speaker: '마거릿 베일',
    text: '동생은 치료 뒤 가족도 자기 이름도 알아보지 못했습니다. 박사는 그것을 “예상 가능한 퇴행”이라고 기록했죠. 나는 가문의 추문을 감추러 온 것이 아니라, 동생이 실패작으로 기록되는 것을 막으러 왔어요.',
    sprite: 'margaret-default.png', evidence: ['research'], choices: [{ label: '사건 전 객실 주변에서 본 것을 묻는다', next: 'm12' }],
  },
  {
    id: 'm12', run: 1, chapter: '2막 · 사전 점검', time: '22:01', background: 'lounge.png',
    speaker: '마거릿 베일',
    text: '출발 전 당신이 토머스에게 7호 객실의 자물쇠와 걸쇠를 물었습니다. 협조 공문을 들고 있었기에 탐정의 사전 점검이라고 생각했죠. 당신은 문을 세 번 열어 보고 열쇠 선반 위치까지 확인했습니다.',
    sprite: 'margaret-default.png', choices: [{ label: '희미한 기억을 수사 준비라고 해석한다', next: 't10' }],
  },
  {
    id: 't10', run: 1, chapter: '2막 · 비어 있던 승무원실', time: '22:05', background: 'crew-room.png',
    speaker: '토머스 리드',
    text: '7호에는 손님용 열쇠, 승무원실의 예비 열쇠, 제 비상 열쇠가 있습니다. 모두 외부 자물쇠만 열 뿐 내부 걸쇠는 건드릴 수 없습니다. 그래서 처음에는 예비 열쇠가 사건과 무관하다고 생각했습니다.',
    sprite: 'thomas-default.png', choices: [{ label: '승무원실을 비운 적이 있는지 묻는다', next: 't11' }],
  },
  {
    id: 't11', run: 1, chapter: '2막 · 비어 있던 승무원실', time: '22:07', background: 'crew-room.png',
    speaker: '토머스 리드',
    text: '…20시 41분, 저녁 서신을 배달하느라 자리를 비웠습니다. 처음에는 인정하기 싫었습니다. 근무 규정 위반이고, 누군가 그 공백을 이용했다면 제 실수로 사람이 죽은 셈이니까요.',
    sprite: 'thomas-default.png', evidence: ['keyLedger'], choices: [{ label: '아서에게 객실을 보여 준 이유를 추궁한다', next: 't12' }],
  },
  {
    id: 't12', run: 1, chapter: '2막 · 비어 있던 승무원실', time: '22:09', background: 'crew-room.png',
    speaker: '토머스 리드',
    text: '당신이 공문을 보여 주며 하그리브스가 위협받고 있다고 했습니다. 나는 그 말을 믿고 객실과 열쇠 대장을 보여 줬어요. 당신이 진짜 탐정이 아니라면… 나는 범인에게 열차의 약점을 직접 가르쳐 준 겁니다.',
    sprite: 'thomas-default.png', choices: [{ label: '조너선 크로우를 심문한다', next: 'j10' }],
  },
  {
    id: 'j10', run: 1, chapter: '2막 · 기록하는 사람', time: '22:13', background: 'lounge.png',
    speaker: '조너선 크로우',
    text: '나는 하그리브스의 연구 발표를 취재하러 온 것이 아닙니다. 치료 뒤 삶을 잃은 사람들의 편지, 병원 장부, 사라진 동의서를 추적해 왔습니다. 그가 런던에서 연구를 합법화하기 전에 증거를 공개하려 했죠.',
    sprite: 'jonathan-default.png', evidence: ['journalistNote'], choices: [{ label: '사건 전에 아서를 보았는지 묻는다', next: 'j11' }],
  },
  {
    id: 'j11', run: 1, chapter: '2막 · 기록하는 사람', time: '22:15', background: 'lounge.png',
    speaker: '조너선 크로우',
    text: '출발 전부터 봤습니다. 당신은 7호 객실 앞에서 “모든 준비가 끝났다”고 혼잣말했어요. 그리고 지금 가진 수첩은 앞부분만 여러 장 잘려 나갔습니다. 수사를 준비했다면 기록을 남겼을 텐데, 왜 임무에 관한 부분만 사라졌습니까?',
    sprite: 'jonathan-doubt.png', choices: [{ label: '보안을 위해 직접 없앴을 수 있다고 반박한다', next: 'j12' }],
  },
  {
    id: 'j12', run: 1, chapter: '2막 · 가짜 직인', time: '22:17', background: 'lounge.png',
    speaker: '조너선 크로우',
    text: '그렇다면 의뢰인과 사건명을 말해 보십시오. 신분증 직인의 선 간격도, 협조 공문의 기관명도 현재 양식과 다릅니다. 기억이 없다는 말은 문서가 진짜라는 증명이 아닙니다.',
    sprite: 'jonathan-doubt.png', choices: [{ label: '취재원의 이름을 왜 찢었는지 묻는다', next: 'j13' }],
  },
  {
    id: 'j13', run: 1, chapter: '2막 · 가짜 직인', time: '22:18', background: 'lounge.png',
    speaker: '조너선 크로우',
    text: '취재원은 하그리브스의 기록을 밖으로 가져오겠다고 약속했습니다. 그 사람을 살인 용의자로 만들 수 없어 이름을 지웠습니다. 나는 비밀을 숨겼지만, 당신은 정체를 숨기고 있군요. 어느 쪽이 이 죽음과 가까울까요?',
    sprite: 'jonathan-default.png', choices: [{ label: '이름 없는 승객에게 향한다', next: 's10' }],
  },
  {
    id: 's10', run: 1, chapter: '2막 · 이름 없는 환자', time: '22:21', background: 'corridor.png',
    speaker: '사무엘 워드',
    text: '내 이름은 사무엘 워드입니다. 브램웰 진료소의 전 환자였죠. 처음에 이름을 감춘 건 하그리브스가 죽어서가 아니라, 살아 있는 사람들이 나를 다시 “정상적이지 않은 사람”으로 기록할까 두려웠기 때문입니다.',
    sprite: 'samuel-default.png', dossiers: ['samuel'], evidence: ['ticket'], choices: [{ label: '하그리브스를 원망했는지 묻는다', next: 's11' }],
  },
  {
    id: 's11', run: 1, chapter: '2막 · 이름 없는 환자', time: '22:23', background: 'corridor.png',
    speaker: '사무엘 워드',
    text: '원망했습니다. 하지만 원망과 살인은 같은 선택이 아닙니다. 나는 그가 한 일을 증언하러 왔고, 내 기억을 또 다른 폭력으로 만들고 싶지는 않았습니다.',
    sprite: 'samuel-default.png', choices: [{ label: '“나를 알고 있습니까?”', next: 's12' }],
  },
  {
    id: 's12', run: 1, chapter: '2막 · 관찰자 역할', time: '22:25', background: 'corridor.png',
    speaker: '사무엘 워드',
    text: '같은 진료소의 관찰실에서 당신을 봤습니다. 당신은 다른 환자들보다 훨씬 어렸고 늘 가족을 기다렸죠. 하그리브스는 우리에게 고통스러운 기억을 “사건”이라고 부르게 했습니다. 누가, 언제, 무엇을 했는지 적고 감정을 지운 채 관찰하라고 했죠.',
    sprite: 'samuel-default.png', choices: [{ label: '“환자를 다른 사람과 착각한 겁니다.”', next: 's13' }],
  },
  {
    id: 's13', run: 1, chapter: '2막 · 관찰자 역할', time: '22:26', background: 'corridor.png',
    speaker: '사무엘 워드',
    text: '그럴지도 모르죠. 다만 당신은 그때도 작은 수첩을 들고 모든 사람을 용의자처럼 기록했습니다. 스스로를 “관찰하는 사람”이라고 불렀고요. 먼저 자신의 기록을 의심하십시오, 벨 씨.',
    sprite: 'samuel-default.png', choices: [{ label: '승무원실에서 남은 기록을 찾는다', next: 'c20' }],
  },
  {
    id: 'c20', run: 1, chapter: '3막 · 준비된 결론', time: '22:29', background: 'crew-room.png',
    speaker: '내레이션',
    text: '열쇠 대장 옆 서류철에는 사건 사흘 전 시계 작업 영수증 사본이 끼어 있다. 의뢰인 난에는 “A. Bell”이라고 적혔지만 잉크가 번져 있다. 아서는 자신이 수사를 위해 모조품을 추적한 흔적이라고 해석한다.',
    choices: [{ label: '사라진 수첩 기록과 영수증을 연결한다', next: 'c21' }],
  },
  {
    id: 'c21', run: 1, chapter: '3막 · 암전', time: '22:31', background: 'corridor.png',
    speaker: '내레이션',
    text: '가스등이 꺼지고 열차가 암흑에 잠긴다. 누군가 아서의 어깨를 스쳐 지나간다. 불이 돌아왔을 때 엘리너의 가방이 바닥에 쓰러져 있고 바깥 주머니의 단추가 풀려 있다.',
    choices: [{ label: '엘리너의 허락을 구해 가방을 연다', next: 'c22' }],
  },
  {
    id: 'c22', run: 1, chapter: '3막 · 조수의 가방', time: '22:33', background: 'lounge.png',
    speaker: '내레이션',
    text: '가방 안에는 하그리브스의 원본 연구 기록이 있다. 아서는 다른 칸을 살피기도 전에 자신도 모르게 바깥 주머니로 손을 뻗는다. 그곳에서 7호 객실 예비 열쇠와 전보에 쓰인 종이 조각이 나온다.',
    evidence: ['research'], choices: [{ label: '엘리너에게 기록과 열쇠를 설명하라고 한다', next: 'c23' }],
  },
  {
    id: 'c23', run: 1, chapter: '3막 · 엘리너의 두 번째 거짓말', time: '22:35', background: 'lounge.png',
    speaker: '엘리너 쇼',
    text: '기록은 제가 가져왔습니다. 조너선에게 전달해 연구를 폭로하려 했어요. 그래서 가방을 7호 객실에 잠시 두고 식당칸으로 갔습니다. 하지만 열쇠와 전보 조각은 처음 봅니다. 누군가 제가 비운 가방을 이용했어요.',
    sprite: 'eleanor-talking.png', choices: [{ label: '조너선에게 밀회를 확인한다', next: 'c24' }],
  },
  {
    id: 'c24', run: 1, chapter: '3막 · 서로 다른 죄', time: '22:37', background: 'lounge.png',
    speaker: '조너선 크로우',
    text: '8시 50분부터 9시까지 엘리너는 식당칸에서 나와 만났습니다. 기록을 훔친 일은 사실이지만 그 시간에는 7호 객실에 없었습니다. 다만 그 전과 그 후의 행적까지 보증할 수는 없습니다.',
    sprite: 'jonathan-default.png', choices: [{ label: '추리 보드에 모든 거짓말을 정리한다', next: 'c25' }],
  },
  {
    id: 'c25', run: 1, chapter: '4막 · 불완전한 추리', time: '22:40', background: 'lounge.png',
    speaker: '아서의 내면',
    text: '마거릿은 동생의 기록을 숨겼다. 토머스는 근무 공백을 숨겼다. 조너선은 취재원을 숨겼다. 사무엘은 이름을 숨겼다. 엘리너는 시계를 만지고 기록을 훔긴 사실을 숨겼다. 가장 많은 거짓말이 한 사람에게 모인다. 그러나 왜 나는 가방의 다른 칸을 보지도 않고 열쇠가 든 주머니를 먼저 열었을까.',
    sprite: 'arthur-deduction.png', choices: [{ label: '남은 모순보다 눈앞의 증거를 따른다', next: 'c26' }],
  },
  {
    id: 'c26', run: 1, chapter: '4막 · 최종 심문', time: '22:43', background: 'lounge.png',
    speaker: '아서 벨',
    text: '멈춘 시계를 마지막으로 만진 사람, 현장에 장갑이 남은 사람, 피해자의 기록을 훔친 사람, 가방에서 예비 열쇠와 전보 조각이 나온 사람. 이 모든 연결을 우연이라 부를 수는 없습니다.',
    sprite: 'arthur-point.png', choices: [{ label: '엘리너의 마지막 답을 듣는다', next: 'c27' }],
  },
  {
    id: 'c27', run: 1, chapter: '4막 · 최종 심문', time: '22:44', background: 'lounge.png',
    speaker: '엘리너 쇼',
    text: '그렇다면 한 가지만 대답해요. 내 가방을 열었을 때 당신은 안쪽 기록도, 옆 주머니도 보지 않았어요. 곧장 예비 열쇠가 든 바깥 주머니를 열었죠. 당신은 열쇠를 찾아낸 건가요, 아니면 어디 있는지 알고 있었던 건가요?',
    sprite: 'eleanor-sad.png', choices: [{ label: '최종 범인을 지목한다', next: 'final1' }],
  },
  {
    id: 'final1', run: 1, chapter: '4막 · 최종 지목', time: '22:45', background: 'lounge.png',
    speaker: '아서 벨',
    text: '다음 역까지 시간이 없다. 경찰에게 넘길 한 사람을 선택해야 한다. 이 사건의 범인은—',
    sprite: 'arthur-point.png', choices: [
      { label: '엘리너 쇼', next: 'endingNormal1', emphasis: true },
      { label: '마거릿 베일', next: 'endingBad1' },
      { label: '토머스 리드', next: 'endingBad1' },
      { label: '조너선 크로우', next: 'endingBad1' },
      { label: '사무엘 워드', next: 'endingBad1' },
    ],
  },
  {
    id: 'endingNormal1', run: 1, chapter: 'ENDING 01 · 대신 짊어진 죄', time: '22:47', background: 'lounge.png',
    speaker: '엘리너 쇼',
    text: '…그래요. 제가 했어요. 기록을 훔쳤고, 시계를 만졌고, 박사님을 원망했습니다. 오래전부터 잘못된 줄 알면서도 “더 큰 치료를 위한 희생”이라며 눈을 감았습니다. 이제 그 결과까지 외면하지 않겠어요. 그만하세요, 아서.',
    sprite: 'eleanor-resigned.png', ending: 'normal', choices: [{ label: '엘리너에게 사건의 전말을 묻는다', next: 'endingNormalConfession' }],
  },
  {
    id: 'endingNormalConfession', run: 1, chapter: 'ENDING 01 · 대신 짊어진 죄', time: '22:49', background: 'lounge.png',
    speaker: '엘리너 쇼',
    text: '시계를 바꾸고 전보를 준비한 것도, 열쇠와 장갑을 옮긴 것도 저라고 기록하세요. 혼란스러워하던 아서에게 진짜 시계를 맡겨 그의 짐에 숨겼습니다. 그는 자신이 무엇을 옮기는지도 몰랐어요. …이것이 제가 진술할 전부입니다.',
    sprite: 'eleanor-resigned.png', ending: 'normal', choices: [{ label: '모순이 남은 자백을 받아 적는다', next: 'endingNormal2' }],
  },
  {
    id: 'endingNormal2', run: 1, chapter: 'ENDING 01 · 대신 짊어진 죄', time: '23:02', background: 'platform.png',
    speaker: '내레이션',
    text: '엘리너는 세부적인 살해 원리를 설명하지 못하면서도 자백을 거두지 않는다. 연행되기 전, 그녀는 아서를 향해 미안함과 안도감이 뒤섞인 표정을 짓는다. 아서는 사건을 해결했다는 박수를 받지만, 앞부분이 잘려 나간 수첩의 굳은 뒤표지만 오래 바라본다.',
    ending: 'normal', choices: [{ label: '크레디트 이후', next: 'afterCredit' }],
  },
  {
    id: 'afterCredit', run: 1, chapter: '크레디트 후 · 두 번째 시계', time: '다음 날 08:12', background: 'police-room.png',
    speaker: '경찰관',
    text: '쇼 양은 진짜 시계를 아서 벨의 짐에 숨겼다고 했습니다. 하지만 정확한 장소도 시각도 말하지 못했습니다. 더구나 이 시계는 9시 10분 뒤에도 작동했습니다. 사건의 시간이 처음부터 잘못된 겁니다.',
    evidence: ['trueWatch'], choices: [{ label: '2회차 · 기억 재구성 해금', action: 'unlock', emphasis: true }],
  },
  {
    id: 'endingBad1', run: 1, chapter: 'ENDING 02 · 무너진 명탐정', time: '22:48', background: 'lounge.png',
    speaker: '조너선 크로우',
    text: '그 지목은 시계와 전보, 예비 열쇠를 하나의 동선으로 설명하지 못합니다. 그리고 방금 다음 역의 경찰 전신망으로 확인했습니다. “아서 벨”이라는 등록 탐정은 존재하지 않습니다.',
    sprite: 'jonathan-doubt.png', ending: 'bad', choices: [{ label: '조사 권한을 반납한다', next: 'endingBad2' }],
  },
  {
    id: 'endingBad2', run: 1, chapter: 'ENDING 02 · 무너진 명탐정', time: '23:04', background: 'platform.png',
    speaker: '내레이션',
    text: '잘못된 지목으로 승객들의 신뢰는 무너진다. 경찰은 아서의 신분증과 수첩을 압수하고 사건을 원점에서 다시 조사한다. 아서는 자신이 탐정이라는 사실조차 증명하지 못한 채 플랫폼에 남는다.',
    ending: 'bad', choices: [{ label: '1회차를 다시 시작한다', action: 'reset' }, { label: '타이틀로 돌아간다', action: 'title' }],
  },

  {
    id: 'r00', run: 2, chapter: '2회차 · 자백의 균열', time: '다음 날 08:40', background: 'police-room.png',
    speaker: '경찰관',
    text: '쇼 양의 자백은 물증과 맞지 않습니다. 진짜 시계는 당신의 짐에서 나왔고, 시계 작업 의뢰인도 당신입니다. 이번에는 당신의 기억을 사실로 취급하지 않고, 다른 증거와 대조하겠습니다.',
    sprite: 'arthur-confused.png', choices: [{ label: '엘리너에게 자백의 이유를 묻는다', next: 'r01' }],
  },
  {
    id: 'r01', run: 2, chapter: '2회차 · 자백의 균열', time: '08:43', background: 'police-room.png',
    speaker: '엘리너 쇼',
    text: '자백을 철회하겠습니다. 나는 기록을 훔쳤지만 하그리브스를 죽이지 않았어요. 벨 가족 실험의 원본을 읽고도, 더 많은 사람을 살리기 위한 희생이라는 박사의 말을 받아들였습니다. 훗날 아서의 가족이 죽은 이유를 지우는 정정본에 서명했고요. 그의 복수를 막을 자격이 없다고 생각해 아서의 손을 들어주려 했습니다.',
    sprite: 'eleanor-reveal.png', choices: [{ label: '“그렇다면 나는 누구였습니까?”', next: 'r02' }],
  },
  {
    id: 'r02', run: 2, chapter: '2회차 · 확인되지 않은 탐정', time: '08:45', background: 'police-room.png',
    speaker: '엘리너 쇼',
    text: '당신은 탐정이 아니에요. 어린 시절 하그리브스의 가족 단위 실험에서 홀로 살아남은 환자이자 이 사건의 이해관계자예요. 하지만 피해자라는 사실만으로 범인도, 무죄도 되지는 않습니다. 이번에는 당신 대신 결론 내리지 않을게요. 직접 증거를 끝까지 보세요.',
    sprite: 'eleanor-reveal.png', dossiers: ['arthur'], choices: [{ label: '두 개의 회중시계를 비교한다', next: 'r10' }],
  },
  {
    id: 'r10', run: 2, chapter: '증거 재해석 · 조작된 시간', time: '08:50', background: 'police-room.png',
    speaker: '경찰관',
    text: '현장의 시계는 피해자 소유가 아닌 모조품입니다. 진짜 시계는 아서 씨 수하물 안쪽에서 나왔고, 사건 뒤에도 작동했습니다. 9시 10분은 사망 시각이 아니라 범인이 보여 주려 한 시각입니다.',
    evidence: ['trueWatch'], choices: [{ label: '시계 작업 영수증을 확인한다', next: 'r11' }],
  },
  {
    id: 'r11', run: 2, chapter: '증거 재해석 · 조작된 시간', time: '08:53', background: 'police-room.png',
    speaker: '아서 벨',
    text: '의뢰인 A. Bell. 내 이름이다. 사건 사흘 전, 나는 진짜 시계와 같은 외형의 물건을 준비했다. 수사를 위해 추적한 것이 아니라면… 시계를 바꿀 계획을 세웠다는 뜻이다.',
    sprite: 'arthur-confused.png', evidence: ['workReceipt'], choices: [
      { label: '9시 10분은 내가 만든 거짓 단서다', next: 'r20', emphasis: true },
      { label: '엘리너가 내 이름으로 의뢰했다', next: 'rWrongWatch' },
    ],
  },
  {
    id: 'rWrongWatch', run: 2, chapter: '기억의 저항 · 시계', time: '—', background: 'memory.png',
    speaker: '엘리너 쇼',
    text: '나는 그 가게의 위치도 몰랐어요. 영수증 뒷면에는 당신이 늘 쓰던 관찰 기호까지 남아 있습니다. 나를 의심하려면 먼저 이 흔적을 설명해야 해요.',
    sprite: 'eleanor-sad.png', choices: [{ label: '내 이름이 적힌 영수증을 받아들인다', next: 'r20' }],
  },
  {
    id: 'r20', run: 2, chapter: '증거 재해석 · 위조된 정체', time: '09:00', background: 'police-room.png',
    speaker: '조너선 크로우',
    text: '신분증의 인쇄소는 십 년 전에 폐업했고, 협조 공문의 서명자는 존재하지 않습니다. 두 문서 모두 같은 종이와 잉크를 썼습니다. 주문 장부에는 “A. Bell”이라고 적혀 있죠.',
    sprite: 'jonathan-doubt.png', evidence: ['forgedDocuments'], choices: [{ label: '그런데 왜 내가 위조품을 진짜라고 믿었는지 묻는다', next: 'r21' }],
  },
  {
    id: 'r21', run: 2, chapter: '증거 재해석 · 관찰자 재구성', time: '09:04', background: 'police-room.png',
    speaker: '경찰관',
    text: '봉인 기록에서 두 시기의 진료 차트를 찾았습니다. 첫 기록의 아서는 가족과 함께 입원한 어린 환자였고, 마지막 기록에는 성인이 된 회계 서기로 적혀 있습니다. 두 기록 모두 담당의는 하그리브스, 치료명은 “관찰자 재구성 요법”입니다.',
    evidence: ['medicalRecord'], choices: [{ label: '벨 가족 실험의 원본과 정정본을 비교한다', next: 'r21a' }],
  },
  {
    id: 'r21a', run: 2, chapter: '증거 재해석 · 지워진 가족', time: '09:07', background: 'police-room.png',
    speaker: '엘리너 쇼',
    text: '원본에는 가족들이 실험 도중 차례로 숨지고 어린 아서만 살아남았다고 적혀 있습니다. 그러나 정정본은 사망 원인을 기존 질환과 환자들의 비협조로 바꿨습니다. 하그리브스는 “의학의 전진을 위해 불필요한 세부를 덜어내라”고 했고, 나는 잘못인 줄 알면서도 확인 서명을 했어요.',
    sprite: 'eleanor-sad.png', evidence: ['bellFamilyFile'], choices: [{ label: '치료실의 기억을 따라간다', next: 'r22' }],
  },
  {
    id: 'r22', run: 2, chapter: '기억 · 탐정이 만들어진 방', time: '과거', background: 'memory.png',
    speaker: '기억 속 하그리브스',
    text: '가족의 죽음을 네 일로만 생각하니 견디지 못하는 거다. 한 걸음 물러서라. 누가, 언제, 무엇을 했는지 적어. 슬픔이 아니라 단서만 보아라. 살아남은 너는 피해자가 아니라 이 실험을 증명할 관찰자다.',
    sprite: 'hargreaves-default.png', choices: [{ label: '기억 속 아서의 대답을 듣는다', next: 'r23' }],
  },
  {
    id: 'r23', run: 2, chapter: '기억 · 탐정이 만들어진 방', time: '과거', background: 'memory.png',
    speaker: '기억 속 아서',
    text: '관찰하는 사람이면 가족이 왜 죽었는지 찾을 수 있습니까? 그 일을 만든 사람에게 책임을 물을 수 있습니까? …그렇다면 나는 탐정이 되겠습니다. 사건의 밖에 서서, 지워진 것을 전부 기록하는 사람.',
    sprite: 'arthur-default.png', choices: [{ label: '현재의 아서가 그 말을 해석한다', next: 'r24' }],
  },
  {
    id: 'r24', run: 2, chapter: '자기 심문 · 나는 왜 탐정이었나', time: '09:10', background: 'memory.png',
    speaker: '아서 벨',
    text: '처음의 “탐정”은 가족의 죽음에서 살아남기 위한 역할이었다. 성인이 된 나는 그 역할로 하그리브스의 기록을 추적했고, 마침내 위장 신분으로 이용해 객실과 열쇠에 접근했다. 약을 먹은 뒤 기억이 흐려졌을 때는 내가 준비한 신분증과 공문을 보고 그 역할을 진짜 나라고 믿었다.',
    sprite: 'arthur-reveal.png', choices: [
      { label: '탐정은 우연히 생긴 착각이 아니라 내가 남긴 도피처였다', next: 'r30', emphasis: true },
      { label: '하그리브스가 나를 탐정으로 만들었다', next: 'rWrongIdentity' },
    ],
  },
  {
    id: 'rWrongIdentity', run: 2, chapter: '기억의 저항 · 정체', time: '—', background: 'memory.png',
    speaker: '사무엘 워드',
    text: '그가 관찰자 역할을 강요한 것은 사실입니다. 하지만 사건 전 가짜 문서를 주문하고 역할을 범행에 이용한 선택까지 그의 탓으로 돌릴 수는 없습니다. 강요받은 상처와 스스로 한 행동을 구분해야 합니다.',
    sprite: 'samuel-default.png', choices: [{ label: '상처와 선택을 구분한다', next: 'r30' }],
  },
  {
    id: 'r30', run: 2, chapter: '증거 재해석 · 칼리고 정제', time: '09:16', background: 'arthur-cabin.png',
    speaker: '경찰관',
    text: '약병과 혈액을 분석했습니다. 칼리고 정제는 손 떨림과 두통을 완화하는 처방약입니다. 극도로 지친 상태에서는 직전 기억을 회상하기 어렵게 만들 수 있습니다. 하지만 범행 계획은 복용 전에 이미 실행됐습니다.',
    evidence: ['medicineAnalysis'], choices: [{ label: '약이 없애지 못하는 책임을 인정한다', next: 'r31', emphasis: true }, { label: '약 때문에 내가 범인이 되었다', next: 'rWrongDrug' }],
  },
  {
    id: 'rWrongDrug', run: 2, chapter: '기억의 저항 · 약', time: '—', background: 'memory.png',
    speaker: '아서의 내면',
    text: '약을 먹은 시각은 21시 18분. 위조 전보, 열쇠 절취, 시계 교체는 그보다 먼저 일어났다. 약은 행동의 원인이 아니라 내가 이미 한 행동을 보지 못하게 한 마지막 문이었다.',
    sprite: 'arthur-confused.png', choices: [{ label: '복용 시각과 범행 시각을 분리한다', next: 'r31' }],
  },
  {
    id: 'r31', run: 2, chapter: '추가 진술 · 토머스', time: '09:21', background: 'crew-room.png',
    speaker: '토머스 리드',
    text: '당신은 출발 전 문을 세 번 확인하고, 서신 배달 시각까지 물었습니다. 나는 공문을 믿어 모두 알려 줬습니다. 20시 41분 자리를 비운 사이 예비 열쇠가 사라졌고, 그 열쇠는 나중에 쇼 양의 가방에서 나왔습니다.',
    sprite: 'thomas-default.png', choices: [{ label: '마거릿의 목격을 다시 듣는다', next: 'r32' }],
  },
  {
    id: 'r32', run: 2, chapter: '추가 진술 · 마거릿', time: '09:24', background: 'lounge.png',
    speaker: '마거릿 베일',
    text: '나는 당신이 열쇠 선반을 바라보는 걸 봤습니다. 그때는 탐정의 점검이라 생각했죠. 사건 뒤에는 쇼 양의 가방을 열자마자 망설임 없이 바깥 주머니로 손을 넣었습니다. 우연히 고른 손놀림처럼 보이지 않았어요.',
    sprite: 'margaret-default.png', choices: [{ label: '조너선의 수첩 분석을 듣는다', next: 'r33' }],
  },
  {
    id: 'r33', run: 2, chapter: '추가 진술 · 조너선', time: '09:27', background: 'lounge.png',
    speaker: '조너선 크로우',
    text: '수첩에서 잘려 나간 자리의 종이 섬유와 다음 장에 남은 필압을 복원했습니다. “장갑은 현장. 열쇠는 가방. 시계는 9시 10분.” 조사 기록이 아니라 물건을 둘 위치입니다. 불탄 전보의 초안도 같은 필체예요.',
    sprite: 'jonathan-default.png', evidence: ['telegramDraft'], choices: [{ label: '사무엘의 마지막 증언을 듣는다', next: 'r34' }],
  },
  {
    id: 'r34', run: 2, chapter: '추가 진술 · 사무엘', time: '09:30', background: 'corridor.png',
    speaker: '사무엘 워드',
    text: '나는 20시 56분쯤 당신이 연결 통로 건조대에서 검은 장갑을 가져가는 걸 봤습니다. 말을 못 한 건 두려웠기 때문입니다. 전 환자의 증언보다 “명탐정”의 말이 더 믿음받을 거라고 생각했죠.',
    sprite: 'samuel-default.png', choices: [{ label: '사무엘의 증언을 사건 시간표에 놓는다', next: 'r40' }],
  },
  {
    id: 'r40', run: 2, chapter: '기억 재구성 M1 · 위조 전보', time: '19:35', background: 'memory.png',
    speaker: '기억 속 아서',
    text: '저녁 서신 묶음에 위조 전보를 넣는다. 하그리브스가 정해진 시각에 시계의 봉인된 덮개를 확인하고, 누구도 들이지 않은 채 스스로 문을 잠그도록 만드는 문장이다.',
    sprite: 'arthur-default.png', choices: [{ label: '다음 기억', next: 'r41' }],
  },
  {
    id: 'r41', run: 2, chapter: '기억 재구성 M2 · 사전 점검', time: '19:55', background: 'crew-room.png',
    speaker: '기억 속 아서',
    text: '위조 공문을 토머스에게 보여 준다. 7호 객실의 구조, 내부 걸쇠, 예비 열쇠의 위치, 서신 배달로 승무원실이 비는 시간을 확인한다. 탐정의 점검이라는 말이 모든 문을 연다.',
    sprite: 'arthur-default.png', choices: [{ label: '다음 기억', next: 'r42' }],
  },
  {
    id: 'r42', run: 2, chapter: '기억 재구성 M3 · 두 개의 시계', time: '20:42', background: 'crime-scene.png',
    speaker: '기억 속 아서',
    text: '토머스가 자리를 비운 사이 예비 열쇠로 7호 객실에 들어간다. 하그리브스가 식당칸에 둔 진짜 시계를 가져오고, 같은 외형의 모조품을 그 자리에 놓는다.',
    sprite: 'arthur-default.png', choices: [{ label: '다음 기억', next: 'r43' }],
  },
  {
    id: 'r43', run: 2, chapter: '기억 재구성 M4 · 조수의 가방', time: '20:54', background: 'memory.png',
    speaker: '기억 속 아서',
    text: '엘리너가 조너선을 만나러 간 사이, 7호 객실에 남겨 둔 가방의 바깥 주머니에 예비 열쇠와 전보 조각을 넣는다. 그녀가 훔친 연구 기록은 범행 동기처럼 보일 것이다.',
    sprite: 'arthur-default.png', evidence: ['spareKey'], choices: [{ label: '다음 기억', next: 'r44' }],
  },
  {
    id: 'r44', run: 2, chapter: '기억 재구성 M5 · 젖은 장갑', time: '20:56', background: 'corridor.png',
    speaker: '기억 속 아서',
    text: '연결 통로 건조대에서 엘리너의 젖은 장갑을 가져와 7호 객실 바닥에 둔다. 진짜 주인의 물건을 거짓 위치에 놓으면, 가장 자연스러운 거짓말이 완성된다.',
    sprite: 'arthur-default.png', choices: [{ label: '다음 기억', next: 'r45' }],
  },
  {
    id: 'r45', run: 2, chapter: '기억 재구성 M6 · 잠긴 방', time: '21:10', background: 'crime-scene.png',
    speaker: '내레이션',
    text: '하그리브스는 전보의 지시를 믿고 혼자 객실에 들어가 외부 자물쇠와 내부 걸쇠를 잠근다. 그는 가짜 회중시계의 봉인된 덮개를 연다. 잠시 뒤, 누구도 드나들지 않은 밀실 안에서 계획된 죽음이 완성된다.',
    choices: [{ label: '허구 장치의 구조가 아니라 계획한 사람을 본다', next: 'r46' }],
  },
  {
    id: 'r46', run: 2, chapter: '기억 재구성 M7 · 탐정으로 깨어나다', time: '21:18', background: 'arthur-cabin.png',
    speaker: '기억 속 아서',
    text: '모든 배치를 마친 아서는 범행 계획이 적힌 장들을 수첩에서 잘라 뒤표지의 이중 가죽 안에 숨긴다. 객실로 돌아와 후유증 약을 먹고, 피로와 공포 속에서 직전 기억을 잃는다. 눈을 뜬 그는 가짜 신분증과 공문을 보고 “맞아, 이 일을 하려고 했었지”라고 생각하며 가장 익숙한 관찰자 역할—탐정—을 자기 정체로 받아들인다.',
    sprite: 'arthur-confused.png', choices: [{ label: '기억 속 탐정과 범인을 마주한다', next: 'r50' }],
  },
  {
    id: 'r50', run: 2, chapter: '자기 심문 · 거울 속 두 사람', time: '09:40', background: 'memory.png',
    speaker: '아서 벨',
    text: '탐정인 나는 증거를 따라간다고 믿었다. 범인인 나는 증거가 어디에 있는지 이미 알고 있었다. 나는 하그리브스에게 복수하는 것만으로는 부족하다고 생각했다. 가족의 죽음을 지우는 데 서명한 엘리너까지 공범으로 심판하려 했고, 그녀의 죄책감마저 누명의 일부로 이용했다.',
    sprite: 'arthur-reveal.png', choices: [{ label: '수첩 뒤표지 안쪽을 조사한다', next: 'r51' }],
  },
  {
    id: 'r51', run: 2, chapter: '수첩에서 찢어 숨긴 장들', time: '09:44', background: 'police-room.png',
    speaker: '내레이션',
    text: '수첩의 뒤표지 가죽을 분리하자, 앞부분에서 잘라 낸 종이들이 여러 번 접힌 채 나온다. 전보, 열쇠, 시계, 장갑의 배치 순서가 적혀 있다. 마지막에는 한 문장만 남아 있다. “기억하지 못하면, 나는 무죄인가?”',
    evidence: ['lastPage'], choices: [{ label: '마지막 질문에 답한다', next: 'r52' }],
  },
  {
    id: 'r52', run: 2, chapter: '자기 심문 · 책임', time: '09:46', background: 'memory.png',
    speaker: '아서 벨',
    text: '하그리브스는 내 가족을 실험의 희생으로 만들고, 나를 유일한 성공 사례처럼 기록했다. 엘리너는 잘못을 알면서도 그 죽음을 문서에서 지웠다. 내가 복수하고 싶었던 이유는 사라지지 않는다. 그러나 시계를 바꾸고 전보를 쓰고 그녀에게 누명을 씌운 선택은 내 것이다. 살아남은 피해자와 살인을 계획한 가해자는 모두 나다.',
    sprite: 'arthur-reveal.png', choices: [{ label: '모든 사람 앞에서 최종 지목한다', next: 'final2' }],
  },
  {
    id: 'final2', run: 2, chapter: '최종 지목 · 거울 속 범인', time: '09:50', background: 'lounge.png',
    speaker: '아서 벨',
    text: '9시 10분을 만든 사람, 전보를 쓴 사람, 열쇠와 장갑을 옮긴 사람, 가짜 탐정에게 수사를 맡긴 사람. 이 사건의 마지막 용의자는—',
    sprite: 'arthur-point.png', choices: [
      { label: '아서 벨 — 나 자신', next: 'true1', emphasis: true },
      { label: '엘리너 쇼', next: 'rNotYet' },
      { label: '사무엘 워드', next: 'rNotYet' },
    ],
  },
  {
    id: 'rNotYet', run: 2, chapter: '마지막 모순 · 또 다른 도피', time: '—', background: 'memory.png',
    speaker: '아서의 내면',
    text: '다른 사람을 지목하면 탐정 역할은 지킬 수 있다. 그러나 시계 영수증, 위조 문서, 수첩 필체, 기억 속 손은 모두 남는다. 이번에는 결론을 준비하지 말고 증거가 가리키는 이름을 말해야 한다.',
    sprite: 'arthur-confused.png', choices: [{ label: '마지막 용의자를 다시 지목한다', next: 'final2' }],
  },
  {
    id: 'true1', run: 2, chapter: 'HIDDEN ENDING · 거울 속 범인', time: '09:52', background: 'lounge.png',
    speaker: '아서 벨',
    text: '범인은 나, 아서 벨입니다. 엘리너의 자백은 거짓입니다. 나는 하그리브스를 죽일 계획을 세우고, 다른 사람들의 비밀을 단서로 바꿔 엘리너에게 죄를 씌웠습니다. 기억하지 못했다는 사실은 책임을 없애지 않습니다.',
    sprite: 'arthur-reveal.png', ending: 'true', choices: [{ label: '엘리너의 대답을 듣는다', next: 'true2' }],
  },
  {
    id: 'true2', run: 2, chapter: 'HIDDEN ENDING · 대신 선택하지 않기', time: '09:54', background: 'lounge.png',
    speaker: '엘리너 쇼',
    text: '나는 당신 가족의 죽음을 지운 기록에 서명했고, 그 죄책감 때문에 당신의 복수에 손을 들어주려 했어요. 하지만 그것도 또 다른 진실 조작이었습니다. 이번에는 당신 대신 죄도, 결론도 선택하지 않겠습니다. 내가 한 일은 내 이름으로 증언할게요.',
    sprite: 'eleanor-reveal.png', ending: 'true', choices: [{ label: '사건을 올바르게 기록한다', next: 'true3' }],
  },
  {
    id: 'true3', run: 2, chapter: '진엔딩 · 올바르게 기록되는 사건', time: '며칠 뒤', background: 'ending.png',
    speaker: '내레이션',
    text: '엘리너는 석방된 뒤 자신이 벨 가족을 포함한 실험 기록을 수정하고 침묵한 사실을 증언한다. 조너선은 생존자들의 신원을 보호하면서 하그리브스의 실험과 희생된 가족들을 보도한다. 마거릿은 동생의 기록을 되찾고, 토머스는 근무 과실을 인정하며, 사무엘은 처음으로 자신의 이름으로 증언한다. 아서는 처벌을 받아들이고, 지워졌던 가족의 이름과 함께 탐정이 아닌 자신의 이름으로 사건 기록에 서명한다.',
    ending: 'true', choices: [{ label: '타이틀로 돌아간다', action: 'title', emphasis: true }],
  },
];

export const sceneMap: Record<string, Scene> = Object.fromEntries(scenes.map((scene) => [scene.id, scene]));
