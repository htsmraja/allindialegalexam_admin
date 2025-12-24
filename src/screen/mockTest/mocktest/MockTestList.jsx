import React, { useEffect } from "react";
import { Button, Spinner, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useCommonContext } from "../../../helper/CommonProvider";

const MockTestList = () => {
    const navigate = useNavigate();
    const { mockTestList, getMockTestList } = useCommonContext();

    useEffect(() => {
        getMockTestList();
    }, []);

    console.log(mockTestList, "mockTestList")

    return (
        <div className="container py-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Mock Test List</h3>
                <Button color="primary" onClick={() => navigate("/add-mock-test")}>
                    + Add Mock Test
                </Button>
            </div>

            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cover Image</th>
                        <th>Title</th>
                        <th>Exam Type</th>
                        <th>Published</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {mockTestList.loading && (
                        <tr>
                            <td colSpan="10" className="text-center">
                                <Spinner />
                            </td>
                        </tr>
                    )}

                    {!mockTestList.loading &&
                        mockTestList.data?.length === 0 && (
                            <tr>
                                <td colSpan="10" className="text-center">
                                    No Papers Found
                                </td>
                            </tr>
                        )}
                    {mockTestList?.data?.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                                <img
                                    // src={banner.image}
                                    src={
                                        item.cover_image
                                            ? `${import.meta.env.VITE_APP_TEACHER_DOC_URL}/uploads/mocktest/${item.cover_image}`
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
                            <td>{item.title}</td>
                            <td>{item.exam_type_id}</td>
                            <td>{item.is_published ? "Yes" : "No"}</td>
                            <td>
                                <Button
                                    color="info"
                                    size="sm"
                                    onClick={() => navigate(`/mock-test/${item.id}`)}
                                >
                                    View / Add Papers
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default MockTestList;
