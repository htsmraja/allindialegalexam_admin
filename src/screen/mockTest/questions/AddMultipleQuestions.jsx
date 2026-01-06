// // import React, { useState } from "react";
// // import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";

// // const emptyQuestion = {
// //     question_type: "MCQ",
// //     question_text: "",
// //     marks: 1,
// //     negative_marks: 0,
// //     difficulty: "medium",
// //     options: [
// //         { option_text: "", is_correct: false },
// //         { option_text: "", is_correct: false },
// //         { option_text: "", is_correct: false },
// //         { option_text: "", is_correct: false }
// //     ]
// // };

// // const AddMultipleQuestions = ({ bankId, onSuccess, onCancel }) => {
// //     const [questions, setQuestions] = useState([JSON.parse(JSON.stringify(emptyQuestion))]);

// //     const addNewQuestion = () => {
// //         setQuestions([...questions, JSON.parse(JSON.stringify(emptyQuestion))]);
// //     };

// //     const updateQuestion = (index, field, value) => {
// //         const updated = [...questions];
// //         updated[index][field] = value;
// //         setQuestions(updated);
// //     };

// //     const updateOption = (qIndex, optIndex, field, value) => {
// //         const updated = [...questions];
// //         updated[qIndex].options[optIndex][field] = value;
// //         setQuestions(updated);
// //     };

// //     const submitQuestions = () => {
// //         console.log("Sending payload:", {
// //             bank_id: bankId,
// //             questions: questions
// //         });

// //         // TODO: API CALL HERE
// //         // await addMultipleQuestions({bank_id: bankId, questions});

// //         onSuccess();
// //     };

// //     return (
// //         <Card className="mt-3">
// //             <CardBody>
// //                 <h5 className="fw-bold">Add Multiple Questions</h5>

// //                 {questions.map((q, i) => (
// //                     <Card className="p-3 my-3" key={i} style={{ border: "2px solid #ddd" }}>
// //                         <h6>Question #{i + 1}</h6>

// //                         <Row>
// //                             <Col md={12} className="mt-2">
// //                                 <label>Question Type</label>
// //                                 <Input
// //                                     type="select"
// //                                     value={q.question_type}
// //                                     onChange={(e) => updateQuestion(i, "question_type", e.target.value)}
// //                                 >
// //                                     <option>MCQ</option>
// //                                     <option>TRUE_FALSE</option>
// //                                     <option>DESCRIPTIVE</option>
// //                                     <option>ASSERTION_REASON</option>
// //                                     <option>MATCH_COLUMN</option>
// //                                 </Input>
// //                             </Col>

// //                             <Col md={12} className="mt-3">
// //                                 <label>Question Text</label>
// //                                 <Input
// //                                     type="textarea"
// //                                     value={q.question_text}
// //                                     onChange={(e) => updateQuestion(i, "question_text", e.target.value)}
// //                                 />
// //                             </Col>

// //                             {/* MCQ OPTIONS */}
// //                             {q.question_type === "MCQ" && (
// //                                 <Col md={12} className="mt-3">
// //                                     <label>Options</label>
// //                                     {q.options.map((opt, oi) => (
// //                                         <Row key={oi} className="mb-2">
// //                                             <Col md={9}>
// //                                                 <Input
// //                                                     placeholder={`Option ${oi + 1}`}
// //                                                     value={opt.option_text}
// //                                                     onChange={(e) =>
// //                                                         updateOption(i, oi, "option_text", e.target.value)
// //                                                     }
// //                                                 />
// //                                             </Col>
// //                                             <Col md={3}>
// //                                                 <Input
// //                                                     type="checkbox"
// //                                                     checked={opt.is_correct}
// //                                                     onChange={(e) =>
// //                                                         updateOption(i, oi, "is_correct", e.target.checked)
// //                                                     }
// //                                                 />
// //                                                 Correct
// //                                             </Col>
// //                                         </Row>
// //                                     ))}
// //                                 </Col>
// //                             )}

// //                             <Col md={4} className="mt-3">
// //                                 <label>Marks</label>
// //                                 <Input
// //                                     type="number"
// //                                     value={q.marks}
// //                                     onChange={(e) => updateQuestion(i, "marks", e.target.value)}
// //                                 />
// //                             </Col>

