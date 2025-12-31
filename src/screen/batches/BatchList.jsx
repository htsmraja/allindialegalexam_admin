import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import {
    Col,
    Container,
    Input,
    Modal,
    Table,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import { useCommonContext } from "../../helper/CommonProvider";

const BatchList = () => {
    const navigate = useNavigate();
    const { batchList, getBatchList, getAllTeacher, allTeacher, assignTeacherToBatch } =
        useCommonContext();

    const { state } = useLocation();
    const courseId = state?.courseId;

    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [selectedBatchId, setSelectedBatchId] = useState("");

    useEffect(() => {
        if (courseId) {
            getBatchList({ page: 1, limit: 10 }, courseId);
        }
    }, [courseId]);

    const onOpenAddModal = () =>
        navigate("/batches/add-batch", { state: { courseId } });

    useEffect(() => {
        if (openModal) {
            getAllTeacher();
        }
    }, [openModal]);

    const openAssignModal = (batchId) => {
        setSelectedBatchId(batchId);
        setOpenModal(true);
    };

    const handleAssign = () => {
        if (!selectedTeacher) {
            alert("Please select a teacher");
            return;
        }

        assignTeacherToBatch(
            courseId,
            selectedBatchId,
            selectedTeacher
        );

        setOpenModal(false);
        setSelectedTeacher("");
    };
    console.log(batchList, "batchList")
    return (
        <>
            <CommonBreadcrumb title={`Batch List for Course ID: ${courseId}`} />

            <Container fluid>
                <Col sm="12">
                    <div className="row align-items-center mb-4 justify-content-between">
                        <div className="col-md-6">
                            <Input
                                placeholder="Search Batch"
                                className="form-control"
                                style={{ boxShadow: "0 0 10px rgba(4, 59, 54, 1)" }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6 d-flex justify-content-end">
                            <button onClick={onOpenAddModal} className="btn btnGreen">
                                + Add Batch
                            </button>
                        </div>
                    </div>

                    <div className="table-responsive mt-4">
                        <Table bordered hover>
                            <thead style={{ background: "#f1f1f1" }}>
                                <tr>
                                    <th>SL</th>
                                    <th>Batch Name</th>
                                    <th>Status</th>
                                    <th>Time Slots</th>
                                    <th>Actions</th>
                                    <th>Assign Teacher</th>
                                    <th>Add Live Class</th>
                                </tr>
                            </thead>

                            <tbody>
                                {batchList?.data?.length > 0 ? (
                                    batchList.data.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.batch_name}</td>
                                            <td>
                                                <span
                                                    className={`badge ${item.status === "active"
                                                        ? "bg-success"
                                                        : item.status === "upcoming"
                                                            ? "bg-info"
                                                            : "bg-secondary"
                                                        }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>

                                            <td>
                                                {item.time_slots?.length > 0 ? (
                                                    item.time_slots.map((slot) => (
                                                        <div key={slot.id}>
                                                            {slot.day_of_week.toUpperCase()} :{" "}
                                                            {slot.start_time} - {slot.end_time}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span className="text-muted">No Time Slots</span>
                                                )}
                                            </td>

                                            <td>
                                                <button
                                                    className="btn btn-sm btn-primary me-2"
                                                    onClick={() =>
                                                        navigate("/batches/edit-batch", {
                                                            state: { batchId: item.id, courseId },
                                                        })
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => console.log("delete", item.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>

                                            <td>
                                                {/* Show teacher name OR no-teacher text */}
                                                <div>
                                                    {item.teacher_name ? (
                                                        <span className="fw-bold text-success">
                                                            {item.teacher_name}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted">
                                                            No teacher assigned
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Button changes based on teacher availability */}
                                                <button
                                                    className="btn btn-sm btn-secondary mt-2"
                                                    onClick={() => openAssignModal(item.id)}
                                                >
                                                    {item.teacher_name ? "Change Teacher" : "Assign Teacher"}
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-info"
                                                    onClick={() => navigate("/batches/add-live-class", { state: { batchId: item.id, courseId: courseId, teacherId: item.teacher_id } })}
                                                >
                                                    Add Live Class
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">
                                            No batches found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Container>

            {/* Assign Teacher Modal */}
            <Modal isOpen={openModal} toggle={() => setOpenModal(false)}>
                <ModalHeader toggle={() => setOpenModal(false)}>
                    Assign Teacher to Batch
                </ModalHeader>

                <ModalBody>
                    <label className="form-label fw-bold">Select Teacher</label>
                    <select
                        className="form-control"
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                    >
                        <option value="">-- Choose Teacher --</option>
                        {allTeacher?.data?.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.full_name}
                            </option>
                        ))}
                    </select>
                </ModalBody>

                <ModalFooter>
                    <button className="btn btn-secondary" onClick={() => setOpenModal(false)}>
                        Close
                    </button>

                    <button className="btn btn-primary" onClick={handleAssign}>
                        Assign
                    </button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default BatchList;
