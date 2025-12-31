import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonBreadcrumb from '../../component/common/bread-crumb';
import {
    Button,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { useCommonContext } from '../../helper/CommonProvider';
import { toast } from 'react-toastify';

const AddLiveClass = () => {
    const { addLiveClass } = useCommonContext();
    const navigate = useNavigate();
    const { state } = useLocation();

    const courseId = state?.courseId;
    const batchId = state?.batchId;
    const teacherId = state?.teacherId;

    const [inputData, setInputData] = useState({
        title: '',
        description: '',
        meet_link: '',
        meet_platform: 'google_meet',
        scheduled_date: '',
        start_time: '',
        end_time: '',
        status: 'scheduled'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputData.meet_link) {
            return toast.error('Meet link is required');
        }
        if (!courseId) {
            return toast.error('Course ID is required');
        }
        if (!batchId) {
            return toast.error('Batch ID is required');
        }
        if (!teacherId) {
            return toast.error('Teacher ID is required');
        }

        const payload = {
            course_id: courseId,
            batch_id: batchId,
            teacher_id: teacherId,
            ...inputData
        };

        addLiveClass(payload);

    };

    return (
        <>
            <CommonBreadcrumb title="Add Live Class" />

            <div className="container mt-3">
                <form
                    onSubmit={handleSubmit}
                    className="card p-4"
                    style={{ borderRadius: 12 }}
                >
                    <div className="d-flex justify-content-between mb-3">
                        <h4>Add Live Class</h4>
                        <Button color="secondary" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </div>

                    <div className="row">

                        {/* Title */}
                        <div className="col-md-6">
                            <FormGroup>
                                <Label>Class Title *</Label>
                                <Input
                                    name="title"
                                    value={inputData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </div>

                        {/* Platform */}
                        <div className="col-md-6">
                            <FormGroup>
                                <Label>Meeting Platform</Label>
                                <Input
                                    type="select"
                                    name="meet_platform"
                                    value={inputData.meet_platform}
                                    onChange={handleChange}
                                >
                                    <option value="google_meet">Google Meet</option>
                                    <option value="zoom">Zoom</option>
                                    <option value="other">Other</option>
                                </Input>
                            </FormGroup>
                        </div>

                        {/* Meet Link */}
                        <div className="col-md-12">
                            <FormGroup>
                                <Label>Meet Link *</Label>
                                <Input
                                    name="meet_link"
                                    value={inputData.meet_link}
                                    onChange={handleChange}
                                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                                    required
                                />
                            </FormGroup>
                        </div>

                        {/* Date */}
                        <div className="col-md-4">
                            <FormGroup>
                                <Label>Scheduled Date *</Label>
                                <Input
                                    type="date"
                                    name="scheduled_date"
                                    value={inputData.scheduled_date}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </div>

                        {/* Start Time */}
                        <div className="col-md-4">
                            <FormGroup>
                                <Label>Start Time *</Label>
                                <Input
                                    type="time"
                                    name="start_time"
                                    value={inputData.start_time}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </div>

                        {/* End Time */}
                        <div className="col-md-4">
                            <FormGroup>
                                <Label>End Time *</Label>
                                <Input
                                    type="time"
                                    name="end_time"
                                    value={inputData.end_time}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </div>

                        {/* Status */}
                        <div className="col-md-4">
                            <FormGroup>
                                <Label>Status</Label>
                                <Input
                                    type="select"
                                    name="status"
                                    value={inputData.status}
                                    onChange={handleChange}
                                >
                                    <option value="scheduled">Scheduled</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </Input>
                            </FormGroup>
                        </div>

                        {/* Description */}
                        <div className="col-md-12">
                            <FormGroup>
                                <Label>Description</Label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="description"
                                    value={inputData.description}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </div>

                    </div>

                    <div className="text-end">
                        <Button type="submit" color="primary">
                            Create Live Class
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddLiveClass;
