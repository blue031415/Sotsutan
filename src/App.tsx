import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/header";
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
  status: boolean;
};

type electiveSubjectList = {
  name: string;
  subjectId: string;
  numberOfUnits: number;
};

const parseYearString = (yearStr: string): string => {
  if (!yearStr) return "";

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

  return numbers.join(",");
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
  const [currentFilters, setCurrentFilters] = useState<string[]>([
    "GC2",
    "GA1",
  ]);

  const handleBasicClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({
      x: rect.right + 10,
      y: rect.top,
    });
    setCurrentFilters(["GC2", "GA1"]);
    setIsPopupOpen(true);
  };

  const handleAdvancedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({
      x: rect.right + 10,
      y: rect.top,
    });
    setCurrentFilters(["GC5", "GA4"]);
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

  const [unit_basic, setUnit_basic] = useState<number>(0);
  const [unit_advanced, setUnit_advanced] = useState<number>(0);
  const [unit_gakusi, setUnit_gakusi] = useState<number>(0);
  const [unit_electivePE, setUnit_electivePE] = useState<number>(0);
  const [unit_electiveLanguage, setUnit_electiveLanguage] = useState<number>(0);
  const [unit_electiveJapanese, setUnit_electiveJapanese] = useState<number>(0);
  const [unit_electiveArt, setUnit_electiveArt] = useState<number>(0);
  const [unit_electiveGBGE, setUnit_electiveGBGE] = useState<number>(0);
  const [unit_electiveMuseum, setUnit_electiveMuseum] = useState<number>(0);
  const [unit_otherSubjects, setUnit_otherSubjects] = useState<number>(0);

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
    const checkedList = updateList.map((subject) => subject.name);
    subjectList.forEach((subject) => {
      if (
        row[3] === `"${subject.name}"` &&
        row[7] !== '"D"' &&
        row[7] !== '"F"'
      ) {
        if (!checkedList.includes(subject.name)) {
          // 科目名が一致し、かつ成績がDでない場合
          updateList.push({
            name: subject.name,
            index: subject.index,
            height: subject.height,
            status: true,
          });
        } else {
          updateList[checkedList.indexOf(subject.name)].status = true;
        }
        count++;
      } else if (!checkedList.includes(subject.name)) {
        updateList.push({
          name: subject.name,
          index: subject.index,
          height: subject.height,
          status: false,
        });
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
            const checkedListPe = updatedSubjectStatuses_pe.map(
              (subject) => subject.name
            );
            const first_four = subject.name.slice(0, 4);
            const last_two = subject.name.slice(4, 7);
            if (
              row[3].slice(1, 5) == first_four &&
              row[3].slice(-4, -1) == last_two &&
              row[7] !== '"D"'
            ) {
              if (!checkedListPe.includes(subject.name)) {
                updatedSubjectStatuses_pe.push({
                  name: subject.name,
                  index: subject.index,
                  height: subject.height,
                  status: true,
                });
              } else {
                updatedSubjectStatuses_pe[
                  checkedListPe.indexOf(subject.name)
                ].status = true;
              }
              peCounter++;
            } else if (!checkedListPe.includes(subject.name)) {
              updatedSubjectStatuses_pe.push({
                name: subject.name,
                index: subject.index,
                height: subject.height,
                status: false,
              });
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
            if (row[7] !== `"D"` && row[7] !== `"F"`) {
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
    if (information.length === 0) return;
    const passListInfo = information
      .map((subject) => subject.status)
      .includes(false);
    return (
      <div
        className="hover_info"
        style={{
          position: "absolute",
          top: `${26.5 + 7.8}%`,
          left: "46.1%",
          width: "11.5%",
          height: "1.98%",
          backgroundColor: !passListInfo
            ? "rgba(0, 128, 0, 0.4)"
            : "rgba(256, 256, 0, 0.4)",
          zIndex: 1,
        }}
      >
        <div className="info">
          {information.map((subject, index) => (
            <div
              key={index}
              style={{
                color: subject.status ? "green" : "red",
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
    const passListSougou = sougou_must
      .map((subject) => subject.status)
      .includes(false);
    return (
      <div
        className="hover_sougou_must"
        style={{
          position: "absolute",
          top: `26.4%`,
          left: "46.1%",
          width: "11.5%",
          height: `${1.98 * 4}%`,
          backgroundColor: !passListSougou
            ? "rgba(0, 128, 0, 0.4)"
            : "rgba(256, 256, 0, 0.4)",
        }}
      >
        <div className="sougou_must">
          {sougou_must.map((subject, index) => (
            <div
              key={index}
              style={{
                color: subject.status ? "green" : "red",
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
    const passListPe = pe.map((subject) => subject.status).includes(false);
    console.log(pe);
    return (
      <div
        className="hover_pe"
        style={{
          position: "absolute",
          top: `${26.4 + 1.98 * 5}%`,
          left: "46.1%",
          width: "11.5%",
          height: `${1.98}%`,
          backgroundColor: !passListPe
            ? "rgba(0, 128, 0, 0.4)"
            : "rgba(256, 256, 0, 0.4)",
        }}
      >
        <div className="pe">
          {pe.map((subject, index) => (
            <div
              key={index}
              style={{
                color: subject.status ? "green" : "red",
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
    const passListEnglish = English.map((subject) => subject.status).includes(
      false
    );
    return (
      <div
        className="hover_English"
        style={{
          position: "absolute",
          top: `${26.4 + 1.98 * 6}%`,
          left: "46.1%",
          width: "11.5%",
          height: "1.98%",
          backgroundColor: !passListEnglish
            ? "rgba(0, 128, 0, 0.4)"
            : "rgba(256, 256, 0, 0.4)",
          zIndex: 3,
        }}
      >
        <div className="English">
          {English.map((subject, index) => (
            <div
              key={index}
              style={{
                color: subject.status ? "green" : "red",
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
    const elements =
      unit_basic === 0 ? (
        <p style={{ color: "red" }}>この区分の科目は履修・修得していません</p>
      ) : (
        <table className="hoberTable">
          <thead>
            <tr>
              <th>科目番号</th>
              <th>科目名</th>
              <th>単位数</th>
            </tr>
          </thead>
          <tbody>
            {electiveSubjects_basic.map((subject, index) => (
              <tr key={index}>
                <td>{subject.subjectId.replace(/"/g, "").trim()}</td>
                <td>{subject.name.replace(/"/g, "").trim()}</td>
                <td>{subject.numberOfUnits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    return (
      <div>
        <div
          className="hover_elective_basic"
          style={{
            position: "absolute",
            top: `${26.4}%`,
            left: "36%",
            width: "6%",
            height: "51%",
            backgroundColor:
              unit_basic >= 32
                ? "rgba(0, 128, 0, 0.4)"
                : "rgba(255, 255, 0, 0.4)",
            zIndex: 3,
          }}
          onClick={handleBasicClick}
        >
          <div className="elective_basic">{elements}</div>
        </div>
        <div className="basic-white-area">
          <p>現在修得済み：{unit_basic}単位</p>
        </div>
        <div>
          <ElectivePopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            courseData={courseData}
            position={popupPosition}
            courseFilters={currentFilters}
          />
        </div>
      </div>
    );
  };

  const judge_elective_advanced = () => {
    if (!file_upload) return <></>;
    const elements =
      unit_advanced === 0 ? (
        <p style={{ color: "red" }}>この区分の科目は履修・修得していません</p>
      ) : (
        <table className="hoberTable">
          <thead>
            <tr>
              <th>科目番号</th>
              <th>科目名</th>
              <th>単位数</th>
            </tr>
          </thead>
          <tbody>
            {electiveSubjects_advanced.map((subject, index) => (
              <tr key={index}>
                <td>{subject.subjectId.replace(/"/g, "").trim()}</td>
                <td>{subject.name.replace(/"/g, "").trim()}</td>
                <td>{subject.numberOfUnits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    return (
      <div>
        <div
          className="hover_elective_basic"
          style={{
            position: "absolute",
            top: `${26.4}%`,
            left: "12.3%",
            width: "6.2%",
            height: "51%",
            backgroundColor:
              unit_advanced >= 20
                ? "rgba(0, 128, 0, 0.4)"
                : "rgba(256, 256, 0, 0.4)",
            zIndex: 4,
          }}
          onClick={handleAdvancedClick}
        >
          <div className="elective_basic">{elements}</div>
        </div>
        <div className="advanced-white-area">
          <p>現在修得済み：{unit_advanced}単位</p>
        </div>
        <ElectivePopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          courseData={courseData}
          position={popupPosition}
          courseFilters={currentFilters}
        />
      </div>
    );
  };

  const judge_gakusi = () => {
    if (!file_upload) return <></>;
    const elements =
      unit_gakusi === 0 ? (
        <p style={{ color: "red" }}>この区分の科目は履修・修得していません</p>
      ) : (
        <table className="hoberTable">
          <thead>
            <tr>
              <th>科目番号</th>
              <th>科目名</th>
              <th>単位数</th>
            </tr>
          </thead>
          <tbody>
            {gakusiSubjects.map((subject, index) => (
              <tr key={index}>
                <td>{subject.subjectId.replace(/"/g, "").trim()}</td>
                <td>{subject.name.replace(/"/g, "").trim()}</td>
                <td>{subject.numberOfUnits}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <div className="gakusi">{elements}</div>
        </div>
        <div className="common-white-area">
          <p>
            現在修得済み：
            {unit_gakusi +
              (unit_electivePE === null ? 0 : unit_electivePE) +
              (unit_electiveLanguage === null ? 0 : unit_electiveLanguage) +
              (unit_electiveJapanese === null ? 0 : unit_electiveJapanese) +
              (unit_electiveArt === null ? 0 : unit_electiveArt)}
            単位
          </p>
        </div>
      </div>
    );
  };

  const judge_electivePE = () => {
    if (!file_upload) return <></>;
    const elements =
      unit_electivePE === 0 ? (
        <p>この区分の科目は履修・修得していません</p>
      ) : (
        <table className="hoberTable">
          <thead>
            <tr>
              <th>科目番号</th>
              <th>科目名</th>
              <th>単位数</th>
            </tr>
          </thead>
          <tbody>
            {electivePE.map((subject, index) => (
              <tr key={index}>
                <td>{subject.subjectId.replace(/"/g, "").trim()}</td>
                <td>{subject.name.replace(/"/g, "").trim()}</td>
                <td>{subject.numberOfUnits}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <div className="electivePE">{elements}</div>
        </div>
      </div>
    );
  };

  const judge_electiveLanguage = () => {
    if (!file_upload) return <></>;
    const elements =
      unit_electiveLanguage === 0 ? (
        <p>この区分の科目は履修・修得していません</p>
      ) : (
        <table className="hoberTable">
          <thead>
            <tr>
              <th>科目番号</th>
              <th>科目名</th>
              <th>単位数</th>
            </tr>
          </thead>
          <tbody>
            {electiveLanguage.map((subject, index) => (
              <tr key={index}>
                <td>{subject.subjectId.replace(/"/g, "").trim()}</td>
                <td>{subject.name.replace(/"/g, "").trim()}</td>
                <td>{subject.numberOfUnits}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <div className="electiveLanguage">{elements}</div>
      </div>
    );
  };

  const judge_electiveJapanese = () => {
    if (!file_upload) return <></>;
    const elements =
      unit_electiveJapanese === 0 ? (
        <p>この区分の科目は履修・修得していません</p>
      ) : (
        <table className="hoberTable">
          <thead>
            <tr>
              <th>科目番号</th>
              <th>科目名</th>
              <th>単位数</th>
            </tr>
          </thead>
          <tbody>
            {electiveJapanese.map((subject, index) => (
              <tr key={index}>
                <td>{subject.subjectId.replace(/"/g, "").trim()}</td>
                <td>{subject.name.replace(/"/g, "").trim()}</td>
                <td>{subject.numberOfUnits}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <div className="electiveJapanese">{elements}</div>
      </div>
    );
  };

  const judge_electiveArt = () => {
    if (!file_upload) return <></>;
    const elements =
      unit_electiveArt === 0 ? (
        <p>この区分の科目は履修・修得していません</p>
      ) : (
        <table className="hoberTable">
          <thead>
            <tr>
              <th>科目番号</th>
              <th>科目名</th>
              <th>単位数</th>
            </tr>
          </thead>
          <tbody>
            {electiveArt.map((subject, index) => (
              <tr key={index}>
                <td>{subject.subjectId.replace(/"/g, "").trim()}</td>
                <td>{subject.name.replace(/"/g, "").trim()}</td>
                <td>{subject.numberOfUnits}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <div className="electiveJapanese">{elements}</div>
      </div>
    );
  };

  const judge_electiveGBGE = () => {
    if (!file_upload) return <></>;
    const elements =
      unit_electiveGBGE === 0 ? (
        <p>この区分の科目は履修・修得していません</p>
      ) : (
        <table className="hoberTable">
          <thead>
            <tr>
              <th>科目番号</th>
              <th>科目名</th>
              <th>単位数</th>
            </tr>
          </thead>
          <tbody>
            {electiveGBGE.map((subject, index) => (
              <tr key={index}>
                <td>{subject.subjectId.replace(/"/g, "").trim()}</td>
                <td>{subject.name.replace(/"/g, "").trim()}</td>
                <td>{subject.numberOfUnits}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <div className="electiveGBGE">{elements}</div>
      </div>
    );
  };

  const judge_electiveMuseum = () => {
    if (!file_upload) return <></>;
    const elements =
      unit_electiveMuseum === 0 ? (
        <p>この区分の科目は履修・修得していません</p>
      ) : (
        <table className="hoberTable">
          <thead>
            <tr>
              <th>科目番号</th>
              <th>科目名</th>
              <th>単位数</th>
            </tr>
          </thead>
          <tbody>
            {electiveMuseum.map((subject, index) => (
              <tr key={index}>
                <td>{subject.subjectId.replace(/"/g, "").trim()}</td>
                <td>{subject.name.replace(/"/g, "").trim()}</td>
                <td>{subject.numberOfUnits}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <div className="electiveMuseum">{elements}</div>
      </div>
    );
  };

  const judge_otherSubjects = () => {
    if (!file_upload) return <></>;
    const elements =
      unit_otherSubjects === 0 ? (
        <p style={{ color: "red" }}>この区分の科目は履修・修得していません</p>
      ) : (
        <table className="hoberTable">
          <thead>
            <tr>
              <th>科目番号</th>
              <th>科目名</th>
              <th>単位数</th>
            </tr>
          </thead>
          <tbody>
            {otherSubjects.map((subject, index) => (
              <tr key={index}>
                <td>{subject.subjectId.replace(/"/g, "").trim()}</td>
                <td>{subject.name.replace(/"/g, "").trim()}</td>
                <td>{subject.numberOfUnits}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <div className="otherSubjects">{elements}</div>
        </div>
        <div className="relation-white-area">
          <p>
            現在修得済み：
            {unit_otherSubjects +
              (unit_electiveGBGE === null ? 0 : unit_electiveGBGE) +
              (unit_electiveMuseum === null ? 0 : unit_electiveMuseum)}
            単位
          </p>
        </div>
      </div>
    );
  };

  const check_elective_units = () => {
    const elective_units =
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
          <div className="location_of_balloon">
            <div className="balloon2-left">
              <p>現在修得済み:{elective_units}単位</p>
              <p>あと{74 - elective_units}単位必要!</p>
            </div>
          </div>
        </div>
      );
    } else if (elective_units >= 74 && unit_basic) {
      return (
        <div className="fulfill_elective_units">
          <div className="location_of_balloon">
            <div className="balloon2-left">
              <p>現在修得済み:{elective_units}単位</p>
              <p>単位充足!</p>
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const hilight_common_units = () => {
    const common_units =
      Math.min(unit_gakusi === null ? 0 : unit_gakusi, 4) +
      Math.min(unit_electivePE === null ? 0 : unit_electivePE, 2) +
      Math.min(unit_electiveLanguage === null ? 0 : unit_electiveLanguage, 6) +
      Math.min(unit_electiveJapanese === null ? 0 : unit_electiveJapanese, 2) +
      Math.min(unit_electiveArt === null ? 0 : unit_electiveArt, 6);

    if (file_upload) {
      return (
        <div
          className="hilight_advenced_units"
          style={{
            position: "absolute",
            top: `${74.3}%`,
            left: "57.5%",
            width: "8.67%",
            height: "3.15%",
            backgroundColor:
              common_units >= 1
                ? "rgba(0, 128, 0, 0.4)"
                : "rgba(255, 255, 0, 0.4)",
            zIndex: 3,
          }}
        ></div>
      );
    } else {
      return <></>;
    }
  };

  const hilight_relative_units = () => {
    const relative_units =
      Math.min(unit_otherSubjects === null ? 0 : unit_otherSubjects, 15) +
      Math.min(unit_electiveGBGE === null ? 0 : unit_electiveGBGE, 9) +
      Math.min(unit_electiveMuseum === null ? 0 : unit_electiveMuseum, 9);

    if (file_upload) {
      return (
        <div
          className="hilight_advenced_units"
          style={{
            position: "absolute",
            top: `${74.3}%`,
            left: "74.1%",
            width: "9.3%",
            height: "3.15%",
            backgroundColor:
              relative_units >= 6
                ? "rgba(0, 128, 0, 0.4)"
                : "rgba(255, 255, 0, 0.4)",
            zIndex: 3,
          }}
        ></div>
      );
    } else {
      return <></>;
    }
  };

  // console.log("専門基礎", subjectStatuses);
  // console.log("専門", subjectStatuses_advance);
  return (
    <>
      <Header />
      <label htmlFor="upload-file" className="custom-button">
        CSVファイルをアップロード
      </label>
      <input
        type="file"
        id="upload-file"
        name="csv_import"
        accept=".csv"
        onChange={fetchData}
        style={{ display: "none" }}
      />
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
                backgroundColor: subject.status
                  ? "rgba(0, 128, 0, 0.4)"
                  : "rgba(256, 256, 0, 0.4)",
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
                backgroundColor: subject.status
                  ? "rgba(0, 128, 0, 0.4)"
                  : "rgba(256, 256, 0, 0.4)",
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
          {hilight_common_units()}
          {hilight_relative_units()}
        </div>
      </div>
    </>
  );
}

export default App;