// //                             <Col md={4} className="mt-3">
// //                                 <label>Negative Marks</label>
// //                                 <Input
// //                                     type="number"
// //                                     value={q.negative_marks}
// //                                     onChange={(e) => updateQuestion(i, "negative_marks", e.target.value)}
// //                                 />
// //                             </Col>

// //                             <Col md={4} className="mt-3">
// //                                 <label>Difficulty</label>
// //                                 <Input
// //                                     type="select"
// //                                     value={q.difficulty}
// //                                     onChange={(e) => updateQuestion(i, "difficulty", e.target.value)}
// //                                 >
// //                                     <option value="easy">Easy</option>
// //                                     <option value="medium">Medium</option>
// //                                     <option value="hard">Hard</option>
// //                                 </Input>
// //                             </Col>

// //                         </Row>
// //                     </Card>
// //                 ))}

// //                 {/* ADD NEW QUESTION BUTTON */}
// //                 <Button color="secondary" onClick={addNewQuestion}>
// //                     + Add Another Question
// //                 </Button>

// //                 <div className="mt-3">
// //                     <Button color="success" className="me-2" onClick={submitQuestions}>
// //                         Save All Questions
// //                     </Button>
// //                     <Button color="danger" onClick={onCancel}>
// //                         Cancel
// //                     </Button>
// //                 </div>
// //             </CardBody>
// //         </Card>
// //     );
// // };

// // export default AddMultipleQuestions;
// import React, { useState } from "react";
// import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";
// import { useCommonContext } from "../../../helper/CommonProvider";
// import { useParams } from "react-router-dom";

// const emptyQuestion = {
//     question_type: "MCQ",
//     question_text: "",
//     question_image: "",
//     marks: 1,
//     negative_marks: 0,
//     difficulty: "medium",
//     explanation: "",

//     options: [
//         { option_text: "", is_correct: false },
//         { option_text: "", is_correct: false },
//         { option_text: "", is_correct: false },
//         { option_text: "", is_correct: false }
//     ],

//     true_false: null,

//     assertion: "",
//     reason: "",
//     correct_assertion_reason: "",

//     match_left: ["", "", "", ""],
//     match_right: ["", "", "", ""],

//     match_answers: ["", "", "", ""],
// };


// const AddMultipleQuestions = () => {
//     const [questions, setQuestions] = useState([JSON.parse(JSON.stringify(emptyQuestion))]);
//     const { addMultipuleQuestion } = useCommonContext();
//     const { id } = useParams();
//     const addNewQuestion = () => {
//         setQuestions([...questions, JSON.parse(JSON.stringify(emptyQuestion))]);
//     };

//     const updateQuestion = (index, field, value) => {
//         const updated = [...questions];
//         updated[index][field] = value;
//         setQuestions(updated);
//     };

//     const updateOption = (qIndex, optIndex, field, value) => {
//         const updated = [...questions];
//         updated[qIndex].options[optIndex][field] = value;
//         setQuestions(updated);
//     };

//     const updateMatchColumn = (qIndex, side, i, value) => {
//         const updated = [...questions];
//         updated[qIndex][side][i] = value;
//         setQuestions(updated);
//     };
//     const bank_id = id

//     const submitQuestions = () => {
//         const finalQuestions = questions.map(q => {
//             let formatted = {
//                 question_type: q.question_type,
//                 question_text: q.question_text,
//                 marks: q.marks,
//                 negative_marks: q.negative_marks,
//                 difficulty: q.difficulty,
//                 explanation: q.explanation || null,
//             };

//             // MCQ
//             if (q.question_type === "MCQ") {
//                 formatted.options = q.options;
//             }

//             // TRUE FALSE
//             if (q.question_type === "TRUE_FALSE") {
//                 formatted.options = [
//                     { option_text: "TRUE", is_correct: q.true_false === "TRUE" },
//                     { option_text: "FALSE", is_correct: q.true_false === "FALSE" }
//                 ];
//             }

//             // ASSERTION – REASON
//             if (q.question_type === "ASSERTION_REASON") {
//                 formatted.assertion = q.assertion;
//                 formatted.reason = q.reason;
//                 formatted.correct_assertion_reason = q.correct_assertion_reason;
//             }

//             // MATCH THE COLUMN
//             if (q.question_type === "MATCH_COLUMN") {
//                 formatted.match_left = q.match_left;
//                 formatted.match_right = q.match_right;

