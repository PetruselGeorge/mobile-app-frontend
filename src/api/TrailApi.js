import axios from "axios";

export default axios.create({
    baseURL:"http://192.168.0.151:8080/mobile-app-ws/trails"
})