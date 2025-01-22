import { useEffect, useState, useRef } from "react";
import styles from "./../styles/popup.module.css";

const PopUp = () => {
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const popUpRef = useRef<HTMLDivElement>(null);

  const togglePopUp = () => {
    setPopUpVisible(!isPopUpVisible);
  };

  useEffect(() => {
    if (isPopUpVisible && popUpRef.current) {
      popUpRef.current.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPopUpVisible]);

  return (
    <>
      <div>
        <div className={styles.Link} onClick={togglePopUp}>
          CSVファイルのダウンロード方法はこちら
        </div>
        {isPopUpVisible && (
          <div className={styles.PopUp}>
            <button onClick={togglePopUp}>×</button>
            <div
              className={styles.Explain}
              id="PopUp" // IDを一致させる
              tabIndex={-1} // フォーカス可能にする
              ref={popUpRef} // useRefを使用
              role="dialog" // アクセシビリティ向上
              aria-modal="true" // アクセシビリティ向上
            >
              <h3>twinsから成績データをダウンロードする方法</h3>
              <p>1. まずtwinsにログインします。</p>
              <img src="/login.png" alt="ログイン画面" />
              <p>2. 「成績」を選択します。</p>
              <img src="/select_grade.png" alt="成績選択画面" />
              <p>3. 「成績」にアクセスできたら一番下までスクロールします。</p>
              <p>4. 「ダウンロード」ボタンを押します。</p>
              <img src="/csvExport3.PNG" alt="ダウンロードボタン" />
              <p>
                5. ファイル形式は「csv」、文字コードは「Unicode
                (UTF-8)」を選択します。
              </p>
              <p>6. 「出力」ボタンを押します。これでダウンロード完了です！</p>
              <img src="/grade_output.png" alt="出力完了画面" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PopUp;
