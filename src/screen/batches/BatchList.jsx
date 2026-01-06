// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import CommonBreadcrumb from "../../component/common/bread-crumb";
// import {
//     Col,
//     Container,
//     Input,
//     Modal,
//     Table,
//     ModalBody,
//     ModalFooter,
//     ModalHeader,
// } from "reactstrap";
// import { useCommonContext } from "../../helper/CommonProvider";

// const BatchList = () => {
//     const navigate = useNavigate();
//     const { batchList, getBatchList, getAllTeacher, allTeacher, assignTeacherToBatch } =
//         useCommonContext();

//     const { state } = useLocation();
//     const { id } = useParams();
//     // const courseId = state?.courseId;
//     const courseId = id;

//     const [search, setSearch] = useState("");
//     const [openModal, setOpenModal] = useState(false);

//     const [selectedTeacher, setSelectedTeacher] = useState("");
//     const [selectedBatchId, setSelectedBatchId] = useState("");

//     useEffect(() => {
//         if (courseId) {
//             getBatchList({ page: 1, limit: 10 }, courseId);
//         }
//     }, [courseId]);

//     const onOpenAddModal = () =>
//         navigate("/batches/add-batch", { state: { courseId } });

//     useEffect(() => {
//         if (openModal) {
//             getAllTeacher();
//         }
//     }, [openModal]);

//     const openAssignModal = (batchId) => {
//         setSelectedBatchId(batchId);
//         setOpenModal(true);
//     };

//     const handleAssign = () => {
//         if (!selectedTeacher) {
//             alert("Please select a teacher");
//             return;
//         }

//         assignTeacherToBatch(
//             courseId,
//             selectedBatchId,
//             selectedTeacher
//         );

//         setOpenModal(false);
//         setSelectedTeacher("");
//     };
//     console.log(batchList, "batchList")
//     return (
//         <>
//             <CommonBreadcrumb title={`Batch List for Course ID: ${courseId}`} />

//             <Container fluid>
//                 <Col sm="12">
//                     <div className="row align-items-center mb-4 justify-content-between">
//                         <div className="col-md-6">
//                             <Input
//                                 placeholder="Search Batch"
//                                 className="form-control"
//                                 style={{ boxShadow: "0 0 10px rgba(4, 59, 54, 1)" }}
//                                 value={search}
//                                 onChange={(e) => setSearch(e.target.value)}
//                             />
//                         </div>

//                         <div className="col-md-6 d-flex justify-content-end">
//                             <button onClick={onOpenAddModal} className="btn btnGreen">
//                                 + Add Batch
//                             </button>
//                         </div>
//                     </div>

//                     <div className="table-responsive mt-4">
//                         <Table bordered hover>
//                             <thead style={{ background: "#f1f1f1" }}>
//                                 <tr>
//                                     <th>SL</th>
//                                     <th>Batch Name</th>
//                                     <th>Status</th>
//                                     <th>Time Slots</th>
//                                     <th>Actions</th>
//                                     <th>Assign Teacher</th>
//                                     <th>Add Live Class</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {batchList?.data?.length > 0 ? (
//                                     batchList.data.map((item, index) => (
//                                         <tr key={item.id}>
//                                             <td>{index + 1}</td>
//                                             <td>{item.batch_name}</td>
//                                             <td>
//                                                 <span
//                                                     className={`badge ${item.status === "active"
//                                                         ? "bg-success"
//                                                         : item.status === "upcoming"
//                                                             ? "bg-info"
//                                                             : "bg-secondary"
//                                                         }`}
//                                                 >
//                                                     {item.status}
//                                                 </span>
//                                             </td>

//                                             <td>
//                                                 {item.time_slots?.length > 0 ? (
//                                                     item.time_slots.map((slot) => (
//                                                         <div key={slot.id}>
//                                                             {slot.day_of_week.toUpperCase()} :{" "}
//                                                             {slot.start_time} - {slot.end_time}
//                                                         </div>
//                                                     ))
//                                                 ) : (
//                                                     <span className="text-muted">No Time Slots</span>
//                                                 )}
//                                             </td>

//                                             <td>
//                                                 <button
//                                                     className="btn btn-sm btn-primary me-2"
//                                                     onClick={() =>
//                                                         navigate("/batches/edit-batch", {
//                                                             state: { batchId: item.id, courseId },
//                                                         })
//                                                     }
//                                                 >
//                                                     Edit
//                                                 </button>

