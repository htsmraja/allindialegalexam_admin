import React, { useState, useEffect } from "react";
import CommonBreadcrumb from "../../../component/common/bread-crumb";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useCommonContext } from "../../../helper/CommonProvider";

const AddMultipleMCQ = () => {
    const navigate = useNavigate();
    const { getQuestionBanks, questionBankList, addQuestions, } = useCommonContext();

    const [questions, setQuestions] = useState([
        {
            bank_id: "",
            question_type: "MCQ",
            question_text: "",
            marks: 1,
            negative_marks: 0,
            difficulty: "medium",
            explanation: "",
            options: [
                { option_text: "", is_correct: 0 },
                { option_text: "", is_correct: 0 },
                { option_text: "", is_correct: 0 },
                { option_text: "", is_correct: 0 },
            ],
        },
    ]);

    useEffect(() => {
        getQuestionBanks(); // Load question banks
    }, []);

    // ----------------------------
    // Handle Question Field Change
    // ----------------------------
    const handleQuestionChange = (i, e) => {
        const newQuestions = [...questions];
        newQuestions[i][e.target.name] = e.target.value;
        setQuestions(newQuestions);
    };

    // ----------------------------
    // Handle Option Change
    // ----------------------------
    const handleOptionChange = (qIndex, optIndex, e) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[optIndex].option_text = e.target.value;
        setQuestions(newQuestions);
    };

    // ----------------------------
    // Mark Correct Option
    // ----------------------------
    const handleCorrectOption = (qIndex, optIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options.forEach((opt, i) => {
            opt.is_correct = i === optIndex ? 1 : 0;
        });
        setQuestions(newQuestions);
    };

    // ----------------------------
    // Add New Question
    // ----------------------------
    const addNewQuestion = () => {
        setQuestions([
            ...questions,
            {
                bank_id: "",
                question_type: "MCQ",
                question_text: "",
                marks: 1,
                negative_marks: 0,
                difficulty: "medium",
                explanation: "",
                options: [
                    { option_text: "", is_correct: 0 },
                    { option_text: "", is_correct: 0 },
                    { option_text: "", is_correct: 0 },
                    { option_text: "", is_correct: 0 },
                ],
            },
        ]);
    };

    // ----------------------------
    // Submit All Questions
    // ----------------------------
    const handleSubmit = async () => {
        await addQuestions({ questions });
    };

    return (
        <>
            <CommonBreadcrumb title="Add Multiple MCQ Questions" />

            <div className="p-3">
                <div
                    style={{
                        backgroundColor: "#f5f5f5",
                        padding: "20px",
                        borderRadius: "10px",
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Add MCQ Questions</h4>
                        <Button color="secondary" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </div>

                    {questions.map((q, qIndex) => (
                        <div className="card p-3 mb-4" key={qIndex}>
                            <h5>
                                Question {qIndex + 1}
                                <span className="text-muted ms-2">(MCQ)</span>
                            </h5>

                            <div className="row mt-3">

                                {/* Question Bank */}
                                <div className="col-md-4">
                                    <FormGroup>
                                        <Label>Select Question Bank</Label>
                                        <Input
                                            type="select"
                                            name="bank_id"
                                            value={q.bank_id}
                                            onChange={(e) => handleQuestionChange(qIndex, e)}
                                        >
                                            <option value="">Select Bank</option>
                                            {questionBankList?.data?.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.title}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </div>

                                {/* Difficulty */}
                                <div className="col-md-4">
                                    <FormGroup>
                                        <Label>Difficulty</Label>
                                        <Input
                                            type="select"
                                            name="difficulty"
                                            value={q.difficulty}
                                            onChange={(e) => handleQuestionChange(qIndex, e)}
                                        >
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </Input>
                                    </FormGroup>
                                </div>

                                {/* Marks */}
                                <div className="col-md-2">
                                    <FormGroup>
                                        <Label>Marks</Label>
                                        <Input
                                            type="number"
                                            name="marks"
                                            value={q.marks}
                                            onChange={(e) => handleQuestionChange(qIndex, e)}
                                        />
                                    </FormGroup>
                                </div>

                                {/* Negative Marks */}
                                <div className="col-md-2">
                                    <FormGroup>
                                        <Label>Negative Marks</Label>
                                        <Input
                                            type="number"
                                            name="negative_marks"
                                            value={q.negative_marks}
                                            onChange={(e) => handleQuestionChange(qIndex, e)}
                                        />
                                    </FormGroup>
                                </div>

                                {/* Question Text */}
                                <div className="col-md-12">
                                    <FormGroup>
                                        <Label>Question Text</Label>
                                        <Input
                                            type="textarea"
                                            name="question_text"
                                            rows={3}
                                            value={q.question_text}
                                            onChange={(e) => handleQuestionChange(qIndex, e)}
                                            placeholder="Enter the question"
                                        />
                                    </FormGroup>
                                </div>
                            </div>

                            {/* OPTIONS */}
                            <h6 className="mt-3">Options</h6>
                            <div className="row">
                                {q.options.map((opt, optIndex) => (
                                    <div className="col-md-6 mt-2" key={optIndex}>
                                        <FormGroup>
                                            <Label>
                                                Option {optIndex + 1}
                                                <Input
                                                    className="ms-2"
                                                    type="radio"
                                                    name={`correct_${qIndex}`}
                                                    checked={opt.is_correct === 1}
                                                    onChange={() => handleCorrectOption(qIndex, optIndex)}
                                                />
                                                <span className="ms-1 text-success">
                                                    {opt.is_correct === 1 ? "(Correct)" : ""}
                                                </span>
                                            </Label>

                                            <Input
                                                type="text"
                                                value={opt.option_text}
                                                onChange={(e) => handleOptionChange(qIndex, optIndex, e)}
                                                placeholder="Enter option text"
                                            />
                                        </FormGroup>
                                    </div>
                                ))}
                            </div>

                            {/* Explanation */}
                            <div className="col-md-12 mt-3">
                                <FormGroup>
                                    <Label>Explanation (optional)</Label>
                                    <Input
                                        type="textarea"
                                        name="explanation"
                                        rows={2}
                                        value={q.explanation}
                                        onChange={(e) => handleQuestionChange(qIndex, e)}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    ))}

                    <Button color="info" onClick={addNewQuestion}>
                        + Add Another Question
                    </Button>

                    <div className="text-end mt-4">
                        <Button color="primary" onClick={handleSubmit}>
                            Submit All Questions
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddMultipleMCQ;
