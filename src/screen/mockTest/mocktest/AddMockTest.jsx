// import React, { useEffect, useState } from "react";
// import { Button, Input, Label, FormGroup, Card, CardBody, CardHeader, Row, Col } from "reactstrap";
// import { useNavigate } from "react-router-dom";
// import { useCommonContext } from "../../../helper/CommonProvider";

// const AddMockTest = () => {
//     const navigate = useNavigate();
//     const { examTypeList, getExamTypeList, questionPaperList, getQuestionPaperList, addMockTest } = useCommonContext();

//     const [form, setForm] = useState({
//         title: "",
//         subtitle: "",
//         description: "",
//         exam_type_id: "",
//         is_paid: 0,
//         price: 0,
//         sale_price: 0,
//         offer_price: 0,
//         offer_start: "",
//         offer_end: "",
//         mark_as_offer: 0,
//         cover_image: null,
//         created_by_type: 'admin'
//     });

//     const [coverPreview, setCoverPreview] = useState(null);
//     const [selectedPapers, setSelectedPapers] = useState({});

//     useEffect(() => {
//         getExamTypeList();
//     }, []);

//     const handlePaperSelect = (id) => {
//         setSelectedPapers(prev => ({
//             ...prev,
//             [id]: {
//                 selected: !prev[id]?.selected,
//                 attempt_limit: prev[id]?.attempt_limit || 1 // default attempt limit = 1
//             }
//         }));
//     };

//     const handleAttemptLimitChange = (id, value) => {
//         setSelectedPapers(prev => ({
//             ...prev,
//             [id]: {
//                 ...prev[id],
//                 attempt_limit: value
//             }
//         }));
//     };

