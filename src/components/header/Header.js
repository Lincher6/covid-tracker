import React, {useEffect} from 'react'
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {useDispatch, useSelector} from "react-redux";
import {selectors} from "model/selectors";
import {changeCountry} from "model/thunks";
import './Header.css'

export const Header = () => {
    const dispatch = useDispatch()
    const countryCode = useSelector(selectors.countryCode)
    const countries = useSelector(selectors.countries)

    useEffect(() => {
        dispatch(changeCountry(countryCode))
    }, [countryCode])

    const onCountryChange = e => {
        dispatch(changeCountry(e.target.value))
    }

    return (
        <div className="header">
            <h1>COVID-19 Tracker</h1>
            <div className="header__dropdown">
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
        </div>
    )
}