import React, { useState, useEffect } from "react";
import CommonBreadcrumb from "../../../component/common/bread-crumb";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useCommonContext } from "../../../helper/CommonProvider";
import { toast } from "react-toastify";

const AddQuestionBank = () => {
    const navigate = useNavigate();
    const { addQuestionBank, getExamTypeList, examTypeList, questionBankTypeList, getquestionBankTypeList } = useCommonContext();

    const [inputData, setInputData] = useState({
        title: "",
        description: "",
        exam_type_id: "",
        question_bank_type_id: ""
    });

    // Load Exam Types
    useEffect(() => {
        getExamTypeList();
        getquestionBankTypeList();
    }, []);

    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        const { title, exam_type_id, question_bank_type_id } = inputData;

        if (!title.trim()) {
            toast.warn("Title is required");
            return;
        }

        if (!exam_type_id) {
            toast.warn("Exam Type is required");
            return;
        }

        if (!question_bank_type_id) {
            toast.warn("Question Bank Type is required");
            return;
        }

        await addQuestionBank(inputData);
    };


    return (
        <>
            <CommonBreadcrumb title="Add Question Bank" />

            <div className="product-form-container p-3">
                <form
                    style={{
                        backgroundColor: "#f5f5f5",
                        padding: "20px",
                        borderRadius: "10px",
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Add New Question Bank</h4>
                        <Button color="secondary" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </div>

                    {/* Basic Information */}
                    <div className="card p-3 mb-3">
                        <h5>Basic Information</h5>

                        <div className="row mt-3">
                            {/* Title */}
                            <div className="col-md-4">
                                <FormGroup>
                                    <Label>Bank Title</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        value={inputData.title}
                                        onChange={handleChange}
                                        placeholder="Enter question bank title"
                                        required
                                    />
                                </FormGroup>
                            </div>

                            {/* Exam Type Dropdown */}
                            <div className="col-md-4">
                                <FormGroup>
                                    <Label>Exam Type</Label>
                                    <Input
                                        type="select"
                                        name="exam_type_id"
                                        value={inputData.exam_type_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Exam Type</option>
                                        {examTypeList?.data?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </div>
                            {/* Question Bank Type Dropdown */}
                            <div className="col-md-4">
                                <FormGroup>
                                    <Label>Question Bank Type</Label>
                                    <Input
                                        type="select"
                                        name="question_bank_type_id"
                                        value={inputData.question_bank_type_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Exam Type</option>
                                        {questionBankTypeList?.data?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </div>
                            {/* Description */}
                            <div className="col-md-12 mt-3">
                                <FormGroup>
                                    <Label>Description</Label>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        value={inputData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Enter description"
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </div>

                    <div className="text-end">
                        <Button color="primary" onClick={handleSubmit}>
                            Submit Question Bank
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddQuestionBank;
