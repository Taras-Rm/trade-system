import React from "react";
import "./MyModal.scss";

const MyModal = ({ children, visible, setVisible }) => {
  return (
    <div
      className={`${"myModal"} ${visible && "active"}`}
      onClick={() => setVisible(false)}
    >
      <div className={"myModal_content"} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;
