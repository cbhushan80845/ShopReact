import React, { useEffect, useState } from "react";
import { getAllItems } from "../apiService";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const GetAllItems = () => {
  const [item, setItems] = useState([
    { id: "", name: "", category: "", status: "", photo: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllItems()
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <div className="mt-5">Loading Items....</div>;
  }
  if (errorMessage) {
    return <div className=" text-danger mb-5 mt-5">Error : {errorMessage}</div>;
  }
  return (
    <section className="bg-light mb-5 mt-5 shadow">
      <Container>
        {[...Array(Math.ceil(item.length / 4))].map((_, index) => (
          <Carousel.Item key={index}>
            <Row>
              {item.slice(index * 4, index * 4 + 4).map((item) => (
                <Col key={item.id} className="mb-4" xs={12} md={6} lg={3}>
                  <Card>
                    <Link to={`${item.id}`}>
                      <Card.Img
                        variant="top"
                        src={`data:image/png;base64, ${item.photo}`}
                        alt="item Photo"
                        className="w-30"
                        style={{ height: "200px" }}
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title className="hotel-color">
                        {item.category}
                      </Card.Title>
                      <Card.Title className="room-price">
                        {item.status}
                      </Card.Title>
                      <Card.Title className="item-name">{item.name}</Card.Title>
                      <div className="flex-shrink-0"></div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Container>
    </section>
  );
};

export default GetAllItems;
