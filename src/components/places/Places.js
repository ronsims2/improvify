import React, { useState, useRef } from 'react'
import Bucket from "../bucket/Bucket";

const Places = () => {
    const initialTotal = String(Math.ceil(Math.random() * 10000000))
    const [total, setTotal] = useState(initialTotal.split())
    const recalc = (num, place) => {
        const pos = place.length - 1

        const workingTotalArray = [...total].reverse()
        let workingTotal = 0

        workingTotalArray.forEach((item, i) => {
            let itemAmount = parseInt(item)
            if (i === pos) {
                //add in increase
                itemAmount += num
            }

            // Use Multiply
            itemAmount = itemAmount * parseInt(`1${Array(pos).fill('0').join('')}`)

            workingTotal += itemAmount
        })

    }

    return (
        <>
            <div className={'row'}>
                <p>{total}</p>
                <Bucket place={'100'} emoji={'🌎'} count={3} recalc={recalc}/>
            </div>
        </>
    )
}

export default Places