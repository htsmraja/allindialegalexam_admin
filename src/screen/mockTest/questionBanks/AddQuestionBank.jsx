// import React, { useState, useEffect } from "react";
// import CommonBreadcrumb from "../../../component/common/bread-crumb";
// import { useNavigate } from "react-router-dom";
// import { Button, FormGroup, Input, Label } from "reactstrap";
// import { useCommonContext } from "../../../helper/CommonProvider";
// import { toast } from "react-toastify";

// const AddQuestionBank = () => {
//     const navigate = useNavigate();
//     const { addQuestionBank, getExamTypeList, examTypeList, questionBankTypeList, getquestionBankTypeList } = useCommonContext();

//     const [inputData, setInputData] = useState({
//         title: "",
//         description: "",
//         exam_type_id: "",
//         question_bank_type_id: ""
//     });

//     // Load Exam Types
//     useEffect(() => {
//         getExamTypeList();
//         getquestionBankTypeList();
//     }, []);

//     const handleChange = (e) => {
//         setInputData({
//             ...inputData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async () => {
//         const { title, exam_type_id, question_bank_type_id } = inputData;

//         if (!title.trim()) {
//             toast.warn("Title is required");
//             return;
//         }

//         if (!exam_type_id) {
//             toast.warn("Exam Type is required");
//             return;
//         }

//         if (!question_bank_type_id) {
//             toast.warn("Question Bank Type is required");
//             return;
//         }

//         await addQuestionBank(inputData);
//     };


//     return (
//         <>
//             <CommonBreadcrumb title="Add Question Bank" />

//             <div className="product-form-container p-3">
//                 <form
//                     style={{
//                         backgroundColor: "#f5f5f5",
//                         padding: "20px",
//                         borderRadius: "10px",
//                     }}
//                 >
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h4>Add New Question Bank</h4>
//                         <Button color="secondary" onClick={() => navigate(-1)}>
//                             Back
//                         </Button>
//                     </div>

//                     {/* Basic Information */}
//                     <div className="card p-3 mb-3">
//                         <h5>Basic Information</h5>

//                         <div className="row mt-3">
//                             {/* Title */}
//                             <div className="col-md-4">
//                                 <FormGroup>
//                                     <Label>Bank Title</Label>
//                                     <Input
//                                         type="text"
//                                         name="title"
//                                         value={inputData.title}
//                                         onChange={handleChange}
//                                         placeholder="Enter question bank title"
//                                         required
//                                     />
//                                 </FormGroup>
//                             </div>

//                             {/* Exam Type Dropdown */}
//                             <div className="col-md-4">
//                                 <FormGroup>
//                                     <Label>Exam Type</Label>
//                                     <Input
//                                         type="select"
//                                         name="exam_type_id"
//                                         value={inputData.exam_type_id}
//                                         onChange={handleChange}
//                                         required
//                                     >
//                                         <option value="">Select Exam Type</option>
//                                         {examTypeList?.data?.map((item) => (
//                                             <option key={item.id} value={item.id}>
//                                                 {item.name}
//                                             </option>
//                                         ))}
//                                     </Input>
//                                 </FormGroup>
//                             </div>
//                             {/* Question Bank Type Dropdown */}
//                             <div className="col-md-4">
//                                 <FormGroup>
//                                     <Label>Question Bank Type</Label>
//                                     <Input
//                                         type="select"
//                                         name="question_bank_type_id"
//                                         value={inputData.question_bank_type_id}
//                                         onChange={handleChange}
//                                         required
//                                     >
//                                         <option value="">Select Exam Type</option>
//                                         {questionBankTypeList?.data?.map((item) => (
//                                             <option key={item.id} value={item.id}>
//                                                 {item.name}
//                                             </option>
//                                         ))}
//                                     </Input>
//                                 </FormGroup>
//                             </div>
//                             {/* Description */}
//                             <div className="col-md-12 mt-3">
//                                 <FormGroup>
//                                     <Label>Description</Label>
//                                     <Input
//                                         type="textarea"
//                                         name="description"
//                                         value={inputData.description}
//                                         onChange={handleChange}
//                                         rows={4}
//                                         placeholder="Enter description"
//                                     />
//                                 </FormGroup>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="text-end">
//                         <Button color="primary" onClick={handleSubmit}>
//                             Submit Question Bank
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default AddQuestionBank;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Stack,
    InputGroup
} from 'react-bootstrap';
import {
    FiArrowLeft,
    FiSave,
    FiFileText,
    FiLayers,
    FiSettings
} from 'react-icons/fi';
import CommonBreadcrumb from "../../../component/common/bread-crumb";
import { useCommonContext } from "../../../helper/CommonProvider";
import { toast } from "react-toastify";

