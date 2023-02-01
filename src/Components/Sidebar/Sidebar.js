import React, { Component } from "react";
import { FaHome, FaUser, FaSymfony, FaCriticalRole } from "react-icons/fa";
import {
  BsCalendar2WeekFill,
  BsCalendar2Week,
  BsNewspaper,
} from "react-icons/bs";
import { GoReport } from "react-icons/go";
import { MdOutlineLocationCity, MdContentPaste } from "react-icons/md";
import { CgScreenShot } from "react-icons/cg";
import { BiCategory, BiCalendarEvent, BiCalendar } from "react-icons/bi";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { RiGuideLine } from "react-icons/ri";
import { FaHospitalUser } from "react-icons/fa";
import NavItem from "./NavItem";
import logo from "../../Assets/logoInWhite.png";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const SIDEBAR_ITEMS = [
  {
    label: "Users",
    path: "/users",
    icon: FaUser,
    key: "users",
  },
  {
    label: "Doctors",
    path: "/doctors",
    icon: FaHospitalUser,
    key: "doctors",
  },
  {
    label: "Before Pregnancy",
    path: "/weeks",
    icon: BsCalendar2WeekFill,
    key: "before_pregnancy",
  },
  {
    label: "After Pregnancy",
    path: "/afterweek",
    icon: BsCalendar2Week,
    key: "after_pregnancy",
  },
  {
    label: "Article Categories",
    path: "/categories",
    icon: BiCategory,
    key: "articles_category",
  },
  {
    label: "Articles",
    path: "/articles",
    icon: BsNewspaper,
    key: "articles",
  },
  {
    label: "Common Symptoms",
    path: "/symptoms",
    icon: FaSymfony,
    key: "common_symptoms",
  },
  {
    label: "Cities",
    path: "/cities",
    icon: MdOutlineLocationCity,
    key: "cities",
  },
  {
    label: "Event Categories",
    path: "/eventCategories",
    icon: BiCalendar,
    key: "events_category",
  },
  {
    label: "Events",
    path: "/events",
    icon: BiCalendarEvent,
    key: "events",
  },
  {
    label: "On Board Screen",
    path: "/onboardscreendata",
    icon: CgScreenShot,
    key: "onboard_screens",
  },
  {
    label: "Guidlines",
    path: "/guidlines",
    icon: RiGuideLine,
    key: "guildines",
  },
  {
    label: "Roles",
    path: "/roles",
    icon: FaCriticalRole,
    key: "roles",
  },
];

class Sidebar extends Component {
  state = { active: false, items: SIDEBAR_ITEMS };

  async componentDidMount() {
    const expanded = localStorage.getItem("expanded");
    if (expanded) {
      expanded === "true"
        ? this.setState({ active: true })
        : this.setState({ active: false });
    }
    let role = JSON.parse(sessionStorage.getItem("godhadmin"));
    if (role && role.role) {
      const items = SIDEBAR_ITEMS.filter((it) => this.getItemStatus(it.key));
      this.setState({ items });
    }
  }

  getItemStatus = (key) => {
    const admin = JSON.parse(sessionStorage.getItem("godhadmin"));
    return admin.role[key];
  };

  logout = () => {
    const logout = window.confirm("Are you sure you want to logout?");
    if (logout) {
      sessionStorage.removeItem("godhadmin");
      this.props.navigate("/admin");
    }
  };

  handleActive = () => {
    this.setState({
      active: !this.state.active,
    });
    localStorage.setItem("expanded", !this.state.active);
  };

  render() {
    return (
      <div className={this.state.active ? "wrapper active" : "wrapper"}>
        <div className="main_body">
          <div className="sidebar_menu">
            <div className="inner__sidebar_menu">
              <ul>
                <div className="main_logo">
                  <img src={logo} alt="" />
                </div>
                <NavItem path="/dashboard" Icon={FaHome} label="Dashboard" />

                {this.state.items.map((item) => (
                  <NavItem
                    key={item.label}
                    path={item.path}
                    Icon={item.icon}
                    label={item.label}
                  />
                ))}
                <NavItem
                  path="/websitecontent"
                  Icon={MdContentPaste}
                  label="Website Content"
                />
                <NavItem
                  path="/reports"
                  Icon={GoReport}
                  label="Reports"
                />
                <NavItem
                  path="/websitesettings"
                  Icon={FiSettings}
                  label="OTP Settings"
                />

                <li className="pointer">
                  <div onClick={this.logout}>
                    <span className="icon">
                      <FiLogOut />
                    </span>
                    <span className="list">Logout</span>
                  </div>
                </li>
              </ul>

              <div className="hamburger" onClick={this.handleActive}>
                <div className="inner_hamburger">
                  <span className="arrow">
                    <i className="fas fa-long-arrow-alt-left"></i>
                    <i className="fas fa-long-arrow-alt-right"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-container">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Sidebar {...props} navigate={navigate} />;
}

export default WithNavigate;
