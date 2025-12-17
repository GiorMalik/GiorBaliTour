'use client';

import { useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function AuthStatus() {
  const t = useTranslations('auth');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession();
        setSession(sessionData);
      } catch (error) {
        console.error('Failed to fetch session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      setSession(null);
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        <span className="text-sm text-gray-600">{t('loading', 'Loading...')}</span>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {session.user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-gray-900">{session.user?.name}</div>
            <div className="text-xs text-gray-500">{session.user?.email}</div>
          </div>
        </div>
        
        <button
          onClick={handleSignOut}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t('signOut', 'Sign out')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <a
        href={`${pathname}/login`}
        className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {t('signIn', 'Sign in')}
      </a>
      <a
        href={`${pathname}/register`}
        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {t('signUp', 'Sign up')}
      </a>
    </div>
  );
}