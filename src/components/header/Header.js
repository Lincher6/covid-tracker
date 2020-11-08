import React, {useEffect} from 'react'
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {useDispatch, useSelector} from "react-redux";
import {selectors} from "model/selectors";
import {changeCountry} from "model/thunks";
import './Header.css'
import withStyles from "@material-ui/core/styles/withStyles";

const StyledSelect = withStyles(theme => ({
    root: {
        padding: '15px',
        [theme.breakpoints.down('xs')]: {
            padding: '10px',
        }

    },
}))(Select);

export const Header = () => {
    const dispatch = useDispatch()
    const countryCode = useSelector(selectors.countryCode)
    const countries = useSelector(selectors.countries)

    useEffect(() => {
        dispatch(changeCountry(countryCode))
    }, [countryCode, dispatch])

    const onCountryChange = e => {
        dispatch(changeCountry(e.target.value))
    }

    return (
        <div className="header">
            <h1>COVID-19 Tracker</h1>
            <div className="header__dropdown">
                <FormControl>
                    <StyledSelect
                        variant="outlined"
                        value={countryCode}
                        onChange={onCountryChange}
                    >
                        <MenuItem value='worldwide'>Worldwide</MenuItem>
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
                    </StyledSelect>
                </FormControl>
            </div>
        </div>
    )
}