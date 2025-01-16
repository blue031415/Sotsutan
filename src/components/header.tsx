import "./header.css";

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
          <div>履修中・修得済みの科目は緑色で表示されます</div>
          <div>
            未修得の科目は黄色で表示されます
            <div className="caution">
              選択科目の場合、最低単位数を満たしていない場合、黄色で表示されます
            </div>
          </div>
          <div>
            履修中・修得済みの科目は緑色で表示されます
            <div className="caution">
              必修科目で未履修の場合は科目名が赤色になります
            </div>
          </div>
          <div>
            黄色の部分に注意して履修を組むことで、卒業要件を満たすことができます
          </div>
        </div>
      </div>
      <div className="usage">
        <h2>使い方</h2>
        <div>
          <div>
            TwinsからCSVファイルをダウンロードする
            <div>CSVのダウンロード方法はこちら</div>
          </div>
          <div>「ファイルを選択」でCSVファイルをアップロードする</div>
          <div>
            Google
            Chromeのみ対応しています。また、PCから全画面ウインドウの状態でご使用ください。
          </div>
        </div>
      </div>
      <div className="caution">
        情報の正確性には細心の注意を払っていますが、本サービスによって生じた不利益等について一切の責任を負いません
      </div>
    </>
  );
};

export default Header;
