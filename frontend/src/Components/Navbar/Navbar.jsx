import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">SocialApp</Link>
      </div>
      
      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
      </div>
      
      <div className="navbar-links">
        <Link to={`/profile/${user.id}`}>
          <img src={user.avatar || '/default-avatar.png'} alt="Profile" className="nav-avatar" />
          <span>{user.name}</span>
        </Link>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;