// // import React, { useEffect, useState } from "react";
// // import {
// //     Button, Card, CardBody, Col, Container, Row, Table, Spinner
// // } from "reactstrap";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { useCommonContext } from "../../../helper/CommonProvider";
// // import AddMultipleQuestions from "./AddMultipleQuestions";

// // const QuestionList = () => {
// //     const { id } = useParams(); // bank_id
// //     const navigate = useNavigate();

// //     const { getQuestionsByBank, questions } = useCommonContext();
// //     const [showAddForm, setShowAddForm] = useState(false);

// //     useEffect(() => {
// //         getQuestionsByBank(id);
// //     }, [id]);

// //     return (
// //         <>
// //             <Container fluid>
// //                 <Row>
// //                     <Col sm="12">
// //                         <Card>
// //                             <CardBody>

// //                                 {/* HEADER */}
// //                                 <div className="d-flex justify-content-between">
// //                                     <h4 className="fw-bold">Questions of Bank #{id}</h4>

// //                                     <Button color="success" onClick={() => navigate(`/add-question/${id}`)}>
// //                                         + Add Questions
// //                                     </Button>
// //                                 </div>




// //                                 <Table bordered hover responsive className="mt-4">
// //                                     <thead>
// //                                         <tr>
// //                                             <th>ID</th>
// //                                             <th>Question</th>
// //                                             <th>Type</th>
// //                                             <th>Marks</th>
// //                                             <th>Difficulty</th>
// //                                             <th>Action</th>
// //                                         </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                         {questions.loading ? (
// //                                             <tr><td colSpan="10" className="text-center"><Spinner /></td></tr>
// //                                         ) : questions.data?.length === 0 ? (
// //                                             <tr><td colSpan="10" className="text-center">No Questions Found</td></tr>
// //                                         ) : (
// //                                             questions.data?.map((q) => (
// //                                                 <tr key={q.id}>
// //                                                     <td>{q.id}</td>
// //                                                     <td>{q.question_text}</td>
// //                                                     <td>{q.question_type}</td>
// //                                                     <td>{q.marks}</td>
// //                                                     <td>{q.difficulty}</td>

// //                                                     <td>
// //                                                         <Button
// //                                                             color="primary"
// //                                                             size="sm"
// //                                                             className="me-2"
// //                                                             onClick={() => navigate(`/edit-question/${q.id}`)}
// //                                                         >
// //                                                             Edit
// //                                                         </Button>

// //                                                         <Button
// //                                                             color="danger"
// //                                                             size="sm"
// //                                                             onClick={() => console.log("Delete", q.id)}
// //                                                         >
// //                                                             Delete
// //                                                         </Button>
// //                                                     </td>
// //                                                 </tr>
// //                                             ))
// //                                         )}
// //                                     </tbody>
// //                                 </Table>
// //                             </CardBody>
// //                         </Card>
// //                     </Col>
// //                 </Row>
// //             </Container>
// //         </>
// //     );
// // };

// // export default QuestionList;
// import React, { useEffect, useState } from "react";
// import {
//     Button, Card, CardBody, Col, Container, Row, Table, Spinner,
//     Collapse
// } from "reactstrap";
// import { useNavigate, useParams } from "react-router-dom";
// import { useCommonContext } from "../../../helper/CommonProvider";

// const QuestionList = () => {
//     const { id } = useParams(); // bank_id
//     const navigate = useNavigate();

//     const { getQuestionsByBank, questions } = useCommonContext();

//     const [openRow, setOpenRow] = useState(null);

//     useEffect(() => {
//         getQuestionsByBank(id);
//     }, [id]);

//     const toggleRow = (qid) => {
//         setOpenRow(openRow === qid ? null : qid);
//     };
//     return (
//         <Container fluid>
//             <Row>
//                 <Col sm="12">
//                     <Card>
//                         <CardBody>

