'use client';

import { useState, useEffect } from 'react';

interface DatabaseStatus {
  success: boolean;
  message: string;
  tables?: string[];
  testResults?: Record<string, any>;
  timestamp: string;
}

interface ReviewStats {
  totalReviews: number;
  ratingDistribution: Array<{ rating: number; count: number }>;
  recentReviews: Array<{
    user_name: string;
    rating: number;
    comment: string;
    created_at: number;
  }>;
}

export default function DatabaseTestPage() {
  const [dbStatus, setDbStatus] = useState<DatabaseStatus | null>(null);
  const [reviewStats, setReviewStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(false);

  const testDatabase = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/db/init');
      const data = await response.json();
      setDbStatus(data);
    } catch (error) {
      setDbStatus({
        success: false,
        message: `Error: ${error.message}`,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const initDatabase = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/db/init', { method: 'POST' });
      const data = await response.json();
      setDbStatus(data);
      
      // Refresh status after init
      setTimeout(testDatabase, 1000);
    } catch (error) {
      setDbStatus({
        success: false,
        message: `Error: ${error.message}`,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const seedReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/db/seed', { method: 'POST' });
      const data = await response.json();
      console.log('Seeding result:', data);
      
      // Refresh review stats after seeding
      setTimeout(getReviewStats, 1000);
    } catch (error) {
      console.error('Seeding error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getReviewStats = async () => {
    try {
      const response = await fetch('/api/db/seed');
      const data = await response.json();
      if (data.success) {
        setReviewStats(data.data);
      }
    } catch (error) {
      console.error('Error getting review stats:', error);
    }
  };

  useEffect(() => {
    testDatabase();
    getReviewStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          GiorBaliTour Database Testing
        </h1>

        {/* Database Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Database Connection Status</h2>
          
          <div className="flex gap-4 mb-4">
            <button
              onClick={testDatabase}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Test Connection
            </button>
            <button
              onClick={initDatabase}
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              Initialize Database
            </button>
            <button
              onClick={seedReviews}
              disabled={loading}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
            >
              Seed Reviews
            </button>
          </div>

          {dbStatus && (
            <div className={`p-4 rounded ${dbStatus.success ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
              <p className={`font-semibold ${dbStatus.success ? 'text-green-800' : 'text-red-800'}`}>
                {dbStatus.success ? '✅' : '❌'} {dbStatus.message}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Last checked: {new Date(dbStatus.timestamp).toLocaleString()}
              </p>
              
              {dbStatus.tables && (
                <div className="mt-3">
                  <p className="font-medium">Tables found: {dbStatus.tables.join(', ')}</p>
                </div>
              )}
              
              {dbStatus.testResults && (
                <div className="mt-3">
                  <p className="font-medium">Table Records:</p>
                  <pre className="text-xs bg-gray-100 p-2 rounded mt-1">
                    {JSON.stringify(dbStatus.testResults, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Review Statistics */}
        {reviewStats && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Review Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Total Reviews: {reviewStats.totalReviews}</h3>
                
                {reviewStats.ratingDistribution.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Rating Distribution:</h4>
                    {reviewStats.ratingDistribution.map(item => (
                      <div key={item.rating} className="flex items-center gap-2 mb-1">
                        <span className="w-12">{item.rating} ⭐:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-4">
                          <div 
                            className="bg-yellow-400 h-4 rounded-full" 
                            style={{ width: `${(item.count / reviewStats.totalReviews) * 100}%` }}
                          />
                        </div>
                        <span className="w-8 text-right">{item.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Recent Reviews:</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {reviewStats.recentReviews.map((review, index) => (
                    <div key={index} className="border-b pb-2">
                      <div className="flex justify-between items-start">
                        <span className="font-medium">{review.user_name}</span>
                        <span>{review.rating} ⭐</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(review.created_at * 1000).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🚀 Next Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click "Test Connection" to verify D1 database connection</li>
            <li>Click "Initialize Database" to create tables (users, cars, reviews)</li>
            <li>Click "Seed Reviews" to add fake review data</li>
            <li>Check review statistics to verify data insertion</li>
            <li>Proceed to next step: Langkah 0.5 (Download Gambar) or Langkah 2 (Internasionalisasi)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}