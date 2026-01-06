// import {
//     Button,
//     Card,
//     CardBody,
//     Col,
//     Container,
//     Form,
//     FormGroup,
//     Input,
//     Label,
//     Modal,
//     ModalBody,
//     ModalFooter,
//     ModalHeader,
//     Row,
//     Spinner,
//     Table,
// } from "reactstrap";
// import { useEffect, useState } from "react";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import { AiOutlineDelete } from "react-icons/ai";
// import { Switch } from "@mui/material";
// import CommonBreadcrumb from "../../component/common/bread-crumb";
// import { useCommonContext } from "../../helper/CommonProvider";

// const BannerList = () => {
//     const {
//         getBannerList,
//         BannerList,
//         addBanner,
//         bannerDelete,
//         switchBranner,
//         editBranner,
//     } = useCommonContext();

//     const [formData, setFormData] = useState({
//         title: "",
//         type: "web",
//         banner_type: "main_banner",
//         link: "",
//         image: null,
//     });

//     const [selectedBanner, setSelectedBanner] = useState({
//         id: "",
//         title: "",
//         type: "",
//         banner_type: "",
//         link: "",
//         image: "",
//     });

//     const [previewImage, setPreviewImage] = useState(null);
//     const [modalOpenAdd, setModalOpenAdd] = useState(false);
//     const [modalOpenEdit, setModalOpenEdit] = useState(false);
//     const [newImage, setNewImage] = useState(null);

//     useEffect(() => {
//         getBannerList();
//     }, []);

//     // ===== Modal handlers =====
//     const openAddModal = () => setModalOpenAdd(true);
//     const closeAddModal = () => {
//         setModalOpenAdd(false);
//         setFormData({
//             title: "",
//             type: "web",
//             banner_type: "main_banner",
//             link: "",
//             image: null,
//         });
//         setPreviewImage(null);
//     };

//     const openEditModal = (banner) => {
//         setSelectedBanner(banner);
//         setNewImage(null);
//         setModalOpenEdit(true);
//     };
//     const closeEditModal = () => setModalOpenEdit(false);

//     // ===== Form input handlers =====
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFormData((prev) => ({ ...prev, image: file }));
//             setPreviewImage(URL.createObjectURL(file));
//         }
//     };

//     const handleEditInputChange = (e) => {
//         const { name, value } = e.target;
//         setSelectedBanner((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleEditFileChange = (e) => {
//         const file = e.target.files[0];
//         setNewImage(file);
//     };

//     // ===== Submit handlers =====
//     const handleAddBanner = () => {
//         const data = new FormData();
//         data.append("title", formData.title);
//         data.append("type", formData.type);
//         data.append("banner_type", formData.banner_type);
//         data.append("link", formData.link);
//         if (formData.image) data.append("image", formData.image);

//         addBanner(data);
//         closeAddModal();
//     };

//     const handleEditBanner = () => {
//         const data = new FormData();
//         data.append("title", selectedBanner.title);
//         data.append("type", selectedBanner.type);
//         data.append("banner_type", selectedBanner.banner_type);
//         data.append("link", selectedBanner.link);
//         if (newImage) {
//             data.append("image", newImage);
//         } else if (selectedBanner.image) {
//             data.append("image", selectedBanner.image);
//         }

//         editBranner(selectedBanner.id, data);
//         closeEditModal();
//     };

//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you want to delete this banner?")) {
//             bannerDelete(id);
//         }
//     };

//     const handleStatusToggle = async (banner) => {
//         const newStatus = banner.is_active === 1 ? 0 : 1;
//         await switchBranner(banner.id, newStatus);
//     };

//     return (
//         <>
//             <CommonBreadcrumb title="Banner List" />
//             <Container fluid>
//                 <Row>
//                     <Col sm="12">
//                         <Card>
//                             <CardBody>
//                                 <div className="btn-popup pull-right">
//                                     <Button color="primary" onClick={openAddModal}>
//                                         Add Banner
//                                     </Button>
//                                 </div>
//                                 <div className="clearfix"></div>

