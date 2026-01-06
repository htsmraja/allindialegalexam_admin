
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Stack, InputGroup, Alert, ProgressBar } from 'react-bootstrap';
import {
    FiUser, FiMail, FiPhone, FiArrowLeft, FiCheck, FiUploadCloud, FiAward, FiDollarSign,
    FiBriefcase, FiCreditCard, FiCalendar, FiFileText, FiTrash2, FiPlus
} from 'react-icons/fi';
import { TbPasswordFingerprint } from "react-icons/tb";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useCommonContext } from "../../helper/CommonProvider";

const AddTeacher = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const { addTeacher, categoryList, getAllCategoryList } = useCommonContext();
    const [inputData, setInputData] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        bio: "",
        qualifications: "",
        experience_years: "",
        commission_type: "percent",
        commission_value: "",
        contract_expires_at: "",
        classes_per_week: "",
        category_id: "",
    });

    useEffect(() => { getAllCategoryList(); }, []);
    // State for Bank Accounts
    const [bankAccounts, setBankAccounts] = useState([
        { bank_name: '', bank_holder_name: '', bank_account_number: '', ifsc_code: '', upi_id: '' }
    ]);

    // State for Documents
    const [kycFiles, setKycFiles] = useState([]);
    const [degreeFiles, setDegreeFiles] = useState([]);

    const handleFinish = async () => {
        const formData = new FormData();

        Object.entries(inputData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        formData.append("bank_accounts", JSON.stringify(bankAccounts));

        kycFiles.forEach(file => formData.append("kyc_documents", file));
        degreeFiles.forEach(file => formData.append("degree_documents", file));
        console.log([...formData.entries()], "formdata");
        await addTeacher(formData);
        // navigate("/teachers-list");
    };


    const steps = [
        { title: 'Personal', icon: <FiUser /> },
        { title: 'Subject', icon: <FiAward /> },
        { title: 'Banking', icon: <FiCreditCard /> },
        { title: 'Documents', icon: <FiUploadCloud /> },
        { title: 'Salary', icon: <FiDollarSign /> },
    ];

    // File Upload Handlers
    const handleKycUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        setKycFiles(prev => [...prev, ...uploadedFiles]);
    };

    const handleDegreeUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        setDegreeFiles(prev => [...prev, ...uploadedFiles]);
    };

    const removeFile = (setFunction, index) => {
        setFunction(prev => prev.filter((_, i) => i !== index));
    };

    // Bank Account Handlers
    const handleBankChange = (index, field, value) => {
        const newAccounts = [...bankAccounts];
        newAccounts[index][field] = value;
        setBankAccounts(newAccounts);
    };

    const addBankAccount = () => {
        setBankAccounts([...bankAccounts, { bankName: '', holderName: '', accountNumber: '', ifsc: '', upi: '' }]);
    };

    const removeBankAccount = (index) => {
        if (bankAccounts.length > 1) {
            setBankAccounts(bankAccounts.filter((_, i) => i !== index));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };


    return (
        <div className="text-white pt-3">
            <div className="d-flex align-items-center mb-4 gap-3">
                <Button
                    variant="dark"
                    className="rounded-circle p-2 mt-1 border-0 shadow-sm"
                    onClick={() => navigate('/teachers-list')}
                    style={{ backgroundColor: '#1E1E1E', minWidth: '40px', height: '40px' }}
                >
                    <FiArrowLeft size={18} />
                </Button>
                <h2 className="text-white mb-0 mt-1">Onboard New Faculty</h2>
            </div>

            <Card className="bg-dark border-secondary border-opacity-25 shadow-lg overflow-hidden" style={{ backgroundColor: '#1E1E1E !important' }}>
                <Card.Header className="bg-black bg-opacity-25 p-4 border-secondary border-opacity-25">
                    {/* Stepper */}
                    <div className="d-flex justify-content-between px-5 position-relative">
                        {steps.map((s, i) => {
                            const stepNum = i + 1;
                            return (
                                <div key={i} className="text-center position-relative" style={{ zIndex: 1, width: '100px' }}>
                                    <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${currentStep >= stepNum ? 'bg-primary text-white fw-bold shadow-primary' : 'bg-black text-secondary border border-secondary shadow-sm'}`} style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                                        {s.icon}
                                    </div>
                                    <span className={`small ${currentStep >= stepNum ? 'text-white' : 'text-secondary'}`} style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        {s.title}
                                    </span>
                                </div>
                            );
                        })}
                        <div className="position-absolute top-50 start-0 w-100 border-top border-secondary border-opacity-10" style={{ transform: 'translateY(-18px)', zIndex: 0 }}></div>
                    </div>
                </Card.Header>
                <Card.Body className="p-4 p-md-5">
                    <Form className="mx-auto" style={{ maxWidth: '800px' }}>
                        {currentStep === 1 && (
                            <Row className="g-4">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">FULL NAME</Form.Label>
                                        <InputGroup className="bg-black border-secondary rounded overflow-hidden">
                                            <InputGroup.Text className="bg-transparent border-0 text-secondary"><FiUser /></InputGroup.Text>
                                            <Form.Control className="bg-transparent border-0 text-white shadow-none" placeholder="John Doe"
                                                name="full_name"
                                                value={inputData.full_name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">EMAIL ADDRESS</Form.Label>
                                        <InputGroup className="bg-black border-secondary rounded overflow-hidden">
                                            <InputGroup.Text className="bg-transparent border-0 text-secondary"><FiMail /></InputGroup.Text>
                                            <Form.Control type="email" className="bg-transparent border-0 text-white shadow-none" placeholder="john@example.com"
                                                name="email"
                                                value={inputData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">PHONE NUMBER</Form.Label>
                                        <InputGroup className="bg-black border-secondary rounded overflow-hidden">
                                            <InputGroup.Text className="bg-transparent border-0 text-secondary"><FiPhone /></InputGroup.Text>
                                            <Form.Control className="bg-transparent border-0 text-white shadow-none" placeholder="+91 98765 43210"
                                                name="phone"
                                                value={inputData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">PASSWORD</Form.Label>
                                        <InputGroup className="bg-black border-secondary rounded overflow-hidden">
                                            <InputGroup.Text className="bg-transparent border-0 text-secondary"><TbPasswordFingerprint /></InputGroup.Text>
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                className="bg-transparent border-0 text-white shadow-none"
                                                placeholder="Enter password"
                                                name="password"
                                                value={inputData.password}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <InputGroup.Text
                                                className="bg-transparent border-0 text-secondary"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <IoIosEyeOff /> : <IoMdEye />}
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">SHORT BIO</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            className="bg-black border-secondary text-white shadow-none"
                                            placeholder="Write a brief introduction about the teacher..."
                                            name="bio"
                                            value={inputData.bio}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}

                        {currentStep === 2 && (
                            <Row className="g-4">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">PRIMARY SUBJECT</Form.Label>
                                        <Form.Select className="bg-black border-secondary text-white py-2 shadow-none"
                                            name="category_id"
                                            value={inputData.category_id}
                                            onChange={handleInputChange}>
                                            <option>Select Subject</option>
                                            {
                                                categoryList.data && categoryList.data.map((category) => (
                                                    <option key={category.id} value={category.id}>{category.title}</option>
                                                ))
                                            }
                                            {/* <option>Constitutional Law</option>
                                            <option>Criminal Law</option>
                                            <option>Civil Law</option> */}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">EXPERIENCE (YEARS)</Form.Label>
                                        <InputGroup className="bg-black border-secondary rounded overflow-hidden">
                                            <InputGroup.Text className="bg-transparent border-0 text-secondary"><FiBriefcase /></InputGroup.Text>
                                            <Form.Control type="number" className="bg-transparent border-0 text-white shadow-none" placeholder="5"
                                                name="experience_years" value={inputData.experience_years} onChange={handleInputChange} required />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">QUALIFICATIONS</Form.Label>
                                        <InputGroup className="bg-black border-secondary rounded overflow-hidden">
                                            <InputGroup.Text className="bg-transparent border-0 text-secondary"><FiAward /></InputGroup.Text>
                                            <Form.Control className="bg-transparent border-0 text-white shadow-none" placeholder="e.g. LLM, PhD in Law"
                                                name="qualifications" value={inputData.qualifications} onChange={handleInputChange}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">CLASSES PER WEEK</Form.Label>
                                        <Form.Control type="number" className="bg-black border-secondary text-white shadow-none" placeholder="10"
                                            name="classes_per_week" value={inputData.classes_per_week} onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small text-secondary fw-bold">CONTRACT EXPIRY DATE</Form.Label>
                                        <InputGroup className="bg-black border-secondary rounded overflow-hidden">
                                            <InputGroup.Text className="bg-transparent border-0 text-secondary"><FiCalendar /></InputGroup.Text>
                                            <Form.Control type="date" className="bg-transparent border-0 text-white shadow-none"
                                                name="contract_expiry_date" value={inputData.contract_expiry_date} onChange={handleInputChange}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="text-white mb-0">Bank Accounts</h5>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        className="d-flex align-items-center gap-2"
                                        onClick={addBankAccount}
                                    >
                                        <FiPlus /> Add Another Bank
                                    </Button>
                                </div>

                                {bankAccounts.map((account, index) => (
                                    <div key={index} className="p-4 bg-black bg-opacity-25 rounded border border-secondary border-opacity-10 mb-4 position-relative">
                                        {bankAccounts.length > 1 && (
                                            <Button
                                                variant="link"
                                                className="text-danger position-absolute top-0 end-0 mt-2 me-2 p-0 shadow-none"
                                                onClick={() => removeBankAccount(index)}
                                            >
                                                <FiTrash2 size={18} />
                                            </Button>
                                        )}
                                        <h6 className="text-primary small fw-bold mb-4 uppercase">BANK ACCOUNT #{index + 1}</h6>
                                        <Row className="g-4">
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="small text-secondary fw-bold">BANK NAME</Form.Label>
                                                    <InputGroup className="bg-black border-secondary rounded overflow-hidden">
                                                        <InputGroup.Text className="bg-transparent border-0 text-secondary"><FiCreditCard /></InputGroup.Text>
                                                        <Form.Control
                                                            className="bg-transparent border-0 text-white shadow-none"
                                                            placeholder="HDFC Bank"
                                                            value={account.bank_name}
                                                            onChange={(e) => handleBankChange(index, 'bank_name', e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="small text-secondary fw-bold">ACCOUNT HOLDER NAME</Form.Label>
                                                    <Form.Control
                                                        className="bg-black border-secondary text-white shadow-none"
                                                        placeholder="John Doe"
                                                        value={account.bank_holder_name}
                                                        onChange={(e) => handleBankChange(index, 'bank_holder_name', e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="small text-secondary fw-bold">ACCOUNT NUMBER</Form.Label>
                                                    <Form.Control
                                                        className="bg-black border-secondary text-white shadow-none"
                                                        placeholder="50100XXXXXXXX"
                                                        value={account.bank_account_number}
                                                        onChange={(e) => handleBankChange(index, 'bank_account_number', e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="small text-secondary fw-bold">IFSC CODE</Form.Label>
                                                    <Form.Control
                                                        className="bg-black border-secondary text-white shadow-none"
                                                        placeholder="HDFC0001234"
                                                        value={account.ifsc_code}
                                                        onChange={(e) => handleBankChange(index, 'ifsc_code', e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group>
                                                    <Form.Label className="small text-secondary fw-bold">UPI ID (Optional)</Form.Label>
                                                    <InputGroup className="bg-black border-secondary rounded overflow-hidden">
                                                        <InputGroup.Text className="bg-transparent border-0 text-secondary"><FiDollarSign /></InputGroup.Text>
                                                        <Form.Control
                                                            className="bg-transparent border-0 text-white shadow-none"
                                                            placeholder="username@upi"
                                                            value={account.upi_id}
                                                            onChange={(e) => handleBankChange(index, 'upi_id', e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <Alert variant="info" className="bg-primary bg-opacity-10 border-primary border-opacity-25 text-info py-2 px-3 small d-flex align-items-center gap-2 mb-4">
                                    <FiCheck size={14} /> Please upload documents in PDF or Image format (Max 5MB each)
                                </Alert>

                                {/* KYC Upload */}
                                <div className="mb-5">
                                    <Form.Label className="small text-secondary fw-bold mb-3 uppercase tracking-wider">KYC DOCUMENTS (ID Proof / Aadhar / PAN)</Form.Label>
                                    <div className="text-center py-4 border-2 border-dashed border-secondary bg-black bg-opacity-25 rounded transition-hover clickable-area position-relative mb-3">
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleKycUpload}
                                            className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <FiUploadCloud size={32} className="text-secondary mb-2 opacity-50" />
                                        <h6 className="text-white small fw-bold mb-1">Click to upload multiple KYC documents</h6>
                                    </div>
                                    {kycFiles.length > 0 && (
                                        <div className="bg-black bg-opacity-50 rounded p-2">
                                            <Stack gap={1}>
                                                {kycFiles.map((file, index) => (
                                                    <div key={index} className="d-flex align-items-center justify-content-between bg-dark p-2 rounded border border-secondary border-opacity-10">
                                                        <div className="d-flex align-items-center gap-2 overflow-hidden">
                                                            <FiFileText className="text-info flex-shrink-0" />
                                                            <span className="small text-white text-truncate" style={{ fontSize: '11px' }}>{file.name}</span>
                                                        </div>
                                                        <Button
                                                            variant="link"
                                                            className="text-danger p-0 shadow-none border-0 ms-2"
                                                            onClick={() => removeFile(setKycFiles, index)}
                                                        >
                                                            <FiTrash2 size={14} />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </Stack>
                                        </div>
                                    )}
                                </div>

                                {/* Degree Upload */}
                                <div>
                                    <Form.Label className="small text-secondary fw-bold mb-3 uppercase tracking-wider">DEGREE CERTIFICATES</Form.Label>
                                    <div className="text-center py-4 border-2 border-dashed border-secondary bg-black bg-opacity-25 rounded transition-hover clickable-area position-relative mb-3">
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleDegreeUpload}
                                            className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <FiAward size={32} className="text-secondary mb-2 opacity-50" />
                                        <h6 className="text-white small fw-bold mb-1">Click to upload multiple degree certificates</h6>
                                    </div>
                                    {degreeFiles.length > 0 && (
                                        <div className="bg-black bg-opacity-50 rounded p-2">
                                            <Stack gap={1}>
                                                {degreeFiles.map((file, index) => (
                                                    <div key={index} className="d-flex align-items-center justify-content-between bg-dark p-2 rounded border border-secondary border-opacity-10">
                                                        <div className="d-flex align-items-center gap-2 overflow-hidden">
                                                            <FiFileText className="text-primary flex-shrink-0" />
                                                            <span className="small text-white text-truncate" style={{ fontSize: '11px' }}>{file.name}</span>
                                                        </div>
                                                        <Button
                                                            variant="link"
                                                            className="text-danger p-0 shadow-none border-0 ms-2"
                                                            onClick={() => removeFile(setDegreeFiles, index)}
                                                        >
                                                            <FiTrash2 size={14} />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </Stack>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div className="space-y-4">
                                <Form.Group className="mb-4">
                                    <Form.Label className="small text-secondary fw-bold mb-3">SALARY STRUCTURE</Form.Label>
                                    {/* <div className="d-flex gap-4">
                                        <Form.Check
                                            type="radio"
                                            name="commission_type"
                                            label="Monthly Fixed"
                                            id="fixed"
                                            className="text-light small fw-medium"
                                            defaultChecked
                                            value={inputData.commission_type}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            name="commission_type"
                                            label="Monthly Fixed"
                                            id="fixed"
                                            className="text-light small fw-medium"
                                            defaultChecked
                                            value={inputData.commission_type}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            name="salaryType"
                                            label="Percentage Split"
                                            id="commission"
                                            className="text-light small fw-medium"
                                        />
                                    </div> */}
                                    <div className="d-flex gap-4">
                                        <Form.Check
                                            type="radio"
                                            name="commission_type"
                                            label="Per Class"
                                            id="per_class"
                                            className="text-light small fw-medium"
                                            value="per_class"
                                            checked={inputData.commission_type === "per_class"}
                                            onChange={handleInputChange}

                                        />

                                        <Form.Check
                                            type="radio"
                                            name="commission_type"
                                            label="Monthly Fixed"
                                            id="monthly"
                                            className="text-light small fw-medium"
                                            value="monthly"
                                            checked={inputData.commission_type === "monthly"}
                                            onChange={handleInputChange}
                                        />

                                        <Form.Check
                                            type="radio"
                                            name="commission_type"
                                            label="Percentage Split"
                                            id="percent"
                                            className="text-light small fw-medium"
                                            value="percent"
                                            checked={inputData.commission_type === "percent"}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label className="small text-secondary fw-bold">AMOUNT / PERCENTAGE</Form.Label>
                                    <InputGroup className="bg-black border-secondary rounded overflow-hidden">
                                        <InputGroup.Text className="bg-transparent border-0 text-secondary">
                                            {inputData.commission_type === "percent" ? "%" : "₹"}
                                        </InputGroup.Text>
                                        <Form.Control className="bg-transparent border-0 text-white shadow-none font-monospace"
                                            placeholder={inputData.commission_type === "percent" ? "10" : "50,000"}
                                            name="commission_value"
                                            value={inputData.commission_value}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <div className="p-4 bg-success bg-opacity-10 border border-success border-opacity-20 rounded shadow-sm">
                                    <div className="text-secondary small uppercase tracking-tighter mb-1" style={{ fontSize: '10px' }}>ESTIMATED MONTHLY PAYOUT</div>
                                    <div className="h4 mb-0 text-success fw-bold">₹85,000</div>
                                </div>
                            </div>
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
                            {currentStep < 5 ? (
                                <Button variant="primary" className="px-4 fw-bold shadow-none" onClick={() => setCurrentStep(prev => prev + 1)}>
                                    Next Step
                                </Button>
                            ) : (
                                <Button variant="warning" className="px-4 fw-bold text-black border-0 shadow-none" onClick={handleFinish}>
                                    Submit Application
                                </Button>
                            )}
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <style>{`
                .shadow-primary { box-shadow: 0 0 15px rgba(13, 110, 253, 0.2); }
                .clickable-area:hover { border-color: #0d6efd !important; background-color: rgba(13, 110, 253, 0.05) !important; cursor: pointer; }
                .custom-switch .form-check-input:checked { background-color: #fcca0c; border-color: #fcca0c; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
                input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                    cursor: pointer;
                }
                .space-y-6 > * + * { margin-top: 1.5rem; }
            `}</style>
        </div>
    );
};

export default AddTeacher;
