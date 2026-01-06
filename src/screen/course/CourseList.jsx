// import React, { useEffect, useState } from "react";
// import CommonBreadcrumb from "../../component/common/bread-crumb";
// import { Button, Input, Table } from "reactstrap";
// import { useCommonContext } from "../../helper/CommonProvider";
// import { useNavigate } from "react-router-dom";

// const CourseList = () => {
//     const navigate = useNavigate();
//     const {
//         getCategoryList,
//         category,
//         getSubCategoryList,
//         subcategory,
//         getCourseList,
//         courseList,
//     } = useCommonContext();

//     const [filters, setFilters] = useState({
//         search: "",
//         category_id: "",
//         subcategory_id: "",
//         status: "",
//         page: 1,
//     });

//     // Load categories & initial course list
//     useEffect(() => {
//         getCategoryList();
//         loadCourses();
//     }, []);

//     // Fetch courses from context
//     const loadCourses = async () => {
//         await getCourseList(filters);
//     };

//     // Handle filter input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         let updated = { ...filters, [name]: value };

//         if (name === "category_id") {
//             updated.subcategory_id = "";
//             getSubCategoryList(value);
//         }

//         setFilters(updated);
//     };

//     // Re-fetch with updated filters
//     const applyFilters = () => {
//         loadCourses();
//     };

//     return (
//         <>
//             <CommonBreadcrumb title="Courses List" />

//             {/* FILTERS */}
//             <div className="card p-3">
//                 <h4>Filters</h4>

//                 <div className="row">
//                     <div className="col-md-3">
//                         <label>Search Title</label>
//                         <Input
//                             name="search"
//                             value={filters.search}
//                             onChange={handleChange}
//                             placeholder="Search by title..."
//                         />
//                     </div>

//                     <div className="col-md-3">
//                         <label>Category</label>
//                         <Input
//                             type="select"
//                             name="category_id"
//                             value={filters.category_id}
//                             onChange={handleChange}
//                         >
//                             <option value="">All Categories</option>
//                             {category?.data?.categories?.map((c) => (
//                                 <option key={c.id} value={c.id}>{c.title}</option>
//                             ))}
//                         </Input>
//                     </div>

//                     {filters.category_id && (
//                         <div className="col-md-3">
//                             <label>Subcategory</label>
//                             <Input
//                                 type="select"
//                                 name="subcategory_id"
//                                 value={filters.subcategory_id}
//                                 onChange={handleChange}
//                             >
//                                 <option value="">All Subcategories</option>
//                                 {subcategory?.data?.map((sub) => (
//                                     <option key={sub.id} value={sub.id}>{sub.title}</option>
//                                 ))}
//                             </Input>
//                         </div>
//                     )}

//                     <div className="col-md-3">
//                         <label>Status</label>
//                         <Input
//                             type="select"
//                             name="status"
//                             value={filters.status}
//                             onChange={handleChange}
//                         >
//                             <option value="">All</option>
//                             <option value="draft">Draft</option>
//                             <option value="published">Published</option>
//                             <option value="archived">Archived</option>
//                         </Input>
//                     </div>

//                     <div className="col-md-12 mt-3">
//                         <Button color="primary" onClick={applyFilters}>
//                             Apply Filters
//                         </Button>
//                     </div>
//                 </div>
//             </div>

//             {/* COURSE LIST TABLE */}
//             <div className="card mt-3 p-3">
//                 <h4>Courses</h4>

//                 <Table bordered hover responsive>
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Title</th>
//                             <th>Image</th>
//                             <th>Video</th>
//                             <th>Status</th>
//                             <th>Price</th>
//                             <th>Offer</th>
//                             <th>Created</th>
//                             <th>Action</th>
//                             <th>Handle Batch</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {(!courseList || courseList?.data?.length === 0) && (
//                             <tr>
//                                 <td colSpan="9" className="text-center">
//                                     No courses found
//                                 </td>
//                             </tr>
//                         )}

//                         {courseList?.data?.map((c, index) => (
//                             <tr key={c.id}>
//                                 <td>{index + 1}</td>
//                                 <td>{c.title}</td>

//                                 {/* IMAGE */}
//                                 <td>
//                                     <img
//                                         src={
//                                             c.thumbnail
//                                                 ? `${import.meta.env.VITE_APP_TEACHER_DOC_URL}/${c.thumbnail}`
//                                                 : "/no-image.png"
//                                         }
//                                         alt="course"
//                                         width="60"
//                                         height="60"
//                                         style={{
//                                             objectFit: "cover",
//                                             borderRadius: "5px"
//                                         }}
//                                     />
//                                 </td>