//                                 <Table striped responsive>
//                                     <thead>
//                                         <tr>
//                                             <th>#</th>
//                                             <th>Banner Image</th>
//                                             <th>Title</th>
//                                             <th>Link</th>
//                                             <th>Type</th>
//                                             <th>Banner Type</th>
//                                             <th>Status</th>
//                                             <th>Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {BannerList?.loading ? (
//                                             <tr>
//                                                 <td colSpan="8" className="text-center">
//                                                     <Spinner color="secondary" />
//                                                 </td>
//                                             </tr>
//                                         ) : BannerList?.data?.length === 0 ? (
//                                             <tr>
//                                                 <td colSpan="8" className="text-center">
//                                                     No banners found
//                                                 </td>
//                                             </tr>
//                                         ) : (
//                                             BannerList.data.map((banner, index) => (
//                                                 <tr key={banner.id || index}>
//                                                     <td>{index + 1}</td>
//                                                     <td>
//                                                         <img
//                                                             // src={banner.image}
//                                                             src={
//                                                                 banner.image
//                                                                     ? `${import.meta.env.VITE_APP_TEACHER_DOC_URL}/uploads/banner/${banner.image}`
//                                                                     : "/no-image.png"
//                                                             }
//                                                             alt="Banner1"
//                                                             style={{
//                                                                 width: "80px",
//                                                                 height: "80px",
//                                                                 objectFit: "cover",
//                                                                 borderRadius: "5px",
//                                                             }}
//                                                         />
//                                                     </td>
//                                                     <td>{banner.title}</td>
//                                                     <td>{banner.link}</td>
//                                                     <td>{banner.type}</td>
//                                                     <td>{banner.banner_type}</td>
//                                                     <td>
//                                                         <Switch
//                                                             checked={banner.is_active === 1}
//                                                             onChange={() => handleStatusToggle(banner)}
//                                                             color="success"
//                                                         />
//                                                     </td>
//                                                     <td>
//                                                         <FaEdit
//                                                             size={20}
//                                                             style={{
//                                                                 cursor: "pointer",
//                                                                 marginRight: "10px",
//                                                                 color: "#007bff",
//                                                             }}
//                                                             onClick={() => openEditModal(banner)}
//                                                         />
//                                                         <AiOutlineDelete
//                                                             size={20}
//                                                             style={{ cursor: "pointer", color: "red" }}
//                                                             onClick={() => handleDelete(banner.id)}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                             ))
//                                         )}
//                                     </tbody>
//                                 </Table>
//                             </CardBody>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>

//             {/* ===== Add Banner Modal ===== */}
//             <Modal isOpen={modalOpenAdd} toggle={closeAddModal}>
//                 <ModalHeader toggle={closeAddModal}>Add Banner</ModalHeader>
//                 <ModalBody>
//                     <Form>
//                         <FormGroup>
//                             <Label>Title</Label>
//                             <Input name="title" value={formData.title} onChange={handleInputChange} />
//                         </FormGroup>

//                         <FormGroup>
//                             <Label>Device Type</Label>
//                             <Input type="select" name="type" value={formData.type} onChange={handleInputChange}>
//                                 <option value="web">Web</option>
//                                 <option value="mobile">Mobile</option>
//                             </Input>
//                         </FormGroup>

//                         <FormGroup>
//                             <Label>Banner Type</Label>
//                             <Input
//                                 type="select"
//                                 name="banner_type"
//                                 value={formData.banner_type}
//                                 onChange={handleInputChange}
//                             >
//                                 <option value="main_banner">Main Banner</option>
//                                 <option value="new_arrival">New Arrival</option>
//                                 <option value="top_seller">Top Seller</option>
//                                 <option value="featured">Featured</option>
//                                 <option value="custom">Custom</option>
//                             </Input>
//                         </FormGroup>

//                         <FormGroup>
//                             <Label>Link</Label>
//                             <Input name="link" value={formData.link} onChange={handleInputChange} />
//                         </FormGroup>

