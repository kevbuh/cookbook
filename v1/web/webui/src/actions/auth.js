import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  RESET_REGISTER_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  REFRESH_FAIL,
  REFRESH_SUCCESS,
} from "./types";

export const load_user = () => async (dispatch) => {
  try {
    console.log("USER LOADED IN REDUX");

    const res = await fetch("/api/account/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: LOAD_USER_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAIL,
    });
  }
};

export const check_auth_status = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/verify", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
      });
      dispatch(load_user());
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const request_refresh = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/refresh", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      dispatch({
        type: REFRESH_SUCCESS,
      });
      dispatch(check_auth_status());
    } else {
      dispatch({
        type: REFRESH_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: REFRESH_FAIL,
    });
  }
};

export const register = (email, password, password2) => async (dispatch) => {
  const body = JSON.stringify({ email, password, password2 });
  dispatch({
    type: SET_AUTH_LOADING,
  });
  try {
    const res = await fetch("/api/account/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (res.status === 201) {
      dispatch({ type: REGISTER_SUCCESS });
    } else {
      dispatch({ type: REGISTER_FAIL });
    }
  } catch (err) {
    dispatch({ type: REGISTER_FAIL });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const reset_register_success = () => (dispatch) => {
  dispatch({
    type: RESET_REGISTER_SUCCESS,
  });
};

export const login = (email, password) => async (dispatch) => {
  const body = JSON.stringify({
    email,
    password,
  });

  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch("/api/account/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
      });
      dispatch(load_user());
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const logout = () => async (dispatch) => {
  try {
    const res = await fetch("api/account/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      dispatch({ type: LOGOUT_SUCCESS });
    } else {
      dispatch({ type: LOGOUT_FAIL });
    }
  } catch (err) {
    dispatch({ type: LOGOUT_FAIL });
  }
};
