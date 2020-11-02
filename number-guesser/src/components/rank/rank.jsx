import React, { useEffect, useState, Fragment } from 'react'
import Match from '../match/match'

import { 
    rankTitle,
    defultTopRank
} from '../../utils/constants'

import './rank.css'
import api from '../../api'
import util from '../../utils/util'

const GetButton = (props) => {

    const [top, setTop] = useState(defultTopRank)

    const queryMatches = async () => {
        const validated = util.validateNumber(top)

        if(validated) 
            props.setTop(top)
    }

    return (
        <Fragment>
            <input type="text" className="form-control" aria-describedby="emailHelp"
            placeholder="Enter a number" onChange={ (event) => setTop(event.target.value)}></input>
            <small id="emailHelp" className="form-text text-muted">Get the n best matches.</small>
            <button type="button" className="btn btn-dark button"
                        onClick={queryMatches}>Get</button>
        </Fragment>
    )
}

const Rank = (props) => {

    const [matches, setMatches] =  useState([])
    const [top, setTop] = useState(defultTopRank)

    useEffect ( () => {
        const fetchData = async () => {
            const url = `rank/?page_size=${top}`
            const result = await api.get(url)

            await setMatches(result.data.all_ranks)
        }

        fetchData()
    }, [props, top])

    useEffect( ()=> {
        props.setTitle(rankTitle)
    })

    const getMatches = (matches) => {
        return(
            matches.map( (matchInfo, index) => {
                const name = util.toBlankSpace(matchInfo.name)

                return <Match key={index} index={index + 1} name={name}
                    time={matchInfo.time} attempts={matchInfo.attempts}
                    numberGuessed={matchInfo.number_guessed}></Match>
            })
        )
    }

    return (
        <Fragment>
            <table className="table table-hover text-monospace">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Time</th>
                    <th scope="col">Attempts</th>
                    <th scope="col">Number</th>
                </tr>
                </thead>
                <tbody>
                    {getMatches(matches)}
                </tbody>
            </table>
            <form>
                <div className="form-row align-items-center">
                    <GetButton setTop={setTop}></GetButton>
                </div>
            </form>
            
        </Fragment>
    )
}

export default Rank