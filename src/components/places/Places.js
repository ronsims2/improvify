import React, { useState, useRef, useEffect } from 'react'
import Bucket from "../bucket/Bucket";

const Places = () => {
    const initialTotal = String(Math.ceil(Math.random() * 10000000))
    console.log(initialTotal.split(''))
    const [total, setTotal] = useState(initialTotal.split(''))

    useEffect(() => {
        console.log('Initial Total: ', total)
    }, [])

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

        setTotal(String(workingTotal).split(''))
    }

    const showTotal = () => {
        return total.join('')
    }

    return (
        <>
            <div className={'row'}>
                <p>{showTotal()}</p>
                <Bucket place={'100'} emoji={'🌎'} count={parseInt(total[total.length - 3])} recalc={recalc}/>
            </div>
        </>
    )
}

export default Places