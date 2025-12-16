import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">🌍 TravelPlanner</h1>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/trips" className="nav-link">My Trips</Link>
      </nav>
    </header>
  );
};

export default Header;