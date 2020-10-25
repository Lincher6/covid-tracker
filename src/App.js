import React, {useEffect, useState} from 'react'
import './App.css';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {covidApi} from "./api";
import MenuItem from "@material-ui/core/MenuItem";

function App() {
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState('worldwide')

    useEffect(() => {
        const getCountries = async () => {
            const response = await covidApi.getCountries()
            const countries = response.map(country => ({
                name: country.country,
                value: country.countryInfo.iso2
            }))

            setCountries(countries)
        }

        getCountries()
    }, [])

    const onCountryChange = async e => {
        const newCountry = e.target.value
        setCountry(newCountry)
    }


    return (
        <div className="app">
            <div className="app__header">
                <h1>COVID-19 Tracker</h1>
                <FormControl>
                    <Select variant="outlined" value={country} onChange={onCountryChange}>
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
        </div>
    );
}

export default App;