//                                 {/* VIDEO */}
//                                 <td>
//                                     {c.preview_video ? (
//                                         <Button
//                                             size="sm"
//                                             color="primary"
//                                             onClick={() =>
//                                                 window.open(
//                                                     `${import.meta.env.VITE_APP_TEACHER_DOC_URL}/${c.preview_video}`,
//                                                     "_blank"
//                                                 )
//                                             }
//                                         >
//                                             ▶ Play
//                                         </Button>
//                                     ) : (
//                                         "-"
//                                     )}
//                                 </td>

//                                 <td>
//                                     <span
//                                         className={`badge bg-${c.status === "published" ? "success" : "warning"
//                                             }`}
//                                     >
//                                         {c.status}
//                                     </span>
//                                 </td>

//                                 <td>₹{c.price}</td>
//                                 <td>{c.offer_price ? `₹${c.offer_price}` : "-"}</td>
//                                 <td>{c.created_at}</td>

//                                 <td>
//                                     <Button size="sm" color="info" className="me-2">
//                                         Edit
//                                     </Button>
//                                     <Button size="sm" color="danger">
//                                         Delete
//                                     </Button>
//                                 </td>
//                                 <td>
//                                     <Button size="sm" color="primary" onClick={() => navigate('/batch-list', { state: { courseId: c.id } })}>
//                                         Manage Batches
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>

//                 </Table>
//             </div>
//         </>
//     );
// };

// export default CourseList;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Card, Button, Table, Badge, Modal, ListGroup, Accordion, Form, InputGroup, Stack } from 'react-bootstrap';
// import {
//     FiPlus, FiEdit3, FiTrash2, FiEye, FiUsers, FiBookOpen,
//     FiVideo, FiFile, FiFileText, FiChevronRight, FiUser, FiClock, FiCalendar
// } from 'react-icons/fi';

// // --- SUB-COMPONENTS ---

// const ModuleItem = ({ mod, idx, onEditLesson, onDeleteLesson, onAddLesson, onEditModule, onDeleteModule }) => (
//     <Accordion.Item eventKey={String(idx)} className="bg-transparent border-secondary border-opacity-10 mb-2">
//         <Accordion.Header className="bg-dark text-white">
//             <div className="d-flex align-items-center justify-content-between w-100 pe-3">
//                 <div className="d-flex align-items-center gap-2">
//                     <span className="text-secondary opacity-50 small">MOD {idx + 1}</span>
//                     <span>{mod.title}</span>
//                 </div>
//                 <div className="d-flex gap-2">
//                     <Button variant="link" className="p-0 text-secondary hover-info" onClick={(e) => { e.stopPropagation(); onEditModule(mod); }}><FiEdit3 size={14} /></Button>
//                     <Button variant="link" className="p-0 text-secondary hover-danger" onClick={(e) => { e.stopPropagation(); onDeleteModule(mod.id); }}><FiTrash2 size={14} /></Button>
//                 </div>
//             </div>
//         </Accordion.Header>
//         <Accordion.Body className="p-0">
//             <ListGroup variant="flush">
//                 {mod.lessons.map((lesson, lIdx) => (
//                     <ListGroup.Item key={lesson.id} className="bg-black bg-opacity-25 text-white border-secondary border-opacity-10 py-2 ps-5 d-flex justify-content-between align-items-center">
//                         <div className="d-flex align-items-center gap-3">
//                             {lesson.type === 'video' ? <FiVideo className="text-warning" size={14} /> : <FiFile className="text-info" size={14} />}
//                             <span className="small">{lesson.title}</span>
//                         </div>
//                         <div className="d-flex align-items-center gap-3">
//                             <span className="x-small text-secondary">{lesson.duration}</span>
//                             <div className="d-flex gap-2">
//                                 <Button variant="link" className="p-0 text-secondary hover-info" onClick={() => onEditLesson(mod.id, lesson)}><FiEdit3 size={12} /></Button>
//                                 <Button variant="link" className="p-0 text-secondary hover-danger" onClick={() => onDeleteLesson(mod.id, lesson.id)}><FiTrash2 size={12} /></Button>
//                             </div>
//                         </div>
//                     </ListGroup.Item>
//                 ))}
//                 <ListGroup.Item className="bg-black bg-opacity-40 border-0 py-2 ps-5">
//                     <Button variant="link" size="sm" className="text-warning p-0 small text-decoration-none d-flex align-items-center gap-1" onClick={() => onAddLesson(mod.id)}>
//                         <FiPlus size={14} /> Add Lesson
//                     </Button>
//                 </ListGroup.Item>
//             </ListGroup>
//         </Accordion.Body>
//     </Accordion.Item>
// );

