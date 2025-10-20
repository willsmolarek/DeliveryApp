'use client'
import { useState } from 'react'
import OrdersManagement from '@/components/admin/OrdersManagement'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    // Login simples para teste - remova depois
    if (email === 'admin@delivery.com' && password === 'admin123') {
      setIsAuthenticated(true)
    } else {
      alert('Credenciais inválidas. Use: admin@delivery.com / admin123')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Acesso Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="admin@delivery.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="admin123"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              Entrar
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Use: admin@delivery.com</p>
            <p>Senha: admin123</p>
          </div>
        </div>
      </div>
    )
  }

  return <OrdersManagement />
}