import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.POSTGRES_URL);

export async function GET() {
  try {
    const orders = await sql`SELECT * FROM orders ORDER BY created_date DESC`;
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar pedidos' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const order = await request.json();
    
    const result = await sql`
      INSERT INTO orders (status, customer_name, customer_email, customer_phone, total, items_count, items)
      VALUES (${order.status}, ${order.customer_name}, ${order.customer_email}, ${order.customer_phone}, ${order.total}, ${order.items_count}, ${order.items})
      RETURNING *
    `;
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return NextResponse.json(
      { error: 'Erro ao criar pedido' },
      { status: 500 }
    );
  }
}