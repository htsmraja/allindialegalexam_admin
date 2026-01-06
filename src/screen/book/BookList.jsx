// import React, { useEffect } from 'react';
// import CommonBreadcrumb from '../../component/common/bread-crumb';
// import {
//   Button,
//   Card,
//   CardBody,
//   Col,
//   Container,
//   Input,
//   Row,
//   Spinner,
//   Table,
// } from "reactstrap";
// import { useNavigate } from 'react-router-dom';
// import { useCommonContext } from '../../helper/CommonProvider';

// const BookList = () => {
//   const navigate = useNavigate();
//   const { bookList, getBookList } = useCommonContext();

//   useEffect(() => {
//     getBookList({ page: 1 });
//   }, []);

//   const onOpenModal = () => navigate("/add-book");

//   return (
//     <>
//       <CommonBreadcrumb title="Book List" />

//       <Container fluid>
//         <Col sm="12">
//           <Card>
//             <CardBody>

//               {/* Search + Button Row */}
//               <div className="row align-items-center mb-4 justify-content-between">

//                 {/* SEARCH */}
//                 <div className="col-md-6">
//                   <Input
//                     placeholder="Search Book"
//                     className="form-control"
//                     style={{ boxShadow: "0 0 10px rgba(4, 59, 54, 1)" }}
//                   />
//                 </div>

//                 {/* ADD BOOK BUTTON */}
//                 <div className="col-md-6 d-flex justify-content-end">
//                   <button
//                     onClick={onOpenModal}
//                     className="btn btnGreen"
//                   >
//                     + Add Book
//                   </button>
//                 </div>

//               </div>

//               <div className="clearfix"></div>

//               {/* TABLE */}
//               <div className="product-physical">
//                 <div className="promo-code-list">

//                   <Table hover responsive bordered>
//                     <thead>
//                       <tr>
//                         <th>ID</th>
//                         <th>Image</th>
//                         <th>Book Name</th>
//                         <th>Category</th>
//                         <th>Price</th>
//                         <th>Stock</th>
//                         <th>Hardcopy PDF</th>
//                         <th>Softcopy</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>

//                     <tbody>

//                       {/* LOADING */}
//                       {bookList.loading && (
//                         <tr>
//                           <td colSpan="10" className="text-center">
//                             <Spinner />
//                           </td>
//                         </tr>
//                       )}

//                       {/* EMPTY */}
//                       {!bookList.loading && bookList.data?.length === 0 && (
//                         <tr>
//                           <td colSpan="10" className="text-center">
//                             No Books Found
//                           </td>
//                         </tr>
//                       )}

//                       {/* DATA LIST */}
//                       {!bookList.loading && bookList.data?.map((item) => (
//                         <tr key={item.id}>

//                           {/* ID */}
//                           <td>{item.id}</td>

//                           {/* COVER IMAGE */}
//                           <td>
//                             <img
//                               src={
//                                 item.cover_image
//                                   ? `${import.meta.env.VITE_APP_BOOK_IMAGE_URL}/${item.cover_image}`
//                                   : "/no-image.png"
//                               }
//                               alt="book"
//                               width="60"
//                               height="60"
//                               style={{
//                                 objectFit: "cover",
//                                 borderRadius: "5px"
//                               }}
//                             />
//                           </td>

//                           {/* TITLE */}
//                           <td>{item.title}</td>

//                           {/* CATEGORY (ID for now) */}
//                           <td>{item.category_id}</td>

//                           {/* PRICE */}
//                           <td>₹{item.hardcopy_price_b2c ?? "-"}</td>

//                           {/* STOCK */}
//                           <td>{item.stock ?? 0}</td>

//                           {/* HARD COPY PDF */}
//                           <td>
//                             {item.sample_pdf ? (
//                               <a
//                                 href={`${import.meta.env.VITE_APP_BOOK_IMAGE_URL}/${item.sample_pdf}`}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="btn btn-sm btn-info"
//                               >
//                                 View PDF
//                               </a>
//                             ) : (
//                               <span className="text-muted">No File</span>
//                             )}
//                           </td>

//                           {/* SOFT COPY DOWNLOAD */}
//                           <td>
//                             {item.softcopy_file ? (
//                               <a
//                                 href={`${import.meta.env.VITE_APP_BOOK_IMAGE_URL}/${item.softcopy_file}`}
//                                 download
//                                 className="btn btn-sm btn-warning text-dark"
//                               >
//                                 Download
//                               </a>
//                             ) : (
//                               <span className="text-muted">No File</span>
//                             )}
//                           </td>

