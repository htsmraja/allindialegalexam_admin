import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCommonContext } from "../../helper/CommonProvider";

const AddCourse = () => {
    const navigate = useNavigate();
    const { getCategoryList, category, getSubCategoryList, subcategory, addCourse } = useCommonContext();

    const [inputData, setInputData] = useState({
        title: "",
        category_id: "",
        subcategory_id: "",
        difficulty: "beginner",
        language: "english",
        description: "",
        price: "",
        sale_price: "",
        offer_price: "",
        offer_start: "",
        offer_end: "",
        mark_as_offer: false,
        is_subscription_allowed: false,
        subscription_period: "",
        status: "draft",
        thumbnail: null,
        preview_video: null,
        meta: "",
    });

    useEffect(() => {
        getCategoryList();
    }, []);

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setInputData({ ...inputData, category_id: categoryId, subcategory_id: "" });
        getSubCategoryList(categoryId);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value;

        if (value === "true") finalValue = true;
        if (value === "false") finalValue = false;

        setInputData((prev) => ({ ...prev, [name]: finalValue }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setInputData((prev) => ({ ...prev, [name]: files[0] }));
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        Object.entries(inputData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const res = await addCourse(formData);
        if (res?.status) navigate("/course-list");
    };

    return (
        <>
            <CommonBreadcrumb title="Add Course" />

            <div className="product-form-container p-3">
                <form
                    style={{
                        backgroundColor: "#f5f5f5",
                        padding: "20px",
                        borderRadius: "10px",
                    }}
                >
                    <div className="d-flex justify-content-between mb-3">
                        <h4>Add New Course</h4>
                        <Button color="secondary" onClick={() => navigate(-1)}>Back</Button>
                    </div>

                    {/* BASIC INFO */}
                    <div className="card p-3 mb-3">
                        <h5>Basic Information</h5>

                        <div className="row mt-3">
                            <div className="col-md-4">
                                <Label>Title</Label>
                                <Input name="title" value={inputData.title} onChange={handleChange} required />
                            </div>

                            <div className="col-md-4">
                                <Label>Category</Label>
                                <Input type="select" name="category_id" value={inputData.category_id} onChange={handleCategoryChange}>
                                    <option value="">Select Category</option>
                                    {category?.data?.categories?.map((c) => (
                                        <option key={c.id} value={c.id}>{c.title}</option>
                                    ))}
                                </Input>
                            </div>

                            <div className="col-md-4">
                                <Label>Subcategory</Label>
                                <Input type="select" name="subcategory_id" value={inputData.subcategory_id} onChange={handleChange}>
                                    <option value="">Select Subcategory</option>
                                    {subcategory?.data?.map((sc) => (
                                        <option key={sc.id} value={sc.id}>{sc.title}</option>
                                    ))}
                                </Input>
                            </div>

                            <div className="col-md-4 mt-3">
                                <Label>Difficulty</Label>
                                <Input type="select" name="difficulty" value={inputData.difficulty} onChange={handleChange}>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </Input>
                            </div>

                            <div className="col-md-4 mt-3">
                                <Label>Language</Label>
                                <Input type="select" name="language" value={inputData.language} onChange={handleChange}>
                                    <option value="english">English</option>
                                    <option value="hindi">Hindi</option>
                                    <option value="bilingual">Bilingual</option>
                                </Input>
                            </div>
                        </div>

                        <div className="mt-3">
                            <Label>Description</Label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={inputData.description}
                                onChange={handleChange}
                                rows="5"
                            ></textarea>
                        </div>
                    </div>



                    {/* SUBSCRIPTION */}
                    <div className="card p-3 mb-3">
                        <h5>Subscription Options</h5>

                        <div className="row">
                            <div className="col-md-3">
                                <Label>Allow Subscription?</Label>
                                <Input type="select" name="is_subscription_allowed" value={inputData.is_subscription_allowed} onChange={handleChange}>
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </Input>
                            </div>

                            {inputData.is_subscription_allowed && (
                                <div className="col-md-3">
                                    <Label>Subscription Period (Days)</Label>
                                    <Input name="subscription_period" value={inputData.subscription_period} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    </div>
                    {/* PRICING */}
                    {inputData.is_subscription_allowed && (
                        <div className="card p-3 mb-3">
                            <h5>Pricing Details</h5>

                            <div className="row">
                                <div className="col-md-3">
                                    <Label>Price</Label>
                                    <Input name="price" value={inputData.price} onChange={handleChange} />
                                </div>

                                <div className="col-md-3">
                                    <Label>Sale Price</Label>
                                    <Input name="sale_price" value={inputData.sale_price} onChange={handleChange} />
                                </div>

                                <div className="col-md-3">
                                    <Label>Is Offer?</Label>
                                    <Input type="select" name="mark_as_offer" value={inputData.mark_as_offer} onChange={handleChange}>
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </Input>
                                </div>

                                {inputData.mark_as_offer && (
                                    <>
                                        <div className="col-md-3">
                                            <Label>Offer Price</Label>
                                            <Input name="offer_price" value={inputData.offer_price} onChange={handleChange} />
                                        </div>

                                        <div className="col-md-3 mt-3">
                                            <Label>Offer Start</Label>
                                            <Input type="datetime-local" name="offer_start" value={inputData.offer_start} onChange={handleChange} />
                                        </div>

                                        <div className="col-md-3 mt-3">
                                            <Label>Offer End</Label>
                                            <Input type="datetime-local" name="offer_end" value={inputData.offer_end} onChange={handleChange} />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* FILE UPLOAD */}
                    <div className="card p-3 mb-3">
                        <h5>Uploads</h5>

                        <div className="row">
                            <div className="col-md-6">
                                <Label>Thumbnail</Label>
                                <Input type="file" name="thumbnail" accept="image/*" onChange={handleFileChange} />
                            </div>

                            <div className="col-md-6">
                                <Label>Preview Video</Label>
                                <Input type="file" name="preview_video" accept="video/*" onChange={handleFileChange} />
                            </div>
                        </div>
                    </div>

                    {/* META */}
                    <div className="card p-3 mb-3">
                        <h5>Meta Information (JSON)</h5>
                        <textarea
                            className="form-control"
                            name="meta"
                            value={inputData.meta}
                            onChange={handleChange}
                            rows="4"
                            placeholder='{"duration": "10 Hours", "level": "Beginner"}'
                        ></textarea>
                    </div>

                    <div className="text-end">
                        <Button color="primary" onClick={handleSubmit}>Submit Course</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCourse;
