import { Link } from 'react-router-dom'

function Dashboard() {
    return (
        <div>
            <h1>Add Expense</h1>
            <Link to="/expenses/add"><button>Add Expense</button></Link>
            <h1>List Expenses</h1>
            <Link to="/expenses"><button>List Expenses</button></Link>
            <h1>Delete Expense</h1>
            <Link to="/expenses/delete"><button>Delete Expense</button></Link>
        </div>
    )
}

export default Dashboard
