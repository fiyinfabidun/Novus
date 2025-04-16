/* eslint-disable @next/next/no-html-link-for-pages */
export default function Footer() {
    return (
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">FakeStore</h3>
              <p className="text-gray-300 text-sm">
                A demonstration e-commerce platform showcasing frontend development skills using Next.js and the FakeStore API.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><a href="/products" className="hover:text-white">Products</a></li>
                <li><a href="/Cart" className="hover:text-white">Cart</a></li>
                <li><a href="/Login" className="hover:text-white">Login</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300 text-sm">
                Email: contact@fakestore.example<br />
                Phone: (123) 456-7890<br />
                Address: 123 E-Commerce St, Web Dev City
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
            <p>© 2025 FakeStore. This is a demo project.</p>
            <p>API provided by <a href="https://fakestoreapi.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">FakeStoreAPI</a></p>
          </div>
        </div>
      </footer>
    );
  }