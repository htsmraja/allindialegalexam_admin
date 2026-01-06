// import React, { useState, useEffect } from "react";
// import { Button, FormGroup, Input, Label } from "reactstrap";
// import CommonBreadcrumb from "../../component/common/bread-crumb";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useCommonContext } from "../../helper/CommonProvider";

// const AddBatch = () => {
//     const navigate = useNavigate();
//     const { courseId } = useLocation().state;
//     const { addBatch } = useCommonContext();

//     const [inputData, setInputData] = useState({
//         course_id: courseId,
//         batch_name: "",
//         start_date: "",
//         end_date: "",
//         max_students: "",
//         status: "upcoming",
//         description: "",
//         time_slots: [
//             { day_of_week: "", start_time: "", end_time: "" }
//         ],
//     });

//     // useEffect(() => {
//     //     if (courseId) getCourseDetails(courseId);
//     // }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setInputData({ ...inputData, [name]: value });
//     };

//     const handleTimeSlotChange = (index, field, value) => {
//         const updated = [...inputData.time_slots];
//         updated[index][field] = value;
//         setInputData({ ...inputData, time_slots: updated });
//     };

//     const addTimeSlot = () => {
//         setInputData({
//             ...inputData,
//             time_slots: [...inputData.time_slots, { day_of_week: "", start_time: "", end_time: "" }]
//         });
//     };

//     const removeTimeSlot = (index) => {
//         const updated = inputData.time_slots.filter((_, i) => i !== index);
//         setInputData({ ...inputData, time_slots: updated });
//     };

//     const handleSubmit = async () => {
//         addBatch(inputData);
//         // navigate(-1);
//     };

//     return (
//         <>
//             <CommonBreadcrumb title="Add Batch" />

//             <div className="product-form-container p-3">
//                 <form
//                     style={{
//                         backgroundColor: "#f5f5f5",
//                         padding: "20px",
//                         borderRadius: "10px",
//                     }}
//                 >
//                     {/* HEADER */}
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h4>Add New Batch</h4>
//                         <Button color="secondary" onClick={() => navigate(-1)}>Back</Button>
//                     </div>

//                     {/* BASIC INFO */}
//                     <div className="card p-3 mb-3">
//                         <h5>Batch Information</h5>
//                         <div className="row mt-3">

//                             <div className="col-md-4">
//                                 <FormGroup>
//                                     <Label>Batch Name</Label>
//                                     <Input
//                                         type="text"
//                                         name="batch_name"
//                                         value={inputData.batch_name}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </FormGroup>
//                             </div>

//                             <div className="col-md-4">
//                                 <FormGroup>
//                                     <Label>Start Date</Label>
//                                     <Input
//                                         type="date"
//                                         name="start_date"
//                                         value={inputData.start_date}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </FormGroup>
//                             </div>

//                             <div className="col-md-4">
//                                 <FormGroup>
//                                     <Label>End Date</Label>
//                                     <Input
//                                         type="date"
//                                         name="end_date"
//                                         value={inputData.end_date}
//                                         onChange={handleChange}
//                                     />
//                                 </FormGroup>
//                             </div>



//                             <div className="col-md-4">
//                                 <FormGroup>
//                                     <Label>Max Students</Label>
//                                     <Input
//                                         type="number"
//                                         name="max_students"
//                                         value={inputData.max_students}
//                                         onChange={handleChange}
//                                     />
//                                 </FormGroup>
//                             </div>

//                             <div className="col-md-4">
//                                 <FormGroup>
//                                     <Label>Status</Label>
//                                     <Input
//                                         type="select"
//                                         name="status"
//                                         value={inputData.status}
//                                         onChange={handleChange}
//                                     >
//                                         <option value="upcoming">Upcoming</option>
//                                         <option value="ongoing">Ongoing</option>
//                                         <option value="completed">Completed</option>
//                                     </Input>
//                                 </FormGroup>
//                             </div>

//                             <div className="col-md-12">
//                                 <FormGroup>
//                                     <Label>Description</Label>
//                                     <textarea
//                                         className="form-control"
//                                         name="description"
//                                         value={inputData.description}
//                                         rows="4"
//                                         onChange={handleChange}
//                                     />
//                                 </FormGroup>
//                             </div>
//                         </div>
//                     </div>

//                     {/* TIME SLOT SECTION */}
//                     <div className="card p-3 mb-4">
//                         <h5>Batch Time Slots</h5>

