import React, {useEffect, useLayoutEffect} from 'react'
import "./LineChart.css"
import {Line} from "react-chartjs-2";
import {buildChatOptions, capitalize} from "utils";
import {useDispatch, useSelector} from "react-redux";
import {selectors} from "model/selectors";
import {getChart} from "model/thunks";
import {updateChartData} from "model/rootSlice";

const options = buildChatOptions()

export const LineChart = () => {
    const dispatch = useDispatch()
    const countryCode = useSelector(selectors.countryCode)
    const countryName = useSelector(selectors.countryName)
    const type = useSelector(selectors.type)
    const chartData = useSelector(selectors.chartData)
    const rawChartData = useSelector(selectors.rawChartData)

    useLayoutEffect(() => {
        dispatch(getChart(countryCode))
    }, [countryCode])

    useEffect(() => {
        if (rawChartData) {
            dispatch(updateChartData())
        }
    }, [type])

    return (
        <>
            <div className="app__right-title">
                {countryName} {capitalize(type)}
            </div>
            <div className="chart">
                {
                    chartData &&
                    <Line
                        data={chartData}
                        options={options}
                    />
                }
            </div>
        </>
    )
}