'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import BreadcrumbTrail from '@/components/layout/BreadCrumbTrail';
import PageHeader from '@/components/layout/PageHeader';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import ErrorMessage from '@/components/layout/ErrorMessage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  );
}

function ProfilePageContent() {
  const { user, loading, error } = useAuth();
  
  if (loading) {
    return (
      <div>
        <BreadcrumbTrail />
        <PageHeader title="User Profile" />
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div>
        <BreadcrumbTrail />
        <PageHeader title="User Profile" />
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ErrorMessage message={error} />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <BreadcrumbTrail />
      <PageHeader title="User Profile" />
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-white shadow overflow-hidden sm:rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                  {user.name?.firstname?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {user.name?.firstname} {user.name?.lastname || ''}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Username
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.username}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.name?.firstname} {user.name?.lastname || ''}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.email}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.phone || 'N/A'}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.address ? (
                      <>
                        {user.address.street}, {user.address.city}<br />
                        {user.address.zipcode}
                      </>
                    ) : 'N/A'}
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}