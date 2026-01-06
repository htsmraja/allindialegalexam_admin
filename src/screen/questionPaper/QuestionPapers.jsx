// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//     Button,
//     Card,
//     CardBody,
//     Col,
//     Container,
//     Input,
//     Row,
//     Spinner,
//     Table,
// } from "reactstrap";
// import CommonBreadcrumb from "../../component/common/bread-crumb";
// import { useCommonContext } from "../../helper/CommonProvider";

// const QuestionPaperList = () => {
//     const navigate = useNavigate();
//     const { getQuestionPaperList, questionPaperList } = useCommonContext();

//     useEffect(() => {
//         getQuestionPaperList();
//     }, []);
//     return (
//         <>
//             <CommonBreadcrumb title="Question Papers" />

//             <Container fluid>
//                 <Col sm="12">
//                     <Card>
//                         <CardBody>

//                             {/* Header */}
//                             <div className="row align-items-center mb-4 justify-content-between">
//                                 <div className="col-md-6">
//                                     <Input
//                                         placeholder="Search Paper..."
//                                         className="form-control"
//                                         style={{ boxShadow: "0 0 10px rgba(4, 59, 54, 1)" }}
//                                     />
//                                 </div>

//                                 <div className="col-md-6 d-flex justify-content-end">
//                                     <button
//                                         onClick={() => navigate("/add-question-paper")}
//                                         className="btn btnGreen"
//                                     >
//                                         + Create Question Paper
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Table */}
//                             <div className="product-physical">
//                                 <Table hover responsive bordered>
//                                     <thead>
//                                         <tr>
//                                             <th>ID</th>
//                                             <th>Title</th>
//                                             <th>Exam Type</th>
//                                             <th>Total Marks</th>
//                                             <th>Duration</th>
//                                             <th>Created By</th>
//                                             <th>Status</th>
//                                             <th>Action</th>
//                                         </tr>
//                                     </thead>

//                                     <tbody>
//                                         {questionPaperList.loading && (
//                                             <tr>
//                                                 <td colSpan="10" className="text-center">
//                                                     <Spinner />
//                                                 </td>
//                                             </tr>
//                                         )}

//                                         {!questionPaperList.loading &&
//                                             questionPaperList.data?.length === 0 && (
//                                                 <tr>
//                                                     <td colSpan="10" className="text-center">
//                                                         No Papers Found
//                                                     </td>
//                                                 </tr>
//                                             )}

//                                         {!questionPaperList.loading &&
//                                             questionPaperList.data?.map((item) => (
//                                                 <tr key={item.id}>
//                                                     <td>P-{item.id}</td>
//                                                     <td>{item.title}</td>
//                                                     <td>{item.exam_type_name}</td>
//                                                     <td>{item.total_marks}</td>
//                                                     <td>{item.total_duration_minutes} min</td>
//                                                     <td>{item.created_by_email}</td>
//                                                     <td>{item.is_published ? "Published" : "Draft"}</td>

//                                                     <td>
//                                                         <div className="d-flex gap-3">
//                                                             <Button
//                                                                 color="primary"
//                                                                 size="sm"
//                                                                 onClick={() => navigate(`/question-paper-list/${item.id}/${item.exam_type_id}`)}
//                                                             >
//                                                                 Manage Questions
//                                                             </Button>

//                                                             <Button
//                                                                 color="secondary"
//                                                                 size="sm"
//                                                                 onClick={() => navigate(`/edit-question-paper/${item.id}`)}
//                                                             >
//                                                                 Edit
//                                                             </Button>

//                                                             <Button color="danger" size="sm">
//                                                                 Delete
//                                                             </Button>
//                                                         </div>
//                                                     </td>

//                                                 </tr>
//                                             ))}
//                                     </tbody>
//                                 </Table>
//                             </div>

//                         </CardBody>
//                     </Card>
//                 </Col>
//             </Container>
//         </>
//     );
// };

// export default QuestionPaperList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Table,
    Button,
    Form,
    InputGroup,
    Spinner,
    Badge,
    Dropdown,
    Stack
} from 'react-bootstrap';
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiSearch,
    FiMoreVertical,
    FiFileText,
    FiClock,
    FiBarChart2,
    FiSettings
} from 'react-icons/fi';
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCommonContext } from "../../helper/CommonProvider";