//                 formatted.match_answers = q.match_answers
//                     .map((bIndex, leftIndex) => ({
//                         left_position: leftIndex + 1,
//                         right_position: parseInt(bIndex) || null
//                     }))
//                     .filter(a => a.right_position !== null);
//             }


//             return formatted;
//         });

//         console.log({
//             bank_id: id,
//             questions: finalQuestions
//         });

//         addMultipuleQuestion(id, finalQuestions);
//     };

//     return (
//         <Card className="mt-3">
//             <CardBody>
//                 <h4 className="fw-bold">Add Multiple Questions</h4>

//                 {questions.map((q, i) => (
//                     <Card key={i} className="p-3 my-3 shadow-sm border">
//                         <h6 className="fw-bold mb-3">Question #{i + 1}</h6>

//                         {/* QUESTION TYPE */}
//                         <Row>
//                             <Col md={4}>
//                                 <label>Question Type</label>
//                                 <Input
//                                     type="select"
//                                     value={q.question_type}
//                                     onChange={(e) => updateQuestion(i, "question_type", e.target.value)}
//                                 >
//                                     <option value="MCQ">MCQ</option>
//                                     <option value="TRUE_FALSE">TRUE / FALSE</option>
//                                     <option value="DESCRIPTIVE">Descriptive</option>
//                                     <option value="ASSERTION_REASON">Assertion – Reason</option>
//                                     <option value="MATCH_COLUMN">Match the Column</option>
//                                 </Input>
//                             </Col>

//                             <Col md={8}>
//                                 <label>Question Text</label>
//                                 <Input
//                                     type="textarea"
//                                     value={q.question_text}
//                                     onChange={(e) => updateQuestion(i, "question_text", e.target.value)}
//                                 />
//                             </Col>

//                             {/* MCQ SECTION */}
//                             {q.question_type === "MCQ" && (
//                                 <Col md={12} className="mt-3">
//                                     <label className="fw-bold">Options</label>
//                                     {q.options.map((opt, oi) => (
//                                         <Row key={oi} className="mb-2">
//                                             <Col md={9}>
//                                                 <Input
//                                                     placeholder={`Option ${oi + 1}`}
//                                                     value={opt.option_text}
//                                                     onChange={(e) =>
//                                                         updateOption(i, oi, "option_text", e.target.value)
//                                                     }
//                                                 />
//                                             </Col>
//                                             <Col md={3} className="d-flex align-items-center">
//                                                 <Input
//                                                     type="checkbox"
//                                                     checked={opt.is_correct}
//                                                     onChange={(e) =>
//                                                         updateOption(i, oi, "is_correct", e.target.checked)
//                                                     }
//                                                 />
//                                                 <span className="ms-2">Correct</span>
//                                             </Col>
//                                         </Row>
//                                     ))}
//                                 </Col>
//                             )}

//                             {/* TRUE FALSE */}
//                             {q.question_type === "TRUE_FALSE" && (
//                                 <Col md={12} className="mt-3">
//                                     <label className="fw-bold">Select Correct Answer</label>
//                                     <Input
//                                         type="select"
//                                         value={q.true_false || ""}
//                                         onChange={(e) => updateQuestion(i, "true_false", e.target.value)}
//                                     >
//                                         <option value="">-- Select --</option>
//                                         <option value="TRUE">TRUE</option>
//                                         <option value="FALSE">FALSE</option>
//                                     </Input>
//                                 </Col>
//                             )}

//                             {/* DESCRIPTIVE */}
//                             {q.question_type === "DESCRIPTIVE" && (
//                                 <Col md={12} className="mt-3">
//                                     <label className="fw-bold">Expected Answer (Optional)</label>
//                                     <Input
//                                         type="textarea"
//                                         placeholder="Add explanation or expected answer"
//                                         value={q.explanation}
//                                         onChange={(e) => updateQuestion(i, "explanation", e.target.value)}
//                                     />
//                                 </Col>
//                             )}

//                             {/* ASSERTION – REASON */}
//                             {q.question_type === "ASSERTION_REASON" && (
//                                 <>
//                                     <Col md={12} className="mt-3">
//                                         <label className="fw-bold">Assertion</label>
//                                         <Input
//                                             type="textarea"
//                                             value={q.assertion}
//                                             onChange={(e) => updateQuestion(i, "assertion", e.target.value)}
//                                         />
//                                     </Col>

