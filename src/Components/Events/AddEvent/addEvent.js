import React, { useEffect, useState } from "react";
import axios from "axios";
import Joi from "joi";
import {
  createEvent,
  getCities,
  getEventCategories,
  sendEventNotification,
  updateEvent,
} from "../../../APIS/apis";
import { useLocation, useNavigate } from "react-router";
import AddEventView from "./addEventView";
import { validateProperty } from "../../Hooks/validate";

function AddEvent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [desscription, setDescription] = useState("");
  const [state, setState] = useState({
    file: null,
    isEditing: false,
    image: null,
    showModal: false,
    id: null,
    data: {
      name: "",
      venue: "",
      date: "",
      city: "",
      category: "",
      lat: 0,
      lang: 0,
    },
    cities: [],
    eventCategories: [],
    time: "",
    notificationTitle: "Event",
    activeKey: "SearchMap",
    notificationDescription: "",
    customNotifcation: false,
    eventDate: new Date(),
    errors: {},
  });

  const objectSchema = {
    name: Joi.string().empty().required(),
    date: Joi.string().empty().required(),
    venue: Joi.string().empty().required(),
    city: Joi.string().empty().required(),
    category: Joi.string().empty().required(),
    lat: Joi.number(),
    lang: Joi.number(),
  };

  useEffect(() => {
    const { event } = location.state;
    getData()
      .then((res) => {
        setLoading(false);
        if (event) {
          const data = { ...state.data };
          data.name = event.name;
          data.venue = event.venue;
          data.date = event.date;
          data.city = event.city._id;
          data.category = event.category._id;
          data.lat = event.lat;
          data.lang = event.lang;
          const eventDate = new Date(event.date);

          setState({
            ...state,
            cities: res.cities,
            eventCategories: res.categories,
            data,
            id: event._id,
            image: event.image,
            time: event.time,
            isEditing: true,
            eventDate,
          });
          setDescription(event.description);
        } else {
          setState({
            ...state,
            cities: res.cities,
            eventCategories: res.categories,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  }, []);

  const getData = async () => {
    const cities = await getCities();
    const categories = await getEventCategories();

    return { cities, categories };
  };

  const inputHandler = (e) => {
    const errors = { ...state.errors };
    const errorMessage = validateProperty(
      e.target.name,
      e.target.value,
      objectSchema
    );
    if (errorMessage) {
      errors[e.target.name] = errorMessage;
    } else {
      delete errors[e.target.name];
    }
    let data = { ...state.data };
    data[e.target.name] = e.target.value;
    setState({
      ...state,
      data,
      errors,
    });
  };
  const fileInputHandler = (e) => {
    setState({ ...state, file: e.target.files[0] });
  };

  const handlerDate = (date) => {
    const sDate = new Date(date);
    const data = { ...state.data };
    const errors = { ...state.errors };
    delete errors["date"];
    data.date = sDate.toLocaleString();
    const time = sDate.toLocaleTimeString();
    setState({ ...state, eventDate: date, time, data });
  };

  const descriptionHandler = (value) => {
    setDescription(value);
  };

  const locationHandler = async (address) => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${address.lat},${address.lng}&sensor=true&key=AIzaSyAuJYLmzmglhCpBYTn0BjbJhjWYg0fPEEA`
      );
      const address1 = res.data.results[0].formatted_address;
      const cData = { ...state.data };
      const allerrors = { ...state.errors };
      cData.venue = address1;
      cData.lat = address.lat;
      cData.lang = address.lng;
      delete allerrors["venue"];
      setState({ ...state, data: cData, errors: allerrors });
    } catch (error) {
      alert(error.message);
    }
  };

  const locationHandlerSearchMap = async (address) => {
    const cData = { ...state.data };
    const allerrors = { ...state.errors };
    cData.venue = address.address;
    cData.lat = address.lat;
    cData.lang = address.lng;
    delete allerrors["venue"];
    setState({ ...state, data: cData, errors: allerrors });
  };

  const notificationHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const notificationSubmit = () => {
    setState({ ...state, showModal: !state.showModal });
  };

  const showModelHandler = (e) => {
    setState({ ...state, showModal: e.target.checked });
  };

  const keyHandler = (e) => {
    setState({ ...state, activeKey: e });
  };

  const modelHandler = () => {
    setState({ ...state, showModal: !state.showModal });
  };

  const validate = () => {
    const result = Joi.object(objectSchema).validate(state.data, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const errors = validate();
    setState({ ...state, errors: errors || {} });

    if (errors) return;
    if (desscription.trim() === "") {
      alert("Description is required ");
    }

    const { name, city, venue, date, lat, lang, category } = state.data;
    let { time, notificationDescription, notificationTitle } = state;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", desscription);
      formData.append("venue", venue);
      formData.append("date", date);
      formData.append("city", city);
      formData.append("category", category);
      formData.append("time", time);
      formData.append("lat", lat);
      formData.append("lang", lang);
      formData.append("file", state.file);

      if (state.isEditing) {
        if (notificationDescription.trim() === "") {
          notificationDescription = name + "Event is updated";
        }
        formData.append("image", state.image);
        await updateEvent(formData, state.id);
        await sendEventNotification(notificationTitle, notificationDescription);
      } else {
        await createEvent(formData);
        if (notificationDescription.trim() === "") {
          notificationDescription = name + "Event is created";
        }
        await sendEventNotification(notificationTitle, notificationDescription);
      }
      alert(
        state.isEditing ? "Updated successfully!!" : "Created successfully!!"
      );

      navigate("/events");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <AddEventView
      loading={loading}
      data={state.data}
      description={desscription}
      errors={state.errors}
      inputHandler={inputHandler}
      fileInputHandler={fileInputHandler}
      isEditing={state.isEditing}
      file={state.file}
      image={state.image}
      cities={state.cities}
      eventCategories={state.eventCategories}
      eventDate={state.eventDate}
      time={state.time}
      activeKey={state.activeKey}
      showModal={state.showModal}
      descriptionHandler={descriptionHandler}
      keyHandler={keyHandler}
      handlerDate={handlerDate}
      showModelHandler={showModelHandler}
      submitForm={submitForm}
      notificationHandler={notificationHandler}
      locationHandler={locationHandler}
      locationHandlerSearchMap={locationHandlerSearchMap}
      modelHanlder={modelHandler}
      notificationSubmit={notificationSubmit}
    />
  );
}

export default AddEvent;
