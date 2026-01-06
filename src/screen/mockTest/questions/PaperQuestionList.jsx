// import React, { useEffect } from "react";
// import CommonBreadcrumb from "../../../component/common/bread-crumb";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//     Button,
//     Card,
//     CardBody,
//     Col,
//     Container,
//     Spinner,
//     Table,
// } from "reactstrap";
// import { useCommonContext } from "../../../helper/CommonProvider";

// const PaperQuestionList = () => {
//     const navigate = useNavigate();
//     const { id, exam_type_id } = useParams();
//     console.log(exam_type_id, "exam_type_id")

//     const { getPaperQuestions, paperQuestionList } = useCommonContext();

//     useEffect(() => {
//         getPaperQuestions(id);
//     }, [id]);
//     console.log(paperQuestionList, "paperQuestionList")
//     return (
//         <>
//             <CommonBreadcrumb title="Paper Questions" />

//             <Container fluid>
//                 <Col sm="12">
//                     <Card>
//                         <CardBody>

//                             <div className="d-flex justify-content-between align-items-start mb-3">

//                                 {/* Left Section */}
//                                 <div>
//                                     <h4 className="mb-1">
//                                         Paper Name: <span className="fw-bold">{paperQuestionList?.data?.paper?.title}</span>
//                                     </h4>

//                                     <h5 className="mb-1">
//                                         Total Marks: <span className="fw-bold">{paperQuestionList?.data?.paper?.total_marks}</span>
//                                     </h5>

//                                     <h5 className="mb-0">
//                                         Exam Duration: <span className="fw-bold">{paperQuestionList?.data?.paper?.total_duration_minutes} min</span>
//                                     </h5>
//                                 </div>

//                                 {/* Right Button */}
//                                 <Button
//                                     color="primary"
//                                     onClick={() =>
//                                         navigate(`/add-paper-question/${id}/${exam_type_id}`)
//                                     }
//                                 >
//                                     + Add Question
//                                 </Button>
//                             </div>


//                             <Table hover bordered responsive>
//                                 <thead>
//                                     <tr>
//                                         <th>#</th>
//                                         <th>Question Text</th>
//                                         <th>Question Type</th>
//                                         <th>Marks</th>
//                                         <th>Negative</th>
//                                         <th>Action</th>
//                                     </tr>
//                                 </thead>

//                                 <tbody>
//                                     {paperQuestionList.loading && (
//                                         <tr>
//                                             <td colSpan="8" className="text-center">
//                                                 <Spinner />
//                                             </td>
//                                         </tr>
//                                     )}

//                                     {!paperQuestionList.loading &&
//                                         paperQuestionList.data?.questions?.length > 0 &&
//                                         paperQuestionList.data.questions.map((item, index) => (
//                                             <tr key={item.paper_question_id}>
//                                                 <td>{index + 1}</td>
//                                                 <td>{item.question_text}</td>
//                                                 <td>{item.question_type}</td>
//                                                 <td>{item.marks}</td>
//                                                 <td>{item.negative_marks ?? "-"}</td>

//                                                 <td>
//                                                     <Button size="sm" color="danger">
//                                                         Remove
//                                                     </Button>
//                                                 </td>
//                                             </tr>
//                                         ))}

//                                     {!paperQuestionList.loading &&
//                                         paperQuestionList.data?.questions?.length === 0 && (
//                                             <tr>
//                                                 <td colSpan="8" className="text-center">
//                                                     No questions found
//                                                 </td>
//                                             </tr>
//                                         )}
//                                 </tbody>

//                             </Table>

//                         </CardBody>
//                     </Card>
//                 </Col>
//             </Container>
//         </>
//     );
// };

// export default PaperQuestionList;
import React, { useEffect, useState } from "react";
import CommonBreadcrumb from "../../../component/common/bread-crumb";
import { useNavigate, useParams } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Table,
    Button,
    Spinner,
    Badge,
    Stack
} from 'react-bootstrap';
import {
    FiPlus,
    FiTrash2,
    FiFileText,
    FiArrowLeft,
    FiBarChart2,
    FiClock,
    FiCheckCircle
} from 'react-icons/fi';
import { useCommonContext } from "../../../helper/CommonProvider";

