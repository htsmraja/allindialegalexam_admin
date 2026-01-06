
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { FiSave, FiX } from "react-icons/fi";
import { Input } from "reactstrap";
import { FaTimes } from "react-icons/fa";
import { useCommonContext } from "../helper/CommonProvider";

const AddCategory = ({ show, handleClose, initialValues }) => {
    const { addCategory, editCategory } = useCommonContext();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const [selectedImages, setSelectedImages] = useState([]);
    const [validated, setValidated] = useState(false);
    const isEdit = Boolean(initialValues?.id);

    /* ---------- Load data on open ---------- */
    useEffect(() => {
        if (show) {
            if (isEdit) {
                setFormData({
                    title: initialValues.title || "",
                    description: initialValues.description || "",
                });
            } else {
                setFormData({ title: "", description: "" });
            }
            setSelectedImages([]);
            setValidated(false);
        }
    }, [show, isEdit, initialValues]);

    /* ---------- Input Handlers ---------- */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages((prev) => [...prev, ...files]);
    };

    const handleRemoveImage = (index) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    };

    /* ---------- Submit ---------- */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            setValidated(true);
            return;
        }

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description || "");

        if (isEdit) {
            // edit → single image optional
            if (selectedImages[0]) {
                data.append("image", selectedImages[0]);
            }
            await editCategory(initialValues.id, data);
        } else {
            // add → multiple images
            selectedImages.forEach((file) => data.append("images", file));
            await addCategory(data);
        }

        handleClose();
    };

    /* ---------- UI ---------- */
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="lg"
            contentClassName="bg-dark text-white border-secondary"
        >
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton closeVariant="white" className="border-secondary">
                    <Modal.Title className="fs-5 fw-bold">
                        {isEdit ? "Edit Category" : "Add New Category"}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="px-4 py-4">
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.Label className="small text-secondary fw-bold">
                                    TITLE
                                </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="bg-black border-secondary text-white py-2"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Title is required
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.Label className="small text-secondary fw-bold">
                                    DESCRIPTION
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="bg-black border-secondary text-white py-2"
                                />
                            </Form.Group>
                        </Col>

                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.Label>
                                    {isEdit ? "Replace Image" : "Upload Images"}
                                </Form.Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple={!isEdit}
                                    onChange={handleFileChange}
                                />

                                {selectedImages.length > 0 && (
                                    <div className="d-flex gap-2 mt-3 flex-wrap">
                                        {selectedImages.map((file, i) => (
                                            <div key={i} style={{ position: "relative" }}>
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt="preview"
                                                    style={{
                                                        width: 80,
                                                        height: 80,
                                                        objectFit: "cover",
                                                        borderRadius: 6,
                                                    }}
                                                />
                                                <FaTimes
                                                    size={14}
                                                    color="red"
                                                    style={{
                                                        position: "absolute",
                                                        top: -6,
                                                        right: -6,
                                                        cursor: "pointer",
                                                        background: "white",
                                                        borderRadius: "50%",
                                                    }}
                                                    onClick={() => handleRemoveImage(i)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer className="border-secondary">
                    <Button
                        variant="outline-secondary"
                        onClick={handleClose}
                        className="px-4"
                    >
                        <FiX className="me-2" /> Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="warning"
                        className="px-4 fw-bold text-black border-0"
                    >
                        <FiSave className="me-2" />
                        {isEdit ? "Update Category" : "Save Category"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddCategory;
