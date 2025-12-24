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
const ExamType = () => {
    const navigate = useNavigate();
    const onOpenModal = () => navigate("/add-exam-type");
    const { getExamTypeList, examTypeList } = useCommonContext();
    useEffect(() => {
        getExamTypeList();
    }, [])
    return (
        <>
            <CommonBreadcrumb title="Create the Exam Type" />
            <Container fluid>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <div className="row align-items-center mb-4 justify-content-between">

                                {/* SEARCH */}
                                <div className="col-md-6">
                                    <Input
                                        placeholder="Search Book"
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
                                        + Add Exam Type
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
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {/* LOADING */}
                                            {examTypeList.loading && (
                                                <tr>
                                                    <td colSpan="10" className="text-center">
                                                        <Spinner />
                                                    </td>
                                                </tr>
                                            )}

                                            {/* EMPTY */}
                                            {!examTypeList.loading && examTypeList.data?.length === 0 && (
                                                <tr>
                                                    <td colSpan="10" className="text-center">
                                                        No Books Found
                                                    </td>
                                                </tr>
                                            )}

                                            {/* DATA LIST */}
                                            {!examTypeList.loading && examTypeList.data?.map((item) => (
                                                <tr key={item.id}>
                                                    <td>EX Type:{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.status}</td>
                                                    {/* ACTIONS */}
                                                    <td>
                                                        <Button
                                                            color="primary"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => navigate(`/edit-exam-type/${item.id}`)}
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

export default ExamType