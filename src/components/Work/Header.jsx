import { Link, useLocation } from 'react-router-dom';
const Header = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50">
      <div className="glass-effect mx-4 md:mx-8 my-4">
        <div className="flex flex-col md:flex-row justify-between items-center p-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="gradient-text"> TravelPlanner</span>
            </h1>
            <p className="text-white/80 text-sm mt-1">Plan your perfect journey</p>
          </div>
          
          <nav className="flex space-x-2 bg-black/10 rounded-full p-1 backdrop-blur-sm">
            <Link 
              to="/" 
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                location.pathname === '/' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              🏠 Home
            </Link>
            <Link 
              to="/trips" 
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                location.pathname === '/trips' 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              📋 My Trips
            </Link>
            <Link 
              to="/trip/1" 
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                location.pathname.includes('/trip') 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              🗺️ Trip Details
            </Link>
          </nav>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm hover:shadow-lg transition-shadow">
              + New Trip
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;