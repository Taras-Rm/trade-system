import React from "react";
import "./Header.scss";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import { Avatar, IconButton } from "@mui/material";

function Header() {
  return (
    <div className="header">
      <div className="header_left">
        <SearchIcon />
      </div>

      <div className="header_right">
        <IconButton>
          <LanguageIcon />
        </IconButton>
        <IconButton sx={{ ml: 1 }}>
          <Avatar sx={{ bgcolor: "orange" }}>T</Avatar>
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
