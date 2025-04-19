// components/ProtectedRoute.tsx
'use client'
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Don't render anything while loading or if not authenticated
  if (loading || !user) {
    return null;
  }

  // User is authenticated, render the children
  return <>{children}</>;
}