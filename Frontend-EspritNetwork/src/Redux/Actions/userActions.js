import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../Constants/UserContants";
import axios from "axios";



export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `https://esprit-network.onrender.com/api/users/login`,
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    console.log(err)
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
      err.response.data.error
    });
  }
};


// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("user");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
};

// REGISTER COMPANY 
export const register = (name, email,adresseC, password,confirmPassword , pic) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://localhost:3000/api/users/`,
      { name, email,adresseC, password,confirmPassword , pic},
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
      err.response.data.error

    });
  }
};

// REGISTER Student
export const registerStudent = (name, email,adresseC, password,confirmPassword , pic) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `https://esprit-network.onrender.com/api/users/register-student`,
      { name, email,adresseC, password,confirmPassword  , pic},
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
      err.response.data.error

    });
  }
};



// REGISTER ALUMNI
export const registeralumni = (name, email, password,confirmPassword , pic) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://localhost:3000/api/users/register-alumni`,
      { name, email, password,confirmPassword , pic },
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
      err.response.data.error

    });
  }
};


/// registerteacher

export const registerteacher = (name, email, password,confirmPassword , pic) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://localhost:3000/api/users/register-teacher`,
      { name, email, password,confirmPassword , pic },
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
      err.response.data.error

    });
  }
};


/// registerEsprit

export const registeresprit = (name, email, password,confirmPassword , pic) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://localhost:3000/api/users/register-esprit`,
      { name, email, password,confirmPassword , pic },
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
      err.response.data.error

    });
  }
};



// USER DETAILS
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`http://localhost:3000/api/users/${id}`, config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// UPDATE PROFILE
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`http://localhost:3000/api/users/profile`, user, config);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};
