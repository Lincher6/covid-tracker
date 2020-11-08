import React, {useLayoutEffect} from 'react'
import './Table.css'
import capitalize from "@material-ui/core/utils/capitalize";
import {useDispatch, useSelector} from "react-redux";
import {selectors} from "model/selectors";
import {updateCountries} from "model/rootSlice";

export const Table = () => {
    const dispatch = useDispatch()
    const countriesData = useSelector(selectors.countriesData)
    const type = useSelector(selectors.type)

    useLayoutEffect(() => {
        dispatch(updateCountries())
    }, [type, dispatch])

    return (
        <>
            <div className="app__right-title">{capitalize(type)} by Country</div>
            <div className="table">
                <table>
                    <tbody>
                    {
                        countriesData.map(({country, ...data}) => (
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