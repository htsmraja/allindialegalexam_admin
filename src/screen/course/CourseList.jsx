import React, { useEffect, useState } from "react";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Button, Input, Table } from "reactstrap";
import { useCommonContext } from "../../helper/CommonProvider";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
    const navigate = useNavigate();
    const {
        getCategoryList,
        category,
        getSubCategoryList,
        subcategory,
        getCourseList,
        courseList,
    } = useCommonContext();

    const [filters, setFilters] = useState({
        search: "",
        category_id: "",
        subcategory_id: "",
        status: "",
        page: 1,
    });

    // Load categories & initial course list
    useEffect(() => {
        getCategoryList();
        loadCourses();
    }, []);

    // Fetch courses from context
    const loadCourses = async () => {
        await getCourseList(filters);
    };

    // Handle filter input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        let updated = { ...filters, [name]: value };

        if (name === "category_id") {
            updated.subcategory_id = "";
            getSubCategoryList(value);
        }

        setFilters(updated);
    };

    // Re-fetch with updated filters
    const applyFilters = () => {
        loadCourses();
    };

    return (
        <>
            <CommonBreadcrumb title="Courses List" />

            {/* FILTERS */}
            <div className="card p-3">
                <h4>Filters</h4>

                <div className="row">
                    <div className="col-md-3">
                        <label>Search Title</label>
                        <Input
                            name="search"
                            value={filters.search}
                            onChange={handleChange}
                            placeholder="Search by title..."
                        />
                    </div>

                    <div className="col-md-3">
                        <label>Category</label>
                        <Input
                            type="select"
                            name="category_id"
                            value={filters.category_id}
                            onChange={handleChange}
                        >
                            <option value="">All Categories</option>
                            {category?.data?.categories?.map((c) => (
                                <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                        </Input>
                    </div>

                    {filters.category_id && (
                        <div className="col-md-3">
                            <label>Subcategory</label>
                            <Input
                                type="select"
                                name="subcategory_id"
                                value={filters.subcategory_id}
                                onChange={handleChange}
                            >
                                <option value="">All Subcategories</option>
                                {subcategory?.data?.map((sub) => (
                                    <option key={sub.id} value={sub.id}>{sub.title}</option>
                                ))}
                            </Input>
                        </div>
                    )}

                    <div className="col-md-3">
                        <label>Status</label>
                        <Input
                            type="select"
                            name="status"
                            value={filters.status}
                            onChange={handleChange}
                        >
                            <option value="">All</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </Input>
                    </div>

                    <div className="col-md-12 mt-3">
                        <Button color="primary" onClick={applyFilters}>
                            Apply Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* COURSE LIST TABLE */}
            <div className="card mt-3 p-3">
                <h4>Courses</h4>

                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Video</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Offer</th>
                            <th>Created</th>
                            <th>Action</th>
                            <th>Handle Batch</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(!courseList || courseList?.data?.length === 0) && (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No courses found
                                </td>
                            </tr>
                        )}

                        {courseList?.data?.map((c, index) => (
                            <tr key={c.id}>
                                <td>{index + 1}</td>
                                <td>{c.title}</td>

                                {/* IMAGE */}
                                <td>
                                    <img
                                        src={
                                            c.thumbnail
                                                ? `${import.meta.env.VITE_APP_TEACHER_DOC_URL}/${c.thumbnail}`
                                                : "/no-image.png"
                                        }
                                        alt="course"
                                        width="60"
                                        height="60"
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "5px"
                                        }}
                                    />
                                </td>

                                {/* VIDEO */}
                                <td>
                                    {c.preview_video ? (
                                        <Button
                                            size="sm"
                                            color="primary"
                                            onClick={() =>
                                                window.open(
                                                    `${import.meta.env.VITE_APP_TEACHER_DOC_URL}/${c.preview_video}`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            ▶ Play
                                        </Button>
                                    ) : (
                                        "-"
                                    )}
                                </td>

                                <td>
                                    <span
                                        className={`badge bg-${c.status === "published" ? "success" : "warning"
                                            }`}
                                    >
                                        {c.status}
                                    </span>
                                </td>

                                <td>₹{c.price}</td>
                                <td>{c.offer_price ? `₹${c.offer_price}` : "-"}</td>
                                <td>{c.created_at}</td>

                                <td>
                                    <Button size="sm" color="info" className="me-2">
                                        Edit
                                    </Button>
                                    <Button size="sm" color="danger">
                                        Delete
                                    </Button>
                                </td>
                                <td>
                                    <Button size="sm" color="primary" onClick={() => navigate('/batch-list', { state: { courseId: c.id } })}>
                                        Manage Batches
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            </div>
        </>
    );
};

export default CourseList;
