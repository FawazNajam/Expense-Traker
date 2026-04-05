import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddExpense from './pages/AddExpense'
import Expenses from './pages/Expenses'
import DeleteExpense from './pages/DeleteExpense'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/expenses/add" element={<AddExpense />} />
                <Route path="/expenses" element={<Expenses />}/>
                <Route path="/expenses/delete" element={<DeleteExpense />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
