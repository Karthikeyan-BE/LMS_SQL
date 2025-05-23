import Swal from "sweetalert2";

const ReturnBook = (bookId) => {
  return new Promise((resolve) => {
    Swal.fire({
      title: "Enter Return Details",
      html: `
        <label for="userId">User Id</label>
        <input type="text" id="userId" class="swal2-input" placeholder="User ID">
      `,
      confirmButtonText: "Submit",
      focusConfirm: false,
      preConfirm: () => {
        const userId = document.getElementById("userId").value;

        if (!userId) {
          Swal.showValidationMessage("User ID is required!");
          return false;
        }

        return { bookId, userId };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        resolve(result.value);
        try {
          const response = await fetch("http://localhost:5000/borrow/return", {
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

export default ReturnBook;
