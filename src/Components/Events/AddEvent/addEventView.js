import React from "react";
import Input from "../../Common/Input";
import HtmlEditor from "../../Common/HtmlEditor";
import BootstrapModal from "../../Common/Modal";
import AutoCompletePlaces from "../../Common/AutoCompletePlaces";
import TextArea from "../../Common/TextArea";
import { Modal } from "react-bootstrap";
import Select from "../../Common/Select";
import { Tab, Tabs } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaEdit } from "react-icons/fa";
import Sidebar from "../../Sidebar/Sidebar";
import Placeholder from "../../../Assets/placeholder.png";
import { localDomain } from "../../utils/utils";
import GoogleMap from "../../Common/GoogleMap";
import Spinner from "../../Common/Spinner";

const AddEventView = ({
  loading,
  data,
  description,
  errors,
  inputHandler,
  fileInputHandler,
  isEditing,
  file,
  image,
  cities,
  eventCategories,
  eventDate,
  time,
  activeKey,
  showModal,
  descriptionHandler,
  keyHandler,
  handlerDate,
  showModelHandler,
  submitForm,
  notificationHandler,
  locationHandler,
  locationHandlerSearchMap,
  modelHanlder,
  notificationSubmit,
}) => {
  console.log(data);
  return (
    <Sidebar>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="edit__profile_container_vendor">
            <div className="edit__profile_title">
              <h3 className="primary-color heading3">
                {isEditing ? "Edit Event" : "Add Event"}
              </h3>
            </div>

            <div className="card p-3">
              <div className="vendor__profile_img mb-3">
                <div className="image-upload">
                  <label htmlFor="file-input" className="label">
                    <FaEdit />
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={fileInputHandler}
                  />
                </div>
                <img
                  className="image"
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : image
                      ? localDomain + "images/" + image
                      : Placeholder
                  }
                  alt=""
                ></img>
              </div>

              <Input
                name="name"
                label="Name"
                onChange={inputHandler}
                error={errors.name}
                value={data.name}
                type="text"
                placeholder="Enter name "
              />

              <Select
                name="category"
                label="Topic"
                data={eventCategories}
                searchValue="name"
                searchKey="_id"
                onChange={inputHandler}
                error={errors.category}
                value={data.category}
              />
              <button
                className="btn primary-button-outline my-2"
                data-target="#locationmodal"
                data-toggle="modal"
              >
                Select Venue
              </button>
              {data.venue && (
                <div>
                  <span>{data.venue}</span>
                  <br />
                </div>
              )}

              <br />
              {errors.venue && (
                <div>
                  <span className="error-message">{errors.venue}</span>
                  <br />
                </div>
              )}

              <Select
                name="city"
                label="City"
                data={cities}
                searchValue="name"
                searchKey="_id"
                onChange={inputHandler}
                error={errors.city}
                value={data.city}
              />

              <HtmlEditor
                descriptionHandler={descriptionHandler}
                longDescription={description}
              />
              {errors.description && (
                <span className="error-message">{errors.description}</span>
              )}

              <label className="font-weight-bold my-2">
                Select Date & Time
              </label>
              <DatePicker
                selected={eventDate}
                className="form-control mb-2"
                showTimeSelect
                minDate={new Date()}
                onChange={(date) => handlerDate(date)}
              />
              <p className="mb-2 ml-2">{time}</p>

              {errors.date && (
                <span className="error-message">{errors.date}</span>
              )}

              <div class="form-check my-3">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="customnotification"
                  onChange={showModelHandler}
                />
                <label class="form-check-label" for="customnotification">
                  Send Custom Notification
                </label>
              </div>

              <button
                onClick={submitForm}
                data-toggle="modal"
                data-target="#notificationmodel"
                className="btn primary-button"
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
      <BootstrapModal
        id="locationmodal"
        label="Select Location"
        modalsize="modal-xl"
        showCloseBtn={true}
      >
        <div className="history-tabs">
          <Tabs
            activeKey={activeKey}
            id="uncontrolled-tab-example"
            onSelect={(k) => keyHandler(k)}
          >
            <Tab
              eventKey="SearchMap"
              title={
                <span className="d-flex justify-content-center  align-items-center">
                  Search Venue
                </span>
              }
            ></Tab>
            <Tab
              eventKey="SelectMap"
              title={
                <span className="d-flex justify-content-center  align-items-center">
                  Select Venue
                </span>
              }
            ></Tab>
          </Tabs>
        </div>

        {activeKey === "SearchMap" ? (
          <div className="mt-3">
            <AutoCompletePlaces selectedLocation={locationHandlerSearchMap} />
          </div>
        ) : null}
        {activeKey !== "SearchMap" ? (
          <div className="mt-3">
            <GoogleMap eventMapClicked={locationHandler} />
          </div>
        ) : null}
      </BootstrapModal>
      <Modal
        show={showModal}
        dialogClassName="chatmodal"
        onHide={() => modelHanlder()}
      >
        <div className="container my-5">
          <h2>Event Notification</h2>
          <Input
            label="Notification title"
            name="notificationTitle"
            onChange={notificationHandler}
          />
          <TextArea
            label="Notification Description"
            name="notificationDescription"
            onChange={notificationHandler}
          />

          <button
            onClick={notificationSubmit}
            className="btn btn-outline-secondary"
          >
            Submit
          </button>
        </div>
      </Modal>
    </Sidebar>
  );
};

export default AddEventView;
