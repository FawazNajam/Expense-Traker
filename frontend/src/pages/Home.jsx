import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <h1>Expense Tracker</h1>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
        </>
    )
}

export default Home
