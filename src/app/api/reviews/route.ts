import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDB } from '@/lib/d1';

export async function GET(request: NextRequest) {
  try {
    const db = await getDB();
    
    const reviews = await db.prepare(`
      SELECT r.*, c.name as car_name 
      FROM reviews r 
      LEFT JOIN cars c ON r.car_id = c.id 
      ORDER BY r.created_at DESC
    `).all();
    
    return NextResponse.json({
      success: true,
      reviews: reviews.results || [],
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Failed to fetch reviews',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized',
        message: 'Admin access required'
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const reviewId = searchParams.get('id');

    if (!reviewId) {
      return NextResponse.json({
        success: false,
        error: 'Review ID is required',
        message: 'Review ID is required'
      }, { status: 400 });
    }

    const db = await getDB();
    const now = Math.floor(Date.now() / 1000);

    await db.prepare(`
      UPDATE reviews 
      SET is_verified = 1, updated_at = ?
      WHERE id = ?
    `).bind(now, reviewId).run();

    console.log(`✅ Review verified: ${reviewId}`);

    return NextResponse.json({
      success: true,
      message: 'Review verified successfully',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Failed to verify review:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Failed to verify review',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized',
        message: 'Admin access required'
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const reviewId = searchParams.get('id');

    if (!reviewId) {
      return NextResponse.json({
        success: false,
        error: 'Review ID is required',
        message: 'Review ID is required'
      }, { status: 400 });
    }

    const db = await getDB();

    await db.prepare('DELETE FROM reviews WHERE id = ?').bind(reviewId).run();

    console.log(`✅ Review deleted: ${reviewId}`);

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Failed to delete review:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Failed to delete review',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}