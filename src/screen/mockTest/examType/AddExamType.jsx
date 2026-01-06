// import React, { useState } from 'react';
// import CommonBreadcrumb from '../../../component/common/bread-crumb';
// import { useNavigate } from 'react-router-dom';
// import { Button, FormGroup, Input, Label } from "reactstrap";
// import { useCommonContext } from '../../../helper/CommonProvider';

// const AddExamType = () => {
//     const navigate = useNavigate();
//     const { addExamType } = useCommonContext();

//     const [inputData, setInputData] = useState({
//         name: ''
//     });

//     const handleChange = (e) => {
//         setInputData({
//             ...inputData,
//             [e.target.name]: e.target.value
//         });
//     };
//     const handleSubmit = async () => {
//         await addExamType(inputData);
//     };
//     return (
//         <>
//             <CommonBreadcrumb title="Add Exam Type" />
//             <div className="product-form-container p-3">
//                 <form
//                     style={{
//                         backgroundColor: "#f5f5f5",
//                         padding: "20px",
//                         borderRadius: "10px",
//                     }}
//                 >
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h4>Add New Exam Type</h4>
//                         <Button color="secondary" onClick={() => navigate(-1)}>
//                             Back
//                         </Button>
//                     </div>

//                     <div className="card p-3 mb-3">
//                         <h5>Basic Information</h5>
//                         <div className="row mt-3">
//                             <div className="col-md-3">
//                                 <FormGroup>
//                                     <Label>Title</Label>
//                                     <Input
//                                         type="text"
//                                         name="name"
//                                         value={inputData.name}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </FormGroup>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="text-end">
//                         <Button color="primary" onClick={handleSubmit}>Submit Book</Button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default AddExamType;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Stack
} from 'react-bootstrap';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import CommonBreadcrumb from '../../../component/common/bread-crumb';
import { useCommonContext } from '../../../helper/CommonProvider';

const AddExamType = () => {
    const navigate = useNavigate();
    const { addExamType } = useCommonContext();

    const [inputData, setInputData] = useState({
        name: ''
    });

    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addExamType(inputData);
    };

    return (
        <div className="pb-5 text-white">

            <Container fluid className="mt-n4">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Card className="bg-dark border-secondary border-opacity-10 shadow-lg overflow-hidden" style={{ backgroundColor: '#1E1E1E' }}>
                            <Card.Header className="bg-black bg-opacity-25 border-secondary border-opacity-10 p-4">
                                <Stack direction="horizontal" gap={3} className="justify-content-between">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle  bg-opacity-10 p-2 text-warning">
                                            <FiSave size={20} />
                                        </div>
                                        <div>
                                            <h3 className="mb-0 fw-bold text-white">New Exam Type</h3>
                                            <p className="text-secondary small mb-0">Create a new category for your examinations</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="warning"
                                        onClick={() => navigate(-1)}
                                        className="d-flex align-items-center gap-2 px-3 border-secondary border-opacity-25 text-white"
                                    >
                                        <FiArrowLeft /> Back
                                    </Button>
                                </Stack>
                            </Card.Header>

                            <Card.Body className="p-4">
                                <Form onSubmit={handleSubmit}>
                                    <h5 className="text-warning mb-4 small text-uppercase tracking-wider fw-bold">Basic Information</h5>

                                    <Row className="mb-4">
                                        <Col md={12}>
                                            <Form.Group controlId="examTypeName">
                                                <Form.Label className="text-secondary small fw-bold">EXAM TYPE TITLE</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    placeholder="e.g. Competitive Exams, Entrance Tests"
                                                    value={inputData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="bg-black border-secondary border-opacity-25 text-info py-2 focus-none"
                                                    //style={{ boxShadow: 'none' }}
                                                />
                                                <Form.Text className="text-info">
                                                    This name will be displayed to students in the mock test section.
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <hr className="border-secondary opacity-10 my-4" />

                                    <div className="d-flex justify-content-end gap-3">
                                        <Button
                                            variant="success"
                                            onClick={() => navigate(-1)}
                                            className="px-4 py-2 border-secondary border-opacity-25 text-white"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="px-5 py-2 fw-bold text-black border-0"
                                            style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                                            variant='warning'
                                        >
                                            Create Exam Type
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

export default AddExamType;
