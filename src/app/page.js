'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="bg-white">
      <main>
        {/* Hero section with animations */}
        <div className='h-screen flex justify-center items-center flex-col text-center her'>
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <motion.h1 
              className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="block text-white">Welcome to Novus Store</span>
              <motion.span 
                className="block text-indigo-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Shop the latest products
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Browse our collection of high-quality products at affordable prices.
            </motion.p>
            
            <motion.div 
              className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                <Link
                  href="/products"
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                >
                  Browse Products
                </Link>
                <Link
                  href="/Login"
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 sm:px-8"
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Rest of the content remains the same */}
        <div className='grid grid-col-1 lg:grid-cols-2'>
            <div className='flex space-y-6 flex-col text-gray-900 p-10'>
              <motion.h2 
                className='text-4xl font-extrabold'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Introducing Best Quality Items
              </motion.h2>
              <motion.p 
                className='text-gray-500 lg:w-3/4'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              > 
                Step into your style era. At NOVUS, we believe fashion is more than fabric — it&apos;s a statement, a story, a lifestyle. From timeless classics to bold new drops, every piece in our collection is curated to elevate your everyday look. Dress like you mean it.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  href="/products"
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-400 sm:px-8 w-fit"
                >
                  Browse Products
                </Link>
              </motion.div>
            </div>
            <div className='gridbgr p-20'></div>
        </div>

        {/* Logo/Features section */}
        <div className="bg-gray-100 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <motion.h2 
                className="text-base text-indigo-600 font-semibold tracking-wide uppercase"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Features
              </motion.h2>
              <motion.p 
                className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Everything you need in one place
              </motion.p>
              <motion.p 
                className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Our platform offers a seamless shopping experience with easy navigation and secure checkout.
              </motion.p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {/* Feature items remain the same */}
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Wide Selection</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Browse through our extensive collection of products from various categories.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure Checkout</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Your payment information is always secure with our advanced encryption.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Fast Delivery</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Get your products delivered quickly with our efficient shipping partners.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">24/7 Support</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Our customer support team is always ready to assist you with any queries.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className='grid grid-col-1 lg:grid-cols-2'>
            <div className='gridbg p-20'></div>
            <div className='flex space-y-6 flex-col text-gray-900 p-10'>
              <motion.h2 
                className='text-4xl font-extrabold'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Introducing Best Quality Items
              </motion.h2>
              <motion.p 
                className='text-gray-500 lg:w-3/4'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              > 
                Step into your style era. At NOVUS, we believe fashion is more than fabric — it&apos;s a statement, a story, a lifestyle. From timeless classics to bold new drops, every piece in our collection is curated to elevate your everyday look. Dress like you mean it.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  href="/products"
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-400 sm:px-8 w-fit"
                >
                  Browse Products
                </Link>
              </motion.div>
            </div>
        </div>
      </main>
    </div>
  );
}