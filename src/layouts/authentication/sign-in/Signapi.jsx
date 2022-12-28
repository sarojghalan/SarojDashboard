import axios from "axios";
export const Signapi = {
  getsignin: function (data) {
    return axios.request({
      url: `${process.env.REACT_APP_API_URL}/teacher/login`,
      method: `POST`,
      data: data,
    });
  },
};
