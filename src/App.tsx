import "./App.css";
import { useState } from "react";
import PopUp from "./components/popup";

function App() {
  const [showRishunenji, setShowRishunenji] = useState(false);
  const [subjectStatuses, setSubjectStatuses] = useState<
    { name: string; index: number }[]
  >([]);
  const [subjectStatuses_advance, setSubjectStatuses_advance] = useState<
    { name: string; index: number; height: number }[]
  >([]);

  const [information, setInformation] = useState<
    { name: string; index: number }[]
  >([]);

  const [sougou_must, setSougou_must] = useState<
    { name: string; index: number }[]
  >([]);

  const [pe, setPe] = useState<
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

  const information_list = [
    { name: "情報リテラシー(講義)", index: 0 },
    { name: "情報リテラシー(演習)", index: 1 },
    { name: "データサイエンス", index: 2 },
  ];

  const sougou_must_list = [
    { name: "ファーストイヤーセミナー", index: 0 },
    { name: "学問への誘い", index: 1 },
  ];

  const pe_list = [
    { name: "基礎体育(春)", index: 0 },
    { name: "基礎体育(秋)", index: 1 },
    { name: "応用体育(春)", index: 2 },
    { name: "応用体育(秋)", index: 3 },
  ];

  const toggleRishuneji = () => {
    setShowRishunenji(!showRishunenji);
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

        const updatedSubjectStatuses_information: {
          name: string;
          index: number;
        }[] = [];

        const updatedSubjectStatuses_sougou_must: {
          name: string;
          index: number;
        }[] = [];

        const updatedSubjectStatuses_pe: {
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
          information_list.forEach((subject) => {
            if (row[3] === `"${subject.name}"` && row[7] !== `"D"`) {
              updatedSubjectStatuses_information.push({
                name: subject.name,
                index: subject.index,
              });
            }
          });

          sougou_must_list.forEach((subject) => {
            if (row[3] === `"${subject.name}"` && row[7] !== `"D"`) {
              updatedSubjectStatuses_sougou_must.push({
                name: subject.name,
                index: subject.index,
              });
            }
          });

          pe_list.forEach((subject) => {
            const first_four = subject.name.slice(0, 4);
            const last_two = subject.name.slice(4, 7);
            if (row[3].slice(1,5) == first_four && row[3].slice(-4,-1) == last_two  && row[7] !== '"D"') {
              updatedSubjectStatuses_pe.push({
                name: subject.name,
                index: subject.index,
              });
            }
          });
        });

        setSubjectStatuses(updatedSubjectStatuses);
        setSubjectStatuses_advance(updatedSubjectStatuses_advance);
        setInformation(updatedSubjectStatuses_information);
        setSougou_must(updatedSubjectStatuses_sougou_must);
        setPe(updatedSubjectStatuses_pe);
      };
      reader.readAsText(file);
    } catch (error) {
      console.error("Error reading the CSV file:", error);
    }
  };

  const judge_information = () => {
    console.log();
    if (information.length === 0) return;
    return (
      <div
        className="hover_info"
        style={{
          position: "absolute",
          top: `${27.8 + 7.8}%`,
          left: "46.3%",
          width: "11.5%",
          height: "1.93%",
          backgroundColor:
            information.length === 3
              ? "rgba(0, 128, 0, 0.4)"
              : "rgba(256, 256, 0, 0.4)",
          zIndex: 1,
        }}
      >
        <div className="info">
          {information_list.map((subject, index) => (
            <div
              key={index}
              style={{
                color: information.find((item) => item.name === subject.name)
                  ? "green"
                  : "red",
              }}
            >
              {subject.name}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: `-12%`,
            left: "65.3%",
            width: "11.5%",
            height: "1.93%",
          }}
        >
          {information.length === 3 ? (
            <img src="checkmark_v3.png"></img>
          ) : (
            <img src="exclamation-mark.png"></img>
          )}
        </div>
      </div>
    );
  };

  const judge_sougou_must = () => {
    if (sougou_must.length === 0) return;
    return (
      <div
        className="hover_sougou_must"
        style={{
          position: "absolute",
          top: `27.8%`,
          left: "46.3%",
          width: "11.5%",
          height: `${1.93 * 4}%`,
          backgroundColor:
            sougou_must.length === 2
              ? "rgba(0, 128, 0, 0.4)"
              : "rgba(256, 256, 0, 0.4)",
        }}
      >
        <div className="sougou_must">
          {sougou_must_list.map((subject, index) => (
            <div
              key={index}
              style={{
                color: sougou_must.find((item) => item.name === subject.name)
                  ? "green"
                  : "red",
              }}
            >
              {subject.name}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: `40%`,
            left: "65.3%",
            width: "11.5%",
            height: "1.93%",
          }}
        >
          {sougou_must.length === 2 ? (
            <img src="checkmark_v3.png"></img>
          ) : (
            <img src="exclamation-mark.png"></img>
          )}
        </div>
      </div>
    );
  };



  return (
    <>
      <div className="header">
        <p className="tool-title">履修支援ツール</p>
        <h1 className="main-title">そつたん</h1>
        <h2 className="sub-title">mast22, 23, 24生に対応しています</h2>
        <p className="description">
          twinsからダウンロードできる成績のcsvを「ファイルを選択」からアップロードすることで履修中・修得済みの単位がグレーアウトされます
        </p>
        <PopUp />
        <img src="hover_ex.png" alt="吹き出し内の凡例" width="500px"></img>
      </div>
      <input
        type="file"
        name="csv_import"
        accept="csv"
        id="upload-file"
        onChange={fetchData}
      ></input>
      <button onClick={toggleRishuneji}>
        {showRishunenji ? "履修年次を表示しない" : "履修年次を表示する"}
      </button>
      <div className="highlight-box">
        <div className="youran_mast">
          <img src={showRishunenji ? "mast24_rishunenji.png" : "mast24.png"} />
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
                backgroundColor: "rgba(0, 128, 0, 0.4)",
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
                backgroundColor: "rgba(0, 128, 0, 0.4)",
              }}
            ></div>
          ))}
          {judge_sougou_must()}
          {judge_information()}
        </div>
      </div>
    </>
  );
}

export default App;
