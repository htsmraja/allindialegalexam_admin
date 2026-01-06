// import React, { useEffect, useState } from "react";
// import { Button, FormGroup, Input, Label } from "reactstrap";
// import { useNavigate } from "react-router-dom";
// import { useCommonContext } from "../../helper/CommonProvider";
// import CommonBreadcrumb from "../../component/common/bread-crumb";


// const AddQuestionPaper = () => {
//     const navigate = useNavigate();
//     const { addQuestionPaper, getExamTypeList, examTypeList } = useCommonContext();
//     useEffect(() => {
//         getExamTypeList();
//     }, []);
//     const [data, setData] = useState({
//         title: "",
//         subtitle: "",
//         description: "",
//         total_duration_minutes: "",
//         total_marks: "",
//         created_by_type: "admin",
//         exam_type_id: ""

//     });

//     const handleChange = (e) => {
//         setData({ ...data, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         console.log(data)
//         await addQuestionPaper(data);
//     };
//     console.log(examTypeList, "examTypeList")
//     return (
//         <>
//             <CommonBreadcrumb title="Create Question Paper" />

//             <div className="product-form-container p-3">
//                 <form
//                     style={{
//                         backgroundColor: "#f5f5f5",
//                         padding: "20px",
//                         borderRadius: "10px",
//                     }}
//                 >
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h4>Create Paper</h4>
//                         <Button color="secondary" onClick={() => navigate(-1)}>
//                             Back
//                         </Button>
//                     </div>

//                     <div className="card p-3 mb-3">
//                         <h5>Basic Details</h5>

//                         <div className="row mt-3">

//                             <div className="col-md-4">
//                                 <FormGroup>
//                                     <Label>Title</Label>
//                                     <Input
//                                         type="text"
//                                         name="title"
//                                         value={data.title}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </FormGroup>
//                             </div>

//                             <div className="col-md-4">
//                                 <FormGroup>
//                                     <Label>Subtitle</Label>
//                                     <Input
//                                         type="text"
//                                         name="subtitle"
//                                         value={data.subtitle}
//                                         onChange={handleChange}
//                                     />
//                                 </FormGroup>
//                             </div>
//                             <div className="col-md-4">
//                                 <FormGroup>
//                                     <Label>Exam Type</Label>
//                                     <Input
//                                         type="select"
//                                         name="exam_type_id"
//                                         value={data.exam_type_id}
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
//                             <div className="col-md-4">
//                                 <FormGroup>
//                                     <Label>Total Marks</Label>
//                                     <Input
//                                         type="number"
//                                         name="total_marks"
//                                         value={data.total_marks}
//                                         onChange={handleChange}
//                                     />
//                                 </FormGroup>
//                             </div>

//                             <div className="col-md-4">
//                                 <FormGroup>
//                                     <Label>Total Duration (Minutes)</Label>
//                                     <Input
//                                         type="number"
//                                         name="total_duration_minutes"
//                                         value={data.total_duration_minutes}
//                                         onChange={handleChange}
//                                     />
//                                 </FormGroup>
//                             </div>

//                             <div className="col-md-12">
//                                 <FormGroup>
//                                     <Label>Description</Label>
//                                     <Input
//                                         type="textarea"
//                                         name="description"
//                                         value={data.description}
//                                         onChange={handleChange}
//                                         rows="3"
//                                     />
//                                 </FormGroup>
//                             </div>

//                         </div>
//                     </div>

//                     <div className="text-end">
//                         <Button color="primary" onClick={handleSubmit}>
//                             Create Paper
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default AddQuestionPaper;
import React, { useEffect, useState } from "react";
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
    FiClock,
    FiEdit3
} from 'react-icons/fi';
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCommonContext } from "../../helper/CommonProvider";
import { toast } from "react-toastify";

