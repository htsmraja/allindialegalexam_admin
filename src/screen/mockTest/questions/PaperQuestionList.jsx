import React, { useEffect } from "react";
import CommonBreadcrumb from "../../../component/common/bread-crumb";
import { useNavigate, useParams } from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Spinner,
    Table,
} from "reactstrap";
import { useCommonContext } from "../../../helper/CommonProvider";

const PaperQuestionList = () => {
    const navigate = useNavigate();
    const { id, exam_type_id } = useParams();
    console.log(exam_type_id, "exam_type_id")

    const { getPaperQuestions, paperQuestionList } = useCommonContext();

    useEffect(() => {
        getPaperQuestions(id);
    }, [id]);
    console.log(paperQuestionList, "paperQuestionList")
    return (
        <>
            <CommonBreadcrumb title="Paper Questions" />

            <Container fluid>
                <Col sm="12">
                    <Card>
                        <CardBody>

                            <div className="d-flex justify-content-between align-items-start mb-3">

                                {/* Left Section */}
                                <div>
                                    <h4 className="mb-1">
                                        Paper Name: <span className="fw-bold">{paperQuestionList?.data?.paper?.title}</span>
                                    </h4>

                                    <h5 className="mb-1">
                                        Total Marks: <span className="fw-bold">{paperQuestionList?.data?.paper?.total_marks}</span>
                                    </h5>

                                    <h5 className="mb-0">
                                        Exam Duration: <span className="fw-bold">{paperQuestionList?.data?.paper?.total_duration_minutes} min</span>
                                    </h5>
                                </div>

                                {/* Right Button */}
                                <Button
                                    color="primary"
                                    onClick={() =>
                                        navigate(`/add-paper-question/${id}/${exam_type_id}`)
                                    }
                                >
                                    + Add Question
                                </Button>
                            </div>


                            <Table hover bordered responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Question Text</th>
                                        <th>Question Type</th>
                                        <th>Marks</th>
                                        <th>Negative</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {paperQuestionList.loading && (
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                <Spinner />
                                            </td>
                                        </tr>
                                    )}

                                    {!paperQuestionList.loading &&
                                        paperQuestionList.data?.questions?.length > 0 &&
                                        paperQuestionList.data.questions.map((item, index) => (
                                            <tr key={item.paper_question_id}>
                                                <td>{index + 1}</td>
                                                <td>{item.question_text}</td>
                                                <td>{item.question_type}</td>
                                                <td>{item.marks}</td>
                                                <td>{item.negative_marks ?? "-"}</td>

                                                <td>
                                                    <Button size="sm" color="danger">
                                                        Remove
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}

                                    {!paperQuestionList.loading &&
                                        paperQuestionList.data?.questions?.length === 0 && (
                                            <tr>
                                                <td colSpan="8" className="text-center">
                                                    No questions found
                                                </td>
                                            </tr>
                                        )}
                                </tbody>

                            </Table>

                        </CardBody>
                    </Card>
                </Col>
            </Container>
        </>
    );
};

export default PaperQuestionList;
