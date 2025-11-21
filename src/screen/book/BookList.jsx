import React, { useEffect } from 'react';
import CommonBreadcrumb from '../../component/common/bread-crumb';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { useCommonContext } from '../../helper/CommonProvider';

const BookList = () => {
  const navigate = useNavigate();
  const { bookList, getBookList } = useCommonContext();

  useEffect(() => {
    getBookList({ page: 1 });
  }, []);

  const onOpenModal = () => navigate("/add-book");

  return (
    <>
      <CommonBreadcrumb title="Book List" />

      <Container fluid>
        <Col sm="12">
          <Card>
            <CardBody>

              {/* Search + Button Row */}
              <div className="row align-items-center mb-4 justify-content-between">

                {/* SEARCH */}
                <div className="col-md-6">
                  <Input
                    placeholder="Search Book"
                    className="form-control"
                    style={{ boxShadow: "0 0 10px rgba(4, 59, 54, 1)" }}
                  />
                </div>

                {/* ADD BOOK BUTTON */}
                <div className="col-md-6 d-flex justify-content-end">
                  <button
                    onClick={onOpenModal}
                    className="btn btnGreen"
                  >
                    + Add Book
                  </button>
                </div>

              </div>

              <div className="clearfix"></div>

              {/* TABLE */}
              <div className="product-physical">
                <div className="promo-code-list">

                  <Table hover responsive bordered>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Book Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Hardcopy PDF</th>
                        <th>Softcopy</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {/* LOADING */}
                      {bookList.loading && (
                        <tr>
                          <td colSpan="10" className="text-center">
                            <Spinner />
                          </td>
                        </tr>
                      )}

                      {/* EMPTY */}
                      {!bookList.loading && bookList.data?.length === 0 && (
                        <tr>
                          <td colSpan="10" className="text-center">
                            No Books Found
                          </td>
                        </tr>
                      )}

                      {/* DATA LIST */}
                      {!bookList.loading && bookList.data?.map((item) => (
                        <tr key={item.id}>

                          {/* ID */}
                          <td>{item.id}</td>

                          {/* COVER IMAGE */}
                          <td>
                            <img
                              src={
                                item.cover_image
                                  ? `${import.meta.env.VITE_APP_BOOK_IMAGE_URL}/${item.cover_image}`
                                  : "/no-image.png"
                              }
                              alt="book"
                              width="60"
                              height="60"
                              style={{
                                objectFit: "cover",
                                borderRadius: "5px"
                              }}
                            />
                          </td>

                          {/* TITLE */}
                          <td>{item.title}</td>

                          {/* CATEGORY (ID for now) */}
                          <td>{item.category_id}</td>

                          {/* PRICE */}
                          <td>₹{item.hardcopy_price_b2c ?? "-"}</td>

                          {/* STOCK */}
                          <td>{item.stock ?? 0}</td>

                          {/* HARD COPY PDF */}
                          <td>
                            {item.sample_pdf ? (
                              <a
                                href={`${import.meta.env.VITE_APP_BOOK_IMAGE_URL}/${item.sample_pdf}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-info"
                              >
                                View PDF
                              </a>
                            ) : (
                              <span className="text-muted">No File</span>
                            )}
                          </td>

                          {/* SOFT COPY DOWNLOAD */}
                          <td>
                            {item.softcopy_file ? (
                              <a
                                href={`${import.meta.env.VITE_APP_BOOK_IMAGE_URL}/${item.softcopy_file}`}
                                download
                                className="btn btn-sm btn-warning text-dark"
                              >
                                Download
                              </a>
                            ) : (
                              <span className="text-muted">No File</span>
                            )}
                          </td>

                          {/* ACTIONS */}
                          <td>
                            <Button
                              color="primary"
                              size="sm"
                              className="me-2"
                              onClick={() => navigate(`/edit-book/${item.id}`)}
                            >
                              Edit
                            </Button>

                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => console.log("Delete", item.id)}
                            >
                              Delete
                            </Button>
                          </td>

                        </tr>
                      ))}

                    </tbody>
                  </Table>

                </div>
              </div>

            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default BookList;
