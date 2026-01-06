// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";
// import {
//     Col,
//     Form,
//     Row,
//     FormGroup,
//     Input,
//     Label,
//     Container,
//     Card,
//     CardBody,
//     Button,
//     Spinner,
// } from "reactstrap";
// import { toast } from "react-toastify";
// import { useCommonContext } from "../helper/CommonProvider";
// import CommonBreadcrumb from "../component/common/bread-crumb";

// const StoreSettings = () => {
//     const [details, setDetails] = useState(null);
//     const [previewImage, setPreviewImage] = useState(null);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const { getSettingDetails, storeSetting, edit_store_setting } = useCommonContext();
//     const [isProcessing, setIsProcessing] = useState(false);

//     useEffect(() => {
//         if (!storeSetting.data?.id) {
//             getSettingDetails();
//         }
//         if (storeSetting.data?.id) {
//             setDetails(storeSetting.data);
//             setPreviewImage(storeSetting.data.store_logo);
//         }
//     }, [storeSetting.data]);

//     const onChange = (e) => {
//         setDetails({ ...details, [e.target.name]: e.target.value });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setSelectedFile(file);
//             setPreviewImage(URL.createObjectURL(file)); // live preview
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsProcessing(true);

//         // Prepare form data for image upload
//         const formData = new FormData();
//         for (const key in details) {
//             formData.append(key, details[key] || "");
//         }
//         if (selectedFile) {
//             formData.append("store_logo", selectedFile);
//         }

//         const data = await edit_store_setting(formData);

//         setIsProcessing(false);
//         if (data && data.success) {
//             toast.success("Store settings updated successfully");
//             getSettingDetails();
//             setSelectedFile(null);
//         }
//     };

//     return (
//         <>
//             <CommonBreadcrumb title="Store Setting" parent="Home" />
//             <Container fluid>
//                 <Row>
//                     <Col sm="12">
//                         <Card>
//                             <CardBody>
//                                 {!storeSetting.loading && details && (
//                                     <div className="tab-pane fade active show">
//                                         <Form
//                                             className="needs-validation"
//                                             onSubmit={handleSubmit}
//                                             encType="multipart/form-data"
//                                         >
//                                             <h4>Store Details</h4>
//                                             <Row>
//                                                 <Col sm="12">
//                                                     {/* Store Logo */}
//                                                     <FormGroup>
//                                                         <Row>
//                                                             <Col xl="3" md="4">
//                                                                 <Label>* Store Logo</Label>
//                                                             </Col>
//                                                             <Col md="7">
//                                                                 {previewImage && (
//                                                                     <div style={{ marginBottom: "10px" }}>
//                                                                         <img
//                                                                             src={previewImage}
//                                                                             alt="Store Logo Preview"
//                                                                             style={{
//                                                                                 width: "150px",
//                                                                                 height: "auto",
//                                                                                 borderRadius: "8px",
//                                                                                 border: "1px solid #ccc",
//                                                                             }}
//                                                                         />
//                                                                     </div>
//                                                                 )}
//                                                                 <Input
//                                                                     type="file"
//                                                                     accept="image/*"
//                                                                     onChange={handleImageChange}
//                                                                 />
//                                                             </Col>
//                                                         </Row>
//                                                     </FormGroup>

//                                                     {/* Store Name */}
//                                                     <FormGroup>
//                                                         <Row>
//                                                             <Col xl="3" md="4">
//                                                                 <Label>* Store Name</Label>
//                                                             </Col>
//                                                             <Col md="7">
//                                                                 <Input
//                                                                     type="text"
//                                                                     required
//                                                                     name="store_name"
//                                                                     value={details.store_name}
//                                                                     onChange={onChange}
//                                                                     placeholder="Enter store name"
//                                                                 />
//                                                             </Col>
//                                                         </Row>
//                                                     </FormGroup>

//                                                     {/* Description */}
//                                                     <FormGroup>
//                                                         <Row>
//                                                             <Col xl="3" md="4">
//                                                                 <Label>* Short Description</Label>
//                                                             </Col>
//                                                             <Col md="7">
//                                                                 <Input
//                                                                     type="textarea"
//                                                                     rows={3}
//                                                                     name="store_description"
//                                                                     value={details.store_description || ""}
//                                                                     onChange={onChange}
//                                                                     placeholder="Enter store description"
//                                                                 />
//                                                             </Col>
//                                                         </Row>
//                                                     </FormGroup>

