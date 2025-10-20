import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";

const CATEGORIES = ["burgers", "pizzas", "bebidas", "sobremesas", "acompanhamentos"];

export default function ProductFormModal({ product, onClose, onSuccess }) {
  const [formData, setFormData] = useState(product || {
    name: "",
    description: "",
    price: 0,
    image_url: "",
    category: "burgers",
    available: true,
    extras: []
  });

  const [newExtra, setNewExtra] = useState({ name: "", price: 0 });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Product.create(data),
    onSuccess,
  });

  const updateMutation = useMutation({
    mutationFn: (data) => base44.entities.Product.update(product.id, data),
    onSuccess,
  });

  const handleSubmit = () => {
    if (product) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const addExtra = () => {
    if (newExtra.name && newExtra.price > 0) {
      setFormData({
        ...formData,
        extras: [...(formData.extras || []), newExtra]
      });
      setNewExtra({ name: "", price: 0 });
    }
  };

  const removeExtra = (index) => {
    setFormData({
      ...formData,
      extras: formData.extras.filter((_, i) => i !== index)
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Nome</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <Label>Descrição</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Preço (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label>Categoria</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>URL da Imagem</Label>
            <Input
              value={formData.image_url}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={formData.available}
              onCheckedChange={(checked) => setFormData({...formData, available: checked})}
            />
            <Label>Produto disponível</Label>
          </div>

          {/* Extras */}
          <div>
            <Label className="mb-2 block">Adicionais</Label>
            {formData.extras?.map((extra, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input value={extra.name} disabled className="flex-1" />
                <Input value={`R$ ${extra.price.toFixed(2)}`} disabled className="w-32" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExtra(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
            
            <div className="flex items-center gap-2 mt-2">
              <Input
                placeholder="Nome do adicional"
                value={newExtra.name}
                onChange={(e) => setNewExtra({...newExtra, name: e.target.value})}
                className="flex-1"
              />
              <Input
                type="number"
                step="0.01"
                placeholder="Preço"
                value={newExtra.price}
                onChange={(e) => setNewExtra({...newExtra, price: parseFloat(e.target.value)})}
                className="w-32"
              />
              <Button onClick={addExtra} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Salvando..."
                : product ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}