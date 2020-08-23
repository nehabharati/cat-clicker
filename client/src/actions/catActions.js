import {
  GET_CAT,
  GET_ALL_CATS,
  UPDATE_CAT,
  CREATE_CAT,
  GET_CAT_ID,
} from "./types";

export const getAllCats = () => (dispatch) => {
  fetch("http://localhost:5000/cats/")
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_ALL_CATS,
        payload: data,
      });
    });
};

export const getSpecificCat = (id) => (dispatch) => {
  fetch(`http://localhost:5000/cats/${id}`)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_CAT,
        payload: data,
      });
    });
};

export const createNewCat = (data) => (dispatch) => {
  fetch("http://localhost:5000/cats/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      nickName: data.nickName,
      clicks: data.clicks,
      image: data.image,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: CREATE_CAT,
        payload: data,
      });
    });
};

export const updateCat = (id, data) => (dispatch) => {
  fetch(`http://localhost:5000/cats/update/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      nickName: data.nickName,
      clicks: data.clicks,
      image: data.image,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: UPDATE_CAT,
        payload: data,
      });
    });
};

export const getCatId = (id) => (dispatch) => {
  fetch(`http://localhost:5000/cats/${id}`)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_CAT_ID,
        payload: data._id,
      });
    });
};
