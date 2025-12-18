import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDB } from '@/lib/d1';
import { nanoid } from 'nanoid';

export async function GET(request: NextRequest) {
  try {
    const db = await getDB();
    
    const cars = await db.prepare('SELECT * FROM cars ORDER BY created_at DESC').all();
    
    return NextResponse.json({
      success: true,
      cars: cars.results || [],
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Failed to fetch cars:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Failed to fetch cars',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized',
        message: 'Admin access required'
      }, { status: 401 });
    }

    const { name, capacity, transmission, pricePerDay, imageFilename, description, available } = await request.json();

    // Validation
    if (!name || !capacity || !transmission || !pricePerDay || !imageFilename) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        message: 'All fields are required'
      }, { status: 400 });
    }

    const db = await getDB();
    const carId = nanoid();
    const now = Math.floor(Date.now() / 1000);

    await db.prepare(`
      INSERT INTO cars (id, name, capacity, transmission, price_per_day, image_filename, description, available, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(carId, name, capacity, transmission, pricePerDay, imageFilename, description, available ? 1 : 0, now, now).run();

    console.log(`✅ Car created: ${name}`);

    return NextResponse.json({
      success: true,
      message: 'Car created successfully',
      car: {
        id: carId,
        name,
        capacity,
        transmission,
        pricePerDay,
        imageFilename,
        description,
        available
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Failed to create car:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Failed to create car',
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

    const { id, name, capacity, transmission, pricePerDay, imageFilename, description, available } = await request.json();

    if (!id || !name || !capacity || !transmission || !pricePerDay || !imageFilename) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        message: 'All fields are required'
      }, { status: 400 });
    }

    const db = await getDB();
    const now = Math.floor(Date.now() / 1000);

    await db.prepare(`
      UPDATE cars 
      SET name = ?, capacity = ?, transmission = ?, price_per_day = ?, image_filename = ?, description = ?, available = ?, updated_at = ?
      WHERE id = ?
    `).bind(name, capacity, transmission, pricePerDay, imageFilename, description, available ? 1 : 0, now, id).run();

    console.log(`✅ Car updated: ${name}`);

    return NextResponse.json({
      success: true,
      message: 'Car updated successfully',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Failed to update car:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Failed to update car',
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
    const carId = searchParams.get('id');

    if (!carId) {
      return NextResponse.json({
        success: false,
        error: 'Car ID is required',
        message: 'Car ID is required'
      }, { status: 400 });
    }

    const db = await getDB();

    await db.prepare('DELETE FROM cars WHERE id = ?').bind(carId).run();

    console.log(`✅ Car deleted: ${carId}`);

    return NextResponse.json({
      success: true,
      message: 'Car deleted successfully',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Failed to delete car:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Failed to delete car',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}