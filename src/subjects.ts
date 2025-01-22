type subjectList = {
  name: string;
  index: number;
  height: number;
  status: boolean;
};

const subjectsList: subjectList[] = [
  { name: "微分積分A", index: 0, height: 1, status: true },
  { name: "微分積分B", index: 1, height: 1, status: true },
  { name: "線形代数A", index: 2, height: 1, status: true },
  { name: "線形代数B", index: 3, height: 1, status: true },
  { name: "情報数学A", index: 4, height: 1, status: true },
  { name: "確率と統計", index: 5, height: 1, status: true },
  { name: "プログラミング入門A", index: 6, height: 1, status: true },
  { name: "プログラミング入門B", index: 7, height: 1, status: true },
  { name: "プログラミング", index: 8, height: 1, status: true },
  { name: "コンピュータシステムとOS", index: 9, height: 1, status: true },
  { name: "データ構造とアルゴリズム", index: 10, height: 1, status: true },
  { name: "データ構造とアルゴリズム実習", index: 11, height: 1, status: true },
  { name: "データ工学概論", index: 12, height: 1, status: true },
];

const subjectsList_advance: subjectList[] = [
  { name: "卒業研究A", index: 0, height: 1, status: true },
  { name: "卒業研究B", index: 1, height: 2, status: true },
  { name: "情報メディア実験A", index: 3, height: 1, status: true },
  { name: "情報メディア実験B", index: 4, height: 1, status: true },
  { name: "専門英語A", index: 5, height: 1, status: true },
  { name: "専門英語B", index: 6, height: 1, status: true },
];

const information_list: subjectList[] = [
  { name: "情報リテラシー(講義)", index: 0, height: 1, status: true },
  { name: "情報リテラシー(演習)", index: 1, height: 1, status: true },
  { name: "データサイエンス", index: 2, height: 1, status: true },
];

const sougou_must_list: subjectList[] = [
  { name: "ファーストイヤーセミナー", index: 0, height: 1, status: true },
  { name: "学問への誘い", index: 1, height: 1, status: true },
];

const pe_list: subjectList[] = [
  { name: "基礎体育(春)", index: 0, height: 1, status: true },
  { name: "基礎体育(秋)", index: 1, height: 1, status: true },
  { name: "応用体育(春)", index: 2, height: 1, status: true },
  { name: "応用体育(秋)", index: 3, height: 1, status: true },
];
const English_list: subjectList[] = [
  { name: "English Reading Skills I", index: 0, height: 1, status: true },
  { name: "English Presentation Skills I", index: 1, height: 1, status: true },
  { name: "English Reading Skills II", index: 2, height: 1, status: true },
  { name: "English Presentation Skills II", index: 3, height: 1, status: true },
];
export {
  subjectsList,
  subjectsList_advance,
  information_list,
  sougou_must_list,
  pe_list,
  English_list,
};
