import { useEffect, useState } from 'react'

function Expenses() {
    const [expenses, setExpenses] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        const fetchExpenses = async () => {
            const res = await fetch('http://127.0.0.1:8000/api/expenses', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = await res.json()

            if (Array.isArray(data)) {
                setExpenses(data)
            } else {
                setMessage(data.message)
            }
        }

        fetchExpenses()
    }, [])

    if (message) return <p>{message}</p>

    return (
        <ul>
            {expenses.map(expense => (
                <li key={expense.id}>
                    {expense.category} - ${expense.amount} - {expense.date}
                </li>
            ))}
        </ul>
    )
}

export default Expenses
