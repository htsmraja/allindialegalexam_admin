// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/rules-of-hooks */
// import {
//     ArcElement,
//     BarController,
//     BarElement,
//     CategoryScale,
//     Chart as ChartJS,
//     Filler,
//     Legend,
//     LineElement,
//     LinearScale,
//     PointElement,
//     RadialLinearScale,
//     Title,
//     Tooltip,
// } from "chart.js";
// import {
//     Badge,
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
//     Table,
// } from "reactstrap";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEdit } from "react-icons/fa";
// import { AiOutlineDelete } from "react-icons/ai";
// import { FaTrashAlt } from "react-icons/fa";
// import { HexColorPicker } from "react-colorful";
// // Register the necessary Chart.js components
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     BarController,
//     BarElement,
//     ArcElement,
//     Filler,
//     RadialLinearScale
// );

// import { Spinner } from "reactstrap";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { toast } from "react-toastify";
// import { useCommonContext } from "../../helper/CommonProvider";
// import CommonBreadcrumb from "../../component/common/bread-crumb";
// const CmsList = () => {
//     const navigate = useNavigate();

//     const { getCmsList, cmsList, addCms, deleteCms, editcms } = useCommonContext();

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//     });

//     const [open, setOpen] = useState(false);
//     const [modalOpen, setModalOpen] = useState(false);

//     const [selectedvarity, setSelectedvarity] = useState({
//         title: "",
//         description: "",
//         status: "",
//         id: "",
//     });

//     useEffect(() => {
//         getCmsList();
//     }, []);

//     const onOpenModal = () => {
//         setOpen(true);
//     };
//     const onOpenModal2 = (product) => {
//         setSelectedvarity(product);
//         setModalOpen(true);
//     };

//     // Close the modal
//     const onCloseModal2 = () => {
//         setModalOpen(false);
//         setSelectedvarity({ title: "", image: "", id: "" });
//     };

//     const onCloseModal = () => {
//         setOpen(false);
//     };

//     const handleStatusToggle = async (product) => {
//         const newStatus = product.status === "Active" ? "Inactive" : "Active";
//         // await switchBagtype(product._id, newStatus); // Your API call here
//     };

//     // Handle form input change
//     const handleInputChanges = (e) => {
//         const { name, value } = e.target;
//         setSelectedvarity((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     // Handle submit for updating the brand
//     const handleSubmits = () => {
//         editcms(selectedvarity.id, selectedvarity);
//         onCloseModal2();
//     };

//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you wish to delete this item?")) {
//             // delete product logic here
//             console.log(id, "id")
//             deleteCms(id);
//         }
//     };

//     // Handle input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleDescriptionChange = (value) => {
//         setFormData((prevState) => ({
//             ...prevState,
//             description: value,
//         }));
//     };

//     // Handle form submission
//     const handleSubmit = () => {
//         if (!formData.title) {
//             toast.error("Title is required!");
//             return;
//         }
//         if (!formData.description) {
//             toast.error("Description is required!");
//             return;
//         }
//         addCms(formData);
//         setFormData("")
//         onCloseModal();
//     };


//     return (
//         <>
//             <CommonBreadcrumb title="CMS List" />
//             <Container fluid>
//                 <Row>
//                     <Col sm="12">
//                         <Card>
//                             <CardBody>
//                                 <div className="btn-popup pull-right">
//                                     <Button color="primary" onClick={onOpenModal}>
//                                         Add CMS
//                                     </Button>
//                                 </div>
//                                 <div className="clearfix"></div>
//                                 <div id="basicScenario" className="product-physical">
//                                     <Table striped responsive>
//                                         <thead>
//                                             <tr>
//                                                 <th>Title</th>

