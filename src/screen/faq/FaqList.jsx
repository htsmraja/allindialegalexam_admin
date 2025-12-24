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
    Spinner
} from "reactstrap";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { Collapse, CardHeader } from "reactstrap";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCommonContext } from "../../helper/CommonProvider";

const FaqList = () => {
    const { getFaqList, FaqList, addFaq, deleteFaq, editFaq } = useCommonContext();

    const [activeIndex, setActiveIndex] = useState(null);
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

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const onOpenModal = () => {
        setOpen(true);
    };
    const onCloseModal = () => {
        setOpen(false);
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
        <>
            <CommonBreadcrumb title="FAQ List" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="primary" onClick={onOpenModal}>
                                        Add Question
                                    </Button>
                                </div>
                                <div className="clearfix"></div>
                                <div id="basicScenario" className="product-physical">
                                    {FaqList?.loading && (
                                        <div className="d-flex justify-content-center align-items-center">
                                            <Spinner color="secondary" className="my-4" />
                                        </div>
                                    )}
                                    {Array.isArray(FaqList?.data) &&
                                        FaqList?.data?.map((faq, index) => (
                                            <Card
                                                key={index}
                                                className="mb-3 shadow-lg border-0 faq-card"
                                                style={{ borderRadius: "12px", backgroundColor: "#ffffff" }}
                                            >
                                                <CardHeader
                                                    style={{
                                                        background: activeIndex === index ? "#f1f3f5" : "#f8f9fa",
                                                        cursor: "pointer",
                                                        padding: "1.25rem",
                                                        fontWeight: "bold",
                                                    }}
                                                    className="d-flex justify-content-between align-items-center"
                                                >
                                                    <Button
                                                        color="link"
                                                        className="p-0 text-dark faq-toggle-btn"
                                                        aria-expanded={activeIndex === index}
                                                        onClick={() => toggle(index)}
                                                        style={{ marginRight: "10px" }}
                                                    >
                                                        {activeIndex === index ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}
                                                    </Button>
                                                    <span style={{ flex: 1, textAlign: "left", marginLeft: "10px", fontSize: "15px" }}>
                                                        {faq.question}
                                                    </span>
                                                    <div className="d-flex align-items-center">
                                                        <FaEdit
                                                            size={20}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onOpenModal2(faq);
                                                            }}
                                                            style={{ marginRight: "10px", cursor: "pointer" }}
                                                        />
                                                        <AiOutlineDelete
                                                            size={20}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(faq.id);
                                                            }}
                                                            style={{ marginRight: "10px", cursor: "pointer" }}
                                                        />
                                                    </div>
                                                </CardHeader>
                                                <Collapse isOpen={activeIndex === index}>
                                                    <div className="card-body" style={{ padding: "1.25rem" }}>
                                                        <p className="text-muted">{faq.answer}</p>
                                                    </div>
                                                </Collapse>
                                            </Card>
                                        ))}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Modal isOpen={open} toggle={onCloseModal} className="modal-lg">
                    <ModalHeader toggle={onCloseModal}>
                        <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                            Add FAQ
                        </h5>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label htmlFor="question" className="col-form-label">
                                    Add Question:
                                </Label>
                                <Input type="text" name="question" value={formData.question} onChange={handleInputChange} id="question" />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="answer" className="col-form-label">
                                    Add Answer:
                                </Label>
                                <Input
                                    type="textarea"
                                    name="answer"
                                    value={formData.answer}
                                    onChange={handleInputChange}
                                    id="answer"
                                    style={{ minHeight: "80px" }}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button color="secondary" onClick={onCloseModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={modalOpen} toggle={onCloseModal2}>
                    <ModalHeader toggle={onCloseModal2}>
                        <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                            Edit FAQ
                        </h5>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label htmlFor="question" className="col-form-label">
                                    Question:
                                </Label>
                                <Input
                                    type="text"
                                    name="question"
                                    value={editFormData.question}
                                    onChange={handleEditInputChange}
                                    id="question"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="answer" className="col-form-label">
                                    Answer:
                                </Label>
                                <Input
                                    type="textarea"
                                    name="answer"
                                    value={editFormData.answer}
                                    onChange={handleEditInputChange}
                                    id="answer"
                                    style={{ minHeight: "80px" }}
                                />
                            </FormGroup>
                            {/* <FormGroup>
                <Label className="col-form-label">Status:</Label>
                <div className="d-flex justify-content-start mt-2">
                  <FormGroup check className="me-3">
                    <Label check>
                      <Input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={editFormData.status === "Active"}
                        onChange={handleEditInputChange}
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
                        checked={editFormData.status === "Inactive"}
                        onChange={handleEditInputChange}
                      />
                      Inactive
                    </Label>
                  </FormGroup>
                </div>
              </FormGroup> */}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleEditSubmit}>
                            Save Changes
                        </Button>
                        <Button color="secondary" onClick={onCloseModal2}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </>
    );
};

export default FaqList;
