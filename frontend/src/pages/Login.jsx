import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password})
        })

        const data = await res.json()

        if (res.ok) {
            localStorage.setItem('token', data.access)
            navigate('/dashboard')
        } else {
            setError(data.error)
        }
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

export default Login