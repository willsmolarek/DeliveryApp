import { sql } from '@vercel/postgres';

export async function createOrdersTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        status VARCHAR(50) NOT NULL DEFAULT 'novo',
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255),
        customer_phone VARCHAR(50),
        total DECIMAL(10,2) NOT NULL,
        items_count INTEGER NOT NULL,
        items JSONB,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Tabela orders criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar tabela:', error);
  }
}