const AddQuestionPaper = () => {
    const navigate = useNavigate();
    const { addQuestionPaper, getExamTypeList, examTypeList } = useCommonContext();

    useEffect(() => {
        getExamTypeList();
    }, []);

    const [data, setData] = useState({
        title: "",
        subtitle: "",
        description: "",
        total_duration_minutes: "",
        total_marks: "",
        created_by_type: "admin",
        exam_type_id: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.title.trim()) {
            toast.warn("Title is required");
            return;
        }
        if (!data.exam_type_id) {
            toast.warn("Exam Type is required");
            return;
        }
        await addQuestionPaper(data);
    };

    return (
        <div className="pb-5 text-white">
            <CommonBreadcrumb title="Create Question Paper" />

            <Container fluid className="mt-n4">
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Card className="bg-dark border-secondary shadow-lg overflow-hidden" style={{ backgroundColor: '#1E1E1E !important' }}>
                            <Card.Header className="bg-black bg-opacity-25 border-secondary p-4">
                                <Stack direction="horizontal" gap={3} className="justify-content-between">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle bg-warning bg-opacity-10 p-2 text-warning">
                                            <FiFileText size={20} />
                                        </div>
                                        <div>
                                            <h4 className="mb-0 fw-bold text-white">New Question Paper</h4>
                                            <p className="text-secondary small mb-0">Define the structure and basic details of your exam paper</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => navigate(-1)}
                                        className="d-flex align-items-center gap-2 px-3 border-secondary text-white"
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
                                                <FiEdit3 className="me-2" /> Basic Details
                                            </h5>
                                            <div className="p-4 rounded bg-black bg-opacity-25 border border-secondary border-opacity-50">
                                                <Row className="g-4">
                                                    <Col md={6}>
                                                        <Form.Group controlId="paperTitle">
                                                            <Form.Label className="text-secondary small fw-bold">PAPER TITLE</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="title"
                                                                placeholder="e.g. Constitutional Law Finals 2024"
                                                                value={data.title}
                                                                onChange={handleChange}
                                                                required
                                                                className="bg-black border-secondary text-white py-2 focus-none"
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6}>
                                                        <Form.Group controlId="paperSubtitle">
                                                            <Form.Label className="text-secondary small fw-bold">SUBTITLE / VERSION</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="subtitle"
                                                                placeholder="e.g. Set A, Preliminary Round"
                                                                value={data.subtitle}
                                                                onChange={handleChange}
                                                                className="bg-black border-secondary text-white py-2 focus-none"
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={4}>
                                                        <Form.Group controlId="examType">
                                                            <Form.Label className="text-secondary small fw-bold">EXAM TYPE</Form.Label>
                                                            <Form.Select
                                                                name="exam_type_id"
                                                                value={data.exam_type_id}
                                                                onChange={handleChange}
                                                                required
                                                                className="bg-black border-secondary text-white py-2 focus-none"
                                                            >
                                                                <option value="">Select Exam Type</option>
                                                                {examTypeList?.data?.map((item) => (
                                                                    <option key={item.id} value={item.id} className="bg-dark">
                                                                        {item.name}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={4}>
                                                        <Form.Group controlId="totalMarks">
                                                            <Form.Label className="text-secondary small fw-bold">TOTAL MARKS</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                name="total_marks"
                                                                placeholder="e.g. 100"
                                                                value={data.total_marks}
                                                                onChange={handleChange}
                                                                className="bg-black border-secondary text-white py-2 focus-none"
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={4}>
                                                        <Form.Group controlId="totalDuration">
                                                            <Form.Label className="text-secondary small fw-bold">DURATION (MINUTES)</Form.Label>
                                                            <InputGroup>
                                                                <Form.Control
                                                                    type="number"
                                                                    name="total_duration_minutes"
                                                                    placeholder="e.g. 120"
                                                                    value={data.total_duration_minutes}
                                                                    onChange={handleChange}
                                                                    className="bg-black border-secondary text-white py-2 focus-none"
                                                                />
                                                                <InputGroup.Text className="bg-dark border-secondary text-secondary">
                                                                    <FiClock />
                                                                </InputGroup.Text>
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={12}>
                                                        <Form.Group controlId="description">
                                                            <Form.Label className="text-secondary small fw-bold">DESCRIPTION / INSTRUCTIONS</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                name="description"
                                                                placeholder="Add assessment rules or description..."
                                                                value={data.description}
                                                                onChange={handleChange}
                                                                rows={3}
                                                                className="bg-black border-secondary text-white py-2 focus-none"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>

                                    <hr className="border-secondary opacity-25 my-4" />

                                    <div className="d-flex justify-content-end gap-3">
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => navigate(-1)}
                                            className="px-4 py-2 border-secondary text-white"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="px-5 py-2 fw-bold text-black border-0 d-flex align-items-center gap-2"
                                            style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                                        >
                                            <FiSave /> Create Paper
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

export default AddQuestionPaper;
