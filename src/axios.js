import axios from 'axios';

const instance = axios.create({
    // baseURL: "http://localhost:5001/api"  // Ensure this matches your backend port
    // baseURL: "https://crbackend-lixw.onrender.com/api"  // Ensure this matches your backend port
    // baseURL: "https://crbackend-9hhi.onrender.com/api"  // Ensure this matches your backend port
    baseURL: "https://carrentalbackend-3aci.onrender.com/api"  // Ensure this matches your backend port
});

export default instance;
