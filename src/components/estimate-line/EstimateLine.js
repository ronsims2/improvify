import React, { useState, useRef, useEffect } from 'react'
import { round } from '../../utils/maths'
import qrcode from 'qrcode'
import randomInt from 'random-int'

import './EstimateLine.css'
import numberToWords from "number-to-words";

const activityId = 'estimate_line'
const instructions =  (<p>Tap on the number line to indicate where you think the <span className={'highlight'}>BLUE</span> number below is located.</p>)

function EstimateLine ()  {
    const canvasRef = useRef(null)
    const lineCanvasRef = useRef(null)
    const initialQuestion = randomInt(100, 100000)
    const [question, setQuestion] = useState(initialQuestion)
    const [resolution, setResolution] = useState(null)
    const [answerHistory, setAnswerHistory] = useState([])
    const [isDone, setIsDone] = useState(false)
    const [questionCount, setQuestionCount] = useState(1)

    useEffect(() => {
        const ctx = lineCanvasRef.current.getContext('2d')
        ctx.beginPath()
        ctx.moveTo(200, 0)
        ctx.lineTo(210, 10)
        ctx.lineTo(190, 10)
        ctx.lineTo(200, 0)
        ctx.fill()
        ctx.lineTo(200, 1000)
        ctx.stroke()

        // Triangle at bottom
        // ctx.lineTo(190, 990)
        // ctx.lineTo(210, 990)
        // ctx.lineTo(200, 1000)
        // ctx.fill()

        //Middle bar
        ctx.beginPath()
        ctx.moveTo(210, 500)
        ctx.lineTo(190, 500)
        ctx.stroke()

        //Top middle bar
        ctx.beginPath()
        ctx.moveTo(210, 750)
        ctx.lineTo(190, 750)
        ctx.stroke()

        //Bottom middle bar
        ctx.beginPath()
        ctx.moveTo(210, 250)
        ctx.lineTo(190, 250)
        ctx.stroke()

        //Bottom bar
        ctx.beginPath()
        ctx.moveTo(210, 1000)
        ctx.lineTo(190, 1000)
        ctx.lineTo(190, 995)
        ctx.lineTo(210, 995)
        ctx.lineTo(210, 1000)
        ctx.fill()

        ctx.font = '14px serif';
        ctx.fillText('100,000', 220, 14);
        ctx.fillText('50,000', 220, 504);
        ctx.fillText('0', 220, 998);

    }, [])

    const handleCorrectAnswer = (question, answer) => {
        const newAnswerHistory = [...answerHistory, {question, answer, activityId, correct: true}]
        sessionStorage.setItem('answerHistory', JSON.stringify(newAnswerHistory))
        setResolution(1)
        setAnswerHistory(newAnswerHistory)
    }

    const handleIncorrectAnswer = (question, answer) => {
        const newAnswerHistory = [...answerHistory, {question, answer, activityId, correct: false}]
        console.log(`Your answer: ${answer} vs the solution: ${question}`)
        sessionStorage.setItem('answerHistory', JSON.stringify(newAnswerHistory))
        setResolution(0)
        setAnswerHistory(newAnswerHistory)
    }

    const handleDone = () => {
        // generate QR code for parents
        const kid = sessionStorage.getItem('userName') || 'Your kid'
        setResolution(null)
        setIsDone(true)
        const qrContent = `${kid} answered ${answerHistory.filter(x => x.correct === true && x.activityId === activityId).length} of ${answerHistory.length} estimation (number line) problems correctly on ${new Date()}`
        qrcode.toCanvas(canvasRef.current, qrContent, (err) => console.log(err))
    }

    const getNext = (e) => {
        e.preventDefault()
        setResolution(null)
        setQuestionCount(questionCount + 1)
        const newQuestion = randomInt(100, 100000)
        setQuestion(newQuestion)
    }

    const showAlert = (mode) => {
        switch (mode) {
            case 0:
                return (<div className={'alert alert-danger'}>🐳🐳🐳 That's just a bit off, please try again. <button className={'btn btn-danger'} onClick={getNext}>Skip this one</button></div>)
            case 1:
                return (<div className={'alert alert-success'}>🎉🎉🎉 Wow, that was an awesome estimate, good job! <button className={'btn btn-success'} onClick={getNext}>Next</button></div>)
            default:
                return null
        }
    }

    const handleSubmit = (e) => {
        const canvas = e.target
        const dims = canvas.getBoundingClientRect()
        console.log('dims:', dims)
        console.log(e.clientX, e.clientY)
        const x = e.clientX - Math.trunc(dims.left)
        const y = e.clientY - Math.trunc(dims.top)

        const guess = Math.abs((y * 100) - 100000)
        console.log('guess:', guess)
        const diff = Math.abs(guess - question)
        console.log ('DIFF: ', diff)
        let threshold = parseInt(localStorage.getItem(`${activityId}_threshold`))
        threshold = isNaN(threshold) ? 5000 : threshold
        console.log('treshold:: ',threshold)

        window.scrollTo(0, 0)

        if (diff <= threshold) {
            handleCorrectAnswer(question, guess)
        }
        else {
            handleIncorrectAnswer(question, guess)
        }
    }

    return (
        <>
            <div className={'row'}>
                <div className={'col-md-10'}>
                    <h2>Estimating - Number Line)</h2>
                    <h4>Instructions</h4>
                    {instructions}
                </div>
                <div className={'col-md-2 question-no'}>Question #: {questionCount}</div>
            </div>
            <div className={'row'}>
                <div className={'col-md target-number'}><span className={'target-number-pre'}>Where does this number fit on the number line: </span>{numberToWords.toWords(question)}?</div>
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
            <div style={{visibility: !isDone ? 'visible' : 'hidden', display: !isDone ? '': 'none'}} className={'row'}>
                <canvas className={'number-line'} onClick={handleSubmit} width={400} height={1000} ref={lineCanvasRef}></canvas>
            </div>
            <div className={'row btn-row'}>
                <div className={'col-md-4'}></div>
                <div className={'col-md-4'}>
                    <button className={'btn btn-warning btn-lg btn-block'} onClick={handleDone}>I'm Done</button>
                </div>
                <div className={'col-md-4'}></div>
            </div>
        </>
    )
}

export default EstimateLine