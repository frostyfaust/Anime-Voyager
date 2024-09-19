import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Nav from './components/Nav'
import Search from './components/Search'
import AnimePage from './components/AnimePage'



export const AuthContext = createContext()


function App() {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/anime/:id" element={<AnimePage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
