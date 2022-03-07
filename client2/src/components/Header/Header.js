import React from "react";
import "./Header.scss";
import SearchIcon from "@mui/icons-material/Search";

function Header() {
  return (
    <div className="header">
      <div className="header_left">
        <SearchIcon />
      </div>

      <div className="header_right">
        <h2 style={{ paddingRight: 20, letterSpacing: 1, fontSize: 26 }}>
          Trade System
        </h2>
      </div>
    </div>
  );
}

export default Header;
