/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {
    ArcElement,
    BarController,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    RadialLinearScale,
    Title,
    Tooltip,
} from "chart.js";
import CommonBreadcrumb from "../component/common/bread-crumb";
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table,
    Spinner,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaTimes } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";
import { Switch, Typography } from "@mui/material";
import { useCommonContext } from "../helper/CommonProvider";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarController,
    BarElement,
    ArcElement,
    Filler,
    RadialLinearScale
);

const SubCategoryList = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        getSubCategoryList,
        subcategory,
        addsubCategory,
        categoryDelete,
        setLoading,
        editCategory,
    } = useCommonContext();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
        parentId: id,
    });
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [selectedvarity, setSelectedvarity] = useState({
        title: "",
        description: "",
        status: "",
        id: "",
        image: "",
        parentId: id,
    });


    useEffect(() => {
        getSubCategoryList(id);
    }, [id]);

    // open/close modals
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const onOpenModal2 = (product) => {
        setSelectedvarity(product);
        setModalOpen(true);
    };

    const onCloseModal2 = () => {
        setModalOpen(false);
        setSelectedvarity({
            title: "",
            description: "",
            status: "",
            id: "",
            image: "",
            parentId: id,
        });
    };

    // handle add input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // handle add file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // handle add submit
    const handleSubmit = async () => {
        if (!formData.title.trim()) return alert("Subcategory title is required");

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description || "");
        data.append("parentId", formData.parentId);
        if (formData.image) data.append("image", formData.image);

        // Debugging
        for (let pair of data.entries()) {
            console.log(pair[0] + ":", pair[1]);
        }

        await addsubCategory(data);
        getSubCategoryList(id);
        onCloseModal();
        setFormData({ title: "", description: "", image: null, parentId: id });
        setImagePreview(null);
    };

    // handle edit input
    const handleInputChanges = (e) => {
        const { name, value } = e.target;
        setSelectedvarity((prev) => ({ ...prev, [name]: value }));
    };

    // handle edit file change
    const handleEditFileChange = (e) => {
        setSelectedvarity((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    // handle edit submit
    const handleEditSubmit = async () => {
        if (!selectedvarity.title.trim())
            return alert("Subcategory title is required");

        const data = new FormData();
        data.append("title", selectedvarity.title);
        data.append("description", selectedvarity.description || "");
        if (selectedvarity.image) data.append("image", selectedvarity.image);
        data.append("parentId", formData.parentId);
        await editCategory(selectedvarity.id, data);
        getSubCategoryList(id);
        onCloseModal2();
    };

    const handleDelete = async (idx) => {
        if (window.confirm("Are you sure you wish to delete this item?")) {
            await categoryDelete(idx);
            getSubCategoryList(id);
        }
    };


    return (
        <>
            <CommonBreadcrumb title="Sub Category List" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="" onClick={onOpenModal}>
                                        Add Sub Category
                                    </Button>
                                </div>
                                <div className="clearfix"></div>
                                <div
                                    id="basicScenario"
                                    className="product-physical"
                                    style={{
                                        padding: "20px",
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "8px",
                                        backgroundColor: "#fff",
                                    }}
                                >
                                    <Table
                                        striped
                                        responsive
                                        style={{
                                            borderCollapse: "separate",
                                            borderSpacing: "0 10px",
                                        }}
                                    >
                                        <thead style={{ backgroundColor: "#f8f9fa" }}>
                                            <tr
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "#333",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <th>Sl No.</th>
                                                <th>Sub Category Image</th>
                                                <th>Sub Category Name</th>
                                                <th>Total Product</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {subcategory.loading ? (
                                                <tr>
                                                    <td colSpan="7" className="text-center p-4">
                                                        <Spinner color="secondary" />
                                                    </td>
                                                </tr>
                                            ) : subcategory?.data?.length === 0 ? (
                                                <tr>
                                                    <td
                                                        colSpan="7"
                                                        className="text-center"
                                                        style={{ padding: "20px", color: "#999" }}
                                                    >
                                                        No Data Found
                                                    </td>
                                                </tr>
                                            ) : (
                                                subcategory?.data?.map((product, index) => (
                                                    <tr key={index} style={{ textAlign: "center" }}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <img
                                                                src={
                                                                    Array.isArray(product.image)
                                                                        ? product.image[0]
                                                                        : product.image
                                                                }
                                                                alt={product.title}
                                                                style={{
                                                                    width: "80px",
                                                                    height: "80px",
                                                                    objectFit: "cover",
                                                                    borderRadius: "5px",
                                                                }}
                                                            />
                                                        </td>
                                                        <td>{product.title}</td>

                                                        <td>{product.total_products || "no added"}</td>
                                                        <td>
                                                            <Switch
                                                                checked={product.is_active === 1}
                                                                onChange={() => { }}
                                                                sx={{
                                                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                                                        color: "#043b37",
                                                                    },
                                                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                                                    {
                                                                        backgroundColor: "#043b37",
                                                                    },
                                                                    "& .MuiSwitch-track": {
                                                                        backgroundColor: "#ccc",
                                                                    },
                                                                }}
                                                            />
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    ml: 1,
                                                                    fontWeight: "bold",
                                                                    color:
                                                                        product.is_active === 1
                                                                            ? "#043b36"
                                                                            : "#999",
                                                                }}
                                                            >
                                                                {product.is_active === 1
                                                                    ? "Active"
                                                                    : "Inactive"}
                                                            </Typography>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                color="link"
                                                                onClick={() => onOpenModal2(product)}
                                                            >
                                                                <FaEdit />
                                                            </Button>
                                                            <Button
                                                                color="link"
                                                                onClick={() => handleDelete(product.id)}
                                                            >
                                                                <AiOutlineDelete />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Add Subcategory Modal */}
            <Modal isOpen={open} toggle={onCloseModal} className="modal-lg">
                <ModalHeader toggle={onCloseModal}>
                    <h5 className="modal-title f-w-600">Add SubCategory</h5>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="title">Subcategory Title :</Label>
                            <Input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                id="title"
                            />
                            <FormText color="muted">
                                Enter a clear and descriptive name for the subcategory.
                            </FormText>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="description">Description (Optional):</Label>
                            <Input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                id="description"
                            />
                            <FormText color="muted">
                                Provide a brief description to help users understand this
                                category better.
                            </FormText>
                        </FormGroup>

                        <FormGroup>
                            <Label>SubCategory Image :</Label>
                            <Input type="file" name="image" onChange={handleFileChange} />
                            {imagePreview && (
                                <div style={{ marginTop: "10px" }}>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />
                                </div>
                            )}
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={handleSubmit}
                        disabled={!formData.title}
                    >
                        Save
                    </Button>
                    <Button color="secondary" onClick={onCloseModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Edit Subcategory Modal */}
            <Modal isOpen={modalOpen} toggle={onCloseModal2}>
                <ModalHeader toggle={onCloseModal2}>
                    <h5 className="modal-title f-w-600">Edit Sub Category</h5>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="title">Title:</Label>
                            <Input
                                type="text"
                                name="title"
                                value={selectedvarity.title}
                                onChange={handleInputChanges}
                                id="title"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="description">Description:</Label>
                            <Input
                                type="text"
                                name="description"
                                value={selectedvarity.description}
                                onChange={handleInputChanges}
                                id="description"
                            />
                        </FormGroup>

                        <FormGroup style={{ position: "relative" }}>
                            <Label>Image:</Label>
                            <Input type="file" onChange={handleEditFileChange} />
                            {selectedvarity?.image && (
                                <div style={{ position: "relative", display: "inline-block" }}>
                                    <img
                                        src={
                                            selectedvarity.image instanceof File
                                                ? URL.createObjectURL(selectedvarity.image)
                                                : selectedvarity.image
                                        }
                                        alt="preview"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                            borderRadius: "6px",
                                            marginTop: "10px",
                                        }}
                                    />
                                    <FaTimes
                                        size={16}
                                        color="red"
                                        style={{
                                            position: "absolute",
                                            top: "5px",
                                            right: "5px",
                                            cursor: "pointer",
                                            background: "white",
                                            borderRadius: "50%",
                                        }}
                                        onClick={() =>
                                            setSelectedvarity((prev) => ({ ...prev, image: null }))
                                        }
                                    />
                                </div>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <Label>Status:</Label>
                            <div className="d-flex justify-content-start mt-2">
                                <FormGroup check className="me-3">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="status"
                                            value="Active"
                                            checked={selectedvarity.status === "Active"}
                                            onChange={handleInputChanges}
                                        />
                                        Active
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="status"
                                            value="Inactive"
                                            checked={selectedvarity.status === "Inactive"}
                                            onChange={handleInputChanges}
                                        />
                                        Inactive
                                    </Label>
                                </FormGroup>
                            </div>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleEditSubmit}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={onCloseModal2}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default SubCategoryList;
