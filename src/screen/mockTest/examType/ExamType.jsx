// import React, { useEffect } from 'react'
// import CommonBreadcrumb from '../../../component/common/bread-crumb'
// import { useNavigate } from 'react-router-dom';
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
// import { useCommonContext } from '../../../helper/CommonProvider';
// const ExamType = () => {
//     const navigate = useNavigate();
//     const onOpenModal = () => navigate("/add-exam-type");
//     const { getExamTypeList, examTypeList } = useCommonContext();
//     useEffect(() => {
//         getExamTypeList();
//     }, [])
//     return (
//         <>
//             <CommonBreadcrumb title="Create the Exam Type" />
//             <Container fluid>
//                 <Col sm="12">
//                     <Card>
//                         <CardBody>
//                             <div className="row align-items-center mb-4 justify-content-between">

//                                 {/* SEARCH */}
//                                 <div className="col-md-6">
//                                     <Input
//                                         placeholder="Search Book"
//                                         className="form-control"
//                                         style={{ boxShadow: "0 0 10px rgba(4, 59, 54, 1)" }}
//                                     />
//                                 </div>

//                                 {/* ADD BOOK BUTTON */}
//                                 <div className="col-md-6 d-flex justify-content-end">
//                                     <button
//                                         onClick={onOpenModal}
//                                         className="btn btnGreen"
//                                     >
//                                         + Add Exam Type
//                                     </button>
//                                 </div>

//                             </div>

//                             <div className="clearfix"></div>
//                             <div className="product-physical">
//                                 <div className="promo-code-list">
//                                     <Table hover responsive bordered>
//                                         <thead>
//                                             <tr>
//                                                 <th>ID</th>
//                                                 <th>Name</th>
//                                                 <th>Status</th>
//                                                 <th>Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>

//                                             {/* LOADING */}
//                                             {examTypeList.loading && (
//                                                 <tr>
//                                                     <td colSpan="10" className="text-center">
//                                                         <Spinner />
//                                                     </td>
//                                                 </tr>
//                                             )}

//                                             {/* EMPTY */}
//                                             {!examTypeList.loading && examTypeList.data?.length === 0 && (
//                                                 <tr>
//                                                     <td colSpan="10" className="text-center">
//                                                         No Books Found
//                                                     </td>
//                                                 </tr>
//                                             )}

//                                             {/* DATA LIST */}
//                                             {!examTypeList.loading && examTypeList.data?.map((item) => (
//                                                 <tr key={item.id}>
//                                                     <td>EX Type:{item.id}</td>
//                                                     <td>{item.name}</td>
//                                                     <td>{item.status}</td>
//                                                     {/* ACTIONS */}
//                                                     <td>
//                                                         <Button
//                                                             color="primary"
//                                                             size="sm"
//                                                             className="me-2"
//                                                             onClick={() => navigate(`/edit-exam-type/${item.id}`)}
//                                                         >
//                                                             Edit
//                                                         </Button>

//                                                         <Button
//                                                             color="danger"
//                                                             size="sm"
//                                                             onClick={() => console.log("Delete", item.id)}
//                                                         >
//                                                             Delete
//                                                         </Button>
//                                                     </td>

//                                                 </tr>
//                                             ))}

//                                         </tbody>
//                                     </Table>
//                                 </div>
//                             </div>
//                         </CardBody>
//                     </Card>
//                 </Col>
//             </Container>
//         </>
//     )
// }

// export default ExamType

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    Dropdown
} from 'react-bootstrap';
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiSearch,
    FiMoreVertical,
    FiFileText
} from 'react-icons/fi';
import CommonBreadcrumb from '../../../component/common/bread-crumb';
import { useCommonContext } from '../../../helper/CommonProvider';

const ExamType = () => {
    const navigate = useNavigate();
    const { getExamTypeList, examTypeList } = useCommonContext();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getExamTypeList();
    }, []);

    const onAddExamType = () => navigate("/add-exam-type");
    const onEditExamType = (id) => navigate(`/edit-exam-type/${id}`);
    const onDeleteExamType = (id) => {
        if (window.confirm('Are you sure you want to delete this exam type?')) {
            console.log("Delete", id);
        }
    };

    const filteredData = examTypeList.data?.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="pb-5 text-white">
            {/* <CommonBreadcrumb title="Exam Type Management" /> */}

            <Container fluid className="mt-n4">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold mb-0 text-white">Exam Types</h2>
                        <p className="text-secondary small mb-0">Manage and organize your examination categories</p>
                    </div>
                    <Button
                        onClick={onAddExamType}
                        className="fw-bold d-flex align-items-center gap-2 px-4 py-2 text-black border-0"
                        style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                    >
                        <FiPlus size={20} />
                        Add Exam Type
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
                                        placeholder="Search exam types..."
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
                                            <th className="px-4 py-3 border-secondary">Exam Type Name</th>
                                            <th className="px-4 py-3 border-secondary text-center">Status</th>
                                            <th className="px-4 py-3 border-secondary text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {examTypeList.loading ? (
                                            <tr>
                                                <td colSpan="4" className="text-center py-5">
                                                    <Spinner animation="border" variant="warning" size="sm" className="me-2" />
                                                    <span className="text-secondary">Loading exam types...</span>
                                                </td>
                                            </tr>
                                        ) : filteredData.length === 0 ? (
                                            <tr>
                                                    <td colSpan="4" className="text-center py-5 text-secondary">
                                                        No exam types found
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
                                                                <div className="rounded  bg-opacity-10 d-flex align-items-center justify-content-center text-warning" style={{ width: '35px', height: '35px' }}>
                                                                    <FiFileText size={18} />
                                                                </div>
                                                                <span className="fw-bold hover-text-warning">{item.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <Badge
                                                                bg={item.status === 'active' ? 'success' : 'warning'}
                                                                className="bg-opacity-10 py-2 px-3 fw-normal rounded-pill"
                                                                style={{
                                                                    // color: item.status === 'active' ? '#198754' : '#fcca0c',
                                                                    backgroundColor: item.status === 'active' ? 'rgba(25, 135, 84, 0.1)' : 'rgba(252, 202, 12, 0.1)'
                                                                }}
                                                        >
                                                                {item.status || 'Active'}
                                                            </Badge>
                                                    </td>
                                                        <td className="px-4 py-3 text-end">
                                                            <Dropdown align="end">
                                                                <Dropdown.Toggle variant="link" className="text-secondary p-0 border-0 no-caret shadow-none">
                                                                    <FiMoreVertical />
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu variant="dark" className="border-secondary shadow border border-opacity-25">
                                                                    <Dropdown.Item onClick={() => onEditExamType(item.id)}>
                                                                        <FiEdit2 className="me-2 text-info" /> Edit Info
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Divider className="bg-secondary opacity-25" />
                                                                    <Dropdown.Item className="text-danger" onClick={() => onDeleteExamType(item.id)}>
                                                                        <FiTrash2 className="me-2" /> Delete Type
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
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
                 .btn-warning:hover { background-color: #e5b80b !important; border-color: #e5b80b !important; }
            `}</style>
        </div>
    );
};

export default ExamType;
