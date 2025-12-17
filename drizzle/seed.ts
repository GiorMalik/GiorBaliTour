import { getDB } from '../src/lib/db';
import { users, cars, reviews } from '../src/schema';
import { faker } from '@faker-js/faker';

// Fake data untuk seeding
const fakeReviews = [
  {
    userName: 'John Smith',
    comment: 'Excellent service! The car was clean and comfortable. Driver was very professional and knew all the best spots in Bali.',
    rating: 5,
  },
  {
    userName: 'Maria Rodriguez',
    comment: 'Great experience with GiorBaliTour. The car was well-maintained and the driver was punctual. Would definitely recommend!',
    rating: 4,
  },
  {
    userName: 'Ahmad Hassan',
    comment: 'Perfect for our family trip. Spacious car and friendly driver. Made our Bali vacation memorable.',
    rating: 5,
  },
  {
    userName: 'Sophie Laurent',
    comment: 'Good value for money. Car was clean and driver was helpful. The 10-hour duration was perfect for our sightseeing.',
    rating: 4,
  },
  {
    userName: 'Li Wei',
    comment: 'Outstanding service! Driver spoke good English and suggested amazing restaurants. Car was comfortable for long trips.',
    rating: 5,
  },
  {
    userName: 'Emma Johnson',
    comment: 'Very professional service. Car arrived on time and was in excellent condition. Driver was knowledgeable about Bali.',
    rating: 5,
  },
  {
    userName: 'Carlos Mendez',
    comment: 'Good experience overall. Car was comfortable and driver was polite. Slightly expensive but worth the service.',
    rating: 4,
  },
  {
    userName: 'Yuki Tanaka',
    comment: 'Amazing service! Driver took us to hidden gems we would have never found. Car was clean and air-conditioned.',
    rating: 5,
  },
  {
    userName: 'Priya Sharma',
    comment: 'Excellent choice for Bali tour. Driver was safe and courteous. Car was perfect for our group of 4.',
    rating: 4,
  },
  {
    userName: 'Michael Brown',
    comment: 'Professional and reliable. Driver was flexible with our schedule and car was very comfortable. Highly recommend!',
    rating: 5,
  },
];

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    const db = await getDB();
    
    // Check if reviews already exist
    const existingReviews = await db.select().from(reviews).limit(1);
    if (existingReviews.length > 0) {
      console.log('✅ Database already seeded. Skipping...');
      return;
    }
    
    // Create fake reviews with dummy carId (will be updated when cars are added)
    console.log('📝 Creating fake reviews...');
    
    const reviewData = fakeReviews.map((review, index) => ({
      ...review,
      carId: null, // No car association for now
      userId: null, // No user association for now
    }));
    
    await db.insert(reviews).values(reviewData);
    
    console.log(`✅ Successfully seeded ${reviewData.length} reviews`);
    console.log('🎉 Database seeding completed!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}