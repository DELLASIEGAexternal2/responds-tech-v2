import React, { useState, useEffect } from 'react'
import { getTaches, saveTaches } from '../utils/storage.js'

export default function Tasks({ currentUser }) {
  const [taches, setTaches] = useState([])
  const [form, setForm] = useState({ assigne: '', tache: '', priorite: 'Moyenne', statut: 'À faire' })

  useEffect(()=>{ setTaches(getTaches()) }, [])

  const addTache = () => {
    if (!form.tache) return
    const newItem = { id: Date.now(), date: new Date().toISOString().slice(0,10), addedBy: currentUser.username, ...form }
    const updated = [newItem, ...taches]
    setTaches(updated)
    saveTaches(updated)
    setForm({ assigne: '', tache: '', priorite: 'Moyenne', statut: 'À faire' })
  }

  const updateStatut = (id, statut) => {
    const updated = taches.map(t=> t.id===id ? {...t, statut} : t)
    setTaches(updated)
    saveTaches(updated)
  }

  return (
    <div>
      <h3>Suivi Tâches</h3>
      <div style={{background:'#162032', border:'1px solid #2a3a4d', borderRadius:'12px', padding:'14px', margin:'8px 0'}}>
        <input style={{width:'100%', padding:'12px', margin:'6px 0'}} placeholder="Assigné à (ex: Mélissa)" value={form.assigne} onChange={e=>setForm({...form, assigne:e.target.value})} />
        <input style={{width:'100%', padding:'12px', margin:'6px 0'}} placeholder="Tâche / Mission" value={form.tache} onChange={e=>setForm({...form, tache:e.target.value})} />
        <select style={{width:'100%', padding:'12px', margin:'6px 0'}} value={form.priorite} onChange={e=>setForm({...form, priorite:e.target.value})}>
          <option>Haute</option><option>Moyenne</option><option>Basse</option>
        </select>
        <button style={{background:'#25D366', color:'black', padding:'10px', width:'100%', border:'none', borderRadius:'8px', fontWeight:'700'}} onClick={addTache}>Ajouter tâche</button>
      </div>
      {taches.map(t=>(
        <div key={t.id} style={{background:'#162032', border:'1px solid #2a3a4d', borderRadius:'12px', padding:'14px', margin:'8px 0'}}>
          <strong>{t.tache}</strong> <span style={{background:'#25D366', color:'black', padding:'2px 8px', borderRadius:'12px', fontSize:'11px'}}>{t.priorite}</span><br/>
          <small>Assigné à: {t.assigne} | Par {t.addedBy} | {t.date}</small><br/>
          <select style={{width:'100%', padding:'8px', marginTop:'6px'}} value={t.statut} onChange={e=>updateStatut(t.id, e.target.value)}>
            <option>À faire</option><option>En cours</option><option>Fait</option><option>Bloqué</option>
          </select>
        </div>
      ))}
    </div>
  )
}
