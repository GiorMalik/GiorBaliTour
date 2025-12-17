import { getDB } from '../src/lib/db';
import { reviews } from '../src/schema';

// Test script untuk memverifikasi database seeding
export async function testDatabase() {
  try {
    console.log('🧪 Testing database connection and data...');
    
    const db = await getDB();
    
    // Test basic connection
    console.log('✅ Database connection successful');
    
    // Test reviews data
    const allReviews = await db.select().from(reviews);
    console.log(`✅ Found ${allReviews.length} reviews in database`);
    
    // Display sample reviews
    console.log('\n📝 Sample Reviews:');
    allReviews.slice(0, 3).forEach((review, index) => {
      console.log(`${index + 1}. ${review.userName} - Rating: ${review.rating}/5`);
      console.log(`   ${review.comment.substring(0, 100)}...`);
      console.log(`   Created: ${new Date(review.createdAt).toLocaleString()}`);
      console.log('');
    });
    
    console.log('🎉 Database test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error testing database:', error);
    throw error;
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}