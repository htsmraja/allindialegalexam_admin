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
// const QuestionBanks = () => {
//     const navigate = useNavigate();
//     const onOpenModal = () => navigate("/add-question_bank");
//     const { questionBankList, getQuestionBanks } = useCommonContext();
//     useEffect(() => {
//         getQuestionBanks();
//     }, [])
//     console.log(questionBankList, "questionBankList")
//     return (
//         <>
//             <CommonBreadcrumb title="Question Bank List" />
//             <Container fluid>
//                 <Col sm="12">
//                     <Card>
//                         <CardBody>
//                             <div className="row align-items-center mb-4 justify-content-between">

//                                 {/* SEARCH */}
//                                 <div className="col-md-6">
//                                     <Input
//                                         placeholder="Search Question Bank"
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
//                                         + Add Question Bank
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
//                                                 <th>Exam Type</th>
//                                                 <th>Question Bank Type</th>
//                                                 <th>Created By</th>
//                                                 <th>Status</th>
//                                                 <th>Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>

//                                             {/* LOADING */}
//                                             {questionBankList.loading && (
//                                                 <tr>
//                                                     <td colSpan="10" className="text-center">
//                                                         <Spinner />
//                                                     </td>
//                                                 </tr>
//                                             )}

//                                             {/* EMPTY */}
//                                             {!questionBankList.loading && questionBankList.data?.length === 0 && (
//                                                 <tr>
//                                                     <td colSpan="10" className="text-center">
//                                                         No Books Found
//                                                     </td>
//                                                 </tr>
//                                             )}

//                                             {/* DATA LIST */}
//                                             {!questionBankList.loading && questionBankList.data?.map((item) => (
//                                                 <tr key={item.id}>
//                                                     <td>Qn Bank Id:{item.id}</td>
//                                                     <td>{item.title}</td>
//                                                     <td>{item.exam_type_name}</td>
//                                                     <td>{item.question_bank_type_name}</td>
//                                                     <td>{item.created_by_name}</td>
//                                                     <td>{item.is_active === 1 ? "Active" : "Inactive"}</td>
//                                                     {/* ACTIONS */}
//                                                     <td>
//                                                         <div className="d-flex gap-2">
//                                                             <Button
//                                                                 color="primary"
//                                                                 size="sm"
//                                                                 onClick={() => navigate(`/edit-question_bank/${item.id}`)}
//                                                             >
//                                                                 Edit
//                                                             </Button>

//                                                             <Button
//                                                                 color="danger"
//                                                                 size="sm"
//                                                                 onClick={() => console.log("Delete", item.id)}
//                                                             >
//                                                                 Delete
//                                                             </Button>

//                                                             <Button
//                                                                 color="primary"
//                                                                 size="sm"
//                                                                 onClick={() => navigate(`/question-list/${item.id}`)}
//                                                             >
//                                                                 Question List
//                                                             </Button>
//                                                         </div>
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

// export default QuestionBanks


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
    Dropdown,
    Stack
} from 'react-bootstrap';
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiSearch,
    FiMoreVertical,
    FiDatabase,
    FiList
} from 'react-icons/fi';
import CommonBreadcrumb from '../../../component/common/bread-crumb';
import { useCommonContext } from '../../../helper/CommonProvider';

