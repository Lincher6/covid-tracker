import React, { useEffect, useState } from 'react'
import './App.css';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { covidApi } from "./api";
import MenuItem from "@material-ui/core/MenuItem";
import { InfoBox } from './components/InfoBox';
import { Card } from '@material-ui/core';
import {capitalize, sortData} from './utils';
import { Table } from './components/Table';
import {LineChart} from "./components/LineChart";
import "leaflet/dist/leaflet.css";
import {Map} from "./components/Map";

function App() {
    const [countries, setCountries] = useState([])
    const [countryCode, setCountryCode] = useState('worldwide')
    const [country, setCountry] = useState({})
    const [countriesData, setCountriesData] = useState([])
    const [type, setType] = useState('cases')

    useEffect(() => {
        if (countryCode === 'worldwide') {
            covidApi.getWorldwide()
                .then(setCountry)
        } else {
            covidApi.getCountry(countryCode)
                .then(setCountry)
        }
    }, [countryCode])

    useEffect(() => {
        covidApi.getCountries()
            .then(data => {
                const countries = data.map(country => ({
                    name: country.country,
                    value: country.countryInfo.iso2
                }))

                setCountriesData(sortData(data))
                setCountries(countries)
            })
    }, [])

    const onCountryChange = async e => {
        const countryCode = e.target.value
        setCountryCode(countryCode)
    }


    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    <h1>COVID-19 Tracker</h1>
                    <FormControl>
                        <Select
                            variant="outlined"
                            value={countryCode}
                            onChange={onCountryChange}
                        >
                            <MenuItem value="worldwide">Worldwide</MenuItem>
                            {
                                countries.map((country, index) => (
                                    <MenuItem
                                        value={country.value}
                                        key={index}
                                    >
                                        {country.name}
                                    </MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>
                </div>
                <div className="app__stats">
                    <InfoBox
                        onClick={() => setType('cases')}
                        title="Covid-19 cases"
                        cases={country.todayCases}
                        total={country.cases}
                    />
                    <InfoBox
                        onClick={() => setType('recovered')}
                        title="Recovered"
                        cases={country.todayRecovered}
                        total={country.recovered}
                    />
                    <InfoBox
                        onClick={() => setType('deaths')}
                        title="Deaths"
                        cases={country.todayDeaths}
                        total={country.deaths}
                    />
                </div>
                <Map
                    country={country}
                    countryCode={countryCode}
                    countriesData={countriesData}
                    type={undefined}
                />
            </div>
            <Card className="app__right">
                <div className="app__right-title">Live Cases by Country</div>
                <Table countries={countriesData} />
                <LineChart country={country} countryCode={countryCode} type={type}/>
            </Card>

        </div>
    );
}

export default App;
