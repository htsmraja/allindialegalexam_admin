// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, FormGroup, Input, Label } from "reactstrap";
// import CommonBreadcrumb from "../../component/common/bread-crumb";
// import { useCommonContext } from "../../helper/CommonProvider";

// const AddCourse = () => {
//     const navigate = useNavigate();
//     const { getCategoryList, category, getSubCategoryList, subcategory, addCourse } = useCommonContext();

//     const [inputData, setInputData] = useState({
//         title: "",
//         category_id: "",
//         subcategory_id: "",
//         difficulty: "beginner",
//         language: "english",
//         description: "",
//         price: "",
//         sale_price: "",
//         offer_price: "",
//         offer_start: "",
//         offer_end: "",
//         mark_as_offer: false,
//         is_subscription_allowed: false,
//         subscription_period: "",
//         status: "draft",
//         thumbnail: null,
//         preview_video: null,
//         meta: "",
//     });

//     useEffect(() => {
//         getCategoryList();
//     }, []);

//     const handleCategoryChange = (e) => {
//         const categoryId = e.target.value;
//         setInputData({ ...inputData, category_id: categoryId, subcategory_id: "" });
//         getSubCategoryList(categoryId);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         let finalValue = value;

//         if (value === "true") finalValue = true;
//         if (value === "false") finalValue = false;

//         setInputData((prev) => ({ ...prev, [name]: finalValue }));
//     };

//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         setInputData((prev) => ({ ...prev, [name]: files[0] }));
//     };

//     const handleSubmit = async () => {
//         const formData = new FormData();

//         Object.entries(inputData).forEach(([key, value]) => {
//             formData.append(key, value);
//         });

//         const res = await addCourse(formData);
//         if (res?.status) navigate("/course-list");
//     };

//     return (
//         <>
//             <CommonBreadcrumb title="Add Course" />

//             <div className="product-form-container p-3">
//                 <form
//                     style={{
//                         backgroundColor: "#f5f5f5",
//                         padding: "20px",
//                         borderRadius: "10px",
//                     }}
//                 >
//                     <div className="d-flex justify-content-between mb-3">
//                         <h4>Add New Course</h4>
//                         <Button color="secondary" onClick={() => navigate(-1)}>Back</Button>
//                     </div>

//                     {/* BASIC INFO */}
//                     <div className="card p-3 mb-3">
//                         <h5>Basic Information</h5>

//                         <div className="row mt-3">
//                             <div className="col-md-4">
//                                 <Label>Title</Label>
//                                 <Input name="title" value={inputData.title} onChange={handleChange} required />
//                             </div>

//                             <div className="col-md-4">
//                                 <Label>Category</Label>
//                                 <Input type="select" name="category_id" value={inputData.category_id} onChange={handleCategoryChange}>
//                                     <option value="">Select Category</option>
//                                     {category?.data?.categories?.map((c) => (
//                                         <option key={c.id} value={c.id}>{c.title}</option>
//                                     ))}
//                                 </Input>
//                             </div>

//                             <div className="col-md-4">
//                                 <Label>Subcategory</Label>
//                                 <Input type="select" name="subcategory_id" value={inputData.subcategory_id} onChange={handleChange}>
//                                     <option value="">Select Subcategory</option>
//                                     {subcategory?.data?.map((sc) => (
//                                         <option key={sc.id} value={sc.id}>{sc.title}</option>
//                                     ))}
//                                 </Input>
//                             </div>

//                             <div className="col-md-4 mt-3">
//                                 <Label>Difficulty</Label>
//                                 <Input type="select" name="difficulty" value={inputData.difficulty} onChange={handleChange}>
//                                     <option value="beginner">Beginner</option>
//                                     <option value="intermediate">Intermediate</option>
//                                     <option value="advanced">Advanced</option>
//                                 </Input>
//                             </div>

//                             <div className="col-md-4 mt-3">
//                                 <Label>Language</Label>
//                                 <Input type="select" name="language" value={inputData.language} onChange={handleChange}>
//                                     <option value="english">English</option>
//                                     <option value="hindi">Hindi</option>
//                                     <option value="bilingual">Bilingual</option>
//                                 </Input>
//                             </div>
//                         </div>

