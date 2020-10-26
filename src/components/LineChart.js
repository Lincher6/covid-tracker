import React, {useEffect, useState} from 'react'
import {Line} from "react-chartjs-2";
import {covidApi} from "../api";
import {buildChartData, buildChatOptions, capitalize} from "../utils";

export const LineChart = ({country, countryCode, type = 'cases'}) => {
    const [data, setData] = useState(null)
    const [chartData, setChartData] = useState(null)
    const [options, setOptions] = useState(buildChatOptions())
    const [countryName, setCountryName] = useState('Worldwide')

    useEffect(() => {
        if (countryCode === 'worldwide') {
            covidApi.getChartData().then(data => {
                setData(data)
            })
        } else {
            covidApi.getChartData(country.country).then(data => {
                setData(data.timeline)
            })
        }

        if (countryCode === 'worldwide') {
            setCountryName('Worldwide')
        } else {
            setCountryName(capitalize(country.country))
        }

    }, [country])

    useEffect(() => {
        if (data) {
            setChartData(buildChartData(data, type))
        }
    }, [type, data])

    return (
        <>
            <div className="chart__title">
                {countryName} {type}
            </div>
            <div className="chart">
                {
                    data &&
                    <Line
                        data={chartData}
                        options={options}
                    />
                }
            </div>
        </>
    )
}