//                           {/* ACTIONS */}
//                           <td>
//                             <Button
//                               color="primary"
//                               size="sm"
//                               className="me-2"
//                               onClick={() => navigate(`/edit-book/${item.id}`)}
//                             >
//                               Edit
//                             </Button>

//                             <Button
//                               color="danger"
//                               size="sm"
//                               onClick={() => console.log("Delete", item.id)}
//                             >
//                               Delete
//                             </Button>
//                           </td>

//                         </tr>
//                       ))}

//                     </tbody>
//                   </Table>

//                 </div>
//               </div>

//             </CardBody>
//           </Card>
//         </Col>
//       </Container>
//     </>
//   );
// };

// export default BookList;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Badge, Form, Stack, Pagination, Offcanvas, InputGroup, ListGroup, Dropdown, Tabs, Tab, Spinner } from 'react-bootstrap';
import {
  FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter, FiDownload,
  FiGrid, FiList, FiEye, FiCopy, FiArchive, FiMoreVertical, FiStar, FiFileText
} from 'react-icons/fi';
import { booksData, bookStats } from '../../data/mockData';
import { useCommonContext } from '../../helper/CommonProvider';
const BookList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(booksData);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const { bookList, getBookList } = useCommonContext();

  useEffect(() => {
    getBookList({ page: 1 });
  }, []);

  console.log(bookList, "bookList")

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDrawer(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      if (selectedProduct && selectedProduct.id === id) {
        setShowDrawer(false);
      }
    }
  };

  const StatCard = ({ title, count, color, trend }) => (
    <Card className="bg-dark border-0 text-center shadow-sm h-100 transition-hover" style={{ backgroundColor: '#1E1E1E !important' }}>
      <Card.Body className="py-3">
        <div className="text-secondary small text-uppercase tracking-wider mb-2" style={{ fontSize: '10px' }}>{title}</div>
        <div className={`text-${color} h4 fw-bold mb-0`}>{count}</div>
        <div className="text-muted mt-1" style={{ fontSize: '10px' }}>{trend} this month</div>
      </Card.Body>
    </Card>
  );

  const getHardcopyPrice = (product) => {
    if (!product.has_hardcopy) return null;

    const now = new Date();

    if (
      product.hardcopy_offer_price_b2c &&
      product.hardcopy_offer_start &&
      product.hardcopy_offer_end &&
      now >= new Date(product.hardcopy_offer_start) &&
      now <= new Date(product.hardcopy_offer_end)
    ) {
      return product.hardcopy_offer_price_b2c;
    }

    if (product.mark_hardcopy_sale && product.hardcopy_sale_price_b2c) {
      return product.hardcopy_sale_price_b2c;
    }

    return product.hardcopy_price_b2c;
  };

  const getSoftcopyPrice = (product) => {
    if (!product.has_softcopy) return null;

    const now = new Date();

    if (
      product.softcopy_offer_price_b2c &&
      product.softcopy_offer_start &&
      product.softcopy_offer_end &&
      now >= new Date(product.softcopy_offer_start) &&
      now <= new Date(product.softcopy_offer_end)
    ) {
      return product.softcopy_offer_price_b2c;
    }

    if (product.mark_softcopy_sale && product.softcopy_sale_price_b2c) {
      return product.softcopy_sale_price_b2c;
    }

    return product.softcopy_price_b2c;
  };
  const getBookPrice = (product) => {
    if (product.is_free) return "Free";

    const hardPrice = getHardcopyPrice(product);
    const softPrice = getSoftcopyPrice(product);

    if (hardPrice && softPrice) {
      return `₹${hardPrice} / ₹${softPrice}`;
    }

    if (hardPrice) return `₹${hardPrice}`;
    if (softPrice) return `₹${softPrice}`;

    return "—";
  };


  return (
    <div className="text-white pt-2">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0 text-warning">Book & Notes Store</h3>
        <Button
          variant="warning"
          className="fw-bold d-flex align-items-center gap-2 px-3 py-2 text-black"
          onClick={() => navigate('/add-book')}
          style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
        >
          <FiPlus size={20} />
          Add Product
        </Button>
      </div>

      {/* Stats */}
      <Row className="g-3 mb-4">
        <Col xs={6} md={4} lg={true}>
          <StatCard title="Total Products" count={bookStats.total} color="white" trend="+2" />
        </Col>
        <Col xs={6} md={4} lg={true}>
          <StatCard title="Digital Items" count={bookStats.digital} color="info" trend="+5" />
        </Col>
        <Col xs={6} md={4} lg={true}>
          <StatCard title="Phys. Stock" count={bookStats.physical} color="primary" trend="-1" />
        </Col>
        <Col xs={6} md={4} lg={true}>
          <StatCard title="Total Orders" count={bookStats.orders} color="success" trend="+12" />
        </Col>
        <Col xs={6} md={4} lg={true}>
          <StatCard title="Revenue" count={`₹${(bookStats.revenue / 1000).toFixed(1)}k`} color="warning" trend="+8%" />
        </Col>
      </Row>

      {/* Toolbar */}
      <Card className="bg-dark border-secondary shadow-sm mb-4" style={{ backgroundColor: '#1E1E1E !important' }}>
        <Card.Body className="p-3">
          <Row className="align-items-center g-3">
            <Col md={4}>
              <InputGroup className="bg-black rounded border border-secondary border-opacity-50">
                <InputGroup.Text className="bg-transparent border-0 text-secondary">
                  <FiSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search Products..."
                  className="bg-transparent border-0 text-white shadow-none placeholder-secondary"
                />
              </InputGroup>
            </Col>
            <Col md={8}>
              <div className="d-flex justify-content-md-end gap-2">
                <Stack direction="horizontal" className="bg-black p-1 rounded border border-secondary overflow-hidden me-2">
                  <Button
                    variant={viewMode === 'grid' ? 'warning' : 'transparent'}
                    size="sm"
                    className={`border-0 ${viewMode === 'grid' ? 'text-black fw-bold' : 'text-secondary'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <FiGrid />
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'warning' : 'transparent'}
                    size="sm"
                    className={`border-0 ${viewMode === 'table' ? 'text-black fw-bold' : 'text-secondary'}`}
                    onClick={() => setViewMode('table')}
                  >
                    <FiList />
                  </Button>
                </Stack>
                <Button variant="outline-secondary" className="border-secondary text-white d-flex align-items-center gap-2 btn-sm px-3">
                  <FiFilter /> Filters
                </Button>
                <Button variant="outline-secondary" className="border-secondary text-white d-flex align-items-center gap-2 btn-sm px-3">
                  <FiDownload /> Export
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {
        bookList.loading && (
          <div className="text-center p-4">
            <Spinner animation="border" variant="light" />
          </div>
        )
      }
      {!bookList?.loading &&
        Array.isArray(bookList?.data) &&
        bookList.data.length === 0 && (
          <div className="text-center p-4">
            <div className="text-secondary">No Products Found</div>
          </div>
        )}
      {/* Content View */}
      {viewMode === 'table' ? (
        <Card className="bg-dark border-secondary shadow-sm overflow-hidden">

          <Table responsive hover variant="dark" className="mb-0 custom-table align-middle">
            <thead className="bg-black">
              <tr className="text-secondary small text-uppercase">
                <th className="px-4 py-3 border-secondary">Product Name</th>
                <th className="px-4 py-3 border-secondary">Category</th>
                <th className="px-4 py-3 border-secondary text-center">Type</th>
                <th className="px-4 py-3 border-secondary text-center">Variety</th>
                <th className="px-4 py-3 border-secondary text-center">Price</th>
                <th className="px-4 py-3 border-secondary text-center">Stock</th>
                <th className="px-4 py-3 border-secondary text-center">Sales</th>
                <th className="px-4 py-3 border-secondary text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookList?.data?.map(product => (
                <tr key={product.id} className="border-secondary">
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3 cursor-pointer" onClick={() => handleViewDetails(product)}>
                      <div className="rounded bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center text-white fw-bold overflow-hidden" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                        {product.cover_image ? (
                          <img
                            src={
                              product.cover_image
                                ? `${import.meta.env.VITE_APP_BOOK_IMAGE_URL}/${product.cover_image}`
                                : product.image
                            }
                            alt={product.title}
                            className="w-100 h-100 object-fit-cover"
                          />
                        ) : (
                          <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light fw-bold fs-3">
                            {product.title}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="fw-bold hover-text-warning">{product.title}</div>
                        <div className="text-secondary small" style={{ fontSize: '11px' }}>{product.author_name}
                          {/* • {product.slug} */}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="fw-normal text-white" style={{ fontSize: "12px" }}>
                      {product.subcategory_name || "N/A"}
                    </div>

                    <div className="text-secondary small" style={{ fontSize: "11px" }}>
                      {product.category_name || "—"}
                    </div>
                  </td>



                  <td className="px-4 py-3 text-center ">
                    <Badge
                      bg={product.type === 'book' ? 'primary' : 'info'}
                      className="fw-normal text-capitalize bg-opacity-25"
                    >
                      {product.type === 'book' ? 'Book' : 'Notes'}
                    </Badge>

                  </td>
                  <td className="px-4 py-3 text-center">
                    {product.has_hardcopy && product.has_softcopy && (
                      <span className="text-info">Hard Copy / Soft Copy</span>
                    )}
                    {product.has_hardcopy && !product.has_softcopy && (
                      <span className="text-primary">Hard Copy</span>
                    )}
                    {!product.has_hardcopy && product.has_softcopy && (
                      <span className="text-success">Soft Copy</span>
                    )}
                    {!product.has_hardcopy && !product.has_softcopy && (
                      <span className="text-secondary">—</span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center fw-bold text-success"> {getBookPrice(product)}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge bg={product.stock > 10 ? 'success bg-opacity-10 text-success' : 'danger bg-opacity-10 text-danger'} className="fw-normal">
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center text-secondary">{product.sales}</td>
                  <td className="px-4 py-3 text-center">
                    <Dropdown align="end">
                      <Dropdown.Toggle variant="link" className="text-secondary p-0 border-0 no-caret">
                        <FiMoreVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu variant="dark" className="border-secondary shadow">
                        <Dropdown.Item onClick={() => handleViewDetails(product)}><FiEye className="me-2" /> View Details</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate('/edit-book')}><FiEdit2 className="me-2" /> Edit Info</Dropdown.Item>
                        <Dropdown.Divider className="bg-secondary" />
                        <Dropdown.Item className="text-danger" onClick={() => handleDelete(product.id)}><FiTrash2 className="me-2" /> Delete Product</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      ) : (
        <Row className="g-4">
          {bookList?.data?.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="bg-dark border-secondary h-100 product-card overflow-hidden">
                <div className="position-relative overflow-hidden group" style={{ height: '180px' }}>
                  <div className="h-100 w-100 bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center text-secondary">
                    {product.cover_image ? (
                      <img
                        src={
                          product.cover_image
                            ? `${import.meta.env.VITE_APP_BOOK_IMAGE_URL}/${product.cover_image}`
                            : product.image
                        }
                        alt={product.title}
                        className="w-100 h-100 object-fit-cover"
                      />
                    ) : (
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light fw-bold fs-3">
                        {product.title}
                      </div>
                    )}
                  </div>
                  <div className="overlay-actions d-flex align-items-center justify-content-center">
                    <Button variant="warning" className="fw-bold rounded-pill px-4 btn-sm shadow text-black" onClick={() => handleViewDetails(product)}>Manage Product</Button>
                  </div>
                  <Badge bg={product.stock > 0 ? 'success' : 'danger'} className="position-absolute top-2 start-2 shadow-sm fw-normal">
                    {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
                  </Badge>
                </div>
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <div className="fw-bold text-white text-truncate" title={product.title}>{product.title}</div>
                    <div className="text-warning fw-bold ps-2">₹{product.price}</div>
                  </div>
                  <div className="text-secondary mb-3 small">{product.author}</div>
                  <div className="d-flex justify-content-between align-items-center small text-secondary">
                    <span><FiStar className="text-warning me-1 mb-1" /> {product.rating}</span>
                    <span>{product.sales} Sales</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Details Offcanvas (Drawer) */}
      <Offcanvas show={showDrawer} onHide={() => setShowDrawer(false)} placement="end" style={{ width: '650px' }} className="bg-black text-white border-start border-secondary shadow-lg">
        <Offcanvas.Header closeButton closeVariant="white" className="border-bottom border-secondary bg-dark">
          <Offcanvas.Title className="w-100">
            {selectedProduct && (
              <div className="d-flex justify-content-between align-items-center pe-4">
                <div>
                  <h5 className="mb-0 fw-bold">{selectedProduct.name}</h5>
                  <div className="small text-secondary">{selectedProduct.category} • SKU: {selectedProduct.sku}</div>
                </div>
                <Badge bg={selectedProduct.stock > 0 ? 'success' : 'danger'} pill className="fw-normal px-3 py-2">
                  {selectedProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </div>
            )}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          {selectedProduct && (
            <Tabs defaultActiveKey="performance" id="product-details-tabs" className="custom-tabs border-bottom border-secondary px-3 sticky-top bg-black">
              <Tab eventKey="performance" title="Performance" className="p-4">
                <Row className="g-3 mb-4">
                  <Col xs={4}>
                    <Card className="bg-dark border-secondary text-center py-3">
                      <div className="text-secondary small mb-1" style={{ fontSize: '10px' }}>TOTAL SALES</div>
                      <div className="h4 mb-0 fw-bold">{selectedProduct.sales}</div>
                    </Card>
                  </Col>
                  <Col xs={4}>
                    <Card className="bg-dark border-secondary text-center py-3">
                      <div className="text-secondary small mb-1" style={{ fontSize: '10px' }}>REVENUE</div>
                      <div className="h4 mb-0 fw-bold text-success">₹{(selectedProduct.revenue || 0).toLocaleString()}</div>
                    </Card>
                  </Col>
                  <Col xs={4}>
                    <Card className="bg-dark border-secondary text-center py-3">
                      <div className="text-secondary small mb-1" style={{ fontSize: '10px' }}>WISHLISTED</div>
                      <div className="h4 mb-0 fw-bold text-info">{selectedProduct.wishlistCount || 0}</div>
                    </Card>
                  </Col>
                </Row>
                <div className="mb-4">
                  <h6 className="fw-bold mb-3 d-flex align-items-center gap-2 italic">
                    <FiStar size={14} className="text-warning" /> Overall Rating: {selectedProduct.rating} / 5.0
                  </h6>
                  <div className="bg-dark bg-opacity-50 p-4 rounded border border-dashed border-secondary text-center text-muted" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Sales Analytics Visualization (Mock)
                  </div>
                </div>
              </Tab>
              <Tab eventKey="orders" title="Recent Orders" className="p-4">
                <ListGroup variant="flush">
                  {[1, 2, 3].map(item => (
                    <ListGroup.Item key={item} className="bg-transparent text-white border-secondary px-0 py-3">
                      <div className="d-flex justify-content-between">
                        <div>
                          <div className="fw-bold small">Order #ORD-{2024000 + item}</div>
                          <div className="text-secondary small" style={{ fontSize: '11px' }}>Customer: Student {item}</div>
                        </div>
                        <div className="text-end">
                          <div className="text-success small fw-bold">₹{selectedProduct.price}</div>
                          <div className="text-secondary small" style={{ fontSize: '11px' }}>Today, 2:45 PM</div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab>
              <Tab eventKey="reviews" title="Reviews" className="p-4">
                {selectedProduct.reviews && selectedProduct.reviews.map((review, i) => (
                  <div key={i} className="mb-4 bg-dark bg-opacity-25 p-3 rounded border border-secondary">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-info text-black fw-bold d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', fontSize: '12px' }}>
                          {review.user[0]}
                        </div>
                        <span className="small fw-bold">{review.user}</span>
                      </div>
                      <span className="text-warning small text-nowrap"><FiStar fill="currentColor" size={12} className="mb-1" /> {review.rating}</span>
                    </div>
                    <p className="text-secondary small mb-0">{review.comment}</p>
                  </div>
                ))}
              </Tab>
            </Tabs>
          )}
        </Offcanvas.Body>
        <div className="p-3 bg-dark border-top border-secondary mt-auto d-flex justify-content-between align-items-center shadow">
          <Button variant="outline-light" className="border-secondary small py-2">
            <FiCopy className="me-2" /> Duplicate
          </Button>
          <Stack direction="horizontal" gap={2}>
            <Button variant="outline-secondary" className="border-secondary text-white small py-2">
              <FiArchive className="me-2" /> Archive
            </Button>
            <Button variant="danger" className="border-0 small py-2 fw-bold" onClick={() => handleDelete(selectedProduct.id)}>
              <FiTrash2 className="me-2" /> Delete
            </Button>
          </Stack>
        </div>
      </Offcanvas>

      <style>{`
                .product-card {
                    transition: all 0.3s ease;
                }
                .product-card:hover {
                    transform: translateY(-5px);
                    border-color: #fcca0c !important;
                }
                .transition-scale {
                    transition: transform 0.5s ease;
                }
                .product-card:hover .transition-scale {
                    transform: scale(1.1);
                }
                .overlay-actions {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.6);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: 5;
                }
                .group:hover .overlay-actions {
                    opacity: 1;
                }
                .hover-text-warning:hover {
                    color: #fcca0c !important;
                    text-decoration: underline;
                }
                .custom-table tr:hover {
                    background-color: #1a1a1a !important;
                }
                .custom-tabs .nav-link {
                    color: #888;
                    border: none;
                    border-bottom: 2px solid transparent;
                    padding: 12px 20px;
                    transition: all 0.2s;
                }
                .custom-tabs .nav-link.active {
                    background: transparent;
                    color: #fcca0c;
                    border-bottom: 2px solid #fcca0c;
                }
                .custom-tabs .nav-link:hover {
                    color: #fff;
                }
                .no-caret::after { display: none !important; }
                .placeholder-secondary::placeholder { color: #555; font-size: 14px; }
            `}</style>
    </div>
  );
};

export default BookList;
