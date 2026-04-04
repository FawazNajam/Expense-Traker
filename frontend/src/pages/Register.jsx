import { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confpass, setConfpass] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <div>
            <input
                type='text'
                placeholder='Username'
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type='password'
                placeholder='Password'
                onChange={e => setPassword(e.target.value)}
            />
            {error && <p>{error}</p>}
            <button onClick={handleSubmit}>Login</button>
        </div>
    )
}

export default Register
