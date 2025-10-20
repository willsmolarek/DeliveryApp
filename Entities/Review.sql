{
  "name": "Review",
  "type": "object",
  "properties": {
    "order_id": {
      "type": "string",
      "description": "ID do pedido avaliado"
    },
    "user_email": {
      "type": "string",
      "description": "Email do cliente"
    },
    "rating": {
      "type": "number",
      "minimum": 1,
      "maximum": 5,
      "description": "Nota de 1 a 5"
    },
    "comment": {
      "type": "string",
      "description": "Comentário da avaliação"
    }
  },
  "required": [
    "order_id",
    "user_email",
    "rating"
  ]
}