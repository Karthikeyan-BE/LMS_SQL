import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookImg from "../../assets/Books.png";
import BorrowBook from "./BorrowBook";
import ReturnBook from "./ReturnBook";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [bookSearch, setBookSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/books/all");
      const data = await response.json();
      setBooks(data.books || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleBorrow = async (id) => {
    try {
      const data = await BorrowBook(id);
      if (data) {
        fetchData();
      }
    } catch (error) {
      console.error("Error handling borrow:", error);
    }
  };

  const handleReturn = async (id) => {
    try {
      const data = await ReturnBook(id);
      if (data) {
        fetchData();
      }
    } catch (error) {
      console.error("Error handling return:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:5000/books/search-books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: bookSearch }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setBooks(data.results || []);
      setBookSearch("");
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col md={8}>
          <Form.Control
            type="search"
            placeholder="Search Book"
            value={bookSearch}
            onChange={(e) => setBookSearch(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Button variant="success" className="w-100" onClick={handleSearch}>
            Search
          </Button>
        </Col>
      </Row>

      <Row className="g-4">
        {books.map((book) => (
          <Col key={book.bookId} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100">
              <Card.Img variant="top" src={BookImg} />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>{book.bookName}</Card.Title>
                  <Card.Text>{book.bookAuthor}</Card.Text>
                </div>
                <Button
                  variant={book.availability ? "primary" : "success"}
                  onClick={() =>
                    book.availability
                      ? handleBorrow(book.bookId)
                      : handleReturn(book.bookId)
                  }
                >
                  {book.availability ? "Borrow" : "Return"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Book;
