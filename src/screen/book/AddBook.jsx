// import React, { useEffect, useState } from "react";
// import CommonBreadcrumb from "../../component/common/bread-crumb";
// import { useNavigate } from "react-router-dom";
// import { Button, FormGroup, Input, Label } from "reactstrap";
// import { useCommonContext } from "../../helper/CommonProvider";

// const AddBook = () => {
//     const navigate = useNavigate();
//     const { getCategoryList, category, getSubCategoryList, subcategory, addBook } = useCommonContext();

//     const [inputData, setInputData] = useState({
//         title: "",
//         description: "",
//         category_id: "",
//         subcategory_id: "",
//         author_name: "",
//         type: "",
//         stock: "",   // FIXED
//         has_hardcopy: false,
//         mark_hardcopy_sale: false,
//         hardcopy_price_b2c: "",
//         hardcopy_sale_price_b2c: "",
//         hardcopy_offer_price_b2c: "",
//         hardcopy_offer_start: "",
//         hardcopy_offer_end: "",
//         hardcopy_price_b2b: "",
//         hardcopy_minimum_purchase_stock: "",

//         has_softcopy: false,
//         mark_softcopy_sale: false,
//         softcopy_price_b2c: "",
//         softcopy_sale_price_b2c: "",
//         softcopy_offer_price_b2c: "",
//         softcopy_offer_start: "",
//         softcopy_offer_end: "",
//         softcopy_price_b2b: "",
//         b2b_stock: "",

//         is_free: false,
//         download_limit: "",
//         created_by: "",
//         cover_image: null,
//         sample_pdf: null,
//         softcopy_file: null,
//     });

//     const highlightOptions = [
//         { value: "most_popular", label: "Most Popular" },
//         { value: "new_arrival", label: "New Arrival" },
//         { value: "best_seller", label: "Best Seller" },
//         { value: "featured", label: "Featured" },
//     ];

//     const [highlights, setHighlights] = useState([]);

//     useEffect(() => {
//         getCategoryList();
//     }, []);

//     const handleCategoryChange = (e) => {
//         const value = e.target.value;
//         setInputData({ ...inputData, category_id: value, subcategory_id: "" });

//         if (value) getSubCategoryList(value);
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;

//         let finalValue = value;

//         if (value === "true") finalValue = true;
//         if (value === "false") finalValue = false;

//         setInputData((prev) => ({ ...prev, [name]: finalValue }));
//     };

//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         if (!files || files.length === 0) return;
//         setInputData((prev) => ({ ...prev, [name]: files[0] }));
//     };

//     const handleHighlightChange = (value) => {
//         setHighlights((prev) =>
//             prev.includes(value)
//                 ? prev.filter((i) => i !== value)
//                 : [...prev, value]
//         );
//     };

//     // ⬇⬇ FINAL SUBMIT FIXED ⬇⬇
//     const handleSubmit = async () => {

//         const formData = new FormData();

//         // Append all basic inputs
//         Object.entries(inputData).forEach(([key, value]) => {
//             formData.append(key, value);
//         });

//         // Append highlights array
//         highlights.forEach((h) => {
//             formData.append("highlights[]", h);
//         });

//         await addBook(formData);


//     };

//     return (
//         <>
//             <CommonBreadcrumb title="Add Book" />

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
//                         <h4>Add New Book</h4>
//                         <Button color="secondary" onClick={() => navigate(-1)}>
//                             Back
//                         </Button>
//                     </div>

//                     {/* BASIC INFO */}
//                     <div className="card p-3 mb-3">
//                         <h5>Basic Information</h5>
//                         <div className="row mt-3">

//                             <div className="col-md-3">
//                                 <FormGroup>
//                                     <Label>Title</Label>
//                                     <Input type="text" name="title" value={inputData.title} onChange={handleInputChange} required />
//                                 </FormGroup>
//                             </div>

//                             <div className="col-md-3">
//                                 <FormGroup>
//                                     <Label>Author Name</Label>
//                                     <Input type="text" name="author_name" value={inputData.author_name} onChange={handleInputChange} />
//                                 </FormGroup>
//                             </div>

//                             <div className="col-md-3">
//                                 <FormGroup>
//                                     <Label>Category</Label>
//                                     <Input type="select" name="category_id" value={inputData.category_id} onChange={handleCategoryChange}>
//                                         <option value="">Select Category</option>
//                                         {category?.data?.categories?.map((cat) => (
//                                             <option key={cat.id} value={cat.id}>{cat.title}</option>
//                                         ))}
//                                     </Input>
//                                 </FormGroup>
//                             </div>

