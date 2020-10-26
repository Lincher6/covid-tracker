import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://disease.sh/'
})

export const covidApi = {
    getCountries: async () => {
        const response = await instance.get(`/v3/covid-19/countries`)
        return response.data
    },

    getCountry: async (countryCode) => {
        const response = await instance.get(`/v3/covid-19/countries/${countryCode}`)
        return response.data
    },

    getWorldwide: async () => {
        const response = await instance.get(`/v3/covid-19/all`)
        return response.data
    },

    getChartData: async (country = 'all') => {
        const response = await instance.get(`/v3/covid-19/historical/${country}?lastdays=120`)
        return response.data
    }

}