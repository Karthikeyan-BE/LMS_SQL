import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { CalendarCheck, Trash2, Pencil } from 'lucide-react';


const ReservationComponent = () => {
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    bookId: '',
    borrowDate: '',
    returnDate: '',
  });
  const [editingId, setEditingId] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/reservations');
      setReservations(response.data);
    } catch (error) {
      toast.error('Failed to fetch reservations');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/reservations/${editingId}`, formData);
        toast.success('Reservation updated successfully');
      } else {
        await axios.post('http://localhost:5000/reservations', formData);
        toast.success('Reservation created successfully');
      }
      setFormData({ userId: '', bookId: '', borrowDate: '', returnDate: '' });
      setEditingId(null);
      fetchReservations();
    } catch (error) {
      toast.error('Error submitting reservation');
    }
  };

  const handleEdit = (reservation) => {
    setFormData({
      userId: reservation.userId,
      bookId: reservation.bookId,
      borrowDate: reservation.borrowDate.split('T')[0],
      returnDate: reservation.returnDate.split('T')[0],
    });
    setEditingId(reservation.reservationId);
    // console.log(editingId)
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this reservation!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });
    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:5000/reservations/${id}`);
        console.log(res.data);
        
        toast.success('Reservation deleted successfully');
        fetchReservations();
      } catch (error) {
        toast.error('Error deleting reservation');
      }
    }
  };

  return (
    <div className="container mt-5">
      <Toaster />
      <h3 className="mb-4">
        <CalendarCheck className="me-2" /> Reservation Management
      </h3>
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <input type="text" name="userId" className="form-control" placeholder="User ID" value={formData.userId} onChange={handleChange} required />
          </div>
          <div className="col">
            <input type="text" name="bookId" className="form-control" placeholder="Book ID" value={formData.bookId} onChange={handleChange} required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input type="date" name="borrowDate" className="form-control" value={formData.borrowDate} onChange={handleChange} required />
          </div>
          <div className="col">
            <input type="date" name="returnDate" className="form-control" value={formData.returnDate} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {editingId ? 'Update' : 'Create'} Reservation
        </button>
      </form>

      <h5>All Reservations</h5>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Book ID</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.reservationId}>
              <td>{res.reservationId}</td>
              <td>{res.userId}</td>
              <td>{res.bookId}</td>
              <td>{new Date(res.borrowDate).toLocaleDateString()}</td>
              <td>{new Date(res.returnDate).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(res)}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(res.reservationId)}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationComponent;
