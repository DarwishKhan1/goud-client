import axios from "axios";
import React, { Component } from "react";
import { createSetting, updateSetting } from "../../APIS/apis";
import Sidebar from "../Sidebar/Sidebar";
import { localDomain } from "../utils/utils";
import HtmlEditor from "../Common/HtmlEditor";
import Spinner from "../Common/Spinner";

class Content extends Component {
  state = {
    id: "",
    termsAndConditions: "",
    privacyPolicy: "",
    aboutUs: "",
    citation: "",
    isEditing: false,
    loading: true,
  };

  async componentDidMount() {
    const getSettings = async () => {
      var config = {
        method: "get",
        url: localDomain + "setting",
        headers: {
          "X-auth-header": sessionStorage.getItem("godhadmin"),
        },
      };

      const data = axios(config)
        .then(function (response) {
          const data = response.data.data;
          return data;
        })
        .catch(function (error) {
          console.log(error);
        });

      return data;
    };

    const settingData = await getSettings();
    if (settingData) {
      this.setState({
        privacyPolicy: settingData.privacyPolicy,
        termsAndConditions: settingData.termsAndConditions,
        aboutUs: settingData.aboutUs,
        citation: settingData.citation,
        isEditing: true,
        id: settingData._id,
      });
    }

    this.setState({ loading: false });
  }

  descriptionHandler = (key, value) => {
    this.setState({ [key]: value });
  };

  submitForm = async () => {
    const {
      id,
      termsAndConditions,
      aboutUs,
      privacyPolicy,
      isEditing,
      citation,
    } = this.state;

    if (
      termsAndConditions === "" ||
      aboutUs === "" ||
      citation === "" ||
      privacyPolicy === ""
    ) {
      return alert("Please filled all the fields");
    }

    const data = {
      termsAndConditions,
      aboutUs,
      privacyPolicy,
      citation,
    };

    try {
      this.setState({ loading: true });

      if (isEditing) {
        await updateSetting(data, id);
      } else {
        await createSetting(data);
      }
      this.setState({ loading: false });
      alert(isEditing ? "Updated" : "created");
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  render() {
    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <h2>Settings</h2>

            <h3>Terms & Conditions</h3>
            <HtmlEditor
              descriptionHandler={(value) =>
                this.descriptionHandler("termsAndConditions", value)
              }
              longDescription={this.state.termsAndConditions}
            />

            <br />
            <br />

            <h3>Privacy Policy</h3>
            <HtmlEditor
              descriptionHandler={(value) =>
                this.descriptionHandler("privacyPolicy", value)
              }
              longDescription={this.state.privacyPolicy}
            />

            <br />
            <br />

            <h3>About Us</h3>
            <HtmlEditor
              descriptionHandler={(value) =>
                this.descriptionHandler("aboutUs", value)
              }
              longDescription={this.state.aboutUs}
            />
            <br />
            <br />

            <h3>Citation</h3>
            <HtmlEditor
              descriptionHandler={(value) =>
                this.descriptionHandler("citation", value)
              }
              longDescription={this.state.citation}
            />

            <button
              onClick={this.submitForm}
              className="btn primary-button px-3 mt-3"
            >
              Submit
            </button>
          </div>
        )}
      </Sidebar>
    );
  }
}

export default Content;