//                             {/* HEADER */}
//                             <div className="d-flex justify-content-between align-items-center">
//                                 <h4 className="fw-bold">Questions of Bank #{id}</h4>

//                                 <Button
//                                     color="success"
//                                     onClick={() => navigate(`/add-question/${id}`)}
//                                 >
//                                     + Add Questions
//                                 </Button>
//                             </div>

//                             <Table bordered hover responsive className="mt-4">
//                                 <thead>
//                                     <tr>
//                                         <th>SL No</th>
//                                         <th>ID</th>
//                                         <th>Question</th>
//                                         <th>Type</th>
//                                         <th>Marks</th>
//                                         <th>Difficulty</th>
//                                         <th width="150">Action</th>
//                                     </tr>
//                                 </thead>

//                                 <tbody>
//                                     {questions.loading ? (
//                                         <tr><td colSpan="10" className="text-center"><Spinner /></td></tr>
//                                     ) : questions.data?.length === 0 ? (
//                                         <tr><td colSpan="10" className="text-center">No Questions Found</td></tr>
//                                     ) : (
//                                         questions.data?.map((q, index) => (
//                                             <>
//                                                 {/* MAIN ROW */}
//                                                 <tr key={q.id}>
//                                                     <td>{index + 1}</td>
//                                                     <td>{q.id}</td>

//                                                     <td>
//                                                         <div className="d-flex justify-content-between">
//                                                             <span>{q.question_text}</span>

//                                                             <Button
//                                                                 size="sm"
//                                                                 color="secondary"
//                                                                 outline
//                                                                 onClick={() => toggleRow(q.id)}
//                                                             >
//                                                                 {openRow === q.id ? "Hide" : "View"}
//                                                             </Button>
//                                                         </div>
//                                                     </td>

//                                                     <td>{q.question_type}</td>
//                                                     <td>{q.marks}</td>
//                                                     <td>{q.difficulty}</td>

//                                                     <td>
//                                                         <Button
//                                                             color="primary"
//                                                             size="sm"
//                                                             className="me-2"
//                                                             onClick={() => navigate(`/edit-question/${q.id}`)}
//                                                         >
//                                                             Edit
//                                                         </Button>

//                                                         <Button
//                                                             color="danger"
//                                                             size="sm"
//                                                             onClick={() => console.log("Delete", q.id)}
//                                                         >
//                                                             Delete
//                                                         </Button>
//                                                     </td>
//                                                 </tr>

//                                                 {/* COLLAPSE PREVIEW */}
//                                                 <tr>
//                                                     <td colSpan="6" className="p-0 bg-light">
//                                                         <Collapse isOpen={openRow === q.id}>
//                                                             <div className="p-3">

//                                                                 {/* MCQ OPTIONS */}
//                                                                 {q.question_type === "MCQ" && (
//                                                                     <>
//                                                                         <h6 className="fw-bold">Options:</h6>
//                                                                         <ul>
//                                                                             {q.options?.map((opt, index) => (
//                                                                                 <li key={index}>
//                                                                                     {index + 1}. {opt.option_text}{" "}
//                                                                                     {opt.is_correct === 1 && (
//                                                                                         <span className="text-success fw-bold">(Correct)</span>
//                                                                                     )}
//                                                                                     {" "}
//                                                                                 </li>
//                                                                             ))}
//                                                                         </ul>


//                                                                     </>
//                                                                 )}

//                                                                 {/* TRUE FALSE */}
//                                                                 {q.question_type === "TRUE_FALSE" && (
//                                                                     <>
//                                                                         <h6 className="fw-bold">Correct Answer:</h6>
//                                                                         <p className="text-primary fw-bold">
//                                                                             {q.true_false}
//                                                                         </p>
//                                                                     </>
//                                                                 )}

//                                                                 {/* ASSERTION / REASON */}
//                                                                 {q.question_type === "ASSERTION_REASON" && (
//                                                                     <>
//                                                                         <h6 className="fw-bold">Assertion:</h6>
//                                                                         <p>{q.assertion}</p>

