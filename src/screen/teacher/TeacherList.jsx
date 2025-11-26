import React, { useEffect, useState } from 'react';
import CommonBreadcrumb from '../../component/common/bread-crumb';
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
import { useNavigate } from 'react-router-dom';
import { useCommonContext } from '../../helper/CommonProvider';

const TeacherList = () => {
    const navigate = useNavigate();
    const { teacherList, getTeacherList, approveTeacher, rejectTeacher } = useCommonContext();

    const [search, setSearch] = useState("");

    useEffect(() => {
        getTeacherList({ page: 1, search: "" });
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        getTeacherList({ page: 1, search: value });
    };
    const onOpenModal = () => navigate("/add-teacher");
    const handleApprove = (id) => {
        approveTeacher(id);
        getTeacherList({ page: 1, search: "" });
    }
    const handleReject = (id) => {
        rejectTeacher(id);
        getTeacherList({ page: 1, search: "" });
    }
    return (
        <>
            <CommonBreadcrumb title="Teacher List" />

            <Container fluid>
                <Col sm="12">
                    <Card>
                        <CardBody>

                            {/* Search */}
                            <div className="row align-items-center mb-4">
                                <div className="col-md-6">
                                    <Input
                                        placeholder="Search Teacher (name / email / phone)"
                                        className="form-control"
                                        value={search}
                                        onChange={handleSearch}
                                    />
                                </div>
                                <div className="col-md-6 d-flex justify-content-end">
                                    <button
                                        onClick={onOpenModal}
                                        className="btn btnGreen"
                                    >
                                        + Add Teacher
                                    </button>
                                </div>
                            </div>

                            {/* TABLE */}
                            <div className="product-physical">
                                <div className="promo-code-list">

                                    <Table hover responsive bordered>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Experience</th>
                                                <th>Commission</th>
                                                <th> C Status</th>
                                                <th>Change </th>
                                                <th>KYC Doc</th>
                                                <th>Degree Doc</th>
                                                <th>Created At</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {/* LOADING STATE */}
                                            {teacherList.loading && (
                                                <tr>
                                                    <td colSpan="15" className="text-center">
                                                        <Spinner />
                                                    </td>
                                                </tr>
                                            )}

                                            {/* EMPTY STATE */}
                                            {!teacherList.loading && teacherList.data?.length === 0 && (
                                                <tr>
                                                    <td colSpan="15" className="text-center">
                                                        No Teachers Found
                                                    </td>
                                                </tr>
                                            )}

                                            {/* DATA LIST */}
                                            {!teacherList.loading && teacherList.data?.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.full_name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone || "-"}</td>
                                                    <td>{item.experience_years} Years</td>

                                                    <td>
                                                        {item.commission_type}
                                                        <br />
                                                        <strong>{item.commission_value}</strong>
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={
                                                                item.approval_status === "approved"
                                                                    ? "text-success fw-bold"
                                                                    : item.approval_status === "rejected"
                                                                        ? "text-danger fw-bold"
                                                                        : "text-warning fw-bold"
                                                            }
                                                        >
                                                            {item.approval_status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="primary"
                                                            size="sm"
                                                            className="me-2 mb-2"
                                                            onClick={() => handleApprove(item.id)}
                                                        // disabled={item.approval_status == "approved"}
                                                        >
                                                            Approve
                                                        </Button>

                                                        <Button
                                                            color="danger"
                                                            size="sm"
                                                            onClick={() => handleReject(item.id)}
                                                        //disabled={item.approval_status == "rejected"}
                                                        >
                                                            Reject
                                                        </Button>

                                                    </td>
                                                    {/* KYC DOCUMENT VIEW / DOWNLOAD */}
                                                    <td>
                                                        {item.kyc_document ? (
                                                            <>
                                                                <a
                                                                    href={`${import.meta.env.VITE_APP_TEACHER_DOC_URL}/${item.kyc_document}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="btn btn-sm btn-info mb-1"
                                                                >
                                                                    View
                                                                </a>
                                                                <br />
                                                                <a
                                                                    href={`${import.meta.env.VITE_APP_TEACHER_DOC_URL}/${item.kyc_document}`}
                                                                    download
                                                                    className="btn btn-sm btn-warning mt-1"
                                                                >
                                                                    Download
                                                                </a>
                                                            </>
                                                        ) : (
                                                            <span className="text-muted">No File</span>
                                                        )}
                                                    </td>

                                                    {/* DEGREE DOCUMENT VIEW / DOWNLOAD */}
                                                    <td>
                                                        {item.degree_document ? (
                                                            <>
                                                                <a
                                                                    href={`${import.meta.env.VITE_APP_TEACHER_DOC_URL}/${item.degree_document}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="btn btn-sm btn-info mb-1"
                                                                >
                                                                    View
                                                                </a>
                                                                <br />
                                                                <a
                                                                    href={`${import.meta.env.VITE_APP_TEACHER_DOC_URL}/${item.degree_document}`}
                                                                    download
                                                                    className="btn btn-sm btn-warning mt-1"
                                                                >
                                                                    Download
                                                                </a>
                                                            </>
                                                        ) : (
                                                            <span className="text-muted">No File</span>
                                                        )}
                                                    </td>

                                                    <td>{new Date(item.created_at).toLocaleDateString()}</td>

                                                    <td>
                                                        <Button
                                                            color="primary"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => navigate(`/teacher/${item.id}`)}
                                                        >
                                                            View
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
    );
};

export default TeacherList;