//                                                     {/* Currency */}
//                                                     <FormGroup>
//                                                         <Row>
//                                                             <Col xl="3" md="4">
//                                                                 <Label>* Default Currency</Label>
//                                                             </Col>
//                                                             <Col md="7">
//                                                                 <Input
//                                                                     type="text"
//                                                                     name="default_currency"
//                                                                     value={details.default_currency || ""}
//                                                                     onChange={onChange}
//                                                                     placeholder="Enter default currency"
//                                                                 />
//                                                             </Col>
//                                                         </Row>
//                                                     </FormGroup>

//                                                     {/* Language */}
//                                                     <FormGroup>
//                                                         <Row>
//                                                             <Col xl="3" md="4">
//                                                                 <Label>* Default Language</Label>
//                                                             </Col>
//                                                             <Col md="7">
//                                                                 <Input
//                                                                     type="text"
//                                                                     name="default_language"
//                                                                     value={details.default_language || ""}
//                                                                     onChange={onChange}
//                                                                     placeholder="Enter default language"
//                                                                 />
//                                                             </Col>
//                                                         </Row>
//                                                     </FormGroup>

//                                                     {/* Address */}
//                                                     <FormGroup>
//                                                         <Row>
//                                                             <Col xl="3" md="4">
//                                                                 <Label>* Address</Label>
//                                                             </Col>
//                                                             <Col md="7">
//                                                                 <Input
//                                                                     type="text"
//                                                                     name="address"
//                                                                     value={details.address || ""}
//                                                                     onChange={onChange}
//                                                                     placeholder="Enter address"
//                                                                 />
//                                                             </Col>
//                                                         </Row>
//                                                     </FormGroup>

//                                                     {/* Support Email */}
//                                                     <FormGroup>
//                                                         <Row>
//                                                             <Col xl="3" md="4">
//                                                                 <Label>* Support Email</Label>
//                                                             </Col>
//                                                             <Col md="7">
//                                                                 <Input
//                                                                     type="email"
//                                                                     required
//                                                                     name="support_email"
//                                                                     value={details.support_email || ""}
//                                                                     onChange={onChange}
//                                                                     placeholder="Enter support email"
//                                                                 />
//                                                             </Col>
//                                                         </Row>
//                                                     </FormGroup>

//                                                     {/* Support Phone */}
//                                                     <FormGroup>
//                                                         <Row>
//                                                             <Col xl="3" md="4">
//                                                                 <Label>* Support Phone</Label>
//                                                             </Col>
//                                                             <Col md="7">
//                                                                 <Input
//                                                                     type="text"
//                                                                     required
//                                                                     name="support_phone"
//                                                                     value={details.support_phone || ""}
//                                                                     onChange={onChange}
//                                                                     placeholder="Enter support phone"
//                                                                 />
//                                                             </Col>
//                                                         </Row>
//                                                     </FormGroup>

//                                                     {/* GST */}
//                                                     <FormGroup>
//                                                         <Row>
//                                                             <Col xl="3" md="4">
//                                                                 <Label>* GST Number</Label>
//                                                             </Col>
//                                                             <Col md="7">
//                                                                 <Input
//                                                                     type="text"
//                                                                     name="gst_number"
//                                                                     value={details.gst_number || ""}
//                                                                     onChange={onChange}
//                                                                     placeholder="Enter GST number"
//                                                                 />
//                                                             </Col>
//                                                         </Row>
//                                                     </FormGroup>

//                                                     {/* CIN */}
//                                                     <FormGroup>
//                                                         <Row>
//                                                             <Col xl="3" md="4">
//                                                                 <Label>* CIN Number</Label>
//                                                             </Col>
//                                                             <Col md="7">
//                                                                 <Input
//                                                                     type="text"
//                                                                     name="cin_number"
//                                                                     value={details.cin_number || ""}
//                                                                     onChange={onChange}
//                                                                     placeholder="Enter CIN number"
//                                                                 />
//                                                             </Col>
//                                                         </Row>
//                                                     </FormGroup>

//                                                     {/* Social Links */}
//                                                     {["facebook", "instagram", "twitter", "linkedin"].map((platform) => (
//                                                         <FormGroup key={platform}>
//                                                             <Row>
//                                                                 <Col xl="3" md="4">
//                                                                     <Label>* {platform.charAt(0).toUpperCase() + platform.slice(1)}</Label>
//                                                                 </Col>
//                                                                 <Col md="7">
//                                                                     <Input
//                                                                         type="url"
//                                                                         name={platform}
//                                                                         value={details[platform] || ""}
//                                                                         onChange={onChange}
//                                                                         placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
//                                                                     />
//                                                                 </Col>
//                                                             </Row>
//                                                         </FormGroup>
//                                                     ))}

//                                                     {/* Save Button */}
//                                                     <Button type="submit" disabled={isProcessing}>
//                                                         {isProcessing ? "Saving..." : "Save"}
//                                                     </Button>
//                                                 </Col>
//                                             </Row>
//                                         </Form>
//                                     </div>
//                                 )}

