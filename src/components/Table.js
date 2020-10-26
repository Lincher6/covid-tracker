import React, {useEffect, useLayoutEffect, useState} from 'react'
import capitalize from "@material-ui/core/utils/capitalize";
import {sortData} from "../utils";

export const Table = ({ countriesData, type = 'cases' }) => {
    const [countries, setCountries] = useState([])

    useLayoutEffect(() => {
        setCountries(sortData(countriesData, type))
    }, [type, countriesData])

    return (
        <>
            <div className="app__right-title">{capitalize(type)} by Country</div>
            <div className="table">
                <table>
                    <tbody>
                    {
                        countries.map(({country, ...data}) => (
                            <tr key={country}>
                                <td>{country}</td>
                                <td><strong>{data[type]}</strong></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>

    )
}