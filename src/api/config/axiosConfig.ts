import axios from 'axios';
import { baseUrl } from '../../constants/apiConstants';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

export { axiosInstance };
