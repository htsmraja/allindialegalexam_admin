import React, { useEffect } from 'react'
import CommonBreadcrumb from '../../../component/common/bread-crumb'
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Input,
    Row,
    Spinner,
    Table,
} from "reactstrap";
import { useCommonContext } from '../../../helper/CommonProvider';
const QuestionBanks = () => {
    const navigate = useNavigate();
    const onOpenModal = () => navigate("/add-question_bank");
    const { questionBankList, getQuestionBanks } = useCommonContext();
    useEffect(() => {
        getQuestionBanks();
    }, [])
    console.log(questionBankList, "questionBankList")
    return (
        <>
            <CommonBreadcrumb title="Question Bank List" />
            <Container fluid>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <div className="row align-items-center mb-4 justify-content-between">

                                {/* SEARCH */}
                                <div className="col-md-6">
                                    <Input
                                        placeholder="Search Question Bank"
                                        className="form-control"
                                        style={{ boxShadow: "0 0 10px rgba(4, 59, 54, 1)" }}
                                    />
                                </div>

                                {/* ADD BOOK BUTTON */}
                                <div className="col-md-6 d-flex justify-content-end">
                                    <button
                                        onClick={onOpenModal}
                                        className="btn btnGreen"
                                    >
                                        + Add Question Bank
                                    </button>
                                </div>

                            </div>
                            <div className="clearfix"></div>
                            <div className="product-physical">
                                <div className="promo-code-list">
                                    <Table hover responsive bordered>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Exam Type</th>
                                                <th>Question Bank Type</th>
                                                <th>Created By</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {/* LOADING */}
                                            {questionBankList.loading && (
                                                <tr>
                                                    <td colSpan="10" className="text-center">
                                                        <Spinner />
                                                    </td>
                                                </tr>
                                            )}

                                            {/* EMPTY */}
                                            {!questionBankList.loading && questionBankList.data?.length === 0 && (
                                                <tr>
                                                    <td colSpan="10" className="text-center">
                                                        No Books Found
                                                    </td>
                                                </tr>
                                            )}

                                            {/* DATA LIST */}
                                            {!questionBankList.loading && questionBankList.data?.map((item) => (
                                                <tr key={item.id}>
                                                    <td>Qn Bank Id:{item.id}</td>
                                                    <td>{item.title}</td>
                                                    <td>{item.exam_type_name}</td>
                                                    <td>{item.question_bank_type_name}</td>
                                                    <td>{item.created_by_name}</td>
                                                    <td>{item.is_active === 1 ? "Active" : "Inactive"}</td>
                                                    {/* ACTIONS */}
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <Button
                                                                color="primary"
                                                                size="sm"
                                                                onClick={() => navigate(`/edit-question_bank/${item.id}`)}
                                                            >
                                                                Edit
                                                            </Button>

                                                            <Button
                                                                color="danger"
                                                                size="sm"
                                                                onClick={() => console.log("Delete", item.id)}
                                                            >
                                                                Delete
                                                            </Button>

                                                            <Button
                                                                color="primary"
                                                                size="sm"
                                                                onClick={() => navigate(`/question-list/${item.id}`)}
                                                            >
                                                                Question List
                                                            </Button>
                                                        </div>
                                                    </td>


                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Container>
        </>
    )
}

export default QuestionBanks