//                         <div className="mt-3">
//                             <Label>Description</Label>
//                             <textarea
//                                 className="form-control"
//                                 name="description"
//                                 value={inputData.description}
//                                 onChange={handleChange}
//                                 rows="5"
//                             ></textarea>
//                         </div>
//                     </div>



//                     {/* SUBSCRIPTION */}
//                     <div className="card p-3 mb-3">
//                         <h5>Subscription Options</h5>

//                         <div className="row">
//                             <div className="col-md-3">
//                                 <Label>Allow Subscription?</Label>
//                                 <Input type="select" name="is_subscription_allowed" value={inputData.is_subscription_allowed} onChange={handleChange}>
//                                     <option value="false">No</option>
//                                     <option value="true">Yes</option>
//                                 </Input>
//                             </div>

//                             {inputData.is_subscription_allowed && (
//                                 <div className="col-md-3">
//                                     <Label>Subscription Period (Days)</Label>
//                                     <Input name="subscription_period" value={inputData.subscription_period} onChange={handleChange} />
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                     {/* PRICING */}
//                     {inputData.is_subscription_allowed && (
//                         <div className="card p-3 mb-3">
//                             <h5>Pricing Details</h5>

//                             <div className="row">
//                                 <div className="col-md-3">
//                                     <Label>Price</Label>
//                                     <Input name="price" value={inputData.price} onChange={handleChange} />
//                                 </div>

//                                 <div className="col-md-3">
//                                     <Label>Sale Price</Label>
//                                     <Input name="sale_price" value={inputData.sale_price} onChange={handleChange} />
//                                 </div>

//                                 <div className="col-md-3">
//                                     <Label>Is Offer?</Label>
//                                     <Input type="select" name="mark_as_offer" value={inputData.mark_as_offer} onChange={handleChange}>
//                                         <option value="false">No</option>
//                                         <option value="true">Yes</option>
//                                     </Input>
//                                 </div>

//                                 {inputData.mark_as_offer && (
//                                     <>
//                                         <div className="col-md-3">
//                                             <Label>Offer Price</Label>
//                                             <Input name="offer_price" value={inputData.offer_price} onChange={handleChange} />
//                                         </div>

//                                         <div className="col-md-3 mt-3">
//                                             <Label>Offer Start</Label>
//                                             <Input type="datetime-local" name="offer_start" value={inputData.offer_start} onChange={handleChange} />
//                                         </div>

//                                         <div className="col-md-3 mt-3">
//                                             <Label>Offer End</Label>
//                                             <Input type="datetime-local" name="offer_end" value={inputData.offer_end} onChange={handleChange} />
//                                         </div>
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     )}

//                     {/* FILE UPLOAD */}
//                     <div className="card p-3 mb-3">
//                         <h5>Uploads</h5>

//                         <div className="row">
//                             <div className="col-md-6">
//                                 <Label>Thumbnail</Label>
//                                 <Input type="file" name="thumbnail" accept="image/*" onChange={handleFileChange} />
//                             </div>

//                             <div className="col-md-6">
//                                 <Label>Preview Video</Label>
//                                 <Input type="file" name="preview_video" accept="video/*" onChange={handleFileChange} />
//                             </div>
//                         </div>
//                     </div>

//                     {/* META */}
//                     <div className="card p-3 mb-3">
//                         <h5>Meta Information (JSON)</h5>
//                         <textarea
//                             className="form-control"
//                             name="meta"
//                             value={inputData.meta}
//                             onChange={handleChange}
//                             rows="4"
//                             placeholder='{"duration": "10 Hours", "level": "Beginner"}'
//                         ></textarea>
//                     </div>

//                     <div className="text-end">
//                         <Button color="primary" onClick={handleSubmit}>Submit Course</Button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default AddCourse;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Stack, InputGroup, Alert, Badge } from 'react-bootstrap';
import {
    FiFileText, FiUpload, FiDollarSign, FiInbox, FiArrowLeft, FiPlus, FiTrash2, FiVideo, FiFile, FiHelpCircle, FiEdit3, FiChevronDown, FiLayers, FiCheckCircle
} from 'react-icons/fi';
import { useCommonContext } from "../../helper/CommonProvider";
import { useAuthContext } from '../../helper/AuthProvider';
// Simple unique ID generator
const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2);


