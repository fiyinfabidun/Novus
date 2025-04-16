'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BreadcrumbTrail() {
  const pathname = usePathname();
  
  if (pathname === '/') return null;
  
  // Generate breadcrumb segments
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    return {
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      href
    };
  });
  
  // Add home as first breadcrumb
  breadcrumbs.unshift({ name: 'Home', href: '/' });
  
  return (
    <nav className="bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex space-x-2 text-sm text-gray-600">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.href} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-400">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-indigo-600">{breadcrumb.name}</span>
              ) : (
                <motion.span whileHover={{ scale: 1.05 }}>
                  <Link href={breadcrumb.href} className="hover:text-indigo-500">
                    {breadcrumb.name}
                  </Link>
                </motion.span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}