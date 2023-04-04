import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./copyLink.scss";

function CopyLink() {
  const [isCopy, setIsCopy] = useState(false);

  return (
    <div
      className="copyLink"
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopy(true);
      }}
      onMouseOut={() => setIsCopy(false)}
    >
      <p className="copyLink__title">
        <span className="copyLink__subtitle">Ссылка на холст</span>{" "}
        {window.location.href}
      </p>
      <div className="copyLink__bts-container">
        <button className="copyLink__bts">Копировать</button>
        <div
          className={`copyLink__circle-copy ${
            isCopy && "copyLink__circle-copy_active"
          }`}
        >
          &#10003;
        </div>
      </div>
    </div>
  );
}

export default CopyLink;
