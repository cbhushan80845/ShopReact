import React, { useEffect, useState } from "react";
import { getAllItems } from "../apiService";
import { Col, Container, Row } from "react-bootstrap";
import ItemPaginator from "./ItemPaginator";

function Item() {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(6);
  const [filteredData, setFilteredData] = useState([{ id: "" }]);

  useEffect(() => {
    setIsLoading(true);
    getAllItems()
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading items</div>;
  }
  if (error) {
    return <div>Error:{error}</div>;
  }

  const totalPages = Math.ceil(filteredData.length / itemPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderItem = () => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return filteredData
      .slice(startIndex, endIndex)
      .map((item) => <Item key={item.id} item={item} />);
  };
  return (
    <Container>
      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <Item data={data} setFilteredData={setFilteredData} />
        </Col>

        <Col md={6} className="d-flex align-items-center justify-content-end">
          <ItemPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
      <Row>{renderItem()}</Row>
      <Row>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <ItemPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Item;
