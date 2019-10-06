import React, { useState } from 'react'
import './Welcome.css'

const instructions = ''

function Welcome (props) {
    const { saveName, name } = props
    const [userName, setUserName] = useState(name)
    const [isValid, setIsValid] = useState(true)

    const handleSetName = (e) => {
        const n = e.target.value
        setUserName(n)
    }

    const handleSaveName = (e) => {
        e.preventDefault()

        if (!userName.trim()) {
            setIsValid(false)
            return
        }
        setIsValid(true)
        saveName(userName)
    }

    const showWelcome = (name) => {
        if (name) {
            return (
                <div className={'col-md welcome-box'}>
                    {`🏡 Welcome ${name}, practice make improvement so let's improvify! ✏️✏️✏️`}
                </div>
            )
        }

        return (
            <div className={'col-md welcome-box'}>
                <p><strong>Hey!</strong> Please enter your name (or something).</p>
                <div className={'form-group'}>
                    <label className={isValid ? '' : 'error'}>{`Name${isValid ? '' : ' is required'}`}</label>
                    <input className={'form-control'} value={userName} onChange={handleSetName} placeholder={'Enter your name here'} required />
                </div>
                <button onClick={handleSaveName} className={'btn btn-primary btn-lg name-btn'}>Save</button>
            </div>
        )
    }

    return (
        <>
            <div className={'row'}>
                {showWelcome(name)}
            </div>
        </>
    )
}

export default Welcome