//                                                 <th>Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {cmsList?.loading ? (
//                                                 <tr>
//                                                     <td colSpan="4" className="text-center">
//                                                         <Spinner color="secondary" className="my-4" />
//                                                     </td>
//                                                 </tr>
//                                             ) : cmsList?.data?.length === 0 ? (
//                                                 <tr>
//                                                     <td colSpan="4" className="text-center">
//                                                         No Data Found
//                                                     </td>
//                                                 </tr>
//                                             ) : (
//                                                 cmsList?.data?.map((product, index) => (
//                                                     <tr key={index}>
//                                                         <td>{product.title}</td>

//                                                         <td>
//                                                             <div className="circelBtnBx">
//                                                                 <Button
//                                                                     className="btn"
//                                                                     color="link"
//                                                                     onClick={() => onOpenModal2(product)}
//                                                                 >
//                                                                     <FaEdit />
//                                                                 </Button>
//                                                                 <Button
//                                                                     className="btn"
//                                                                     color="link"
//                                                                     onClick={() => handleDelete(product.id)}
//                                                                 >
//                                                                     <FaTrashAlt />
//                                                                 </Button>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 ))
//                                             )}
//                                         </tbody>
//                                     </Table>
//                                 </div>
//                             </CardBody>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>

//             <Modal
//                 isOpen={open}
//                 toggle={onCloseModal}
//                 className="modal-lg" // Increases the width
//             >
//                 <ModalHeader toggle={onCloseModal}>
//                     <h5 className="modal-title f-w-600" id="exampleModalLabel2">
//                         Add CMS
//                     </h5>
//                 </ModalHeader>
//                 <ModalBody>
//                     {" "}
//                     {/* Scroll in Y-axis */}
//                     <Form>
//                         <FormGroup>
//                             <Label htmlFor="title" className="col-form-label">
//                                 Title :
//                             </Label>
//                             <Input
//                                 type="text"
//                                 name="title"
//                                 value={formData.title}
//                                 onChange={handleInputChange}
//                                 id="title"
//                             />
//                         </FormGroup>

//                         <FormGroup>
//                             <div className="mb-4">
//                                 <label htmlFor="description" className="form-label mb-1">
//                                     Description:
//                                 </label>
//                                 <ReactQuill
//                                     id="description"
//                                     name="description"
//                                     value={formData.description}
//                                     onChange={handleDescriptionChange}
//                                     theme="snow"
//                                     placeholder="Enter a detailed description"
//                                     style={{
//                                         borderRadius: "8px",
//                                         height: "200px",
//                                         boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
//                                         overflow: "hidden",
//                                     }}
//                                 />
//                                 <small className="form-text text-muted">
//                                     Describe your content in detail to attract viewers.
//                                 </small>
//                             </div>
//                         </FormGroup>
//                     </Form>
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button color="primary" onClick={handleSubmit}>
//                         Save
//                     </Button>
//                     <Button color="secondary" onClick={onCloseModal}>
//                         Close
//                     </Button>
//                 </ModalFooter>
//             </Modal>

//             <Modal
//                 isOpen={modalOpen}
//                 toggle={onCloseModal2}
//                 className="modal-lg"
//                 style={{ maxWidth: "800px" }}
//             >
//                 <ModalHeader toggle={onCloseModal2}>
//                     <h5 className="modal-title f-w-600" id="exampleModalLabel2">
//                         Edit CMS
//                     </h5>
//                 </ModalHeader>
//                 <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
//                     <Form>
//                         <FormGroup>
//                             <Label htmlFor="title" className="col-form-label">
//                                 Title:
//                             </Label>
//                             <Input
//                                 type="text"
//                                 name="title"
//                                 value={selectedvarity.title}
//                                 onChange={handleInputChanges}
//                                 id="title"
//                             />
//                         </FormGroup>