const QuestionPaperList = () => {
    const navigate = useNavigate();
    const { getQuestionPaperList, questionPaperList } = useCommonContext();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getQuestionPaperList();
    }, []);

    const filteredData = questionPaperList.data?.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="pb-5 text-white pt-2">

            <Container fluid className="mt-n4">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold mb-0 text-white">Question Papers</h2>
                        <p className="text-secondary small mb-0">Create and manage standardized examination papers</p>
                    </div>
                    <Button
                        variant="warning"
                        onClick={() => navigate("/add-question-paper")}
                        className="fw-bold d-flex align-items-center gap-2 px-4 py-2 text-black border-0"
                        style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                    >
                        <FiPlus size={20} />
                        Create Question Paper
                    </Button>
                </div>

                {/* Toolbar */}
                <Card className="bg-dark border-secondary shadow-sm mb-4" style={{ backgroundColor: '#1E1E1E !important' }}>
                    <Card.Body className="p-3">
                        <Row className="align-items-center">
                            <Col md={4}>
                                <InputGroup className="bg-black rounded border border-secondary border-opacity-50">
                                    <InputGroup.Text className="bg-transparent border-0 text-secondary">
                                        <FiSearch />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Search papers by title..."
                                        className="bg-transparent border-0 text-white shadow-none placeholder-secondary"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <Row>
                    <Col lg={12}>
                        <Card className="bg-dark border-secondary shadow-sm overflow-hidden" style={{ backgroundColor: '#1E1E1E !important' }}>
                            <div className="table-responsive">
                                <Table hover variant="dark" className="mb-0 align-middle custom-table">
                                    <thead className="bg-black">
                                        <tr className="text-secondary small text-uppercase">
                                            <th className="px-4 py-3 border-secondary">ID</th>
                                            <th className="px-4 py-3 border-secondary">Paper Details</th>
                                            <th className="px-4 py-3 border-secondary">Exam Type</th>
                                            <th className="px-4 py-3 border-secondary text-center">Stats</th>
                                            <th className="px-4 py-3 border-secondary text-center">Status</th>
                                            <th className="px-4 py-3 border-secondary text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {questionPaperList.loading ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-5">
                                                    <Spinner animation="border" variant="warning" size="sm" className="me-2" />
                                                    <span className="text-secondary">Loading question papers...</span>
                                                </td>
                                            </tr>
                                        ) : filteredData.length === 0 ? (
                                            <tr>
                                                    <td colSpan="6" className="text-center py-5 text-secondary">
                                                        No question papers found
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredData.map((item) => (
                                                    <tr key={item.id} className="border-secondary">
                                                        <td className="px-4 py-3">
                                                            <Badge bg="dark" className="text-secondary border border-secondary border-opacity-25 fw-normal">
                                                                #{item.id}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="d-flex align-items-center gap-3">
                                                                <div className="rounded  bg-opacity-10 d-flex align-items-center justify-content-center text-warning" style={{ width: '40px', height: '40px' }}>
                                                                    <FiFileText size={20} />
                                                                </div>
                                                                <div>
                                                                    <div className="fw-bold hover-text-warning">{item.title}</div>
                                                                    <div className="text-secondary small">{item.created_by_email}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="text-secondary">{item.exam_type_name}</span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <Stack gap={1} className="align-items-center">
                                                                <div className="d-flex align-items-center gap-2 small text-secondary">
                                                                    <FiBarChart2 size={12} className="text-warning" />
                                                                    <span>{item.total_marks} Marks</span>
                                                                </div>
                                                                <div className="d-flex align-items-center gap-2 small text-secondary">
                                                                    <FiClock size={12} className="text-warning" />
                                                                    <span>{item.total_duration_minutes} Mins</span>
                                                                </div>
                                                            </Stack>
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <Badge
                                                                bg={item.is_published ? 'success' : 'secondary'}
                                                                className="bg-opacity-10 py-2 px-3 fw-normal rounded-pill"
                                                                style={{
                                                                    color: item.is_published ? '#198754' : '#888',
                                                                    backgroundColor: item.is_published ? 'rgba(25, 135, 84, 0.1)' : 'rgba(136, 136, 136, 0.1)'
                                                                }}
                                                            >
                                                                {item.is_published ? "Published" : "Draft"}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-4 py-3 text-end">
                                                            <div className="d-flex justify-content-end gap-2">
                                                            <Button
                                                                    variant="outline-warning"
                                                                size="sm"
                                                                    className="d-flex align-items-center gap-1 border-opacity-50"
                                                                onClick={() => navigate(`/question-paper-list/${item.id}/${item.exam_type_id}`)}
                                                            >
                                                                    <FiSettings size={14} /> Questions
                                                            </Button>
                                                                <Dropdown align="end">
                                                                    <Dropdown.Toggle variant="link" className="text-secondary p-0 border-0 no-caret shadow-none px-2">
                                                                        <FiMoreVertical />
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu variant="dark" className="border-secondary shadow border border-opacity-25">
                                                                        <Dropdown.Item onClick={() => navigate(`/edit-question-paper/${item.id}`)}>
                                                                            <FiEdit2 className="me-2 text-info" /> Edit Info
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Divider className="bg-secondary opacity-25" />
                                                                        <Dropdown.Item className="text-danger">
                                                                            <FiTrash2 className="me-2" /> Delete Paper
                                                                        </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                        </div>
                                                        </td>
                                                </tr>
                                                ))
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <style>{`
                .bg-dark { background-color: #1E1E1E !important; }
                .border-secondary { border-color: #2D2D2D !important; }
                .custom-table tr:hover { background-color: #1a1a1a !important; }
                .hover-text-warning:hover { color: #fcca0c !important; cursor: pointer; }
                .no-caret::after { display: none !important; }
                .placeholder-secondary::placeholder { color: #555; font-size: 14px; }
            `}</style>
        </div>
    );
};

export default QuestionPaperList;
