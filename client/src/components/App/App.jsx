import "./app.scss";
import ToolBar from "../ToolBar/ToolBar";
import SettingBar from "../SettingBar/SettingBar";
import Canvas from "../Canvas/Canvas";
import { Route, Routes, Navigate } from "react-router-dom";
import SingInModal from "../SingInModal/SingInModal";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import loaderState from "../../store/loaderState";

function App() {
  useEffect(() => {
    const onPageLoad = () => {
      loaderState.setVisible(false);
      console.log("загрузка завершена");
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);

      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);
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
      {/* <SingInModal /> */}
      <Loader />
    </div>
  );
}

export default App;
