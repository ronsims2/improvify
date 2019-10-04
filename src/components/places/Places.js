import React, { useState, useRef } from 'react'
import Bucket from '../bucket/Bucket'
import  numberToWords from 'number-to-words'

import './Places.css'
import qrcode from "qrcode";

const questionId = 'places'
const instructions = (<p>Each emoji represents one place value unit. Use the <strong>PLUS (+)</strong> and <strong>MINUS (-)</strong> button top adjust the emojis so that the total matches the <span className={'highlight'}>BLUE</span> number below.
    <br/><br/>Click the submit button to check your answer.</p>)

function Places () {
    const initialTotal = String(Math.ceil(Math.random() * 1000000))
    const initialDummyTotal = String(Math.ceil(Math.random() * 1000000))
    const [resolution, setResolution] = useState(null)
    const [total, setTotal] = useState(initialTotal.split(''))
    const [dummyTotal, setDummyTotal] = useState(initialDummyTotal.split(''))
    const [emojis, setEmojis] = useState(['🍏', '🍔', '🍪', '🥐', '🥯', '🍗', '🥩', '🍎', '🌯', '🌮', '🥙', '🌭', '🥮', '🍅', '🍩'])
    const [answerHistory, setAnswerHistory] = useState([])
    const [isDone, setIsDone] = useState(false)
    const canvasRef = useRef(null)

    const recalc = (num, place) => {
        const pos = place.length - 1

        const workingTotalArray = [...total].reverse()
        let workingTotal = 0

        workingTotalArray.forEach((item, i) => {
            let itemAmount = parseInt(item)
            if (i === pos) {
                //add in increase
                if (num !== itemAmount) {
                    itemAmount = num
                }
            }

            // Use Multiply
            itemAmount = itemAmount * parseInt(`1${Array(i).fill('0').join('')}`)

            workingTotal += itemAmount
        })

        setDummyTotal(String(workingTotal).split(''))
    }

    const getNext = (e) => {
        e.preventDefault()
        setResolution(null)
        const myDummyTotal = String(Math.ceil(Math.random() * 1000000))
        const myTotal = String(Math.ceil(Math.random() * 1000000))
        setDummyTotal(myDummyTotal.split(''))
        setTotal(myTotal.split(''))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const myTotal = parseInt(total.join(''))
        const myDummyTotal = parseInt(dummyTotal.join(''))
        if (myDummyTotal === myTotal) {
            handleCorrectAnswer(myTotal, myDummyTotal)
        }
        else {
            handleIncorrectAnswer(myTotal, myDummyTotal)
        }
    }

    const handleDone = () => {
        // generate QR code for parents
        setResolution(null)
        setIsDone(true)
        const qrContent = `Your kid answered ${answerHistory.filter(x => x.correct === true).length} of ${answerHistory.length} place value problems correctly on ${new Date()}`
        qrcode.toCanvas(canvasRef.current, qrContent, (err) => console.log(err))
    }

    const handleCorrectAnswer = (question, answer) => {
        const newAnswerHistory = [...answerHistory, {question, answer, correct: true, questionId}]
        //localStorage.setItem('answerHistory', JSON.stringify(newAnswerHistory))
        setResolution(1)
        setAnswerHistory(newAnswerHistory)
    }

    const handleIncorrectAnswer = (question,  answer) => {
        const newAnswerHistory = [...answerHistory, {question, answer, correct: false, questionId}]
        //localStorage.setItem('answerHistory', JSON.stringify(newAnswerHistory))
        setResolution(0)
        setAnswerHistory(newAnswerHistory)
    }

    const generateBuckets = (dummy) => {debugger;
        const comps = [...dummy].reverse().map((item, i) => {
            const itemPlace = `1${Array(i).fill('0').join('')}`

            return (
                <Bucket place={itemPlace} count={parseInt(item)} recalc={recalc} emoji={emojis[i]}/>
            )
        })

        return comps.reverse()
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
                <div className={'col-md'}>
                    <h1>Big Numbers</h1>
                    <h4>Instructions</h4>
                    <p>{instructions}</p>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-md target-number'}><span className={'target-number-pre'}>Match this number: </span>{numberToWords.toWords(parseInt(total.join(''))).replace(/,/g, '')}</div>
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
                {generateBuckets(dummyTotal)}
            </div>
            <div className={'row btn-row'}>
                <div className={'col-md-4'}></div>
                <div className={'col-md-4'}>
                    <button className={'btn btn-primary btn-lg btn-block'} onClick={handleSubmit}>Submit</button>
                    <button className={'btn btn-warning btn-lg btn-block'} onClick={handleDone}>I'm Done</button>
                </div>
                <div className={'col-md-4'}></div>
            </div>
        </>
    )
}

export default Places