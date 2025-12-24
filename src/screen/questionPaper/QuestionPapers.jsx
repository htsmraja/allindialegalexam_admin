import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCommonContext } from "../../helper/CommonProvider";

const QuestionPaperList = () => {
    const navigate = useNavigate();
    const { getQuestionPaperList, questionPaperList } = useCommonContext();

    useEffect(() => {
        getQuestionPaperList();
    }, []);
    return (
        <>
            <CommonBreadcrumb title="Question Papers" />

            <Container fluid>
                <Col sm="12">
                    <Card>
                        <CardBody>

                            {/* Header */}
                            <div className="row align-items-center mb-4 justify-content-between">
                                <div className="col-md-6">
                                    <Input
                                        placeholder="Search Paper..."
                                        className="form-control"
                                        style={{ boxShadow: "0 0 10px rgba(4, 59, 54, 1)" }}
                                    />
                                </div>

                                <div className="col-md-6 d-flex justify-content-end">
                                    <button
                                        onClick={() => navigate("/add-question-paper")}
                                        className="btn btnGreen"
                                    >
                                        + Create Question Paper
                                    </button>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="product-physical">
                                <Table hover responsive bordered>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Exam Type</th>
                                            <th>Total Marks</th>
                                            <th>Duration</th>
                                            <th>Created By</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {questionPaperList.loading && (
                                            <tr>
                                                <td colSpan="10" className="text-center">
                                                    <Spinner />
                                                </td>
                                            </tr>
                                        )}

                                        {!questionPaperList.loading &&
                                            questionPaperList.data?.length === 0 && (
                                                <tr>
                                                    <td colSpan="10" className="text-center">
                                                        No Papers Found
                                                    </td>
                                                </tr>
                                            )}

                                        {!questionPaperList.loading &&
                                            questionPaperList.data?.map((item) => (
                                                <tr key={item.id}>
                                                    <td>P-{item.id}</td>
                                                    <td>{item.title}</td>
                                                    <td>{item.exam_type_name}</td>
                                                    <td>{item.total_marks}</td>
                                                    <td>{item.total_duration_minutes} min</td>
                                                    <td>{item.created_by_email}</td>
                                                    <td>{item.is_published ? "Published" : "Draft"}</td>

                                                    <td>
                                                        <div className="d-flex gap-3">
                                                            <Button
                                                                color="primary"
                                                                size="sm"
                                                                onClick={() => navigate(`/question-paper-list/${item.id}/${item.exam_type_id}`)}
                                                            >
                                                                Manage Questions
                                                            </Button>

                                                            <Button
                                                                color="secondary"
                                                                size="sm"
                                                                onClick={() => navigate(`/edit-question-paper/${item.id}`)}
                                                            >
                                                                Edit
                                                            </Button>

                                                            <Button color="danger" size="sm">
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </td>

                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            </div>

                        </CardBody>
                    </Card>
                </Col>
            </Container>
        </>
    );
};

export default QuestionPaperList;
