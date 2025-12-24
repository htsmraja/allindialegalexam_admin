import React, { useState } from 'react';
import CommonBreadcrumb from '../../../component/common/bread-crumb';
import { useNavigate } from 'react-router-dom';
import { Button, FormGroup, Input, Label } from "reactstrap";
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
    const handleSubmit = async () => {
        await addExamType(inputData);
    };
    return (
        <>
            <CommonBreadcrumb title="Add Exam Type" />
            <div className="product-form-container p-3">
                <form
                    style={{
                        backgroundColor: "#f5f5f5",
                        padding: "20px",
                        borderRadius: "10px",
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Add New Exam Type</h4>
                        <Button color="secondary" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </div>

                    <div className="card p-3 mb-3">
                        <h5>Basic Information</h5>
                        <div className="row mt-3">
                            <div className="col-md-3">
                                <FormGroup>
                                    <Label>Title</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={inputData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                    <div className="text-end">
                        <Button color="primary" onClick={handleSubmit}>Submit Book</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddExamType;
