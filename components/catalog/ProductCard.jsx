import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function ProductCard({ product, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-shadow"
        onClick={onClick}
      >
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl">🍔</span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge className="bg-white text-orange-600 font-bold">
              R$ {product.price.toFixed(2)}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description || "Produto delicioso"}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}