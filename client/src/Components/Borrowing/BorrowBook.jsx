import Swal from "sweetalert2";

const BorrowBook = (bookId) => {
  return new Promise((resolve) => {
    Swal.fire({
      title: "Enter Borrowing Details",
      html: `
        <label for="userId">User Id</label>
        <input type="text" id="userId" class="swal2-input" placeholder="User ID">
        
        <label for="borrowDate">Borrow Date</label>
        <input type="date" id="borrowDate" class="swal2-input">
        
        <label for="returnDate">Return Date</label>
        <input type="date" id="returnDate" class="swal2-input">
      `,
      confirmButtonText: "Submit",
      focusConfirm: false,
      preConfirm: () => {
        const userId = document.getElementById("userId").value;
        const borrowDate = document.getElementById("borrowDate").value;
        const returnDate = document.getElementById("returnDate").value;

        if (!userId || !borrowDate || !returnDate) {
          Swal.showValidationMessage("All fields are required!");
          return false;
        }

        return { bookId, userId, borrowDate, returnDate };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        resolve(result.value);
        try {
          const response = await fetch("http://localhost:5000/borrow/borrow", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result.value),
          });

          const data = await response.json();
          response.ok ? Swal.fire("Success!", data.message, "success") : Swal.fire("Error!", data.error, "error");
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });
  });
};

export default BorrowBook;