// const CourseList = () => {
//     const navigate = useNavigate();
//     const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

//     // --- STATIC DATA ---
//     const [courses, setCourses] = useState([
//         {
//             id: 1,
//             title: 'Complete Web Development Bootcamp',
//             category: 'Programming',
//             language: 'English',
//             price: '3499',
//             status: 'Published',
//             thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500',
//             description: 'Learn full stack web development from scratch.',
//             modules: [
//                 {
//                     id: 101,
//                     title: 'Introduction to Web',
//                     lessons: [
//                         { id: 1001, title: 'How the Web Works', type: 'video', duration: '10 min' },
//                         { id: 1002, title: 'HTML Basics', type: 'video', duration: '15 min' }
//                     ]
//                 }
//             ],
//             batches: [
//                 { id: 201, name: 'Jan 2026 Batch', teacher: 'John Doe', startDate: '2026-01-01', endDate: '2026-04-01', maxStudents: 120, status: 'Ongoing', description: 'Primary morning batch', slots: [{ day: 'Monday', start: '10:00', end: '12:00' }] }
//             ]
//         }
//     ]);

//     const teachers = ['John Doe', 'Sarah Smith', 'Michael Brown', 'Emily Davis'];

//     // --- MODAL STATES ---
//     const [showEditCourse, setShowEditCourse] = useState(false);
//     const [showCurriculum, setShowCurriculum] = useState(false);
//     const [showBatches, setShowBatches] = useState(false);
//     const [showBatchEditor, setShowBatchEditor] = useState(false);

//     // --- WORKING STATES ---
//     const [selectedCourse, setSelectedCourse] = useState(null);
//     const [activeBatch, setActiveBatch] = useState(null);
//     const [curriculumAction, setCurriculumAction] = useState({ type: '', moduleId: '', data: null });

//     // --- HANDLERS ---

//     // Course Handlers
//     const saveCourseDetails = (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const updated = {
//             ...selectedCourse,
//             title: formData.get('title'),
//             category: formData.get('category'),
//             language: formData.get('language'),
//             price: formData.get('price'),
//             status: formData.get('status'),
//             description: formData.get('description'),
//         };
//         setCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
//         setShowEditCourse(false);
//     };

//     // Curriculum Handlers
//     const handleAddModule = () => {
//         const newTitle = prompt("Enter Module Title:");
//         if (!newTitle) return;
//         const updated = { ...selectedCourse, modules: [...selectedCourse.modules, { id: uid(), title: newTitle, lessons: [] }] };
//         setCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
//         setSelectedCourse(updated);
//     };

//     const handleEditModule = (mod) => {
//         const newTitle = prompt("Edit Module Title:", mod.title);
//         if (!newTitle) return;
//         const updated = { ...selectedCourse, modules: selectedCourse.modules.map(m => m.id === mod.id ? { ...m, title: newTitle } : m) };
//         setCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
//         setSelectedCourse(updated);
//     };

//     const handleAddLesson = (modId) => {
//         const title = prompt("Enter Lesson Title:");
//         if (!title) return;
//         const updated = {
//             ...selectedCourse,
//             modules: selectedCourse.modules.map(m => m.id === modId ? { ...m, lessons: [...m.lessons, { id: uid(), title, type: 'video', duration: '0 min' }] } : m)
//         };
//         setCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
//         setSelectedCourse(updated);
//     };

//     const handleDeleteLesson = (modId, lessonId) => {
//         if (!confirm("Are you sure?")) return;
//         const updated = {
//             ...selectedCourse,
//             modules: selectedCourse.modules.map(m => m.id === modId ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) } : m)
//         };
//         setCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
//         setSelectedCourse(updated);
//     };

//     // Batch Handlers
//     const openBatchEditor = (batch = null) => {
//         setActiveBatch(batch || { id: uid(), name: '', teacher: '', startDate: '', endDate: '', maxStudents: '', status: 'Upcoming', description: '', slots: [] });
//         setShowBatchEditor(true);
//     };

//     const addSlot = () => {
//         setActiveBatch({ ...activeBatch, slots: [...activeBatch.slots, { id: uid(), day: 'Monday', start: '09:00', end: '10:00' }] });
//     };

//     const removeSlot = (slotId) => {
//         setActiveBatch({ ...activeBatch, slots: activeBatch.slots.filter(s => s.id !== slotId) });
//     };