//                             {inputData.category_id && subcategory?.data?.length > 0 && (
//                                 <div className="col-md-3">
//                                     <FormGroup>
//                                         <Label>Subcategory</Label>
//                                         <Input type="select" name="subcategory_id" value={inputData.subcategory_id} onChange={handleInputChange}>
//                                             <option value="">Select Subcategory</option>
//                                             {subcategory.data.map((sub) => (
//                                                 <option key={sub.id} value={sub.id}>{sub.title}</option>
//                                             ))}
//                                         </Input>
//                                     </FormGroup>
//                                 </div>
//                             )}

//                             {/* FIXED STOCK INPUT */}
//                             <div className="col-md-3">
//                                 <FormGroup>
//                                     <Label>Stock</Label>
//                                     <Input
//                                         type="number"
//                                         name="stock"
//                                         value={inputData.stock}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </FormGroup>

//                                 <FormGroup>
//                                     <Label>Type</Label>
//                                     <Input type="select" name="type" value={inputData.type} onChange={handleInputChange}>
//                                         <option value="">Select Type</option>
//                                         <option value="book">Book</option>
//                                         <option value="note">Note</option>
//                                     </Input>
//                                 </FormGroup>
//                             </div>

//                             <div className="col-md-9">
//                                 <FormGroup>
//                                     <Label>Description</Label>
//                                     <textarea className="form-control" name="description" value={inputData.description} onChange={handleInputChange} rows="5" />
//                                 </FormGroup>
//                             </div>
//                         </div>
//                     </div>

//                     {/* FILE UPLOADS */}
//                     <div className="card p-3 mb-3">
//                         <h5>Upload Files</h5>

//                         <div className="row mt-3">
//                             <div className="col-md-4">
//                                 <Label>Cover Image</Label>
//                                 <Input type="file" name="cover_image" onChange={handleFileChange} accept="image/*" />
//                             </div>

//                             <div className="col-md-4">
//                                 <Label>Sample PDF</Label>
//                                 <Input type="file" name="sample_pdf" onChange={handleFileChange} accept="application/pdf" />
//                             </div>

//                             <div className="col-md-4">
//                                 <Label>Softcopy File (PDF)</Label>
//                                 <Input type="file" name="softcopy_file" onChange={handleFileChange} accept="application/pdf" />
//                             </div>
//                         </div>
//                     </div>

//                     {/* HIGHLIGHTS */}
//                     <div className="card p-3 mb-3">
//                         <h5>Highlights</h5>
//                         <div className="row mt-2">
//                             {highlightOptions.map((item) => (
//                                 <div className="col-md-3" key={item.value}>
//                                     <FormGroup check>
//                                         <Input
//                                             type="checkbox"
//                                             checked={highlights.includes(item.value)}
//                                             onChange={() => handleHighlightChange(item.value)}
//                                         />
//                                         <Label check>{item.label}</Label>
//                                     </FormGroup>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* FREE BOOK SECTION */}
//                     <div className="card p-3 mb-3">
//                         <h5>Free Book Options</h5>

//                         <div className="row mt-2">
//                             <div className="col-md-3">
//                                 <Label>Is Free?</Label>
//                                 <Input type="select" name="is_free" value={inputData.is_free} onChange={handleInputChange}>
//                                     <option value="">Select</option>
//                                     <option value="true">Yes</option>
//                                     <option value="false">No</option>
//                                 </Input>
//                             </div>

