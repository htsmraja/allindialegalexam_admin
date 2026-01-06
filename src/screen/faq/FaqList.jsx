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
//     Spinner
// } from "reactstrap";
// import { useEffect, useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { AiOutlineDelete } from "react-icons/ai";
// import { FaChevronRight, FaChevronDown } from "react-icons/fa";
// import { Collapse, CardHeader } from "reactstrap";
// import CommonBreadcrumb from "../../component/common/bread-crumb";
// import { useCommonContext } from "../../helper/CommonProvider";

// const FaqList = () => {
//     const { getFaqList, FaqList, addFaq, deleteFaq, editFaq } = useCommonContext();

//     const [activeIndex, setActiveIndex] = useState(null);
//     const [open, setOpen] = useState(false);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [formData, setFormData] = useState({ question: "", answer: "" });
//     const [selectedvarity, setSelectedvarity] = useState({
//         question: "",
//         answer: "",
//         status: "",
//         _id: "",
//     });
//     const [editFormData, setEditFormData] = useState({
//         question: "",
//         answer: "",
//         status: "",
//     });

//     useEffect(() => {
//         getFaqList();
//     }, []);

//     const toggle = (index) => {
//         setActiveIndex(activeIndex === index ? null : index);
//     };

//     const onOpenModal = () => {
//         setOpen(true);
//     };
//     const onCloseModal = () => {
//         setOpen(false);
//     };

//     const onOpenModal2 = (product) => {
//         setSelectedvarity(product);
//         setEditFormData({
//             question: product.question,
//             answer: product.answer,
//             status: product.status,
//         });
//         setModalOpen(true);
//     };

//     const onCloseModal2 = () => {
//         setModalOpen(false);
//     };

//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you wish to delete this item?")) {
//             deleteFaq(id);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleEditInputChange = (e) => {
//         const { name, value } = e.target;
//         setEditFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = () => {
//         addFaq(formData);
//         onCloseModal();
//     };

//     const handleEditSubmit = () => {
//         editFaq(selectedvarity.id, editFormData);
//         onCloseModal2();
//     };

//     return (
//         <>
//             <CommonBreadcrumb title="FAQ List" />
//             <Container fluid>
//                 <Row>
//                     <Col sm="12">
//                         <Card>
//                             <CardBody>
//                                 <div className="btn-popup pull-right">
//                                     <Button color="primary" onClick={onOpenModal}>
//                                         Add Question
//                                     </Button>
//                                 </div>
//                                 <div className="clearfix"></div>
//                                 <div id="basicScenario" className="product-physical">
//                                     {FaqList?.loading && (
//                                         <div className="d-flex justify-content-center align-items-center">
//                                             <Spinner color="secondary" className="my-4" />
//                                         </div>
//                                     )}
//                                     {Array.isArray(FaqList?.data) &&
//                                         FaqList?.data?.map((faq, index) => (
//                                             <Card
//                                                 key={index}
//                                                 className="mb-3 shadow-lg border-0 faq-card"
//                                                 style={{ borderRadius: "12px", backgroundColor: "#ffffff" }}
//                                             >
//                                                 <CardHeader
//                                                     style={{
//                                                         background: activeIndex === index ? "#f1f3f5" : "#f8f9fa",
//                                                         cursor: "pointer",
//                                                         padding: "1.25rem",
//                                                         fontWeight: "bold",
//                                                     }}
//                                                     className="d-flex justify-content-between align-items-center"
//                                                 >
//                                                     <Button
//                                                         color="link"
//                                                         className="p-0 text-dark faq-toggle-btn"
//                                                         aria-expanded={activeIndex === index}
//                                                         onClick={() => toggle(index)}
//                                                         style={{ marginRight: "10px" }}
//                                                     >
//                                                         {activeIndex === index ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}
//                                                     </Button>
//                                                     <span style={{ flex: 1, textAlign: "left", marginLeft: "10px", fontSize: "15px" }}>
//                                                         {faq.question}
//                                                     </span>
//                                                     <div className="d-flex align-items-center">
//                                                         <FaEdit
//                                                             size={20}
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation();
//                                                                 onOpenModal2(faq);
//                                                             }}
//                                                             style={{ marginRight: "10px", cursor: "pointer" }}
//                                                         />
//                                                         <AiOutlineDelete
//                                                             size={20}
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation();
//                                                                 handleDelete(faq.id);
//                                                             }}
//                                                             style={{ marginRight: "10px", cursor: "pointer" }}
//                                                         />
//                                                     </div>
//                                                 </CardHeader>
//                                                 <Collapse isOpen={activeIndex === index}>
//                                                     <div className="card-body" style={{ padding: "1.25rem" }}>
//                                                         <p className="text-muted">{faq.answer}</p>
//                                                     </div>
//                                                 </Collapse>
//                                             </Card>
//                                         ))}
//                                 </div>
//                             </CardBody>
//                         </Card>
//                     </Col>
//                 </Row>

