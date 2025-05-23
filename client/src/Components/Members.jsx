import React, { useEffect, useState } from 'react';
import './CSS/Books.css';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Members = () => {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState({ name: "", email: "", number: "", address: "" });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/all');
      const data = await response.json();
      setUsers(data || []);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInput),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Member added successfully");
        setUserInput({ name: "", email: "", number: "", address: "" });
        fetchData();
      } else {
        toast.error(data?.message || "Failed to add member");
      }
    } catch (error) {
      toast.error("Error adding member");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this member?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/users/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Member deleted successfully");
        fetchData();
      } else {
        toast.error(data?.message || "Failed to delete member");
      }
    } catch (error) {
      toast.error("Error deleting member");
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/update/${isUpdate}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInput),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Member updated successfully");
        setUserInput({ name: "", email: "", number: "", address: "" });
        setIsUpdate(false);
        fetchData();
      } else {
        toast.error(data?.message || "Failed to update member");
      }
    } catch (error) {
      toast.error("Error updating member");
      console.error(error);
    }
  };

  return (
    <>
      <div className="addbook">
        <div className="add">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userInput.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userInput.email}
            onChange={handleInputChange}
          />
          <input
            type="tel"
            name="number"
            pattern="[0-9]{10}"
            placeholder="Number"
            value={userInput.number}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={userInput.address}
            onChange={handleInputChange}
          />
          <button
            className="btn btn-success"
            onClick={isUpdate ? handleUpdate : handleAdd}
          >
            {isUpdate ? 'Update Member' : 'Add Member'}
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.number}</td>
              <td>{user.address}</td>
              <td>
                <button
                  className="update-btn"
                  onClick={() => {
                    setIsUpdate(user.userId);
                    setUserInput({
                      name: user.name,
                      email: user.email,
                      number: user.number,
                      address: user.address
                    });
                  }}
                >
                  Update
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(user.userId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Members;
