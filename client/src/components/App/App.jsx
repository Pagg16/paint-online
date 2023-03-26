import "./app.scss";
import ToolBar from "../ToolBar/ToolBar";
import SettingBar from "../SettingBar/SettingBar";
import Canvas from "../Canvas/Canvas";
import { Route, Routes, Navigate } from "react-router-dom";
import SingInModal from "../SingInModal/SingInModal";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/:id"
          element={
            <div className="main">
              <ToolBar />
              <SettingBar />
              <Canvas />
            </div>
          }
        />
        <Route
          path="/"
          element={<Navigate replace to={`f${(+new Date()).toString(16)}`} />}
        />
      </Routes>
      <SingInModal />
    </div>
  );
}

export default App;
