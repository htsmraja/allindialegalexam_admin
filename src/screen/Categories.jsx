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
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTimes } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";
import { Pagination, Switch, Typography } from "@mui/material";
import { Stack } from "react-bootstrap";
import { useCommonContext } from "../helper/CommonProvider";

// Register ChartJS components


const Categories = () => {
    const navigate = useNavigate();
    const {
        getCategoryList,
        category,
        addCategory,
        editCategory,
        categoryDelete,
        toggleCategoryStatus,
    } = useCommonContext();

    const [loadingProductId, setLoadingProductId] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [selectedImages, setSelectedImages] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const handlepagechange = (newpage) => {
        setCurrentPage(newpage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const totalPages = category?.data?.pagination?.totalPages || 1;

    useEffect(() => {
        getCategoryList({ page: currentPage || 1 });
    }, [currentPage]);

    // ---------- Modal Handlers ----------
    const onOpenAddModal = () => setOpenAddModal(true);
    const onCloseAddModal = () => {
        setOpenAddModal(false);
        setFormData({ title: "", description: "" });
        setSelectedImages([]);
    };

    const onOpenEditModal = (category) => {
        setSelectedCategory(category);
        setOpenEditModal(true);
    };
    const onCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedCategory({});
    };
    // ---------- Input Handlers ----------
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedCategory((prev) => ({ ...prev, [name]: value }));
    };

    // ---------- File Handlers ----------
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages((prev) => [...prev, ...files]);
    };



    const handleEditFileChange = (e) => {
        setSelectedCategory((prev) => ({ ...prev, image: e.target.files[0] }));
    };



    // ---------- Delete Preview ----------
    const handleRemoveImage = (index) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    };



    // ---------- Submit Handlers ----------
    const handleAddSubmit = async () => {
        if (!formData.title.trim()) return alert("Category title is required");

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description || "");
        selectedImages.forEach((file) => data.append("images", file));

        // for (let pair of data.entries()) {
        //   console.log(pair[0] + ':', pair[1]);
        // }
        await addCategory(data);
        onCloseAddModal();
    };

    const handleEditSubmit = async () => {
        if (!selectedCategory.title.trim()) return alert("Category title is required");

        setLoading(true);
        const data = new FormData();
        data.append("title", selectedCategory.title);
        data.append("description", selectedCategory.description || "");
        if (selectedCategory.image) data.append("image", selectedCategory.image);


        await editCategory(selectedCategory.id, data);
        setLoading(false);
        onCloseEditModal();
    };

    // ---------- Delete Handler ----------
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            categoryDelete(id);
        }
    };

    // ---------- Status Toggle ----------
    const handleStatusToggle = async (category) => {
        setLoadingProductId(category.id);
        await toggleCategoryStatus(category.id, category.is_active === 1 ? 0 : 1);
        getCategoryList({ page: currentPage || 1 });
        setLoadingProductId(null);
    };

    // ---------- Navigation ----------
    const handleSubcategory = (id) => navigate(`/subcategory-List/${id}`);

    return (
        <>
            <CommonBreadcrumb title="Category List" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="primary" onClick={onOpenAddModal}>
                                        Add Category
                                    </Button>
                                </div>
                                <div className="clearfix"></div>
                                <Table responsive bordered hover>
                                    <thead style={{ backgroundColor: "#f8f9fa" }}>
                                        <tr style={{ fontWeight: "bold", textAlign: "center" }}>
                                            <th>Main Image</th>
                                            <th>Category Name</th>
                                            <th>Sub Category</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {category.loading ? (
                                            <tr>
                                                <td colSpan="7" className="text-center">
                                                    <Spinner color="secondary" className="my-4" />
                                                </td>
                                            </tr>
                                        ) : category?.data?.categories?.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="text-center text-muted">
                                                    No Data Found
                                                </td>
                                            </tr>
                                        ) : (
                                            category?.data?.categories?.map((cat, idx) => (
                                                <tr key={idx} style={{ textAlign: "center" }}>
                                                    <td>
                                                        <img
                                                            // src={cat.image}
                                                            src={
                                                                cat.image ? `${import.meta.env.VITE_APP_TEACHER_DOC_URL}/uploads/category/${cat.image}`
                                                                    : "/no-image.png"
                                                            }
                                                            alt={cat.title}
                                                            style={{
                                                                width: "80px",
                                                                height: "80px",
                                                                objectFit: "cover",
                                                                borderRadius: "5px",
                                                            }}
                                                        />
                                                    </td>

                                                    <td>{cat.title}</td>
                                                    <td>
                                                        <div
                                                            style={{
                                                                display: "inline-flex",
                                                                alignItems: "center",
                                                                gap: "6px",
                                                            }}
                                                        >
                                                            <span>{cat.sub_category_count}</span>
                                                            <BsFillEyeFill
                                                                size={20}
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() => handleSubcategory(cat.id)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {loadingProductId === cat.id ? (
                                                            <Spinner size="sm" />
                                                        ) : (
                                                            <Switch
                                                                checked={cat.is_active === 1}
                                                                onChange={() => handleStatusToggle(cat)}
                                                            />
                                                        )}
                                                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                                            {cat.is_active === 1 ? "Active" : "Inactive"}
                                                        </Typography>
                                                    </td>
                                                    <td>
                                                        <Button color="link" onClick={() => onOpenEditModal(cat)}>
                                                            <FaEdit />
                                                        </Button>
                                                        <Button color="link" onClick={() => handleDelete(cat.id)}>
                                                            <AiOutlineDelete />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                                <Stack className="rightPagination mt10" spacing={2}>
                                    <Pagination
                                        color="primary"
                                        count={totalPages}
                                        page={currentPage}
                                        shape="rounded"
                                        onChange={(_, value) => handlepagechange(value)}
                                    />
                                </Stack>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* ---------- Add Category Modal ---------- */}
            <Modal isOpen={openAddModal} toggle={onCloseAddModal}>
                <ModalHeader toggle={onCloseAddModal}>Add Category</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Category Title:</Label>
                            <Input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter category name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description:</Label>
                            <Input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </FormGroup>

                        {/* Main Image Upload */}
                        <FormGroup>
                            <Label>Main Images:</Label>
                            <Input type="file" multiple accept="image/*" onChange={handleFileChange} />
                            {selectedImages.length > 0 && (
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        marginTop: "10px",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {selectedImages.map((file, i) => (
                                        <div
                                            key={i}
                                            style={{ position: "relative", display: "inline-block" }}
                                        >
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="preview"
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    objectFit: "cover",
                                                    borderRadius: "6px",
                                                }}
                                            />
                                            <FaTimes
                                                size={16}
                                                color="red"
                                                style={{
                                                    position: "absolute",
                                                    top: "-5px",
                                                    right: "-5px",
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
                        </FormGroup>


                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={handleAddSubmit}
                        disabled={!formData.title || selectedImages.length === 0}
                    >
                        Save
                    </Button>
                    <Button color="secondary" onClick={onCloseAddModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

            {/* ---------- Edit Category Modal ---------- */}
            <Modal isOpen={openEditModal} toggle={onCloseEditModal}>
                <ModalHeader toggle={onCloseEditModal}>Edit Category</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Category Title:</Label>
                            <Input
                                type="text"
                                name="title"
                                value={selectedCategory?.title || ""}
                                onChange={handleEditInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description:</Label>
                            <Input
                                type="text"
                                name="description"
                                value={selectedCategory?.description || ""}
                                onChange={handleEditInputChange}
                            />
                        </FormGroup>

                        {/* Main Image */}
                        <FormGroup>
                            <Label>Main Image:</Label>
                            <Input type="file" onChange={handleEditFileChange} />
                            {selectedCategory?.image && (
                                <img
                                    src={
                                        selectedCategory.image instanceof File
                                            ? URL.createObjectURL(selectedCategory.image)
                                            : selectedCategory.image
                                    }
                                    alt="main preview"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: "6px",
                                        marginTop: "10px",
                                    }}
                                />
                            )}
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleEditSubmit} disabled={loading}>
                        {loading ? <Spinner size="sm" /> : "Save"}
                    </Button>
                    <Button color="secondary" onClick={onCloseEditModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default Categories;
