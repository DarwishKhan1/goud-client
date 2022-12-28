import React, { Component } from "react";
import { FaHome, FaUser, FaSymfony } from "react-icons/fa";
import {
  BsCalendar2WeekFill,
  BsCalendar2Week,
  BsNewspaper,
} from "react-icons/bs";
import { MdOutlineLocationCity, MdContentPaste } from "react-icons/md";
import { CgScreenShot } from "react-icons/cg";
import { BiCategory, BiCalendarEvent } from "react-icons/bi";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { RiGuideLine } from "react-icons/ri";
import { FaHospitalUser } from "react-icons/fa";
import NavItem from "./NavItem";
import logo from "../../Assets/logoInWhite.png";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

class Sidebar extends Component {
  state = { active: false };

  async componentDidMount() {
    const expanded = localStorage.getItem("expanded");
    if (expanded) {
      expanded === "true"
        ? this.setState({ active: true })
        : this.setState({ active: false });
    }
  }

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

                <NavItem path="/users" Icon={FaUser} label="Users" />

                <NavItem
                  path="/doctors"
                  Icon={FaHospitalUser}
                  label="Doctors"
                />
                <NavItem
                  path="/weeks"
                  Icon={BsCalendar2WeekFill}
                  label="Before Pregnancy"
                />
                <NavItem
                  path="/afterweek"
                  Icon={BsCalendar2Week}
                  label="After Pregnancy"
                />
                <NavItem
                  path="/categories"
                  Icon={BiCategory}
                  label="Article Category"
                />
                <NavItem path="/articles" Icon={BsNewspaper} label="Articles" />

                <NavItem
                  path="/cities"
                  Icon={MdOutlineLocationCity}
                  label="Cities"
                />

                <NavItem
                  path="/symptoms"
                  Icon={FaSymfony}
                  label="Common Symptoms"
                />
                <NavItem
                  path="/eventCategories"
                  Icon={BiCategory}
                  label="Event Category"
                />
                <NavItem path="/events" Icon={BiCalendarEvent} label="Events" />

                <NavItem
                  path="/guidlines"
                  Icon={RiGuideLine}
                  label="Guidelines"
                />

                <NavItem
                  path="/onboardscreendata"
                  Icon={CgScreenShot}
                  label="On Board Screens"
                />

                <NavItem
                  path="/websitecontent"
                  Icon={MdContentPaste}
                  label="Website content"
                />
                <NavItem
                  path="/websitesettings"
                  Icon={FiSettings}
                  label="Website Settings"
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
