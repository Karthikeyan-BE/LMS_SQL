import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./SideBar";
import Books from "./Books";
import Fine from "./Fine";
import Borrowing from "./Borrowing";
import Members from "./Members";
import Reservation from "./Reservation";
import Home from "./Home";

const Library = () => {
  return (
    <Router>
      <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
        <Sidebar />
        <div
          className="flex-grow-1"
          style={{
            marginLeft: '260px', // prevents content from going under sidebar
            padding: '2rem',
            height: '100vh',
            overflowY: 'auto',
            backgroundColor: '#f0f2f5'
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/fine" element={<Fine />} />
            <Route path="/borrow" element={<Borrowing />} />
            <Route path="/members" element={<Members />} />
            <Route path="/reservation" element={<Reservation />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Library;
