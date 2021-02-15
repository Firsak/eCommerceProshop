import axios from "axios";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGOUT
} from "../constants/UserConstants";
import {PRODUCT_LIST_FAIL} from "../constants/productConstants";


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      'headers': {
        'Content-type': 'aplication'
      }
    }

    const {data} = await axios.post(
      '/api/users/login/',
      {'username': email, 'password': password},
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    })
  }
}