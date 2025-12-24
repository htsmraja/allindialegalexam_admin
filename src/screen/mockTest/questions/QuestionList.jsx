// import React, { useEffect, useState } from "react";
// import {
//     Button, Card, CardBody, Col, Container, Row, Table, Spinner
// } from "reactstrap";
// import { useNavigate, useParams } from "react-router-dom";
// import { useCommonContext } from "../../../helper/CommonProvider";
// import AddMultipleQuestions from "./AddMultipleQuestions";

// const QuestionList = () => {
//     const { id } = useParams(); // bank_id
//     const navigate = useNavigate();

//     const { getQuestionsByBank, questions } = useCommonContext();
//     const [showAddForm, setShowAddForm] = useState(false);

//     useEffect(() => {
//         getQuestionsByBank(id);
//     }, [id]);

//     return (
//         <>
//             <Container fluid>
//                 <Row>
//                     <Col sm="12">
//                         <Card>
//                             <CardBody>

//                                 {/* HEADER */}
//                                 <div className="d-flex justify-content-between">
//                                     <h4 className="fw-bold">Questions of Bank #{id}</h4>

//                                     <Button color="success" onClick={() => navigate(`/add-question/${id}`)}>
//                                         + Add Questions
//                                     </Button>
//                                 </div>




//                                 <Table bordered hover responsive className="mt-4">
//                                     <thead>
//                                         <tr>
//                                             <th>ID</th>
//                                             <th>Question</th>
//                                             <th>Type</th>
//                                             <th>Marks</th>
//                                             <th>Difficulty</th>
//                                             <th>Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {questions.loading ? (
//                                             <tr><td colSpan="10" className="text-center"><Spinner /></td></tr>
//                                         ) : questions.data?.length === 0 ? (
//                                             <tr><td colSpan="10" className="text-center">No Questions Found</td></tr>
//                                         ) : (
//                                             questions.data?.map((q) => (
//                                                 <tr key={q.id}>
//                                                     <td>{q.id}</td>
//                                                     <td>{q.question_text}</td>
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
//                                             ))
//                                         )}
//                                     </tbody>
//                                 </Table>
//                             </CardBody>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </>
//     );
// };

// export default QuestionList;
import React, { useEffect, useState } from "react";
import {
    Button, Card, CardBody, Col, Container, Row, Table, Spinner,
    Collapse
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useCommonContext } from "../../../helper/CommonProvider";