//                             {!inputData.is_free && (
//                                 <div className="col-md-3">
//                                     <Label>Download Limit</Label>
//                                     <Input type="number" name="download_limit" value={inputData.download_limit} onChange={handleInputChange} />
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                     {!inputData.is_free && (
//                         <>

//                             {/* HARD COPY SECTION */}
//                             < div className="card p-3 mb-3">
//                                 <h5>Hardcopy Details</h5>

//                                 <div className="row">

//                                     {/* Has Hardcopy */}
//                                     <div className="col-md-3">
//                                         <Label>Has Hardcopy?</Label>
//                                         <Input type="select" name="has_hardcopy" value={inputData.has_hardcopy} onChange={handleInputChange}>
//                                             <option value="false">No</option>
//                                             <option value="true">Yes</option>
//                                         </Input>
//                                     </div>

//                                     {inputData.has_hardcopy && (
//                                         <>
//                                             <div className="col-md-3">
//                                                 <Label>Hardcopy B2C Price</Label>
//                                                 <Input name="hardcopy_price_b2c" value={inputData.hardcopy_price_b2c} onChange={handleInputChange} />
//                                             </div>

//                                             <div className="col-md-3">
//                                                 <Label>Hardcopy Sale Price</Label>
//                                                 <Input name="hardcopy_sale_price_b2c" value={inputData.hardcopy_sale_price_b2c} onChange={handleInputChange} />
//                                             </div>

//                                             <div className="col-md-3">
//                                                 <Label>Hardcopy B2B Price</Label>
//                                                 <Input name="hardcopy_price_b2b" value={inputData.hardcopy_price_b2b} onChange={handleInputChange} />
//                                             </div>

//                                             <div className="col-md-3">
//                                                 <Label>Hardcopy B2B Min Purchase Qty</Label>
//                                                 <Input name="hardcopy_minimum_purchase_stock" value={inputData.hardcopy_minimum_purchase_stock} onChange={handleInputChange} />
//                                             </div>

//                                             {/* Mark as Sale */}
//                                             <div className="col-md-3">
//                                                 <Label>Is Sale?</Label>
//                                                 <Input type="select" name="mark_hardcopy_sale" value={inputData.mark_hardcopy_sale} onChange={handleInputChange}>
//                                                     <option value="false">No</option>
//                                                     <option value="true">Yes</option>
//                                                 </Input>
//                                             </div>

//                                             {inputData.mark_hardcopy_sale && (
//                                                 <>
//                                                     <div className="col-md-3">
//                                                         <Label>Offer Price</Label>
//                                                         <Input name="hardcopy_offer_price_b2c" value={inputData.hardcopy_offer_price_b2c} onChange={handleInputChange} />
//                                                     </div>

//                                                     <div className="col-md-3">
//                                                         <Label>Offer Start</Label>
//                                                         <Input type="datetime-local" name="hardcopy_offer_start" value={inputData.hardcopy_offer_start} onChange={handleInputChange} />
//                                                     </div>

//                                                     <div className="col-md-3">
//                                                         <Label>Offer End</Label>
//                                                         <Input type="datetime-local" name="hardcopy_offer_end" value={inputData.hardcopy_offer_end} onChange={handleInputChange} />
//                                                     </div>
//                                                 </>
//                                             )}
//                                         </>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* SOFTCOPY SECTION */}
//                             <div className="card p-3 mb-4">
//                                 <h5>Softcopy Details</h5>

//                                 <div className="row">
//                                     <div className="col-md-3">
//                                         <Label>Has Softcopy?</Label>
//                                         <Input type="select" name="has_softcopy" value={inputData.has_softcopy} onChange={handleInputChange}>
//                                             <option value="false">No</option>
//                                             <option value="true">Yes</option>
//                                         </Input>
//                                     </div>

//                                     {inputData.has_softcopy && (
//                                         <>
//                                             <div className="col-md-3">
//                                                 <Label>Softcopy B2C Price</Label>
//                                                 <Input name="softcopy_price_b2c" value={inputData.softcopy_price_b2c} onChange={handleInputChange} />
//                                             </div>

//                                             <div className="col-md-3">
//                                                 <Label>Softcopy Sale Price</Label>
//                                                 <Input name="softcopy_sale_price_b2c" value={inputData.softcopy_sale_price_b2c} onChange={handleInputChange} />
//                                             </div>

//                                             {/* Mark as sale */}
//                                             <div className="col-md-3">
//                                                 <Label>Is Sale?</Label>
//                                                 <Input type="select" name="mark_softcopy_sale" value={inputData.mark_softcopy_sale} onChange={handleInputChange}>
//                                                     <option value="false">No</option>
//                                                     <option value="true">Yes</option>
//                                                 </Input>
//                                             </div>

//                                             {inputData.mark_softcopy_sale && (
//                                                 <>
//                                                     <div className="col-md-3">
//                                                         <Label>Offer Price</Label>
//                                                         <Input name="softcopy_offer_price_b2c" value={inputData.softcopy_offer_price_b2c} onChange={handleInputChange} />
//                                                     </div>

//                                                     <div className="col-md-3">
//                                                         <Label>Offer Start</Label>
//                                                         <Input type="datetime-local" name="softcopy_offer_start" value={inputData.softcopy_offer_start} onChange={handleInputChange} />
//                                                     </div>

//                                                     <div className="col-md-3">
//                                                         <Label>Offer End</Label>
//                                                         <Input type="datetime-local" name="softcopy_offer_end" value={inputData.softcopy_offer_end} onChange={handleInputChange} />
//                                                     </div>
//                                                 </>
//                                             )}
//                                         </>
//                                     )}
//                                 </div>
//                             </div>
//                         </>
//                     )}


//                     {/* SUBMIT */}
//                     <div className="text-end">
//                         <Button color="primary" onClick={handleSubmit}>Submit Book</Button>
//                     </div>
//                 </form >
//             </div >
//         </>
//     );
// };

// export default AddBook;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Stack, InputGroup, Alert, Badge } from 'react-bootstrap';
import {
    FiFileText, FiUpload, FiDollarSign, FiInbox, FiArrowLeft, FiChevronRight, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';

const AddBook = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});

    const [inputData, setInputData] = useState({
        title: "",
        description: "",
        category_id: "",
        subcategory_id: "",
        author_name: "",
        type: "",
        stock: "",   // FIXED
        has_hardcopy: false,
        mark_hardcopy_sale: false,
        hardcopy_price_b2c: "",
        hardcopy_sale_price_b2c: "",
        hardcopy_offer_price_b2c: "",
        hardcopy_offer_start: "",
        hardcopy_offer_end: "",
        hardcopy_price_b2b: "",
        hardcopy_minimum_purchase_stock: "",

        has_softcopy: false,
        mark_softcopy_sale: false,
        softcopy_price_b2c: "",
        softcopy_sale_price_b2c: "",
        softcopy_offer_price_b2c: "",
        softcopy_offer_start: "",
        softcopy_offer_end: "",
        softcopy_price_b2b: "",
        b2b_stock: "",

        is_free: false,
        download_limit: "",
        created_by: "",
        cover_image: null,
        sample_pdf: null,
        softcopy_file: null,
    });

    const highlightOptions = [
        { value: "most_popular", label: "Most Popular" },
        { value: "new_arrival", label: "New Arrival" },
        { value: "best_seller", label: "Best Seller" },
        { value: "featured", label: "Featured" },
    ];

    const [highlights, setHighlights] = useState([]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        let newData = {
            ...inputData,
            [name]: type === 'checkbox' ? checked : value
        };

        // Logic: Mark as Free should automatically enable Enable Softcopy
        if (name === 'is_free' && checked) {
            newData.has_softcopy = true;
        }

        setInputData(newData);

        // Clear error when field is modified
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
            if (errors[name]) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[name];
                    return newErrors;
                });
            }
        }
    };

    const handleHighlightChange = (val) => {
        setHighlights(prev =>
            prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]
        );
        if (errors.highlights) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.highlights;
                return newErrors;
            });
        }
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!inputData.title.trim()) newErrors.title = "Title is required";
            if (!inputData.description.trim()) newErrors.description = "Description is required";
            if (!inputData.category_id) newErrors.category_id = "Category is required";
            if (!inputData.subcategory_id) newErrors.subcategory_id = "Subcategory is required";
            if (!inputData.author_name.trim()) newErrors.author_name = "Author name is required";
            if (!inputData.type) newErrors.type = "Type is required";
            if (highlights.length === 0) newErrors.highlights = "Select at least one highlight";
        }

        if (step === 3) {
            if (!inputData.cover_image) newErrors.cover_image = "Cover image is required";
            if (!inputData.sample_pdf) newErrors.sample_pdf = "Sample PDF is required";
            if (inputData.has_softcopy && !inputData.softcopy_file) newErrors.softcopy_file = "Softcopy file is required";
        }

        if (step === 2) {
            if (inputData.has_hardcopy) {
                if (!inputData.hardcopy_price_b2c) newErrors.hardcopy_price_b2c = "B2C price is required";
                if (!inputData.hardcopy_price_b2b) newErrors.hardcopy_price_b2b = "B2B price is required";
                if (!inputData.hardcopy_minimum_purchase_stock) newErrors.hardcopy_minimum_purchase_stock = "Min purchase stock is required";
                if (inputData.mark_hardcopy_sale) {
                    if (!inputData.hardcopy_sale_price_b2c) newErrors.hardcopy_sale_price_b2c = "Sale price is required";
                    if (!inputData.hardcopy_offer_price_b2c) newErrors.hardcopy_offer_price_b2c = "Offer price is required";
                    if (!inputData.hardcopy_offer_start) newErrors.hardcopy_offer_start = "Start date is required";
                    if (!inputData.hardcopy_offer_end) newErrors.hardcopy_offer_end = "End date is required";
                }
            }
            if (inputData.has_softcopy) {
                if (!inputData.softcopy_price_b2c) newErrors.softcopy_price_b2c = "B2C price is required";
                if (!inputData.softcopy_price_b2b) newErrors.softcopy_price_b2b = "B2B price is required";
                if (inputData.mark_softcopy_sale) {
                    if (!inputData.softcopy_sale_price_b2c) newErrors.softcopy_sale_price_b2c = "Sale price is required";
                    if (!inputData.softcopy_offer_price_b2c) newErrors.softcopy_offer_price_b2c = "Offer price is required";
                    if (!inputData.softcopy_offer_start) newErrors.softcopy_offer_start = "Start date is required";
                    if (!inputData.softcopy_offer_end) newErrors.softcopy_offer_end = "End date is required";
                }
            }
            if (!inputData.has_hardcopy && !inputData.has_softcopy && !inputData.is_free) {
                newErrors.pricing_type = "Please select at least one format (Hardcopy/Softcopy) or mark as free";
            }
        }

        if (step === 4) {
            if (inputData.has_hardcopy && !inputData.stock) newErrors.stock = "Stock is required";
            if (inputData.has_softcopy && !inputData.b2b_stock) newErrors.b2b_stock = "B2B stock is required";
            if (inputData.has_softcopy && !inputData.download_limit) newErrors.download_limit = "Download limit is required";
            if (!inputData.created_by.trim()) newErrors.created_by = "Created by is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleFinish = () => {
        if (validateStep(4)) {
            alert("Product Added Successfully");
            console.log("Input Data:", inputData);
            console.log("Highlights:", highlights);
            navigate('/books-notes');
        }
    };

    return (
        <div className="text-white pb-5 pt-2" >
            <div className="d-flex align-items-center mb-4 gap-3">
                <Button
                    variant="dark"
                    className="rounded-circle p-2 mt-1 border-0 shadow-sm"
                    onClick={() => navigate('/books-notes')}
                    style={{ backgroundColor: '#1E1E1E' }}
                >
                    <FiArrowLeft size={18} />
                </Button>
                <h3 className="fw-bold mb-0 mt-1 text-warning">Add New Book</h3>
            </div>

            <Card className="bg-dark border-secondary border-opacity-25 shadow-lg overflow-hidden" style={{ backgroundColor: '#1E1E1E !important' }}>
                <Card.Header className="bg-black bg-opacity-25 p-4 border-secondary border-opacity-25">
                    {/* Stepper */}
                    <div className="d-flex justify-content-between px-5 position-relative">
                        {[1, 2, 3, 4].map(step => (
                            <div key={step} className="text-center position-relative" style={{ zIndex: 1, width: '100px' }}>
                                <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${currentStep >= step ? 'bg-warning text-black fw-bold shadow-warning' : 'bg-black text-secondary border border-secondary shadow-sm'}`} style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                                    {step === 1 ? <FiFileText /> : step === 2 ? <FiDollarSign /> : step === 3 ? <FiUpload /> : <FiInbox />}
                                </div>
                                <span className={`small ${currentStep >= step ? 'text-white' : 'text-secondary'}`} style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    {step === 1 ? 'Basic Info' : step === 2 ? 'Pricing' : step === 3 ? 'Media' : 'Inventory'}
                                </span>
                            </div>
                        ))}
                        <div className="position-absolute top-50 start-0 w-100 border-top border-secondary border-opacity-25" style={{ transform: 'translateY(-18px)', zIndex: 0 }}></div>
                    </div>
                </Card.Header>
                <Card.Body className="p-4 p-md-5">
                    <Form className="mx-auto" style={{ maxWidth: '800px' }}>
                        {currentStep === 1 && (
                            <Row className="g-4">
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">BOOK TITLE</Form.Label>
                                        <Form.Control
                                            name="title"
                                            value={inputData.title}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.title}
                                            className="bg-black border-secondary text-white py-2 shadow-none"
                                            placeholder="e.g., CLAT Mastermind 2025"
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">DESCRIPTION</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="description"
                                            value={inputData.description}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.description}
                                            className="bg-black border-secondary text-white py-2 shadow-none"
                                            placeholder="Enter book description..."
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">CATEGORY</Form.Label>
                                        <Form.Select
                                            name="category_id"
                                            value={inputData.category_id}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.category_id}
                                            className="bg-black border-secondary text-white py-2 shadow-none"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="1">Law</option>
                                            <option value="2">Humanities</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.category_id}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">SUB-CATEGORY</Form.Label>
                                        <Form.Select
                                            name="subcategory_id"
                                            value={inputData.subcategory_id}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.subcategory_id}
                                            className="bg-black border-secondary text-white py-2 shadow-none"
                                        >
                                            <option value="">Select Sub-category</option>
                                            <option value="1">Constitutional Law</option>
                                            <option value="2">Criminal Law</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.subcategory_id}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">AUTHOR/PUBLISHER</Form.Label>
                                        <Form.Control
                                            name="author_name"
                                            value={inputData.author_name}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.author_name}
                                            className="bg-black border-secondary text-white py-2 shadow-none"
                                            placeholder="Enter author or publisher name"
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.author_name}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">BOOK TYPE</Form.Label>
                                        <Form.Select
                                            name="type"
                                            value={inputData.type}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.type}
                                            className="bg-black border-secondary text-white py-2 shadow-none"
                                        >
                                            <option value="">Select Type</option>
                                            <option value="textbook">Textbook</option>
                                            <option value="guide">Guide</option>
                                            <option value="reference">Reference</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold mb-3">HIGHLIGHTS (SELECT MULTIPLE)</Form.Label>
                                        <div className="d-flex flex-wrap gap-2">
                                            {highlightOptions.map(opt => (
                                                <Badge
                                                    key={opt.value}
                                                    bg={highlights.includes(opt.value) ? "warning" : "dark"}
                                                    text={highlights.includes(opt.value) ? "black" : "secondary"}
                                                    className={`p-2 px-3 border border-secondary border-opacity-25 cursor-pointer transition-all ${highlights.includes(opt.value) ? 'shadow-warning' : ''}`}
                                                    onClick={() => handleHighlightChange(opt.value)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {opt.label}
                                                </Badge>
                                            ))}
                                        </div>
                                        {errors.highlights && <div className="text-danger small mt-2">{errors.highlights}</div>}
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}



                        {currentStep === 2 && (
                            <Row className="g-4">
                                <Col md={12}>
                                    <div className="d-flex gap-4 mb-3 border-bottom border-secondary border-opacity-10 pb-3">
                                        <Form.Check
                                            type="switch"
                                            id="has_hardcopy"
                                            name="has_hardcopy"
                                            label="Enable Hardcopy"
                                            checked={inputData.has_hardcopy}
                                            onChange={handleInputChange}
                                            className="text-white"
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="has_softcopy"
                                            name="has_softcopy"
                                            label="Enable Softcopy"
                                            checked={inputData.has_softcopy}
                                            onChange={handleInputChange}
                                            className="text-white"
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="is_free"
                                            name="is_free"
                                            label="Mark as Free"
                                            checked={inputData.is_free}
                                            onChange={handleInputChange}
                                            className="text-white"
                                        />
                                    </div>
                                    {errors.pricing_type && <Alert variant="danger" className="py-2 small">{errors.pricing_type}</Alert>}
                                </Col>

                                {inputData.has_hardcopy && (
                                    <Col md={12} className="bg-black bg-opacity-10 p-4 rounded border border-secondary border-opacity-10 mb-4">
                                        <h6 className="text-warning fw-bold mb-3 small uppercase tracking-wider">HARDCOPY PRICING</h6>
                                        <Row className="g-3">
                                            <Col md={6}>
                                                <Form.Label className="small text-secondary">B2C PRICE</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text className="bg-dark border-secondary text-secondary">₹</InputGroup.Text>
                                                    <Form.Control
                                                        type="number"
                                                        name="hardcopy_price_b2c"
                                                        value={inputData.hardcopy_price_b2c}
                                                        onChange={handleInputChange}
                                                        isInvalid={!!errors.hardcopy_price_b2c}
                                                        className="bg-black border-secondary text-white"
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label className="small text-secondary">B2B PRICE</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text className="bg-dark border-secondary text-secondary">₹</InputGroup.Text>
                                                    <Form.Control
                                                        type="number"
                                                        name="hardcopy_price_b2b"
                                                        value={inputData.hardcopy_price_b2b}
                                                        onChange={handleInputChange}
                                                        isInvalid={!!errors.hardcopy_price_b2b}
                                                        className="bg-black border-secondary text-white"
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Mark Hardcopy on Sale"
                                                    name="mark_hardcopy_sale"
                                                    checked={inputData.mark_hardcopy_sale}
                                                    onChange={handleInputChange}
                                                    className="small text-secondary mb-2"
                                                />
                                            </Col>
                                            {inputData.mark_hardcopy_sale && (
                                                <>
                                                    <Col md={6}>
                                                        <Form.Label className="small text-secondary">SALE PRICE (B2C)</Form.Label>
                                                        <Form.Control type="number" name="hardcopy_sale_price_b2c" value={inputData.hardcopy_sale_price_b2c} onChange={handleInputChange} isInvalid={!!errors.hardcopy_sale_price_b2c} className="bg-black border-secondary text-white shadow-none" placeholder="0.00" />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label className="small text-secondary">OFFER PRICE (B2C)</Form.Label>
                                                        <Form.Control type="number" name="hardcopy_offer_price_b2c" value={inputData.hardcopy_offer_price_b2c} onChange={handleInputChange} isInvalid={!!errors.hardcopy_offer_price_b2c} className="bg-black border-secondary text-white shadow-none" placeholder="0.00" />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label className="small text-secondary">OFFER START DATE</Form.Label>
                                                        <Form.Control type="date" name="hardcopy_offer_start" value={inputData.hardcopy_offer_start} onChange={handleInputChange} isInvalid={!!errors.hardcopy_offer_start} className="bg-black border-secondary text-white shadow-none" />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label className="small text-secondary">OFFER END DATE</Form.Label>
                                                        <Form.Control type="date" name="hardcopy_offer_end" value={inputData.hardcopy_offer_end} onChange={handleInputChange} isInvalid={!!errors.hardcopy_offer_end} className="bg-black border-secondary text-white shadow-none" />
                                                    </Col>
                                                </>
                                            )}
                                            <Col md={12}>
                                                <Form.Label className="small text-secondary">MINIMUM PURCHASE STOCK (B2B)</Form.Label>
                                                <Form.Control type="number" name="hardcopy_minimum_purchase_stock" value={inputData.hardcopy_minimum_purchase_stock} onChange={handleInputChange} isInvalid={!!errors.hardcopy_minimum_purchase_stock} className="bg-black border-secondary text-white" />
                                            </Col>
                                        </Row>
                                    </Col>
                                )}

                                {inputData.has_softcopy && (
                                    <Col md={12} className="bg-black bg-opacity-10 p-4 rounded border border-secondary border-opacity-10">
                                        <h6 className="text-info fw-bold mb-3 small uppercase tracking-wider">SOFTCOPY PRICING</h6>
                                        <Row className="g-3">
                                            <Col md={6}>
                                                <Form.Label className="small text-secondary">B2C PRICE</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text className="bg-dark border-secondary text-secondary">₹</InputGroup.Text>
                                                    <Form.Control
                                                        type="number"
                                                        name="softcopy_price_b2c"
                                                        value={inputData.softcopy_price_b2c}
                                                        onChange={handleInputChange}
                                                        isInvalid={!!errors.softcopy_price_b2c}
                                                        className="bg-black border-secondary text-white"
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label className="small text-secondary">B2B PRICE</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text className="bg-dark border-secondary text-secondary">₹</InputGroup.Text>
                                                    <Form.Control
                                                        type="number"
                                                        name="softcopy_price_b2b"
                                                        value={inputData.softcopy_price_b2b}
                                                        onChange={handleInputChange}
                                                        isInvalid={!!errors.softcopy_price_b2b}
                                                        className="bg-black border-secondary text-white"
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Mark Softcopy on Sale"
                                                    name="mark_softcopy_sale"
                                                    checked={inputData.mark_softcopy_sale}
                                                    onChange={handleInputChange}
                                                    className="small text-secondary mb-2"
                                                />
                                            </Col>
                                            {inputData.mark_softcopy_sale && (
                                                <>
                                                    <Col md={6}>
                                                        <Form.Label className="small text-secondary">SALE PRICE (B2C)</Form.Label>
                                                        <Form.Control type="number" name="softcopy_sale_price_b2c" value={inputData.softcopy_sale_price_b2c} onChange={handleInputChange} isInvalid={!!errors.softcopy_sale_price_b2c} className="bg-black border-secondary text-white shadow-none" placeholder="0.00" />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label className="small text-secondary">OFFER PRICE (B2C)</Form.Label>
                                                        <Form.Control type="number" name="softcopy_offer_price_b2c" value={inputData.softcopy_offer_price_b2c} onChange={handleInputChange} isInvalid={!!errors.softcopy_offer_price_b2c} className="bg-black border-secondary text-white shadow-none" placeholder="0.00" />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label className="small text-secondary">OFFER START DATE</Form.Label>
                                                        <Form.Control type="date" name="softcopy_offer_start" value={inputData.softcopy_offer_start} onChange={handleInputChange} isInvalid={!!errors.softcopy_offer_start} className="bg-black border-secondary text-white shadow-none" />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label className="small text-secondary">OFFER END DATE</Form.Label>
                                                        <Form.Control type="date" name="softcopy_offer_end" value={inputData.softcopy_offer_end} onChange={handleInputChange} isInvalid={!!errors.softcopy_offer_end} className="bg-black border-secondary text-white shadow-none" />
                                                    </Col>
                                                </>
                                            )}
                                        </Row>
                                    </Col>
                                )}
                            </Row>
                        )}
                        {currentStep === 3 && (
                            <Row className="g-4">
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">COVER IMAGE</Form.Label>
                                        <div className={`p-4 text-center border-2 border-dashed rounded bg-black bg-opacity-25 ${errors.cover_image ? 'border-danger' : 'border-secondary'}`}>
                                            <input
                                                type="file"
                                                className="d-none"
                                                id="cover_image"
                                                name="cover_image"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                            <label htmlFor="cover_image" className="cursor-pointer mb-0">
                                                <FiUpload size={30} className="text-secondary mb-2" />
                                                <div className="small text-white fw-bold">{inputData.cover_image ? inputData.cover_image.name : "Select Cover Image"}</div>
                                                <div className="text-secondary" style={{ fontSize: '10px' }}>JPG, PNG (Max 5MB)</div>
                                            </label>
                                        </div>
                                        {errors.cover_image && <div className="text-danger small mt-1">{errors.cover_image}</div>}
                                    </Form.Group>
                                </Col>

                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">SAMPLE PDF</Form.Label>
                                        <div className={`p-4 text-center border-2 border-dashed rounded bg-black bg-opacity-25 ${errors.sample_pdf ? 'border-danger' : 'border-secondary'}`}>
                                            <input
                                                type="file"
                                                className="d-none"
                                                id="sample_pdf"
                                                name="sample_pdf"
                                                accept=".pdf"
                                                onChange={handleFileChange}
                                            />
                                            <label htmlFor="sample_pdf" className="cursor-pointer mb-0">
                                                <FiFileText size={30} className="text-secondary mb-2" />
                                                <div className="small text-white fw-bold">{inputData.sample_pdf ? inputData.sample_pdf.name : "Select Sample PDF"}</div>
                                                <div className="text-secondary" style={{ fontSize: '10px' }}>PDF only (Max 10MB)</div>
                                            </label>
                                        </div>
                                        {errors.sample_pdf && <div className="text-danger small mt-1">{errors.sample_pdf}</div>}
                                    </Form.Group>
                                </Col>
                                {
                                    inputData.has_softcopy && (
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label className="small text-secondary fw-bold">FULL SOFTCOPY FILE (PDF)</Form.Label>
                                                <div className={`p-4 text-center border-2 border-dashed rounded bg-black bg-opacity-25 ${errors.softcopy_file ? 'border-danger' : 'border-secondary'}`}>
                                                    <input
                                                        type="file"
                                                        className="d-none"
                                                        id="softcopy_file"
                                                        name="softcopy_file"
                                                        accept=".pdf"
                                                        onChange={handleFileChange}
                                                    />
                                                    <label htmlFor="softcopy_file" className="cursor-pointer mb-0">
                                                        <FiInbox size={30} className="text-secondary mb-2" />
                                                        <div className="small text-white fw-bold">{inputData.softcopy_file ? inputData.softcopy_file.name : "Select Full Softcopy"}</div>
                                                        <div className="text-secondary" style={{ fontSize: '10px' }}>PDF only</div>
                                                    </label>
                                                </div>
                                                {errors.softcopy_file && <div className="text-danger small mt-1">{errors.softcopy_file}</div>}
                                            </Form.Group>
                                        </Col>
                                    )
                                }


                            </Row>
                        )}
                        {currentStep === 4 && (
                            <Row className="g-4">
                                {inputData.has_hardcopy && (
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label className="small text-secondary fw-bold">PHYSICAL STOCK (HARDCOPY)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="stock"
                                                value={inputData.stock}
                                                onChange={handleInputChange}
                                                isInvalid={!!errors.stock}
                                                className="bg-black border-secondary text-white shadow-none"
                                                placeholder="0"
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                )}
                                {inputData.has_softcopy && (
                                    <>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="small text-secondary fw-bold">B2B STOCK (SOFTCOPY)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="b2b_stock"
                                                    value={inputData.b2b_stock}
                                                    onChange={handleInputChange}
                                                    isInvalid={!!errors.b2b_stock}
                                                    className="bg-black border-secondary text-white shadow-none"
                                                    placeholder="0"
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.b2b_stock}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="small text-secondary fw-bold">DOWNLOAD LIMIT</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="download_limit"
                                                    value={inputData.download_limit}
                                                    onChange={handleInputChange}
                                                    isInvalid={!!errors.download_limit}
                                                    className="bg-black border-secondary text-white shadow-none"
                                                    placeholder="5"
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.download_limit}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </>
                                )}
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">CREATED BY</Form.Label>
                                        <Form.Control
                                            name="created_by"
                                            value={inputData.created_by}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.created_by}
                                            className="bg-black border-secondary text-white shadow-none"
                                            placeholder="Admin / Faculty Name"
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.created_by}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}

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
                                <Button variant="warning" className="px-4 fw-bold shadow-none" onClick={handleNext}>
                                    Next Step
                                </Button>
                            ) : (
                                <Button variant="warning" className="px-4 fw-bold border-0 shadow-none" onClick={handleFinish}>
                                    Publish Product
                                </Button>
                            )}
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <style>{`
                .shadow-warning { box-shadow: 0 0 15px rgba(252, 202, 12, 0.2); }
                .shadow-inner { box-shadow: inset 0 0 10px rgba(0,0,0,0.5); }
                .cursor-pointer { cursor: pointer; }
                .transition-all { transition: all 0.2s ease-in-out; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default AddBook;
