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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Acesso Administrativo</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-2 text-gray-900">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900 bg-white"
                placeholder="admin@delivery.com"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2 text-gray-900">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900 bg-white"
                placeholder="admin123"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 font-semibold text-lg transition-colors shadow-md"
            >
              Entrar no Sistema
            </button>
          </form>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-center text-blue-900 font-medium">
              Credenciais para teste:
            </p>
            <p className="text-center text-blue-800 mt-1">
              <strong>E-mail:</strong> admin@delivery.com
            </p>
            <p className="text-center text-blue-800">
              <strong>Senha:</strong> admin123
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <OrdersManagement />
}