//                                     <Col md={12} className="mt-3">
//                                         <label className="fw-bold">Reason</label>
//                                         <Input
//                                             type="textarea"
//                                             value={q.reason}
//                                             onChange={(e) => updateQuestion(i, "reason", e.target.value)}
//                                         />
//                                     </Col>

//                                     <Col md={12} className="mt-3">
//                                         <label className="fw-bold">Correct Answer Type</label>
//                                         <Input
//                                             type="select"
//                                             value={q.correct_assertion_reason || ""}
//                                             onChange={(e) =>
//                                                 updateQuestion(i, "correct_assertion_reason", e.target.value)
//                                             }
//                                         >
//                                             <option value="">-- Select --</option>
//                                             <option>A and R both true, R explains A</option>
//                                             <option>A and R both true, R does NOT explain A</option>
//                                             <option>A true, R false</option>
//                                             <option>A false, R true</option>
//                                             <option>A false, R false</option>
//                                         </Input>
//                                     </Col>
//                                 </>
//                             )}

//                             {/* MATCH COLUMN */}
//                             {/* MATCH COLUMN */}
//                             {q.question_type === "MATCH_COLUMN" && (
//                                 <Col md={12} className="mt-3">
//                                     <label className="fw-bold">Match The Column</label>
//                                     <Row>
//                                         {/* LEFT COLUMN */}
//                                         <Col md={4}>
//                                             <h6>Column A</h6>
//                                             {q.match_left.map((item, idx) => (
//                                                 <Input
//                                                     className="mb-2"
//                                                     key={idx}
//                                                     placeholder={`A${idx + 1}`}
//                                                     value={item}
//                                                     onChange={(e) =>
//                                                         updateMatchColumn(i, "match_left", idx, e.target.value)
//                                                     }
//                                                 />
//                                             ))}
//                                         </Col>

//                                         {/* RIGHT COLUMN */}
//                                         <Col md={4}>
//                                             <h6>Column B</h6>
//                                             {q.match_right.map((item, idx) => (
//                                                 <Input
//                                                     className="mb-2"
//                                                     key={idx}
//                                                     placeholder={`B${idx + 1}`}
//                                                     value={item}
//                                                     onChange={(e) =>
//                                                         updateMatchColumn(i, "match_right", idx, e.target.value)
//                                                     }
//                                                 />
//                                             ))}
//                                         </Col>

//                                         {/* CORRECT ANSWERS */}
//                                         <Col md={4}>
//                                             <h6>Correct Mapping</h6>
//                                             {q.match_left.map((_, idx) => (
//                                                 <Row key={idx} className="mb-2">
//                                                     <Col md={4} className="d-flex align-items-center fw-bold">
//                                                         A{idx + 1}
//                                                     </Col>
//                                                     <Col md={8}>
//                                                         <Input
//                                                             type="select"
//                                                             value={q.match_answers[idx] || ""}
//                                                             onChange={(e) =>
//                                                                 updateMatchColumn(i, "match_answers", idx, e.target.value)
//                                                             }
//                                                         >
//                                                             <option value="">-- Select B --</option>
//                                                             {q.match_right.map((_, bIndex) => (
//                                                                 <option key={bIndex} value={bIndex + 1}>
//                                                                     B{bIndex + 1}
//                                                                 </option>
//                                                             ))}
//                                                         </Input>
//                                                     </Col>
//                                                 </Row>
//                                             ))}
//                                         </Col>
//                                     </Row>
//                                 </Col>
//                             )}


//                             {/* Marks, Difficulty, Explanation */}
//                             <Col md={4} className="mt-3">
//                                 <label>Marks</label>
//                                 <Input
//                                     type="number"
//                                     value={q.marks}
//                                     onChange={(e) => updateQuestion(i, "marks", e.target.value)}
//                                 />
//                             </Col>

//                             <Col md={4} className="mt-3">
//                                 <label>Negative Marks</label>
//                                 <Input
//                                     type="number"
//                                     value={q.negative_marks}
//                                     onChange={(e) => updateQuestion(i, "negative_marks", e.target.value)}
//                                 />
//                             </Col>

