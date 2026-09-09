import React, { useState } from 'react'
import { getUsers, saveUsers } from '../utils/storage.js'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const users = getUsers()
    
    if (isRegister) {
      if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
        alert('Utilisateur existe déjà')
        return
      }
      const newUser = { username, password, role: users.length===0 ? 'admin' : 'member', createdAt: new Date().toISOString() }
      const newList = [...users, newUser]
      saveUsers(newList)
      onLogin(newUser)
    } else {
      const found = users.find(u => u.username===username && u.password===password)
      if (!found) { alert('Identifiants incorrects'); return }
      onLogin(found)
    }
  }

  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', background:'#0a0e13'}}>
      <form onSubmit={handleSubmit} style={{width:'100%', maxWidth:'360px', background:'#162032', border:'1px solid #2a3a4d', borderRadius:'12px', padding:'20px'}}>
        <h2 style={{color:'#25D366', marginBottom:'12px'}}>{isRegister ? 'Créer un compte' : 'Connexion'}</h2>
        <p style={{fontSize:'12px', color:'#8a9bb0', marginBottom:'12px'}}>Démo: Primo / 1234, Mélissa / 1234, Brayan / 1234</p>
        <input style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #2a3a4d', background:'#162032', color:'white', margin:'6px 0'}} placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
        <input style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #2a3a4d', background:'#162032', color:'white', margin:'6px 0'}} type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button style={{background:'#25D366', color:'black', border:'none', padding:'10px 16px', borderRadius:'8px', fontWeight:'600', width:'100%', marginTop:'12px'}} type="submit">{isRegister ? 'Créer' : 'Se connecter'}</button>
        <p style={{marginTop:'12px', textAlign:'center', fontSize:'13px', cursor:'pointer', color:'#25D366'}} onClick={()=>setIsRegister(!isRegister)}>
          {isRegister ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? Créer'}
        </p>
      </form>
    </div>
  )
}
