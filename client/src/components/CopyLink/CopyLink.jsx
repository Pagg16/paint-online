import React from "react";
import { useLocation } from "react-router-dom";
import "./copyLink.scss";

function CopyLink() {
  return (
    <div
      className="copyLink"
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
      }}
    >
      <p className="copyLink__title">
        <span className="copyLink__subtitle">Ссылка на холст</span>{" "}
        {window.location.href}
      </p>
      <button className="copyLink__bts">Копировать</button>
    </div>
  );
}

export default CopyLink;