//                                                 <button
//                                                     className="btn btn-sm btn-danger"
//                                                     onClick={() => console.log("delete", item.id)}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </td>

//                                             <td>
//                                                 {/* Show teacher name OR no-teacher text */}
//                                                 <div>
//                                                     {item.teacher_name ? (
//                                                         <span className="fw-bold text-success">
//                                                             {item.teacher_name}
//                                                         </span>
//                                                     ) : (
//                                                         <span className="text-muted">
//                                                             No teacher assigned
//                                                         </span>
//                                                     )}
//                                                 </div>

//                                                 {/* Button changes based on teacher availability */}
//                                                 <button
//                                                     className="btn btn-sm btn-secondary mt-2"
//                                                     onClick={() => openAssignModal(item.id)}
//                                                 >
//                                                     {item.teacher_name ? "Change Teacher" : "Assign Teacher"}
//                                                 </button>
//                                             </td>
//                                             <td>
//                                                 <button
//                                                     className="btn btn-sm btn-info"
//                                                     onClick={() => navigate("/batches/add-live-class", { state: { batchId: item.id, courseId: courseId, teacherId: item.teacher_id } })}
//                                                 >
//                                                     Add Live Class
//                                                 </button>
//                                             </td>

//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="text-center py-4">
//                                             No batches found
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </Table>
//                     </div>
//                 </Col>
//             </Container>

//             {/* Assign Teacher Modal */}
//             <Modal isOpen={openModal} toggle={() => setOpenModal(false)}>
//                 <ModalHeader toggle={() => setOpenModal(false)}>
//                     Assign Teacher to Batch
//                 </ModalHeader>

//                 <ModalBody>
//                     <label className="form-label fw-bold">Select Teacher</label>
//                     <select
//                         className="form-control"
//                         value={selectedTeacher}
//                         onChange={(e) => setSelectedTeacher(e.target.value)}
//                     >
//                         <option value="">-- Choose Teacher --</option>
//                         {allTeacher?.data?.map((t) => (
//                             <option key={t.id} value={t.id}>
//                                 {t.full_name}
//                             </option>
//                         ))}
//                     </select>
//                 </ModalBody>

//                 <ModalFooter>
//                     <button className="btn btn-secondary" onClick={() => setOpenModal(false)}>
//                         Close
//                     </button>

//                     <button className="btn btn-primary" onClick={handleAssign}>
//                         Assign
//                     </button>
//                 </ModalFooter>
//             </Modal>
//         </>
//     );
// };

// export default BatchList;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Badge, Stack } from 'react-bootstrap';
import {
    FiPlus, FiEdit3, FiTrash2, FiCalendar, FiUsers, FiUser, FiChevronLeft, FiAlertCircle
} from 'react-icons/fi';
import { useCommonContext } from "../../helper/CommonProvider";

