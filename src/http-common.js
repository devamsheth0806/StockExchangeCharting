import axios from 'axios';

export default axios.create({
  baseURL: "https://devam-stock-charting.herokuapp.com"
});