//                                                                         <h6 className="fw-bold">Reason:</h6>
//                                                                         <p>{q.reason}</p>

//                                                                         <h6 className="fw-bold">Correct:</h6>
//                                                                         <p className="text-success">
//                                                                             {q.correct_assertion_reason}
//                                                                         </p>
//                                                                     </>
//                                                                 )}

//                                                                 {/* MATCH THE COLUMN */}
//                                                                 {q.question_type === "MATCH_COLUMN" && (
//                                                                     <>
//                                                                         <h6 className="fw-bold mb-2">Match the Columns:</h6>

//                                                                         <Row>
//                                                                             <Col md="6">
//                                                                                 <h6>A (Left)</h6>
//                                                                                 <ul>
//                                                                                     {q.match_left?.map((item, i) => (
//                                                                                         <li key={i}>A{i + 1}: {item}</li>
//                                                                                     ))}
//                                                                                 </ul>
//                                                                             </Col>

//                                                                             <Col md="6">
//                                                                                 <h6>B (Right)</h6>
//                                                                                 <ul>
//                                                                                     {q.match_right?.map((item, i) => (
//                                                                                         <li key={i}>B{i + 1}: {item}</li>
//                                                                                     ))}
//                                                                                 </ul>
//                                                                             </Col>
//                                                                         </Row>

//                                                                         <h6 className="fw-bold mt-2">Correct Pairs:</h6>
//                                                                         <ul>
//                                                                             {Object.entries(q.correct_match || {}).map(([A, B]) => (
//                                                                                 <li key={A}>
//                                                                                     {A} → {B}
//                                                                                 </li>
//                                                                             ))}
//                                                                         </ul>
//                                                                     </>
//                                                                 )}

//                                                                 {/* EXPLANATION */}
//                                                                 {q.explanation && (
//                                                                     <>
//                                                                         <h6 className="fw-bold">Explanation:</h6>
//                                                                         <p>{q.explanation}</p>
//                                                                     </>
//                                                                 )}
//                                                             </div>
//                                                         </Collapse>
//                                                     </td>
//                                                 </tr>
//                                             </>
//                                         ))
//                                     )}
//                                 </tbody>
//                             </Table>

//                         </CardBody>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default QuestionList;

import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Table,
    Button,
    Spinner,
    Collapse,
    Badge,
    Stack,
    Dropdown
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiEye,
    FiEyeOff,
    FiMoreVertical,
    FiCheckCircle,
    FiXCircle,
    FiInfo,
    FiArrowLeft,
    FiList
} from 'react-icons/fi';
import { useCommonContext } from "../../../helper/CommonProvider";
import CommonBreadcrumb from "../../../component/common/bread-crumb";

