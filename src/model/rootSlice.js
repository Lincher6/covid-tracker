import {createSlice} from "@reduxjs/toolkit";
import {buildChartData, capitalize, sortData} from "utils";


const rootSlice = createSlice({
    name: 'root',
    initialState: {
        countries: [],
        countriesData: [],
        country: {},
        countryCode: 'worldwide',
        countryName: 'Worldwide',
        type: 'cases',
        rawChartData: null,
        chartData: null
    },
    reducers: {
        setCountries: (state, { payload }) => {
            state.countries = payload.map(country => ({
                name: country.country,
                value: country.countryInfo.iso2
            }))
            state.countriesData = sortData(payload, state.type)
        },

        setCountry: (state, { payload: { country, countryCode } }) => {
            state.countryCode = countryCode
            state.country = country
            state.countryName = countryCode === 'worldwide' ? capitalize(countryCode) : capitalize(country.country)
        },

        updateCountries: (state) => {
            state.countriesData = sortData(state.countriesData, state.type)
        },

        changeType: (state, { payload: type }) => {
            state.type = type
            state.countriesData = sortData(state.countriesData, type)
        },

        setChartData: (state, { payload: rawData }) => {
            state.rawChartData = rawData
            state.chartData = buildChartData(rawData, state.type)
        },

        updateChartData: (state) => {
            state.chartData = buildChartData(state.rawChartData, state.type)
        }
    }
})

export const { setCountries, setCountry, updateCountries, changeType, setChartData, updateChartData } = rootSlice.actions

export default rootSlice.reducer