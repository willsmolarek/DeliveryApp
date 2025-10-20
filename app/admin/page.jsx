'use client'
import { useState } from 'react'
import OrdersManagement from '@/components/admin/OrdersManagement'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === 'admin@delivery.com' && password === 'admin123') {
      setIsAuthenticated(true)
    } else {
      alert('Credenciais inválidas. Use: admin@delivery.com / admin123')
    }
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px',
          border: '1px solid #e5e7eb'
        }}>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            textAlign: 'center',
            color: '#111827'
          }}>
            Acesso Administrativo
          </h1>
          
          <form onSubmit={handleLogin} style={{ space: '1.5rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#111827'
              }}>
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #d1d5db',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  color: '#111827',
                  backgroundColor: 'white'
                }}
                placeholder="admin@delivery.com"
                required
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#111827'
              }}>
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #d1d5db',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  color: '#111827',
                  backgroundColor: 'white'
                }}
                placeholder="admin123"
                required
              />
            </div>
            
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '1rem',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '1.125rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Entrar no Sistema
            </button>
          </form>
          
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#dbeafe',
            borderRadius: '8px',
            border: '1px solid #93c5fd'
          }}>
            <p style={{
              textAlign: 'center',
              color: '#1e40af',
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>
              Credenciais para teste:
            </p>
            <p style={{ textAlign: 'center', color: '#1e40af' }}>
              <strong>E-mail:</strong> admin@delivery.com
            </p>
            <p style={{ textAlign: 'center', color: '#1e40af' }}>
              <strong>Senha:</strong> admin123
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <OrdersManagement />
}