//     const handleCoverChange = (e) => {
//         const file = e.target.files[0];
//         setForm({ ...form, cover_image: file });
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = () => setCoverPreview(reader.result);
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSubmit = async () => {
//         const paper_list = Object.keys(selectedPapers)
//             .filter(key => selectedPapers[key].selected)
//             .map((pid, index) => ({
//                 question_paper_id: pid,
//                 sort_order: index + 1,
//                 attempt_limit: selectedPapers[pid].attempt_limit
//             }));

//         const payload = new FormData();
//         Object.entries(form).forEach(([key, value]) => {
//             if (value !== null) payload.append(key, value);
//         });
//         payload.append("paper_list", JSON.stringify(paper_list));
//         console.log(payload, "payload")
//         const res = await addMockTest(payload);
//         //if (res?.status) navigate("/mock-test-list");
//     };

//     return (
//         <div className="container py-4">
//             <h2 className="mb-4">Add New Mock Test</h2>

//             {/* Basic Information */}
//             <Card>
//                 <CardHeader className="bg-primary text-white">Basic Information</CardHeader>
//                 <CardBody>
//                     <Row>
//                         <Col md={6}>
//                             <FormGroup>
//                                 <Label>Title</Label>
//                                 <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
//                             </FormGroup>
//                         </Col>
//                         <Col md={6}>
//                             <FormGroup>
//                                 <Label>Subtitle</Label>
//                                 <Input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
//                             </FormGroup>
//                         </Col>
//                     </Row>
//                     <FormGroup>
//                         <Label>Description</Label>
//                         <Input type="textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
//                     </FormGroup>
//                     <Row>
//                         <Col md={6}>
//                             <FormGroup>
//                                 <Label>Exam Type</Label>
//                                 <Input type="select" value={form.exam_type_id} onChange={e => {
//                                     const selectedId = e.target.value;
//                                     setForm({ ...form, exam_type_id: selectedId });
//                                     getQuestionPaperList({ exam_type_id: selectedId });
//                                 }}>
//                                     <option value="">Select</option>
//                                     {examTypeList?.data?.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
//                                 </Input>
//                             </FormGroup>
//                         </Col>
//                         <Col md={6}>
//                             <FormGroup>
//                                 <Label>Cover Image</Label>
//                                 <Input type="file" accept="image/*" onChange={handleCoverChange} />
//                                 {coverPreview && <img src={coverPreview} alt="Cover Preview" style={{ marginTop: 10, maxWidth: 200, borderRadius: 5 }} />}
//                             </FormGroup>
//                         </Col>
//                     </Row>
//                 </CardBody>
//             </Card>

//             {/* Pricing & Offer */}
//             <Card className="mt-4">
//                 <CardHeader className="bg-success text-white">Pricing & Offer</CardHeader>
//                 <CardBody>
//                     <Row>
//                         <Col md={4}>
//                             <FormGroup>
//                                 <Label>Is Paid?</Label>
//                                 <Input type="select" value={form.is_paid} onChange={e => setForm({ ...form, is_paid: e.target.value })}>
//                                     <option value={0}>Free</option>
//                                     <option value={1}>Paid</option>
//                                 </Input>
//                             </FormGroup>
//                         </Col>
//                         {form.is_paid == 1 && (
//                             <>
//                                 <Col md={4}>
//                                     <FormGroup>
//                                         <Label>Price</Label>
//                                         <Input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
//                                     </FormGroup>
//                                 </Col>
//                                 <Col md={4}>
//                                     <FormGroup>
//                                         <Label>Sale Price</Label>
//                                         <Input type="number" value={form.sale_price} onChange={e => setForm({ ...form, sale_price: e.target.value })} />
//                                     </FormGroup>
//                                 </Col>
//                                 <Col md={12}>
//                                     <FormGroup check>
//                                         <Label check>
//                                             <Input type="checkbox" checked={form.mark_as_offer} onChange={e => setForm({ ...form, mark_as_offer: e.target.checked ? 1 : 0 })} /> Mark as Sell
//                                         </Label>
//                                     </FormGroup>
//                                 </Col>
//                                 {form.mark_as_offer == 1 && (
//                                     <>
//                                         <Col md={4}>
//                                             <FormGroup>
//                                                 <Label>Offer Price</Label>
//                                                 <Input type="number" value={form.offer_price} onChange={e => setForm({ ...form, offer_price: e.target.value })} />
//                                             </FormGroup>
//                                         </Col>
//                                         <Col md={4}>
//                                             <FormGroup>
//                                                 <Label>Offer Start Date</Label>
//                                                 <Input type="date" value={form.offer_start} onChange={e => setForm({ ...form, offer_start: e.target.value })} />
//                                             </FormGroup>
//                                         </Col>
//                                         <Col md={4}>
//                                             <FormGroup>
//                                                 <Label>Offer End Date</Label>
//                                                 <Input type="date" value={form.offer_end} onChange={e => setForm({ ...form, offer_end: e.target.value })} />
//                                             </FormGroup>
//                                         </Col>
//                                     </>
//                                 )}
//                             </>
//                         )}
//                     </Row>
//                 </CardBody>
//             </Card>

//             {/* Select Papers */}
//             <Card className="mt-4">
//                 <CardHeader className="bg-warning text-dark">Select Papers</CardHeader>
//                 <CardBody>
//                     <div className="table-responsive">
//                         <table className="table table-bordered">
//                             <thead>
//                                 <tr>
//                                     <th>Select</th>
//                                     <th>Paper Title</th>
//                                     <th>Attempt Limit</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {questionPaperList?.data?.map(p => (
//                                     <tr key={p.id}>
//                                         <td>
//                                             <Input type="checkbox" checked={selectedPapers[p.id]?.selected || false} onChange={() => handlePaperSelect(p.id)} />
//                                         </td>
//                                         <td>{p.title}</td>
//                                         <td>
//                                             {selectedPapers[p.id]?.selected && (
//                                                 <Input type="number" min={1} value={selectedPapers[p.id]?.attempt_limit} onChange={e => handleAttemptLimitChange(p.id, parseInt(e.target.value))} />
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </CardBody>
//             </Card>

//             {/* Submit Button */}
//             <div className="text-end mt-3">
//                 <Button color="primary" onClick={handleSubmit}>Save Mock Test</Button>
//             </div>
//         </div>
//     );
// };

// export default AddMockTest;
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
    Image,
    Table,
    InputGroup,
    Badge
} from 'react-bootstrap';
import {
    FiArrowLeft,
    FiSave,
    FiFileText,
    FiImage,
    FiDollarSign,
    FiCalendar,
    FiLayers,
    FiPlus,
    FiInfo
} from 'react-icons/fi';
import CommonBreadcrumb from "../../../component/common/bread-crumb";
import { useCommonContext } from "../../../helper/CommonProvider";
import { toast } from "react-toastify";

