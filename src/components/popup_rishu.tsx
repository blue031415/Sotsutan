import React from "react";
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
  if (!isOpen) return null;

  const filteredCourses = courseData.filter((course) =>
    courseFilters.some((filter) => course.科目番号.startsWith(filter))
  );

  return (
    <div className="popup">
      <button className="close-button" onClick={onClose}>
        ×
      </button>

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
