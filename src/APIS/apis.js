import axios from "axios";
import { productionDomain as apiUrl } from "../Components/utils/utils";

export const loginAdmin = async (email, pass) => {
  let data = JSON.stringify({ email, password: pass });
  let config = {
    method: "post",
    url: apiUrl + "admin/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  const response = await axios(config);
  if (
    typeof response.data.status !== "undefined" &&
    response.data.status === "failed"
  ) {
    alert("Invalid Credentials.");
    return false;
  }
  sessionStorage.setItem(
    "godhadmin",
    JSON.stringify({
      token: response.data.token,
      superAdmin: true,
    })
  );
  return true;
};

export const loginUser = async (email, pass) => {
  let data = JSON.stringify({ email, password: pass });
  let config = {
    method: "post",
    url: apiUrl + "user/loginwithemail",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  const response = await axios(config);
  if (
    typeof response.data.status !== "undefined" &&
    response.data.status === "failed"
  ) {
    alert("Invalid Credentials.");
    return false;
  }
  if (!response.data.user.role) {
    alert("You don't have access to this site.");
    return false;
  }
  sessionStorage.setItem(
    "godhadmin",
    JSON.stringify({
      token: response.data.token,
      superAdmin: false,
      role: response.data.user.role,
    })
  );
  return true;
};
export const resetpassword = async (email, oldpassword, password) => {
  let data = JSON.stringify({ email, password, oldpassword });
  let config = {
    method: "post",
    url: apiUrl + "admin/changepassword",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return await axios(config);
};

export const getWeeks = async () => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + "week",
    headers: {
      "x-auth-header": token,
    },
  };

  const response = await axios(config);
  return response.data.data;
};

export const createWeek = async (data) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "week/add",
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const updateWeek = async (data, id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + `week/update/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};
export const getSymptoms = async () => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + "commonsymptom",
    headers: {
      "x-auth-header": token,
    },
  };

  const response = await axios(config);
  return response.data.data;
};

export const createSymptom = async (data) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "commonsymptom/add",
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const updateSymptom = async (data, id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + `commonsymptom/update/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const deleteSymptomFromDb = async (id, image) => {
  const data = {
    image,
  };
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "delete",
    url: apiUrl + `commonsymptom/delete/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data,
  };
  await axios(config);
};

export const getArticles = async () => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + "article",
    headers: {
      "x-auth-header": token,
    },
  };

  const response = await axios(config);
  return response.data.data;
};

export const createArticle = async (data) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "article/add",
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const updateArticle = async (data, id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + `article/update/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const deleteArticleFromDb = async (id, image) => {
  const data = {
    image,
  };
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "delete",
    url: apiUrl + `article/delete/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data,
  };
  await axios(config);
};

export const getCategories = async () => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + "category",
    headers: {
      "x-auth-header": token,
    },
  };
  const response = await axios(config);
  return response.data.data;
};

export const creatCategory = async (data) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "category/add",
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };
  await axios(config);
};

export const assignUserRoleHandler = async (uId, roleId) => {
  const data = {
    role: roleId,
  };
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "user/role/" + uId,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };
  await axios(config);
};

export const updateCategory = async (data, id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + `category/update/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };
  await axios(config);
};

export const deleteCategoryInDb = async (id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "delete",
    url: apiUrl + `category/delete/${id}`,
    headers: {
      "x-auth-header": token,
    },
  };
  return await axios(config);
};

export const getUsers = async () => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + `user`,
    headers: {
      "x-auth-header": token,
    },
  };
  const response = await axios(config);
  return response.data.data;
};
export const getLimitedUsers = async (number, limit) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + `user/pagination/api?page=${number}&limit=${limit}`,
    headers: {
      "x-auth-header": token,
    },
  };
  return await axios(config);
};

export const getSearchingUsers = async (term, number, limit) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + `user/search/${term}?page=${number}&limit=${limit}`,
    headers: {
      "x-auth-header": token,
    },
  };
  return await axios(config);
};

export const deleteUser = async (id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "delete",
    url: apiUrl + `user/delete/${id}`,
    headers: {
      "x-auth-header": token,
    },
  };
  return await axios(config);
};

