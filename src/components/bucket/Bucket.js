import React, { useState, useEffect } from 'react'

import './Bucket.css'

function Bucket (props) {
    const {place, count, recalc, emoji } = props

    const [total, setTotal] = useState(count)

    const bump = (e, amount) => {
        e.preventDefault()
        const newAmount = total + amount
        console.log(place, newAmount)
        if (newAmount === 10) {
            setTotal(0)
        }
        else {
            setTotal(newAmount)
        }

        props.recalc(newAmount, place)
    }

    return (
        <div className={'col-sm-2 bucket'}>
            <div className={'row'}>
                <div className={'col-sm total-box'}>
                    {Array(total).fill(emoji).join('')}
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-sm bucket-header'}>
                    {`${place}s`}
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-sm'}>
                    <button onClick={(e) => bump(e,1)} className={'btn btn-primary bucket-btn'} disabled={total === 10}>+</button>
                    <button onClick={(e) => bump(e,-1)} className={'btn btn-warning bucket-btn'} disabled={total === 0}>-</button>
                </div>
            </div>
        </div>
    )
}

export default Bucket