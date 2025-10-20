import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ProductModal({ product, onClose }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [observations, setObservations] = useState("");

  const handleExtraToggle = (extra) => {
    setSelectedExtras(prev => {
      const exists = prev.find(e => e.name === extra.name);
      if (exists) {
        return prev.filter(e => e.name !== extra.name);
      } else {
        return [...prev, extra];
      }
    });
  };

  const calculateTotal = () => {
    const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
    return (product.price + extrasTotal) * quantity;
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    cart.push({
      product_id: product.id,
      product_name: product.name,
      quantity,
      unit_price: product.price,
      extras: selectedExtras,
      observations,
      subtotal: calculateTotal()
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    
    onClose();
    navigate(createPageUrl("Cart"));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl">🍔</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-600">{product.description || "Produto delicioso"}</p>
            <Badge className="mt-2 text-lg bg-gradient-to-r from-orange-500 to-red-500">
              R$ {product.price.toFixed(2)}
            </Badge>
          </div>

          {/* Extras */}
          {product.extras && product.extras.length > 0 && (
            <div>
              <h3 className="font-bold mb-3">Adicionais</h3>
              <div className="space-y-2">
                {product.extras.map((extra, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Checkbox
                      checked={selectedExtras.some(e => e.name === extra.name)}
                      onCheckedChange={() => handleExtraToggle(extra)}
                    />
                    <Label className="flex-1 cursor-pointer">
                      {extra.name}
                    </Label>
                    <span className="text-sm font-medium">
                      + R$ {extra.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Observations */}
          <div>
            <Label>Observações</Label>
            <Textarea
              placeholder="Ex: Sem cebola, ponto da carne..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Quantity */}
          <div>
            <Label>Quantidade</Label>
            <div className="flex items-center gap-3 mt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full h-12 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Adicionar - R$ {calculateTotal().toFixed(2)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}