//                         <FormGroup>
//                             <div className="mb-4">
//                                 <label htmlFor="description" className="form-label mb-1">
//                                     Description:
//                                 </label>
//                                 <ReactQuill
//                                     id="description"
//                                     name="description"
//                                     value={selectedvarity.description}
//                                     onChange={(value) =>
//                                         setSelectedvarity({ ...selectedvarity, description: value })
//                                     }
//                                     theme="snow"
//                                     className="form-control"
//                                     placeholder="Enter a detailed description"
//                                     style={{
//                                         borderRadius: "8px",
//                                         height: "300px",
//                                         boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
//                                         overflow: "hidden",
//                                     }}
//                                 />
//                                 <small className="form-text text-muted">
//                                     Describe your content in detail to attract viewers.
//                                 </small>
//                             </div>
//                         </FormGroup>

//                         <FormGroup>
//                             <Label htmlFor="title" className="col-form-label">
//                                 Status:
//                             </Label>
//                             <div className="d-flex justify-content-start mt-2">
//                                 <FormGroup check className="me-3">
//                                     <Label check>
//                                         <Input
//                                             type="radio"
//                                             name="status"
//                                             value="Active"
//                                             checked={selectedvarity.status === "Active"} // Check if the value matches 'Active'
//                                             onChange={handleInputChanges}
//                                         />
//                                         Active
//                                     </Label>
//                                 </FormGroup>
//                                 <FormGroup check className="me-3">
//                                     <Label check>
//                                         <Input
//                                             type="radio"
//                                             name="status"
//                                             value="Inactive"
//                                             checked={selectedvarity.status === "Inactive"}
//                                             onChange={handleInputChanges}
//                                         />
//                                         Inactive
//                                     </Label>
//                                 </FormGroup>
//                             </div>
//                         </FormGroup>
//                     </Form>
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button color="primary" onClick={handleSubmits}>
//                         Save
//                     </Button>
//                     <Button color="secondary" onClick={onCloseModal2}>
//                         Close
//                     </Button>
//                 </ModalFooter>
//             </Modal>
//         </>
//     );
// };

// export default CmsList;
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Table,
    Modal,
    Form,
    Spinner
} from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FiPlus, FiTrash2, FiEdit2, FiFileText } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useCommonContext } from "../../helper/CommonProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";

