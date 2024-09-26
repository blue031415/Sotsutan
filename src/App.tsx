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
      {isOverlayVisible && (
        <table>
          <caption>必修科目一覧</caption>
          <thead>
            <tr>
              <th scope="col">科目名</th>
              <th scope="col">単位数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">卒業研究A</th>
              <td>3</td>
            </tr>
            <tr>
              <th scope="row">卒業研究B</th>
              <td>3</td>
            </tr>
            <tr>
              <th scope="row">情報メディア実験A</th>
              <td>3</td>
            </tr>
            <tr>
              <th scope="row">情報メディア実験B</th>
              <td>3</td>
            </tr>
            <tr>
              <th scope="row">専門英語A</th>
              <td>1</td>
            </tr>
            <tr>
              <th scope="row">専門英語B</th>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
