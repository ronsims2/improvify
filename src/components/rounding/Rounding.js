import React, { useState } from 'react'

const generateQuestion = () => {
    const number = Math.ceil(Math.random() * 10000)

    return number
}

const Rounding = () => {
    const [answer, setAnswer] = useState(null)
    const [question, setQuestion] = useState(generateQuestion())
    const [resolution, setResolution] = useState(false)
    const handleAnswer = (e) => {
        const val = e.target.value
        setAnswer(val)
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        if (answer === Math.round())
    }

    return (
        <>
            <div className={'row'}>
                <div className={'col-md'}>
                    <h1>Rounding</h1>
                    <h3>Instructions </h3>
                    <p>Do something</p>
                </div>
            </div>
            <div className={'card'}>
                <div className={'card-body'}>
                    <div>{question}</div>
                    <p>Instructions: </p>
                    <input value={answer} onChange={handleAnswer} />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default Rounding