//                             <Col md={4} className="mt-3">
//                                 <label>Difficulty</label>
//                                 <Input
//                                     type="select"
//                                     value={q.difficulty}
//                                     onChange={(e) => updateQuestion(i, "difficulty", e.target.value)}
//                                 >
//                                     <option value="easy">Easy</option>
//                                     <option value="medium">Medium</option>
//                                     <option value="hard">Hard</option>
//                                 </Input>
//                             </Col>
//                         </Row>
//                     </Card>
//                 ))}

//                 <Button color="secondary" onClick={addNewQuestion}>
//                     + Add Another Question
//                 </Button>

//                 <div className="mt-3">
//                     <Button color="success" className="me-2" onClick={submitQuestions}>
//                         Save All Questions
//                     </Button>
//                     <Button color="danger" >
//                         Cancel
//                     </Button>
//                 </div>
//             </CardBody>
//         </Card>
//     );
// };

// export default AddMultipleQuestions;


import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Stack,
    Badge,
    InputGroup
} from 'react-bootstrap';
import {
    FiPlus,
    FiTrash2,
    FiSave,
    FiArrowLeft,
    FiSettings,
    FiFileText,
    FiLayers,
    FiCheckSquare,
    FiMinusCircle,
    FiList,
    FiInfo
} from 'react-icons/fi';
import { useCommonContext } from "../../../helper/CommonProvider";
import { useParams, useNavigate } from "react-router-dom";
import CommonBreadcrumb from "../../../component/common/bread-crumb";

const emptyQuestion = {
    question_type: "MCQ",
    question_text: "",
    question_image: "",
    marks: 1,
    negative_marks: 0,
    difficulty: "medium",
    explanation: "",
    options: [
        { option_text: "", is_correct: false },
        { option_text: "", is_correct: false },
        { option_text: "", is_correct: false },
        { option_text: "", is_correct: false }
    ],
    true_false: null,
    assertion: "",
    reason: "",
    correct_assertion_reason: "",
    match_left: ["", "", "", ""],
    match_right: ["", "", "", ""],
    match_answers: ["", "", "", ""],
    section: ""
};