const QuestionList = () => {
    const { id } = useParams(); // bank_id
    const navigate = useNavigate();
    const { getQuestionsByBank, questions } = useCommonContext();
    const [openRows, setOpenRows] = useState({});

    useEffect(() => {
        getQuestionsByBank(id);
    }, [id]);

    const toggleRow = (qid) => {
        setOpenRows(prev => ({
            ...prev,
            [qid]: !prev[qid]
        }));
    };

    const onDeleteQuestion = (qid) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            console.log("Delete", qid);
        }
    };
    console.log(questions.data, "questions.data")
    return (
        <div className="pb-5 text-white">
            {/* <CommonBreadcrumb title={`Question Bank #${id}`} /> */}

            <Container fluid className="mt-n4">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => navigate('/question-banks')}
                            className="border-secondary text-white rounded-circle p-2 d-flex align-items-center justify-content-center"
                        >
                            <FiArrowLeft size={18} />
                        </Button>
                        <div>
                            <h2 className="fw-bold mb-0 text-white">Question Collection</h2>
                            <p className="text-secondary small mb-0">Managing questions for Bank ID #{id}</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => navigate(`/add-question/${id}`)}
                        className="fw-bold d-flex align-items-center gap-2 px-4 py-2 text-black border-0"
                        style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                    >
                        <FiPlus size={20} />
                        Add Question
                    </Button>
                </div>

                <Row>
                    <Col lg={12}>
                        <Card className="bg-dark border-secondary border-opacity-10 shadow-lg overflow-hidden" style={{ backgroundColor: '#1E1E1E' }}>
                            <div className="table-responsive">
                                <Table hover variant="dark" className="mb-0 align-middle custom-table">
                                    <thead className="bg-black bg-opacity-50">
                                        <tr className="text-secondary small text-uppercase">
                                            <th className="px-4 py-3 border-secondary border-opacity-10" width="60">#</th>
                                            <th className="px-4 py-3 border-secondary border-opacity-10">Question Details</th>
                                            <th className="px-4 py-3 border-secondary border-opacity-10">Section</th>
                                            <th className="px-4 py-3 border-secondary border-opacity-10 text-center">Type</th>
                                            <th className="px-4 py-3 border-secondary border-opacity-10 text-center">Marks</th>
                                            <th className="px-4 py-3 border-secondary border-opacity-10 text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {questions.loading ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-5 text-secondary">
                                                    <Spinner animation="border" variant="warning" size="sm" className="me-2" />
                                                    Loading questions...
                                                </td>
                                            </tr>
                                        ) : questions.data?.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-5 text-secondary">
                                                        No questions found in this bank
                                                    </td>
                                                </tr>
                                            ) : (
                                                    questions.data.map((q, index) => (
                                                        <React.Fragment key={q.id}>
                                                            <tr className="border-secondary border-opacity-10">
                                                                <td className="px-4 py-3 text-secondary small">
                                                                    {index + 1}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <div className="d-flex flex-column gap-1">
                                                                        <span className="fw-bold text-white fs-6">{q.question_text}</span>
                                                                        <div className="d-flex align-items-center gap-2">
                                                                            <Badge bg="dark" className="border border-secondary border-opacity-50 text-secondary fw-normal">
                                                                                ID: #{q.id}
                                                                            </Badge>
                                                                            <Badge
                                                                                bg={q.difficulty === 'HARD' ? 'danger' : q.difficulty === 'MEDIUM' ? 'warning' : 'success'}
                                                                                className="bg-opacity-10 fw-normal"
                                                                                style={{
                                                                                    color: q.difficulty === 'HARD' ? '#dc3545' : q.difficulty === 'MEDIUM' ? '#fcca0c' : '#198754'
                                                                                }}
                                                                            >
                                                                                {q.difficulty}
                                                                            </Badge>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-3 text-secondary">
                                                                    {q.section || "-"}
                                                                </td>
                                                                <td className="px-4 py-3 text-center">
                                                                    <Badge bg="dark" className="border border-secondary text-info fw-normal px-2 py-1">
                                                                        {q.question_type}
                                                                    </Badge>
                                                                </td>
                                                                <td className="px-4 py-3 text-center fw-bold text-warning">
                                                                    {q.marks || 1}
                                                                </td>
                                                                <td className="px-4 py-3 text-end">
                                                                    <div className="d-flex justify-content-end gap-2 text-info">
                                                                        <Button
                                                                            variant="link"
                                                                            onClick={() => toggleRow(q.id)}
                                                                            className="text-info p-0 shadow-none d-flex align-items-center gap-1 text-decoration-none small fw-bold"
                                                                        >
                                                                            {openRows[q.id] ? <><FiEyeOff /> Close</> : <><FiEye /> View</>}
                                                                        </Button>
                                                                        <Dropdown align="end">
                                                                            <Dropdown.Toggle variant="link" className="text-secondary p-0 border-0 no-caret shadow-none">
                                                                                <FiMoreVertical />
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu variant="dark" className="border-secondary shadow border border-opacity-25">
                                                                                <Dropdown.Item onClick={() => navigate(`/edit-question/${q.id}`)}>
                                                                                    <FiEdit2 className="me-2 text-info" /> Edit Question
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Divider className="bg-secondary opacity-25" />
                                                                                <Dropdown.Item className="text-danger" onClick={() => onDeleteQuestion(q.id)}>
                                                                                    <FiTrash2 className="me-2" /> Delete Question
                                                                                </Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            {/* Collapsible Content */}
                                                            <tr>
                                                                <td colSpan="6" className="p-0 border-0">
                                                                    <Collapse in={!!openRows[q.id]}>
                                                                        <div className="px-5 py-4 bg-black bg-opacity-25 border-bottom border-secondary">
                                                                            <Row>
                                                                                <Col lg={8}>
                                                                                    {/* Question Breakdown by type */}
                                                                                    {q.question_type === "MCQ" && (
                                                                                        <div className="mb-4">
                                                                                            <h6 className="text-secondary small fw-bold mb-3 d-flex align-items-center gap-2">
                                                                                                <FiList className="text-warning" /> OPTIONS & ANSWERS
                                                                                            </h6>
                                                                                            <div className="d-flex flex-column gap-2">
                                                                                                {q.options?.map((opt, i) => (
                                                                                                    <div key={i} className={`p-3 rounded border ${opt.is_correct === 1 ? 'border-success bg-success bg-opacity-10' : 'border-secondary bg-dark'}`}>
                                                                                                        <div className="d-flex align-items-center justify-content-between">
                                                                                                            <div className="d-flex align-items-center gap-3">
                                                                                                                <span className={`rounded-circle d-flex align-items-center justify-content-center fw-bold ${opt.is_correct === 1 ? 'bg-success text-white' : 'bg-secondary bg-opacity-25 text-secondary'}`} style={{ width: '24px', height: '24px', fontSize: '12px' }}>
                                                                                                                    {i + 1}
                                                                                                                </span>
                                                                                                                <span>{opt.option_text}</span>
                                                                                                            </div>
                                                                                                            {opt.is_correct === 1 && <FiCheckCircle className="text-success" />}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    )}

                                                                                    {q.question_type === "TRUE_FALSE" && (
                                                                                        <div className="mb-4">
                                                                                            <h6 className="text-secondary small fw-bold mb-3 d-flex align-items-center gap-2">
                                                                                                <FiCheckCircle className="text-warning" /> CORRECT ANSWER
                                                                                            </h6>
                                                                                            <Badge bg={q.true_false === "TRUE" ? "success" : "danger"} className="p-3 fs-6">
                                                                                                {q.true_false || "NOT SET"}
                                                                                            </Badge>
                                                                                        </div>
                                                                                    )}
                                                                                    {q.question_type === "ASSERTION_REASON" && (
                                                                                        <div className="mb-4">
                                                                                            <div className="p-4 rounded bg-black bg-opacity-25 border border-secondary border-opacity-50">
                                                                                                <div className="mb-3">
                                                                                                    <h6 className="text-warning small fw-bold mb-2">ASSERTION (A)</h6>
                                                                                                    <p className="text-white mb-0 p-3 rounded bg-dark border border-secondary border-opacity-25">
                                                                                                        {q.assertion || "No assertion provided"}
                                                                                                    </p>
                                                                                                </div>
                                                                                                <div className="mb-4">
                                                                                                    <h6 className="text-warning small fw-bold mb-2">REASON (R)</h6>
                                                                                                    <p className="text-white mb-0 p-3 rounded bg-dark border border-secondary border-opacity-25">
                                                                                                        {q.reason || "No reason provided"}
                                                                                                    </p>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <h6 className="text-success small fw-bold mb-2 d-flex align-items-center gap-2">
                                                                                                        <FiCheckCircle /> CORRECT RELATIONSHIP
                                                                                                    </h6>
                                                                                                    <Badge bg="success" className="bg-opacity-25 text-success border border-success border-opacity-25 p-2 px-3 fw-normal fs-6">
                                                                                                        {q.correct_assertion_reason || "Not specified"}
                                                                                                    </Badge>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}

                                                                                    {q.question_type === "MATCH_COLUMN" && (
                                                                                        <div className="mb-4">
                                                                                            <h6 className="text-secondary small fw-bold mb-3 d-flex align-items-center gap-2">
                                                                                                <FiList className="text-warning" /> COLUMN MATCHING
                                                                                            </h6>
                                                                                            <div className="p-4 rounded bg-black bg-opacity-25 border border-secondary border-opacity-50">
                                                                                                <Row className="g-4 mb-4">
                                                                                                    <Col md={6}>
                                                                                                        <h6 className="text-secondary small fw-bold mb-3 border-bottom border-secondary border-opacity-25 pb-2">COLUMN A</h6>
                                                                                                        <div className="d-flex flex-column gap-2">
                                                                                                            {q.match_left?.map((item, idx) => (
                                                                                                                <div key={idx} className="d-flex gap-2 align-items-center p-2 rounded bg-dark border border-secondary border-opacity-10">
                                                                                                                    <Badge bg="secondary" className="bg-opacity-25 text-secondary">A{idx + 1}</Badge>
                                                                                                                    <span className="text-white small">{item}</span>
                                                                                                                </div>
                                                                                                            ))}
                                                                                                        </div>
                                                                                                    </Col>
                                                                                                    <Col md={6}>
                                                                                                        <h6 className="text-secondary small fw-bold mb-3 border-bottom border-secondary border-opacity-25 pb-2">COLUMN B</h6>
                                                                                                        <div className="d-flex flex-column gap-2">
                                                                                                            {q.match_right?.map((item, idx) => (
                                                                                                                <div key={idx} className="d-flex gap-2 align-items-center p-2 rounded bg-dark border border-secondary border-opacity-10">
                                                                                                                    <Badge bg="secondary" className="bg-opacity-25 text-secondary">B{idx + 1}</Badge>
                                                                                                                    <span className="text-white small">{item}</span>
                                                                                                                </div>
                                                                                                            ))}
                                                                                                        </div>
                                                                                                    </Col>
                                                                                                </Row>

                                                                                                <div>
                                                                                                    <h6 className="text-success small fw-bold mb-3 d-flex align-items-center gap-2">
                                                                                                        <FiCheckCircle /> CORRECT MAPPING
                                                                                                    </h6>
                                                                                                    <div className="d-flex flex-wrap gap-2">
                                                                                                        {q.correct_match && Object.entries(q.correct_match).length > 0 ? (
                                                                                                            Object.entries(q.correct_match).map(([left, right], idx) => (
                                                                                                                <Badge
                                                                                                                    key={idx}
                                                                                                                    bg="success"
                                                                                                                    className="bg-opacity-10 text-success border border-success border-opacity-25 p-2 fw-normal"
                                                                                                                >
                                                                                                                    {left} <span className="mx-1">→</span> {right}
                                                                                                                </Badge>
                                                                                                            ))
                                                                                                        ) : (
                                                                                                            <span className="text-muted small">No mapping defined</span>
                                                                                                        )}
                                                                                                    </div>

                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                    {q.explanation && (
                                                                                        <div className="mt-4 p-3 rounded g bg-opacity-10 border border-warning border-opacity-25 d-flex gap-3">
                                                                                            <h6 className="text-warning small fw-bold mb-2 d-flex align-items-center gap-2">
                                                                                                <FiInfo /> EXPLANATION
                                                                                            </h6>
                                                                                            <p className="text- mb-0 small opacity-75">{q.explanation}</p>
                                                                                        </div>
                                                                                    )}
                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                    </Collapse>
                                                                </td>
                                                            </tr>
                                                        </React.Fragment>
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
                .no-caret::after { display: none !important; }
                .custom-table td { border-bottom: 1px solid #2D2D2D !important; }
            `}</style>
        </div >
    );
};

export default QuestionList;
