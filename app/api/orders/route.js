import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// GET - Buscar todos os pedidos
export async function GET() {
  try {
    const { rows } = await sql`
      SELECT * FROM orders 
      ORDER BY created_date DESC
    `;
    
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar pedidos' },
      { status: 500 }
    );
  }
}

// POST - Criar novo pedido
export async function POST(request) {
  try {
    const order = await request.json();
    
    const { rows } = await sql`
      INSERT INTO orders (status, customer_name, customer_email, customer_phone, total, items_count, items)
      VALUES (${order.status}, ${order.customer_name}, ${order.customer_email}, ${order.customer_phone}, ${order.total}, ${order.items_count}, ${order.items})
      RETURNING *
    `;
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar pedido' },
      { status: 500 }
    );
  }
}