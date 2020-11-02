import React from 'react'
import './tip.css'

const Tip = (props) => {

    return (
        <details className="container title-space text-monospace">
            <summary className="title-tip title-font">
                {props.title}
            </summary>
            <p className='explanation'>{props.explanation}</p>
            <input type="text" className="form-control" placeholder="Enter the number"
                onChange={ (event) => props.setInput(event.target.value)}></input>
            <button type="button" class="btn btn-outline-dark btn-lg btn-block start-button"
                onClick={props.filter}>filter</button>
        </details>
    )
}

export default Tip