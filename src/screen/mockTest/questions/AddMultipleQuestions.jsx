// import React, { useState } from "react";
// import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";

// const emptyQuestion = {
//     question_type: "MCQ",
//     question_text: "",
//     marks: 1,
//     negative_marks: 0,
//     difficulty: "medium",
//     options: [
//         { option_text: "", is_correct: false },
//         { option_text: "", is_correct: false },
//         { option_text: "", is_correct: false },
//         { option_text: "", is_correct: false }
//     ]
// };

// const AddMultipleQuestions = ({ bankId, onSuccess, onCancel }) => {
//     const [questions, setQuestions] = useState([JSON.parse(JSON.stringify(emptyQuestion))]);

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

//     const submitQuestions = () => {
//         console.log("Sending payload:", {
//             bank_id: bankId,
//             questions: questions
//         });

//         // TODO: API CALL HERE  
//         // await addMultipleQuestions({bank_id: bankId, questions});

//         onSuccess();
//     };

//     return (
//         <Card className="mt-3">
//             <CardBody>
//                 <h5 className="fw-bold">Add Multiple Questions</h5>

//                 {questions.map((q, i) => (
//                     <Card className="p-3 my-3" key={i} style={{ border: "2px solid #ddd" }}>
//                         <h6>Question #{i + 1}</h6>

//                         <Row>
//                             <Col md={12} className="mt-2">
//                                 <label>Question Type</label>
//                                 <Input
//                                     type="select"
//                                     value={q.question_type}
//                                     onChange={(e) => updateQuestion(i, "question_type", e.target.value)}
//                                 >
//                                     <option>MCQ</option>
//                                     <option>TRUE_FALSE</option>
//                                     <option>DESCRIPTIVE</option>
//                                     <option>ASSERTION_REASON</option>
//                                     <option>MATCH_COLUMN</option>
//                                 </Input>
//                             </Col>

//                             <Col md={12} className="mt-3">
//                                 <label>Question Text</label>
//                                 <Input
//                                     type="textarea"
//                                     value={q.question_text}
//                                     onChange={(e) => updateQuestion(i, "question_text", e.target.value)}
//                                 />
//                             </Col>

//                             {/* MCQ OPTIONS */}
//                             {q.question_type === "MCQ" && (
//                                 <Col md={12} className="mt-3">
//                                     <label>Options</label>
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
//                                             <Col md={3}>
//                                                 <Input
//                                                     type="checkbox"
//                                                     checked={opt.is_correct}
//                                                     onChange={(e) =>
//                                                         updateOption(i, oi, "is_correct", e.target.checked)
//                                                     }
//                                                 />
//                                                 Correct
//                                             </Col>
//                                         </Row>
//                                     ))}
//                                 </Col>
//                             )}

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

//                 {/* ADD NEW QUESTION BUTTON */}
//                 <Button color="secondary" onClick={addNewQuestion}>
//                     + Add Another Question
//                 </Button>

//                 <div className="mt-3">
//                     <Button color="success" className="me-2" onClick={submitQuestions}>
//                         Save All Questions
//                     </Button>
//                     <Button color="danger" onClick={onCancel}>
//                         Cancel
//                     </Button>
//                 </div>
//             </CardBody>
//         </Card>
//     );
// };

// export default AddMultipleQuestions;
import React, { useState } from "react";
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";
import { useCommonContext } from "../../../helper/CommonProvider";
import { useParams } from "react-router-dom";

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
};


