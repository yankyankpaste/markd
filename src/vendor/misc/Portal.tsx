import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
const Portal = props => {
  const [containerEl] = useState(document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(containerEl);
    containerEl.id = "portal";
    if (props.expand) containerEl.classList.add("portal");
    containerEl.classList.add(props.className);
    containerEl.classList.add(props.modal && "modal");
    containerEl.setAttribute(
      "style",
      `background: ${
        props.background && props.background.startsWith("--") ? `var(${props.background})` : props.background
      };`
    );
    return function cleanup() {
      document.body.removeChild(containerEl);
    };
  }, []);
  return ReactDOM.createPortal(props.children, containerEl);
};

export default Portal;
