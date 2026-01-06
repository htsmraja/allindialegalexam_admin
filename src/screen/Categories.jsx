
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Table, Form, Stack, Pagination } from 'react-bootstrap';
import { FiPlus, FiEdit2, FiTrash2, FiList } from 'react-icons/fi';
import AddCategory from './AddCategory';
import CommonBreadcrumb from '../component/common/bread-crumb';
import { useCommonContext } from '../helper/CommonProvider';

const Categories = () => {
    const navigate = useNavigate();

    const {
        getCategoryList,
        category,
        addCategory,
        editCategory,
        categoryDelete,
        toggleCategoryStatus,
    } = useCommonContext();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const categories = category?.data?.categories || [];
    const totalPages = category?.data?.pagination?.totalPages || 1;

    useEffect(() => {
        getCategoryList({ page: currentPage || 1 });
    }, [currentPage]);

    const showAddModal = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const showEditModal = (record) => {
        setEditingCategory(record);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    const handleSaveCategory = async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("slug", values.slug);
        formData.append("order_no", values.order_no);
        formData.append("is_active", values.is_active ? 1 : 0);
        formData.append("image", values.image);

        if (editingCategory) {
            await editCategory(editingCategory.id, formData);
        } else {
            await addCategory(formData);
        }

        setIsModalOpen(false);
        setEditingCategory(null);
        // getCategoryList({ page: currentPage });
    };

    const handleStatusChange = async (id, checked) => {
        const res = await toggleCategoryStatus(id, checked ? 1 : 0);
        if (res.status) { getCategoryList({ page: currentPage }); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            await categoryDelete(id);
            // getCategoryList({ page: currentPage });
        }
    };

    return (
        <>
            <CommonBreadcrumb title="Category List" />

            <div className="text-white">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <input
                        type="text"
                        className="form-control bg-white border-secondary text-black w-25"
                        placeholder="Search categories..."
                    />

                    <Button
                        variant="warning"
                        className="fw-bold d-flex align-items-center gap-2 px-3 py-2 text-black"
                        onClick={showAddModal}
                        style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                    >
                        <FiPlus size={20} />
                        Add Category
                    </Button>
                </div>

                <Card className="bg-dark border-secondary shadow-sm">
                    <Card.Body className="p-0">
                        <Table responsive hover variant="dark" className="mb-0 custom-table">
                            <thead className="bg-black">
                                <tr className="text-secondary small text-uppercase">
                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">Image</th>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Slug</th>
                                    <th className="px-4 py-3 text-center">Status</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((record) => (
                                    <tr key={record.id} className="align-middle">
                                        <td className="px-4 py-3">{record.id}</td>
                                        <td className="px-4 py-3">
                                            <img
                                                src={
                                                    record.image
                                                        ? `${import.meta.env.VITE_APP_TEACHER_DOC_URL}/uploads/category/${record.image}`
                                                        : "/no-image.png"
                                                }
                                                alt={record.title}
                                                style={{ width: 48, height: 48, objectFit: "cover" }}
                                            />
                                        </td>
                                        <td className="px-4 py-3 fw-bold">{record.title}</td>
                                        <td className="px-4 py-3 text-secondary">{record.slug}</td>

                                        <td className="px-4 py-3 text-center">
                                            <Form.Check
                                                type="switch"
                                                checked={record.is_active === 1}
                                                onChange={(e) =>
                                                    handleStatusChange(record.id, e.target.checked)
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <Stack direction="horizontal" gap={2} className="justify-content-center">
                                                <Button
                                                    variant="outline-warning"
                                                    size="sm"
                                                    className="p-2 border-0"
                                                    onClick={() => navigate(`/subcategory-List/${record.id}`)}
                                                >
                                                    <FiList size={18} />
                                                </Button>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="p-2 border-0"
                                                    onClick={() => showEditModal(record)}
                                                >
                                                    <FiEdit2 size={18} />
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    className="p-2 border-0"
                                                    onClick={() => handleDelete(record.id)}
                                                >
                                                    <FiTrash2 size={18} />
                                                </Button>
                                            </Stack>
                                        </td>
                                    </tr>
                                ))}

                                {categories.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-5 text-secondary">
                                            No categories found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>

                    <Card.Footer className="bg-transparent border-secondary d-flex justify-content-between">
                        <div className="text-secondary">Page {currentPage} of {totalPages}</div>
                        <Pagination>
                            <Pagination.Prev
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                            />
                            {[...Array(totalPages)].map((_, i) => (
                                <Pagination.Item
                                    key={i}
                                    active={currentPage === i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                            />
                        </Pagination>
                    </Card.Footer>
                </Card>

                <AddCategory
                    show={isModalOpen}
                    handleClose={handleCancel}
                    onSave={handleSaveCategory}
                    initialValues={editingCategory}
                />
            </div>
        </>
    );
};

export default Categories;