//     const saveBatch = (e) => {
//         e.preventDefault();
//         const updatedBatches = activeBatch.isNew === false
//             ? selectedCourse.batches.map(b => b.id === activeBatch.id ? activeBatch : b)
//             : [...selectedCourse.batches, activeBatch.id ? activeBatch : { ...activeBatch, id: uid() }];

//         const updatedCourse = { ...selectedCourse, batches: updatedBatches };
//         setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
//         setSelectedCourse(updatedCourse);
//         setShowBatchEditor(false);
//     };

//     return (
//         <Container fluid className="text-white py-4">
//             {/* Header */}
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <div>
//                     <h2 className="fw-bold mb-1 text-white">Advanced Course Management</h2>
//                     <p className="text-secondary small">Real-time management of courses, curriculum, and complex batch scheduling.</p>
//                 </div>
//                 <Button variant="warning" className="fw-bold px-4" onClick={() => navigate('/add-course')}><FiPlus /> Add Course</Button>
//             </div>

//             {/* Table */}
//             <Card className="bg-dark border-secondary border-opacity-25 shadow-sm overflow-hidden">
//                 <Table responsive hover variant="dark" className="align-middle mb-0 bg-transparent">
//                     <thead className="bg-black bg-opacity-50 text-secondary small">
//                         <tr>
//                             <th className="px-4 py-3 border-0">COURSE</th>
//                             <th className="py-3 border-0">CATEGORY</th>
//                             <th className="py-3 border-0">PRICE</th>
//                             <th className="py-3 border-0">STATUS</th>
//                             <th className="py-3 border-0 text-end pe-4">MANAGEMENT</th>
//                         </tr>
//                     </thead>
//                     <tbody className="small">
//                         {courses.map(course => (
//                             <tr key={course.id} className="border-bottom border-secondary border-opacity-10">
//                                 <td className="px-4 py-3">
//                                     <div className="d-flex align-items-center gap-3">
//                                         <img src={course.thumbnail} className="rounded" style={{ width: '48px', height: '32px', objectFit: 'cover' }} />
//                                         <div className="fw-bold">{course.title}</div>
//                                     </div>
//                                 </td>
//                                 <td><Badge bg="secondary" className="bg-opacity-25 text-secondary">{course.category}</Badge></td>
//                                 <td className="text-warning fw-bold">₹{course.price}</td>
//                                 <td><Badge bg={course.status === 'Published' ? 'success' : 'secondary'}>{course.status}</Badge></td>
//                                 <td className="text-end pe-4">
//                                     <div className="d-flex justify-content-end gap-2">
//                                         <Button variant="outline-light" size="sm" onClick={() => { setSelectedCourse(course); setShowEditCourse(true); }} title="Edit Info"><FiEdit3 size={16} /></Button>
//                                         <Button variant="outline-warning" size="sm" onClick={() => { setSelectedCourse(course); setShowCurriculum(true); }} title="Curriculum"><FiBookOpen size={16} /></Button>
//                                         <Button variant="outline-info" size="sm" onClick={() => { setSelectedCourse(course); setShowBatches(true); }} title="Batches"><FiUsers size={16} /></Button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </Card>

//             {/* 1. EDIT COURSE MODAL */}
//             <Modal show={showEditCourse} onHide={() => setShowEditCourse(false)} size="lg" centered contentClassName="bg-dark border-secondary">
//                 <Form onSubmit={saveCourseDetails}>
//                     <Modal.Header closeButton closeVariant="white" className="border-secondary px-4">
//                         <Modal.Title className="fw-bold">Edit Course Details</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body className="p-4 bg-black bg-opacity-25">
//                         <Row className="g-3">
//                             <Col md={12}><Form.Label>Title</Form.Label><Form.Control name="title" defaultValue={selectedCourse?.title} className="bg-dark border-secondary text-white" /></Col>
//                             <Col md={6}><Form.Label>Category</Form.Label><Form.Control name="category" defaultValue={selectedCourse?.category} className="bg-dark border-secondary text-white" /></Col>
//                             <Col md={6}><Form.Label>Price</Form.Label><Form.Control name="price" defaultValue={selectedCourse?.price} className="bg-dark border-secondary text-white" /></Col>
//                             <Col md={6}><Form.Label>Language</Form.Label><Form.Control name="language" defaultValue={selectedCourse?.language} className="bg-dark border-secondary text-white" /></Col>
//                             <Col md={6}><Form.Label>Status</Form.Label>
//                                 <Form.Select name="status" defaultValue={selectedCourse?.status} className="bg-dark border-secondary text-white">
//                                     <option value="Published">Published</option>
//                                     <option value="Draft">Draft</option>
//                                 </Form.Select>
//                             </Col>
//                             <Col md={12}><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={3} name="description" defaultValue={selectedCourse?.description} className="bg-dark border-secondary text-white" /></Col>
//                         </Row>
//                     </Modal.Body>
//                     <Modal.Footer className="border-secondary"><Button variant="secondary" onClick={() => setShowEditCourse(false)}>Cancel</Button><Button variant="warning" type="submit">Save Changes</Button></Modal.Footer>
//                 </Form>
//             </Modal>

