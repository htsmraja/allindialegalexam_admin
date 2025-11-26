import { useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useCommonContext } from "../../helper/CommonProvider";

const AddTeacher = () => {
    const { addTeacher } = useCommonContext();
    const [inputData, setInputData] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        bio: "",
        qualifications: "",
        experience_years: 0,

        // Bank Fields
        bank_account_number: "",
        bank_name: "",
        bank_holder_name: "",
        ifsc_code: "",

        upi_id: "",
        commission_type: "percent",
        commission_value: 0,
        contract_expires_at: "",
    });

    const [files, setFiles] = useState({
        kyc_document: null,
        degree_document: null,
    });

    // ---------------------------
    // HANDLE TEXT INPUTS
    // ---------------------------
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    // ---------------------------
    // HANDLE FILE INPUTS
    // ---------------------------
    const handleFileChange = (e) => {
        const { name } = e.target;
        setFiles({ ...files, [name]: e.target.files[0] });
    };

    // ---------------------------
    // SUBMIT FORM
    // ---------------------------
    const submitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // append all text fields
        Object.keys(inputData).forEach((key) => {
            formData.append(key, inputData[key]);
        });

        // append documents
        formData.append("kyc_document", files.kyc_document);
        formData.append("degree_document", files.degree_document);

        console.log("Form Submitted", Object.fromEntries(formData));
        register(formData)
        // Example
        // await axios.post("/api/teacher/signup", formData, {
        //     headers: { "Content-Type": "multipart/form-data" }
        // });
    };

    return (
        <div className="product-form-container p-3">
            <form
                onSubmit={submitForm}
                style={{
                    backgroundColor: "#f5f5f5",
                    padding: "20px",
                    borderRadius: "10px",
                }}
            >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>Register As A Teacher</h4>
                </div>

                <div className="card p-3 mb-3">
                    <h5>Basic Information</h5>

                    <div className="row mt-3">

                        {/* Full Name */}
                        <div className="col-md-4">
                            <FormGroup>
                                <Label>Full Name *</Label>
                                <Input
                                    type="text"
                                    name="full_name"
                                    value={inputData.full_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>
                        </div>

                        {/* Email */}
                        <div className="col-md-4">
                            <FormGroup>
                                <Label>Email *</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={inputData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>
                        </div>

                        {/* Phone */}
                        <div className="col-md-4">
                            <FormGroup>
                                <Label>Phone</Label>
                                <Input
                                    type="text"
                                    name="phone"
                                    value={inputData.phone}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </div>

                        {/* Password */}
                        <div className="col-md-4">
                            <FormGroup>
                                <Label>Password *</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={inputData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>
                        </div>

                        {/* Qualifications */}
                        <div className="col-md-8">
                            <FormGroup>
                                <Label>Qualifications</Label>
                                <Input
                                    type="text"
                                    name="qualifications"
                                    value={inputData.qualifications}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </div>

                        {/* Experience */}
                        <div className="col-md-4">
                            <FormGroup>
                                <Label>Experience (Years)</Label>
                                <Input
                                    type="number"
                                    name="experience_years"
                                    value={inputData.experience_years}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </div>

                        {/* Bio */}
                        <div className="col-md-8">
                            <FormGroup>
                                <Label>Bio</Label>
                                <textarea
                                    className="form-control"
                                    name="bio"
                                    rows="4"
                                    value={inputData.bio}
                                    onChange={handleInputChange}
                                ></textarea>
                            </FormGroup>
                        </div>

                        {/* ---------------------- */}
                        {/* BANK DETAILS          */}
                        {/* ---------------------- */}

                        <div className="col-md-3">
                            <FormGroup>
                                <Label>Bank Account Number</Label>
                                <Input
                                    type="text"
                                    name="bank_account_number"
                                    value={inputData.bank_account_number}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </div>

                        <div className="col-md-3">
                            <FormGroup>
                                <Label>Bank Holder Name</Label>
                                <Input
                                    type="text"
                                    name="bank_holder_name"
                                    value={inputData.bank_holder_name}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </div>

                        <div className="col-md-3">
                            <FormGroup>
                                <Label>Bank Name</Label>
                                <Input
                                    type="text"
                                    name="bank_name"
                                    value={inputData.bank_name}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </div>

                        <div className="col-md-3">
                            <FormGroup>
                                <Label>IFSC Code</Label>
                                <Input
                                    type="text"
                                    name="ifsc_code"
                                    value={inputData.ifsc_code}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </div>

                        {/* UPI */}
                        <div className="col-md-4">
                            <FormGroup>
                                <Label>UPI ID</Label>
                                <Input
                                    type="text"
                                    name="upi_id"
                                    value={inputData.upi_id}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </div>

                        {/* Commission Type */}
                        <div className="col-md-4">
                            <FormGroup>
                                <Label>Commission Type</Label>
                                <Input
                                    type="select"
                                    name="commission_type"
                                    value={inputData.commission_type}
                                    onChange={handleInputChange}
                                >
                                    <option value="per_class">Per Class</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="percent">Percent</option>
                                </Input>
                            </FormGroup>
                        </div>

                        {/* Commission Value */}
                        <div className="col-md-4">
                            <FormGroup>
                                <Label>Commission Value</Label>
                                <Input
                                    type="number"
                                    name="commission_value"
                                    value={inputData.commission_value}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </div>

                        {/* Contract Expiry */}
                        <div className="col-md-4">
                            <FormGroup>
                                <Label>Contract Expiry Date</Label>
                                <Input
                                    type="date"
                                    name="contract_expires_at"
                                    value={inputData.contract_expires_at}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </div>

                        {/* KYC Document */}
                        <div className="col-md-6">
                            <FormGroup>
                                <Label>KYC Document (Required)</Label>
                                <Input
                                    type="file"
                                    name="kyc_document"
                                    onChange={handleFileChange}
                                    required
                                />
                            </FormGroup>
                        </div>

                        {/* Degree Document */}
                        <div className="col-md-6">
                            <FormGroup>
                                <Label>Degree Document (Required)</Label>
                                <Input
                                    type="file"
                                    name="degree_document"
                                    onChange={handleFileChange}
                                    required
                                />
                            </FormGroup>
                        </div>

                    </div>
                </div>

                <Button color="primary" type="submit">Register</Button>
            </form>
        </div>
    );
};

export default AddTeacher;