export const getDoctors = async () => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + `doctor`,
    headers: {
      "x-auth-header": token,
    },
  };
  const response = await axios(config);

  return response.data.data;
};

export const deleteWeekFromDb = async (id, imageUrl) => {
  const data = {
    imageUrl,
  };
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "delete",
    url: apiUrl + `week/delete/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data,
  };
  await axios(config);
};

export const getEvents = async () => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + "event",
    headers: {
      "x-auth-header": token,
    },
  };
  const response = await axios(config);
  return response.data.data;
};

export const createEvent = async (data) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "event/add",
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const updateEvent = async (data, id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + `event/update/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const deleteEventFromDb = async (id, image) => {
  const data = {
    image,
  };
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "delete",
    url: apiUrl + `event/delete/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data,
  };
  await axios(config);
};

export const getGuidlines = async () => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + "guidline",
    headers: {
      "x-auth-header": token,
    },
  };

  const response = await axios(config);
  return response.data.data;
};

export const createGuidline = async (data) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "guidline/add",
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const updateGuidline = async (data, id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + `guidline/update/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const deleteGuidlineFromDb = async (id, image) => {
  const data = {
    image,
  };
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "delete",
    url: apiUrl + `guidline/delete/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data,
  };
  await axios(config);
};

export const sendNotification = async (title, body) => {
  var data = JSON.stringify({
    android_channel_id: "53d49dc7-019c-4a0b-ab3a-c8d8823251e2",
    app_id: "3c47a2f0-6242-4593-8eae-759d507a5081",
    contents: {
      en: body,
    },
    headings: {
      en: title,
    },
    data: {
      custome_data: "some Value from godh",
    },
    filters: [
      {
        field: "tag",
        key: "ALL",
        relation: "=",
        value: "SUBSCRIBED",
      },
    ],
  });

  var config = {
    method: "post",
    url: "https://onesignal.com/api/v1/notifications",
    headers: {
      Authorization: "Basic YWFlZWM0NDAtOWMwZC00MmFjLWJlM2MtMzFkMWUwYjgwM2Rh",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const sendEventNotification = async (title, body) => {
  var data = JSON.stringify({
    android_channel_id: "53d49dc7-019c-4a0b-ab3a-c8d8823251e2",
    app_id: "3c47a2f0-6242-4593-8eae-759d507a5081",
    contents: {
      en: body,
    },
    headings: {
      en: title,
    },
    data: {
      custome_data: "some Value from godh",
    },
    filters: [
      {
        field: "tag",
        key: "EVENTS",
        relation: "=",
        value: "SUBSCRIBED",
      },
    ],
  });
  // var data = JSON.stringify({
  //   included_segments: ["Subscribed Users"],
  //   android_channel_id: "63e255e0-8109-4580-87ee-dd1f0913003d",
  //   app_id: "3c47a2f0-6242-4593-8eae-759d507a5081",
  //   contents: {
  //     en: body,
  //   },
  //   headings: { en: title },
  //   data: { custome_data: "some Value from godh" },
  // });

  var config = {
    method: "post",
    url: "https://onesignal.com/api/v1/notifications",
    headers: {
      Authorization: "Basic YWFlZWM0NDAtOWMwZC00MmFjLWJlM2MtMzFkMWUwYjgwM2Rh",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const createSetting = async (data) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "setting/add",
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const updateSetting = async (data, id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + `setting/update/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const sendUserStatusNotification = async (user, token) => {
  const notibody = user.status
    ? "Your Account has be approved by admin."
    : "Your account has been deactivated by admin.";
  const notititle = user.status ? "Notification!" : "Notification";

  const data = {
    data: {
      title: notititle,
      body: notibody,
      icon: "http://url-to-an-icon/icon.png",
      sound: "default",
    },
    android: {
      priority: "high",
    },
    content_available: true,
    "apn-priority": 5,
    apns: {
      payload: {
        aps: {
          sound: "default",
        },
      },
    },
    to: token,
  };

  var config = {
    method: "post",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "key=AAAAJS9qb60:APA91bEGspZYPssvFol3up3CYSQcQ1QH7xW79DdZEjBz2ppKeM411zxssNT78FQx43GLwTMarue1E8YeSanU_zR6z-eCAJihygmh4k6K6ote43LJGg3Rl9haGYH7wA6NRYJm33xQG3PU",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log("Notification Sent: ", JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getAfterPregnanciesWeekData = async () => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + "afterpregnancy",
    headers: {
      "x-auth-header": token,
    },
  };

  const response = await axios(config);
  return response.data.data;
};

export const createAfterWeekData = async (data) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "afterpregnancy/add",
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const updateAfterWeekData = async (data, id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + `afterpregnancy/update/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const deleteAfterWeekData = async (id, image) => {
  const data = {
    image,
  };
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "delete",
    url: apiUrl + `afterpregnancy/delete/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data,
  };
  await axios(config);
};

export const getScreens = async () => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + "onboarding",
    headers: {
      "x-auth-header": token,
    },
  };
  const response = await axios(config);
  return response.data.data;
};

export const addScreen = async (data) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "onboarding/add",
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };
  await axios(config);
};

