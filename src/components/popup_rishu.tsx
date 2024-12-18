import React from 'react';


interface CourseInfo {
  科目番号: string;
  科目名: string;
  標準履修年次: string;
  実施学期: string;
  曜時限: string;
}

interface ElectivePopupProps {
  isOpen: boolean;
  onClose: () => void;
  courseData: CourseInfo[];
  position: { x: number; y: number };
}

const ElectivePopup: React.FC<ElectivePopupProps> = ({ 
  isOpen, 
  onClose, 
  courseData,
  position
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="popup-overlay"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 999,
					height: 'fit-content',
					width: 'fit-content'
        }}
      />
      <div
        className="popup-content"
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '4px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1000,
          maxHeight: '300px',
          overflowY: 'auto',
					height: 'fit-content',
					width: 'fit-content',
          minWidth: '400px'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>科目番号</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>科目名</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>標準履修年次</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>実施学期</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>曜時限</th>
            </tr>
          </thead>
          <tbody>
            {courseData
              .filter(course => 
                course.科目番号.startsWith('GA4') || 
                course.科目番号.startsWith('GC5')
              )
              .map(course => (
                <tr 
                  key={course.科目番号}
                  style={{ borderBottom: '1px solid #eee' }}
                >
                  <td style={{ padding: '8px' }}>{course.科目番号}</td>
                  <td style={{ padding: '8px' }}>{course.科目名}</td>
                  <td style={{ padding: '8px' }}>{course.標準履修年次}</td>
                  <td style={{ padding: '8px' }}>{course.実施学期}</td>
                  <td style={{ padding: '8px' }}>{course.曜時限}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <button onClick={onClose}>close</button>
      </div>
    </>
  );
};

export default ElectivePopup;
