import "./App.css";
import { useState, useEffect } from "react";
import PopUp from "./components/popup";
import ElectivePopup from "./components/popup_rishu";
import {
  subjectsList,
  subjectsList_advance,
  information_list,
  sougou_must_list,
  pe_list,
  English_list,
} from "./subjects";
import kdbData from "./kdb_json/kdb_1218.json";

interface CourseInfo {
  科目番号: string;
  科目名: string;
  曜時限?: string;
  標準履修年次?: string;
  実施学期?: string;
  単位数?: number;
}

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

const parseYearString = (yearStr: string): string => {
  if (!yearStr) return "{}";

  let numbers: number[] = [];

  // ハイフンがある場合（例：1-4）
  if (yearStr.includes("-")) {
    const [start, end] = yearStr.split("-").map(Number);
    numbers = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  // 中黒で区切られている場合（例：3・4）
  else if (yearStr.includes("・")) {
    numbers = yearStr.split("・").map(Number);
  }
  // 単一の数字の場合
  else {
    numbers = [Number(yearStr)];
  }

  return `${numbers.join(",")}}`;
};

const parseSemesterString = (semester: string): string[] => {
  const seasons = ["春", "秋"];
  const modules = ["A", "B", "C"];

  let result: string[] = [];

  seasons.forEach((season) => {
    if (semester.includes(season)) {
      if (semester.includes("ABC")) {
        modules.forEach((module) => {
          result.push(`${season}${module}`);
        });
      } else {
        modules.forEach((module) => {
          if (semester.includes(module)) {
            result.push(`${season}${module}`);
          }
        });
      }
    }
  });

  return result;
};

const parseTimeSlots = (timeStr: string): string[] => {
  if (!timeStr) return [];

  // 曜日のパターン
  const dayPattern = "[月火水木金]";

  // 入力文字列に曜日が含まれているかチェック
  if (!timeStr.match(new RegExp(dayPattern))) {
    return [timeStr];
  }
  // 結果を格納する配列
  const slots: string[] = [];

  // 「月・木3,4」のような形式を分割
  const dayGroups = timeStr.split(/[,・]/);

  let currentDay = "";

  dayGroups.forEach((group) => {
    group = group.trim();

    // 曜日を含む場合は保存
    if (group.match(new RegExp(dayPattern))) {
      currentDay = group.match(new RegExp(dayPattern))![0];
      group = group.replace(currentDay, "");
    }

    // 時限の処理
    if (group.includes("-")) {
      // 範囲指定の場合 (例: 4-6)
      const [start, end] = group.split("-").map(Number);
      for (let i = start; i <= end; i++) {
        slots.push(`${currentDay}${i}`);
      }
    } else {
      // 単一の数字の場合
      const period = group.match(/\d+/);
      if (period) {
        slots.push(`${currentDay}${period[0]}`);
      }
    }
  });

  return slots;
};

const formatKdbData = (data: any[]): CourseInfo[] => {
  return data
    .map((item) => ({
      科目番号: item.科目番号 || "",
      科目名: item.科目名 || "",
      標準履修年次: parseYearString(item.標準履修年次 || ""),
      実施学期: parseSemesterString(item.実施学期 || "").join(","),
      曜時限: parseTimeSlots(item.曜時限 || "").join(","),
      単位数: Number(item.単位数) || 0,
    }))
    .filter((item) => item.科目番号 && item.科目名);
};

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [courseData] = useState<CourseInfo[]>(formatKdbData(kdbData));

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // イベントのデフォルト動作を防止
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({
      x: rect.right + 10, // 要素の右側に10pxの余白を追加
      y: rect.top,
    });
    setIsPopupOpen(true);
  };

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

  const [otherSubjects, setOtherSubjects] = useState<electiveSubjectList[]>([]);

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
  const [electiveGBGE, setElectiveGBGE] = useState<electiveSubjectList[]>([]);
  const [electiveMuseum, setElectiveMuseum] = useState<electiveSubjectList[]>(
    []
  );

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
  const [unit_electiveGBGE, setUnit_electiveGBGE] = useState<number | null>(
    null
  );
  const [unit_electiveMuseum, setUnit_electiveMuseum] = useState<number | null>(
    null
  );

  const [unit_otherSubjects, setUnit_otherSubjects] = useState<number | null>(
    null
  );

  const [file_upload, setFile_upload] = useState(false);

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
  const updatedelectiveGBGE: electiveSubjectList[] = [];
  const updatedelectiveMuseum: electiveSubjectList[] = [];

  const updatedOtherSubjects: electiveSubjectList[] = [];

  useEffect(() => {
    electiveSubjects.map((subject) => {
      if (
        subject.subjectId.startsWith('"GC2') ||
        subject.subjectId.startsWith('"GA1')
      ) {
        updatedelectiveSubjects_basic.push(subject);
      } else if (
        subject.subjectId.startsWith('"GC5') ||
        subject.subjectId.startsWith('"GA4')
      ) {
        updatedelectiveSubjects_advanced.push(subject);
      } else if (
        subject.subjectId.startsWith('"12') ||
        subject.subjectId.startsWith('"14')
      ) {
        updatedgakusiSubjects.push(subject);
      } else if (
        subject.subjectId.startsWith('"26') ||
        subject.subjectId.startsWith('"28')
      ) {
        updatedelectivePE.push(subject);
      } else if (
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
      } else if (
        subject.subjectId.startsWith('"51') ||
        subject.subjectId.startsWith('"52') ||
        subject.subjectId.startsWith('"53')
      ) {
        updatedelectiveJapanese.push(subject);
      } else if (subject.subjectId.startsWith('"40')) {
        updatedelectiveArt.push(subject);
      } else if (
        subject.subjectId.startsWith('"GB') ||
        subject.subjectId.startsWith('"GE')
      ) {
        updatedelectiveGBGE.push(subject);
      } else if (
        subject.subjectId.startsWith('"99') ||
        subject.subjectId.startsWith('"80') ||
        subject.subjectId.startsWith('"81') ||
        subject.subjectId.startsWith('"82') ||
        subject.subjectId.startsWith('"83')
      ) {
        updatedelectiveMuseum.push(subject);
      } else {
        updatedOtherSubjects.push(subject);
      }
    });
    setElectiveSubjects_basic(updatedelectiveSubjects_basic);
    setElectiveSubjects_advanced(updatedelectiveSubjects_advanced);
    setGakusiSubjects(updatedgakusiSubjects);
    setElectivePE(updatedelectivePE);
    setElectiveLanguage(updatedelectiveLanguage);
    setElectiveJapanese(updatedelectiveJapanese);
    setElectiveArt(updatedelectiveArt);
    setElectiveGBGE(updatedelectiveGBGE);
    setElectiveMuseum(updatedelectiveMuseum);
    setOtherSubjects(updatedOtherSubjects);
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

  useEffect(() => {
    let unit = 0;
    electiveGBGE.forEach((subject) => {
      unit += subject.numberOfUnits;
    });
    setUnit_electiveGBGE(unit);
  }, [electiveGBGE]);

  useEffect(() => {
    let unit = 0;
    electiveMuseum.forEach((subject) => {
      unit += subject.numberOfUnits;
    });
    setUnit_electiveMuseum(unit);
  }, [electiveMuseum]);

  useEffect(() => {
    let unit = 0;
    otherSubjects.forEach((subject) => {
      unit += subject.numberOfUnits;
    });
    setUnit_otherSubjects(unit);
  }, [otherSubjects]);

  const fetchData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFile_upload(true);

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

        data.splice(0, 1);

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
        ></div>
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
        ></div>
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
        ></div>
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
          zIndex: 3,
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
        ></div>
      </div>
    );
  };

  const judge_elective_basic = () => {
    if (!file_upload) return <></>;
    if (!unit_basic)
      return (
        <>
          <div
            className="hover_elective_basic"
            style={{
              position: "absolute",
              top: `${26.4}%`,
              left: "36%",
              width: "6%",
              height: "47.9%",
              backgroundColor: "rgba(255, 255, 0, 0.4)",
              zIndex: 3,
            }}
          ></div>
          <div className="basic-white-area">
            <p>現在修得済み：{unit_basic}</p>
          </div>
        </>
      );
    return (
      <div>
        <div
          className="hover_elective_basic"
          style={{
            position: "absolute",
            top: `${26.4}%`,
            left: "36%",
            width: "10%",
            height: "47.9%",
            backgroundColor:
              unit_basic >= 32
                ? "rgba(0, 128, 0, 0.4)"
                : "rgba(255, 255, 0, 0.4)",
            zIndex: 3,
          }}
        >
          <div className="elective_basic">
            {electiveSubjects_basic.map((subject, index) => (
              <div key={index}>{subject.name.replace(/"/g, "").trim()}</div>
            ))}
          </div>
        </div>
        <div className="basic-white-area">
          <p>現在修得済み：{unit_basic}</p>
        </div>
      </div>
    );
  };

  const judge_elective_advanced = () => {
    if (!file_upload) return <></>;
    if (!unit_advanced)
      return (
        <>
          <div
            className="hover_elective_basic"
            style={{
              position: "absolute",
              top: `${26.4}%`,
              left: "12.3%",
              width: "6.2%",
              height: "47.9%",
              backgroundColor: "rgba(256, 256, 0, 0.4)",
              zIndex: 4,
            }}
          ></div>
          <div className="advanced-white-area">
            <p>現在修得済み：0</p>
          </div>
        </>
      );
    return (
      <div>
        <div
          className="hover_elective_basic"
          style={{
            position: "absolute",
            top: `${26.4}%`,
            left: "12.3%",
            width: "10.2%",
            height: "47.9%",
            backgroundColor:
              unit_advanced >= 32
                ? "rgba(0, 128, 0, 0.4)"
                : "rgba(256, 256, 0, 0.4)",
            zIndex: 4,
          }}
          onClick={handleClick}
        >
          <div className="elective_basic">
            {electiveSubjects_advanced.map((subject, index) => (
              <div key={index}>{subject.name.replace(/"/g, "").trim()}</div>
            ))}
          </div>
        </div>
        <div className="advanced-white-area">
          <p>現在修得済み：{unit_advanced}</p>
        </div>
        <ElectivePopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          courseData={courseData}
          position={popupPosition}
        />
      </div>
    );
  };

  const judge_gakusi = () => {
    if (!file_upload) return <></>;
    else if (!unit_gakusi)
      return (
        <>
          <div
            className="hover_gakusi"
            style={{
              position: "absolute",
              top: `${26.4}%`,
              left: "57.5%",
              width: "8.67%",
              height: "8%",
              backgroundColor: "rgba(256, 256, 0, 0.4)",
            }}
          >
            <div className="gakusi">この区分の科目は履修・修得していません</div>
          </div>
          <div className="common-white-area">
            <p>現在修得済み：0</p>
          </div>
        </>
      );
    return (
      <div>
        <div
          className="hover_gakusi"
          style={{
            position: "absolute",
            top: `${26.4}%`,
            left: "57.5%",
            width: "8.67%",
            height: "8%",
            backgroundColor:
              unit_gakusi >= 1
                ? "rgba(0, 128, 0, 0.4)"
                : "rgba(256, 256, 0, 0.4)",
          }}
        >
          <div className="gakusi">
            {gakusiSubjects.map((subject, index) => (
              <div key={index}>{subject.name.replace(/"/g, "").trim()}</div>
            ))}
          </div>
        </div>
        <div className="common-white-area">
          <p>
            現在修得済み：
            {unit_gakusi +
              (unit_electivePE === null ? 0 : unit_electivePE) +
              (unit_electiveLanguage === null ? 0 : unit_electiveLanguage) +
              (unit_electiveJapanese === null ? 0 : unit_electiveJapanese) +
              (unit_electiveArt === null ? 0 : unit_electiveArt)}
          </p>
        </div>
      </div>
    );
  };

  const judge_electivePE = () => {
    if (!file_upload) return <></>;
    else if (!unit_electivePE)
      return (
        <div
          className="hover_electivePE"
          style={{
            position: "absolute",
            top: `${34.2}%`,
            left: "57.5%",
            width: "8.67%",
            height: "2.1%",
            backgroundColor: "rgba(0, 128, 0, 0.4)",
          }}
        >
          <div className="electivePE">
            この区分の科目は履修・修得していません
          </div>
        </div>
      );
    return (
      <div
        className="hover_electivePE"
        style={{
          position: "absolute",
          top: `${34.2}%`,
          left: "57.5%",
          width: "8.67%",
          height: "2.1%",
          backgroundColor: "rgba(0, 128, 0, 0.4)",
        }}
      >
        <div>
          <div className="electivePE">
            {electivePE.map((subject, index) => (
              <div key={index}>{subject.name.replace(/"/g, "").trim()}</div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const judge_electiveLanguage = () => {
    if (!file_upload) return <></>;
    else if (!unit_electiveLanguage)
      return (
        <>
          <div
            className="hover_electiveLanguage"
            style={{
              position: "absolute",
              top: `${36.2}%`,
              left: "57.5%",
              width: "8.67%",
              height: "2.1%",
              backgroundColor: "rgba(0, 128, 0, 0.4)",
            }}
          >
            <div className="electiveLanguage">
              この区分の科目は履修・修得していません
            </div>
          </div>
        </>
      );
    return (
      <div
        className="hover_electiveLanguage"
        style={{
          position: "absolute",
          top: `${36.2}%`,
          left: "57.5%",
          width: "8.67%",
          height: "2.1%",
          backgroundColor: "rgba(0, 128, 0, 0.4)",
        }}
      >
        <div className="electiveLanguage">
          {electiveLanguage.map((subject, index) => (
            <div key={index}>{subject.name.replace(/"/g, "").trim()}</div>
          ))}
        </div>
      </div>
    );
  };

  const judge_electiveJapanese = () => {
    if (!file_upload) return <></>;
    if (!unit_electiveJapanese)
      return (
        <>
          <div
            className="hover_electiveJapanese"
            style={{
              position: "absolute",
              top: `${38.2}%`,
              left: "57.5%",
              width: "8.67%",
              height: "2.1%",
              backgroundColor: "rgba(0, 128, 0, 0.4)",
            }}
          >
            <div className="electiveJapanese">
              この区分の科目は履修・修得していません
            </div>
          </div>
        </>
      );
    return (
      <div
        className="hover_electiveJapanese"
        style={{
          position: "absolute",
          top: `${38.2}%`,
          left: "57.5%",
          width: "8.67%",
          height: "2.1%",
          backgroundColor: "rgba(0, 128, 0, 0.4)",
        }}
      >
        <div className="electiveJapanese">
          {electiveJapanese.map((subject, index) => (
            <div key={index}>{subject.name.replace(/"/g, "").trim()}</div>
          ))}
        </div>
      </div>
    );
  };

  const judge_electiveArt = () => {
    if (!file_upload) return <></>;
    else if (!unit_electiveArt)
      return (
        <>
          <div
            className="hover_electiveJapanese"
            style={{
              position: "absolute",
              top: `${40.2}%`,
              left: "57.5%",
              width: "8.67%",
              height: "2.1%",
              backgroundColor: "rgba(0, 128, 0, 0.4)",
            }}
          >
            <div className="electiveJapanese">
              この区分の科目は履修・修得していません
            </div>
          </div>
        </>
      );

    return (
      <div
        className="hover_electiveJapanese"
        style={{
          position: "absolute",
          top: `${40.2}%`,
          left: "57.5%",
          width: "8.67%",
          height: "2.1%",
          backgroundColor: "rgba(0, 128, 0, 0.4)",
        }}
      >
        <div className="electiveJapanese">
          {electiveArt.map((subject, index) => (
            <div key={index}>{subject.name.replace(/"/g, "").trim()}</div>
          ))}
        </div>
      </div>
    );
  };

  const judge_electiveGBGE = () => {
    if (!file_upload) return <></>;
    else if (!unit_electiveGBGE)
      return (
        <>
          <div
            className="hover_electiveGBGE"
            style={{
              position: "absolute",
              top: `${38.4}%`,
              left: "74.1%",
              width: "9.3%",
              height: "4.1%",
              backgroundColor: "rgba(0, 128, 0, 0.4)",
              zIndex: 1,
            }}
          >
            <div className="electiveGBGE">
              この区分の科目は履修・修得していません
            </div>
          </div>
        </>
      );
    return (
      <div
        className="hover_electiveGBGE"
        style={{
          position: "absolute",
          top: `${38.4}%`,
          left: "74.1%",
          width: "9.3%",
          height: "4.1%",
          backgroundColor: "rgba(0, 128, 0, 0.4)",
          zIndex: 1,
        }}
      >
        <div className="electiveGBGE">
          {electiveGBGE.map((subject, index) => (
            <div key={index}>{subject.name.replace(/"/g, "").trim()}</div>
          ))}
        </div>
      </div>
    );
  };

  const judge_electiveMuseum = () => {
    if (!file_upload) return <></>;
    else if (!unit_electiveMuseum)
      return (
        <>
          <div
            className="hover_electiveMuseum"
            style={{
              position: "absolute",
              top: `${42.5}%`,
              left: "74.1%",
              width: "9.3%",
              height: "7.9%",
              backgroundColor: "rgba(0, 128, 0, 0.4)",
              zIndex: 2,
            }}
          >
            <div className="electiveMuseum">
              この区分の科目は履修・修得していません
            </div>
          </div>
        </>
      );
    return (
      <div
        className="hover_electiveMuseum"
        style={{
          position: "absolute",
          top: `${42.5}%`,
          left: "74.1%",
          width: "9.3%",
          height: "7.9%",
          backgroundColor: "rgba(0, 128, 0, 0.4)",
          zIndex: 2,
        }}
      >
        <div className="electiveMuseum">
          {electiveMuseum.map((subject, index) => (
            <div key={index}>{subject.name.replace(/"/g, "").trim()}</div>
          ))}
        </div>
      </div>
    );
  };

  const judge_otherSubjects = () => {
    if (!file_upload) return <></>;
    if (!unit_otherSubjects)
      return (
        <>
          <div
            style={{
              position: "absolute",
              top: `${26.4}%`,
              left: "74.1%",
              width: "9.3%",
              height: "11.9%",
              backgroundColor: "rgba(256, 256, 0, 0.4)",
              zIndex: 0,
            }}
          ></div>
          <div className="relation-white-area">
            <p>現在修得済み：0</p>
          </div>
        </>
      );
    return (
      <div>
        <div
          className="hover_otherSubjects"
          style={{
            position: "absolute",
            top: `${26.4}%`,
            left: "74.1%",
            width: "9.3%",
            height: "11.9%",
            backgroundColor:
              unit_otherSubjects >= 6
                ? "rgba(0, 128, 0, 0.4)"
                : "rgba(256, 256, 0, 0.4)",
            zIndex: 0,
          }}
        >
          <div className="otherSubjects">
            {otherSubjects.map((subject, index) => (
              <div key={index}>{subject.name.replace(/"/g, "").trim()}</div>
            ))}
          </div>
        </div>
        <div className="relation-white-area">
          <p>
            現在修得済み：
            {unit_otherSubjects +
              (unit_electiveGBGE === null ? 0 : unit_electiveGBGE) +
              (unit_electiveMuseum === null ? 0 : unit_electiveMuseum)}
          </p>
        </div>
      </div>
    );
  };

  const check_elective_units = () => {
    let elective_units =
      Math.min(unit_basic === null ? 0 : unit_basic, 47) +
      Math.min(unit_advanced === null ? 0 : unit_advanced, 35) +
      Math.min(
        Math.min(unit_gakusi === null ? 0 : unit_gakusi, 4) +
          Math.min(unit_electivePE === null ? 0 : unit_electivePE, 2) +
          Math.min(
            unit_electiveLanguage === null ? 0 : unit_electiveLanguage,
            6
          ) +
          Math.min(
            unit_electiveJapanese === null ? 0 : unit_electiveJapanese,
            2
          ) +
          Math.min(unit_electiveArt === null ? 0 : unit_electiveArt, 6),
        10
      ) +
      Math.min(
        Math.min(unit_electiveGBGE === null ? 0 : unit_electiveGBGE, 9) +
          Math.min(unit_electiveMuseum === null ? 0 : unit_electiveMuseum, 9) +
          Math.min(unit_otherSubjects === null ? 0 : unit_otherSubjects, 15),
        15
      );
    if (elective_units < 74 && file_upload) {
      return (
        <div className="alert_lack_of_elective_units">
          <div className="balloon2-left">
            <p>現在修得済み:</p>
            {elective_units}単位
            <p>あと{74 - elective_units}単位必要!</p>
          </div>
        </div>
      );
    } else if (elective_units >= 74 && unit_basic) {
      return (
        <div className="fulfill_elective_units">
          <div className="balloon2-left">
            <p>現在取得済み:</p>
            {elective_units}単位
            <p>単位充足!</p>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
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
        <p>・履修中(twinsに登録中)の単位は「単位修得済み」の判定となります。</p>
        <p>
          ・必修科目は単位修得済みなら緑色、未修得なら白か黄色で表示されます。
        </p>
        <p>
          ・選択科目(複数選択科目)は最低取得すべき単位数を満たしていれば緑色、そうでなければ黄色で表示されます。
        </p>
        <p>
          ・選択科目で卒業に必要な単位数を満たしているかについては画面右側の選択科目合計取得単位数をご確認ください
        </p>
        <p></p>
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
          {judge_electiveGBGE()}
          {judge_electiveMuseum()}
          {judge_otherSubjects()}
          {check_elective_units()}
        </div>
      </div>
    </>
  );
}

export default App;
