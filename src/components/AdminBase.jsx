import React, { useState, useEffect } from 'react'
import { getUsers, saveUsers, getFrais, getTaches } from '../utils/storage.js'

export default function AdminBase({ currentUser }) {
  const [users, setUsers] = useState([])
  const [frais, setFrais] = useState([])
  const [taches, setTaches] = useState([])
  const [showPass, setShowPass] = useState({})
  const [search, setSearch] = useState('')
  const [showJson, setShowJson] = useState(false)

  useEffect(()=>{
    setUsers(getUsers())
    setFrais(getFrais())
    setTaches(getTaches())
  }, [])

  const deleteUser = (username) => {
    if (username===currentUser.username) { alert('Tu ne peux pas te supprimer toi-même'); return }
    if (!confirm(`Supprimer définitivement ${username} ?`)) return
    const updated = users.filter(u=>u.username!==username)
    saveUsers(updated)
    setUsers(updated)
  }

  const filtered = users.filter(u=>u.username.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h3>🗄️ Base de données - Utilisateurs</h3>
      <div style={{background:'#1a2332', borderRadius:'12px', padding:'14px', margin:'8px 0'}}>
        <strong>Total: {users.length} utilisateurs</strong><br/>
        <small>Connecté: {currentUser.username} ({currentUser.role})</small>
      </div>

      <input style={{width:'100%', padding:'12px', margin:'6px 0'}} placeholder="Rechercher user..." value={search} onChange={e=>setSearch(e.target.value)} />

      {filtered.map(u=>{
        const nbFrais = frais.filter(f=>f.addedBy===u.username).length
        const nbTaches = taches.filter(t=>t.addedBy===u.username).length
        return (
          <div key={u.username} style={{background:'#162032', border:'1px solid #2a3a4d', borderRadius:'12px', padding:'14px', margin:'8px 0'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <strong>{u.username} {u.role==='admin' && <span style={{background:'#ff3b30', color:'white', padding:'2px 6px', borderRadius:'10px', fontSize:'10px'}}>ADMIN</span>}</strong>
              <button style={{background:'#ff3b30', color:'white', border:'none', padding:'5px 10px', borderRadius:'6px', fontSize:'11px'}} onClick={()=>deleteUser(u.username)}>Supprimer</button>
            </div>
            <div style={{fontSize:'13px', marginTop:'6px', lineHeight:'1.6'}}>
              🔑 Mot de passe: {showPass[u.username] ? u.password : '••••'} <span style={{cursor:'pointer'}} onClick={()=>setShowPass({...showPass, [u.username]:!showPass[u.username]})}> 👁️</span><br/>
              📅 Créé: {new Date(u.createdAt).toLocaleDateString()}<br/>
              💰 Frais: {nbFrais} | ✅ Tâches: {nbTaches}
            </div>
          </div>
        )
      })}

      <div style={{background:'#162032', border:'1px solid #2a3a4d', borderRadius:'12px', padding:'14px', margin:'8px 0'}}>
        <button style={{width:'100%', background:'transparent', border:'1px solid #25D366', color:'#25D366', padding:'10px', borderRadius:'8px'}} onClick={()=>setShowJson(!showJson)}>{showJson ? 'Masquer JSON' : 'Voir JSON brut (base complète)'}</button>
        {showJson && (
          <pre style={{fontSize:'10px', overflow:'auto', marginTop:'10px', background:'black', padding:'10px', borderRadius:'8px', maxHeight:'300px'}}>
            {JSON.stringify({users, frais, taches}, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
