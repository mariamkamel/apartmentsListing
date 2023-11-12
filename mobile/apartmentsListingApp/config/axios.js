import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '@env';

const instance = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
  timeout: 5000, // Timeout after 5 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