const ManageBatches = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const courseId = id;

    const { batchList, getBatchList, getAllTeacher, allTeacher, assignTeacherToBatch } = useCommonContext();

    useEffect(() => {
        if (courseId) {
            getBatchList({ page: 1, limit: 10 }, courseId);
        }
    }, [courseId]);
    console.log(batchList, "batchList")
    // Static Course Data
    const [courseInfo] = useState({
        title: "Complete Web Development Bootcamp",
        category: "Programming"
    });

    const [batches, setBatches] = useState([
        {
            id: '201',
            name: 'Jan 2026 Batch',
            teacher: 'John Doe',
            startDate: '2026-01-01',
            endDate: '2026-04-01',
            maxStudents: 120,
            status: 'Ongoing',
            description: 'Primary morning batch',
            slots: [{ id: 's1', day: 'Monday', start: '10:00', end: '12:00' }]
        }
    ]);

    const handleDeleteBatch = (batchId) => {
        if (confirm("Delete this batch?")) {
            setBatches(batches.filter(b => b.id !== batchId));
        }
    };

    return (
        <Container fluid className="text-white py-4 min-vh-100 bg-black">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-3">
                    <Button
                        variant="dark"
                        className="rounded-circle p-2 border-secondary shadow-sm"
                        onClick={() => navigate('/course-list')}
                        style={{ backgroundColor: '#1A1A1A' }}
                    >
                        <FiChevronLeft size={20} />
                    </Button>
                    <div>
                        <h2 className="fw-bold mb-0 text-white">Batch Management</h2>
                        <p className="text-secondary small mb-0">Course: <span className="text-warning">{courseInfo.title}</span></p>
                    </div>
                </div>
                <Button
                    variant="warning"
                    className="px-4 fw-bold shadow-sm d-flex align-items-center gap-2"
                    onClick={() => navigate(`/batches/add-batch/${id}`)}
                >
                    <FiPlus /> Create New Batch
                </Button>
            </div>

            <Card className="bg-dark border-secondary border-opacity-10 shadow-lg overflow-hidden" style={{ backgroundColor: '#1E1E1E' }}>
                <Table responsive hover variant="dark" className="align-middle mb-0 bg-transparent">
                    <thead className="bg-black bg-opacity-50 text-secondary small pt-3">
                        <tr>
                            <th className="px-4 py-3 border-0">BATCH NAME</th>
                            <th className="py-3 border-0">INSTRUCTOR</th>
                            <th className="py-3 border-0">TIMELINE</th>
                            <th className="py-3 border-0 text-center">STUDENTS</th>
                            <th className="py-3 border-0 text-center">SLOTS</th>
                            <th className="py-3 border-0">STATUS</th>
                            <th className="py-3 border-0 text-end pe-4">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="small">
                        {batchList?.data?.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-5 text-secondary border-0">
                                    <div className="py-4">
                                        <FiAlertCircle size={40} className="mb-3 opacity-25" />
                                        <p className="mb-3">No batches found for this course.</p>
                                        <Button
                                            variant="outline-warning"
                                            size="sm"
                                            className="px-4 fw-bold"
                                            onClick={() => navigate(`/manage-batches/${id}/add`)}
                                        >
                                            Create First Batch
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            batchList?.data?.map(batch => (
                                <tr key={batch.id} className="border-bottom border-secondary border-opacity-10 transition-all">
                                    <td className="px-4 py-3">
                                        <div className="fw-bold text-white">{batch.batch_name}</div>
                                        <div className="x-small text-secondary">{batch?.description?.substring(0, 40)}...</div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="bg-secondary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
                                                <FiUser size={12} className="text-secondary" />
                                            </div>
                                            <span>{batch.teacher_name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2 x-small text-secondary">
                                            <FiCalendar className="text-warning" />
                                            <span>{batch.start_date} — {batch.end_date}</span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <Badge bg="dark" className="border border-secondary border-opacity-25 fw-normal px-2 py-1">
                                            <FiUsers size={12} className="me-1" /> {batch.max_students}
                                        </Badge>
                                    </td>
                                    <td className="text-center">
                                        <Badge bg="warning" text="dark" className="fw-bold px-2 py-1">{batch?.time_slots?.length} Slots</Badge>
                                    </td>
                                    <td>
                                        <Badge
                                            bg={batch.status === 'ongoing' ? 'success' : 'info'}
                                            className="px-2 py-1 fw-bold"
                                            style={{ minWidth: '70px' }}
                                        >
                                            {batch.status}
                                        </Badge>
                                    </td>
                                    <td className="text-end pe-4">
                                        <div className="d-flex justify-content-end gap-2">
                                            <Button
                                                variant="outline-light"
                                                size="sm"
                                                className="border-secondary border-opacity-25 action-btn"
                                                onClick={() => navigate(`/manage-batches/${id}/edit/${batch.id}`)}
                                                title="Edit Batch"
                                            >
                                                <FiEdit3 size={14} />
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                className="border-danger border-opacity-25 action-btn"
                                                onClick={() => handleDeleteBatch(batch.id)}
                                                title="Delete Batch"
                                            >
                                                <FiTrash2 size={14} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Card>

            <style>{`
                .x-small { font-size: 11px; }
                .border-dashed { border-style: dashed !important; }
                .transition-all { transition: all 0.2s ease; }
                .action-btn { transition: all 0.2s; }
                .action-btn:hover { transform: translateY(-2px); }
                tr:hover { background-color: rgba(255, 255, 255, 0.02) !important; }
                .bg-black { background-color: #000 !important; }
            `}</style>
        </Container>
    );
};

export default ManageBatches;