const AddMultipleQuestions = () => {
    const [questions, setQuestions] = useState([JSON.parse(JSON.stringify(emptyQuestion))]);
    const { addMultipuleQuestion } = useCommonContext();
    const { id } = useParams();
    const addNewQuestion = () => {
        setQuestions([...questions, JSON.parse(JSON.stringify(emptyQuestion))]);
    };

    const updateQuestion = (index, field, value) => {
        const updated = [...questions];
        updated[index][field] = value;
        setQuestions(updated);
    };

    const updateOption = (qIndex, optIndex, field, value) => {
        const updated = [...questions];
        updated[qIndex].options[optIndex][field] = value;
        setQuestions(updated);
    };

    const updateMatchColumn = (qIndex, side, i, value) => {
        const updated = [...questions];
        updated[qIndex][side][i] = value;
        setQuestions(updated);
    };
    const bank_id = id

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

            // MCQ
            if (q.question_type === "MCQ") {
                formatted.options = q.options;
            }

            // TRUE FALSE
            if (q.question_type === "TRUE_FALSE") {
                formatted.options = [
                    { option_text: "TRUE", is_correct: q.true_false === "TRUE" },
                    { option_text: "FALSE", is_correct: q.true_false === "FALSE" }
                ];
            }

            // ASSERTION – REASON
            if (q.question_type === "ASSERTION_REASON") {
                formatted.assertion = q.assertion;
                formatted.reason = q.reason;
                formatted.correct_assertion_reason = q.correct_assertion_reason;
            }

            // MATCH THE COLUMN
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


            return formatted;
        });

        console.log({
            bank_id: id,
            questions: finalQuestions
        });

        addMultipuleQuestion(id, finalQuestions);
    };

    return (
        <Card className="mt-3">
            <CardBody>
                <h4 className="fw-bold">Add Multiple Questions</h4>

                {questions.map((q, i) => (
                    <Card key={i} className="p-3 my-3 shadow-sm border">
                        <h6 className="fw-bold mb-3">Question #{i + 1}</h6>

                        {/* QUESTION TYPE */}
                        <Row>
                            <Col md={4}>
                                <label>Question Type</label>
                                <Input
                                    type="select"
                                    value={q.question_type}
                                    onChange={(e) => updateQuestion(i, "question_type", e.target.value)}
                                >
                                    <option value="MCQ">MCQ</option>
                                    <option value="TRUE_FALSE">TRUE / FALSE</option>
                                    <option value="DESCRIPTIVE">Descriptive</option>
                                    <option value="ASSERTION_REASON">Assertion – Reason</option>
                                    <option value="MATCH_COLUMN">Match the Column</option>
                                </Input>
                            </Col>

                            <Col md={8}>
                                <label>Question Text</label>
                                <Input
                                    type="textarea"
                                    value={q.question_text}
                                    onChange={(e) => updateQuestion(i, "question_text", e.target.value)}
                                />
                            </Col>

                            {/* MCQ SECTION */}
                            {q.question_type === "MCQ" && (
                                <Col md={12} className="mt-3">
                                    <label className="fw-bold">Options</label>
                                    {q.options.map((opt, oi) => (
                                        <Row key={oi} className="mb-2">
                                            <Col md={9}>
                                                <Input
                                                    placeholder={`Option ${oi + 1}`}
                                                    value={opt.option_text}
                                                    onChange={(e) =>
                                                        updateOption(i, oi, "option_text", e.target.value)
                                                    }
                                                />
                                            </Col>
                                            <Col md={3} className="d-flex align-items-center">
                                                <Input
                                                    type="checkbox"
                                                    checked={opt.is_correct}
                                                    onChange={(e) =>
                                                        updateOption(i, oi, "is_correct", e.target.checked)
                                                    }
                                                />
                                                <span className="ms-2">Correct</span>
                                            </Col>
                                        </Row>
                                    ))}
                                </Col>
                            )}

                            {/* TRUE FALSE */}
                            {q.question_type === "TRUE_FALSE" && (
                                <Col md={12} className="mt-3">
                                    <label className="fw-bold">Select Correct Answer</label>
                                    <Input
                                        type="select"
                                        value={q.true_false || ""}
                                        onChange={(e) => updateQuestion(i, "true_false", e.target.value)}
                                    >
                                        <option value="">-- Select --</option>
                                        <option value="TRUE">TRUE</option>
                                        <option value="FALSE">FALSE</option>
                                    </Input>
                                </Col>
                            )}

                            {/* DESCRIPTIVE */}
                            {q.question_type === "DESCRIPTIVE" && (
                                <Col md={12} className="mt-3">
                                    <label className="fw-bold">Expected Answer (Optional)</label>
                                    <Input
                                        type="textarea"
                                        placeholder="Add explanation or expected answer"
                                        value={q.explanation}
                                        onChange={(e) => updateQuestion(i, "explanation", e.target.value)}
                                    />
                                </Col>
                            )}

                            {/* ASSERTION – REASON */}
                            {q.question_type === "ASSERTION_REASON" && (
                                <>
                                    <Col md={12} className="mt-3">
                                        <label className="fw-bold">Assertion</label>
                                        <Input
                                            type="textarea"
                                            value={q.assertion}
                                            onChange={(e) => updateQuestion(i, "assertion", e.target.value)}
                                        />
                                    </Col>

                                    <Col md={12} className="mt-3">
                                        <label className="fw-bold">Reason</label>
                                        <Input
                                            type="textarea"
                                            value={q.reason}
                                            onChange={(e) => updateQuestion(i, "reason", e.target.value)}
                                        />
                                    </Col>

                                    <Col md={12} className="mt-3">
                                        <label className="fw-bold">Correct Answer Type</label>
                                        <Input
                                            type="select"
                                            value={q.correct_assertion_reason || ""}
                                            onChange={(e) =>
                                                updateQuestion(i, "correct_assertion_reason", e.target.value)
                                            }
                                        >
                                            <option value="">-- Select --</option>
                                            <option>A and R both true, R explains A</option>
                                            <option>A and R both true, R does NOT explain A</option>
                                            <option>A true, R false</option>
                                            <option>A false, R true</option>
                                            <option>A false, R false</option>
                                        </Input>
                                    </Col>
                                </>
                            )}

                            {/* MATCH COLUMN */}
                            {/* MATCH COLUMN */}
                            {q.question_type === "MATCH_COLUMN" && (
                                <Col md={12} className="mt-3">
                                    <label className="fw-bold">Match The Column</label>
                                    <Row>
                                        {/* LEFT COLUMN */}
                                        <Col md={4}>
                                            <h6>Column A</h6>
                                            {q.match_left.map((item, idx) => (
                                                <Input
                                                    className="mb-2"
                                                    key={idx}
                                                    placeholder={`A${idx + 1}`}
                                                    value={item}
                                                    onChange={(e) =>
                                                        updateMatchColumn(i, "match_left", idx, e.target.value)
                                                    }
                                                />
                                            ))}
                                        </Col>

                                        {/* RIGHT COLUMN */}
                                        <Col md={4}>
                                            <h6>Column B</h6>
                                            {q.match_right.map((item, idx) => (
                                                <Input
                                                    className="mb-2"
                                                    key={idx}
                                                    placeholder={`B${idx + 1}`}
                                                    value={item}
                                                    onChange={(e) =>
                                                        updateMatchColumn(i, "match_right", idx, e.target.value)
                                                    }
                                                />
                                            ))}
                                        </Col>

                                        {/* CORRECT ANSWERS */}
                                        <Col md={4}>
                                            <h6>Correct Mapping</h6>
                                            {q.match_left.map((_, idx) => (
                                                <Row key={idx} className="mb-2">
                                                    <Col md={4} className="d-flex align-items-center fw-bold">
                                                        A{idx + 1}
                                                    </Col>
                                                    <Col md={8}>
                                                        <Input
                                                            type="select"
                                                            value={q.match_answers[idx] || ""}
                                                            onChange={(e) =>
                                                                updateMatchColumn(i, "match_answers", idx, e.target.value)
                                                            }
                                                        >
                                                            <option value="">-- Select B --</option>
                                                            {q.match_right.map((_, bIndex) => (
                                                                <option key={bIndex} value={bIndex + 1}>
                                                                    B{bIndex + 1}
                                                                </option>
                                                            ))}
                                                        </Input>
                                                    </Col>
                                                </Row>
                                            ))}
                                        </Col>
                                    </Row>
                                </Col>
                            )}


                            {/* Marks, Difficulty, Explanation */}
                            <Col md={4} className="mt-3">
                                <label>Marks</label>
                                <Input
                                    type="number"
                                    value={q.marks}
                                    onChange={(e) => updateQuestion(i, "marks", e.target.value)}
                                />
                            </Col>

                            <Col md={4} className="mt-3">
                                <label>Negative Marks</label>
                                <Input
                                    type="number"
                                    value={q.negative_marks}
                                    onChange={(e) => updateQuestion(i, "negative_marks", e.target.value)}
                                />
                            </Col>

                            <Col md={4} className="mt-3">
                                <label>Difficulty</label>
                                <Input
                                    type="select"
                                    value={q.difficulty}
                                    onChange={(e) => updateQuestion(i, "difficulty", e.target.value)}
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </Input>
                            </Col>
                        </Row>
                    </Card>
                ))}

                <Button color="secondary" onClick={addNewQuestion}>
                    + Add Another Question
                </Button>

                <div className="mt-3">
                    <Button color="success" className="me-2" onClick={submitQuestions}>
                        Save All Questions
                    </Button>
                    <Button color="danger" >
                        Cancel
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default AddMultipleQuestions;
