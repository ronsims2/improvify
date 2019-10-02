import React, { useState, useRef } from 'react'
import Bucket from "../bucket/Bucket";

const Places = () => {
    const initialTotal = Math.ceil(Math.random() * 10000000)
    const [total, setTotal] = useState(initialTotal)
    const recalc = (num) => setTotal(num + total)

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