//             {/* 2. CURRICULUM MODAL */}
//             <Modal show={showCurriculum} onHide={() => setShowCurriculum(false)} size="lg" centered contentClassName="bg-dark border-secondary text-white">
//                 <Modal.Header closeButton closeVariant="white" className="border-secondary">
//                     <Modal.Title className="fw-bold">Manage Curriculum</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body className="p-4 bg-black bg-opacity-25">
//                     <div className="d-flex justify-content-between align-items-center mb-4">
//                         <h5 className="mb-0">{selectedCourse?.title}</h5>
//                         <Button variant="outline-warning" size="sm" onClick={handleAddModule}><FiPlus /> Add Module</Button>
//                     </div>
//                     <Accordion className="custom-accordion">
//                         {selectedCourse?.modules.map((mod, idx) => (
//                             <ModuleItem
//                                 key={mod.id}
//                                 mod={mod}
//                                 idx={idx}
//                                 onAddLesson={handleAddLesson}
//                                 onEditModule={handleEditModule}
//                                 onDeleteModule={(id) => { if (confirm("Delete module?")) { const upd = { ...selectedCourse, modules: selectedCourse.modules.filter(m => m.id !== id) }; setSelectedCourse(upd); setCourses(c => c.map(item => item.id === upd.id ? upd : item)); } }}
//                                 onEditLesson={(mid, l) => { const nt = prompt("Edit lesson title:", l.title); if (!nt) return; const upd = { ...selectedCourse, modules: selectedCourse.modules.map(m => m.id === mid ? { ...m, lessons: m.lessons.map(ls => ls.id === l.id ? { ...ls, title: nt } : ls) } : m) }; setSelectedCourse(upd); setCourses(c => c.map(item => item.id === upd.id ? upd : item)); }}
//                                 onDeleteLesson={handleDeleteLesson}
//                             />
//                         ))}
//                     </Accordion>
//                 </Modal.Body>
//             </Modal>

//             {/* 3. BATCHES MODAL */}
//             <Modal show={showBatches} onHide={() => setShowBatches(false)} size="xl" centered contentClassName="bg-dark border-secondary text-white">
//                 <Modal.Header closeButton closeVariant="white" className="border-secondary">
//                     <Modal.Title className="fw-bold">Batch Management</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body className="p-4 bg-black bg-opacity-25">
//                     <div className="d-flex justify-content-between align-items-center mb-4">
//                         <h6>Existing Batches for <span className="text-warning">{selectedCourse?.title}</span></h6>
//                         <Button variant="info" size="sm" onClick={() => openBatchEditor()}><FiPlus /> Create New Batch</Button>
//                     </div>
//                     <Table responsive hover variant="dark">
//                         <thead><tr className="small text-secondary"><th>BATCH</th><th>TEACHER</th><th>DATES</th><th>MAX</th><th>SLOTS</th><th>STATUS</th><th>ACTIONS</th></tr></thead>
//                         <tbody className="small">
//                             {selectedCourse?.batches.map(b => (
//                                 <tr key={b.id}>
//                                     <td>{b.name}</td>
//                                     <td>{b.teacher}</td>
//                                     <td><div className="x-small">{b.startDate} to {b.endDate}</div></td>
//                                     <td>{b.maxStudents}</td>
//                                     <td><Badge bg="secondary" className="bg-opacity-10">{b.slots.length} Slots</Badge></td>
//                                     <td><Badge bg="info">{b.status}</Badge></td>
//                                     <td>
//                                         <button className="btn btn-link link-light p-1 me-2" onClick={() => openBatchEditor(b)}><FiEdit3 size={16} /></button>
//                                         <button className="btn btn-link link-danger p-1" onClick={() => { if (confirm("Delete batch?")) { const upd = { ...selectedCourse, batches: selectedCourse.batches.filter(item => item.id !== b.id) }; setSelectedCourse(upd); setCourses(c => c.map(item => item.id === upd.id ? upd : item)); } }}><FiTrash2 size={16} /></button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </Modal.Body>
//             </Modal>

