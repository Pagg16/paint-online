import React from "react";
import "./loader.scss";

import loaderState from "../../store/loaderState";
import { observer } from "mobx-react-lite";

const Loader = observer(() => {
  const visible = loaderState.onVisible;
  return (
    <div
      className={`loader-container ${
        !visible && "loader-container__onVisible"
      }`}
    >
      <div className="loader"></div>
    </div>
  );
});

export default Loader;
