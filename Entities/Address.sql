{
  "name": "Address",
  "type": "object",
  "properties": {
    "user_email": {
      "type": "string",
      "description": "Email do usuário"
    },
    "label": {
      "type": "string",
      "description": "Nome do endereço (ex: Casa, Trabalho)"
    },
    "cep": {
      "type": "string"
    },
    "street": {
      "type": "string"
    },
    "number": {
      "type": "string"
    },
    "complement": {
      "type": "string"
    },
    "neighborhood": {
      "type": "string"
    },
    "city": {
      "type": "string"
    },
    "state": {
      "type": "string"
    },
    "is_default": {
      "type": "boolean",
      "default": false
    }
  },
  "required": [
    "user_email",
    "cep",
    "street",
    "number",
    "city",
    "state"
  ]
}