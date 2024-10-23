import "./App.css";
import { useState } from "react";

function App() {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [subjectStatuses, setSubjectStatuses] = useState<
    { name: string; index: number }[]
  >([]);
  const [subjectStatuses_advance, setSubjectStatuses_advance] = useState<
    { name: string; index: number; height: number }[]
  >([]);

  const [infomation, setInfomations] = useState<
    { name: string; index: number }[]
  >([]);

  const subjectsList = [
    { name: "微分積分A", index: 0 },
    { name: "微分積分B", index: 1 },
    { name: "線形代数A", index: 2 },
    { name: "線形代数B", index: 3 },
    { name: "情報数学A", index: 4 },
    { name: "確率と統計", index: 5 },
    { name: "プログラミング入門A", index: 6 },
    { name: "プログラミング入門B", index: 7 },
    { name: "プログラミング", index: 8 },
    { name: "コンピュータシステムとOS", index: 9 },
    { name: "データ構造とアルゴリズム", index: 10 },
    { name: "データ構造とアルゴリズム実習", index: 11 },
    { name: "データ工学概論", index: 12 },
  ];

  const subjectsList_advance = [
    { name: "卒業研究A", index: 0, height: 1 },
    { name: "卒業研究B", index: 1, height: 2 },
    { name: "情報メディア実験A", index: 3, height: 1 },
    { name: "情報メディア実験B", index: 4, height: 1 },
    { name: "専門英語A", index: 5, height: 1 },
    { name: "専門英語B", index: 6, height: 1 },
  ];

  const infomation_list = [
    { name: "情報リテラシー(講義)", index: 0 },
    { name: "情報リテラシー(演習)", index: 1 },
    { name: "データサイエンス", index: 2 },
  ];

  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };

  const fetchData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const text = e.target?.result as string;
        if (!text) return;

        const data = text
          .trim()
          .split("\n")
          .map((line) => line.split(",").map((x) => x.trim()));

        const updatedSubjectStatuses: { name: string; index: number }[] = [];
        const updatedSubjectStatuses_advance: {
          name: string;
          index: number;
          height: number;
        }[] = [];

        const updatedSubjectStatuses_infomations: {
          name: string;
          index: number;
        }[] = [];

        data.forEach((row) => {
          subjectsList.forEach((subject) => {
            if (row[3] === `"${subject.name}"` && row[7] !== '"D"') {
              // 科目名が一致し、かつ成績がDでない場合
              updatedSubjectStatuses.push({
                name: subject.name,
                index: subject.index,
              });
            }
          });
          subjectsList_advance.forEach((subject) => {
            if (row[3] === `"${subject.name}"` && row[7] !== '"D"') {
              // 科目名が一致し、かつ成績がDでない場合
              updatedSubjectStatuses_advance.push({
                name: subject.name,
                index: subject.index,
                height: subject.height,
              });
            }
          });
          infomation_list.forEach((subject) => {
            if (row[3] === `"${subject.name}"` && row[7] !== `"D"`) {
              updatedSubjectStatuses_infomations.push({
                name: subject.name,
                index: subject.index,
              });
            }
          });
        });

        setSubjectStatuses(updatedSubjectStatuses);
        setSubjectStatuses_advance(updatedSubjectStatuses_advance);
        setInfomations(updatedSubjectStatuses_infomations);
      };
      reader.readAsText(file);
    } catch (error) {
      console.error("Error reading the CSV file:", error);
    }
  };

  const isSubjectPassed = (subjectName: string) => {
    return subjectStatuses.some((subject) => subject.name === subjectName);
  };
  const isSubjectPassed_advance = (subjectName: string) => {
    return subjectStatuses_advance.some(
      (subject) => subject.name === subjectName
    );
  };
  const isInfomations_passed = (subjectName: string) => {
    return infomation.some((subject) => subject.name === subjectName);
  };

  const judge_infomation = (N: number) => {
    console.log(N);
    if (N === 0) {
      return <></>;
    } else if (N === 3) {
      return (
        <>
          <div
            // key={index}
            className="grayout_subject"
            style={{
              position: "absolute",
              top: `${27.8 + 7.8}%`,
              left: "46.3%",
              width: "11.5%",
              height: "1.93%",
              backgroundColor: "rgba(28, 56, 1, 0.5)",
            }}
          ></div>
        </>
      );
    } else {
      return (
        <>
          <div
            className="grayout_subject"
            style={{
              position: "absolute",
              top: `${27.8 + 7.8}%`,
              left: "46.3%",
              width: "11.5%",
              height: "1.93%",
              backgroundColor: "rgba(0, 255, 0, 0.5)",
            }}
          ></div>
        </>
      );
    }
  };

  return (
    <>
      <h1>そつたんのトップページ</h1>
      <input
        type="file"
        name="csv_import"
        accept="csv"
        id="upload-file"
        onChange={fetchData}
      ></input>
      <button onClick={toggleOverlay}>
        {isOverlayVisible ? "必修科目を表示しない" : "必修科目を表示する"}
      </button>
      <div className="highlight-box">
        <div className="youran_mast">
          <img src="mast24.png" alt="mastの卒業要覧"></img>
          {isOverlayVisible && <div className="overlay_major_basic"></div>}
          {isOverlayVisible && <div className="overlay_major"></div>}
          {isOverlayVisible && <div className="overlay_common"></div>}
          {subjectStatuses.map((subject, index) => (
            <div
              key={index}
              className="grayout_subject"
              style={{
                position: "absolute",
                top: `${27.8 + 1.93 * subject.index}%`,
                left: "22.7%",
                width: "13.4%",
                height: "1.93%",
                backgroundColor: "rgba(28, 56, 1, 0.5)",
              }}
            ></div>
          ))}
          {subjectStatuses_advance.map((subject, index) => (
            <div
              key={index}
              className="grayout_subject"
              style={{
                position: "absolute",
                top: `${27.8 + 1.93 * subject.index}%`,
                left: "2.2%",
                width: "10.2%",
                height: `${1.93 * subject.height}%`,
                backgroundColor: "rgba(28, 56, 1, 0.5)",
              }}
            ></div>
          ))}
          {judge_infomation(infomation.length)}
        </div>
      </div>
      {isOverlayVisible && (
        <table border={1}>
          <caption>必修科目一覧</caption>
          <thead>
            <tr>
              <th scope="col">科目名</th>
              <th scope="col">単位数</th>
              <th scope="col">標準履修年次</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "卒業研究A", units: 3, year: 4 },
              { name: "卒業研究B", units: 3, year: 4 },
              { name: "情報メディア実験A", units: 3, year: 3 },
              { name: "情報メディア実験B", units: 3, year: 3 },
              { name: "専門英語A", units: 1, year: 4 },
              { name: "専門英語B", units: 1, year: 4 },
              { name: "微分積分A", units: 2, year: 1 },
              { name: "微分積分B", units: 2, year: 2 },
              { name: "線形代数A", units: 2, year: 1 },
              { name: "線形代数B", units: 2, year: 2 },
              { name: "情報数学A", units: 2, year: 1 },
              { name: "確率と統計", units: 2, year: 2 },
              { name: "プログラミング入門A", units: 2, year: 1 },
              { name: "プログラミング入門B", units: 1, year: 1 },
              { name: "プログラミング", units: 2, year: 2 },
              { name: "コンピュータシステムとOS", units: 2, year: 2 },
              { name: "データ構造とアルゴリズム", units: 2, year: 2 },
              { name: "データ構造とアルゴリズム実習", units: 1, year: 2 },
              { name: "ファーストイヤーセミナー", units: 1, year: 1 },
              { name: "学問への誘い", units: 1, year: 1 },
              { name: "情報リテラシー(講義)", units: 1, year: 1 },
              { name: "情報リテラシー(演習)", units: 1, year: 1 },
              { name: "データサイエンス", units: 2, year: 1 },
              { name: "基礎体育(春)", units: 0.5, year: 1 },
              { name: "基礎体育(秋)", units: 0.5, year: 1 },
              { name: "応用体育(春)", units: 0.5, year: 2 },
              { name: "応用体育(秋)", units: 0.5, year: 2 },
              { name: "English Presentation Skills I", units: 1, year: 1 },
              { name: "English Reading Skills I", units: 1, year: 1 },
              { name: "English Presentation Skills II", units: 1, year: 1 },
              { name: "English Reading Skills II", units: 1, year: 1 },
            ].map((subject, index) => (
              <tr
                key={index}
                style={
                  isSubjectPassed(subject.name) ||
                  isSubjectPassed_advance(subject.name) ||
                  isInfomations_passed(subject.name)
                    ? { backgroundColor: "#008000" }
                    : {}
                }
              >
                <th scope="row">{subject.name}</th>
                <td>{subject.units}</td>
                <td>{subject.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
