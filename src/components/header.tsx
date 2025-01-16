import "./header.css";
import checkmark from "./checkmark.png";
import green_subject from "./green_subject.png";
import yellow_subject from "./yellow_subject.png";
import hover_green from "./hover_green.png";
import hover_red from "./hover_red.png";
import download_icon from "./download_icon.png";
import upload_icon from "./upload_icon.png";
import caution from "./caution.png";
import info_icon from "./info_icon.png";
import PopUp from "./popup";

const Header = () => {
  return (
    <>
      <h1>そつたん</h1>
      <div className="description">
        <h2>そつたんとは？</h2>
        <div>
          筑波大学情報学群情報メディア創成学類22, 23,
          24生の履修要覧をわかりやすく表示するツールです。
          Twinsからダウンロードできる成績ファイルをアップロードすることで、修得状況を表示することができます。
          成績ファイルは、ローカルで処理され、外部にアップロードされることはありません。
        </div>
        <div className="function">
          <div className="function-row">
            <img src={checkmark} alt="checkmark" className="checkmark-icon" />
            <div>履修中・修得済みの科目は緑色で表示されます</div>
            <img
              src={green_subject}
              alt="green_subject"
              className="subject-example"
            />
          </div>
          <div className="function-row">
            <img src={checkmark} alt="checkmark" className="checkmark-icon" />
            <div>
              未修得の科目は黄色で表示されます
              <div className="detail">
                選択科目の場合、最低単位数を満たしていない場合、黄色で表示されます
              </div>
            </div>
            <img
              src={yellow_subject}
              alt="yellow_subject"
              className="subject-example"
            ></img>
          </div>
          <div className="function-row">
            <img src={checkmark} alt="checkmark" className="checkmark-icon" />
            <div>
              ホバーすることで詳細な履修状況が表示されます
              <div className="detail">
                必修科目で未履修の場合は科目名が赤色になります
              </div>
            </div>
            <img
              src={hover_green}
              alt="hover_green"
              className="hover-example"
            ></img>
            <img
              src={hover_red}
              alt="hover_red"
              className="hover-example"
            ></img>
          </div>
          <div className="function-row">
            <img src={checkmark} alt="checkmark" className="checkmark-icon" />
            <div>
              黄色の部分に注意して履修を組むことで、卒業要件を満たすことができます
            </div>
          </div>
        </div>
      </div>
      <div className="usage">
        <h2>使い方</h2>
        <div>
          <div className="usage-row">
            <img
              src={download_icon}
              alt="download_icon"
              className="usage-icon"
            />
            TwinsからCSVファイルをダウンロードする
            <div className="usage-csv">
              <img src={info_icon} alt="info_icon" className="info-icon" />
              <PopUp />
            </div>
          </div>
          <div className="usage-row">
            <img src={upload_icon} alt="upload" className="usage-icon" />
            「CSVファイルをアップロード」をクリックしてCSVファイルをアップロードする
          </div>
          <div className="usage-caution">
            <img src={caution} alt="caution" className="usage-caution-icon" />
            <span>
              Google
              Chromeのみ対応しています。また、PCから全画面ウインドウの状態でご使用ください。
            </span>
          </div>
        </div>
      </div>
      <div className="notice">
        情報の正確性には細心の注意を払っていますが、本サービスによって生じた不利益等について一切の責任を負いません
      </div>
    </>
  );
};

export default Header;
