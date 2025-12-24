/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
    Col,
    Form,
    Row,
    FormGroup,
    Input,
    Label,
    Container,
    Card,
    CardBody,
    Button,
    Spinner,
} from "reactstrap";
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
        <>
            <CommonBreadcrumb title="Store Setting" parent="Home" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                {!storeSetting.loading && details && (
                                    <div className="tab-pane fade active show">
                                        <Form
                                            className="needs-validation"
                                            onSubmit={handleSubmit}
                                            encType="multipart/form-data"
                                        >
                                            <h4>Store Details</h4>
                                            <Row>
                                                <Col sm="12">
                                                    {/* Store Logo */}
                                                    <FormGroup>
                                                        <Row>
                                                            <Col xl="3" md="4">
                                                                <Label>* Store Logo</Label>
                                                            </Col>
                                                            <Col md="7">
                                                                {previewImage && (
                                                                    <div style={{ marginBottom: "10px" }}>
                                                                        <img
                                                                            src={previewImage}
                                                                            alt="Store Logo Preview"
                                                                            style={{
                                                                                width: "150px",
                                                                                height: "auto",
                                                                                borderRadius: "8px",
                                                                                border: "1px solid #ccc",
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )}
                                                                <Input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={handleImageChange}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>

                                                    {/* Store Name */}
                                                    <FormGroup>
                                                        <Row>
                                                            <Col xl="3" md="4">
                                                                <Label>* Store Name</Label>
                                                            </Col>
                                                            <Col md="7">
                                                                <Input
                                                                    type="text"
                                                                    required
                                                                    name="store_name"
                                                                    value={details.store_name}
                                                                    onChange={onChange}
                                                                    placeholder="Enter store name"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>

                                                    {/* Description */}
                                                    <FormGroup>
                                                        <Row>
                                                            <Col xl="3" md="4">
                                                                <Label>* Short Description</Label>
                                                            </Col>
                                                            <Col md="7">
                                                                <Input
                                                                    type="textarea"
                                                                    rows={3}
                                                                    name="store_description"
                                                                    value={details.store_description || ""}
                                                                    onChange={onChange}
                                                                    placeholder="Enter store description"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>

                                                    {/* Currency */}
                                                    <FormGroup>
                                                        <Row>
                                                            <Col xl="3" md="4">
                                                                <Label>* Default Currency</Label>
                                                            </Col>
                                                            <Col md="7">
                                                                <Input
                                                                    type="text"
                                                                    name="default_currency"
                                                                    value={details.default_currency || ""}
                                                                    onChange={onChange}
                                                                    placeholder="Enter default currency"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>

                                                    {/* Language */}
                                                    <FormGroup>
                                                        <Row>
                                                            <Col xl="3" md="4">
                                                                <Label>* Default Language</Label>
                                                            </Col>
                                                            <Col md="7">
                                                                <Input
                                                                    type="text"
                                                                    name="default_language"
                                                                    value={details.default_language || ""}
                                                                    onChange={onChange}
                                                                    placeholder="Enter default language"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>

                                                    {/* Address */}
                                                    <FormGroup>
                                                        <Row>
                                                            <Col xl="3" md="4">
                                                                <Label>* Address</Label>
                                                            </Col>
                                                            <Col md="7">
                                                                <Input
                                                                    type="text"
                                                                    name="address"
                                                                    value={details.address || ""}
                                                                    onChange={onChange}
                                                                    placeholder="Enter address"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>

                                                    {/* Support Email */}
                                                    <FormGroup>
                                                        <Row>
                                                            <Col xl="3" md="4">
                                                                <Label>* Support Email</Label>
                                                            </Col>
                                                            <Col md="7">
                                                                <Input
                                                                    type="email"
                                                                    required
                                                                    name="support_email"
                                                                    value={details.support_email || ""}
                                                                    onChange={onChange}
                                                                    placeholder="Enter support email"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>

                                                    {/* Support Phone */}
                                                    <FormGroup>
                                                        <Row>
                                                            <Col xl="3" md="4">
                                                                <Label>* Support Phone</Label>
                                                            </Col>
                                                            <Col md="7">
                                                                <Input
                                                                    type="text"
                                                                    required
                                                                    name="support_phone"
                                                                    value={details.support_phone || ""}
                                                                    onChange={onChange}
                                                                    placeholder="Enter support phone"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>

                                                    {/* GST */}
                                                    <FormGroup>
                                                        <Row>
                                                            <Col xl="3" md="4">
                                                                <Label>* GST Number</Label>
                                                            </Col>
                                                            <Col md="7">
                                                                <Input
                                                                    type="text"
                                                                    name="gst_number"
                                                                    value={details.gst_number || ""}
                                                                    onChange={onChange}
                                                                    placeholder="Enter GST number"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>

                                                    {/* CIN */}
                                                    <FormGroup>
                                                        <Row>
                                                            <Col xl="3" md="4">
                                                                <Label>* CIN Number</Label>
                                                            </Col>
                                                            <Col md="7">
                                                                <Input
                                                                    type="text"
                                                                    name="cin_number"
                                                                    value={details.cin_number || ""}
                                                                    onChange={onChange}
                                                                    placeholder="Enter CIN number"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>

                                                    {/* Social Links */}
                                                    {["facebook", "instagram", "twitter", "linkedin"].map((platform) => (
                                                        <FormGroup key={platform}>
                                                            <Row>
                                                                <Col xl="3" md="4">
                                                                    <Label>* {platform.charAt(0).toUpperCase() + platform.slice(1)}</Label>
                                                                </Col>
                                                                <Col md="7">
                                                                    <Input
                                                                        type="url"
                                                                        name={platform}
                                                                        value={details[platform] || ""}
                                                                        onChange={onChange}
                                                                        placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </FormGroup>
                                                    ))}

                                                    {/* Save Button */}
                                                    <Button type="submit" disabled={isProcessing}>
                                                        {isProcessing ? "Saving..." : "Save"}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                )}

                                {storeSetting.loading && (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Spinner color="secondary" className="my-4" />
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default StoreSettings;
