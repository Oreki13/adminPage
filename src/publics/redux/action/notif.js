import Axios from "axios";
import qs from "qs";
import localStorage from "local-storage";

let tok = localStorage.get("token");
export const sendNotif = (id, data) => {
  const param = qs.stringify({
    UserId: id,
    message: data
  });
  return {
    type: "SEND_NOTIF",
    payload: Axios.post(
      `https://mobile-provider-clone.herokuapp.com/notification/`,
      param,
      { headers: { header_key: "PR0V1D3R", token: tok } }
    )
  };
};
