import axios from "axios";

const Axios = axios.create({
  baseURL: "https://contact-book-nodejs.onrender.com/api/v1",
});

export default Axios;