const AddCourse = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    console.log(user, "user")
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [expandedModule, setExpandedModule] = useState(null);
    const { getCategoryList, category, getSubCategoryList, subcategory, addCourse } = useCommonContext();
    const [inputData, setInputData] = useState({
        title: "",
        slug: "",
        category_id: "",
        subcategory_id: "",
        difficulty: "beginner",
        language: "english",
        description: "",
        thumbnail: "",
        preview_video: "",
        price: "",
        sale_price: "",
        offer_price: "",
        offer_start: "",
        offer_end: "",
        mark_as_offer: false,
        is_subscription_allowed: false,
        subscription_period: "",
        status: "draft",
        created_by: user?.name || "",
    });

    useEffect(() => {
        getCategoryList();
    }, []);
    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setInputData({ ...inputData, category_id: categoryId, subcategory_id: "" });
        getSubCategoryList(categoryId);
    };
    const [modules, setModules] = useState([
        {
            id: uid(),
            title: "",
            lessons: []
        }
    ]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInputData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setInputData(prev => ({ ...prev, [name]: files[0] }));
        }
    };

    // Module & Lesson Handlers
    const addModule = () => {
        const newId = uid();
        setModules(prev => [...prev, { id: newId, title: "", lessons: [] }]);
        setExpandedModule(newId);
    };

    const removeModule = (moduleId) => {
        setModules(prev => prev.filter(m => m.id !== moduleId));
    };

    const updateModuleTitle = (moduleId, title) => {
        setModules(prev => prev.map(m => m.id === moduleId ? { ...m, title } : m));
    };

    const addLesson = (moduleId) => {
        setModules(prev => prev.map(m => {
            if (m.id === moduleId) {
                return {
                    ...m,
                    lessons: [...m.lessons, {
                        id: uid(),
                        title: "",
                        content: "",
                    }]
                };
            }
            return m;
        }));
    };

    const removeLesson = (moduleId, lessonId) => {
        setModules(prev => prev.map(m => {
            if (m.id === moduleId) {
                return { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) };
            }
            return m;
        }));
    };

    const updateLesson = (moduleId, lessonId, field, value) => {
        setModules(prev => prev.map(m => {
            if (m.id === moduleId) {
                return {
                    ...m,
                    lessons: m.lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l)
                };
            }
            return m;
        }));
    };

    const validateStep = (step) => {
        const newErrors = {};
        if (step === 1) {
            if (!inputData.title.trim()) newErrors.title = "Title is required";
            if (!inputData.category_id) newErrors.category_id = "Category is required";
            if (!inputData.subcategory_id) newErrors.subcategory_id = "Subcategory is required";
        }
        if (step === 2) {
            if (inputData.is_subscription_allowed) {
                if (!inputData.price) newErrors.price = "Price is required";
                if (!inputData.subscription_period) newErrors.subscription_period = "Subscription period is required";
                if (inputData.mark_as_offer) {
                    if (!inputData.offer_price) newErrors.offer_price = "Offer price is required";
                    if (!inputData.offer_start) newErrors.offer_start = "Start date is required";
                    if (!inputData.offer_end) newErrors.offer_end = "End date is required";
                }
            }
        }
        if (step === 3) {
            if (modules.length === 0) newErrors.modules = "At least one module is required";
            modules.forEach((mod) => {
                if (!mod.title.trim()) newErrors[`module_${mod.id}`] = "Module title is required";
                if (mod.lessons.length === 0) newErrors[`module_lessons_${mod.id}`] = "At least one lesson is required";
            });
        }
        if (step === 4) {
            if (!inputData.created_by) newErrors.created_by = "Created by is required";
            if (inputData.is_subscription_allowed && !inputData.subscription_period) {
                newErrors.subscription_period = "Subscription period is required";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    // const handleFinish = async () => {
    //     if (validateStep(4)) {
    //         const formattedData = {
    //             course: {
    //                 category_id: parseInt(inputData.category_id),
    //                 subcategory_id: parseInt(inputData.subcategory_id),
    //                 title: inputData.title,
    //                 description: inputData.description,
    //                 price: parseFloat(inputData.price),
    //                 sale_price: parseFloat(inputData.sale_price) || null,
    //                 level: inputData.difficulty.charAt(0).toUpperCase() + inputData.difficulty.slice(1),
    //                 language: inputData.language.charAt(0).toUpperCase() + inputData.language.slice(1),
    //                 status: inputData.status,
    //                 is_subscription_allowed: inputData.is_subscription_allowed,
    //                 subscription_period: inputData.is_subscription_allowed ? parseInt(inputData.subscription_period) : null,
    //                 mark_as_offer: inputData.mark_as_offer,
    //                 offer_price: inputData.mark_as_offer ? parseFloat(inputData.offer_price) : null,
    //                 offer_start: inputData.mark_as_offer ? inputData.offer_start : null,
    //                 offer_end: inputData.mark_as_offer ? inputData.offer_end : null,
    //                 thumbnail: inputData.thumbnail,
    //                 preview_video: inputData.preview_video,
    //             },
    //             modules: modules.map((mod, mIdx) => ({
    //                 title: mod.title,
    //                 sort_order: mIdx + 1,
    //                 lessons: mod.lessons.map((lesson, lIdx) => ({
    //                     title: lesson.title,
    //                     content: lesson.content,
    //                     sort_order: lIdx + 1
    //                 }))
    //             }))
    //         };


    //         console.log("Formed JSON Data:", JSON.stringify(formattedData, null, 2));
    //         const res = await addCourse(formattedData);
    //         if (res?.status) navigate("/course-list");
    //     }
    // };

    const handleFinish = async () => {
        if (!validateStep(4)) return;

        const formData = new FormData();

        // ---- COURSE DATA ----
        formData.append("course[category_id]", parseInt(inputData.category_id));
        formData.append("course[subcategory_id]", parseInt(inputData.subcategory_id));
        formData.append("course[title]", inputData.title);
        formData.append("course[description]", inputData.description);
        formData.append("course[price]", parseFloat(inputData.price));
        formData.append("course[sale_price]", inputData.sale_price || "");
        formData.append(
            "course[level]",
            inputData.difficulty.charAt(0).toUpperCase() + inputData.difficulty.slice(1)
        );
        formData.append(
            "course[language]",
            inputData.language.charAt(0).toUpperCase() + inputData.language.slice(1)
        );
        formData.append("course[status]", inputData.status);
        formData.append("course[is_subscription_allowed]", inputData.is_subscription_allowed);

        if (inputData.is_subscription_allowed) {
            formData.append("course[subscription_period]", inputData.subscription_period);
        }

        if (inputData.mark_as_offer) {
            formData.append("course[mark_as_offer]", 1);
            formData.append("course[offer_price]", inputData.offer_price);
            formData.append("course[offer_start]", inputData.offer_start);
            formData.append("course[offer_end]", inputData.offer_end);
        }

        // ---- FILES (IMPORTANT) ----
        if (inputData.thumbnail instanceof File) {
            formData.append("thumbnail", inputData.thumbnail);
        }

        if (inputData.preview_video instanceof File) {
            formData.append("preview_video", inputData.preview_video);
        }

        // ---- MODULES ----
        formData.append("modules", JSON.stringify(
            modules.map((mod, mIdx) => ({
                title: mod.title,
                sort_order: mIdx + 1,
                lessons: mod.lessons.map((lesson, lIdx) => ({
                    title: lesson.title,
                    content: lesson.content,
                    sort_order: lIdx + 1
                }))
            }))
        ));

        const res = await addCourse(formData);

        if (res?.status) navigate("/course-list");
    };


    return (
        <div className="text-white pb-5 pt-3 min-vh-100 bg-dark">
            <div className="d-flex align-items-center mb-4 gap-3">
                <Button
                    variant="dark"
                    className="rounded-circle p-2 mt-1 border-0 shadow-sm"
                    onClick={() => navigate('/course-list')}
                    style={{ backgroundColor: '#1E1E1E' }}
                >
                    <FiArrowLeft size={18} />
                </Button>
                <h2 className="fw-bold mb-0 mt-1 text-white">Add New Course</h2>
            </div>

            <Card className="bg-dark border-secondary border-opacity-25 shadow-lg overflow-hidden" style={{ backgroundColor: '#1E1E1E !important' }}>
                <Card.Header className="bg-black bg-opacity-25 p-4 border-secondary border-opacity-25">
                    {/* Stepper */}
                    <div className="d-flex justify-content-between px-5 position-relative">
                        {[1, 2, 3, 4].map(step => (
                            <div key={step} className="text-center position-relative" style={{ zIndex: 1, width: '100px' }}>
                                <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${currentStep >= step ? 'bg-warning text-black fw-bold shadow-warning' : 'bg-black text-secondary border border-secondary shadow-sm'}`} style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                                    {step === 1 ? <FiFileText /> : step === 2 ? <FiDollarSign /> : step === 3 ? <FiLayers /> : <FiInbox />}
                                </div>
                                <span className={`small ${currentStep >= step ? 'text-white' : 'text-secondary'}`} style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    {step === 1 ? 'Overview' : step === 2 ? 'Pricing' : step === 3 ? 'Curriculum' : 'Publish'}
                                </span>
                            </div>
                        ))}
                        <div className="position-absolute top-50 start-0 w-100 border-top border-secondary border-opacity-25" style={{ transform: 'translateY(-18px)', zIndex: 0 }}></div>
                    </div>
                </Card.Header>

                <Card.Body className="p-4 p-md-5">
                    <Form className="mx-auto" style={{ maxWidth: '900px' }}>

                        {/* STEP 1: OVERVIEW */}
                        {currentStep === 1 && (
                            <Row className="g-4">
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">COURSE TITLE</Form.Label>
                                        <Form.Control name="title" value={inputData.title} onChange={handleInputChange} isInvalid={!!errors.title} className="bg-black border-secondary text-white py-2 shadow-none" placeholder="e.g., Advanced JavaScript Patterns" />
                                        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">CATEGORY</Form.Label>
                                        <Form.Select name="category_id" value={inputData.category_id} onChange={handleCategoryChange} isInvalid={!!errors.category_id} className="bg-black border-secondary text-white py-2 shadow-none">
                                            <option value="">Select Category</option>
                                            {category?.data?.categories?.map((c) => (
                                                <option key={c.id} value={c.id}>{c.title}</option>
                                            ))}
                                            {/* <option value="1">Development</option>
                                            <option value="2">Business</option> */}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.category_id}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">SUB-CATEGORY</Form.Label>
                                        <Form.Select name="subcategory_id" value={inputData.subcategory_id} onChange={handleInputChange} isInvalid={!!errors.subcategory_id} className="bg-black border-secondary text-white py-2 shadow-none">
                                            <option value="">Select Sub-category</option>
                                            {subcategory?.data?.map((sc) => (
                                                <option key={sc.id} value={sc.id}>{sc.title}</option>
                                            ))}
                                            {/* <option value="1">Web Development</option>
                                            <option value="2">Mobile Apps</option> */}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.subcategory_id}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">DIFFICULTY</Form.Label>
                                        <Form.Select name="difficulty" value={inputData.difficulty} onChange={handleInputChange} className="bg-black border-secondary text-white py-2 shadow-none">
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">LANGUAGE</Form.Label>
                                        <Form.Select name="language" value={inputData.language} onChange={handleInputChange} className="bg-black border-secondary text-white py-2 shadow-none">
                                            <option value="english">English</option>
                                            <option value="hindi">Hindi</option>
                                            <option value="bilingual">Bilingual</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">DESCRIPTION</Form.Label>
                                        <Form.Control as="textarea" rows={4} name="description" value={inputData.description} onChange={handleInputChange} className="bg-black border-secondary text-white py-2 shadow-none" placeholder="Provide a detailed course overview..." />
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}

                        {/* STEP 2: PRICING & MEDIA */}
                        {currentStep === 2 && (
                            <Row className="g-4">
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">COURSE THUMBNAIL</Form.Label>
                                        <div className="p-4 text-center border-2 border-dashed border-secondary border-opacity-25 rounded bg-black bg-opacity-25">
                                            <input type="file" id="thumbnail" name="thumbnail" className="d-none" onChange={handleFileChange} accept="image/*" />
                                            <label htmlFor="thumbnail" className="cursor-pointer mb-0">
                                                <FiUpload size={30} className="text-secondary mb-2" />
                                                <div className="small text-white fw-bold">{inputData.thumbnail ? inputData.thumbnail.name : "Select Image"}</div>
                                            </label>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    {/* <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">PREVIEW VIDEO URL</Form.Label>
                                        <Form.Control name="preview_video" value={inputData.preview_video} onChange={handleInputChange} className="bg-black border-secondary text-white py-2 shadow-none" placeholder="YouTube or Vimeo link" />
                                    </Form.Group> */}
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">COURSE PREVIEW VIDEO</Form.Label>
                                        <div className="p-4 text-center border-2 border-dashed border-secondary border-opacity-25 rounded bg-black bg-opacity-25">
                                            <input type="file" id="preview_video" name="preview_video" className="d-none" onChange={handleFileChange} accept="video/*" />
                                            <label htmlFor="preview_video" className="cursor-pointer mb-0">
                                                <FiUpload size={30} className="text-secondary mb-2" />
                                                <div className="small text-white fw-bold">{inputData.preview_video ? inputData.preview_video.name : "Select Video"}</div>
                                            </label>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <div className="bg-black bg-opacity-25 p-4 rounded border border-secondary border-opacity-10">
                                        <h6 className="text-warning fw-bold mb-4">PURCHASE OPTIONS</h6>
                                        <Form.Check
                                            type="switch"
                                            label="Enable Subscription Access"
                                            name="is_subscription_allowed"
                                            checked={inputData.is_subscription_allowed}
                                            onChange={handleInputChange}
                                            className="mb-4 text-white"
                                        />

                                        {inputData.is_subscription_allowed ? (
                                            <div className="animate-fade-in mt-4">
                                                <Row className="g-4">
                                                    <Col md={12} className="mb-2">
                                                        <Form.Label className="small text-secondary fw-bold">SUBSCRIPTION PERIOD (DAYS)</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            name="subscription_period"
                                                            value={inputData.subscription_period}
                                                            onChange={handleInputChange}
                                                            isInvalid={!!errors.subscription_period}
                                                            className="bg-black border-secondary text-white shadow-none w-50"
                                                            placeholder="e.g. 365"
                                                        />
                                                        <Form.Control.Feedback type="invalid">{errors.subscription_period}</Form.Control.Feedback>
                                                    </Col>

                                                    <Col md={6}>
                                                        <Form.Label className="small text-secondary fw-bold">REGULAR PRICE</Form.Label>
                                                        <InputGroup>
                                                            <InputGroup.Text className="bg-dark border-secondary text-secondary">₹</InputGroup.Text>
                                                            <Form.Control type="number" name="price" value={inputData.price} onChange={handleInputChange} isInvalid={!!errors.price} className="bg-black border-secondary text-white" />
                                                        </InputGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label className="small text-secondary fw-bold">SALE PRICE</Form.Label>
                                                        <InputGroup>
                                                            <InputGroup.Text className="bg-dark border-secondary text-secondary">₹</InputGroup.Text>
                                                            <Form.Control type="number" name="sale_price" value={inputData.sale_price} onChange={handleInputChange} className="bg-black border-secondary text-white" />
                                                        </InputGroup>
                                                    </Col>
                                                    <Col md={12}>
                                                        <Form.Check type="switch" label="Mark as Offer" name="mark_as_offer" checked={inputData.mark_as_offer} onChange={handleInputChange} className="text-white" />
                                                    </Col>
                                                    {inputData.mark_as_offer && (
                                                        <>
                                                            <Col md={4}>
                                                                <Form.Label className="small text-secondary fw-bold">OFFER PRICE</Form.Label>
                                                                <Form.Control type="number" name="offer_price" value={inputData.offer_price} onChange={handleInputChange} isInvalid={!!errors.offer_price} className="bg-black border-secondary text-white shadow-none" />
                                                            </Col>
                                                            <Col md={4}>
                                                                <Form.Label className="small text-secondary fw-bold">OFFER START</Form.Label>
                                                                <Form.Control type="date" name="offer_start" value={inputData.offer_start} onChange={handleInputChange} isInvalid={!!errors.offer_start} className="bg-black border-secondary text-white shadow-none" />
                                                            </Col>
                                                            <Col md={4}>
                                                                <Form.Label className="small text-secondary fw-bold">OFFER END</Form.Label>
                                                                <Form.Control type="date" name="offer_end" value={inputData.offer_end} onChange={handleInputChange} isInvalid={!!errors.offer_end} className="bg-black border-secondary text-white shadow-none" />
                                                            </Col>
                                                        </>
                                                    )}
                                                </Row>
                                            </div>
                                        ) : (
                                            <div className="bg-black bg-opacity-50 p-3 rounded border border-warning border-opacity-25 mt-3">
                                                <span className="text-warning small fst-italic">Subscription access is disabled. This course will be listed as FREE.</span>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        )}

                        {/* STEP 3: CURRICULUM BUILDER */}
                        {currentStep === 3 && (
                            <div className="curriculum-builder">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="mb-0 fw-bold">Course Curriculum</h5>
                                    <Button variant="warning" size="sm" className="fw-bold d-flex align-items-center gap-2" onClick={addModule}>
                                        <FiPlus /> Add Module
                                    </Button>
                                </div>
                                {errors.modules && <Alert variant="danger" className="py-2 small">{errors.modules}</Alert>}

                                <div className="curriculum-list">
                                    {modules.map((mod, mIdx) => (
                                        <div key={mod.id} className="module-item bg-transparent border border-secondary border-opacity-25 mb-4 rounded overflow-hidden">
                                            {/* MODULE HEADER */}
                                            <div
                                                className={`p-3 d-flex justify-content-between align-items-center cursor-pointer transition-all ${expandedModule === mod.id ? 'bg-black bg-opacity-50 border-bottom border-secondary border-opacity-10' : 'bg-dark'}`}
                                                onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                                            >
                                                <div className="d-flex align-items-center gap-3 flex-grow-1">
                                                    <div className="bg-warning bg-opacity-10 p-2 rounded text-warning d-flex align-items-center">
                                                        <FiLayers size={16} />
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <Form.Control
                                                            size="sm"
                                                            placeholder="Module Title (e.g. Introduction)"
                                                            value={mod.title}
                                                            onChange={(e) => { e.stopPropagation(); updateModuleTitle(mod.id, e.target.value); }}
                                                            onClick={(e) => e.stopPropagation()}
                                                            isInvalid={!!errors[`module_${mod.id}`]}
                                                            className="bg-black border-secondary text-white border-0 border-bottom rounded-0 py-1"
                                                            style={{ width: '100%', fontSize: '15px' }}
                                                        />
                                                        {errors[`module_${mod.id}`] && <div className="text-danger small mt-1" style={{ fontSize: '10px' }}>{errors[`module_${mod.id}`]}</div>}
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center gap-3 ms-3">
                                                    <div
                                                        className="text-danger cursor-pointer p-1 hover-scale transition-all"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeModule(mod.id);
                                                        }}
                                                    >
                                                        <FiTrash2 size={18} />
                                                    </div>
                                                    <div className={`text-secondary transition-all ${expandedModule === mod.id ? 'rotate-180' : ''}`}>
                                                        <FiChevronDown size={20} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* LESSONS LIST (Manual Collapse) */}
                                            {expandedModule === mod.id && (
                                                <div className="module-body bg-black bg-opacity-25 p-4 animate-fade-in">
                                                    {errors[`module_lessons_${mod.id}`] &&
                                                        <div className="text-danger small mb-3">{errors[`module_lessons_${mod.id}`]}</div>}

                                                    <div className="lessons-list">
                                                        {mod.lessons.map((lesson, lIdx) => (
                                                            <div key={lesson.id} className="lesson-item bg-dark bg-opacity-75 p-3 rounded border border-secondary border-opacity-25 mb-3 shadow-sm">
                                                                <div className="d-flex justify-content-between align-items-start mb-3 border-bottom border-secondary border-opacity-10 pb-2">
                                                                    <div className="d-flex align-items-center gap-2">
                                                                        <div className="rounded-circle bg-warning bg-opacity-10 p-2 text-warning">
                                                                            {lesson.lesson_type === 'video' ? <FiVideo /> : lesson.lesson_type === 'pdf' ? <FiFile /> : <FiFileText />}
                                                                        </div>
                                                                        <span className="small fw-bold text-white-50">LESSON {lIdx + 1}</span>
                                                                    </div>
                                                                    <Button variant="link" className="text-danger p-0" onClick={() => removeLesson(mod.id, lesson.id)}>
                                                                        <FiTrash2 size={16} />
                                                                    </Button>
                                                                </div>
                                                                <Col md={12}>
                                                                    <Form.Label className="small text-secondary fw-bold">TITLE</Form.Label>
                                                                    <Form.Control
                                                                        size="sm"
                                                                        placeholder="Lesson name"
                                                                        value={lesson.title}
                                                                        onChange={(e) => updateLesson(mod.id, lesson.id, 'title', e.target.value)}
                                                                        className="bg-black border-secondary text-white shadow-none"
                                                                    />
                                                                </Col>

                                                                <Col md={12}>
                                                                    <Form.Label className="small text-secondary fw-bold">CONTENT BODY</Form.Label>
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        rows={2}
                                                                        placeholder="Enter lesson content or description..."
                                                                        value={lesson.content}
                                                                        onChange={(e) => updateLesson(mod.id, lesson.id, 'content', e.target.value)}
                                                                        className="bg-black border-secondary text-white shadow-none"
                                                                    />
                                                                </Col>
                                                            </div>
                                                        ))}
                                                        <Button
                                                            variant="outline-warning"
                                                            size="sm"
                                                            className="w-100 border-dashed py-3 d-flex align-items-center justify-content-center gap-2 mt-2 transition-all hover-warning"
                                                            onClick={() => addLesson(mod.id)}
                                                        >
                                                            <FiPlus /> <span className="fw-bold">Add New Lesson to Module</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 4: SETTINGS & PUBLISH */}
                        {currentStep === 4 && (
                            <Row className="g-4">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">COURSE STATUS</Form.Label>
                                        <Form.Select name="status" value={inputData.status} onChange={handleInputChange} className="bg-black border-secondary text-white py-2 shadow-none">
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                            <option value="archived">Archived</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">CREATED BY (USER ID)</Form.Label>
                                        <Form.Control name="created_by" value={inputData.created_by} onChange={handleInputChange} isInvalid={!!errors.created_by} disabled className="bg-black border-secondary text-white py-2 shadow-none" placeholder="Enter creator ID" />
                                        <Form.Control.Feedback type="invalid">{errors.created_by}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={12} className="text-center mt-5">
                                    <div className="p-5 border border-secondary border-opacity-10 rounded">
                                        <FiCheckCircle size={50} className="text-success mb-3" />
                                        <h4 className="fw-bold">Ready to Launch?</h4>
                                        <p className="text-secondary small">Your course data is validated and ready for the platform.</p>
                                    </div>
                                </Col>
                            </Row>
                        )}

                        {/* NAVIGATION */}
                        <div className="d-flex justify-content-between mt-5 pt-4 border-top border-secondary border-opacity-25">
                            <Button
                                variant="outline-secondary"
                                className="text-white border-secondary px-4 shadow-none"
                                disabled={currentStep === 1}
                                onClick={() => setCurrentStep(prev => prev - 1)}
                            >
                                Previous
                            </Button>
                            {currentStep < 4 ? (
                                <Button variant="primary" className="px-4 fw-bold shadow-none" onClick={handleNext}>
                                    Next Step
                                </Button>
                            ) : (
                                <Button variant="success" className="px-4 fw-bold border-0 shadow-none" onClick={handleFinish}>
                                    Create Course
                                </Button>
                            )}
                        </div>
                    </Form>
                </Card.Body>
            </Card >

            <style>{`
                .cursor-pointer { cursor: pointer; }
                .border-dashed { border-style: dashed !important; border-width: 1px !important; }
                .shadow-warning { box-shadow: 0 0 15px rgba(252, 202, 12, 0.2); }
                .custom-accordion .accordion-button { background-color: #000 !important; color: white !important; box-shadow: none !important; }
                .custom-accordion .accordion-button:after { filter: invert(1); }
                .custom-accordion .accordion-button:not(.collapsed) { color: #ffc107 !important; border-bottom: 1px solid rgba(255,255,255,0.1); }
                .custom-accordion .accordion-item { border: 1px solid rgba(255,255,255,0.1) !important; background: transparent !important; }
                .lesson-item { transition: transform 0.2s; }
                .lesson-item:hover { transform: translateX(5px); }
                .hover-warning { transition: all 0.3s ease; }
                .hover-warning:hover { 
                    background-color: rgba(255, 193, 7, 0.1) !important; 
                    border-color: #ffc107 !important; 
                    color: #ffc107 !important;
                }
                .transition-all { transition: all 0.3s ease; }
                .rotate-180 { transform: rotate(180deg); }
                .hover-scale:hover { transform: scale(1.1); }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div >
    );
};

export default AddCourse;
