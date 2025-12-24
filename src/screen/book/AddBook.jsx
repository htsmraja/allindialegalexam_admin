import React, { useEffect, useState } from "react";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useCommonContext } from "../../helper/CommonProvider";

const AddBook = () => {
    const navigate = useNavigate();
    const { getCategoryList, category, getSubCategoryList, subcategory, addBook } = useCommonContext();

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

    useEffect(() => {
        getCategoryList();
    }, []);

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setInputData({ ...inputData, category_id: value, subcategory_id: "" });

        if (value) getSubCategoryList(value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let finalValue = value;

        if (value === "true") finalValue = true;
        if (value === "false") finalValue = false;

        setInputData((prev) => ({ ...prev, [name]: finalValue }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (!files || files.length === 0) return;
        setInputData((prev) => ({ ...prev, [name]: files[0] }));
    };

    const handleHighlightChange = (value) => {
        setHighlights((prev) =>
            prev.includes(value)
                ? prev.filter((i) => i !== value)
                : [...prev, value]
        );
    };

    // ⬇⬇ FINAL SUBMIT FIXED ⬇⬇
    const handleSubmit = async () => {

        const formData = new FormData();

        // Append all basic inputs
        Object.entries(inputData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Append highlights array
        highlights.forEach((h) => {
            formData.append("highlights[]", h);
        });

        await addBook(formData);


    };

    return (
        <>
            <CommonBreadcrumb title="Add Book" />

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
                        <h4>Add New Book</h4>
                        <Button color="secondary" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </div>

                    {/* BASIC INFO */}
                    <div className="card p-3 mb-3">
                        <h5>Basic Information</h5>
                        <div className="row mt-3">

                            <div className="col-md-3">
                                <FormGroup>
                                    <Label>Title</Label>
                                    <Input type="text" name="title" value={inputData.title} onChange={handleInputChange} required />
                                </FormGroup>
                            </div>

                            <div className="col-md-3">
                                <FormGroup>
                                    <Label>Author Name</Label>
                                    <Input type="text" name="author_name" value={inputData.author_name} onChange={handleInputChange} />
                                </FormGroup>
                            </div>

                            <div className="col-md-3">
                                <FormGroup>
                                    <Label>Category</Label>
                                    <Input type="select" name="category_id" value={inputData.category_id} onChange={handleCategoryChange}>
                                        <option value="">Select Category</option>
                                        {category?.data?.categories?.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </div>

                            {inputData.category_id && subcategory?.data?.length > 0 && (
                                <div className="col-md-3">
                                    <FormGroup>
                                        <Label>Subcategory</Label>
                                        <Input type="select" name="subcategory_id" value={inputData.subcategory_id} onChange={handleInputChange}>
                                            <option value="">Select Subcategory</option>
                                            {subcategory.data.map((sub) => (
                                                <option key={sub.id} value={sub.id}>{sub.title}</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </div>
                            )}

                            {/* FIXED STOCK INPUT */}
                            <div className="col-md-3">
                                <FormGroup>
                                    <Label>Stock</Label>
                                    <Input
                                        type="number"
                                        name="stock"
                                        value={inputData.stock}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Type</Label>
                                    <Input type="select" name="type" value={inputData.type} onChange={handleInputChange}>
                                        <option value="">Select Type</option>
                                        <option value="book">Book</option>
                                        <option value="note">Note</option>
                                    </Input>
                                </FormGroup>
                            </div>

                            <div className="col-md-9">
                                <FormGroup>
                                    <Label>Description</Label>
                                    <textarea className="form-control" name="description" value={inputData.description} onChange={handleInputChange} rows="5" />
                                </FormGroup>
                            </div>
                        </div>
                    </div>

                    {/* FILE UPLOADS */}
                    <div className="card p-3 mb-3">
                        <h5>Upload Files</h5>

                        <div className="row mt-3">
                            <div className="col-md-4">
                                <Label>Cover Image</Label>
                                <Input type="file" name="cover_image" onChange={handleFileChange} accept="image/*" />
                            </div>

                            <div className="col-md-4">
                                <Label>Sample PDF</Label>
                                <Input type="file" name="sample_pdf" onChange={handleFileChange} accept="application/pdf" />
                            </div>

                            <div className="col-md-4">
                                <Label>Softcopy File (PDF)</Label>
                                <Input type="file" name="softcopy_file" onChange={handleFileChange} accept="application/pdf" />
                            </div>
                        </div>
                    </div>

                    {/* HIGHLIGHTS */}
                    <div className="card p-3 mb-3">
                        <h5>Highlights</h5>
                        <div className="row mt-2">
                            {highlightOptions.map((item) => (
                                <div className="col-md-3" key={item.value}>
                                    <FormGroup check>
                                        <Input
                                            type="checkbox"
                                            checked={highlights.includes(item.value)}
                                            onChange={() => handleHighlightChange(item.value)}
                                        />
                                        <Label check>{item.label}</Label>
                                    </FormGroup>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FREE BOOK SECTION */}
                    <div className="card p-3 mb-3">
                        <h5>Free Book Options</h5>

                        <div className="row mt-2">
                            <div className="col-md-3">
                                <Label>Is Free?</Label>
                                <Input type="select" name="is_free" value={inputData.is_free} onChange={handleInputChange}>
                                    <option value="">Select</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Input>
                            </div>

                            {!inputData.is_free && (
                                <div className="col-md-3">
                                    <Label>Download Limit</Label>
                                    <Input type="number" name="download_limit" value={inputData.download_limit} onChange={handleInputChange} />
                                </div>
                            )}
                        </div>
                    </div>
                    {!inputData.is_free && (
                        <>

                            {/* HARD COPY SECTION */}
                            < div className="card p-3 mb-3">
                                <h5>Hardcopy Details</h5>

                                <div className="row">

                                    {/* Has Hardcopy */}
                                    <div className="col-md-3">
                                        <Label>Has Hardcopy?</Label>
                                        <Input type="select" name="has_hardcopy" value={inputData.has_hardcopy} onChange={handleInputChange}>
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </Input>
                                    </div>

                                    {inputData.has_hardcopy && (
                                        <>
                                            <div className="col-md-3">
                                                <Label>Hardcopy B2C Price</Label>
                                                <Input name="hardcopy_price_b2c" value={inputData.hardcopy_price_b2c} onChange={handleInputChange} />
                                            </div>

                                            <div className="col-md-3">
                                                <Label>Hardcopy Sale Price</Label>
                                                <Input name="hardcopy_sale_price_b2c" value={inputData.hardcopy_sale_price_b2c} onChange={handleInputChange} />
                                            </div>

                                            <div className="col-md-3">
                                                <Label>Hardcopy B2B Price</Label>
                                                <Input name="hardcopy_price_b2b" value={inputData.hardcopy_price_b2b} onChange={handleInputChange} />
                                            </div>

                                            <div className="col-md-3">
                                                <Label>Hardcopy B2B Min Purchase Qty</Label>
                                                <Input name="hardcopy_minimum_purchase_stock" value={inputData.hardcopy_minimum_purchase_stock} onChange={handleInputChange} />
                                            </div>

                                            {/* Mark as Sale */}
                                            <div className="col-md-3">
                                                <Label>Is Sale?</Label>
                                                <Input type="select" name="mark_hardcopy_sale" value={inputData.mark_hardcopy_sale} onChange={handleInputChange}>
                                                    <option value="false">No</option>
                                                    <option value="true">Yes</option>
                                                </Input>
                                            </div>

                                            {inputData.mark_hardcopy_sale && (
                                                <>
                                                    <div className="col-md-3">
                                                        <Label>Offer Price</Label>
                                                        <Input name="hardcopy_offer_price_b2c" value={inputData.hardcopy_offer_price_b2c} onChange={handleInputChange} />
                                                    </div>

                                                    <div className="col-md-3">
                                                        <Label>Offer Start</Label>
                                                        <Input type="datetime-local" name="hardcopy_offer_start" value={inputData.hardcopy_offer_start} onChange={handleInputChange} />
                                                    </div>

                                                    <div className="col-md-3">
                                                        <Label>Offer End</Label>
                                                        <Input type="datetime-local" name="hardcopy_offer_end" value={inputData.hardcopy_offer_end} onChange={handleInputChange} />
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* SOFTCOPY SECTION */}
                            <div className="card p-3 mb-4">
                                <h5>Softcopy Details</h5>

                                <div className="row">
                                    <div className="col-md-3">
                                        <Label>Has Softcopy?</Label>
                                        <Input type="select" name="has_softcopy" value={inputData.has_softcopy} onChange={handleInputChange}>
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </Input>
                                    </div>

                                    {inputData.has_softcopy && (
                                        <>
                                            <div className="col-md-3">
                                                <Label>Softcopy B2C Price</Label>
                                                <Input name="softcopy_price_b2c" value={inputData.softcopy_price_b2c} onChange={handleInputChange} />
                                            </div>

                                            <div className="col-md-3">
                                                <Label>Softcopy Sale Price</Label>
                                                <Input name="softcopy_sale_price_b2c" value={inputData.softcopy_sale_price_b2c} onChange={handleInputChange} />
                                            </div>

                                            {/* Mark as sale */}
                                            <div className="col-md-3">
                                                <Label>Is Sale?</Label>
                                                <Input type="select" name="mark_softcopy_sale" value={inputData.mark_softcopy_sale} onChange={handleInputChange}>
                                                    <option value="false">No</option>
                                                    <option value="true">Yes</option>
                                                </Input>
                                            </div>

                                            {inputData.mark_softcopy_sale && (
                                                <>
                                                    <div className="col-md-3">
                                                        <Label>Offer Price</Label>
                                                        <Input name="softcopy_offer_price_b2c" value={inputData.softcopy_offer_price_b2c} onChange={handleInputChange} />
                                                    </div>

                                                    <div className="col-md-3">
                                                        <Label>Offer Start</Label>
                                                        <Input type="datetime-local" name="softcopy_offer_start" value={inputData.softcopy_offer_start} onChange={handleInputChange} />
                                                    </div>

                                                    <div className="col-md-3">
                                                        <Label>Offer End</Label>
                                                        <Input type="datetime-local" name="softcopy_offer_end" value={inputData.softcopy_offer_end} onChange={handleInputChange} />
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    )}


                    {/* SUBMIT */}
                    <div className="text-end">
                        <Button color="primary" onClick={handleSubmit}>Submit Book</Button>
                    </div>
                </form >
            </div >
        </>
    );
};

export default AddBook;
