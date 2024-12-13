interface ElectivePopupProps {
  isOpen: boolean;
  onClose: () => void;
  items: string[];
  position: { x: number; y: number };
}

const ElectivePopup: React.FC<ElectivePopupProps> = ({ 
  isOpen, 
  onClose, 
  items,
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
					width: 'fit-content'
        }}
      >
        {/* <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {items.map((item, index) => (
            <li 
              key={index}
              style={{ 
                padding: '0.5rem 0',
                borderBottom: '1px solid #eee'
              }}
            >
              {item.replace(/"/g, '')}
            </li>
          ))}
        </ul> */}
				<img src="sample.png" style={{width: '350px'}}/>
      </div>
    </>
  );
};

export default ElectivePopup;