//                                 {storeSetting.loading && (
//                                     <div
//                                         style={{
//                                             display: "flex",
//                                             justifyContent: "center",
//                                             alignItems: "center",
//                                         }}
//                                     >
//                                         <Spinner color="secondary" className="my-4" />
//                                     </div>
//                                 )}
//                             </CardBody>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </>
//     );
// };

// export default StoreSettings;


/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Spinner
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useCommonContext } from "../helper/CommonProvider";
import CommonBreadcrumb from "../component/common/bread-crumb";

const StoreSettings = () => {
    const [details, setDetails] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const { getSettingDetails, storeSetting, edit_store_setting } = useCommonContext();
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!storeSetting.data?.id) {
            getSettingDetails();
        }
        if (storeSetting.data?.id) {
            setDetails(storeSetting.data);
            setPreviewImage(storeSetting.data.store_logo);
        }
    }, [storeSetting.data]);

    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file)); // live preview
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Prepare form data for image upload
        const formData = new FormData();
        for (const key in details) {
            formData.append(key, details[key] || "");
        }
        if (selectedFile) {
            formData.append("store_logo", selectedFile);
        }

        const data = await edit_store_setting(formData);

        setIsProcessing(false);
        if (data && data.success) {
            toast.success("Store settings updated successfully");
            getSettingDetails();
            setSelectedFile(null);
        }
    };

    return (
        <div className="pb-5 text-white">
            <CommonBreadcrumb title="Store Setting" parent="Home" />
            <Container fluid className="mt-n4">
                <Row>
                    <Col sm="12">
                        <Card className="bg-dark border-secondary border-opacity-10 shadow-lg" style={{ backgroundColor: '#1E1E1E' }}>
                            <Card.Body className="p-4">
                                {!storeSetting.loading && details && (
                                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <h4 className="mb-4 fw-bold text-white">Store Details</h4>

                                        {/* Store Logo */}
                                        <Form.Group className="mb-4">
                                            <Row>
                                                <Col xl="3" md="4" className="d-flex align-items-center">
                                                    <Form.Label className="fw-bold text-secondary mb-0">* Store Logo</Form.Label>
                                                </Col>
                                                <Col md="7">
                                                    {previewImage && (
                                                        <div className="mb-3">
                                                            <img
                                                                src={previewImage}
                                                                alt="Store Logo Preview"
                                                                style={{
                                                                    width: "150px",
                                                                    height: "auto",
                                                                    borderRadius: "8px",
                                                                    objectFit: "contain"
                                                                }}
                                                                className="border border-secondary border-opacity-25 p-1 bg-black bg-opacity-25"
                                                            />
                                                        </div>
                                                    )}
                                                    <Form.Control
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="bg-black border-secondary text-white focus-none"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Store Name */}
                                        <Form.Group className="mb-3">
                                            <Row>
                                                <Col xl="3" md="4" className="d-flex align-items-center">
                                                    <Form.Label className="fw-bold text-secondary mb-0">* Store Name</Form.Label>
                                                </Col>
                                                <Col md="7">
                                                    <Form.Control
                                                        type="text"
                                                        required
                                                        name="store_name"
                                                        value={details.store_name}
                                                        onChange={onChange}
                                                        placeholder="Enter store name"
                                                        className="bg-black border-secondary text-white focus-none"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Description */}
                                        <Form.Group className="mb-3">
                                            <Row>
                                                <Col xl="3" md="4" className="d-flex align-items-center">
                                                    <Form.Label className="fw-bold text-secondary mb-0">* Short Description</Form.Label>
                                                </Col>
                                                <Col md="7">
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        name="store_description"
                                                        value={details.store_description || ""}
                                                        onChange={onChange}
                                                        placeholder="Enter store description"
                                                        className="bg-black border-secondary text-white focus-none"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Currency */}
                                        <Form.Group className="mb-3">
                                            <Row>
                                                <Col xl="3" md="4" className="d-flex align-items-center">
                                                    <Form.Label className="fw-bold text-secondary mb-0">* Default Currency</Form.Label>
                                                </Col>
                                                <Col md="7">
                                                    <Form.Control
                                                        type="text"
                                                        name="default_currency"
                                                        value={details.default_currency || ""}
                                                        onChange={onChange}
                                                        placeholder="Enter default currency"
                                                        className="bg-black border-secondary text-white focus-none"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Language */}
                                        <Form.Group className="mb-3">
                                            <Row>
                                                <Col xl="3" md="4" className="d-flex align-items-center">
                                                    <Form.Label className="fw-bold text-secondary mb-0">* Default Language</Form.Label>
                                                </Col>
                                                <Col md="7">
                                                    <Form.Control
                                                        type="text"
                                                        name="default_language"
                                                        value={details.default_language || ""}
                                                        onChange={onChange}
                                                        placeholder="Enter default language"
                                                        className="bg-black border-secondary text-white focus-none"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Address */}
                                        <Form.Group className="mb-3">
                                            <Row>
                                                <Col xl="3" md="4" className="d-flex align-items-center">
                                                    <Form.Label className="fw-bold text-secondary mb-0">* Address</Form.Label>
                                                </Col>
                                                <Col md="7">
                                                    <Form.Control
                                                        type="text"
                                                        name="address"
                                                        value={details.address || ""}
                                                        onChange={onChange}
                                                        placeholder="Enter address"
                                                        className="bg-black border-secondary text-white focus-none"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Support Email */}
                                        <Form.Group className="mb-3">
                                            <Row>
                                                <Col xl="3" md="4" className="d-flex align-items-center">
                                                    <Form.Label className="fw-bold text-secondary mb-0">* Support Email</Form.Label>
                                                </Col>
                                                <Col md="7">
                                                    <Form.Control
                                                        type="email"
                                                        required
                                                        name="support_email"
                                                        value={details.support_email || ""}
                                                        onChange={onChange}
                                                        placeholder="Enter support email"
                                                        className="bg-black border-secondary text-white focus-none"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Support Phone */}
                                        <Form.Group className="mb-3">
                                            <Row>
                                                <Col xl="3" md="4" className="d-flex align-items-center">
                                                    <Form.Label className="fw-bold text-secondary mb-0">* Support Phone</Form.Label>
                                                </Col>
                                                <Col md="7">
                                                    <Form.Control
                                                        type="text"
                                                        required
                                                        name="support_phone"
                                                        value={details.support_phone || ""}
                                                        onChange={onChange}
                                                        placeholder="Enter support phone"
                                                        className="bg-black border-secondary text-white focus-none"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* GST */}
                                        <Form.Group className="mb-3">
                                            <Row>
                                                <Col xl="3" md="4" className="d-flex align-items-center">
                                                    <Form.Label className="fw-bold text-secondary mb-0">* GST Number</Form.Label>
                                                </Col>
                                                <Col md="7">
                                                    <Form.Control
                                                        type="text"
                                                        name="gst_number"
                                                        value={details.gst_number || ""}
                                                        onChange={onChange}
                                                        placeholder="Enter GST number"
                                                        className="bg-black border-secondary text-white focus-none"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* CIN */}
                                        <Form.Group className="mb-3">
                                            <Row>
                                                <Col xl="3" md="4" className="d-flex align-items-center">
                                                    <Form.Label className="fw-bold text-secondary mb-0">* CIN Number</Form.Label>
                                                </Col>
                                                <Col md="7">
                                                    <Form.Control
                                                        type="text"
                                                        name="cin_number"
                                                        value={details.cin_number || ""}
                                                        onChange={onChange}
                                                        placeholder="Enter CIN number"
                                                        className="bg-black border-secondary text-white focus-none"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Social Links */}
                                        {["facebook", "instagram", "twitter", "linkedin"].map((platform) => (
                                            <Form.Group className="mb-3" key={platform}>
                                                <Row>
                                                    <Col xl="3" md="4" className="d-flex align-items-center">
                                                        <Form.Label className="fw-bold text-secondary mb-0">* {platform.charAt(0).toUpperCase() + platform.slice(1)}</Form.Label>
                                                    </Col>
                                                    <Col md="7">
                                                        <Form.Control
                                                            type="url"
                                                            name={platform}
                                                            value={details[platform] || ""}
                                                            onChange={onChange}
                                                            placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                                                            className="bg-black border-secondary text-white focus-none"
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        ))}

                                        {/* Save Button */}
                                        <Row className="mt-4">
                                            <Col md={{ offset: 3, span: 7 }} xl={{ offset: 3, span: 7 }}>
                                                <Button
                                                    type="submit"
                                                    disabled={isProcessing}
                                                    className="fw-bold text-black border-0 px-4 py-2"
                                                    style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                                                >
                                                    {isProcessing ? "Saving..." : "Save Settings"}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                )}

                                {storeSetting.loading && (
                                    <div className="text-center py-5">
                                        <Spinner animation="border" variant="secondary" />
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <style>{`
                .bg-dark { background-color: #1E1E1E !important; }
                .border-secondary { border-color: #2D2D2D !important; }
                .focus-none:focus { background-color: #000 !important; border-color: #fcca0c !important; color: white !important; box-shadow: none !important; }
            `}</style>
        </div>
    );
};

export default StoreSettings;
