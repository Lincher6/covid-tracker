import React, {useEffect, useRef} from 'react'
import './App.css';
import { Card } from '@material-ui/core';
import { Table } from './components/table/Table';
import "leaflet/dist/leaflet.css";
import {Map} from "./components/map/Map";
import {useDispatch} from "react-redux";
import {getCountries} from "./model/thunks";
import {Header} from "./components/header/Header";
import {StatisticTypes} from "./components/statisticTypes/StatisticTypes";
import {LineChart} from "./components/chart/LineChart";
import {Controls} from "./components/controls/Controls";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    return (
        <div className="app">
            <div className="app__left">
                <Header/>
                <StatisticTypes/>
                <Map/>
            </div>
            <Card className="app__right">
                <Table />
                <LineChart/>
            </Card>
            <Controls/>
        </div>
    );
}

export default App;
