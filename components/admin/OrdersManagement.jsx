"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, CheckCircle, XCircle, Package } from "lucide-react";

// Mock data
const mockOrders = [
  {
    id: 1,
    status: "novo",
    created_date: new Date().toISOString(),
    customer_name: "João Silva",
    total: 45.90,
    items_count: 3
  },
  {
    id: 2, 
    status: "preparando",
    created_date: new Date().toISOString(),
    customer_name: "Maria Santos",
    total: 32.50,
    items_count: 2
  }
];

const STATUS_CONFIG = {
  novo: { label: "Novo", color: "bg-blue-100 text-blue-800 border border-blue-300", icon: Clock },
  confirmado: { label: "Confirmado", color: "bg-purple-100 text-purple-800 border border-purple-300", icon: CheckCircle },
  preparando: { label: "Preparando", color: "bg-yellow-100 text-yellow-800 border border-yellow-300", icon: Package },
  pronto: { label: "Pronto", color: "bg-orange-100 text-orange-800 border border-orange-300", icon: CheckCircle },
  enviado: { label: "Enviado", color: "bg-indigo-100 text-indigo-800 border border-indigo-300", icon: Package },
  entregue: { label: "Entregue", color: "bg-green-100 text-green-800 border border-green-300", icon: CheckCircle },
  cancelado: { label: "Cancelado", color: "bg-red-100 text-red-800 border border-red-300", icon: XCircle }
};

export default function OrdersManagement() {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const { data: orders = mockOrders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => Promise.resolve(mockOrders),
    refetchInterval: 10000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => {
      console.log(`Atualizando pedido ${id} para status: ${status}`);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-orders']);
    },
  });

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const handleStatusChange = (orderId, newStatus) => {
    updateStatusMutation.mutate({ id: orderId, status: newStatus });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciamento de Pedidos</h1>
          <p className="text-gray-600">Gerencie e acompanhe todos os pedidos do sistema</p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700 whitespace-nowrap">Filtrar por status:</span>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full sm:w-48 p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="all" className="text-gray-900">Todos os pedidos</option>
                {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                  <option key={key} value={key} className="text-gray-900">
                    {config.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-blue-700 font-semibold">
                {filteredOrders.length} {filteredOrders.length === 1 ? 'pedido' : 'pedidos'}
              </span>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white text-center py-16 rounded-xl shadow-sm">
            <Package className="w-20 h-20 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Nenhum pedido encontrado</h3>
            <p className="text-gray-600 text-lg">
              {filterStatus === "all" 
                ? "Aguardando novos pedidos..."
                : `Nenhum pedido com status "${STATUS_CONFIG[filterStatus]?.label}"`
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map(order => {
              const StatusIcon = STATUS_CONFIG[order.status]?.icon || Clock;
              const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.novo;
              
              return (
                <div key={order.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            Pedido #{order.id}
                          </h3>
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 w-fit ${statusConfig.color}`}>
                            <StatusIcon className="w-4 h-4" />
                            {statusConfig.label}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm">
                          📅 {format(new Date(order.created_date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <select 
                          value={order.status} 
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="w-full sm:w-48 p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                        >
                          {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                            <option key={key} value={key} className="text-gray-900">
                              {config.label}
                            </option>
                          ))}
                        </select>
                        <button 
                          className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition-colors"
                          onClick={() => setSelectedOrder(order)}
                        >
                          Ver Detalhes
                        </button>
                      </div>
                    </div>

                    {/* Order Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">👤</span>
                          <p className="font-semibold text-gray-700">Cliente</p>
                        </div>
                        <p className="text-gray-900 text-lg font-medium">{order.customer_name}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">💰</span>
                          <p className="font-semibold text-gray-700">Total</p>
                        </div>
                        <p className="text-green-600 text-lg font-bold">
                          {order.total ? `R$ ${order.total.toFixed(2)}` : "R$ 0,00"}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">📦</span>
                          <p className="font-semibold text-gray-700">Itens</p>
                        </div>
                        <p className="text-gray-900 text-lg font-medium">{order.items_count || "0"} itens</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h3 className="text-2xl font-bold text-gray-900">Detalhes do Pedido</h3>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl p-2"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Order Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-3 text-lg">Informações do Pedido</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-blue-700 font-medium">Número:</span>
                        <span className="font-bold">#{selectedOrder.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700 font-medium">Data:</span>
                        <span>{format(new Date(selectedOrder.created_date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700 font-medium">Status:</span>
                        <span className="font-semibold">{STATUS_CONFIG[selectedOrder.status]?.label}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3 text-lg">Informações do Cliente</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-green-700 font-medium block mb-1">Nome:</span>
                        <span className="text-lg font-medium">{selectedOrder.customer_name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Values */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-3 text-lg">Valores do Pedido</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-700 font-medium">Total do pedido:</span>
                      <span className="text-2xl font-bold text-purple-800">
                        {selectedOrder.total ? `R$ ${selectedOrder.total.toFixed(2)}` : "R$ 0,00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700 font-medium">Quantidade de itens:</span>
                      <span className="text-lg font-medium">{selectedOrder.items_count || "0"} itens</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                <button 
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors"
                  onClick={() => setSelectedOrder(null)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}