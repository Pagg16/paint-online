import "./app.scss";
import ToolBar from "../ToolBar/ToolBar";
import SettingBar from "../SettingBar/SettingBar";
import Canvas from "../Canvas/Canvas";

function App() {
  return (
    <div className="app">
      <ToolBar />
      <SettingBar />
      <Canvas />
    </div>
  );
}

export default App;
