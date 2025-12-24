import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useCommonContext } from "../../helper/CommonProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";


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

    const handleSubmit = async () => {
        console.log(data)
        await addQuestionPaper(data);
    };
    console.log(examTypeList, "examTypeList")
    return (
        <>
            <CommonBreadcrumb title="Create Question Paper" />

            <div className="product-form-container p-3">
                <form
                    style={{
                        backgroundColor: "#f5f5f5",
                        padding: "20px",
                        borderRadius: "10px",
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Create Paper</h4>
                        <Button color="secondary" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </div>

                    <div className="card p-3 mb-3">
                        <h5>Basic Details</h5>

                        <div className="row mt-3">

                            <div className="col-md-4">
                                <FormGroup>
                                    <Label>Title</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                            </div>

                            <div className="col-md-4">
                                <FormGroup>
                                    <Label>Subtitle</Label>
                                    <Input
                                        type="text"
                                        name="subtitle"
                                        value={data.subtitle}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-4">
                                <FormGroup>
                                    <Label>Exam Type</Label>
                                    <Input
                                        type="select"
                                        name="exam_type_id"
                                        value={data.exam_type_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Exam Type</option>
                                        {examTypeList?.data?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </div>
                            <div className="col-md-4">
                                <FormGroup>
                                    <Label>Total Marks</Label>
                                    <Input
                                        type="number"
                                        name="total_marks"
                                        value={data.total_marks}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </div>

                            <div className="col-md-4">
                                <FormGroup>
                                    <Label>Total Duration (Minutes)</Label>
                                    <Input
                                        type="number"
                                        name="total_duration_minutes"
                                        value={data.total_duration_minutes}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </div>

                            <div className="col-md-12">
                                <FormGroup>
                                    <Label>Description</Label>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        value={data.description}
                                        onChange={handleChange}
                                        rows="3"
                                    />
                                </FormGroup>
                            </div>

                        </div>
                    </div>

                    <div className="text-end">
                        <Button color="primary" onClick={handleSubmit}>
                            Create Paper
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddQuestionPaper;
