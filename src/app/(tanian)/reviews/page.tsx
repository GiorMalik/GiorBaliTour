'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getDB } from '@/lib/d1';
import { useRouter } from 'next/navigation';

interface Review {
  id: string;
  carId: string;
  userId: string | null;
  userName: string;
  comment: string;
  rating: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Car {
  id: string;
  name: string;
  capacity: number;
  transmission: 'manual' | 'automatic';
  pricePerDay: number;
  imageFilename: string;
  description: string;
  available: boolean;
}

export default function AdminReviewsPage() {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState({
    carId: '',
    rating: '',
    verified: ''
  });

  useEffect(() => {
    fetchReviews();
    fetchCars();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      const data = await response.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await fetch('/api/cars');
      const data = await response.json();
      if (data.success) {
        setCars(data.cars);
      }
    } catch (error) {
      console.error('Failed to fetch cars:', error);
    }
  };

  const handleVerifyReview = async (reviewId: string) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}/verify`, {
        method: 'PUT',
      });
      
      const data = await response.json();
      if (data.success) {
        setMessage('Review verified successfully!');
        fetchReviews();
      } else {
        setMessage(data.message || 'Failed to verify review');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      if (data.success) {
        setMessage('Review deleted successfully!');
        fetchReviews();
      } else {
        setMessage(data.message || 'Failed to delete review');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter.carId && review.carId !== filter.carId) return false;
    if (filter.rating && review.rating !== parseInt(filter.rating)) return false;
    if (filter.verified && filter.verified === 'verified' && !review.isVerified) return false;
    if (filter.verified === 'unverified' && review.isVerified) return false;
    return true;
  });

  const getCarName = (carId: string) => {
    const car = cars.find(c => c.id === carId);
    return car ? car.name : 'Unknown Car';
  };

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Reviews</h2>
        <p className="text-gray-600">Moderate and manage customer reviews for your cars.</p>
      </div>

      {message && (
        <div className={`mb-4 p-4 rounded-md ${
          message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Filter Reviews</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Car
            </label>
            <select
              value={filter.carId}
              onChange={(e) => setFilter({...filter, carId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Cars</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <select
              value={filter.rating}
              onChange={(e) => setFilter({...filter, rating: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filter.verified}
              onChange={(e) => setFilter({...filter, verified: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Reviews</option>
              <option value="verified">Verified Only</option>
              <option value="unverified">Unverified Only</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => setFilter({ carId: '', rating: '', verified: '' })}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Car
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.map((review) => (
                <tr key={review.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{review.userName}</div>
                      <div className="text-gray-500 text-xs">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getCarName(review.carId)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      {getRatingStars(review.rating)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {review.comment}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      review.isVerified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {review.isVerified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {!review.isVerified && (
                      <button
                        onClick={() => handleVerifyReview(review.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Verify
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredReviews.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No reviews found matching your filters.
            </div>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Reviews</h3>
          <div className="text-3xl font-bold text-blue-600">{reviews.length}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Reviews</h3>
          <div className="text-3xl font-bold text-green-600">
            {reviews.filter(r => r.isVerified).length}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Reviews</h3>
          <div className="text-3xl font-bold text-yellow-600">
            {reviews.filter(r => !r.isVerified).length}
          </div>
        </div>
      </div>
    </div>
  );
}