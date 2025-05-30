import axios from "axios";

const api_interface = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api_interface;