export const updateScreen = async (data, id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + `onboarding/update/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const deleteScreenFromDb = async (id, image) => {
  const data = {
    image,
  };
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "delete",
    url: apiUrl + `onboarding/delete/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data,
  };
  await axios(config);
};

export const createDoctor = async (data) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "doctor/add",
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const createUser = async (data) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "user/register",
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const updateUser = async (data, id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + `user/update/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};

export const updateDoctor = async (data, id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + `doctor/update/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };

  await axios(config);
};
export const deleteDoctor = async (id, image) => {
  const data = {
    image,
  };
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "delete",
    url: apiUrl + `doctor/delete/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data,
  };
  await axios(config);
};

export const getEventCategories = async () => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + "eventCategory",
    headers: {
      "x-auth-header": token,
    },
  };
  const response = await axios(config);
  return response.data.data;
};

export const creatEventCategory = async (data) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "eventCategory/add",
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };
  await axios(config);
};

export const updateEventCategory = async (data, id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + `eventCategory/update/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };
  await axios(config);
};

export const deleteEventCategoryInDb = async (id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "delete",
    url: apiUrl + `eventCategory/delete/${id}`,
    headers: {
      "x-auth-header": token,
    },
  };

  return await axios(config);
};

export const getCities = async () => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + "city",
    headers: {
      "x-auth-header": token,
    },
  };
  const response = await axios(config);
  return response.data.data;
};

export const creatCity = async (data) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "city/add",
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };
  await axios(config);
};

export const updateCity = async (data, id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + `city/update/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };
  await axios(config);
};

export const deleteCityInDb = async (id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "delete",
    url: apiUrl + `city/delete/${id}`,
    headers: {
      "x-auth-header": token,
    },
  };
  return await axios(config);
};

export const getWebsiteSettings = async () => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + "otpSetting",
    headers: {
      "x-auth-header": token,
    },
  };
  const response = await axios(config);
  return response.data.data;
};

export const createWebsiteSettings = async (data) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "otpSetting/add",
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };
  await axios(config);
};
export const updateWebsiteSettings = async (data, id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "otpSetting/update/" + id,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };
  await axios(config);
};

export const getRoles = async () => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "get",
    url: apiUrl + "role",
    headers: {
      "x-auth-header": token,
    },
  };
  const response = await axios(config);
  return response.data.data;
};

export const creatRole = async (data) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + "role/add",
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };
  await axios(config);
};

export const updateRole = async (data, id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "post",
    url: apiUrl + `role/update/${id}`,
    headers: {
      "x-auth-header": token,
    },
    data: data,
  };
  await axios(config);
};

export const deleteRoleInDb = async (id) => {
  let token = JSON.parse(sessionStorage.getItem("godhadmin"));
  token = token && token.token;
  let config = {
    method: "delete",
    url: apiUrl + `role/delete/${id}`,
    headers: {
      "x-auth-header": token,
    },
  };
  return await axios(config);
};
