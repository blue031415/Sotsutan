import React, { useState } from "react";
import "./popup_rishu.css";

interface CourseInfo {
  科目番号: string;
  科目名: string;
  曜時限?: string;
  標準履修年次?: string;
  実施学期?: string;
  単位数?: number;
}

interface PopupRishuProps {
  isOpen: boolean;
  onClose: () => void;
  courseData: CourseInfo[];
  position: { x: number; y: number };
  courseFilters: string[];
}

const PopupBasicRishu: React.FC<PopupRishuProps> = ({
  isOpen,
  onClose,
  courseData,
  courseFilters,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [selectedSemester, setSelectedSemester] = useState<string>("春A");
  const semesters = ["春A", "春B", "春C", "秋A", "秋B", "秋C"];

  if (!isOpen) return null;

  const filterByCourseNumber = (courses: CourseInfo[]) =>
    courses.filter((course) =>
      courseFilters.some((filter) => course.科目番号.startsWith(filter))
    );

  const filteredCourses = filterByCourseNumber(
    courseData.filter(
      (course) =>
        course.標準履修年次?.includes(selectedYear.toString()) &&
        course.実施学期?.includes(selectedSemester)
    )
  );

  return (
    <div className="popup">
      <button className="close-button" onClick={onClose}>
        ×
      </button>

      <div className="semester-selector">
        {semesters.map((semester) => (
          <button
            key={semester}
            className={`semester-button ${
              selectedSemester === semester ? "active" : ""
            }`}
            onClick={() => setSelectedSemester(semester)}
          >
            {semester}
          </button>
        ))}
      </div>

      <div className="year-selector">
        {[1, 2, 3, 4].map((year) => (
          <button
            key={year}
            className={`year-button ${selectedYear === year ? "active" : ""}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}年次
          </button>
        ))}
      </div>

      <table className="timetable">
        <thead>
          <tr>
            <th>科目番号</th>
            <th>科目名</th>
            <th>曜時限</th>
            <th>標準履修年次</th>
            <th>実施学期</th>
            <th>単位数</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <tr key={course.科目番号}>
              <td>{course.科目番号}</td>
              <td>{course.科目名}</td>
              <td>{course.曜時限 || "-"}</td>
              <td>{course.標準履修年次 || "-"}</td>
              <td>{course.実施学期 || "-"}</td>
              <td>{course.単位数 || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PopupBasicRishu;
