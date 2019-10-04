import React, { useState, useRef, useEffect } from 'react'

import './Bucket.css'

const Bucket = (props) => {

    const [total, setTotal] = useState(props.count)
    useEffect(() => {
        if (total === 10) {
            props.recalc(total, props.place)
            setTotal(0)
        }
        else {
            props.recalc(total, props.place)
        }
    }, [total])

    const bump = (e, amount) => {
        e.preventDefault()
        setTotal(total + amount)
    }

    return (
        <div className={'col-sm-2 bucket'}>
            <div className={'row'}>
                <div className={'col-sm total-box'}>
                    {Array(total).fill(props.emoji).join('')}
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-sm bucket-header'}>
                    {`${props.place}s`}
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