const AddQuestionBank = () => {
    const navigate = useNavigate();
    const {
        addQuestionBank,
        getExamTypeList,
        examTypeList,
        questionBankTypeList,
        getquestionBankTypeList
    } = useCommonContext();

    const [inputData, setInputData] = useState({
        title: "",
        description: "",
        exam_type_id: "",
        question_bank_type_id: ""
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        <div className="pb-5 text-white">
            <CommonBreadcrumb title="Add Question Bank" />

            <Container fluid className="mt-n4">
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Card className="bg-dark border-secondary border-opacity-25 shadow-lg overflow-hidden" style={{ backgroundColor: '#1E1E1E' }}>
                            <Card.Header className="bg-black bg-opacity-25 border-secondary border-opacity-25 p-4">
                                <Stack direction="horizontal" gap={3} className="justify-content-between">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle  bg-opacity-10 p-2 text-warning">
                                            <FiSave size={20} />
                                        </div>
                                        <div>
                                            <h4 className="mb-0 fw-bold text-white">New Question Bank</h4>
                                            <p className="text-secondary small mb-0">Create a new collection of questions for your exams</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => navigate(-1)}
                                        className="d-flex align-items-center gap-2 px-3 border-secondary border-opacity-25 text-white"
                                    >
                                        <FiArrowLeft /> Back
                                    </Button>
                                </Stack>
                            </Card.Header>

                            <Card.Body className="p-4">
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={12} className="mb-4">
                                            <h5 className="text-warning small text-uppercase tracking-wider fw-bold mb-3">
                                                <FiFileText className="me-2" /> Basic Information
                                            </h5>
                                            <div className="p-4 rounded bg-black bg-opacity-25 border border-secondary border-opacity-10">
                                                <Row className="g-3">
                                                    <Col md={12} className="mb-3">
                                                        <Form.Group controlId="bankTitle">
                                                            <Form.Label className="text-secondary small fw-bold">BANK TITLE</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="title"
                                                                placeholder="Enter question bank title"
                                                                value={inputData.title}
                                                                onChange={handleChange}
                                                                required
                                                                className="bg-black border-secondary border-opacity-25 text-white py-2 focus-none"
                                                                style={{ boxShadow: 'none' }}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={12}>
                                                        <Form.Group controlId="bankDescription">
                                                            <Form.Label className="text-secondary small fw-bold">DESCRIPTION</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                name="description"
                                                                placeholder="Provide context about this question bank..."
                                                                value={inputData.description}
                                                                onChange={handleChange}
                                                                rows={3}
                                                                className="bg-black border-secondary border-opacity-25 text-white py-2 focus-none"
                                                                style={{ boxShadow: 'none' }}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>

                                        <Col md={12} className="mb-4">
                                            <h5 className="text-warning small text-uppercase tracking-wider fw-bold mb-3">
                                                <FiSettings className="me-2" /> Classification
                                            </h5>
                                            <div className="p-4 rounded bg-black bg-opacity-25 border border-secondary border-opacity-10">
                                                <Row className="g-3">
                                                    <Col md={6}>
                                                        <Form.Group controlId="examType">
                                                            <Form.Label className="text-secondary small fw-bold">EXAM TYPE</Form.Label>
                                                            <Form.Select
                                                                name="exam_type_id"
                                                                value={inputData.exam_type_id}
                                                                onChange={handleChange}
                                                                required
                                                                className="bg-black border-secondary border-opacity-25 text-white py-2 focus-none"
                                                                style={{ boxShadow: 'none' }}
                                                            >
                                                                <option value="">Select Exam Type</option>
                                                                {examTypeList?.data?.map((item) => (
                                                                    <option key={item.id} value={item.id} className="bg-dark text-white">
                                                                        {item.name}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group controlId="bankType">
                                                            <Form.Label className="text-secondary small fw-bold">BANK TYPE</Form.Label>
                                                            <Form.Select
                                                                name="question_bank_type_id"
                                                                value={inputData.question_bank_type_id}
                                                                onChange={handleChange}
                                                                required
                                                                className="bg-black border-secondary border-opacity-25 text-white py-2 focus-none"
                                                                style={{ boxShadow: 'none' }}
                                                            >
                                                                <option value="">Select Bank Type</option>
                                                                {questionBankTypeList?.data?.map((item) => (
                                                                    <option key={item.id} value={item.id} className="bg-dark text-white">
                                                                        {item.name}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>

                                    <hr className="border-secondary opacity-10 my-4" />

                                    <div className="d-flex justify-content-end gap-3">
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => navigate(-1)}
                                            className="px-4 py-2 border-secondary border-opacity-25 text-white"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="px-5 py-2 fw-bold text-black border-0"
                                            style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                                        >
                                            Create Question Bank
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <style>{`
                .bg-dark { background-color: #1E1E1E !important; }
                .border-secondary { border-color: #2D2D2D !important; }
                .focus-none:focus { background-color: #000 !important; border-color: #fcca0c !important; color: white !important; }
                .tracking-wider { letter-spacing: 1px; }
            `}</style>
        </div>
    );
};

export default AddQuestionBank;

