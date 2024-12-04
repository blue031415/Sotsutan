type subjectList = {
  name: string;
  index: number;
  height: number;
};

const subjectsList: subjectList[] = [
  { name: "微分積分A", index: 0, height: 1 },
  { name: "微分積分B", index: 1, height: 1 },
  { name: "線形代数A", index: 2, height: 1 },
  { name: "線形代数B", index: 3, height: 1 },
  { name: "情報数学A", index: 4, height: 1 },
  { name: "確率と統計", index: 5, height: 1 },
  { name: "プログラミング入門A", index: 6, height: 1 },
  { name: "プログラミング入門B", index: 7, height: 1 },
  { name: "プログラミング", index: 8, height: 1 },
  { name: "コンピュータシステムとOS", index: 9, height: 1 },
  { name: "データ構造とアルゴリズム", index: 10, height: 1 },
  { name: "データ構造とアルゴリズム実習", index: 11, height: 1 },
  { name: "データ工学概論", index: 12, height: 1 },
];

const subjectsList_advance: subjectList[] = [
  { name: "卒業研究A", index: 0, height: 1 },
  { name: "卒業研究B", index: 1, height: 2 },
  { name: "情報メディア実験A", index: 3, height: 1 },
  { name: "情報メディア実験B", index: 4, height: 1 },
  { name: "専門英語A", index: 5, height: 1 },
  { name: "専門英語B", index: 6, height: 1 },
];

const information_list: subjectList[] = [
  { name: "情報リテラシー(講義)", index: 0, height: 1 },
  { name: "情報リテラシー(演習)", index: 1, height: 1 },
  { name: "データサイエンス", index: 2, height: 1 },
];

const sougou_must_list: subjectList[] = [
  { name: "ファーストイヤーセミナー", index: 0, height: 1 },
  { name: "学問への誘い", index: 1, height: 1 },
];

const pe_list: subjectList[] = [
  { name: "基礎体育(春)", index: 0, height: 1 },
  { name: "基礎体育(秋)", index: 1, height: 1 },
  { name: "応用体育(春)", index: 2, height: 1 },
  { name: "応用体育(秋)", index: 3, height: 1 },
];
const English_list: subjectList[] = [
  { name: "English Reading Skills I", index: 0, height: 1 },
  { name: "English Presentation Skills I", index: 1, height: 1 },
  { name: "English Reading Skills II", index: 2, height: 1 },
  { name: "English Presentation Skills II", index: 3, height: 1 },
];
export {
  subjectsList,
  subjectsList_advance,
  information_list,
  sougou_must_list,
  pe_list,
  English_list,
};
