import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/d1';
import { nanoid } from 'nanoid';

// Fake data untuk reviews
const fakeReviews = [
  {
    id: nanoid(),
    carId: 'dummy-car-1', // Dummy carId, akan dihubungkan nanti
    userId: null,
    userName: 'Budi Santoso',
    comment: 'Mobil sangat bersih dan sopirnya ramah. Perjalanan dari airport ke hotel sangat nyaman. Harga sesuai dengan pelayanan yang diberikan.',
    rating: 5,
    isVerified: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: nanoid(),
    carId: 'dummy-car-2',
    userId: null,
    userName: 'Sarah Johnson',
    comment: 'Great service! The driver was punctual and very helpful with our luggage. Car was comfortable for our family of 4.',
    rating: 5,
    isVerified: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: nanoid(),
    carId: 'dummy-car-3',
    userId: null,
    userName: 'Chen Wei',
    comment: '司机很专业，车况很好，10小时行程很充实。推荐给要去巴厘岛的朋友们！',
    rating: 4,
    isVerified: false,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: nanoid(),
    carId: 'dummy-car-1',
    userId: null,
    userName: 'Kim Min-jun',
    comment: '발리 여행 때 정말 편리했습니다. 운전기사님도 친절하고 차도 깨끗해서 만족했습니다. 다음에도 이용하고 싶어요.',
    rating: 5,
    isVerified: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: nanoid(),
    carId: 'dummy-car-2',
    userId: null,
    userName: 'Ahmed Hassan',
    comment: 'خدمة ممتازة والسائق محترم جداً. السيارة نظيفة ومريحة للرحلات الطويلة. أنصح بشدة بالتعامل معهم.',
    rating: 5,
    isVerified: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: nanoid(),
    carId: 'dummy-car-3',
    userId: null,
    userName: 'Maria Silva',
    comment: 'Excelente serviço! O motorista foi muito prestativo e nos levou para os melhores lugares de Bali. Carro confortável e limpo.',
    rating: 4,
    isVerified: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: nanoid(),
    carId: 'dummy-car-1',
    userId: null,
    userName: 'Alex Turner',
    comment: 'Good value for money. Driver knows Bali well and suggested some great spots. Car was a bit small for our group but manageable.',
    rating: 4,
    isVerified: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: nanoid(),
    carId: 'dummy-car-2',
    userId: null,
    userName: 'Yuki Tanaka',
    comment: 'バリ島観光に大変役立ちました。運転手さんも親切で、おすすめの場所に連れて行ってくれました。車も綺麗で快適でした。',
    rating: 5,
    isVerified: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: nanoid(),
    carId: 'dummy-car-3',
    userId: null,
    userName: 'Mohammed Al-Rashid',
    comment: 'خدمة رائعة والسائق محترف جداً. أوصي به بشدة لزيارة بالي. السيارة مريحة ومناسبة للعائلة.',
    rating: 5,
    isVerified: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: nanoid(),
    carId: 'dummy-car-1',
    userId: null,
    userName: 'Lisa Anderson',
    comment: 'Perfect for our Bali tour! 10 hours was enough to see most attractions. Driver was knowledgeable about local culture and history.',
    rating: 5,
    isVerified: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
];

export async function POST() {
  try {
    console.log('🌱 Starting GiorBaliTour review seeding...');
    
    const db = await getDB();
    
    // Check if reviews already exist
    const existingReviews = await db.prepare('SELECT COUNT(*) as count FROM reviews').get();
    const reviewCount = existingReviews?.count || 0;
    
    if (reviewCount > 0) {
      return NextResponse.json({
        success: true,
        message: `Reviews already exist (${reviewCount} reviews). Skipping seeding.`,
        existingCount: reviewCount,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Insert fake reviews
    let insertedCount = 0;
    for (const review of fakeReviews) {
      try {
        await db.prepare(`
          INSERT INTO reviews (
            id, car_id, user_id, user_name, comment, rating, 
            is_verified, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          review.id,
          review.carId,
          review.userId,
          review.userName,
          review.comment,
          review.rating,
          review.isVerified ? 1 : 0,
          Math.floor(review.createdAt.getTime() / 1000),
          Math.floor(review.updatedAt.getTime() / 1000)
        ).run();
        
        insertedCount++;
      } catch (error) {
        console.error(`Error inserting review ${review.id}:`, error);
      }
    }
    
    console.log(`✅ Successfully inserted ${insertedCount} fake reviews`);
    
    return NextResponse.json({
      success: true,
      message: 'GiorBaliTour review seeding completed',
      insertedCount,
      totalReviews: fakeReviews.length,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('❌ Review seeding failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Review seeding failed',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    console.log('📊 Getting review statistics...');
    
    const db = await getDB();
    
    // Get review count
    const reviewCount = await db.prepare('SELECT COUNT(*) as count FROM reviews').get();
    
    // Get rating distribution
    const ratingDist = await db.prepare(`
      SELECT rating, COUNT(*) as count 
      FROM reviews 
      GROUP BY rating 
      ORDER BY rating
    `).all();
    
    // Get recent reviews
    const recentReviews = await db.prepare(`
      SELECT user_name, rating, comment, created_at 
      FROM reviews 
      ORDER BY created_at DESC 
      LIMIT 5
    `).all();
    
    return NextResponse.json({
      success: true,
      data: {
        totalReviews: reviewCount?.count || 0,
        ratingDistribution: ratingDist.results || [],
        recentReviews: recentReviews.results || [],
      },
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('❌ Error getting review stats:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}