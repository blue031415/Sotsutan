import "./App.css";
import { useState } from "react";

function App() {
  const [isOverlayVisible, setOverlayVisible] = useState(true);

  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };

  return (
    <>
      <h1>そつたんのトップページ</h1>
      <button onClick={toggleOverlay}>
        {isOverlayVisible ? "必修科目を表示しない" : "必修科目を表示する"}
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
        <table border={1}>
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
            <tr>
              <th scope="row">微分積分A</th>
              <td>2</td>
            </tr>
            <tr>
              <th scope="row">微分積分B</th>
              <td>2</td>
            </tr>
            <tr>
              <th scope="row">線形代数A</th>
              <td>2</td>
            </tr>
            <tr>
              <th scope="row">線形代数B</th>
              <td>2</td>
            </tr>
            <tr>
              <th scope="row">情報数学A</th>
              <td>2</td>
            </tr>
            <tr>
              <th scope="row">確率と統計</th>
              <td>2</td>
            </tr>
            <tr>
              <th scope="row">プログラミング入門A</th>
              <td>2</td>
            </tr>
            <tr>
              <th scope="row">プログラミング入門B</th> <td>1</td>
            </tr>
            <tr>
              <th scope="row">プログラミング</th> <td>2</td>
            </tr>
            <tr>
              <th scope="row">コンピュータシステムとOS</th> <td>2</td>
            </tr>
            <tr>
              <th scope="row">データ構造とアルゴリズム</th> <td>2</td>
            </tr>
            <tr>
              <th scope="row">データ構造とアルゴリズム実習</th> <td>1</td>
            </tr>
            <tr>
              <th scope="row">データ工学概論</th> <td>2</td>
            </tr>
            <tr>
              <th scope="row">ファーストイヤーセミナー</th>
              <td>1</td>
            </tr>
            <tr>
              <th scope="row">学問への誘い</th>
              <td>1</td>
            </tr>
            <tr>
              <th scope="row">情報リテラシー(講義)</th>
              <td>1</td>
            </tr>
            <tr>
              <th scope="row">情報リテラシー(演習)</th>
              <td>1</td>
            </tr>
            <tr>
              <th scope="row">データサイエンス</th>
              <td>2</td>
            </tr>
            <tr>
              <th scope="row">基礎体育(春)</th>
              <td>0.5</td>
            </tr>
            <tr>
              <th scope="row">基礎体育(秋)</th>
              <td>0.5</td>
            </tr>
            <tr>
              <th scope="row">応用体育(春)</th>
              <td>0.5</td>
            </tr>
            <tr>
              <th scope="row">応用体育(秋)</th>
              <td>0.5</td>
            </tr>
            <tr>
              <th scope="row">English Presentation Skills I</th>
              <td>1</td>
            </tr>
            <tr>
              <th scope="row">English Reading Skills I</th>
              <td>1</td>
            </tr>
            <tr>
              <th scope="row">English Presentation Skills II</th>
              <td>1</td>
            </tr>
            <tr>
              <th scope="row">English Reading Skills II</th>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
