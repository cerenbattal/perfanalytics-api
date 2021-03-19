import axios from "axios";

const API_URL = "http://localhost:3000/metrics";

class metricService {
    findAll(to, from) {
        let url = API_URL;

        if(!from){
            from = new Date();
            from.setMinutes(from.getMinutes() - 30)
            from = Math.round(from.getTime() / 1000)
            url = url + `?fromDate=${from}`
        } else if(from) {
            if(to) {
                url = url + `?fromDate=${from}&toDate=${to}`
            } else {
                url = url + `?fromDate=${from}`
            }
        }
        console.log('URLLLL: ', url)
        return axios.get(url)
        .then(response => {
            if (response.data) {
                return response.data;
            }
        })
    }
}

export default new metricService();

