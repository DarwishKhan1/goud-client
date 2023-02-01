import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import ArticleReport from "./ArticleReport";
import CommentReport from "./CommentReport";
import SocialReport from "./ScoialReport";
const Index = () => {
  const [activeKey, setActiveKey] = useState("Articles");
  return (
    <Sidebar>
      <h2>Reports</h2>
      <div
        className="login-tabs report-tabs"
        style={{ justifyContent: "flex-start", marginBottom: "1rem" }}
      >
        <Tabs
          onSelect={(k) => setActiveKey(k)}
          activeKey={activeKey}
          id="uncontrolled-tab-example"
        >
          <Tab
            eventKey="Articles"
            title={
              <span className="d-flex justify-content-center  align-items-center">
                Articles
              </span>
            }
          >
            <ArticleReport />
          </Tab>
          <Tab
            eventKey="Comments"
            title={
              <span className="d-flex justify-content-center  align-items-center">
                Comments
              </span>
            }
          >
            <CommentReport />
          </Tab>
          <Tab
            eventKey="SocialForms"
            title={
              <span className="d-flex justify-content-center  align-items-center">
                SocialForms
              </span>
            }
          >
            <SocialReport />
          </Tab>
        </Tabs>
      </div>
    </Sidebar>
  );
};

export default Index;
