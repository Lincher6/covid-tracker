import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://disease.sh/'
})

export const covidApi = {
    getCountries: async () => {
         const response = await instance.get(`/v3/covid-19/countries`)
         return response.data
    },

}