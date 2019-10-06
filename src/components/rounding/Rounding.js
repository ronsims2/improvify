import React, { useState, useRef } from 'react'
import { round } from '../../utils/maths'
import qrcode from 'qrcode'

import './Rounding.css'

const activityId = 'rounding'
const instructions = `Round the number to the nearest place value specified. Use a sheet of paper to work out your answer. Click "Submit" to check your answer. Click "I'm done" to quit.`

function generateQuestion() {
    const number = Math.ceil(Math.random() * 10000)
    let place = Math.ceil(Math.random() * String(number).length)
    place = parseInt(`1${Array(place).fill('0').join('')}`)
    return [number, place]
}

const Rounding = () => {
    const q = generateQuestion()
    const canvasRef = useRef(null)
    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState(q[0])
    const [resolution, setResolution] = useState(null)
    const [place, setPlace] = useState(q[1])
    const [answerHistory, setAnswerHistory] = useState([])
    const [isDone, setIsDone] = useState(false)
    const [questionCount, setQuestionCount] = useState(1)

    const handleAnswer = (e) => {
        const val = e.target.value
        setAnswer(val)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const solution = round(question, place)
        if (parseInt(answer) === solution) {
            handleCorrectAnswer(question, place, solution, answer)
        }
        else {
            handleIncorrectAnswer(question, place, solution, answer)
        }
    }

    const handleCorrectAnswer = (question, place, solution, answer) => {
        const newAnswerHistory = [...answerHistory, {question, place, solution, answer, activityId, correct: true}]
        sessionStorage.setItem('answerHistory', JSON.stringify(newAnswerHistory))
        setResolution(1)
        setAnswerHistory(newAnswerHistory)
    }

    const handleIncorrectAnswer = (question, place, solution,  answer) => {
        const newAnswerHistory = [...answerHistory, {question, place, solution, answer, activityId, correct: false}]
        console.log(`Your answer: ${answer} vs the solution: ${solution}`)
        sessionStorage.setItem('answerHistory', JSON.stringify(newAnswerHistory))
        setResolution(0)
        setAnswerHistory(newAnswerHistory)
    }

    const handleDone = () => {
        // generate QR code for parents
        const kid = sessionStorage.getItem('userName') || 'Your kid'
        setResolution(null)
        setIsDone(true)
        const qrContent = `${kid} answered ${answerHistory.filter(x => x.correct === true && x.activityId === activityId).length} of ${answerHistory.length} rounding problems correctly on ${new Date()}`
        qrcode.toCanvas(canvasRef.current, qrContent, (err) => console.log(err))
    }

    const getNext = (e) => {
        e.preventDefault()
        setResolution(null)
        setQuestionCount(questionCount + 1)
        const q = generateQuestion()
        setQuestion(q[0])
        setPlace(q[1])
        setAnswer('')
    }

    const showAlert = (mode) => {
        switch (mode) {
            case 0:
                return (<div className={'alert alert-danger'}>🐳🐳🐳 Incorrect - No worries, this isn't a test, its just practice. <button className={'btn btn-danger'} onClick={getNext}>Skip this one</button></div>)
            case 1:
                return (<div className={'alert alert-success'}>🎉🎉🎉 Yay! You got it right, keep it up! <button className={'btn btn-success'} onClick={getNext}>Next</button></div>)
            default:
                return null
        }
    }

    return (
        <>
            <div className={'row'}>
                <div className={'col-md-10'}>
                    <h2>Rounding Big Numbers</h2>
                    <h4>Instructions</h4>
                    <p>{instructions}</p>
                </div>
                <div className={'col-md-2 question-no'}>Question #: {questionCount}</div>
            </div>
            <div className={'row'}>
                <div className={'col-md'}>
                    {showAlert(resolution)}
                </div>
            </div>
            <div className={'row'}>
                <div style={{visibility: isDone ? 'visible' : 'hidden', display: isDone ? 'block': 'none'}} className={'col-md text-center'}>
                    <h4>Show this to an adult so they can scan it.</h4>
                    <canvas width={400} height={400} ref={canvasRef}></canvas>
                </div>
            </div>
            <div style={{visibility: !isDone ? 'visible' : 'hidden', display: !isDone ? 'block': 'none'}} className={'card'}>
                <div className={'card-body'}>
                    <div className={'score-box'}>
                        Score: {answerHistory.filter(x => x.correct === true).length}
                    </div>
                    <hr/>
                    <div>Round <span className='question'>{question}</span> to the nearest <span className='place'>{place}</span></div>
                    <p className={'card-text'}><input className={'form-control'} value={answer} onChange={handleAnswer} placeholder={'Enter your answer here'}/></p>
                        <button className={'btn btn-primary btn-lg btn-block'} onClick={handleSubmit}>Submit</button>
                        <button className={'btn btn-warning btn-lg btn-block'} onClick={handleDone}>I'm Done</button>
                </div>
            </div>
        </>
    )
}

export default Rounding