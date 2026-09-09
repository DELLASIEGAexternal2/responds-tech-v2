import React, { useState } from 'react'
import Login from './components/Login.jsx'
import Expenses from './components/Expenses.jsx'
import Tasks from './components/Tasks.jsx'
import AdminBase from './components/AdminBase.jsx'

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('responds_current_user')
    return saved ? JSON.parse(saved) : null
  })
  const [tab, setTab] = useState('frais')

  const handleLogin = (u) => {
    setUser(u)
    localStorage.setItem('responds_current_user', JSON.stringify(u))
  }
  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('responds_current_user')
  }

  if (!user) return <Login onLogin={handleLogin} />

  return (
    <div className="app">
      <div className="header">
        <div className="logo">RE'SPOND'S Tech</div>
        <div><span>{user.username} {user.role==='admin' && 'ADMIN'}</span> <button onClick={handleLogout}>Logout</button></div>
      </div>
      <div className="content">
        {tab==='frais' && <Expenses currentUser={user} />}
        {tab==='taches' && <Tasks currentUser={user} />}
        {tab==='base' && <AdminBase currentUser={user} />}
      </div>
      <div className="bottom-nav">
        <div onClick={()=>setTab('frais')}>💰 Frais</div>
        <div onClick={()=>setTab('taches')}>✅ Tâches</div>
        <div onClick={()=>setTab('base')}>🗄️ Base</div>
      </div>
    </div>
  )
}
