import axios from 'axios';

export default axios.create({
  baseURL: "https://devam-stock-auth.herokuapp.com"
});