

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Card, Button, Table, Form, Stack, Pagination } from 'react-bootstrap';
// import { FiPlus, FiEdit2, FiTrash2, FiList } from 'react-icons/fi';
// import AddSubcategory from './AddSubcategory';
// import CommonBreadcrumb from '../component/common/bread-crumb';
// import { useCommonContext } from '../helper/CommonProvider';
// const SubCategoryList = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const {
//         getSubCategoryList,
//         subcategory,
//         addCategory,
//         editCategory,
//         categoryDelete,
//         toggleCategoryStatus,
//     } = useCommonContext();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingCategory, setEditingCategory] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);

//     const categories = subcategory?.data || [];
//     console.log(subcategory, "subcategory")

//     useEffect(() => {
//         getSubCategoryList(id);
//     }, [id]);

//     const showAddModal = () => {
//         setEditingCategory(null);
//         setIsModalOpen(true);
//     };

//     const showEditModal = (record) => {
//         setEditingCategory(record);
//         setIsModalOpen(true);
//     };

//     const handleCancel = () => {
//         setIsModalOpen(false);
//         setEditingCategory(null);
//     };

//     const handleSave = async (values, files) => {
//         const formData = new FormData();
//         formData.append("title", values.title);
//         formData.append("description", values.description || "");
//         formData.append("parentId", id);

//         if (editingCategory) {
//             if (files[0]) formData.append("image", files[0]);
//             await editCategory(editingCategory.id, formData);
//         } else {
//             files.forEach(file => formData.append("images", file));
//             await addCategory(formData);
//         }

//         closeModal();
//         getSubCategoryList(id);
//     };

//     const handleStatusChange = async (id, checked) => {
//         const res = await toggleCategoryStatus(id, checked ? 1 : 0);
//         if (res.status && id) { getSubCategoryList(id); }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this category?')) {
//             await categoryDelete(id);
//         }
//     };
//     return (
//         <>
//             <CommonBreadcrumb title="Category List" />

//             <div className="text-white">
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                     <input
//                         type="text"
//                         className="form-control bg-white border-secondary text-black w-25"
//                         placeholder="Search categories..."
//                     />

//                     <Button
//                         variant="warning"
//                         className="fw-bold d-flex align-items-center gap-2 px-3 py-2 text-black"
//                         onClick={showAddModal}
//                         style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
//                     >
//                         <FiPlus size={20} />
//                         Add Sub Category
//                     </Button>
//                 </div>

//                 <Card className="bg-dark border-secondary shadow-sm">
//                     <Card.Body className="p-0">
//                         <Table responsive hover variant="dark" className="mb-0 custom-table">
//                             <thead className="bg-black">
//                                 <tr className="text-secondary small text-uppercase">
//                                     <th className="px-4 py-3">ID</th>
//                                     <th className="px-4 py-3">Image</th>
//                                     <th className="px-4 py-3">Title</th>
//                                     <th className="px-4 py-3">Slug</th>
//                                     <th className="px-4 py-3">Order</th>
//                                     <th className="px-4 py-3 text-center">Status</th>
//                                     <th className="px-4 py-3 text-center">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {categories.map((record) => (
//                                     <tr key={record.id} className="align-middle">
//                                         <td className="px-4 py-3">{record.id}</td>
//                                         <td className="px-4 py-3">
//                                             <img
//                                                 src={
//                                                     record.image
//                                                         ? `${import.meta.env.VITE_APP_TEACHER_DOC_URL}/uploads/category/${record.image}`
//                                                         : "/no-image.png"
//                                                 }
//                                                 alt={record.title}
//                                                 style={{ width: 48, height: 48, objectFit: "cover" }}
//                                             />
//                                         </td>
//                                         <td className="px-4 py-3 fw-bold">{record.title}</td>
//                                         <td className="px-4 py-3 text-secondary">{record.slug}</td>
//                                         <td className="px-4 py-3">{record.order_no}</td>
//                                         <td className="px-4 py-3 text-center">
//                                             <Form.Check
//                                                 type="switch"
//                                                 checked={record.is_active === 1}
//                                                 onChange={(e) =>
//                                                     handleStatusChange(record.id, e.target.checked)
//                                                 }
//                                             />
//                                         </td>
//                                         <td className="px-4 py-3 text-center">
//                                             <Stack direction="horizontal" gap={2} className="justify-content-center">
//                                                 <Button
//                                                     variant="outline-primary"
//                                                     size="sm"
//                                                     className="p-2 border-0"
//                                                     onClick={() => showEditModal(record)}
//                                                 >
//                                                     <FiEdit2 size={18} />
//                                                 </Button>
//                                                 <Button
//                                                     variant="outline-danger"
//                                                     size="sm"
//                                                     className="p-2 border-0"
//                                                     onClick={() => handleDelete(record.id)}
//                                                 >
//                                                     <FiTrash2 size={18} />
//                                                 </Button>
//                                             </Stack>
//                                         </td>
//                                     </tr>
//                                 ))}

//                                 {categories.length === 0 && (
//                                     <tr>
//                                         <td colSpan="7" className="text-center py-5 text-secondary">
//                                             No categories found
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </Table>
//                     </Card.Body>

//                 </Card>

//                 <AddSubcategory
//                     show={isModalOpen}
//                     handleClose={handleCancel}
//                     onSave={handleSave}
//                     initialValues={editingCategory}

//                 />
//             </div>
//         </>
//     )
// }

// export default SubCategoryList

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Table, Form, Stack, Pagination } from 'react-bootstrap';
import { FiPlus, FiEdit2, FiTrash2, FiList } from 'react-icons/fi';
import AddSubcategory from './AddSubcategory';
import CommonBreadcrumb from '../component/common/bread-crumb';
import { useCommonContext } from '../helper/CommonProvider';

const SubCategoryList = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        getSubCategoryList,
        subcategory,
        addCategory,
        editCategory,
        categoryDelete,
        toggleCategoryStatus,
    } = useCommonContext();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const categories = subcategory?.data || [];

    useEffect(() => {
        if (id) getSubCategoryList(id);
    }, [id]);

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

    const handleSave = async (values, files) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description || "");
        formData.append("parentId", id);

        if (editingCategory) {
            if (files[0]) formData.append("image", files[0]);
            await editCategory(editingCategory.id, formData);
        } else {
            files.forEach(file => formData.append("images", file));
            await addCategory(formData);
        }

        handleCancel();
        getSubCategoryList(id);
    };

    const handleStatusChange = async (cid, checked) => {
        const res = await toggleCategoryStatus(cid, checked ? 1 : 0);
        if (res?.status) getSubCategoryList(id);
    };

    const handleDelete = async (cid) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            await categoryDelete(cid);
            getSubCategoryList(id);
        }
    };

    return (
        <>
            {/* ❗ UI / CSS untouched */}
            <CommonBreadcrumb title="Category List" />

            {/* rest of JSX SAME */}
            <div className="text-white">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <input
                        type="text"
                        className="form-control bg-white border-secondary text-black w-25"
                        placeholder="Search Subcategories..."
                    />

                    <Button
                        variant="warning"
                        className="fw-bold d-flex align-items-center gap-2 px-3 py-2 text-black"
                        onClick={showAddModal}
                        style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                    >
                        <FiPlus size={20} />
                        Add Sub Category
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

                </Card>

                <AddSubcategory
                    show={isModalOpen}
                    handleClose={handleCancel}
                    onSave={handleSave}
                    initialValues={editingCategory}
                    id={id}
                />
            </div>

        </>
    );
};

export default SubCategoryList;


