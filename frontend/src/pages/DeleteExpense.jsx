import { useEffect, useState } from 'react'

function DeleteExpense() {
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        // fetch expenses
        const fetchExpenses = async () => {
            const res = await fetch('http://127.0.0.1:8000/api/expenses', {
                headers : {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = await res.json()

            setExpenses(data)
        }

        fetchExpenses()
    }, [])

    async function handleDelete(id) {
        const res = await fetch('http://127.0.0.1:8000/api/expenses/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ id })
        })

        if (res.ok) {
            setExpenses(expenses.filter(expense => expense.id !== id))
        }
    }

    return (
        <div>
            <h1>Delete Expenses</h1>
            <table>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.length === 0 ? (
                        <tr><td colSpan="4">No expenses found.</td></tr>
                    ) : (
                        expenses.map(expense => (
                            <tr key={expense.id}>
                                <td>{expense.amount}</td>
                                <td>{expense.category}</td>
                                <td>{expense.date}</td>
                                <td>
                                    <button onClick={() => handleDelete(expense.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default DeleteExpense