//                         {inputData.time_slots.map((item, index) => (
//                             <div className="row mt-3" key={index}>
//                                 <div className="col-md-3">
//                                     <Label>Day</Label>
//                                     <Input
//                                         type="select"
//                                         value={item.day_of_week}
//                                         onChange={(e) => handleTimeSlotChange(index, "day_of_week", e.target.value)}
//                                     >
//                                         <option value="">Select Day</option>
//                                         <option value="monday">Monday</option>
//                                         <option value="tuesday">Tuesday</option>
//                                         <option value="wednesday">Wednesday</option>
//                                         <option value="thursday">Thursday</option>
//                                         <option value="friday">Friday</option>
//                                         <option value="saturday">Saturday</option>
//                                         <option value="sunday">Sunday</option>
//                                     </Input>
//                                 </div>

//                                 <div className="col-md-3">
//                                     <Label>Start Time</Label>
//                                     <Input
//                                         type="time"
//                                         value={item.start_time}
//                                         onChange={(e) => handleTimeSlotChange(index, "start_time", e.target.value)}
//                                     />
//                                 </div>

//                                 <div className="col-md-3">
//                                     <Label>End Time</Label>
//                                     <Input
//                                         type="time"
//                                         value={item.end_time}
//                                         onChange={(e) => handleTimeSlotChange(index, "end_time", e.target.value)}
//                                     />
//                                 </div>

//                                 <div className="col-md-3 d-flex align-items-end">
//                                     <Button color="danger" onClick={() => removeTimeSlot(index)} disabled={inputData.time_slots.length === 1}>
//                                         Remove
//                                     </Button>
//                                 </div>
//                             </div>
//                         ))}

//                         <Button color="success" className="mt-3" onClick={addTimeSlot}>
//                             + Add Another Time Slot
//                         </Button>
//                     </div>

