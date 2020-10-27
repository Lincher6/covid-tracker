import {createSelector} from "@reduxjs/toolkit";

const countries = (state) => state.countries
const countriesData = (state) => state.countriesData
const country = (state) => state.country
const countryName = (state) => state.countryName
const countryCode = (state) => state.countryCode
const rawChartData = (state) => state.rawChartData
const type = (state) => state.type

const chartData = createSelector((state) => state.chartData, (data) => {
    return JSON.parse(JSON.stringify(data))
})

export const selectors =  { countries, countriesData, country, countryCode, type, countryName, chartData, rawChartData }