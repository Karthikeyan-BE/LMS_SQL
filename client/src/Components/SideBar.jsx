import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Book,
  Calendar,
  Users,
  DollarSign,
  Bookmark,
  Library
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Library', icon: <Library size={20} /> },
    { path: '/books', label: 'Books', icon: <Book size={20} /> },
    { path: '/borrow', label: 'Borrowing', icon: <Calendar size={20} /> },
    { path: '/members', label: 'Members', icon: <Users size={20} /> },
    { path: '/fine', label: 'Fine', icon: <DollarSign size={20} /> },
    { path: '/reservation', label: 'Reservation', icon: <Bookmark size={20} /> },
  ];

  return (
    <div
      className="bg-dark text-white position-fixed top-0 start-0 p-4"
      style={{ width: '260px', height: '100vh', overflowY: 'auto' }}
    >
      <div className="mb-4 fs-4 fw-bold">Library System</div>
      <ul className="nav nav-pills flex-column gap-2">
        {navItems.map(({ path, label, icon }) => (
          <li key={path} className="nav-item">
            <Link
              to={path}
              className={`nav-link d-flex align-items-center gap-3 px-3 py-2 rounded ${
                location.pathname === path ? 'active bg-primary text-white' : 'text-white'
              }`}
            >
              {icon}
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