//                     {/* SUBMIT */}
//                     <div className="text-end">
//                         <Button color="primary" onClick={handleSubmit}>
//                             Save Batch
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default AddBatch;


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Stack, InputGroup, Alert } from 'react-bootstrap';
import {
    FiPlus, FiTrash2, FiClock, FiCalendar, FiUsers, FiUser, FiChevronLeft, FiSave, FiInfo, FiLayers
} from 'react-icons/fi';
import { useCommonContext } from "../../helper/CommonProvider";
const AddBatch = () => {
    const navigate = useNavigate();
    const { addBatch, getAllTeacher, allTeacher } = useCommonContext();
    const { id } = useParams();

    useEffect(() => {
        getAllTeacher();
    }, [id]);

    const [saveStatus, setSaveStatus] = useState(null);

    const [inputData, setInputData] = useState({
        course_id: id || "",
        teacher_id: "",
        batch_name: "",
        start_date: "",
        end_date: "",
        max_students: "",
        status: "upcoming",
        description: "",
        time_slots: [
            { day_of_week: "Monday", start_time: "", end_time: "" }
        ],
    });

    /* ---------------- INPUT HANDLER ---------------- */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputData(prev => ({ ...prev, [name]: value }));
    };

    /* ---------------- TIME SLOT HANDLERS ---------------- */
    const handleTimeSlotChange = (index, field, value) => {
        const updated = [...inputData.time_slots];
        updated[index][field] = value;
        setInputData(prev => ({ ...prev, time_slots: updated }));
    };

    const addTimeSlot = () => {
        setInputData(prev => ({
            ...prev,
            time_slots: [...prev.time_slots, { day_of_week: "Monday", start_time: "", end_time: "" }]
        }));
    };

    const removeTimeSlot = (index) => {
        const updated = inputData.time_slots.filter((_, i) => i !== index);
        setInputData(prev => ({ ...prev, time_slots: updated }));
    };

    /* ---------------- SAVE ---------------- */
    const handleSave = async () => {
        setSaveStatus('saving');
        console.log(inputData)
        await addBatch(inputData);

        setSaveStatus('success');
    // setTimeout(() => navigate('/batch-list'), 1000);
    };
    return (
        <div className="text-white pb-5 pt-3 min-vh-100 bg-black">
            <Container fluid className="px-4">
                {/* Header */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <Button
                            variant="dark"
                            className="rounded-circle p-2 border-secondary"
                            onClick={() => navigate('/batch-list')}
                        >
                            <FiChevronLeft size={20} />
                        </Button>
                        <div>
                            <h2 className="fw-bold mb-0 text-white">Add New Batch</h2>
                            <p className="text-secondary small mb-0">Create a new batch and assign it to a course and instructor.</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <Button
                            variant="outline-secondary"
                            className="text-white px-4"
                            onClick={() => navigate('/batch-list')}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="warning"
                            className="px-4 fw-bold d-flex align-items-center gap-2"
                            onClick={handleSave}
                            disabled={saveStatus === 'saving'}
                        >
                            {saveStatus === 'saving' ? <div className="spinner-border spinner-border-sm"></div> : <FiPlus />}
                            {saveStatus === 'saving' ? 'Creating...' : 'Create Batch'}
                        </Button>
                    </div>
                </div>

                {saveStatus === 'success' && (
                    <Alert variant="success" className="bg-success bg-opacity-10 border-success border-opacity-25 text-success mb-4 text-center">
                        Batch created successfully! Redirecting to list...
                    </Alert>
                )}

                <Form onSubmit={handleSave}>
                    <Row className="g-4">
                        <Col lg={8}>
                            {/* General Info */}
                            <Card className="bg-dark border-secondary border-opacity-10 mb-4" style={{ backgroundColor: '#1E1E1E' }}>
                                <Card.Header className="bg-black bg-opacity-25 p-3 border-secondary border-opacity-10 d-flex align-items-center gap-2 text-warning">
                                    <FiInfo /> <span className="fw-bold small text-uppercase">General Information</span>
                                </Card.Header>
                                <Card.Body className="p-4">
                                    <Row className="g-3">
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label className="small text-secondary fw-bold text-uppercase">Batch Title</Form.Label>
                                                <Form.Control
                                                    name="batch_name"
                                                    value={inputData.batch_name}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. Masterclass Season 2"
                                                    className="bg-black border-secondary text-white py-2 shadow-none"
                                                />
                                            </Form.Group>
                                        </Col>
                                        {/* <Col md={12}>
                                            <Form.Group>
                                                <Form.Label className="small text-secondary fw-bold text-uppercase">Select Course</Form.Label>
                                                <Form.Select
                                                    name="course_id"
                                                    value={batchData.course_id}
                                                    onChange={handleInputChange}
                                                    className="bg-black border-secondary text-white py-2 shadow-none"
                                                >
                                                    <option value="">Select a course to attach this batch</option>
                                                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col> */}
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="small text-secondary fw-bold text-uppercase">Start Date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="start_date"
                                                    value={inputData.start_date}
                                                    onChange={handleInputChange}
                                                    className="bg-black border-secondary text-white py-2 shadow-none"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="small text-secondary fw-bold text-uppercase">End Date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="end_date"
                                                    value={inputData.end_date}
                                                    onChange={handleInputChange}
                                                    className="bg-black border-secondary text-white py-2 shadow-none"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label className="small text-secondary fw-bold text-uppercase">Description</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    name="description"
                                                    value={inputData.description}
                                                    onChange={handleInputChange}
                                                    className="bg-black border-secondary text-white py-2 shadow-none"
                                                    placeholder="Batch details and mission..."
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* Slots */}
                            <Card className="bg-dark border-secondary border-opacity-10" style={{ backgroundColor: '#1E1E1E' }}>
                                <Card.Header className="bg-black bg-opacity-25 p-3 border-secondary border-opacity-10 d-flex align-items-center justify-content-between text-warning">
                                    <div className="d-flex align-items-center gap-2">
                                        <FiClock /> <span className="fw-bold small text-uppercase">Weekly Schedule</span>
                                    </div>
                                    <Button variant="outline-warning" size="sm" onClick={addTimeSlot} className="fw-bold border-0">
                                        <FiPlus /> Add Slot
                                    </Button>
                                </Card.Header>
                                <Card.Body className="p-4">
                                    <Stack gap={3}>
                                        {inputData.time_slots.map((slot, index) => (
                                            <div key={slot.id} className="bg-black bg-opacity-50 p-3 rounded border border-secondary border-opacity-10 d-flex align-items-center gap-3">
                                                <div className="flex-grow-1">
                                                    <Row className="g-2">
                                                        <Col md={4}>
                                                            <Form.Select
                                                                value={slot.day_of_week}
                                                                onChange={(e) => handleTimeSlotChange(index, "day_of_week", e.target.value)}
                                                                className="bg-dark border-secondary text-white shadow-none"
                                                            >
                                                                {[
                                                                    'monday',
                                                                    'tuesday',
                                                                    'wednesday',
                                                                    'thursday',
                                                                    'friday',
                                                                    'saturday',
                                                                    'sunday'
                                                                ].map(d => (
                                                                    <option key={d} value={d}>
                                                                        {d.charAt(0).toUpperCase() + d.slice(1)}
                                                                    </option>
                                                                ))}

                                                            </Form.Select>
                                                        </Col>
                                                        <Col md={4}>
                                                            <InputGroup>
                                                                <InputGroup.Text className="bg-dark border-secondary text-secondary small">From</InputGroup.Text>
                                                                <Form.Control
                                                                    type="time"
                                                                    value={slot.start_time}
                                                                    onChange={(e) => handleTimeSlotChange(index, "start_time", e.target.value)}
                                                                    className="bg-dark border-secondary text-white shadow-none"
                                                                />
                                                            </InputGroup>
                                                        </Col>
                                                        <Col md={4}>
                                                            <InputGroup>
                                                                <InputGroup.Text className="bg-dark border-secondary text-secondary small">To</InputGroup.Text>
                                                                <Form.Control
                                                                    type="time"
                                                                    value={slot.end_time}
                                                                    onChange={(e) => handleTimeSlotChange(index, "end_time", e.target.value)}
                                                                    className="bg-dark border-secondary text-white shadow-none"
                                                                />
                                                            </InputGroup>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <Button
                                                    variant="outline-danger"
                                                    className="border-0 p-2"
                                                    onClick={() => removeTimeSlot(index)} disabled={inputData.time_slots.length === 1}
                                                >
                                                    <FiTrash2 size={18} />
                                                </Button>
                                            </div>
                                        ))}
                                        {inputData.time_slots.length === 0 && (
                                            <div className="text-center py-5 border border-dashed border-secondary border-opacity-25 rounded text-secondary small">
                                                No time slots defined yet.
                                            </div>
                                        )}
                                    </Stack>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={4}>
                            <Card className="bg-dark border-secondary border-opacity-10 mb-4" style={{ backgroundColor: '#1E1E1E' }}>
                                <Card.Header className="bg-black bg-opacity-25 p-3 border-secondary border-opacity-10 d-flex align-items-center gap-2 text-warning">
                                    <FiLayers /> <span className="fw-bold small text-uppercase">Administration</span>
                                </Card.Header>
                                <Card.Body className="p-4">
                                    <Form.Group className="mb-4">
                                        <Form.Label className="small text-secondary fw-bold text-uppercase">Assigned Teacher</Form.Label>
                                        <Form.Select
                                            name="teacher_id"
                                            value={inputData.teacher_id}
                                            onChange={handleInputChange}
                                            className="bg-black border-secondary text-white py-2 shadow-none"
                                        >
                                            <option value="">Choose Instructor</option>
                                            {allTeacher?.data?.map(t => <option key={t.id} value={t.id}>{t.full_name}</option>)}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="small text-secondary fw-bold text-uppercase">Initial Status</Form.Label>
                                        <Form.Select
                                            name="status"
                                            value={inputData.status}
                                            onChange={handleInputChange}
                                            className="bg-black border-secondary text-white py-2 shadow-none"
                                        >
                                            <option value="upcoming">Upcoming</option>
                                            <option value="ongoing">Ongoing</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold text-uppercase">Max Intake</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text className="bg-dark border-secondary text-secondary"><FiUsers size={14} /></InputGroup.Text>
                                            <Form.Control
                                                type="number"
                                                name="max_students"
                                                value={inputData.max_students}
                                                onChange={handleInputChange}
                                                placeholder="Total Seats"
                                                className="bg-black border-secondary text-white py-2 shadow-none"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Card.Body>
                            </Card>

                            <Alert variant="warning" className="bg-white bg-opacity-10 border-warning border-opacity-25 text-warning small">
                                <FiInfo className="me-2 " /> <strong>Note:</strong> Batches are visibility filtered based on the course they are assigned to.
                            </Alert>
                            <Alert variant="info" className="bg-white bg-opacity-10 border-info border-opacity-25 text-info small">
                                <div className="d-flex gap-2">
                                    <FiInfo className="mt-1 flex-shrink-0" size={16} />
                                    <div>
                                        <strong>Pro Tip:</strong> Ensure the timeline does not overlap with existing batches for this instructor to avoid scheduling conflicts.
                                    </div>
                                </div>
                            </Alert>
                        </Col>
                    </Row>
                </Form>
            </Container>

            <style>{`
                .border-dashed { border-style: dashed !important; border-width: 2px !important; }
                .bg-black { background-color: #000 !important; }
            `}</style>
        </div>
    );
};

export default AddBatch;

