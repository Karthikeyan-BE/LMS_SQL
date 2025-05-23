import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Edit3, Trash2 } from 'lucide-react';
// import './CSS/Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState({ bookName: "", bookAuthor: "" });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/books/all');
      setBooks(data.books || []);
    } catch (error) {
      toast.error("Failed to fetch books");
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setBookDetails({ ...bookDetails, [e.target.name]: e.target.value });
  };

  const handleAddBook = async () => {
    try {
      await axios.post('http://localhost:5000/books/create', bookDetails);
      toast.success("Book added successfully");
      setBookDetails({ bookName: "", bookAuthor: "" });
      fetchData();
    } catch (error) {
      toast.error("Failed to add book");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete the book.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/books/delete/${id}`);
        toast.success("Book deleted");
        fetchData();
      } catch (error) {
        toast.error("Failed to delete book");
        console.error(error);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:5000/books/update/${isUpdate}`, bookDetails);
      toast.success("Book updated");
      setBookDetails({ bookName: "", bookAuthor: "" });
      setIsUpdate(false);
      fetchData();
    } catch (error) {
      toast.error("Failed to update book");
      console.error(error);
    }
  };

  return (
    <>
      <div className="addbook">
        <div className="add">
          <input
            type="text"
            name="bookName"
            placeholder="Book Name"
            value={bookDetails.bookName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="bookAuthor"
            placeholder="Book Author"
            value={bookDetails.bookAuthor}
            onChange={handleInputChange}
          />
          <button className="btn btn-success" onClick={isUpdate ? handleUpdate : handleAddBook}>
            {isUpdate ? 'Update Book' : 'Add Book'}
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Book Id</th>
            <th>Book Name</th>
            <th>Book Author</th>
            <th>Availability</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookId}>
              <td>{book.bookId}</td>
              <td>{book.bookName}</td>
              <td>{book.bookAuthor}</td>
              <td className={book.availability ? 'avail' : 'unavail'}>
                {book.availability ? 'Available' : 'Unavailable'}
              </td>
              <td>
                <button
                  className="update-btn"
                  onClick={() => {
                    setIsUpdate(book.bookId);
                    setBookDetails({ bookName: book.bookName, bookAuthor: book.bookAuthor });
                  }}
                >
                  <Edit3 size={16} />
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(book.bookId)}>
                  <Trash2 size={16}  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Books;
