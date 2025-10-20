{
  "name": "Product",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Nome do produto"
    },
    "description": {
      "type": "string",
      "description": "Descrição detalhada do produto"
    },
    "price": {
      "type": "number",
      "description": "Preço do produto"
    },
    "image_url": {
      "type": "string",
      "description": "URL da imagem do produto"
    },
    "category": {
      "type": "string",
      "enum": [
        "burgers",
        "pizzas",
        "bebidas",
        "sobremesas",
        "acompanhamentos"
      ],
      "description": "Categoria do produto"
    },
    "available": {
      "type": "boolean",
      "default": true,
      "description": "Produto disponível para venda"
    },
    "extras": {
      "type": "array",
      "description": "Adicionais disponíveis",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "price": {
            "type": "number"
          }
        }
      }
    }
  },
  "required": [
    "name",
    "price",
    "category"
  ]
}