export default function Home() {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="p-4 bg-[#E7CFCD] shadow-md">
        <ul className="flex space-x-8">
          <li className="hover:text-[#B5C9C3] cursor-pointer">Shop</li>
          <li className="hover:text-[#B5C9C3] cursor-pointer">Latest Products</li>
          <li className="hover:text-[#B5C9C3] cursor-pointer">Stores</li>
        </ul>
        <div className="ml-auto">
          {/* Placeholder for a potential search bar or user profile */}
          <input 
            type="text" 
            placeholder="Search..." 
            className="p-2 rounded border border-gray-300" 
          />
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex p-6 bg-[#CFD8D7]">
        {/* Product Filters Section */}
        <div className="w-64 p-4 bg-white rounded-lg shadow-md mr-8">
          <h3 className="text-lg font-semibold">Filters</h3>
          <p>* Here we will display product filters *</p>
          {/* Placeholder for filters */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Category</h4>
              <select className="p-2 border border-gray-300 rounded w-full">
                <option>All Categories</option>
                <option>Jewelry</option>
                <option>Clothing</option>
                <option>Home Goods</option>
              </select>
            </div>

            <div>
              <h4 className="font-medium">Price Range</h4>
              <input type="range" className="w-full" />
            </div>

            <div>
              <h4 className="font-medium">Rating</h4>
              <div className="flex space-x-2">
                <span>⭐️⭐️⭐️⭐️⭐️</span>
                <span>and up</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Display Section */}
        <div className="flex-grow p-4">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <p>* Here we will have all the products *</p>
          {/* Placeholder for future product components */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Product cards can be mapped here */}
            <div className="p-4 bg-[#B5C9C3] border rounded">Product 1</div>
            <div className="p-4 bg-[#B5C9C3] border rounded">Product 2</div>
            <div className="p-4 bg-[#B5C9C3] border rounded">Product 3</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 bg-[#CAB1BD] text-white text-center mt-auto">
        WDD 430 - Group 02 Project
      </footer>
    </>
  );
}