const QuestionList = () => {
    const { id } = useParams(); // bank_id
    const navigate = useNavigate();

    const { getQuestionsByBank, questions } = useCommonContext();

    const [openRow, setOpenRow] = useState(null);

    useEffect(() => {
        getQuestionsByBank(id);
    }, [id]);

    const toggleRow = (qid) => {
        setOpenRow(openRow === qid ? null : qid);
    };
    return (
        <Container fluid>
            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>

                            {/* HEADER */}
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="fw-bold">Questions of Bank #{id}</h4>

                                <Button
                                    color="success"
                                    onClick={() => navigate(`/add-question/${id}`)}
                                >
                                    + Add Questions
                                </Button>
                            </div>

                            <Table bordered hover responsive className="mt-4">
                                <thead>
                                    <tr>
                                        <th>SL No</th>
                                        <th>ID</th>
                                        <th>Question</th>
                                        <th>Type</th>
                                        <th>Marks</th>
                                        <th>Difficulty</th>
                                        <th width="150">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {questions.loading ? (
                                        <tr><td colSpan="10" className="text-center"><Spinner /></td></tr>
                                    ) : questions.data?.length === 0 ? (
                                        <tr><td colSpan="10" className="text-center">No Questions Found</td></tr>
                                    ) : (
                                        questions.data?.map((q, index) => (
                                            <>
                                                {/* MAIN ROW */}
                                                <tr key={q.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{q.id}</td>

                                                    <td>
                                                        <div className="d-flex justify-content-between">
                                                            <span>{q.question_text}</span>

                                                            <Button
                                                                size="sm"
                                                                color="secondary"
                                                                outline
                                                                onClick={() => toggleRow(q.id)}
                                                            >
                                                                {openRow === q.id ? "Hide" : "View"}
                                                            </Button>
                                                        </div>
                                                    </td>

                                                    <td>{q.question_type}</td>
                                                    <td>{q.marks}</td>
                                                    <td>{q.difficulty}</td>

                                                    <td>
                                                        <Button
                                                            color="primary"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => navigate(`/edit-question/${q.id}`)}
                                                        >
                                                            Edit
                                                        </Button>

                                                        <Button
                                                            color="danger"
                                                            size="sm"
                                                            onClick={() => console.log("Delete", q.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>

                                                {/* COLLAPSE PREVIEW */}
                                                <tr>
                                                    <td colSpan="6" className="p-0 bg-light">
                                                        <Collapse isOpen={openRow === q.id}>
                                                            <div className="p-3">

                                                                {/* MCQ OPTIONS */}
                                                                {q.question_type === "MCQ" && (
                                                                    <>
                                                                        <h6 className="fw-bold">Options:</h6>
                                                                        <ul>
                                                                            {q.options?.map((opt, index) => (
                                                                                <li key={index}>
                                                                                    {index + 1}. {opt.option_text}{" "}
                                                                                    {opt.is_correct === 1 && (
                                                                                        <span className="text-success fw-bold">(Correct)</span>
                                                                                    )}
                                                                                    {" "}
                                                                                </li>
                                                                            ))}
                                                                        </ul>


                                                                    </>
                                                                )}

                                                                {/* TRUE FALSE */}
                                                                {q.question_type === "TRUE_FALSE" && (
                                                                    <>
                                                                        <h6 className="fw-bold">Correct Answer:</h6>
                                                                        <p className="text-primary fw-bold">
                                                                            {q.true_false}
                                                                        </p>
                                                                    </>
                                                                )}

                                                                {/* ASSERTION / REASON */}
                                                                {q.question_type === "ASSERTION_REASON" && (
                                                                    <>
                                                                        <h6 className="fw-bold">Assertion:</h6>
                                                                        <p>{q.assertion}</p>

                                                                        <h6 className="fw-bold">Reason:</h6>
                                                                        <p>{q.reason}</p>

                                                                        <h6 className="fw-bold">Correct:</h6>
                                                                        <p className="text-success">
                                                                            {q.correct_assertion_reason}
                                                                        </p>
                                                                    </>
                                                                )}

                                                                {/* MATCH THE COLUMN */}
                                                                {q.question_type === "MATCH_COLUMN" && (
                                                                    <>
                                                                        <h6 className="fw-bold mb-2">Match the Columns:</h6>

                                                                        <Row>
                                                                            <Col md="6">
                                                                                <h6>A (Left)</h6>
                                                                                <ul>
                                                                                    {q.match_left?.map((item, i) => (
                                                                                        <li key={i}>A{i + 1}: {item}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            </Col>

                                                                            <Col md="6">
                                                                                <h6>B (Right)</h6>
                                                                                <ul>
                                                                                    {q.match_right?.map((item, i) => (
                                                                                        <li key={i}>B{i + 1}: {item}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            </Col>
                                                                        </Row>

                                                                        <h6 className="fw-bold mt-2">Correct Pairs:</h6>
                                                                        <ul>
                                                                            {Object.entries(q.correct_match || {}).map(([A, B]) => (
                                                                                <li key={A}>
                                                                                    {A} → {B}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </>
                                                                )}

                                                                {/* EXPLANATION */}
                                                                {q.explanation && (
                                                                    <>
                                                                        <h6 className="fw-bold">Explanation:</h6>
                                                                        <p>{q.explanation}</p>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </Collapse>
                                                    </td>
                                                </tr>
                                            </>
                                        ))
                                    )}
                                </tbody>
                            </Table>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default QuestionList;
