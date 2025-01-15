import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <h1 className="title">そつたん</h1>
      <div className="container">
        <h2>そつたんとは？</h2>
        <div className="section">
          <p>
            筑波大学情報学群情報メディア創成学類22, 23,
            24生の履修要覧をわかりやすく表示するツールです。Twinsからダウンロードできる成績ファイルをアップロードすることで、履修状況を表示することができます。
          </p>
        </div>
        <div className="section">
          <h3>機能</h3>
          <ul className="checklist">
            <li>履修中・修得済みの科目は緑色で表示されます</li>
            <li>未修得の科目は黄色で表示されます</li>
            <li>ホバーすることで詳細な履修状況が表示されます</li>
            <li>
              黄色の部分に注意して履修を組むことで、卒業要件を満たすことができます
            </li>
          </ul>
        </div>
        <div className="section">
          <h3>使い方</h3>
          <ol>
            <li>TwinsからCSVファイルをダウンロードする</li>
            <li>
              <button className="btn-upload">ファイルを選択</button>
              でCSVファイルをアップロードする
            </li>
          </ol>
          <p className="warning">
            Google
            Chromeのみ対応しています。また、PCから全画面ウィンドウの状態でご使用ください。
          </p>
        </div>
        <div className="notice">
          <p>
            情報の正確性には細心の注意を払っていますが、本サービスによって生じた不利益等について一切の責任を負いません。
          </p>
          <p>
            成績ファイルは、ローカルで処理され、外部にアップロードされることはありません。また、アップロードされたファイルは一切他の目的には利用しません。
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