//             {/* 4. BATCH EDITOR (Nested Modal style or separate window) */}
//             <Modal show={showBatchEditor} onHide={() => setShowBatchEditor(false)} size="lg" centered contentClassName="bg-dark border-info border-opacity-25">
//                 <Form onSubmit={saveBatch}>
//                     <Modal.Header closeButton closeVariant="white" className="border-info border-opacity-10">
//                         <Modal.Title className="fw-bold text-info">Batch Details & Scheduling</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body className="bg-black bg-opacity-25 p-4">
//                         <Row className="g-3 mb-4">
//                             <Col md={12}><Form.Label>Batch Name</Form.Label><Form.Control value={activeBatch?.name} onChange={e => setActiveBatch({ ...activeBatch, name: e.target.value })} className="bg-dark border-secondary text-white shadow-none" /></Col>
//                             <Col md={6}><Form.Label>Start Date</Form.Label><Form.Control type="date" value={activeBatch?.startDate} onChange={e => setActiveBatch({ ...activeBatch, startDate: e.target.value })} className="bg-dark border-secondary text-white shadow-none" /></Col>
//                             <Col md={6}><Form.Label>End Date</Form.Label><Form.Control type="date" value={activeBatch?.endDate} onChange={e => setActiveBatch({ ...activeBatch, endDate: e.target.value })} className="bg-dark border-secondary text-white shadow-none" /></Col>
//                             <Col md={4}><Form.Label>Max Students</Form.Label><Form.Control type="number" value={activeBatch?.maxStudents} onChange={e => setActiveBatch({ ...activeBatch, maxStudents: e.target.value })} className="bg-dark border-secondary text-white shadow-none" /></Col>
//                             <Col md={4}><Form.Label>Teacher</Form.Label>
//                                 <Form.Select value={activeBatch?.teacher} onChange={e => setActiveBatch({ ...activeBatch, teacher: e.target.value })} className="bg-dark border-secondary text-white shadow-none">
//                                     <option value="">Select Teacher</option>
//                                     {teachers.map(t => <option key={t} value={t}>{t}</option>)}
//                                 </Form.Select>
//                             </Col>
//                             <Col md={4}><Form.Label>Status</Form.Label>
//                                 <Form.Select value={activeBatch?.status} onChange={e => setActiveBatch({ ...activeBatch, status: e.target.value })} className="bg-dark border-secondary text-white shadow-none">
//                                     <option value="Upcoming">Upcoming</option>
//                                     <option value="Ongoing">Ongoing</option>
//                                     <option value="Finished">Finished</option>
//                                 </Form.Select>
//                             </Col>
//                             <Col md={12}><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={2} value={activeBatch?.description} onChange={e => setActiveBatch({ ...activeBatch, description: e.target.value })} className="bg-dark border-secondary text-white shadow-none" /></Col>
//                         </Row>

//                         <div className="border-top border-secondary border-opacity-10 pt-4">
//                             <div className="d-flex justify-content-between align-items-center mb-3">
//                                 <h6 className="mb-0 text-info fw-bold d-flex align-items-center gap-2"><FiClock /> Time Slots</h6>
//                                 <Button variant="outline-info" size="sm" onClick={addSlot}><FiPlus /> Add Slot</Button>
//                             </div>
//                             <Stack gap={2}>
//                                 {activeBatch?.slots.map((slot, sIdx) => (
//                                     <div key={slot.id} className="bg-dark p-2 rounded d-flex align-items-center gap-3">
//                                         <div className="flex-grow-1">
//                                             <Row className="g-2">
//                                                 <Col md={4}>
//                                                     <Form.Select size="sm" value={slot.day} onChange={e => { const ns = [...activeBatch.slots]; ns[sIdx].day = e.target.value; setActiveBatch({ ...activeBatch, slots: ns }); }} className="bg-black border-secondary text-white">
//                                                         {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => <option key={d}>{d}</option>)}
//                                                     </Form.Select>
//                                                 </Col>
//                                                 <Col md={4}><Form.Control size="sm" type="time" value={slot.start} onChange={e => { const ns = [...activeBatch.slots]; ns[sIdx].start = e.target.value; setActiveBatch({ ...activeBatch, slots: ns }); }} className="bg-black border-secondary text-white" /></Col>
//                                                 <Col md={4}><Form.Control size="sm" type="time" value={slot.end} onChange={e => { const ns = [...activeBatch.slots]; ns[sIdx].end = e.target.value; setActiveBatch({ ...activeBatch, slots: ns }); }} className="bg-black border-secondary text-white" /></Col>
//                                             </Row>
//                                         </div>
//                                         <Button variant="link" className="text-danger p-0" onClick={() => removeSlot(slot.id)}><FiTrash2 size={16} /></Button>
//                                     </div>
//                                 ))}
//                                 {activeBatch?.slots.length === 0 && <div className="text-center py-3 text-secondary x-small opacity-50 border border-dashed border-secondary rounded overflow-hidden">No time slots added.</div>}
//                             </Stack>
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer className="border-info border-opacity-10">
//                         <Button variant="secondary" onClick={() => setShowBatchEditor(false)}>Discard</Button>
//                         <Button variant="info" type="submit" className="fw-bold">Save Batch</Button>
//                     </Modal.Footer>
//                 </Form>
//             </Modal>