const QuestionBanks = () => {
    const navigate = useNavigate();
    const { questionBankList, getQuestionBanks } = useCommonContext();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getQuestionBanks();
    }, []);

    const onAddBank = () => navigate("/add-question_bank");
    const onEditBank = (id) => navigate(`/edit-question_bank/${id}`);
    const onViewQuestions = (id) => navigate(`/question-list/${id}`);
    const onDeleteBank = (id) => {
        if (window.confirm('Are you sure you want to delete this question bank?')) {
            console.log("Delete", id);
        }
    };

    const filteredData = questionBankList.data?.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.exam_type_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.question_bank_type_name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="pb-5 text-white">


            <Container fluid className="mt-n4">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold mb-0 text-white">Question Banks</h2>
                        <p className="text-secondary small mb-0">Manage and organize your question collections</p>
                    </div>
                    <Button
                        onClick={onAddBank}
                        className="fw-bold d-flex align-items-center gap-2 px-4 py-2 text-black border-0"
                        style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                    >
                        <FiPlus size={20} />
                        Add Question Bank
                    </Button>
                </div>

                {/* Toolbar */}
                <Card className="bg-dark border-secondary border-opacity-10 shadow-lg mb-4" style={{ backgroundColor: '#1E1E1E' }}>
                    <Card.Body className="p-3">
                        <Row className="align-items-center">
                            <Col md={4}>
                                <InputGroup className="bg-black rounded border border-secondary border-opacity-25">
                                    <InputGroup.Text className="bg-transparent border-0 text-secondary">
                                        <FiSearch />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Search question banks..."
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
                        <Card className="bg-dark border-secondary border-opacity-10 shadow-lg overflow-hidden" style={{ backgroundColor: '#1E1E1E' }}>
                            <div className="table-responsive">
                                <Table hover variant="dark" className="mb-0 align-middle custom-table">
                                    <thead className="bg-black bg-opacity-50 text-secondary small">
                                        <tr>
                                            <th className="px-4 py-3 border-secondary border-opacity-10">Bank Info</th>
                                            <th className="px-4 py-3 border-secondary border-opacity-10">Exam Type</th>
                                            <th className="px-4 py-3 border-secondary border-opacity-10">Type</th>
                                            <th className="px-4 py-3 border-secondary border-opacity-10 text-center">Status</th>
                                            <th className="px-4 py-3 border-secondary border-opacity-10 text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {questionBankList.loading ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-5">
                                                    <Spinner animation="border" variant="warning" size="sm" className="me-2" />
                                                    <span className="text-secondary">Loading question banks...</span>
                                                </td>
                                            </tr>
                                        ) : filteredData.length === 0 ? (
                                            <tr>
                                                    <td colSpan="5" className="text-center py-5 text-secondary">
                                                        No question banks found
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredData.map((item) => (
                                                    <tr key={item.id} className="border-secondary border-opacity-10">
                                                        <td className="px-4 py-3">
                                                            <div className="d-flex align-items-center gap-3">
                                                                <div className="rounded bg-success bg-opacity-10 d-flex align-items-center justify-content-center text-success" style={{ width: '40px', height: '40px' }}>
                                                                    <FiDatabase size={20} />
                                                                </div>
                                                                <div>
                                                                    <div className="fw-bold hover-text-warning text-white">{item.title}</div>
                                                                    <div className="text-secondary small">ID: #{item.id} • By {item.created_by_name}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <Badge bg="dark" className="text-warning border border-warning border-opacity-25 fw-normal px-2 py-1">
                                                                {item.exam_type_name}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-4 py-3 text-secondary small">
                                                            {item.question_bank_type_name || "General"}
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <Badge
                                                                bg={item.is_active === 1 ? 'success' : 'danger'}
                                                                className="bg-opacity-10 py-2 px-3 fw-normal rounded-pill"
                                                                style={{
                                                                    color: item.is_active === 1 ? '#198754' : '#dc3545',
                                                                    backgroundColor: item.is_active === 1 ? 'rgba(25, 135, 84, 0.1)' : 'rgba(220, 53, 69, 0.1)'
                                                                }}
                                                            >
                                                                {item.is_active === 1 ? 'Active' : 'Inactive'}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-4 py-3 text-end">
                                                            <Dropdown align="end">
                                                                <Dropdown.Toggle variant="link" className="text-secondary p-0 border-0 no-caret shadow-none">
                                                                    <FiMoreVertical />
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu variant="dark" className="border-secondary border-opacity-25 shadow border">
                                                                    <Dropdown.Item onClick={() => onViewQuestions(item.id)} className='text-waring'>
                                                                        <FiList className="me-2 text-warning" /> View Questions
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => onEditBank(item.id)} className='text-info'>
                                                                        <FiEdit2 className="me-2 text-info" /> Edit Bank
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Divider className="bg-secondary opacity-25" />
                                                                    <Dropdown.Item className="text-danger" onClick={() => onDeleteBank(item.id)}>
                                                                        <FiTrash2 className="me-2" /> Delete Bank
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
            `}</style>
        </div>
    );
};

export default QuestionBanks;
