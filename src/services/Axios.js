import axios from "axios";

const instance = axios.create({
//   baseURL: "/MisExpedientes",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Accept: "text/plain"
  },
});

instance.interceptors.response.use(
  (response) => {
    if (!response.data.isSuccess) {
      showErrorObject(response.data.errors);
    }
    return response;
  },
  (error) => {
    showErrorObject(error.response.data.errors);
    return Promise.reject(error);
  }
);

function showErrorObject(errors) {
  let errorList = "";
  if (errors) {    
    errors.reduce((currentValue) => {
      errorList += currentValue.errorMessage;
    }, "")
    //alert(errorList);
  }
}
export default instance;