//                         <FormGroup>
//                             <Label>Banner Image</Label>
//                             <Input type="file" name="image" onChange={handleFileChange} accept="image/*" />
//                             {previewImage && (
//                                 <img
//                                     src={previewImage}
//                                     alt="Preview"
//                                     style={{
//                                         width: "100%",
//                                         maxHeight: "200px",
//                                         marginTop: "10px",
//                                         borderRadius: "5px",
//                                     }}
//                                 />
//                             )}
//                         </FormGroup>
//                     </Form>
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button color="primary" onClick={handleAddBanner}>
//                         Save
//                     </Button>
//                     <Button color="secondary" onClick={closeAddModal}>
//                         Close
//                     </Button>
//                 </ModalFooter>
//             </Modal>

//             {/* ===== Edit Banner Modal ===== */}
//             <Modal isOpen={modalOpenEdit} toggle={closeEditModal}>
//                 <ModalHeader toggle={closeEditModal}>Edit Banner</ModalHeader>
//                 <ModalBody>
//                     <Form>
//                         <FormGroup>
//                             <Label>Title</Label>
//                             <Input
//                                 name="title"
//                                 value={selectedBanner.title}
//                                 onChange={handleEditInputChange}
//                             />
//                         </FormGroup>

//                         <FormGroup>
//                             <Label>Device Type</Label>
//                             <Input
//                                 type="select"
//                                 name="type"
//                                 value={selectedBanner.type}
//                                 onChange={handleEditInputChange}
//                             >
//                                 <option value="web">Web</option>
//                                 <option value="mobile">Mobile</option>
//                             </Input>
//                         </FormGroup>

//                         <FormGroup>
//                             <Label>Banner Type</Label>
//                             <Input
//                                 type="select"
//                                 name="banner_type"
//                                 value={selectedBanner.banner_type}
//                                 onChange={handleEditInputChange}
//                             >
//                                 <option value="main_banner">Main Banner</option>
//                                 <option value="new_arrival">New Arrival</option>
//                                 <option value="top_seller">Top Seller</option>
//                                 <option value="featured">Featured</option>
//                                 <option value="custom">Custom</option>
//                             </Input>
//                         </FormGroup>

//                         <FormGroup>
//                             <Label>Link</Label>
//                             <Input
//                                 name="link"
//                                 value={selectedBanner.link}
//                                 onChange={handleEditInputChange}
//                             />
//                         </FormGroup>

//                         <FormGroup>
//                             <Label>Current Image</Label>
//                             {selectedBanner.image && (
//                                 <div style={{ position: "relative", display: "inline-block" }}>
//                                     <img
//                                         src={selectedBanner.image}
//                                         alt="Current"
//                                         style={{ width: "80px", height: "80px", objectFit: "cover" }}
//                                     />
//                                     <FaTrashAlt
//                                         style={{
//                                             position: "absolute",
//                                             top: "-10px",
//                                             right: "-10px",
//                                             cursor: "pointer",
//                                             color: "red",
//                                         }}
//                                         onClick={() =>
//                                             setSelectedBanner({ ...selectedBanner, image: "" })
//                                         }
//                                     />
//                                 </div>
//                             )}
//                         </FormGroup>

//                         <FormGroup>
//                             <Label>Upload New Image</Label>
//                             <Input
//                                 type="file"
//                                 name="image"
//                                 onChange={handleEditFileChange}
//                                 accept="image/*"
//                             />
//                         </FormGroup>
//                     </Form>
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button color="primary" onClick={handleEditBanner}>
//                         Save
//                     </Button>
//                     <Button color="secondary" onClick={closeEditModal}>
//                         Close
//                     </Button>
//                 </ModalFooter>
//             </Modal>
//         </>
//     );
// };

// export default BannerList;


import { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Table,
    Modal,
    Form,
    Spinner,
    InputGroup
} from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";
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
        <div className="pb-5 text-white pt-2">
            <Container fluid className="mt-n4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h3 className="fw-bold mb-0 text-white">Banner Management</h3>
                        <p className="text-secondary small mb-0">Manage website and mobile app banners</p>
                    </div>
                    <Button
                        variant="warning"
                        onClick={openAddModal}
                        className="fw-bold d-flex align-items-center gap-2 px-4 py-2 text-black border-0"
                        style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                    >
                        <FiPlus size={20} /> Add Banner
                    </Button>
                </div>

                <Row>
                    <Col sm="12">
                        <Card className="bg-dark border-secondary border-opacity-10 shadow-lg overflow-hidden" style={{ backgroundColor: '#1E1E1E' }}>
                            <Card.Body className="p-0">
                                <div className="table-responsive">
                                    <Table hover variant="dark" className="mb-0 align-middle custom-table">
                                        <thead className="bg-black bg-opacity-50 text-secondary small text-uppercase">
                                            <tr>
                                                <th className="px-4 py-3 border-secondary border-opacity-10">#</th>
                                                <th className="px-4 py-3 border-secondary border-opacity-10">Banner Image</th>
                                                <th className="px-4 py-3 border-secondary border-opacity-10">Title</th>
                                                <th className="px-4 py-3 border-secondary border-opacity-10">Link</th>
                                                <th className="px-4 py-3 border-secondary border-opacity-10">Type</th>
                                                <th className="px-4 py-3 border-secondary border-opacity-10">Banner Type</th>
                                                <th className="px-4 py-3 border-secondary border-opacity-10">Status</th>
                                                <th className="px-4 py-3 border-secondary border-opacity-10 text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {BannerList?.loading ? (
                                                <tr>
                                                    <td colSpan="8" className="text-center py-5">
                                                        <Spinner animation="border" variant="secondary" />
                                                    </td>
                                                </tr>
                                            ) : BannerList?.data?.length === 0 ? (
                                                <tr>
                                                        <td colSpan="8" className="text-center py-5 text-secondary">
                                                            No banners found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    BannerList.data.map((banner, index) => (
                                                        <tr key={banner.id || index} className="border-secondary border-opacity-10">
                                                            <td className="px-4 py-3 text-secondary">{index + 1}</td>
                                                            <td className="px-4 py-3">
                                                                <img
                                                                    src={
                                                                        banner.image
                                                                            ? `${import.meta.env.VITE_APP_TEACHER_DOC_URL}/uploads/banner/${banner.image}`
                                                                            : "/no-image.png"
                                                                    }
                                                                    alt="Banner"
                                                                    style={{
                                                                        width: "80px",
                                                                        height: "50px",
                                                                        objectFit: "cover",
                                                                        borderRadius: "4px",
                                                                    }}
                                                                    className="border border-secondary border-opacity-25"
                                                                />
                                                            </td>
                                                            <td className="px-4 py-3 text-white fw-medium">{banner.title}</td>
                                                            <td className="px-4 py-3 text-secondary small">{banner.link || "-"}</td>
                                                            <td className="px-4 py-3 text-secondary">{banner.type}</td>
                                                            <td className="px-4 py-3 text-info">{banner.banner_type}</td>
                                                            <td className="px-4 py-3">
                                                                <Switch
                                                                    checked={banner.is_active === 1}
                                                                    onChange={() => handleStatusToggle(banner)}
                                                                    color="warning"
                                                                />
                                                            </td>
                                                            <td className="px-4 py-3 text-end">
                                                                <div className="d-flex justify-content-end gap-2">
                                                                    <Button
                                                                        variant="link"
                                                                        className="p-0 text-info"
                                                                        onClick={() => openEditModal(banner)}
                                                                    >
                                                                        <FiEdit2 size={18} />
                                                                    </Button>
                                                                    <Button
                                                                        variant="link"
                                                                        className="p-0 text-danger"
                                                                        onClick={() => handleDelete(banner.id)}
                                                                    >
                                                                        <FiTrash2 size={18} />
                                                                    </Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* ===== Add Banner Modal ===== */}
            <Modal show={modalOpenAdd} onHide={closeAddModal} centered contentClassName="bg-dark border-secondary border-opacity-25 text-white">
                <Modal.Header closeButton closeVariant="white" className="border-secondary border-opacity-25 bg-black bg-opacity-25">
                    <Modal.Title className="fw-bold">Add Banner</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Title</Form.Label>
                            <Form.Control
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="bg-black border-secondary text-white focus-none"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Device Type</Form.Label>
                            <Form.Select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="bg-black border-secondary text-white focus-none"
                            >
                                <option value="web">Web</option>
                                <option value="mobile">Mobile</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Banner Type</Form.Label>
                            <Form.Select
                                name="banner_type"
                                value={formData.banner_type}
                                onChange={handleInputChange}
                                className="bg-black border-secondary text-white focus-none"
                            >
                                <option value="main_banner">Main Banner</option>
                                <option value="new_arrival">New Arrival</option>
                                <option value="top_seller">Top Seller</option>
                                <option value="featured">Featured</option>
                                <option value="custom">Custom</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Link</Form.Label>
                            <Form.Control
                                name="link"
                                value={formData.link}
                                onChange={handleInputChange}
                                className="bg-black border-secondary text-white focus-none"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Banner Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="bg-black border-secondary text-white focus-none"
                            />
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="mt-3 rounded border border-secondary border-opacity-25"
                                    style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                                />
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-top-0 pt-0">
                    <Button variant="outline-secondary" onClick={closeAddModal} className="border-secondary text-white">
                        Close
                    </Button>
                    <Button
                        onClick={handleAddBanner}
                        className="fw-bold text-black border-0"
                        style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                    >
                        Save Banner
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ===== Edit Banner Modal ===== */}
            <Modal show={modalOpenEdit} onHide={closeEditModal} centered contentClassName="bg-dark border-secondary border-opacity-25 text-white">
                <Modal.Header closeButton closeVariant="white" className="border-secondary border-opacity-25 bg-black bg-opacity-25">
                    <Modal.Title className="fw-bold">Edit Banner</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Title</Form.Label>
                            <Form.Control
                                name="title"
                                value={selectedBanner.title}
                                onChange={handleEditInputChange}
                                className="bg-black border-secondary text-white focus-none"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Device Type</Form.Label>
                            <Form.Select
                                name="type"
                                value={selectedBanner.type}
                                onChange={handleEditInputChange}
                                className="bg-black border-secondary text-white focus-none"
                            >
                                <option value="web">Web</option>
                                <option value="mobile">Mobile</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Banner Type</Form.Label>
                            <Form.Select
                                name="banner_type"
                                value={selectedBanner.banner_type}
                                onChange={handleEditInputChange}
                                className="bg-black border-secondary text-white focus-none"
                            >
                                <option value="main_banner">Main Banner</option>
                                <option value="new_arrival">New Arrival</option>
                                <option value="top_seller">Top Seller</option>
                                <option value="featured">Featured</option>
                                <option value="custom">Custom</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Link</Form.Label>
                            <Form.Control
                                name="link"
                                value={selectedBanner.link}
                                onChange={handleEditInputChange}
                                className="bg-black border-secondary text-white focus-none"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Current Image</Form.Label>
                            <div className="d-flex align-items-center gap-3">
                                {selectedBanner.image && (
                                    <div className="position-relative">
                                        <img
                                            src={selectedBanner.image}
                                            alt="Current"
                                            className="rounded border border-secondary border-opacity-25"
                                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                        />
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill p-1"
                                            style={{ width: "20px", height: "20px", fontSize: "10px" }}
                                            onClick={() => setSelectedBanner({ ...selectedBanner, image: "" })}
                                        >
                                            X
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Upload New Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleEditFileChange}
                                accept="image/*"
                                className="bg-black border-secondary text-white focus-none"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-top-0 pt-0">
                    <Button variant="outline-secondary" onClick={closeEditModal} className="border-secondary text-white">
                        Close
                    </Button>
                    <Button
                        onClick={handleEditBanner}
                        className="fw-bold text-black border-0"
                        style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

            <style>{`
                .bg-dark { background-color: #1E1E1E !important; }
                .border-secondary { border-color: #2D2D2D !important; }
                .custom-table tr:hover { background-color: #1a1a1a !important; }
                .focus-none:focus { background-color: #000 !important; border-color: #fcca0c !important; color: white !important; box-shadow: none !important; }
                .custom-table td { border-bottom: 1px solid #2D2D2D !important; }
            `}</style>
        </div>
    );
};

export default BannerList;
