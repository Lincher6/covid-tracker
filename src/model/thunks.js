import {covidApi} from "../api";
import {setChartData, setCountries, setCountry} from "./rootSlice";

export const getCountries = () => async dispatch => {
    const data = await covidApi.getCountries()
    dispatch(setCountries(data))
}

export const changeCountry = (countryCode) => async dispatch => {
    if (countryCode === 'worldwide') {
        const country = await covidApi.getWorldwide()
        dispatch(setCountry({ country, countryCode }))
    } else {
        const country = await covidApi.getCountry(countryCode)
        dispatch(setCountry({ country, countryCode }))
    }
}

export const getChart = (countryCode) => async (dispatch) => {
    if (countryCode === 'worldwide') {
        const rawData = await covidApi.getChartData()
        dispatch(setChartData(rawData))
    } else {
        const rawData = await covidApi.getChartData(countryCode)
        dispatch(setChartData(rawData.timeline))
    }
}