import "./App.css";
import { useState, useEffect } from "react";
import PopUp from "./components/popup";
import {
  subjectsList,
  subjectsList_advance,
  information_list,
  sougou_must_list,
  pe_list,
  English_list,
} from "./subjects";

type subjectList = {
  name: string;
  index: number;
  height: number;
};

type electiveSubjectList = {
  name: string;
  subjectId: string;
  numberOfUnits: number;
};

function App() {
  const [showRishunenji, setShowRishunenji] = useState(false);
  const [subjectStatuses, setSubjectStatuses] = useState<subjectList[]>([]);
  const [subjectStatuses_advance, setSubjectStatuses_advance] = useState<
    subjectList[]
  >([]);
  const [information, setInformation] = useState<subjectList[]>([]);
  const [sougou_must, setSougou_must] = useState<subjectList[]>([]);
  const [pe, setPe] = useState<subjectList[]>([]);
  const [English, setEnglish] = useState<subjectList[]>([]);
  const [electiveSubjects, setElectiveSubjects] = useState<
    electiveSubjectList[]
  >([]);
  const [electiveSubjects_basic, setElectiveSubjects_basic] = useState<
    electiveSubjectList[]
  >([]);
  const [electiveSubjects_advanced, setElectiveSubjects_advanced] = useState<
    electiveSubjectList[]
  >([]);
  const [gakusiSubjects, setGakusiSubjects] = useState<electiveSubjectList[]>(
    []
  );
  const [electivePE, setElectivePE] = useState<electiveSubjectList[]>([]);
  const [electiveLanguage, setElectiveLanguage] = useState<
    electiveSubjectList[]
  >([]);
  const [electiveJapanese, setElectiveJapanese] = useState<
    electiveSubjectList[]
  >([]);
  const [electiveArt, setElectiveArt] = useState<electiveSubjectList[]>([]);

  const [unit_basic, setUnit_basic] = useState<number | null>(null);
  const [unit_advanced, setUnit_advanced] = useState<number | null>(null);
  const [unit_gakusi, setUnit_gakusi] = useState<number | null>(null);
  const [unit_electivePE, setUnit_electivePE] = useState<number | null>(null);
  const [unit_electiveLanguage, setUnit_electiveLanguage] = useState<
    number | null
  >(null);
  const [unit_electiveJapanese, setUnit_electiveJapanese] = useState<
    number | null
  >(null);
  const [unit_electiveArt, setUnit_electiveArt] = useState<number | null>(null);

  const toggleRishuneji = () => {
    setShowRishunenji(!showRishunenji);
  };

  const checkPass = (
    updateList: subjectList[],
    subjectList: subjectList[],
    row: any
  ) => {
    let count = 0;
    subjectList.forEach((subject) => {
      if (
        row[3] === `"${subject.name}"` &&
        row[7] !== '"D"' &&
        row[7] !== '"F"'
      ) {
        // 科目名が一致し、かつ成績がDでない場合
        updateList.push({
          name: subject.name,
          index: subject.index,
          height: subject.height,
        });
        count++;
      }
    });
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  };

  const updatedelectiveSubjects_basic: electiveSubjectList[] = [];
  const updatedelectiveSubjects_advanced: electiveSubjectList[] = [];
  const updatedgakusiSubjects: electiveSubjectList[] = [];
  const updatedelectivePE: electiveSubjectList[] = [];
  const updatedelectiveLanguage: electiveSubjectList[] = [];
  const updatedelectiveJapanese: electiveSubjectList[] = [];
  const updatedelectiveArt: electiveSubjectList[] = [];

  useEffect(() => {
    electiveSubjects.map((subject) => {
      if (
        subject.subjectId.startsWith('"GC2') ||
        subject.subjectId.startsWith('"GA1')
      ) {
        updatedelectiveSubjects_basic.push(subject);
      }
      if (
        subject.subjectId.startsWith('"GC5') ||
        subject.subjectId.startsWith('"GA4')
      ) {
        updatedelectiveSubjects_advanced.push(subject);
      }
      if (
        subject.subjectId.startsWith('"12') ||
        subject.subjectId.startsWith('"14')
      ) {
        updatedgakusiSubjects.push(subject);
      }
      if (
        subject.subjectId.startsWith('"26') ||
        subject.subjectId.startsWith('"28')
      ) {
        updatedelectivePE.push(subject);
      }
      if (
        subject.subjectId.startsWith('"31') ||
        subject.subjectId.startsWith('"32') ||
        subject.subjectId.startsWith('"33') ||
        subject.subjectId.startsWith('"34') ||
        subject.subjectId.startsWith('"35') ||
        subject.subjectId.startsWith('"36') ||
        subject.subjectId.startsWith('"37') ||
        subject.subjectId.startsWith('"38') ||
        subject.subjectId.startsWith('"39')
      ) {
        updatedelectiveLanguage.push(subject);
      }
      if (
        subject.subjectId.startsWith('"51') ||
        subject.subjectId.startsWith('"52') ||
        subject.subjectId.startsWith('"53')
      ) {
        updatedelectiveJapanese.push(subject);
      }
      if (subject.subjectId.startsWith('"40')) {
        updatedelectiveArt.push(subject);
      }
    });
    setElectiveSubjects_basic(updatedelectiveSubjects_basic);
    setElectiveSubjects_advanced(updatedelectiveSubjects_advanced);
    setGakusiSubjects(updatedgakusiSubjects);
    setElectivePE(updatedelectivePE);
    setElectiveLanguage(updatedelectiveLanguage);
    setElectiveJapanese(updatedelectiveJapanese);
    setElectiveArt(updatedelectiveArt);
  }, [electiveSubjects]);

  useEffect(() => {
    let unit = 0;
    electiveSubjects_basic.forEach((subject) => {
      unit += subject.numberOfUnits;
    });
    setUnit_basic(unit);
  }, [electiveSubjects_basic]);

  useEffect(() => {
    let unit = 0;
    electiveSubjects_advanced.forEach((subject) => {
      unit += subject.numberOfUnits;
    });
    setUnit_advanced(unit);
  }, [electiveSubjects_advanced]);

  useEffect(() => {
    let unit = 0;
    gakusiSubjects.forEach((subject) => {
      unit += subject.numberOfUnits;
    });
    setUnit_gakusi(unit);
  }, [gakusiSubjects]);

  useEffect(() => {
    let unit = 0;
    electivePE.forEach((subject) => {
      unit += subject.numberOfUnits;
    });
    setUnit_electivePE(unit);
  }, [electivePE]);

  useEffect(() => {
    let unit = 0;
    electiveLanguage.forEach((subject) => {
      unit += subject.numberOfUnits;
    });
    setUnit_electiveLanguage(unit);
  }, [electiveLanguage]);

  useEffect(() => {
    let unit = 0;
    electiveJapanese.forEach((subject) => {
      unit += subject.numberOfUnits;
    });
    setUnit_electiveJapanese(unit);
  }, [electiveJapanese]);

  useEffect(() => {
    let unit = 0;
    electiveArt.forEach((subject) => {
      unit += subject.numberOfUnits;
    });
    setUnit_electiveArt(unit);
  }, [electiveArt]);

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

        const updatedSubjectStatuses: subjectList[] = [];
        const updatedSubjectStatuses_advance: subjectList[] = [];
        const updatedSubjectStatuses_information: subjectList[] = [];
        const updatedSubjectStatuses_sougou_must: subjectList[] = [];
        const updatedSubjectStatuses_pe: subjectList[] = [];
        const updatedSubjectStatuses_English: subjectList[] = [];
        const updateElectiveSubjects: electiveSubjectList[] = [];

        data.forEach((row) => {
          const flagSubjectList: boolean = checkPass(
            updatedSubjectStatuses,
            subjectsList,
            row
          );
          const flagSubjectList_advance: boolean = checkPass(
            updatedSubjectStatuses_advance,
            subjectsList_advance,
            row
          );
          const flagSubjectList_information: boolean = checkPass(
            updatedSubjectStatuses_information,
            information_list,
            row
          );
          const flagSubjectList_sougou_must: boolean = checkPass(
            updatedSubjectStatuses_sougou_must,
            sougou_must_list,
            row
          );
          const flagSubjectList_English: boolean = checkPass(
            updatedSubjectStatuses_English,
            English_list,
            row
          );

          let peCounter = 0;
          let flagSubjectList_pe;
          pe_list.forEach((subject) => {
            const first_four = subject.name.slice(0, 4);
            const last_two = subject.name.slice(4, 7);
            if (
              row[3].slice(1, 5) == first_four &&
              row[3].slice(-4, -1) == last_two &&
              row[7] !== '"D"'
            ) {
              updatedSubjectStatuses_pe.push({
                name: subject.name,
                index: subject.index,
                height: subject.height,
              });
              peCounter++;
            }
          });
          if (peCounter === 0) flagSubjectList_pe = false;
          else flagSubjectList_pe = true;

          if (
            !(
              flagSubjectList ||
              flagSubjectList_English ||
              flagSubjectList_advance ||
              flagSubjectList_information ||
              flagSubjectList_pe ||
              flagSubjectList_sougou_must
            )
          ) {
            if (row[7] !== `"D"` && row[7] !== "`F`") {
              updateElectiveSubjects.push({
                name: row[3],
                subjectId: row[2],
                numberOfUnits: Number(row[4].replace(/"/g, "").trim()),
              });
            }
          }
        });

        setSubjectStatuses(updatedSubjectStatuses);
        setSubjectStatuses_advance(updatedSubjectStatuses_advance);
        setInformation(updatedSubjectStatuses_information);
        setSougou_must(updatedSubjectStatuses_sougou_must);
        setPe(updatedSubjectStatuses_pe);
        setEnglish(updatedSubjectStatuses_English);
        setElectiveSubjects(updateElectiveSubjects);
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
          top: `${26.5 + 7.8}%`,
          left: "46.1%",
          width: "11.5%",
          height: "1.98%",
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
            top: `9%`,
            left: "65.3%",
            width: "11.5%",
            height: "1.98%",
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
          top: `26.4%`,
          left: "46.1%",
          width: "11.5%",
          height: `${1.98 * 4}%`,
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
            top: "40%",
            left: "65.3%",
            width: "11.5%",
            height: "1.98%",
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

  const judge_pe = () => {
    if (pe.length === 0) return;
    return (
      <div
        className="hover_pe"
        style={{
          position: "absolute",
          top: `${26.4 + 1.98 * 5}%`,
          left: "46.1%",
          width: "11.5%",
          height: `${1.98}%`,
          backgroundColor:
            pe.length === 4 ? "rgba(0, 128, 0, 0.4)" : "rgba(256, 256, 0, 0.4)",
        }}
      >
        <div className="pe">
          {pe_list.map((subject, index) => (
            <div
              key={index}
              style={{
                color: pe.find((item) => item.name === subject.name)
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
            top: `7%`,
            left: "65.3%",
            width: "11.5%",
            height: "1.98%",
          }}
        >
          {pe.length === 4 ? (
            <img src="checkmark_v3.png"></img>
          ) : (
            <img src="exclamation-mark.png"></img>
          )}
        </div>
      </div>
    );
  };

  const judge_English = () => {
    console.log();
    if (English.length === 0) return;
    return (
      <div
        className="hover_English"
        style={{
          position: "absolute",
          top: `${26.4 + 1.98 * 6}%`,
          left: "46.1%",
          width: "11.5%",
          height: "1.98%",
          backgroundColor:
            English.length === 4
              ? "rgba(0, 128, 0, 0.4)"
              : "rgba(256, 256, 0, 0.4)",
          zIndex: 1,
        }}
      >
        <div className="English">
          {English_list.map((subject, index) => (
            <div
              key={index}
              style={{
                color: English.find((item) => item.name === subject.name)
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
            top: `9%`,
            left: "65.3%",
            width: "11.5%",
            height: "1.98%",
          }}
        >
          {English.length === 4 ? (
            <img src="checkmark_v3.png"></img>
          ) : (
            <img src="exclamation-mark.png"></img>
          )}
        </div>
      </div>
    );
  };

  const judge_elective_basic = () => {
    if (!unit_basic) return <></>;
    return (
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "30%",
          width: "11.5%",
          height: "1.98%",
        }}
      >
        <p>
          {unit_basic}
          <br /> /最低32
        </p>
      </div>
    );
  };

  const judge_elective_advanced = () => {
    if (!unit_advanced) return <></>;
    return (
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "6.5%",
          width: "11.5%",
          height: "1.98%",
        }}
      >
        <p>
          {unit_advanced}
          <br />
          /最低20
        </p>
      </div>
    );
  };

  const judge_gakusi = () => {
    if (!unit_gakusi) return <></>;
    return (
      <div
        style={{
          position: "absolute",
          top: "29%",
          left: "51.8%",
          width: "11.5%",
          height: "1.98%",
          fontSize: "80%",
        }}
      >
        <p>
          {unit_gakusi}
          <br />
          /最低1
        </p>
      </div>
    );
  };

  const judge_electivePE = () => {
    if (!unit_electivePE) return <></>;
    return (
      <div
        style={{
          position: "absolute",
          top: "33%",
          left: "51.8%",
          width: "11.5%",
          height: "1.98%",
          fontSize: "80%",
        }}
      >
        <p>{unit_electivePE}/最低0</p>
      </div>
    );
  };

  const judge_electiveLanguage = () => {
    if (!unit_electiveLanguage) return <></>;
    return (
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "51.8%",
          width: "11.5%",
          height: "1.98%",
          fontSize: "80%",
        }}
      >
        <p>{unit_electiveLanguage}/最低0</p>
      </div>
    );
  };

  const judge_electiveJapanese = () => {
    if (!unit_electiveJapanese) return <></>;
    return (
      <div
        style={{
          position: "absolute",
          top: "37%",
          left: "51.8%",
          width: "11.5%",
          height: "1.98%",
          fontSize: "80%",
        }}
      >
        <p>{unit_electiveJapanese}/最低0</p>
      </div>
    );
  };

  const judge_electiveArt = () => {
    if (!unit_electiveArt) return <></>;
    return (
      <div
        style={{
          position: "absolute",
          top: "39%",
          left: "51.8%",
          width: "11.5%",
          height: "1.98%",
          fontSize: "80%",
        }}
      >
        <p>{unit_electiveArt}/最低0</p>
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
                top: `${26.5 + 1.98 * subject.index}%`,
                left: "22.5%",
                width: "13.4%",
                height: "1.98%",
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
                top: `${26.5 + 1.98 * subject.index}%`,
                left: "2.2%",
                width: "10.2%",
                height: `${1.98 * subject.height}%`,
                backgroundColor: "rgba(0, 128, 0, 0.4)",
              }}
            ></div>
          ))}
          {judge_sougou_must()}
          {judge_information()}
          {judge_pe()}
          {judge_English()}
          {judge_elective_basic()}
          {judge_elective_advanced()}
          {judge_gakusi()}
          {judge_electivePE()}
          {judge_electiveLanguage()}
          {judge_electiveJapanese()}
          {judge_electiveArt()}
        </div>
      </div>
    </>
  );
}

export default App;