const AddMultipleQuestions = () => {
    const [questions, setQuestions] = useState([JSON.parse(JSON.stringify(emptyQuestion))]);
    const { addMultipuleQuestion } = useCommonContext();
    const { id } = useParams();
    const navigate = useNavigate();

    const addNewQuestion = () => {
        setQuestions([...questions, JSON.parse(JSON.stringify(emptyQuestion))]);
    };

    const removeQuestion = (index) => {
        if (questions.length > 1) {
            const updated = questions.filter((_, i) => i !== index);
            setQuestions(updated);
        }
    };

    const updateQuestion = (index, field, value) => {
        setQuestions(prev => prev.map((q, i) => i === index ? { ...q, [field]: value } : q));
    };

    const updateOption = (qIndex, optIndex, field, value) => {
        setQuestions(prev => prev.map((q, i) => {
            if (i === qIndex) {
                const newOptions = q.options.map((opt, oi) => oi === optIndex ? { ...opt, [field]: value } : opt);
                return { ...q, options: newOptions };
            }
            return q;
        }));
    };

    const updateMatchColumn = (qIndex, side, itemIndex, value) => {
        setQuestions(prev => prev.map((q, i) => {
            if (i === qIndex) {
                const newSide = [...q[side]];
                newSide[itemIndex] = value;
                return { ...q, [side]: newSide };
            }
            return q;
        }));
    };

    const submitQuestions = () => {
        const finalQuestions = questions.map(q => {
            let formatted = {
                question_type: q.question_type,
                question_text: q.question_text,
                marks: q.marks,
                negative_marks: q.negative_marks,
                difficulty: q.difficulty,
                explanation: q.explanation || null,
            };

            if (q.question_type === "MCQ") {
                formatted.options = q.options;
            }

            if (q.question_type === "TRUE_FALSE") {
                formatted.options = [
                    { option_text: "TRUE", is_correct: q.true_false === "TRUE" },
                    { option_text: "FALSE", is_correct: q.true_false === "FALSE" }
                ];
            }

            if (q.question_type === "ASSERTION_REASON") {
                formatted.assertion = q.assertion;
                formatted.reason = q.reason;
                formatted.correct_assertion_reason = q.correct_assertion_reason;
            }

            if (q.question_type === "MATCH_COLUMN") {
                formatted.match_left = q.match_left;
                formatted.match_right = q.match_right;
                formatted.match_answers = q.match_answers
                    .map((bIndex, leftIndex) => ({
                        left_position: leftIndex + 1,
                        right_position: parseInt(bIndex) || null
                    }))
                    .filter(a => a.right_position !== null);
            }

            // Include section in formatted data
            formatted.section = q.section;

            return formatted;
        });

        addMultipuleQuestion(id, finalQuestions);
    };

    return (
        <div className="pb-5 text-white">
            {/* <CommonBreadcrumb title="Add Multiple Questions" /> */}

            <Container fluid className="mt-n4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => navigate(-1)}
                            className="border-secondary text-white rounded-circle p-2 d-flex align-items-center justify-content-center"
                        >
                            <FiArrowLeft size={18} />
                        </Button>
                        <div>
                            <h2 className="fw-bold mb-0 text-white">Bulk Question Entry</h2>
                            <p className="text-secondary small mb-0">Adding new questions to Bank ID #{id}</p>
                        </div>
                    </div>
                </div>

                <Row className="justify-content-center">
                    <Col lg={11}>
                        {questions.map((q, i) => (
                            <Card key={i} className="bg-dark border-secondary border-opacity-10 shadow-lg mb-5 overflow-hidden" style={{ backgroundColor: '#1E1E1E' }}>
                                <Card.Header className="bg-black bg-opacity-25 border-secondary border-opacity-10 p-3 d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center gap-2">
                                        <Badge bg="warning" className="text-black fw-bold">Q{i + 1}</Badge>
                                        <span className="text-secondary small fw-bold text-uppercase">Question Configuration</span>
                                    </div>
                                    {questions.length > 1 && (
                                        <Button
                                            variant="link"
                                            className="text-danger p-0 shadow-none"
                                            onClick={() => removeQuestion(i)}
                                        >
                                            <FiTrash2 className="me-1" /> Remove
                                        </Button>
                                    )}
                                </Card.Header>
                                <Card.Body className="p-4">
                                    <Row className="g-4">
                                        {/* Question Basics */}
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="text-secondary small fw-bold">QUESTION TYPE</Form.Label>
                                                <Form.Select
                                                    value={q.question_type}
                                                    onChange={(e) => updateQuestion(i, "question_type", e.target.value)}
                                                    className="bg-black border-secondary text-white py-2 focus-none"
                                                >
                                                    <option value="MCQ">MCQ</option>
                                                    <option value="TRUE_FALSE">TRUE / FALSE</option>
                                                    <option value="DESCRIPTIVE">Descriptive</option>
                                                    <option value="ASSERTION_REASON">Assertion – Reason</option>
                                                    <option value="MATCH_COLUMN">Match the Column</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Row className="g-2">
                                                {/* <Col xs={12}>
                                                    <Form.Group className="mb-2">
                                                        <Form.Label className="text-secondary small fw-bold">SECTION</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={q.section}
                                                            onChange={(e) => updateQuestion(i, "section", e.target.value)}
                                                            className="bg-black border-secondary text-white py-2 focus-none"
                                                            placeholder="e.g. Legal Reasoning"
                                                        />
                                                    </Form.Group>
                                                </Col> */}
                                                <Col xs={6}>
                                                    <Form.Group>
                                                        <Form.Label className="text-secondary small fw-bold">MARKS</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            value={q.marks}
                                                            onChange={(e) => updateQuestion(i, "marks", e.target.value)}
                                                            className="bg-black border-secondary text-white py-2 focus-none"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group>
                                                        <Form.Label className="text-secondary small fw-bold">NEG. MARKS</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            value={q.negative_marks}
                                                            onChange={(e) => updateQuestion(i, "negative_marks", e.target.value)}
                                                            className="bg-black border-secondary text-white py-2 focus-none"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} className="mt-3">
                                                    <Form.Group>
                                                        <Form.Label className="text-secondary small fw-bold">DIFFICULTY</Form.Label>
                                                        <Form.Select
                                                            value={q.difficulty}
                                                            onChange={(e) => updateQuestion(i, "difficulty", e.target.value)}
                                                            className="bg-black border-secondary text-white py-2 focus-none"
                                                        >
                                                            <option value="easy">Easy</option>
                                                            <option value="medium">Medium</option>
                                                            <option value="hard">Hard</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={8}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="text-secondary small fw-bold">QUESTION TEXT</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={4}
                                                    value={q.question_text}
                                                    onChange={(e) => updateQuestion(i, "question_text", e.target.value)}
                                                    placeholder="Type the question content here..."
                                                    className="bg-black border-secondary text-white py-2 focus-none h-100"
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <hr className="border-secondary opacity-25" />
                                        </Col>

                                        {/* Dynamic Sections Based on Type */}
                                        <Col md={12}>
                                            {q.question_type === "MCQ" && (
                                                <div className="bg-black bg-opacity-25 p-4 rounded border border-secondary border-opacity-50">
                                                    <h6 className="text-warning small fw-bold text-uppercase mb-4">
                                                        <FiCheckSquare className="me-2" /> Options Configuration
                                                    </h6>
                                                    <Row className="g-3">
                                                        {q.options.map((opt, oi) => (
                                                            <Col md={6} key={oi}>
                                                                <InputGroup>
                                                                    <InputGroup.Text className="bg-dark border-secondary text-secondary">
                                                                        <Form.Check
                                                                            type="checkbox"
                                                                            checked={opt.is_correct}
                                                                            onChange={(e) => updateOption(i, oi, "is_correct", e.target.checked)}
                                                                        />
                                                                    </InputGroup.Text>
                                                                    <Form.Control
                                                                        placeholder={`Option ${oi + 1}`}
                                                                        value={opt.option_text}
                                                                        onChange={(e) => updateOption(i, oi, "option_text", e.target.value)}
                                                                        className="bg-black border-secondary text-white py-2 focus-none"
                                                                    />
                                                                </InputGroup>
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                </div>
                                            )}

                                            {q.question_type === "TRUE_FALSE" && (
                                                <div className="bg-black bg-opacity-25 p-4 rounded border border-secondary border-opacity-50">
                                                    <h6 className="text-warning small fw-bold text-uppercase mb-3">Correct Answer</h6>
                                                    <Stack direction="horizontal" gap={3}>
                                                        <Button
                                                            variant={q.true_false === "TRUE" ? "success" : "outline-secondary"}
                                                            className="px-4 py-2"
                                                            onClick={() => updateQuestion(i, "true_false", "TRUE")}
                                                        >
                                                            TRUE
                                                        </Button>
                                                        <Button
                                                            variant={q.true_false === "FALSE" ? "danger" : "outline-secondary"}
                                                            className="px-4 py-2"
                                                            onClick={() => updateQuestion(i, "true_false", "FALSE")}
                                                        >
                                                            FALSE
                                                        </Button>
                                                    </Stack>
                                                </div>
                                            )}

                                            {q.question_type === "ASSERTION_REASON" && (
                                                <div className="bg-black bg-opacity-25 p-4 rounded border border-secondary border-opacity-50">
                                                    <Row className="g-4">
                                                        <Col md={12}>
                                                            <Form.Label className="text-secondary small fw-bold">ASSERTION</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                value={q.assertion}
                                                                onChange={(e) => updateQuestion(i, "assertion", e.target.value)}
                                                                className="bg-black border-secondary text-white py-2 focus-none"
                                                            />
                                                        </Col>
                                                        <Col md={12}>
                                                            <Form.Label className="text-secondary small fw-bold">REASON</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                value={q.reason}
                                                                onChange={(e) => updateQuestion(i, "reason", e.target.value)}
                                                                className="bg-black border-secondary text-white py-2 focus-none"
                                                            />
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Label className="text-secondary small fw-bold">CORRECT RELATIONSHIP</Form.Label>
                                                            <Form.Select
                                                                value={q.correct_assertion_reason || ""}
                                                                onChange={(e) => updateQuestion(i, "correct_assertion_reason", e.target.value)}
                                                                className="bg-black border-secondary text-white py-2 focus-none"
                                                            >
                                                                <option value="">-- Select --</option>
                                                                <option value="Both Correct, Reason Explains Assertion">Both Correct, Reason Explains Assertion</option>
                                                                <option value="Both Correct, Reason Does NOT Explain Assertion">Both Correct, Reason Does NOT Explain Assertion</option>
                                                                <option value="Assertion Correct, Reason Wrong">Assertion Correct, Reason Wrong</option>
                                                                <option value="Assertion Wrong, Reason Correct">Assertion Wrong, Reason Correct</option>
                                                                <option value="Both Wrong">Both Wrong</option>
                                                            </Form.Select>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )}

                                            {q.question_type === "MATCH_COLUMN" && (
                                                <div className="bg-black bg-opacity-25 p-4 rounded border border-secondary border-opacity-50">
                                                    <Row className="g-4">
                                                        <Col md={4}>
                                                            <h6 className="text-secondary small fw-bold mb-3">COLUMN A</h6>
                                                            {q.match_left.map((item, idx) => (
                                                                <div key={idx} className="mb-2 d-flex align-items-center gap-2">
                                                                    <span className="text-secondary small">A{idx + 1}</span>
                                                                    <Form.Control
                                                                        size="sm"
                                                                        value={item}
                                                                        onChange={(e) => updateMatchColumn(i, "match_left", idx, e.target.value)}
                                                                        className="bg-black border-secondary text-white py-1 focus-none"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </Col>
                                                        <Col md={4}>
                                                            <h6 className="text-secondary small fw-bold mb-3">COLUMN B</h6>
                                                            {q.match_right.map((item, idx) => (
                                                                <div key={idx} className="mb-2 d-flex align-items-center gap-2">
                                                                    <span className="text-secondary small">B{idx + 1}</span>
                                                                    <Form.Control
                                                                        size="sm"
                                                                        value={item}
                                                                        onChange={(e) => updateMatchColumn(i, "match_right", idx, e.target.value)}
                                                                        className="bg-black border-secondary text-white py-1 focus-none"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </Col>
                                                        <Col md={4}>
                                                            <h6 className="text-secondary small fw-bold mb-3">MAPPING</h6>
                                                            {q.match_left.map((_, idx) => (
                                                                <div key={idx} className="mb-2 d-flex align-items-center gap-2">
                                                                    <span className="text-secondary small fw-bold">A{idx + 1} → </span>
                                                                    <Form.Select
                                                                        size="sm"
                                                                        value={q.match_answers[idx] || ""}
                                                                        onChange={(e) => updateMatchColumn(i, "match_answers", idx, e.target.value)}
                                                                        className="bg-black border-secondary text-white py-1 focus-none"
                                                                    >
                                                                        <option value="">Select B</option>
                                                                        {q.match_right.map((_, bIdx) => (
                                                                            <option key={bIdx} value={bIdx + 1}>B{bIdx + 1}</option>
                                                                        ))}
                                                                    </Form.Select>
                                                                </div>
                                                            ))}
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )}
                                        </Col>

                                        {/* Explanation */}
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label className="text-secondary small fw-bold">EXPLANATION / MODEL ANSWER</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={2}
                                                    value={q.explanation}
                                                    onChange={(e) => updateQuestion(i, "explanation", e.target.value)}
                                                    placeholder="Add supporting explanation or solving steps..."
                                                    className="bg-black border-secondary text-white py-2 focus-none"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))}

                        <div className="d-flex flex-column gap-4 align-items-center mt-5">
                            <Button
                                onClick={addNewQuestion}
                                variant="outline-warning"
                                className="px-5 py-3 fw-bold border-2 d-flex align-items-center gap-2"
                                style={{ borderRadius: '12px' }}
                            >
                                <FiPlus size={24} /> ADD ANOTHER QUESTION
                            </Button>

                            <hr className="w-100 border-secondary opacity-25" />

                            <Stack direction="horizontal" gap={3} className="w-100 justify-content-end">
                                <Button
                                    variant="outline-secondary"
                                    className="px-5 py-2 border-secondary text-white"
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={submitQuestions}
                                    className="px-5 py-2 fw-bold text-black border-0 d-flex align-items-center gap-2"
                                    style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                                >
                                    <FiSave /> SAVE ALL QUESTIONS
                                </Button>
                            </Stack>
                        </div>
                    </Col>
                </Row>
            </Container>

            <style>{`
                .bg-dark { background-color: #1E1E1E !important; }
                .border-secondary { border-color: #2D2D2D !important; }
                .focus-none:focus { background-color: #000 !important; border-color: #fcca0c !important; color: white !important; }
                .focus-none { transition: all 0.2s ease; }
            `}</style>
        </div>
    );
};

export default AddMultipleQuestions;