const CmsList = () => {
    const navigate = useNavigate();
    const { getCmsList, cmsList, addCms, deleteCms, editcms } = useCommonContext();
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedvarity, setSelectedvarity] = useState({
        title: "",
        description: "",
        status: "",
        id: "",
    });

    useEffect(() => {
        getCmsList();
    }, []);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const onOpenModal2 = (product) => {
        setSelectedvarity(product);
        setModalOpen(true);
    };
    const onCloseModal2 = () => {
        setModalOpen(false);
        setSelectedvarity({ title: "", description: "", status: "", id: "" });
    };

    const handleInputChanges = (e) => {
        const { name, value } = e.target;
        setSelectedvarity((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmits = () => {
        editcms(selectedvarity.id, selectedvarity);
        onCloseModal2();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you wish to delete this item?")) {
            deleteCms(id);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDescriptionChange = (value) => {
        setFormData((prevState) => ({ ...prevState, description: value }));
    };

    const handleSubmit = () => {
        if (!formData.title) {
            toast.error("Title is required!");
            return;
        }
        if (!formData.description) {
            toast.error("Description is required!");
            return;
        }
        addCms(formData);
        setFormData({ title: "", description: "" });
        onCloseModal();
    };

    return (
        <div className="pb-5 text-white pt-2">
            <Container fluid className="mt-n4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h3 className="fw-bold mb-0 text-white">CMS Management</h3>
                        <p className="text-secondary small mb-0">Manage content pages and policies</p>
                    </div>
                    <Button
                        variant="warning"
                        onClick={onOpenModal}
                        className="fw-bold d-flex align-items-center gap-2 px-4 py-2 text-black border-0"
                        style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                    >
                        <FiPlus size={20} /> Add CMS
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
                                                <th className="px-4 py-3 border-secondary border-opacity-10">Title</th>
                                                <th className="px-4 py-3 border-secondary border-opacity-10 text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cmsList?.loading ? (
                                                <tr>
                                                    <td colSpan="2" className="text-center py-5">
                                                        <Spinner animation="border" variant="secondary" />
                                                    </td>
                                                </tr>
                                            ) : cmsList?.data?.length === 0 ? (
                                                <tr>
                                                        <td colSpan="2" className="text-center py-5 text-secondary">
                                                            <div className="d-flex flex-column align-items-center">
                                                                <FiFileText size={48} className="mb-3 opacity-25" />
                                                                <p>No CMS pages found</p>
                                                            </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                cmsList?.data?.map((product, index) => (
                                                    <tr key={index} className="border-secondary border-opacity-10">
                                                        <td className="px-4 py-3 text-white fw-medium">{product.title}</td>
                                                        <td className="px-4 py-3 text-end">
                                                            <div className="d-flex justify-content-end gap-2">
                                                                <Button
                                                                    variant="link"
                                                                    className="p-0 text-info"
                                                                    onClick={() => onOpenModal2(product)}
                                                                >
                                                                    <FiEdit2 size={18} />
                                                                </Button>
                                                                <Button
                                                                    variant="link"
                                                                    className="p-0 text-danger"
                                                                    onClick={() => handleDelete(product.id)}
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

            {/* Add CMS Modal */}
            <Modal show={open} onHide={onCloseModal} size="lg" centered contentClassName="bg-dark border-secondary border-opacity-25 text-white">
                <Modal.Header closeButton closeVariant="white" className="border-secondary border-opacity-25 bg-black bg-opacity-25">
                    <Modal.Title className="fw-bold">Add CMS Page</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="bg-black border-secondary text-white focus-none"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Description</Form.Label>
                            <div className="bg-white rounded text-black overflow-hidden">
                                <ReactQuill
                                    theme="snow"
                                    value={formData.description}
                                    onChange={handleDescriptionChange}
                                    placeholder="Enter detailed description..."
                                    style={{ height: "300px", marginBottom: "50px" }}
                                />
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-top-0 pt-0">
                    <Button variant="outline-secondary" onClick={onCloseModal} className="border-secondary text-white">
                        Close
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="fw-bold text-black border-0"
                        style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                    >
                        Save Page
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit CMS Modal */}
            <Modal show={modalOpen} onHide={onCloseModal2} size="lg" centered contentClassName="bg-dark border-secondary border-opacity-25 text-white">
                <Modal.Header closeButton closeVariant="white" className="border-secondary border-opacity-25 bg-black bg-opacity-25">
                    <Modal.Title className="fw-bold">Edit CMS Page</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={selectedvarity.title}
                                onChange={handleInputChanges}
                                className="bg-black border-secondary text-white focus-none"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Description</Form.Label>
                            <div className="bg-white rounded text-black overflow-hidden">
                                <ReactQuill
                                    theme="snow"
                                    value={selectedvarity.description}
                                    onChange={(value) => setSelectedvarity({ ...selectedvarity, description: value })}
                                    placeholder="Enter detailed description..."
                                    style={{ height: "300px", marginBottom: "50px" }}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="small text-secondary fw-bold">Status</Form.Label>
                            <div className="d-flex gap-3">
                                <Form.Check
                                    type="radio"
                                    label="Active"
                                    name="status"
                                    value="Active"
                                    checked={selectedvarity.status === "Active"}
                                    onChange={handleInputChanges}
                                    className="text-white"
                                />
                                <Form.Check
                                    type="radio"
                                    label="Inactive"
                                    name="status"
                                    value="Inactive"
                                    checked={selectedvarity.status === "Inactive"}
                                    onChange={handleInputChanges}
                                    className="text-white"
                                />
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-top-0 pt-0">
                    <Button variant="outline-secondary" onClick={onCloseModal2} className="border-secondary text-white">
                        Close
                    </Button>
                    <Button
                        onClick={handleSubmits}
                        className="fw-bold text-black border-0"
                        style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                    >
                        Update Page
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

export default CmsList;
