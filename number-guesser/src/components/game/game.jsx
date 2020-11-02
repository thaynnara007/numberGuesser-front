import React, { useEffect, useState, Fragment } from 'react'
import Match from '../match/match'
import Tip from '../tip/tip'

import { 
    gameTitle,
    matchTitle,
    tipSumExplanation
} from '../../utils/constants'

import './game.css'
import util from '../../utils/util'
import api from '../../api'


const Game = (props) => {

    const [infoPart, setInfoPart] = useState(true)
    const [matchInfo, setMatchInfo] = useState(false)
    const [name, setName] = useState('')
    const [timeBegin, setTimeBegin] = useState(0)
    const [gameTime, setGameTime] = useState(0)
    const [attempts, setAttempts] = useState(0)
    const [primes, setPrimes] = useState([])
    const [minIndex, setMinIndex] = useState(0)
    const [maxIndex, setMaxIndex] = useState(10)
    const [guess, setGuess] = useState(0)
    const [sum, setSum] = useState(-1)
    const [mod, setMod] = useState(-1)
    const [multi, setMult] = useState(-1)
    const [pressedSum, setPressedSum] = useState(false)
    const [pressedMod, setPressedMod] = useState(false)
    const [pressedMulti, setPressedMulti] = useState(false)
    

    
    useEffect( () => {
        let title = ''

        if (infoPart) title = gameTitle
        else if (matchInfo) title = matchTitle
        else title = primes[guess]

        props.setTitle(title)
    })

    const startGame = async() => {
        if (name === '') alert('Please, type a name')
        else {
            const index = util.randomNumberBetween(minIndex, maxIndex)

            setInfoPart(false)
            setAttempts(1)
            setGuess(index)
            setTimeBegin(new Date().getTime())

            const url = 'primes/'
            const result = await api.get(url)
            
            setPrimes(result.data.primes)
            setMaxIndex(result.data.size - 1)
        }
    }

    const onLess = () => {
        let new_max = guess
        if (new_max - minIndex >= 1) new_max -=1

        const randomIndex = util.randomNumberBetween(minIndex, new_max)
        
        setMaxIndex(new_max)
        setGuess(randomIndex)
        if (maxIndex !== minIndex) setAttempts(attempts + 1)
    }

    const onBigger = () => {
        let new_min = guess
        if (maxIndex - new_min >= 1) new_min +=1

        const randomIndex = util.randomNumberBetween(new_min, maxIndex)

        setMinIndex(new_min)
        setGuess(randomIndex)
        if (maxIndex !== minIndex) setAttempts(attempts + 1)
    }

    const onSame = async () => {
        const timeEnd = new Date().getTime()
        const diff = timeEnd - timeBegin

        setGameTime(diff)
        setMatchInfo(true)

        const body = {
            name: util.normalizeName(name),
            time: diff,
            attempts,
            number_guessed: primes[guess]
        }
        
        const url = 'rank/'
        await api.post(url, body)
    }

    const onSumFilter = async() => {
        const validated = util.validateNumber(sum)

        if (validated){
            if (!pressedSum) {
                const primesList = primes.slice(minIndex, maxIndex + 1)

                const url = 'primes/?filter=sum'
                const body = {
                    num: sum,
                    primes: primesList
                }

                const newPrimes = await api.post(url, body)
                const newMaxIndex = newPrimes.data.size - 1
                const newMinIndex = 0

                await setPrimes(newPrimes.data.primes)
                await setMaxIndex(newMaxIndex)
                await setMinIndex(newMinIndex)

                const randomIndex = util.randomNumberBetween(newMinIndex, newMaxIndex)

                setGuess(randomIndex)
                setPressedSum(true)
            }
            else alert('you have alredy gaven this tip')
        }
    }

    const onModFilter = async() => {
        const validated = util.validateNumber(mod)

        if (validated){
            if (!pressedMod) {
                const primesList = primes.slice(minIndex, maxIndex + 1)

                const url = 'primes/?filter=mod'
                const body = {
                    num: mod,
                    primes: primesList
                }

                const newPrimes = await api.post(url, body)
                const newMaxIndex = newPrimes.data.size - 1
                const newMinIndex = 0

                await setPrimes(newPrimes.data.primes)
                await setMaxIndex(newMaxIndex)
                await setMinIndex(newMinIndex)

                const randomIndex = util.randomNumberBetween(newMinIndex, newMaxIndex)

                setGuess(randomIndex)
                setPressedMod(true)
            }
            else alert('you have alredy gaven this tip')
        }
    }

    const onMultiFilter = async() => {
        const validated = util.validateNumber(multi)

        if (validated){
            if(!pressedMulti) {
                const primesList = primes.slice(minIndex, maxIndex + 1)

                const url = 'primes/?filter=multi'
                const body = {
                    num: multi,
                    primes: primesList
                }

                const newPrimes = await api.post(url, body)
                const newMaxIndex = newPrimes.data.size - 1
                const newMinIndex = 0

                await setPrimes(newPrimes.data.primes)
                await setMaxIndex(newMaxIndex)
                await setMinIndex(newMinIndex)

                const randomIndex = util.randomNumberBetween(newMinIndex, newMaxIndex)

                setGuess(randomIndex)
                setPressedMulti(true)
            }
            else alert('you have alredy gaven this tip')
        }
    }

    const content = () => {
        if (infoPart) {
            return (
                <div>
                    <input type="text" className="form-control" placeholder="Enter your name"
                        onChange={ (event) => setName(event.target.value)}></input>
                    <button type="button" class="btn btn-outline-dark btn-lg btn-block start-button"
                        onClick={startGame}>Start Game</button>
                </div>
            )
        }
        else if (matchInfo) {
            return(
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
                        <Match index={'0'} name={name} time={gameTime} attempts={attempts}
                        numberGuessed={primes[guess]}></Match>
                    </tbody>
                </table>
            )
        }
        else {
            return (
                <Fragment>
                    <div className="container">
                        <button type="button" className="btn btn-outline-info btn-lg text-button2 guess-buttons" 
                            onClick={onLess}>Less</button>
                        <button type="button" className="btn btn-outline-success btn-lg text-button2 guess-buttons" 
                            onClick={onSame}>Same</button>
                        <button type="button" className="btn btn-outline-info btn-lg text-button2 guess-buttons bigger-button" 
                            onClick={onBigger}>Bigger</button>
                    </div>
                    <Tip title={"Sum Tip"} explanation={tipSumExplanation} 
                        setInput={setSum} filter={onSumFilter}></Tip>
                    <Tip title={"Mod Tip"} explanation={tipSumExplanation} 
                        setInput={setMod} filter={onModFilter}></Tip>
                    <Tip title={"Multi Tip"} explanation={tipSumExplanation} 
                        setInput={setMult} filter={onMultiFilter}></Tip>
                </Fragment>
            )
        }
    }   

    return (
        <Fragment>
            { content( )}
        </Fragment>
    )
}

export default Game