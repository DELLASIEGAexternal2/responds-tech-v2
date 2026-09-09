import React, { useState, useEffect } from 'react'
import { getFrais, saveFrais } from '../utils/storage.js'

export default function Expenses({ currentUser }) {
  const [frais, setFrais] = useState([])
  const [form, setForm] = useState({ type: 'Taxi', description: '', montant: '', bonus: '+100%' })

  useEffect(()=>{ setFrais(getFrais()) }, [])

  const addFrais = () => {
    if (!form.montant) return
    const montant = parseInt(form.montant)
    const coeff = form.bonus.includes('100%') ? 2 : 1.5
    const rembourse = montant * coeff
    const newItem = {
      id: Date.now(),
      date: new Date().toISOString().slice(0,10),
      addedBy: currentUser.username,
      ...form,
      montant,
      rembourse,
      statut: 'En attente'
    }
    const updated = [newItem, ...frais]
    setFrais(updated)
    saveFrais(updated)
    setForm({ type: 'Taxi', description: '', montant: '', bonus: '+100%' })
  }

  const toggleStatut = (id) => {
    const updated = frais.map(f => f.id===id ? {...f, statut: f.statut==='Payé'?'En attente':'Payé'} : f)
    setFrais(updated)
    saveFrais(updated)
  }

  const totalDep = frais.reduce((s,f)=>s+f.montant,0)
  const totalRemb = frais.reduce((s,f)=>s+f.rembourse,0)

  return (
    <div>
      <h3>Notes de Frais</h3>
      <div style={{background:'#1a3a2a', border:'1px solid #25D366', borderRadius:'12px', padding:'14px', margin:'8px 0'}}>
        <small>Total dépensé: {totalDep} FCFA | Total à rembourser: {totalRemb} FCFA</small>
      </div>
      <div style={{background:'#162032', border:'1px solid #2a3a4d', borderRadius:'12px', padding:'14px', margin:'8px 0'}}>
        <select style={{width:'100%', padding:'12px', margin:'6px 0'}} value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
          <option>Taxi</option><option>Bus</option><option>Carburant</option><option>Autre</option>
        </select>
        <input style={{width:'100%', padding:'12px', margin:'6px 0'}} placeholder="Trajet / Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <input style={{width:'100%', padding:'12px', margin:'6px 0'}} type="number" placeholder="Montant dépensé FCFA" value={form.montant} onChange={e=>setForm({...form, montant:e.target.value})} />
        <select style={{width:'100%', padding:'12px', margin:'6px 0'}} value={form.bonus} onChange={e=>setForm({...form, bonus:e.target.value})}>
          <option>+100% (x2) - Ex: 5000 → 10000</option>
          <option>+50% (x1.5) - Ex: 5000 → 7500</option>
        </select>
        <button style={{background:'#25D366', color:'black', padding:'10px', width:'100%', border:'none', borderRadius:'8px', fontWeight:'700'}} onClick={addFrais}>Ajouter frais</button>
      </div>

      {frais.map(f=>(
        <div key={f.id} style={{background:'#162032', border:'1px solid #2a3a4d', borderRadius:'12px', padding:'14px', margin:'8px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <strong>{f.type} - {f.montant} → {f.rembourse} FCFA</strong>
            <span style={{background:'#25D366', color:'black', padding:'2px 8px', borderRadius:'12px', fontSize:'11px'}}>{f.statut}</span>
          </div>
          <small>{f.date} | Par {f.addedBy} | {f.description} | {f.bonus}</small><br/>
          <button style={{marginTop:'6px', fontSize:'12px', background:'transparent', border:'1px solid #25D366', color:'#25D366', padding:'4px 8px', borderRadius:'6px'}} onClick={()=>toggleStatut(f.id)}>Toggle Payé</button>
        </div>
      ))}
    </div>
  )
}
