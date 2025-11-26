import React, { useState, useEffect } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCommonContext } from "../../helper/CommonProvider";

const AddBatch = () => {
    const navigate = useNavigate();
    const { courseId } = useLocation().state;
    console.log(courseId)
    const { addBatch } = useCommonContext();

    const [inputData, setInputData] = useState({
        course_id: courseId,
        batch_name: "",
        start_date: "",
        end_date: "",
        max_students: "",
        status: "upcoming",
        description: "",
        time_slots: [
            { day_of_week: "", start_time: "", end_time: "" }
        ],
    });

    // useEffect(() => {
    //     if (courseId) getCourseDetails(courseId);
    // }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    const handleTimeSlotChange = (index, field, value) => {
        const updated = [...inputData.time_slots];
        updated[index][field] = value;
        setInputData({ ...inputData, time_slots: updated });
    };

    const addTimeSlot = () => {
        setInputData({
            ...inputData,
            time_slots: [...inputData.time_slots, { day_of_week: "", start_time: "", end_time: "" }]
        });
    };

    const removeTimeSlot = (index) => {
        const updated = inputData.time_slots.filter((_, i) => i !== index);
        setInputData({ ...inputData, time_slots: updated });
    };

    const handleSubmit = async () => {
        addBatch(inputData);
        // navigate(-1);
    };

    return (
        <>
            <CommonBreadcrumb title="Add Batch" />

            <div className="product-form-container p-3">
                <form
                    style={{
                        backgroundColor: "#f5f5f5",
                        padding: "20px",
                        borderRadius: "10px",
                    }}
                >
                    {/* HEADER */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Add New Batch</h4>
                        <Button color="secondary" onClick={() => navigate(-1)}>Back</Button>
                    </div>

                    {/* BASIC INFO */}
                    <div className="card p-3 mb-3">
                        <h5>Batch Information</h5>
                        <div className="row mt-3">

                            <div className="col-md-4">
                                <FormGroup>
                                    <Label>Batch Name</Label>
                                    <Input
                                        type="text"
                                        name="batch_name"
                                        value={inputData.batch_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                            </div>

                            <div className="col-md-4">
                                <FormGroup>
                                    <Label>Start Date</Label>
                                    <Input
                                        type="date"
                                        name="start_date"
                                        value={inputData.start_date}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                            </div>

                            <div className="col-md-4">
                                <FormGroup>
                                    <Label>End Date</Label>
                                    <Input
                                        type="date"
                                        name="end_date"
                                        value={inputData.end_date}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </div>



                            <div className="col-md-4">
                                <FormGroup>
                                    <Label>Max Students</Label>
                                    <Input
                                        type="number"
                                        name="max_students"
                                        value={inputData.max_students}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </div>

                            <div className="col-md-4">
                                <FormGroup>
                                    <Label>Status</Label>
                                    <Input
                                        type="select"
                                        name="status"
                                        value={inputData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                    </Input>
                                </FormGroup>
                            </div>

                            <div className="col-md-12">
                                <FormGroup>
                                    <Label>Description</Label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        value={inputData.description}
                                        rows="4"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </div>

                    {/* TIME SLOT SECTION */}
                    <div className="card p-3 mb-4">
                        <h5>Batch Time Slots</h5>

                        {inputData.time_slots.map((item, index) => (
                            <div className="row mt-3" key={index}>
                                <div className="col-md-3">
                                    <Label>Day</Label>
                                    <Input
                                        type="select"
                                        value={item.day_of_week}
                                        onChange={(e) => handleTimeSlotChange(index, "day_of_week", e.target.value)}
                                    >
                                        <option value="">Select Day</option>
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                        <option value="saturday">Saturday</option>
                                        <option value="sunday">Sunday</option>
                                    </Input>
                                </div>

                                <div className="col-md-3">
                                    <Label>Start Time</Label>
                                    <Input
                                        type="time"
                                        value={item.start_time}
                                        onChange={(e) => handleTimeSlotChange(index, "start_time", e.target.value)}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Label>End Time</Label>
                                    <Input
                                        type="time"
                                        value={item.end_time}
                                        onChange={(e) => handleTimeSlotChange(index, "end_time", e.target.value)}
                                    />
                                </div>

                                <div className="col-md-3 d-flex align-items-end">
                                    <Button color="danger" onClick={() => removeTimeSlot(index)} disabled={inputData.time_slots.length === 1}>
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <Button color="success" className="mt-3" onClick={addTimeSlot}>
                            + Add Another Time Slot
                        </Button>
                    </div>

                    {/* SUBMIT */}
                    <div className="text-end">
                        <Button color="primary" onClick={handleSubmit}>
                            Save Batch
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddBatch;
