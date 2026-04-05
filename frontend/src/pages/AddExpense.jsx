import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddExpense() {
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('food')
    const [date, setDate] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/expenses/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ amount, category, date })
        })

        if (res.ok) {
            navigate('/dashboard')
        } else {
            const data = await res.json()
            setError(data.error)
        }
    }

    return (
        <div>
            <h1>Add Expense</h1>

            <label>Amount: <input type="number" step="0.01" onChange={e => setAmount(e.target.value)} /></label><br />

            <label>Category:
                <select onChange={e => setCategory(e.target.value)}>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="utilities">Utilities</option>
                    <option value="groceries">Groceries</option>
                    <option value="other">Other</option>
                </select>
            </label><br />

            <label>Date: <input type="date" onChange={e => setDate(e.target.value)} /></label><br />

            {error && <p>{error}</p>}
            <button onClick={handleSubmit}>Add Expense</button>
        </div>
    )
}

export default AddExpense