//             <style>{`
//                 .x-small { font-size: 11px; }
//                 .transition-all { transition: all 0.2s; }
//                 .hover-info:hover { color: #0dcaf0 !important; }
//                 .hover-danger:hover { color: #dc3545 !important; }
//                 .custom-accordion .accordion-button { background: transparent !important; color: white !important; font-size: 14px; box-shadow: none !important; }
//                 .custom-accordion .accordion-button:not(.collapsed) { color: #ffc107 !important; background: rgba(255,193,7,0.05) !important; }
//                 .custom-accordion .accordion-button:after { filter: invert(1); }
//                 .border-dashed { border-style: dashed !important; }
//             `}</style>
//         </Container>
//     );
// };

// export default CourseList;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Badge, Form, InputGroup } from 'react-bootstrap';
import {
    FiPlus, FiEdit3, FiTrash2, FiUsers, FiBookOpen,
    FiInbox
} from 'react-icons/fi';
import { useCommonContext } from "../../helper/CommonProvider";

const CourseList = () => {
    const navigate = useNavigate();

    const {
        getCategoryList,
        category,
        getSubCategoryList,
        subcategory,
        getCourseList,
        courseList,
        deleteCourse
    } = useCommonContext();

    // ---------------- FILTER STATE ----------------
    const [filters, setFilters] = useState({
        search: "",
        category_id: "",
        subcategory_id: "",
        status: "",
        page: 1,
    });

    // ---------------- LOADERS ----------------
    useEffect(() => {
        getCategoryList();
        getCourseList(filters);
    }, []);

    // ---------------- FILTER HANDLERS ----------------
    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        const updated = { ...filters, [name]: value, page: 1 };

        if (name === "category_id") {
            updated.subcategory_id = "";
            getSubCategoryList(value);
        }

        setFilters(updated);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;

        let updated = { ...filters, [name]: value };

        if (name === "category_id") {
            updated.subcategory_id = "";
            getSubCategoryList(value);
        }

        setFilters(updated);
    };
    useEffect(() => {
        getCourseList(filters);
    }, [filters]);

    const clearFilters = () => {
        setFilters({
            search: "",
            category_id: "",
            subcategory_id: "",
            status: "",
            page: 1,
        });
    };

    // ---------------- DELETE ----------------
    const handleDeleteCourse = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            await deleteCourse(id);
            getCourseList(filters);
        }
    };
    return (
        <Container fluid className="text-white py-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1 text-white">Advanced Course Management</h2>
                    <p className="text-secondary small">Manage, filter, and organize your curriculum and batches efficiently.</p>
                </div>
                <Button variant="warning" className="fw-bold px-4" onClick={() => navigate('/add-course')}>
                    <FiPlus /> Add Course
                </Button>
            </div>

            {/* Filter Bar */}
            <Card className="bg-dark border-secondary border-opacity-10 mb-4 shadow-lg overflow-hidden" style={{ backgroundColor: '#1E1E1E' }}>
                <Card.Body className="p-3">
                    <Row className="g-3 align-items-end">
                        <Col lg={4} md={6}>
                            <Form.Group>
                                <Form.Label className="small text-secondary fw-bold mb-2">SEARCH TITLE</Form.Label>
                                <InputGroup className="bg-black rounded border border-secondary border-opacity-25 px-2">
                                    <InputGroup.Text className="bg-transparent border-0 text-secondary pe-2">
                                        <FiBookOpen size={16} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        name="search"
                                        value={filters.search}
                                        onChange={handleFilterChange}
                                        placeholder="Type course name..."
                                        className="bg-transparent border-0 text-white shadow-none py-2"
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>

                        <Col lg={2} md={3}>
                            <Form.Group>
                                <Form.Label className="small text-secondary fw-bold mb-2">CATEGORY</Form.Label>
                                <Form.Select
                                    name="category_id"
                                    value={filters.category_id}
                                    onChange={handleFilterChange}
                                    className="bg-black border-secondary border-opacity-25 text-white py-2 shadow-none"
                                >
                                    <option value="">All Categories</option>
                                    {category?.data?.categories?.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.title}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col lg={2} md={3}>
                            <Form.Group>
                                <Form.Label className="small text-secondary fw-bold mb-2">SUBCATEGORY</Form.Label>
                                <Form.Select
                                    name="subcategory_id"
                                    value={filters.subcategory_id}
                                    onChange={handleFilterChange}
                                    className="bg-black border-secondary border-opacity-25 text-white py-2 shadow-none"
                                >
                                    <option value="">All Sub-cat</option>
                                    {subcategory?.data?.map(sub => (
                                        <option key={sub.id} value={sub.id}>{sub.title}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col lg={2} md={6}>
                            <Form.Group>
                                <Form.Label className="small text-secondary fw-bold mb-2">STATUS</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={filters.status}
                                    onChange={handleFilterChange}
                                    className="bg-black border-secondary border-opacity-25 text-white py-2 shadow-none"
                                >
                                    <option value="">Any Status</option>
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                    <option value="archived">Archived</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col lg={2} md={6}>
                            <Button
                                variant="outline-secondary"
                                onClick={clearFilters}
                                className="w-100 text-white border-secondary border-opacity-25 py-2 fw-bold"
                            >
                                Clear All
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Table */}
            <Card className="bg-dark border-secondary border-opacity-25 shadow-sm overflow-hidden" style={{ backgroundColor: '#1E1E1E' }}>
                <Table responsive hover variant="dark" className="align-middle mb-0 bg-transparent">
                    <thead className="bg-black bg-opacity-50 text-secondary small">
                        <tr>
                            <th className="px-4 py-3 border-0">COURSE</th>
                            <th className="py-3 border-0">CATEGORY</th>
                            <th className="py-3 border-0">PRICE</th>
                            <th className="py-3 border-0 text-center">STATUS</th>
                            <th className="py-3 border-0 text-end pe-4">MANAGEMENT</th>
                        </tr>
                    </thead>

                    <tbody className="small">
                        {courseList?.data?.length > 0 ? (
                            courseList.data.map(course => (
                                <tr key={course.id} className="border-bottom border-secondary border-opacity-10">
                                    <td className="px-4 py-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <img
                                                src={
                                                    course.thumbnail
                                                        ? `${import.meta.env.VITE_APP_TEACHER_DOC_URL}/${course.thumbnail}`
                                                : "/no-image.png"
                                        }
                                                className="rounded"
                                                style={{ width: '48px', height: '32px', objectFit: 'cover' }}
                                            />

                                            <div>
                                                <div className="fw-bold">{course.title}</div>
                                                <div className="text-secondary" style={{ fontSize: '10px' }}>
                                                    {course.subcategory_name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <Badge bg="secondary" className="bg-opacity-25 text-secondary">
                                            {course.category_name}
                                        </Badge>
                                    </td>

                                    <td className="text-warning fw-bold">₹{course.price}</td>

                                    <td className="text-center">
                                        <Badge
                                            bg={course.status === 'published' ? 'success' : course.status === 'draft' ? 'warning' : 'danger'}
                                            className={course.status === 'draft' ? 'text-black' : ''}
                                        >
                                            {course.status}
                                        </Badge>
                                    </td>

                                    <td className="text-end pe-4">
                                        <div className="d-flex justify-content-end gap-2">
                                            <Button variant="outline-warning" size="sm" onClick={() => navigate(`/manage-curriculum/${course.id}`)}>
                                                <FiBookOpen size={16} />
                                            </Button>
                                            <Button variant="outline-info" size="sm" onClick={() => navigate(`/manage-batches/${course.id}`)}>
                                                <FiUsers size={16} />
                                            </Button>
                                            <Button variant="outline-primary" size="sm" onClick={() => navigate(`/edit-course/${course.id}`)}>
                                                <FiEdit3 size={16} />
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteCourse(course.id)}>
                                                <FiTrash2 size={16} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-5">
                                    <FiInbox size={50} className="text-secondary mb-3 opacity-25" />
                                    <h5 className="text-secondary">No courses found</h5>
                                    <Button variant="link" onClick={clearFilters} className="text-warning p-0">
                                        Clear all filters
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
};

export default CourseList;
