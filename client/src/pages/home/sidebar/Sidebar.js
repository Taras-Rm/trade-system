import React from "react";
import "./Sidebar.scss";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../../static/images/logo2.png";

function Sidebar({ fullName = "Taras Rom", avatarLetter }) {
  const dispatch = useDispatch();

  let onLogoutClick = async () => {
    //dispatch(logout());
  };

  return (
    <div className="sidebar">
      <div className="sidebar_logo">
        <img style={{ width: 40, cursor: "pointer" }} src={logo} />
      </div>
      <div className="avatarBox">
        <Avatar sx={{ bgcolor: "orange" }}>{avatarLetter}</Avatar>
        <span className="avatarBox_name">{`${fullName}`}</span>
      </div>
      <List className="sidebar_list">
      <NavLink style={{ color: "black" }} to="/home/profile">
          <ListItem className={`sidebar_item`} sx={{ pl: 4 }} button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>
        </NavLink>
        
        <NavLink style={{ color: "black" }} to="/home/goods">
          <ListItem className={`sidebar_item`} sx={{ pl: 4 }} button>
            <ListItemIcon>
              <AllInboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Goods"} />
          </ListItem>
        </NavLink>

        <NavLink style={{ color: "black" }} to="/home/add">
          <ListItem className="sidebar_item" sx={{ pl: 4 }} button>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary={"Add goods"} />
          </ListItem>
        </NavLink>

        <ListItem className="sidebar_item" sx={{ pl: 4 }} button>
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary={"Salors"} />
        </ListItem>
        <ListItem className="sidebar_item" sx={{ pl: 4 }} button>
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary={"Salors"} />
        </ListItem>

        <Divider className="listDivider" />
        <Link style={{ color: "black" }} to="/registration">
          <ListItem
            onClick={onLogoutClick}
            className="sidebar_item"
            sx={{ pl: 4 }}
            button
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Log out"} />
          </ListItem>
        </Link>
      </List>
    </div>
  );
}

export default Sidebar;
