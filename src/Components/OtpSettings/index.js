import React, { useEffect, useState } from "react";
import {
  createWebsiteSettings,
  getWebsiteSettings,
  updateWebsiteSettings,
} from "../../APIS/apis";
import Input from "../Common/Input";
import Spinner from "../Common/Spinner";
import Sidebar from "../Sidebar/Sidebar";
import "./style.css";
import CryptoJs from "crypto-js";

const WebsiteSetting = () => {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [data, setData] = useState({
    business_sms_key: "",
    twillio_account_sid: "",
    twillio_auth_token: "",
    twillio_service_api_key: "",
    twillio: false,
    businessSMS: false,
    otp: false,
  });

  useEffect(() => {
    getWebsiteSettings()
      .then((res) => {
        const decrypted = CryptoJs.AES.decrypt(
          res,
          process.env.REACT_APP_SECRET
        );
        const decryptedData = JSON.parse(decrypted.toString(CryptoJs.enc.Utf8));
        if (res) {
          const d = { ...data };
          d.businessSMS = decryptedData.businessSMS;
          d.otp = decryptedData.otp;
          d.twillio = decryptedData.twillio;
          d.twillio_account_sid = decryptedData.twillio_account_sid;
          d.twillio_auth_token = decryptedData.twillio_auth_token;
          d.twillio_service_api_key = decryptedData.twillio_service_api_key;
          d.business_sms_key = decryptedData.business_sms_key;
          setData(d);
          setId(decryptedData._id);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const changeHandler = (e) => {
    setData((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const checkValidation = () => {
    return (
      (data.business_sms_key.length ||
        data.twillio_account_sid.length ||
        data.twillio_auth_token.length ||
        data.twillio_service_api_key.length) <= 0
    );
  };

  const radioHandler = (e) => {
    console.log(e.target.name);
    console.log(e.target.checked);
    setData((p) => ({
      ...p,
      [e.target.name]: e.target.checked,
    }));
  };

  const submitHandler = async () => {
    try {
      if (id) {
        const eData = CryptoJs.AES.encrypt(
          JSON.stringify(data),
          process.env.REACT_APP_SECRET
        ).toString();
        await updateWebsiteSettings(eData, id);
        alert("Updated!");
      } else {
        const eData = CryptoJs.AES.encrypt(
          JSON.stringify(data),
          process.env.REACT_APP_SECRET
        ).toString();
        await createWebsiteSettings(eData);
        alert("Created!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Sidebar>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h3>Website Settings</h3>
          <div className="my-5">
            <Input
              name="business_sms_key"
              placeholder="Enter ufone or any business key"
              label="Business Key"
              onChange={changeHandler}
              value={data.business_sms_key}
            />
            <Input
              name="twillio_account_sid"
              label="Twillio SID"
              placeholder="Enter Twillio SID"
              onChange={changeHandler}
              value={data.twillio_account_sid}
            />
            <Input
              name="twillio_auth_token"
              label="Twillio Token "
              onChange={changeHandler}
              placeholder="Enter Twillio Token"
              value={data.twillio_auth_token}
            />
            <Input
              name="twillio_service_api_key"
              onChange={changeHandler}
              label="Twillio Service API Key"
              placeholder="Enter Twillio Service API Key"
              value={data.twillio_service_api_key}
            />

            <h5>OTP Settings</h5>
            <div className="otpsetting-wrapper my-5">
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="otp"
                  checked={data.otp}
                  name="otp"
                  onChange={radioHandler}
                />
                <label className="custom-control-label" htmlFor="otp">
                  Enable OTP
                </label>
              </div>

              {data.otp && (
                <div className="otpsetting-inner-wrapper">
                  <div className="custom-control custom-switch mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="twillio"
                      checked={data.twillio}
                      name="twillio"
                      onChange={radioHandler}
                    />
                    <label className="custom-control-label" htmlFor="twillio">
                      International:
                    </label>
                  </div>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="businessSMS"
                      checked={data.businessSMS}
                      name="businessSMS"
                      onChange={radioHandler}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="businessSMS"
                    >
                      Local
                    </label>
                  </div>
                </div>
              )}
            </div>
            <button
              className="btn btn-primary"
              onClick={submitHandler}
              disabled={checkValidation()}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </Sidebar>
  );
};

export default WebsiteSetting;
