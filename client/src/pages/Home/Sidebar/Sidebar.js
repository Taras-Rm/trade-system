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
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, NavLink } from "react-router-dom";
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import logo from "../../../static/images/logo2.png";

function Sidebar({ fullName, avatarLetter, loading, amountOfMoney, logout }) {
  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="sidebar">
      <div className="sidebar_logo">
        <img alt="logo" style={{ width: 40, cursor: "pointer" }} src={logo} />
      </div>
      <div className="avatarBox">
        <Avatar sx={{ bgcolor: "orange" }} alt="avatar">
          {avatarLetter}
        </Avatar>
        <span className="avatarBox_name">{fullName}</span>
      </div>
      <List className="sidebar_list">
        <NavLink
          style={{ color: "black", textDecoration: "none" }}
          to="/home/goods"
        >
          <ListItem className={`sidebar_item`} sx={{ pl: 4 }} button>
            <ListItemIcon>
              <AllInboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Goods"} />
          </ListItem>
        </NavLink>
        <NavLink
          style={{ color: "black", textDecoration: "none" }}
          to="/home/addGoods"
        >
          <ListItem className="sidebar_item" sx={{ pl: 4 }} button>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary={"Add goods"} />
          </ListItem>
        </NavLink>
        <Divider className="listDivider" />
        <NavLink
          style={{ color: "black", textDecoration: "none" }}
          to="/home/sellGoods"
        >
          <ListItem className={`sidebar_item`} sx={{ pl: 4 }} button>
            <ListItemIcon>
              <AllInboxIcon />
            </ListItemIcon>
            <ListItemText primary={"My goods for sale"} />
          </ListItem>
        </NavLink>
        <NavLink
          style={{ color: "black", textDecoration: "none" }}
          to="/home/purchaseGoods"
        >
          <ListItem className={`sidebar_item`} sx={{ pl: 4 }} button>
            <ListItemIcon>
              <AllInboxIcon />
            </ListItemIcon>
            <ListItemText primary={"My bought goods"} />
          </ListItem>
        </NavLink>
        <NavLink
          style={{ color: "black", textDecoration: "none" }}
          to="/home/charts"
        >
          <ListItem className={`sidebar_item`} sx={{ pl: 4 }} button>
            <ListItemIcon>
              <StackedLineChartIcon />
            </ListItemIcon>
            <ListItemText primary={"Charts"} />
          </ListItem>
        </NavLink>
        <Divider className="listDivider" />
        <NavLink
          style={{ color: "black", textDecoration: "none" }}
          to="/home/profile"
        >
          <ListItem className={`sidebar_item`} sx={{ pl: 4 }} button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>
        </NavLink>

        <Divider className="listDivider" />
        <Link
          style={{ color: "black", textDecoration: "none" }}
          to="/login"
          onClick={logout}
        >
          <ListItem className="sidebar_item" sx={{ pl: 4 }} button>
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
