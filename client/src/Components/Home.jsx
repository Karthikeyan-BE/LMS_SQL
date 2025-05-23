import React from 'react';
import { Book, Users, Calendar, DollarSign, Bookmark } from 'lucide-react';

const Home = () => {
  const features = [
    { icon: <Book size={32} />, title: 'Books', desc: 'Browse, add, edit, or remove books in the library.' },
    { icon: <Users size={32} />, title: 'Members', desc: 'Register new members and manage existing profiles.' },
    { icon: <Calendar size={32} />, title: 'Borrowing', desc: 'Monitor issued books and track return dates.' },
    { icon: <DollarSign size={32} />, title: 'Fines', desc: 'View, calculate, and clear overdue fines.' },
    { icon: <Bookmark size={32} />, title: 'Reservations', desc: 'Allow users to reserve books in advance.' },
  ];

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">📚 Welcome to the Library Management System</h1>
        <p className="lead text-muted">
          Simplifying library operations—manage books, members, and transactions effortlessly.
        </p>
      </div>

      {/* Features Section */}
      <div className="row g-4 mb-5">
        {features.map((feature, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column align-items-start">
                <div className="mb-3 text-primary">{feature.icon}</div>
                <h5 className="card-title fw-semibold">{feature.title}</h5>
                <p className="card-text text-muted">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Footer Section */}
      <div className="text-center text-muted small pt-3 border-top">
        <p className="mb-0">© {new Date().getFullYear()} Library Management System. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
