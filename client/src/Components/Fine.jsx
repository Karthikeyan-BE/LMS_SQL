import React, { useEffect, useState } from "react";
import "./CSS/Books.css";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Fine = () => {
  const [fines, setFines] = useState([]);
  const [fineInput, setFineInput] = useState({
    userId: "",
    bookId: "",
    fineAmount: "",
    fineReason: ""
  });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    fetchFines();
  }, []);

  const fetchFines = async () => {
    try {
      const response = await fetch("http://localhost:5000/fine/fines");
      const data = await response.json();
      setFines(data || []);
    } catch (error) {
      toast.error("Error fetching fines");
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setFineInput({ ...fineInput, [e.target.name]: e.target.value });
  };

  const handleAddFine = async () => {
    try {
      const response = await fetch("http://localhost:5000/fine/add-fine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fineInput),
      });
      if (response.ok) {
        toast.success("Fine added successfully");
        setFineInput({ userId: "", bookId: "", fineAmount: "", fineReason: "" });
        fetchFines();
      }
    } catch (error) {
      toast.error("Error adding fine");
      console.error(error);
    }
  };

  const handleDeleteFine = async (fineId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This fine will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6"
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/fine/delete-fine/${fineId}`, {
        method: "DELETE"
      });
      if (response.ok) {
        toast.success("Fine deleted");
        fetchFines();
      }
    } catch (error) {
      toast.error("Error deleting fine");
      console.error(error);
    }
  };

  const handleUpdateFine = async () => {
    try {
      const response = await fetch(`http://localhost:5000/fine/update-fine/${isUpdate}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fineInput),
      });
      if (response.ok) {
        toast.success("Fine updated");
        setFineInput({ userId: "", bookId: "", fineAmount: "", fineReason: "" });
        setIsUpdate(false);
        fetchFines();
      }
    } catch (error) {
      toast.error("Error updating fine");
      console.error(error);
    }
  };

  const handlePayFine = async (fineId) => {
    const confirm = await Swal.fire({
      title: "Pay Fine?",
      text: "Are you sure the user is paying this fine?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, mark as paid",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#6c757d"
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/fine/pay-fine/${fineId}`, {
        method: "POST"
      });
      if (response.ok) {
        toast.success("Fine marked as paid");
        fetchFines();
      }
    } catch (error) {
      toast.error("Error paying fine");
      console.error(error);
    }
  };

  return (
    <>
      <div className="addbook">
        <div className="add">
          <input
            type="number"
            name="userId"
            placeholder="User ID"
            value={fineInput.userId}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="bookId"
            placeholder="Book ID"
            value={fineInput.bookId}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="fineAmount"
            placeholder="Fine Amount"
            value={fineInput.fineAmount}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="fineReason"
            placeholder="Fine Reason"
            value={fineInput.fineReason}
            onChange={handleInputChange}
          />
          <button
            className="btn btn-success"
            onClick={isUpdate ? handleUpdateFine : handleAddFine}
          >
            {isUpdate ? "Update Fine" : "Add Fine"}
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Book</th>
            <th>Fine Amount</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Pay</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {fines.map((fine) => (
            <tr key={fine.fineId}>
              <td>{fine.user?.name} ({fine.user?.email})</td>
              <td>{fine.book?.bookName}</td>
              <td>${fine.fineAmount}</td>
              <td>{fine.fineReason}</td>
              <td>{fine.isPaid ? "Paid ✅" : "Unpaid ❌"}</td>
              <td>
                {!fine.isPaid && (
                  <button className="pay-btn" onClick={() => handlePayFine(fine.fineId)}>
                    Pay Fine
                  </button>
                )}
              </td>
              <td>
                <button
                  className="update-btn"
                  onClick={() => {
                    setIsUpdate(fine.fineId);
                    setFineInput({
                      userId: fine.userId,
                      bookId: fine.bookId,
                      fineAmount: fine.fineAmount,
                      fineReason: fine.fineReason,
                    });
                  }}
                >
                  Update
                </button>
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteFine(fine.fineId)}>
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

export default Fine;
