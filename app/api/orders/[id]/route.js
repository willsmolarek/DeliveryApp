import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// PUT - Atualizar pedido
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updates = await request.json();
    
    const { rows } = await sql`
      UPDATE orders 
      SET 
        status = ${updates.status},
        updated_date = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar pedido' },
      { status: 500 }
    );
  }
}