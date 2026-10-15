import { NextResponse } from 'next/server';
import { initialStudioData } from '@/data/admin/seed';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: initialStudioData,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Studio data payload received for server-side persistence',
      received: body,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }
}