//                 <Modal isOpen={open} toggle={onCloseModal} className="modal-lg">
//                     <ModalHeader toggle={onCloseModal}>
//                         <h5 className="modal-title f-w-600" id="exampleModalLabel2">
//                             Add FAQ
//                         </h5>
//                     </ModalHeader>
//                     <ModalBody>
//                         <Form>
//                             <FormGroup>
//                                 <Label htmlFor="question" className="col-form-label">
//                                     Add Question:
//                                 </Label>
//                                 <Input type="text" name="question" value={formData.question} onChange={handleInputChange} id="question" />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label htmlFor="answer" className="col-form-label">
//                                     Add Answer:
//                                 </Label>
//                                 <Input
//                                     type="textarea"
//                                     name="answer"
//                                     value={formData.answer}
//                                     onChange={handleInputChange}
//                                     id="answer"
//                                     style={{ minHeight: "80px" }}
//                                 />
//                             </FormGroup>
//                         </Form>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button color="primary" onClick={handleSubmit}>
//                             Save
//                         </Button>
//                         <Button color="secondary" onClick={onCloseModal}>
//                             Close
//                         </Button>
//                     </ModalFooter>
//                 </Modal>

//                 <Modal isOpen={modalOpen} toggle={onCloseModal2}>
//                     <ModalHeader toggle={onCloseModal2}>
//                         <h5 className="modal-title f-w-600" id="exampleModalLabel2">
//                             Edit FAQ
//                         </h5>
//                     </ModalHeader>
//                     <ModalBody>
//                         <Form>
//                             <FormGroup>
//                                 <Label htmlFor="question" className="col-form-label">
//                                     Question:
//                                 </Label>
//                                 <Input
//                                     type="text"
//                                     name="question"
//                                     value={editFormData.question}
//                                     onChange={handleEditInputChange}
//                                     id="question"
//                                 />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label htmlFor="answer" className="col-form-label">
//                                     Answer:
//                                 </Label>
//                                 <Input
//                                     type="textarea"
//                                     name="answer"
//                                     value={editFormData.answer}
//                                     onChange={handleEditInputChange}
//                                     id="answer"
//                                     style={{ minHeight: "80px" }}
//                                 />
//                             </FormGroup>
//                             {/* <FormGroup>
//                 <Label className="col-form-label">Status:</Label>
//                 <div className="d-flex justify-content-start mt-2">
//                   <FormGroup check className="me-3">
//                     <Label check>
//                       <Input
//                         type="radio"
//                         name="status"
//                         value="Active"
//                         checked={editFormData.status === "Active"}
//                         onChange={handleEditInputChange}
//                       />
//                       Active
//                     </Label>
//                   </FormGroup>
//                   <FormGroup check>
//                     <Label check>
//                       <Input
//                         type="radio"
//                         name="status"
//                         value="Inactive"
//                         checked={editFormData.status === "Inactive"}
//                         onChange={handleEditInputChange}
//                       />
//                       Inactive
//                     </Label>
//                   </FormGroup>
//                 </div>
//               </FormGroup> */}
//                         </Form>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button color="primary" onClick={handleEditSubmit}>
//                             Save Changes
//                         </Button>
//                         <Button color="secondary" onClick={onCloseModal2}>
//                             Close
//                         </Button>
//                     </ModalFooter>
//                 </Modal>
//             </Container>
//         </>
//     );
// };

// export default FaqList;
import { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Modal,
    Form,
    Accordion,
    Spinner
} from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FiPlus, FiTrash2, FiEdit2, FiHelpCircle } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCommonContext } from "../../helper/CommonProvider";

