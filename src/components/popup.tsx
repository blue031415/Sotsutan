import { useState } from "react";
import styles from "./../styles/popup.module.css";

const PopUp = () => {
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const togglePopUp = () => {
    setPopUpVisible(!isPopUpVisible);
  };

  return (
    <>
      <div>
        <button onClick={togglePopUp}>ポップアップを開く</button>
        {isPopUpVisible && (
          <div className={styles.PopUp}>
            <div className={styles.Explain}>
              <p>1. まずtwinsにログインします。</p>
              <img src="/login.png"></img>
              <p>2. 「成績」を選択します。</p>
              <img src="/Select_grade.png"></img>
              <p>3. 「成績」にアクセスできたら一番下までスクロールします。</p>
              <p>4. 「ダウンロード」ボタンを押します。</p>
              <img src="/csvExport3.PNG"></img>
              <p>
                5. ファイル形式は「csv」、文字コードは「Unicode
                (UTF-8)を選択します。
              </p>
              <p>6. 「出力」ボタンを押します。これでダウンロード完了です！</p>
              <img src="/grade_output.png"></img>
            </div>
            <button onClick={togglePopUp}>閉じる</button>
          </div>
        )}
      </div>
    </>
  );
};

export default PopUp;
