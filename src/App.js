import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import PrivateRoute from "./Components/Common/PrivateRoute";
import Weeks from "./Components/Week/weeks";
import AddWeek from "./Components/Week/addWeek";
import Categories from "./Components/Category/Categories";
import AddCategory from "./Components/Category/addCategory";
import Users from "./Components/User/users";
import Doctors from "./Components/Doctors/doctors";
import AddDoctor from "./Components/Doctors/addDoctor";
import Symptoms from "./Components/Common Symptoms/commonsymptoms";
import AddSymptom from "./Components/Common Symptoms/addSymptom";
import AddArticle from "./Components/Articles/addArticle";
import Articles from "./Components/Articles/articles";
import Events from "./Components/Events/events";
import AddEvent from "./Components/Events/AddEvent/addEvent";
import UsersTable from "./Components/Events/usersTable";
import Guidlines from "./Components/Guidlines/guidlines";
import AddGuidline from "./Components/Guidlines/addGuidline";
import WebsiteContent from "./Components/WebsiteContent/content";
import AfterWeek from "./Components/AfterWeekData/afterweek";
import AddAfterWeekData from "./Components/AfterWeekData/addWeek";
import OnBoardScreens from "./Components/OnBoardScreens/screens";
import AddScreenData from "./Components/OnBoardScreens/addScreen";
import ClientComponent from "./Components/Client/Client";
import UsersPrint from "./Components/User/Report";
import EventCategories from "./Components/EventCategory/Categories";
import AddEventCategory from "./Components/EventCategory/addCategory";
import AddCity from "./Components/City/addCity";
import Cities from "./Components/City/Cities";
import AddUser from "./Components/User/addUser";
import OtpSettings from "./Components/OtpSettings/index";
import Roles from "./Components/Roles/roles";
import AddRole from "./Components/Roles/addRole";
import AddManagementUser from "./Components/Roles/addUser";

import "./App.css";
import ForgotPasswordReset from "./Components/Login/ForgotPasswordReset";

const App = () => {
  const [path, setPath] = useState("/");

  useEffect(() => {
    const pathName = window.location.pathname;
    setPath(pathName);
  }, []);

  return path.includes("/admin") ? (
    <Router>
      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route path="/resetpassword" element={<ForgotPasswordReset />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/weeks" element={<Weeks />} />
          <Route path="/weeks/add" element={<AddWeek />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/add" element={<AddCategory />} />
          <Route path="/eventCategories" element={<EventCategories />} />
          <Route path="/eventCategories/add" element={<AddEventCategory />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/cities/add" element={<AddCity />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/print" element={<UsersPrint />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/add" element={<AddDoctor />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/symptoms/add" element={<AddSymptom />} />
          <Route path="/articles/add" element={<AddArticle />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/add" element={<AddEvent />} />
          <Route path="/events/users" element={<UsersTable />} />
          <Route path="/guidlines" element={<Guidlines />} />
          <Route path="/guidlines/add" element={<AddGuidline />} />
          <Route path="/websitecontent" element={<WebsiteContent />} />
          <Route path="/afterweek" element={<AfterWeek />} />
          <Route path="/afterweek/add" element={<AddAfterWeekData />} />
          <Route path="/onboardscreendata" element={<OnBoardScreens />} />
          <Route path="/onboardscreendata/add" element={<AddScreenData />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/websitesettings" element={<OtpSettings />} />
          <Route path="/roles/add" element={<AddRole />} />
          <Route path="/roles/managmentuser/add" element={<AddManagementUser />} />
          <Route path="/roles" element={<Roles />} />
        </Route>
      </Routes>
    </Router>
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<ClientComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