const AddMockTest = () => {
    const navigate = useNavigate();
    const { examTypeList, getExamTypeList, questionPaperList, getQuestionPaperList, addMockTest } = useCommonContext();

    const [form, setForm] = useState({
        title: "",
        subtitle: "",
        description: "",
        exam_type_id: "",
        is_paid: "0",
        price: 0,
        sale_price: 0,
        offer_price: 0,
        offer_start: "",
        offer_end: "",
        mark_as_offer: 0,
        cover_image: null,
        created_by_type: 'admin'
    });

    const [coverPreview, setCoverPreview] = useState(null);
    const [selectedPapers, setSelectedPapers] = useState({});

    useEffect(() => {
        getExamTypeList();
    }, []);

    const handlePaperSelect = (id) => {
        setSelectedPapers(prev => ({
            ...prev,
            [id]: {
                selected: !prev[id]?.selected,
                attempt_limit: prev[id]?.attempt_limit || 1
            }
        }));
    };

    const handleAttemptLimitChange = (id, value) => {
        setSelectedPapers(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                attempt_limit: value
            }
        }));
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, cover_image: file });
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setCoverPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title.trim()) {
            toast.warn("Title is required");
            return;
        }
        if (!form.exam_type_id) {
            toast.warn("Exam Type is required");
            return;
        }

        const paper_list = Object.keys(selectedPapers)
            .filter(key => selectedPapers[key].selected)
            .map((pid, index) => ({
                question_paper_id: pid,
                sort_order: index + 1,
                attempt_limit: selectedPapers[pid].attempt_limit
            }));

        const payload = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value !== null) payload.append(key, value);
        });
        payload.append("paper_list", JSON.stringify(paper_list));

        await addMockTest(payload);
    };

    return (
        <div className="pb-5 text-white">

            <Container fluid className="mt-n4">
                <Form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center gap-3">
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => navigate("/mock-test")}
                                className="border-secondary border-opacity-25 text-white rounded-circle p-2 d-flex align-items-center justify-content-center"
                            >
                                <FiArrowLeft size={18} />
                            </Button>
                            <div>
                                <h1 className="fw-bold mb-0 text-white h3">Create Mock Test</h1>
                                <p className="text-secondary small mb-0">Configure your examination package and pricing</p>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="fw-bold d-flex align-items-center gap-2 px-4 py-2 text-black border-0"
                            style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                        >
                            <FiSave size={20} />
                            Save Mock Test
                        </Button>
                    </div>

                    <Row className="g-4">
                        {/* Left Column: Basic Info & Pricing */}
                        <Col lg={7}>
                            <Card className="bg-dark border-secondary border-opacity-10 shadow-lg mb-4" style={{ backgroundColor: '#1E1E1E' }}>
                                <Card.Header className="bg-black bg-opacity-25 border-secondary border-opacity-10 p-3">
                                    <h5 className="mb-0 text-white small fw-bold text-uppercase tracking-wider">
                                        <FiInfo className="text-warning me-2" /> Basic Details
                                    </h5>
                                </Card.Header>
                                <Card.Body className="p-4">
                                    <Form.Group className="mb-4">
                                        <Form.Label className="text-secondary small fw-bold">TEST TITLE</Form.Label>
                                        <Form.Control
                                            value={form.title}
                                            onChange={e => setForm({ ...form, title: e.target.value })}
                                            placeholder="e.g. Full Length Mock Test 2024"
                                            className="bg-black border-secondary border-opacity-25 text-white py-2 focus-none"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="text-secondary small fw-bold">SUBTITLE / SLUG</Form.Label>
                                        <Form.Control
                                            value={form.subtitle}
                                            onChange={e => setForm({ ...form, subtitle: e.target.value })}
                                            placeholder="e.g. Advanced Legal Reasoning"
                                            className="bg-black border-secondary border-opacity-25 text-white py-2 focus-none"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="text-secondary small fw-bold">DESCRIPTION</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            value={form.description}
                                            onChange={e => setForm({ ...form, description: e.target.value })}
                                            placeholder="Details and instructions for students..."
                                            className="bg-black border-secondary border-opacity-25 text-white py-2 focus-none"
                                        />
                                    </Form.Group>

                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-secondary small fw-bold">EXAM CATEGORY</Form.Label>
                                                <Form.Select
                                                    value={form.exam_type_id}
                                                    onChange={e => {
                                                        const selectedId = e.target.value;
                                                        setForm({ ...form, exam_type_id: selectedId });
                                                        getQuestionPaperList({ exam_type_id: selectedId });
                                                    }}
                                                    className="bg-black border-secondary border-opacity-25 text-white py-2 focus-none"
                                                >
                                                    <option value="">Select Exam Type</option>
                                                    {examTypeList?.data?.map(t => <option key={t.id} value={t.id} className="bg-dark">{t.name}</option>)}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-secondary small fw-bold">ACCESS TYPE</Form.Label>
                                                <Form.Select
                                                    value={form.is_paid}
                                                    onChange={e => setForm({ ...form, is_paid: e.target.value })}
                                                    className="bg-black border-secondary border-opacity-25 text-white py-2 focus-none"
                                                >
                                                    <option value="0">Free of Cost</option>
                                                    <option value="1">Paid Access</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {form.is_paid == "1" && (
                                <Card className="bg-dark border-secondary border-opacity-10 shadow-lg mb-4" style={{ backgroundColor: '#1E1E1E' }}>
                                    <Card.Header className="bg-black bg-opacity-25 border-secondary border-opacity-10 p-3">
                                        <h5 className="mb-0 text-white small fw-bold text-uppercase tracking-wider">
                                            <FiDollarSign className="text-warning me-2" /> Pricing Configuration
                                        </h5>
                                    </Card.Header>
                                    <Card.Body className="p-4">
                                        <Row className="g-4 mb-4">
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="text-secondary small fw-bold">REGULAR PRICE (₹)</Form.Label>
                                                    <Form.Control type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="bg-black border-secondary border-opacity-25 text-white py-2 focus-none" />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="text-secondary small fw-bold">SALE PRICE (₹)</Form.Label>
                                                    <Form.Control type="number" value={form.sale_price} onChange={e => setForm({ ...form, sale_price: e.target.value })} className="bg-black border-secondary border-opacity-25 text-white py-2 focus-none text-warning fw-bold" />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <div className="p-3 rounded bg-black bg-opacity-25 border border-secondary border-opacity-25 mb-4">
                                            <Form.Check
                                                type="switch"
                                                id="mark-offer-switch"
                                                label="Enable Promotional Offer"
                                                checked={form.mark_as_offer === 1}
                                                onChange={e => setForm({ ...form, mark_as_offer: e.target.checked ? 1 : 0 })}
                                                className="custom-switch text-secondary small fw-bold"
                                            />
                                        </div>

                                        {form.mark_as_offer === 1 && (
                                            <Row className="g-4">
                                                <Col md={12}>
                                                    <Form.Group>
                                                        <Form.Label className="text-secondary small fw-bold">OFFER PRICE (₹)</Form.Label>
                                                        <Form.Control type="number" value={form.offer_price} onChange={e => setForm({ ...form, offer_price: e.target.value })} className="bg-black border-secondary border-opacity-25 text-white py-2 focus-none text-success fw-bold" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label className="text-secondary small fw-bold">
                                                            <FiCalendar className="me-1" /> START DATE
                                                        </Form.Label>
                                                        <Form.Control type="date" value={form.offer_start} onChange={e => setForm({ ...form, offer_start: e.target.value })} className="bg-black border-secondary border-opacity-25 text-white py-2 focus-none" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label className="text-secondary small fw-bold">
                                                            <FiCalendar className="me-1" /> END DATE
                                                        </Form.Label>
                                                        <Form.Control type="date" value={form.offer_end} onChange={e => setForm({ ...form, offer_end: e.target.value })} className="bg-black border-secondary border-opacity-25 text-white py-2 focus-none" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        )}
                                    </Card.Body>
                                </Card>
                            )}
                        </Col>

                        {/* Right Column: Image & Paper Selection */}
                        <Col lg={5}>
                            <Card className="bg-dark border-secondary border-opacity-10 shadow-lg mb-4" style={{ backgroundColor: '#1E1E1E' }}>
                                <Card.Header className="bg-black bg-opacity-25 border-secondary border-opacity-10 p-3">
                                    <h5 className="mb-0 text-white small fw-bold text-uppercase tracking-wider">
                                        <FiImage className="text-warning me-2" /> Cover Visual
                                    </h5>
                                </Card.Header>
                                <Card.Body className="p-4 text-center">
                                    <div className="mb-4 position-relative mx-auto" style={{ width: '200px', height: '200px' }}>
                                        {coverPreview ? (
                                            <Image src={coverPreview} fluid rounded className="h-100 w-100 object-fit-cover shadow border border-secondary" />
                                        ) : (
                                            <div className="h-100 w-100 bg-black bg-opacity-25 border-secondary border-opacity-25 border rounded d-flex flex-column align-items-center justify-content-center text-secondary">
                                                <FiImage size={48} className="mb-2 opacity-25" />
                                                <span className="small">No Preview Selected</span>
                                            </div>
                                        )}
                                    </div>
                                    <Form.Group className="mb-0">
                                        <Form.Label
                                            htmlFor="coverInput"
                                            className="btn btn-outline-warning w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <FiPlus /> {coverPreview ? "Change Cover" : "Upload Cover Image"}
                                        </Form.Label>
                                        <Form.Control
                                            id="coverInput"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCoverChange}
                                            className="d-none"
                                        />
                                    </Form.Group>
                                </Card.Body>
                            </Card>

                            <Card className="bg-dark border-secondary border-opacity-10 shadow-lg" style={{ backgroundColor: '#1E1E1E' }}>
                                <Card.Header className="bg-black bg-opacity-25 border-secondary border-opacity-10 p-3 d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 text-white small fw-bold text-uppercase tracking-wider">
                                        <FiLayers className="text-warning me-2" /> Select Papers
                                    </h5>
                                    <Badge bg="warning" className="text-black">{Object.values(selectedPapers).filter(p => p.selected).length} Selected</Badge>
                                </Card.Header>
                                <Card.Body className="p-0 overflow-hidden" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    {!form.exam_type_id ? (
                                        <div className="p-5 text-center text-secondary">
                                            <FiInfo size={32} className="mb-3 opacity-25" />
                                            <p className="small mb-0">Please select an Exam Category first to view available papers.</p>
                                        </div>
                                    ) : (
                                        <Table hover variant="dark" className="mb-0 custom-table align-middle border-0">
                                            <thead className="bg-black bg-opacity-50 text-secondary small text-uppercase">
                                                <tr>
                                                        <th className="px-3 py-3 border-0" style={{ width: '50px' }}></th>
                                                        <th className="px-1 py-3 border-0">Paper Title</th>
                                                        <th className="px-3 py-3 border-0 text-center">Attempts</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {questionPaperList?.data?.map(p => (
                                                        <tr key={p.id} className="border-secondary border-opacity-10">
                                                            <td className="px-3 py-3 text-center">
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    checked={selectedPapers[p.id]?.selected || false}
                                                                    onChange={() => handlePaperSelect(p.id)}
                                                                    className="custom-checkbox"
                                                                />
                                                            </td>
                                                            <td className="px-1 py-3">
                                                                <div className="small fw-bold text-white">{p.title}</div>
                                                                <div className="text-secondary" style={{ fontSize: '10px' }}>ID: P-{p.id}</div>
                                                            </td>
                                                            <td className="px-3 py-3">
                                                                {selectedPapers[p.id]?.selected && (
                                                                    <Form.Control
                                                                        type="number"
                                                                        size="sm"
                                                                        min={1}
                                                                        value={selectedPapers[p.id]?.attempt_limit}
                                                                        onChange={e => handleAttemptLimitChange(p.id, parseInt(e.target.value))}
                                                                        className="bg-black border-secondary border-opacity-25 text-white text-center py-1 mx-auto"
                                                                        style={{ width: '60px' }}
                                                                    />
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {questionPaperList?.data?.length === 0 && (
                                                        <tr>
                                                            <td colSpan="3" className="text-center py-4 text-secondary small">No papers found for this category.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                        </Table>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Container>

            <style>{`
                .bg-dark { background-color: #1E1E1E !important; }
                .border-secondary { border-color: #2D2D2D !important; }
                .focus-none:focus { background-color: #000 !important; border-color: #fcca0c !important; color: white !important; }
                .custom-table tr:hover { background-color: #1a1a1a !important; }
                .custom-checkbox .form-check-input:checked { background-color: #fcca0c; border-color: #fcca0c; }
                .custom-switch .form-check-input:checked { background-color: #fcca0c; border-color: #fcca0c; }
                .tracking-wider { letter-spacing: 1px; }
            `}</style>
        </div>
    );
};

export default AddMockTest;
