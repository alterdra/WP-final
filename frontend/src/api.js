import axios from 'axios';

const API_PORT =
  process.env.NODE_ENV === "production"
  ? "/api"
  : `http://localhost:4000/api`
const instance = axios.create({
  baseURL: API_PORT,
});

export default instance;