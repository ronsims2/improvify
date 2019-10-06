import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Welcome from '../welcome/Welcome'

import './StartPage.css'

function StartPage (props) {
    const userName = localStorage.getItem('userName') || ''
    debugger
    const [name, setName] = useState(userName)

    const setUserName = (n) => {
        setName(n)
        localStorage.setItem('userName', n)
    }

    return (
        <>
            <Welcome name={name} saveName={setUserName}/>
            <hr/>
            <div className={'row'}>
                <div className={'col-md text-center'}>
                    <h4>Select one of the activities below.</h4>
                    <div className={'toc'}>
                        <ul className={'list-group'}>
                            <li className={'list-group-item'}><Link to="/rounding">Rounding Big Numbers</Link></li>
                            <li className={'list-group-item'}><Link to="/places">Place Values</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default StartPage