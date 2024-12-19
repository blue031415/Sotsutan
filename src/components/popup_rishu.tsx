import React, { useState } from 'react';
import './popup_rishu.css';

interface CourseInfo {
  科目番号: string;
  科目名: string;
  曜時限?: string;
  標準履修年次?: string;
  実施学期?: string;
  単位数?: number;  // 追加
}

interface PopupRishuProps {
  isOpen: boolean;
  onClose: () => void;
  courseData: CourseInfo[];
  position: { x: number; y: number };
}

const PopupRishu: React.FC<PopupRishuProps> = ({
  isOpen,
  onClose,
  courseData
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [selectedSemester, setSelectedSemester] = useState<string>('春A');
  const weekdays = ['月', '火', '水', '木', '金'];
  const periods = Array.from({length: 7}, (_, i) => i + 1);
  const semesters = ['春A', '春B', '春C', '秋A', '秋B', '秋C'];

  if (!isOpen) return null;

  // GA4/GC5のみをフィルタリング
  const filterByCourseNumber = (courses: CourseInfo[]) => {
    return courses.filter(course => 
      course.科目番号.startsWith('GA4') || 
      course.科目番号.startsWith('GC5')
    );
  };

  // 時限・年次情報のない科目を抽出
  const specialCourses = filterByCourseNumber(
    courseData.filter(course => 
      !course.曜時限 || !course.標準履修年次 || 
      course.曜時限.trim() === '' || 
      course.標準履修年次.trim() === ''
    )
  );

  // 通常の科目を年次と実施学期でフィルタリング
  const getCoursesForCell = (day: string, period: number) => {
    return filterByCourseNumber(
      courseData.filter(course => 
        course.曜時限?.includes(`${day}${period}`) &&
        course.標準履修年次?.includes(selectedYear.toString()) &&
        course.実施学期?.includes(selectedSemester)
      )
    );
  };

  return (
    <div className="popup">
      <button className="close-button" onClick={onClose}>×</button>
      
      <div className="semester-selector">
        {semesters.map(semester => (
          <button
            key={semester}
            className={`semester-button ${selectedSemester === semester ? 'active' : ''}`}
            onClick={() => setSelectedSemester(semester)}
          >
            {semester}
          </button>
        ))}
      </div>

      <div className="year-selector">
        {[1, 2, 3, 4].map(year => (
          <button
            key={year}
            className={`year-button ${selectedYear === year ? 'active' : ''}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}年次
          </button>
        ))}
      </div>

      <table className="timetable">
        <thead>
          <tr>
            <th></th>
            {weekdays.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {periods.map(period => (
            <tr key={period}>
              <td>{period}</td>
              {weekdays.map(day => (
                <td key={`${day}${period}`}>
                  {getCoursesForCell(day, period).map(course => (
                    <div key={course.科目番号} className="course-cell">
                      {course.科目名}
                      {course.単位数 && <div className="course-units">{course.単位数}単位</div>}
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="special-courses">
        <h3>その他の科目</h3>
        {specialCourses.map(course => (
          <div key={course.科目番号} className="special-course-item">
            {course.科目名}
            {course.単位数 && <span className="course-units">{course.単位数}単位</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopupRishu;
