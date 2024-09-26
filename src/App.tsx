import "./App.css";
import React, { useState } from "react";

function App() {
  const [isOverlayVisible, setOverlayVisible] = useState(true);

  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };

  return (
    <>
      <h1>そつたんのトップページ</h1>
      <button onClick={toggleOverlay}>
        {isOverlayVisible
          ? "必修科目のハイライトを元に戻す"
          : "必修科目をハイライトする"}
      </button>
      <div className="highlight-box">
        <div className="youran_mast">
          <img src="mast24.png" alt="mastの卒業要覧"></img>
        </div>
        {isOverlayVisible && <div className="overlay_major_basic"></div>}
        {isOverlayVisible && <div className="overlay_major"></div>}
        {isOverlayVisible && <div className="overlay_common"></div>}
      </div>
    </>
  );
}

export default App;
