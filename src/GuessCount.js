import React from 'react'

import './GuessCount.css'

function GuessCount (props)  {
    return <div className="guesses">Nombre de tentatives: {props.guesses}
    </div>;
}

export default GuessCount