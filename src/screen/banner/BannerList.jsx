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
    Spinner,
    Table,
} from "reactstrap";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Switch } from "@mui/material";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCommonContext } from "../../helper/CommonProvider";

const BannerList = () => {
    const {
        getBannerList,
        BannerList,
        addBanner,
        bannerDelete,
        switchBranner,
        editBranner,
    } = useCommonContext();

    const [formData, setFormData] = useState({
        title: "",
        type: "web",
        banner_type: "main_banner",
        link: "",
        image: null,
    });

    const [selectedBanner, setSelectedBanner] = useState({
        id: "",
        title: "",
        type: "",
        banner_type: "",
        link: "",
        image: "",
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [modalOpenAdd, setModalOpenAdd] = useState(false);
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        getBannerList();
    }, []);

    // ===== Modal handlers =====
    const openAddModal = () => setModalOpenAdd(true);
    const closeAddModal = () => {
        setModalOpenAdd(false);
        setFormData({
            title: "",
            type: "web",
            banner_type: "main_banner",
            link: "",
            image: null,
        });
        setPreviewImage(null);
    };

    const openEditModal = (banner) => {
        setSelectedBanner(banner);
        setNewImage(null);
        setModalOpenEdit(true);
    };
    const closeEditModal = () => setModalOpenEdit(false);

    // ===== Form input handlers =====
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedBanner((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditFileChange = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
    };

    // ===== Submit handlers =====
    const handleAddBanner = () => {
        const data = new FormData();
        data.append("title", formData.title);
        data.append("type", formData.type);
        data.append("banner_type", formData.banner_type);
        data.append("link", formData.link);
        if (formData.image) data.append("image", formData.image);

        addBanner(data);
        closeAddModal();
    };

    const handleEditBanner = () => {
        const data = new FormData();
        data.append("title", selectedBanner.title);
        data.append("type", selectedBanner.type);
        data.append("banner_type", selectedBanner.banner_type);
        data.append("link", selectedBanner.link);
        if (newImage) {
            data.append("image", newImage);
        } else if (selectedBanner.image) {
            data.append("image", selectedBanner.image);
        }

        editBranner(selectedBanner.id, data);
        closeEditModal();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            bannerDelete(id);
        }
    };

    const handleStatusToggle = async (banner) => {
        const newStatus = banner.is_active === 1 ? 0 : 1;
        await switchBranner(banner.id, newStatus);
    };

    return (
        <>
            <CommonBreadcrumb title="Banner List" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="primary" onClick={openAddModal}>
                                        Add Banner
                                    </Button>
                                </div>
                                <div className="clearfix"></div>

                                <Table striped responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Banner Image</th>
                                            <th>Title</th>
                                            <th>Link</th>
                                            <th>Type</th>
                                            <th>Banner Type</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {BannerList?.loading ? (
                                            <tr>
                                                <td colSpan="8" className="text-center">
                                                    <Spinner color="secondary" />
                                                </td>
                                            </tr>
                                        ) : BannerList?.data?.length === 0 ? (
                                            <tr>
                                                <td colSpan="8" className="text-center">
                                                    No banners found
                                                </td>
                                            </tr>
                                        ) : (
                                            BannerList.data.map((banner, index) => (
                                                <tr key={banner.id || index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <img
                                                            // src={banner.image}
                                                            src={
                                                                banner.image
                                                                    ? `${import.meta.env.VITE_APP_TEACHER_DOC_URL}/uploads/banner/${banner.image}`
                                                                    : "/no-image.png"
                                                            }
                                                            alt="Banner1"
                                                            style={{
                                                                width: "80px",
                                                                height: "80px",
                                                                objectFit: "cover",
                                                                borderRadius: "5px",
                                                            }}
                                                        />
                                                    </td>
                                                    <td>{banner.title}</td>
                                                    <td>{banner.link}</td>
                                                    <td>{banner.type}</td>
                                                    <td>{banner.banner_type}</td>
                                                    <td>
                                                        <Switch
                                                            checked={banner.is_active === 1}
                                                            onChange={() => handleStatusToggle(banner)}
                                                            color="success"
                                                        />
                                                    </td>
                                                    <td>
                                                        <FaEdit
                                                            size={20}
                                                            style={{
                                                                cursor: "pointer",
                                                                marginRight: "10px",
                                                                color: "#007bff",
                                                            }}
                                                            onClick={() => openEditModal(banner)}
                                                        />
                                                        <AiOutlineDelete
                                                            size={20}
                                                            style={{ cursor: "pointer", color: "red" }}
                                                            onClick={() => handleDelete(banner.id)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* ===== Add Banner Modal ===== */}
            <Modal isOpen={modalOpenAdd} toggle={closeAddModal}>
                <ModalHeader toggle={closeAddModal}>Add Banner</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input name="title" value={formData.title} onChange={handleInputChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Device Type</Label>
                            <Input type="select" name="type" value={formData.type} onChange={handleInputChange}>
                                <option value="web">Web</option>
                                <option value="mobile">Mobile</option>
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label>Banner Type</Label>
                            <Input
                                type="select"
                                name="banner_type"
                                value={formData.banner_type}
                                onChange={handleInputChange}
                            >
                                <option value="main_banner">Main Banner</option>
                                <option value="new_arrival">New Arrival</option>
                                <option value="top_seller">Top Seller</option>
                                <option value="featured">Featured</option>
                                <option value="custom">Custom</option>
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label>Link</Label>
                            <Input name="link" value={formData.link} onChange={handleInputChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Banner Image</Label>
                            <Input type="file" name="image" onChange={handleFileChange} accept="image/*" />
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    style={{
                                        width: "100%",
                                        maxHeight: "200px",
                                        marginTop: "10px",
                                        borderRadius: "5px",
                                    }}
                                />
                            )}
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddBanner}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={closeAddModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

            {/* ===== Edit Banner Modal ===== */}
            <Modal isOpen={modalOpenEdit} toggle={closeEditModal}>
                <ModalHeader toggle={closeEditModal}>Edit Banner</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input
                                name="title"
                                value={selectedBanner.title}
                                onChange={handleEditInputChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Device Type</Label>
                            <Input
                                type="select"
                                name="type"
                                value={selectedBanner.type}
                                onChange={handleEditInputChange}
                            >
                                <option value="web">Web</option>
                                <option value="mobile">Mobile</option>
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label>Banner Type</Label>
                            <Input
                                type="select"
                                name="banner_type"
                                value={selectedBanner.banner_type}
                                onChange={handleEditInputChange}
                            >
                                <option value="main_banner">Main Banner</option>
                                <option value="new_arrival">New Arrival</option>
                                <option value="top_seller">Top Seller</option>
                                <option value="featured">Featured</option>
                                <option value="custom">Custom</option>
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label>Link</Label>
                            <Input
                                name="link"
                                value={selectedBanner.link}
                                onChange={handleEditInputChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Current Image</Label>
                            {selectedBanner.image && (
                                <div style={{ position: "relative", display: "inline-block" }}>
                                    <img
                                        src={selectedBanner.image}
                                        alt="Current"
                                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                    />
                                    <FaTrashAlt
                                        style={{
                                            position: "absolute",
                                            top: "-10px",
                                            right: "-10px",
                                            cursor: "pointer",
                                            color: "red",
                                        }}
                                        onClick={() =>
                                            setSelectedBanner({ ...selectedBanner, image: "" })
                                        }
                                    />
                                </div>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <Label>Upload New Image</Label>
                            <Input
                                type="file"
                                name="image"
                                onChange={handleEditFileChange}
                                accept="image/*"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleEditBanner}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={closeEditModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default BannerList;
