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
            <input type="text" class="form-control" aria-describedby="emailHelp"
            placeholder="Enter a number" onChange={ (event) => setTop(event.target.value)}></input>
            <small id="emailHelp" class="form-text text-muted">Get the n best matches.</small>
            <button type="button" class="btn btn-dark button"
                        onClick={queryMatches}>Get</button>
        </Fragment>
    )
}

const Rank = (props) => {

    const [matches, setMatches] =  useState([])
    const [top, setTop] = useState(defultTopRank)

    useEffect( async ()=> {
        props.setTitle(rankTitle)
        
        const url = `rank/?page_size=${top}`
        const result = await api.get(url)

        await setMatches(result.data.all_ranks)
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
                    <th scope="col">Nome</th>
                    <th scope="col">Tempo</th>
                    <th scope="col">Tentativas</th>
                    <th scope="col">Número</th>
                </tr>
                </thead>
                <tbody>
                    {getMatches(matches)}
                </tbody>
            </table>
            <form>
                <div class="form-row align-items-center">
                    <GetButton setTop={setTop}></GetButton>
                </div>
            </form>
            
        </Fragment>
    )
}

export default Rank