const FaqList = () => {
    const { getFaqList, FaqList, addFaq, deleteFaq, editFaq } = useCommonContext();

    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({ question: "", answer: "" });
    const [selectedvarity, setSelectedvarity] = useState({
        question: "",
        answer: "",
        status: "",
        _id: "",
    });
    const [editFormData, setEditFormData] = useState({
        question: "",
        answer: "",
        status: "",
    });

    useEffect(() => {
        getFaqList();
    }, []);

    const onOpenModal = () => {
        setOpen(true);
    };
    const onCloseModal = () => {
        setOpen(false);
        setFormData({ question: "", answer: "" });
    };

    const onOpenModal2 = (product) => {
        setSelectedvarity(product);
        setEditFormData({
            question: product.question,
            answer: product.answer,
            status: product.status,
        });
        setModalOpen(true);
    };

    const onCloseModal2 = () => {
        setModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you wish to delete this item?")) {
            deleteFaq(id);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        addFaq(formData);
        onCloseModal();
    };

    const handleEditSubmit = () => {
        editFaq(selectedvarity.id, editFormData);
        onCloseModal2();
    };

    return (
        <div className="pb-5 text-white pt-2">
            <Container fluid className="mt-n4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h3 className="fw-bold mb-0 text-white">FAQ Management</h3>
                        <p className="text-secondary small mb-0">Manage frequently asked questions</p>
                    </div>
                    <Button
                        variant="warning"
                        onClick={onOpenModal}
                        className="fw-bold d-flex align-items-center gap-2 px-4 py-2 text-black border-0"
                        style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                    >
                        <FiPlus size={20} /> Add Question
                    </Button>
                </div>

                <Row>
                    <Col sm="12">
                        <Card className="bg-dark border-secondary border-opacity-10 shadow-lg" style={{ backgroundColor: '#1E1E1E' }}>
                            <Card.Body>
                                {FaqList?.loading ? (
                                    <div className="d-flex justify-content-center align-items-center py-5">
                                        <Spinner animation="border" variant="secondary" />
                                    </div>
                                ) : FaqList?.data?.length === 0 ? (
                                    <div className="text-center py-5 text-secondary">
                                        <FiHelpCircle size={48} className="mb-3 opacity-25" />
                                        <p>No FAQs found</p>
                                    </div>
                                    ) : (
                                        <Accordion className="custom-accordion">
                                            {Array.isArray(FaqList?.data) &&
                                                FaqList?.data?.map((faq, index) => (
                                                    <Accordion.Item
                                                        eventKey={index.toString()}
                                                        key={index}
                                                        className="mb-3 border border-secondary border-opacity-25 rounded overflow-hidden"
                                                        style={{ backgroundColor: '#2b2b2b' }}
                                                    >
                                                        <Accordion.Header className="custom-accordion-header">
                                                            <div className="d-flex justify-content-between align-items-center w-100 pe-3">
                                                                <span className="fw-medium text-white">{faq.question}</span>
                                                                <div className="d-flex align-items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                                                    <Button
                                                                        variant="link"
                                                                        className="p-1 text-info"
                                                                        onClick={() => onOpenModal2(faq)}
                                                                    >
                                                                        <FiEdit2 size={18} />
                                                                    </Button>
                                                                    <Button
                                                                        variant="link"
                                                                        className="p-1 text-danger"
                                                                        onClick={() => handleDelete(faq.id)}
                                                                    >
                                                                        <FiTrash2 size={18} />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </Accordion.Header>
                                                        <Accordion.Body className="text-secondary border-top border-secondary border-opacity-25" style={{ backgroundColor: '#1E1E1E' }}>
                                                            {faq.answer}
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                ))}
                                    </Accordion>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Add Modal */}
                <Modal show={open} onHide={onCloseModal} centered contentClassName="bg-dark border-secondary border-opacity-25 text-white">
                    <Modal.Header closeButton closeVariant="white" className="border-secondary border-opacity-25 bg-black bg-opacity-25">
                        <Modal.Title className="fw-bold">Add FAQ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="small text-secondary fw-bold">Question</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="question"
                                    value={formData.question}
                                    onChange={handleInputChange}
                                    className="bg-black border-secondary text-white focus-none"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="small text-secondary fw-bold">Answer</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="answer"
                                    value={formData.answer}
                                    onChange={handleInputChange}
                                    className="bg-black border-secondary text-white focus-none"
                                />
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
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit Modal */}
                <Modal show={modalOpen} onHide={onCloseModal2} centered contentClassName="bg-dark border-secondary border-opacity-25 text-white">
                    <Modal.Header closeButton closeVariant="white" className="border-secondary border-opacity-25 bg-black bg-opacity-25">
                        <Modal.Title className="fw-bold">Edit FAQ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="small text-secondary fw-bold">Question</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="question"
                                    value={editFormData.question}
                                    onChange={handleEditInputChange}
                                    className="bg-black border-secondary text-white focus-none"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="small text-secondary fw-bold">Answer</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="answer"
                                    value={editFormData.answer}
                                    onChange={handleEditInputChange}
                                    className="bg-black border-secondary text-white focus-none"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="border-top-0 pt-0">
                        <Button variant="outline-secondary" onClick={onCloseModal2} className="border-secondary text-white">
                            Close
                        </Button>
                        <Button
                            onClick={handleEditSubmit}
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
                    .focus-none:focus { background-color: #000 !important; border-color: #fcca0c !important; color: white !important; box-shadow: none !important; }
                    .custom-accordion .accordion-button { background-color: #2b2b2b !important; color: white !important; box-shadow: none !important; }
                    .custom-accordion .accordion-button:not(.collapsed) { background-color: #2b2b2b !important; color: #fcca0c !important; }
                    .custom-accordion .accordion-button::after { filter: invert(1) grayscale(100%) brightness(200%); }
                    .custom-accordion .accordion-button:not(.collapsed)::after { filter: sepia(100%) saturate(2000%) hue-rotate(0deg) brightness(100%) contrast(100%); }
                `}</style>
            </Container>
        </div>
    );
};

export default FaqList;
