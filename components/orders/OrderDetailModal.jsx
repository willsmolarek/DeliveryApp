import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, CreditCard, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const STATUS_CONFIG = {
  novo: { label: "Novo", color: "bg-blue-100 text-blue-800" },
  confirmado: { label: "Confirmado", color: "bg-purple-100 text-purple-800" },
  preparando: { label: "Preparando", color: "bg-yellow-100 text-yellow-800" },
  pronto: { label: "Pronto", color: "bg-orange-100 text-orange-800" },
  enviado: { label: "Enviado", color: "bg-indigo-100 text-indigo-800" },
  entregue: { label: "Entregue", color: "bg-green-100 text-green-800" },
  cancelado: { label: "Cancelado", color: "bg-red-100 text-red-800" }
};

const PAYMENT_LABELS = {
  pix: "Pix",
  card: "Cartão de Crédito",
  cash: "Dinheiro"
};

export default function OrderDetailModal({ order, onClose }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle>Pedido #{order.id.slice(0, 8)}</DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                {format(new Date(order.created_date), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>
            <Badge className={STATUS_CONFIG[order.status].color}>
              {STATUS_CONFIG[order.status].label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Items */}
          <div>
            <h3 className="font-bold mb-3">Itens do Pedido</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{item.quantity}x {item.product_name}</p>
                    {item.extras.length > 0 && (
                      <p className="text-sm text-gray-600">
                        + {item.extras.map(e => e.name).join(', ')}
                      </p>
                    )}
                    {item.observations && (
                      <p className="text-sm text-gray-600">
                        Obs: {item.observations}
                      </p>
                    )}
                  </div>
                  <p className="font-medium">R$ {item.subtotal.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Delivery Info */}
          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Informações de Entrega
            </h3>
            {order.delivery_type === "delivery" && order.delivery_address ? (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm">
                  {order.delivery_address.street}, {order.delivery_address.number}
                  {order.delivery_address.complement && ` - ${order.delivery_address.complement}`}
                </p>
                <p className="text-sm">
                  {order.delivery_address.neighborhood} - {order.delivery_address.city}/{order.delivery_address.state}
                </p>
                <p className="text-sm">CEP: {order.delivery_address.cep}</p>
              </div>
            ) : (
              <p className="text-gray-600">Retirada no local</p>
            )}
          </div>

          <Separator />

          {/* Payment */}
          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Forma de Pagamento
            </h3>
            <p className="text-gray-600">{PAYMENT_LABELS[order.payment_method]}</p>
          </div>

          <Separator />

          {/* Total */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>R$ {order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de Entrega</span>
              <span>R$ {order.delivery_fee.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-orange-600">R$ {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}