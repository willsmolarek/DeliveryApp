import OrdersManagement from '@/components/admin/OrdersManagement'

export default function AdminPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Pedidos</h1>
      <OrdersManagement />
    </div>
  )
}