const PaperQuestionList = () => {
    const navigate = useNavigate();
    const { id, exam_type_id } = useParams();
    const { getPaperQuestions, paperQuestionList } = useCommonContext();

    useEffect(() => {
        getPaperQuestions(id);
    }, [id]);

    const paper = paperQuestionList?.data?.paper;
    const questions = paperQuestionList?.data?.questions || [];

    return (
        <div className="pb-5 text-white">

            <Container fluid className="mt-n4">
                {/* Header & Stats Card */}
                <Card className="bg-dark border-secondary shadow-lg mb-4 overflow-hidden" style={{ backgroundColor: '#1E1E1E !important' }}>
                    <Card.Body className="p-0">
                        <div className="d-flex flex-column flex-md-row">
                            {/* Left Info Section */}
                            <div className="p-4 flex-grow-1 border-bottom border-md-bottom-0 border-md-end border-secondary" style={{ minWidth: 0 }}>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => navigate("/question-paper")}
                                        className="border-secondary text-white rounded-circle p-2 d-flex align-items-center justify-content-center"
                                    >
                                        <FiArrowLeft size={18} />
                                    </Button>
                                    <div>
                                        <h4 className="fw-bold mb-0 text-white truncate-text">{paper?.title || "Loading Paper..."}</h4>
                                        <Badge bg="warning" className="text-black fw-bold mt-1">ID: P-{id}</Badge>
                                    </div>
                                </div>
                                <p className="text-secondary mb-0 small">
                                    {paper?.description || "Management of specific questions allocated to this examination paper."}
                                </p>
                            </div>

                            {/* Stats Section */}
                            <div className="bg-black bg-opacity-25 p-4 d-flex flex-column justify-content-center" style={{ minWidth: '250px' }}>
                                <Stack gap={3}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-2 text-secondary small fw-bold">
                                            <FiBarChart2 className="text-warning" /> TOTAL MARKS
                                        </div>
                                        <span className="fw-bold text-white fs-5">{paper?.total_marks || 0}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-2 text-secondary small fw-bold">
                                            <FiClock className="text-warning" /> DURATION
                                        </div>
                                        <span className="fw-bold text-white fs-5">{paper?.total_duration_minutes || 0}m</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-2 text-secondary small fw-bold">
                                            <FiCheckCircle className="text-warning" /> QUESTIONS
                                        </div>
                                        <span className="fw-bold text-white fs-5">{questions.length}</span>
                                    </div>
                                </Stack>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                {/* Actions Row */}
                <div className="d-flex justify-content-between align-items-center mb-4 text-white">
                    <h4 className="fw-bold mb-0">Allocated Questions</h4>
                    <Button
                        onClick={() => navigate(`/add-paper-question/${id}/${exam_type_id}`)}
                        className="fw-bold d-flex align-items-center gap-2 px-4 py-2 text-black border-0"
                        style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                    >
                        <FiPlus size={20} />
                        Add Questions to Paper
                    </Button>
                </div>

                {/* Questions Table */}
                <Card className="bg-dark border-secondary shadow-sm overflow-hidden" style={{ backgroundColor: '#1E1E1E !important' }}>
                    <div className="table-responsive">
                        <Table hover variant="dark" className="mb-0 align-middle custom-table">
                            <thead className="bg-black text-secondary small text-uppercase">
                                <tr>
                                    <th className="px-4 py-3 border-secondary">#</th>
                                    <th className="px-4 py-3 border-secondary" style={{ minWidth: '300px' }}>Question Content</th>
                                    <th className="px-4 py-3 border-secondary text-center">Type</th>
                                    <th className="px-4 py-3 border-secondary text-center">Marks</th>
                                    <th className="px-4 py-3 border-secondary text-center">Negative</th>
                                    <th className="px-4 py-3 border-secondary text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paperQuestionList.loading ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5">
                                            <Spinner animation="border" variant="warning" size="sm" className="me-2" />
                                            <span className="text-secondary">Retrieving questions...</span>
                                        </td>
                                    </tr>
                                ) : questions.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-secondary">
                                            <FiFileText size={48} className="mb-3 opacity-25 d-block mx-auto" />
                                            No questions have been added to this paper yet.
                                        </td>
                                    </tr>
                                    ) : (
                                        questions.map((item, index) => (
                                            <tr key={item.paper_question_id || index} className="border-secondary">
                                                <td className="px-4 py-3 text-secondary">
                                                    {String(index + 1).padStart(2, '0')}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="text-white fw-medium text-wrap" style={{ maxWidth: '600px', fontSize: '0.95rem' }}>
                                                        {item.question_text}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <Badge bg="dark" className="text-warning border border-warning border-opacity-25 px-2 py-1 fw-normal">
                                                        {item.question_type}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-center fw-bold text-white">
                                                    {item.marks}
                                                </td>
                                                <td className="px-4 py-3 text-center text-danger">
                                                    {item.negative_marks || "0"}
                                                </td>
                                                <td className="px-4 py-3 text-end">
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        className="border-0 bg-transparent text-danger p-2 hover-bg-danger"
                                                    >
                                                        <FiTrash2 size={18} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card>
            </Container>

            <style>{`
                .bg-dark { background-color: #1E1E1E !important; }
                .border-secondary { border-color: #2D2D2D !important; }
                .custom-table tr:hover { background-color: #1a1a1a !important; }
                .truncate-text { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .hover-bg-danger:hover { background-color: rgba(220, 53, 69, 0.1) !important; }
                @media (min-width: 768px) {
                    .border-md-end { border-right: 1px solid #2D2D2D !important; }
                    .border-md-bottom-0 { border-bottom: 0 !important; }
                }
            `}</style>
        </div>
    );
};

export default PaperQuestionList;
