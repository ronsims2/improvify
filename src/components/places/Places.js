import React, { useState, useRef, useEffect } from 'react'
import Bucket from '../bucket/Bucket'
import  numberToWords from 'number-to-words'

import './Places.css'

const instructions = (<p>Each emoji represents one place value unit. Use the <strong>PLUS (+)</strong> and <strong>MINUS (-)</strong> button top adjust the emojis so that the total matches the <span className={'highlight'}>BLUE</span> number below.
    <br/><br/>Click the submit button to check your answer.</p>)

const Places = () => {
    const initialTotal = String(Math.ceil(Math.random() * 1000000))
    const initialDummyTotal = String(Math.ceil(Math.random() * 1000000))
    const [resolution, setResolution] = useState(null)
    const [total, setTotal] = useState(initialTotal.split(''))
    const [dummyTotal, setDummyTotal] = useState(initialDummyTotal)
    const [emojis, setEmojis] = useState(['🍏', '🍔', '🍪', '🥐', '🥯', '🍗', '🥩', '🍎', '🌯', '🌮', '🥙', '🌭', '🥮', '🍅', '🍩'])

    useEffect(() => {
        console.log('Initial Total: ', total)
    }, [])

    const recalc = (num, place) => {debugger
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

    const showTotal = () => {
        return total.join('')
    }

    const getNext = (e) => {
        e.preventDefault()
        // setResolution(null)
        // const q = generateQuestion()
        // setQuestion(q[0])
        // setPlace(q[1])
        // setAnswer('')
    }

    const checkAnswer = (e) => {
        e.preventDefault()

        if (total.join('') === dummyTotal.join()) {

        }
        else {

        }
    }

    const handleCorrectAnswer = (question, place, solution, answer) => {
        const newAnswerHistory = [...answerHistory, {question, place, solution, answer, correct: true}]
        //localStorage.setItem('answerHistory', JSON.stringify(newAnswerHistory))
        setResolution(1)
        setAnswerHistory(newAnswerHistory)
    }

    const handleIncorrectAnswer = (question, place, solution,  answer) => {
        const newAnswerHistory = [...answerHistory, {question, place, solution, answer, correct: false}]
        console.log(`Your answer: ${answer} vs the solution: ${solution}`)
        //localStorage.setItem('answerHistory', JSON.stringify(newAnswerHistory))
        setResolution(0)
        setAnswerHistory(newAnswerHistory)
    }

    const generateBuckets = () => {
        console.log(total)
        const comps = [...dummyTotal].reverse().map((item, i) => {
            const itemPlace = `1${Array(i).fill('0').join('')}`
            console.log('item place:',itemPlace)
            console.log('count: ', item)
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
                {generateBuckets()}
            </div>
            <div className={'row'}>
                <div className={'col-md'}><button onClick={checkAnswer}>Submit</button></div>
            </div>
        </>
    )
}

export default Places