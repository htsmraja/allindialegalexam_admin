// import React, { useEffect, useState } from 'react';
// import CommonBreadcrumb from '../../component/common/bread-crumb';
// import {
//     Button,
//     Card,
//     CardBody,
//     Col,
//     Container,
//     Input,
//     Row,
//     Spinner,
//     Table,
// } from "reactstrap";
// import { useNavigate } from 'react-router-dom';
// import { useCommonContext } from '../../helper/CommonProvider';

// const TeacherList = () => {
//     const navigate = useNavigate();
//     const { teacherList, getTeacherList, approveTeacher, rejectTeacher } = useCommonContext();

//     const [search, setSearch] = useState("");

//     useEffect(() => {
//         getTeacherList({ page: 1, search: "" });
//     }, []);

//     const handleSearch = (e) => {
//         const value = e.target.value;
//         setSearch(value);
//         getTeacherList({ page: 1, search: value });
//     };
//     const onOpenModal = () => navigate("/add-teacher");
//     const handleApprove = (id) => {
//         approveTeacher(id);
//         getTeacherList({ page: 1, search: "" });
//     }
//     const handleReject = (id) => {
//         rejectTeacher(id);
//         getTeacherList({ page: 1, search: "" });
//     }
//     return (
//         <>
//             <CommonBreadcrumb title="Teacher List" />

//             <Container fluid>
//                 <Col sm="12">
//                     <Card>
//                         <CardBody>

//                             {/* Search */}
//                             <div className="row align-items-center mb-4">
//                                 <div className="col-md-6">
//                                     <Input
//                                         placeholder="Search Teacher (name / email / phone)"
//                                         className="form-control"
//                                         value={search}
//                                         onChange={handleSearch}
//                                     />
//                                 </div>
//                                 <div className="col-md-6 d-flex justify-content-end">
//                                     <button
//                                         onClick={onOpenModal}
//                                         className="btn btnGreen"
//                                     >
//                                         + Add Teacher
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* TABLE */}
//                             <div className="product-physical">
//                                 <div className="promo-code-list">

//                                     <Table hover responsive bordered>
//                                         <thead>
//                                             <tr>
//                                                 <th>ID</th>
//                                                 <th>Name</th>
//                                                 <th>Email</th>
//                                                 <th>Phone</th>
//                                                 <th>Experience</th>
//                                                 <th>Commission</th>
//                                                 <th> C Status</th>
//                                                 <th>Change </th>
//                                                 <th>KYC Doc</th>
//                                                 <th>Degree Doc</th>
//                                                 <th>Created At</th>
//                                                 <th>Action</th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>

//                                             {/* LOADING STATE */}
//                                             {teacherList.loading && (
//                                                 <tr>
//                                                     <td colSpan="15" className="text-center">
//                                                         <Spinner />
//                                                     </td>
//                                                 </tr>
//                                             )}

//                                             {/* EMPTY STATE */}
//                                             {!teacherList.loading && teacherList.data?.length === 0 && (
//                                                 <tr>
//                                                     <td colSpan="15" className="text-center">
//                                                         No Teachers Found
//                                                     </td>
//                                                 </tr>
//                                             )}

//                                             {/* DATA LIST */}
//                                             {!teacherList.loading && teacherList.data?.map((item) => (
//                                                 <tr key={item.id}>
//                                                     <td>{item.id}</td>
//                                                     <td>{item.full_name}</td>
//                                                     <td>{item.email}</td>
//                                                     <td>{item.phone || "-"}</td>
//                                                     <td>{item.experience_years} Years</td>

//                                                     <td>
//                                                         {item.commission_type}
//                                                         <br />
//                                                         <strong>{item.commission_value}</strong>
//                                                     </td>

//                                                     <td>
//                                                         <span
//                                                             className={
//                                                                 item.approval_status === "approved"
//                                                                     ? "text-success fw-bold"
//                                                                     : item.approval_status === "rejected"
//                                                                         ? "text-danger fw-bold"
//                                                                         : "text-warning fw-bold"
//                                                             }
//                                                         >
//                                                             {item.approval_status}
//                                                         </span>
//                                                     </td>
//                                                     <td>
//                                                         <Button
//                                                             color="primary"
//                                                             size="sm"
//                                                             className="me-2 mb-2"
//                                                             onClick={() => handleApprove(item.id)}
//                                                         // disabled={item.approval_status == "approved"}
//                                                         >
//                                                             Approve
//                                                         </Button>

//                                                         <Button
//                                                             color="danger"
//                                                             size="sm"
//                                                             onClick={() => handleReject(item.id)}
//                                                         //disabled={item.approval_status == "rejected"}
//                                                         >
//                                                             Reject
//                                                         </Button>

//                                                     </td>
//                                                     {/* KYC DOCUMENT VIEW / DOWNLOAD */}
//                                                     <td>
//                                                         {item.kyc_document ? (
//                                                             <>
//                                                                 <a
//                                                                     href={`${import.meta.env.VITE_APP_TEACHER_DOC_URL}/${item.kyc_document}`}
//                                                                     target="_blank"
//                                                                     rel="noopener noreferrer"
//                                                                     className="btn btn-sm btn-info mb-1"
//                                                                 >
//                                                                     View
//                                                                 </a>
//                                                                 <br />
//                                                                 <a
//                                                                     href={`${import.meta.env.VITE_APP_TEACHER_DOC_URL}/${item.kyc_document}`}
//                                                                     download
//                                                                     className="btn btn-sm btn-warning mt-1"
//                                                                 >
//                                                                     Download
//                                                                 </a>
//                                                             </>
//                                                         ) : (
//                                                             <span className="text-muted">No File</span>
//                                                         )}
//                                                     </td>

//                                                     {/* DEGREE DOCUMENT VIEW / DOWNLOAD */}
//                                                     <td>
//                                                         {item.degree_document ? (
//                                                             <>
//                                                                 <a
//                                                                     href={`${import.meta.env.VITE_APP_TEACHER_DOC_URL}/${item.degree_document}`}
//                                                                     target="_blank"
//                                                                     rel="noopener noreferrer"
//                                                                     className="btn btn-sm btn-info mb-1"
//                                                                 >
//                                                                     View
//                                                                 </a>
//                                                                 <br />
//                                                                 <a
//                                                                     href={`${import.meta.env.VITE_APP_TEACHER_DOC_URL}/${item.degree_document}`}
//                                                                     download
//                                                                     className="btn btn-sm btn-warning mt-1"
//                                                                 >
//                                                                     Download
//                                                                 </a>
//                                                             </>
//                                                         ) : (
//                                                             <span className="text-muted">No File</span>
//                                                         )}
//                                                     </td>

//                                                     <td>{new Date(item.created_at).toLocaleDateString()}</td>

//                                                     <td>
//                                                         <Button
//                                                             color="primary"
//                                                             size="sm"
//                                                             className="me-2"
//                                                             onClick={() => navigate(`/teacher/${item.id}`)}
//                                                         >
//                                                             View
//                                                         </Button>

//                                                         <Button
//                                                             color="danger"
//                                                             size="sm"
//                                                             onClick={() => console.log("Delete", item.id)}
//                                                         >
//                                                             Delete
//                                                         </Button>
//                                                     </td>
//                                                 </tr>
//                                             ))}

//                                         </tbody>
//                                     </Table>

//                                 </div>
//                             </div>

//                         </CardBody>
//                     </Card>
//                 </Col>
//             </Container>
//         </>
//     );
// };

// export default TeacherList;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Badge, Form, Stack, Pagination, Offcanvas, Tabs, Tab, ListGroup, ProgressBar, Dropdown, Alert, Image } from 'react-bootstrap';
import {
    FiPlus, FiEdit2, FiTrash2, FiSearch, FiDownload, FiCheck, FiX,
    FiUser, FiFileText, FiRefreshCw, FiSlash, FiShield, FiMoreVertical, FiStar,
    FiBriefcase, FiCalendar, FiPhone, FiMail, FiArrowRight
} from 'react-icons/fi';
import { teachersData, teacherStats } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { MdAdd, MdFilterList, MdFileDownload } from 'react-icons/md';
import { useCommonContext } from '../../helper/CommonProvider';
const TeacherList = () => {
    const navigate = useNavigate();
    const { teacherList, getTeacherList, approveTeacher, rejectTeacher, teacherDetails, getTeacherDetails } = useCommonContext();

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        search: "",
        approval_status: "",
        is_active: ""
    });
    useEffect(() => {
        getTeacherList(filters);
    }, [filters]);


    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        getTeacherList({ page: 1, search: value });
    };
    const getInitials = (name) => {
        if (!name) return "";

        const words = name.trim().split(" ");

        const firstLetter = words[0][0];
        const lastLetter = words[words.length - 1][0];

        return (firstLetter + lastLetter).toUpperCase();
    };
    // {getInitials(t.name)}
    const [teachers, setTeachers] = useState(teachersData);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Mock Performance Data
    const performanceData = [
        { month: 'Jan', rating: 4.2, classes: 12 },
        { month: 'Feb', rating: 4.5, classes: 15 },
        { month: 'Mar', rating: 4.8, classes: 18 },
    ];

    const filteredTeachers = teachers.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchText.toLowerCase()) || t.email.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleViewDetails = (teacher) => {
        setSelectedTeacher(teacher);
        setShowDrawer(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this teacher? This action cannot be undone.')) {
            setTeachers(teachers.filter(t => t.id !== id));
            if (selectedTeacher && selectedTeacher.id === id) setShowDrawer(false);
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setTeachers(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
        if (selectedTeacher && selectedTeacher.id === id) {
            setSelectedTeacher(prev => ({ ...prev, status: newStatus }));
        }
    };

    const StatCard = ({ title, count, color, trend }) => (
        <Card className="bg-dark border-0 text-center shadow-sm h-100 transition-hover" style={{ backgroundColor: '#1E1E1E !important' }}>
            <Card.Body className="py-3">
                <div className="text-secondary small text-uppercase tracking-wider mb-2" style={{ fontSize: '10px' }}>{title}</div>
                <div className={`text-${color} h4 fw-bold mb-0`}>{count}</div>
                <div className=" mt-1 text-white" style={{ fontSize: '10px' }}>{trend} last month</div>
            </Card.Body>
        </Card>
    );
    const filterButtons = [
        { label: "All", key: null, value: "" },

        { label: "Approved", key: "approval_status", value: "approved" },
        { label: "Pending", key: "approval_status", value: "pending" },
        { label: "Rejected", key: "approval_status", value: "rejected" },

        { label: "Active", key: "is_active", value: 1 },
        { label: "Deactive", key: "is_active", value: 0 },
    ];
    useEffect(() => {
        if (selectedTeacher) {
            getTeacherDetails(selectedTeacher);
        }
    }, [selectedTeacher]);
    const handleApprove = (id) => {
        approveTeacher(id);
        getTeacherList(filters);
    }
    const handleReject = (id) => {
        rejectTeacher(id);
        getTeacherList(filters);
    }
    return (
        <div className="admin-page text-white pt-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className=" mb-1 text-white ">Teacher Applications</h2>
                    <p className="text-secondary small">
                        Manage and overview your {"Teacher Applications".toLowerCase()} here.
                    </p>
                </div>
                <div className="d-flex gap-2">
                    <Button variant="outline-secondary" className="d-flex align-items-center gap-2">
                        <MdFilterList /> Filter
                    </Button>
                    <Button variant="outline-secondary" className="d-flex align-items-center gap-2">
                        <MdFileDownload /> Export
                    </Button>
                    <Button variant="warning" className="d-flex align-items-center gap-2 fw-bold" onClick={() => navigate('/add-teacher')}>
                        <MdAdd /> Add Faculty
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <Row className="g-3 mb-4">
                <Col xs={6} md={true}>
                    <StatCard title="Total Teachers" count={teacherStats.total} color="light" trend="+3" />
                </Col>
                <Col xs={6} md={true}>
                    <StatCard title="Active Faculty" count={teacherStats.active} color="success" trend="+1" />
                </Col>
                <Col xs={6} md={true}>
                    <StatCard title="Pending Review" count={teacherStats.pending} color="warning" trend="+2" />
                </Col>
                <Col xs={6} md={true}>
                    <StatCard title="Suspended" count={teacherStats.suspended} color="danger" trend="0" />
                </Col>
                <Col xs={12} md={true}>
                    <StatCard title="Avg Rating" count={`★ ${teacherStats.avgRating}`} color="warning" trend="+0.2" />
                </Col>
            </Row>

            {/* Content Card */}
            <Card className="bg-dark border-secondary shadow-sm overflow-hidden" style={{ backgroundColor: '#1E1E1E !important' }}>
                <Card.Header className="bg-transparent border-secondary p-4">
                    <Row className="align-items-center g-3">
                        <Col lg={6}>
                            <Stack direction="horizontal" gap={1} className="flex-wrap">
                                {/* {[
                                    { label: "All", value: "" },
                                    { label: "Approved", value: "approved" },
                                    { label: "Pending", value: "pending" },
                                    { label: "Rejected", value: "rejected" },
                                    { label: "Active", value: 1 },
                                    { label: "Deactive", value: 0 }
                                ].map(({ label, value }) => (
                                    <Button
                                        key={label}
                                        size="sm"
                                        variant={filters.approval_status === value ? 'warning' : 'outline-secondary'}
                                        className={`px-3 ${filters.approval_status === value
                                            ? 'text-black fw-bold'
                                            : 'text-secondary border-secondary'
                                            }`}
                                        onClick={() =>
                                            setFilters(prev => ({
                                                ...prev,
                                                approval_status: value,
                                                page: 1
                                            }))
                                        }
                                    >
                                        {label}
                                    </Button>
                                ))}
                                {[
                                    { label: "Active", value: 1 },
                                    { label: "Deactive", value: 0 },

                                ].map(({ label, value }) => (
                                    <Button
                                        key={label}
                                        size="sm"
                                        variant={filters.is_active === value ? 'warning' : 'outline-secondary'}
                                        className={`px-3 ${filters.is_active === value
                                            ? 'text-black fw-bold'
                                            : 'text-secondary border-secondary'
                                            }`}
                                        onClick={() =>
                                            setFilters(prev => ({
                                                ...prev,
                                                is_active: value,
                                                page: 1
                                            }))
                                        }
                                    >
                                        {label}
                                    </Button>
                                ))} */}
                                {filterButtons.map(({ label, key, value }) => {
                                    const isSelected =
                                        key === null
                                            ? filters.approval_status === "" && filters.is_active === ""
                                            : filters[key] === value;

                                    return (
                                        <Button
                                            key={label}
                                            size="sm"
                                            variant={isSelected ? "warning" : "outline-secondary"}
                                            className={`px-3 ${isSelected ? "text-black fw-bold" : "text-secondary border-secondary"
                                                }`}
                                            onClick={() =>
                                                setFilters(prev => ({
                                                    ...prev,
                                                    approval_status: key === "approval_status" ? value : "",
                                                    is_active: key === "is_active" ? value : "",
                                                    page: 1
                                                }))
                                            }
                                        >
                                            {label}
                                        </Button>
                                    );
                                })}

                            </Stack>
                        </Col>
                        <Col lg={6}>
                            <Stack direction="horizontal" gap={3} className="justify-content-lg-end">
                                <Form.Control
                                    placeholder="Search teacher..."
                                    className="bg-black border-secondary text-white small w-auto"
                                    value={filters.search}
                                    onChange={(e) =>
                                        setFilters(prev => ({
                                            ...prev,
                                            search: e.target.value,
                                            page: 1
                                        }))
                                    }
                                />
                                <Button variant="outline-secondary" className="border-secondary text-white btn-sm px-3">
                                    <FiDownload className="me-2" /> Export
                                </Button>
                            </Stack>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table responsive hover variant="dark" className="mb-0 custom-table align-middle">
                        <thead className="bg-black">
                            <tr className="text-secondary small text-uppercase">
                                <th className="px-4 py-3 border-secondary">Profile</th>
                                <th className="px-4 py-3 border-secondary">Subject & Type</th>
                                <th className="px-4 py-3 border-secondary">Stats</th>
                                <th className="px-4 py-3 border-secondary">Status</th>
                                <th className="px-4 py-3 border-secondary">Expiry</th>
                                <th className="px-4 py-3 border-secondary text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacherList?.data?.map(teacher => (
                                <tr key={teacher.id} className="border-secondary clickable-row shadow-hover" onClick={() => handleViewDetails(teacher.id)}>
                                    <td className="px-4 py-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="rounded-circle bg-warning text-black fw-bold d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px', minWidth: '38px' }}>
                                                {getInitials(teacher.full_name)}
                                            </div>
                                            <div>
                                                <div className="fw-bold hover-text-warning">{teacher.full_name}</div>
                                                <div className="text-secondary small" style={{ fontSize: '11px' }}>{teacher.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-light">{teacher.category_name}</div>
                                        <Badge bg="primary bg-opacity-25 text-primary" className="fw-normal mt-1" style={{ fontSize: '10px' }}>{teacher.commission_type}</Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-secondary small">Rating: <span className="text-warning fw-bold">★ {teacher.rating || 5}</span></div>
                                        <div className="text-secondary small mt-1">Attendance: <span className={teacher.attendance > 85 ? "text-success" : "text-danger"}>{teacher.attendance || 72}%</span></div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className={`rounded-circle bg-${teacher.approval_status === 'approved' ? 'success' : teacher.approval_status === 'pending' ? 'warning' : 'danger'}`} style={{ width: '8px', height: '8px' }}></div>
                                            <span className={`small text-${teacher.approval_status === 'approved' ? 'success' : teacher.approval_status === 'pending' ? 'warning' : 'danger'}`}>{teacher.approval_status}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3"><span className="text-secondary font-monospace small">{teacher.contract_expires_at}</span></td>
                                    <td className="px-4 py-3 text-center">
                                        <Stack direction="horizontal" gap={2} className="justify-content-center" onClick={e => e.stopPropagation()}>
                                            {teacher.status === 'pending' && (
                                                <Button variant="success" size="sm" className="px-2 py-0" style={{ fontSize: '10px' }} onClick={() => handleViewDetails(teacher)}>Verify</Button>
                                            )}
                                            <Button variant="link" className="text-secondary p-1" onClick={() => navigate('/edit-teacher')}><FiEdit2 /></Button>
                                            <Button variant="link" className="text-danger p-1" onClick={() => handleDelete(teacher.id)}><FiTrash2 /></Button>
                                        </Stack>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Profile Drawer */}
            <Offcanvas show={showDrawer} onHide={() => setShowDrawer(false)} placement="end" style={{ width: '700px' }} className="bg-black text-white border-start border-secondary">
                <Offcanvas.Header closeButton closeVariant="white" className="border-bottom border-secondary bg-dark">
                    <Offcanvas.Title className="w-100">
                        {teacherDetails?.data && (
                            <div className="d-flex justify-content-between align-items-center pe-4">
                                <span className="text-warning fw-bold">{teacherDetails?.data?.teacher.full_name}</span>
                                {teacherDetails?.data?.teacher.approval_status === 'pending' && <Badge bg="warning text-black" className="fw-bold">PENDING APPROVAL</Badge>}
                            </div>
                        )}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0 d-flex flex-column h-100">
                    {teacherDetails?.data && (
                        <div className="flex-grow-1 overflow-auto">
                            <Tabs defaultActiveKey="overview" className="custom-tabs border-bottom border-secondary px-3 bg-black sticky-top shadow-sm">
                                <Tab eventKey="overview" title="Overview" className="p-4">
                                    <Card className="bg-dark border-secondary mb-4 p-3 shadow-sm">
                                        <Row className="align-items-center">
                                            <Col xs="auto">
                                                <div className="rounded-circle bg-warning text-black fw-bold d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px', fontSize: '28px' }}>
                                                    {getInitials(teacherDetails?.data?.teacher.full_name)}
                                                </div>
                                            </Col>
                                            <Col>
                                                <Row className="g-3">
                                                    <Col xs={6}>
                                                        <div className="text-secondary small" style={{ fontSize: '10px' }}>SUBJECT</div>
                                                        <div className="fw-bold">{teacherDetails?.data?.teacher?.category_name}</div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        {teacherDetails?.data?.teacher?.approval_status == 'approved' ? (
                                                            <>
                                                                <div className="text-secondary small" style={{ fontSize: '10px' }}>
                                                                    JOIN DATE
                                                                </div>
                                                                <div className="fw-bold">
                                                                    {teacherDetails?.data?.teacher?.approved_at
                                                                        ? new Date(
                                                                            teacherDetails.data.teacher.approved_at
                                                                        ).toLocaleDateString("en-IN", {
                                                                            day: "2-digit",
                                                                            month: "short",
                                                                            year: "numeric"
                                                                        })
                                                                        : "N/A"}
                                                                </div>
                                                            </>
                                                        ) : (
                                                                <>
                                                                    <div className="text-secondary small" style={{ fontSize: '10px' }}>
                                                                        APPLIED DATE
                                                                    </div>
                                                                    <div className="fw-bold">
                                                                        {teacherDetails?.data?.teacher?.created_at
                                                                            ? new Date(
                                                                                teacherDetails.data.teacher.created_at
                                                                            ).toLocaleDateString("en-IN", {
                                                                                day: "2-digit",
                                                                                month: "short",
                                                                                year: "numeric"
                                                                            })
                                                                            : "N/A"}
                                                                    </div>
                                                                </>
                                                        )}


                                                    </Col>
                                                    <Col xs={6}>
                                                        <div className="text-secondary small" style={{ fontSize: '10px' }}>EMAIL</div>
                                                        <div className="fw-bold small">{teacherDetails?.data?.teacher.email}</div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div className="text-secondary small" style={{ fontSize: '10px' }}>PHONE</div>
                                                        <div className="fw-bold small">{teacherDetails?.data?.teacher.phone || 'N/A'}</div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card>

                                    {teacherDetails?.data?.teacher.approval_status === 'pending' && (
                                        <div className="p-3 border border-warning border-opacity-50 bg-warning bg-opacity-10 rounded mb-4 shadow-sm">
                                            <h6 className="text-black fw-bold mb-3 d-flex align-items-center gap-2">
                                                <FiShield /> Application Review
                                            </h6>
                                            <Row className="g-3 mb-4 text-center">
                                                <Col xs={6}>
                                                    <div className="bg-black p-2 rounded border border-secondary">
                                                        <div className="text-secondary" style={{ fontSize: '9px' }}>KYC STATUS</div>
                                                        <div className="small fw-bold">{teacherDetails?.data?.kycStatus}</div>
                                                    </div>
                                                </Col>
                                                <Col xs={6}>
                                                    <div className="bg-black p-2 rounded border border-secondary">
                                                        <div className="text-secondary" style={{ fontSize: '9px' }}>DOCUMENTS</div>
                                                        <div className="small fw-bold text-success">{teacherDetails?.data?.documents?.length} Uploaded</div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Stack direction="horizontal" gap={3}>
                                                <Button variant="success" className="w-100 fw-bold border-0 h-40"
                                                    onClick={() => handleApprove(teacherDetails?.data?.teacher.id)}
                                                >
                                                    Approve Faculty</Button>
                                                <Button variant="outline-danger" className="w-100 border-secondary text-danger h-40"
                                                    onClick={() => handleReject(teacherDetails?.data?.teacher.id)}
                                                >Reject App</Button>
                                            </Stack>
                                        </div>
                                    )}

                                    <Alert variant="info" className="bg-dark border-info border-opacity-25 text-info py-2 small d-flex align-items-center gap-2">
                                        <FiCalendar /> Contract expires on <strong>{teacherDetails?.data?.teacher?.contract_expires_at
                                            ? new Date(teacherDetails.data.teacher.contract_expires_at).toLocaleDateString()
                                            : "N/A"}
                                        </strong>
                                    </Alert>
                                </Tab>
                                <Tab eventKey="analytics" title="Teaching Analytics" className="p-4">
                                    <Row className="g-3 mb-4 text-center">
                                        <Col xs={4}>
                                            <Card className="bg-dark border-secondary p-2">
                                                <div className="text-secondary" style={{ fontSize: '9px' }}>CLASSES TAKEN</div>
                                                {/* <div className="h4 mb-0 fw-bold">{selectedTeacher.classesConducted}</div> */}
                                            </Card>
                                        </Col>
                                        <Col xs={4}>
                                            <Card className="bg-dark border-secondary p-2">
                                                <div className="text-secondary" style={{ fontSize: '9px' }}>LIVE HOURS</div>
                                                <div className="h4 mb-0 fw-bold text-warning">{selectedTeacher?.liveHours}h</div>
                                            </Card>
                                        </Col>
                                        <Col xs={4}>
                                            <Card className="bg-dark border-secondary p-2">
                                                <div className="text-secondary" style={{ fontSize: '9px' }}>ATTENDANCE AVG</div>
                                                <div className="h4 mb-0 fw-bold text-success">{selectedTeacher?.attendance}%</div>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <h6 className="fw-bold text-secondary mb-3">MONTHLY PERFORMANCE</h6>
                                    <div className="bg-dark rounded p-3 h-200 border border-secondary">
                                        <ResponsiveContainer width="100%" height={200}>
                                            <BarChart data={performanceData}>
                                                <XAxis dataKey="month" stroke="#444" fontSize={10} />
                                                <YAxis stroke="#444" fontSize={10} />
                                                <RechartsTooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '12px' }} />
                                                <Bar dataKey="classes" fill="#fcca0c" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Tab>
                                <Tab eventKey="financials" title="Financials" className="p-4">
                                    <div className="bg-dark p-3 rounded-3 border border-secondary mb-4 d-flex justify-content-between align-items-center">
                                        <div>
                                            <div className="text-secondary small" style={{ fontSize: '10px' }}>CURRENT SALARY STRUCTURE</div>
                                            <div className="h5 fw-bold mb-0 text-white">
                                                {selectedTeacher.salary}
                                                <span className="text-secondary ms-2 small fw-normal">
                                                    ({typeof selectedTeacher.salaryAmount === 'number' ? `₹${selectedTeacher.salaryAmount.toLocaleString()}` : selectedTeacher.salaryAmount})
                                                </span>
                                            </div>
                                        </div>
                                        <Button variant="outline-warning" size="sm" className="border-warning text-warning fw-bold px-3">Configure</Button>
                                    </div>

                                    <h6 className="fw-bold mb-3 text-secondary">PAYOUT HISTORY</h6>
                                    <div className="ps-3 border-start border-secondary">
                                        {(selectedTeacher.payouts || []).map((p, i) => (
                                            <div key={i} className="mb-4 position-relative">
                                                <div className="position-absolute translate-middle-x bg-success" style={{ width: '10px', height: '10px', borderRadius: '50%', left: '-13px', top: '5px' }}></div>
                                                <div className="ms-3">
                                                    <div className="d-flex justify-content-between small">
                                                        <span className="fw-bold text-light">Salary for {p.month}</span>
                                                        <span className="fw-bold text-success">₹{(p.amount || 0).toLocaleString()}</span>
                                                    </div>
                                                    <div className="text-secondary" style={{ fontSize: '11px' }}>Processed on {p.date} • <Badge bg="success bg-opacity-10 text-success fw-normal">{p.status}</Badge></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Tab>
                                <Tab eventKey="documents" title="Documents" className="p-4">
                                    <ListGroup variant="flush">
                                        {(selectedTeacher.documents || []).map((doc, idx) => (
                                            <ListGroup.Item key={idx} className="bg-transparent border-secondary text-white px-0 d-flex justify-content-between align-items-center py-3">
                                                <div className="d-flex align-items-center gap-3">
                                                    <FiFileText className="text-danger" size={20} />
                                                    <span className="small">{doc}</span>
                                                </div>
                                                <Button variant="link" size="sm" className="text-info text-decoration-none"><FiDownload className="me-1" /> Download</Button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Tab>
                            </Tabs>
                        </div>
                    )}
                    <div className="p-3 bg-dark border-top border-secondary d-flex justify-content-between align-items-center shadow-lg">
                        <Button variant="outline-light" className="border-secondary small px-3">
                            <FiRefreshCw className="me-2" /> Replace in Batch
                        </Button>
                        <Stack direction="horizontal" gap={2}>
                            <Button variant="outline-danger" className="border-danger text-danger px-3 small">
                                <FiSlash className="me-1" /> Suspend
                            </Button>
                            <Button variant="danger" className="border-0 px-3 small fw-bold" onClick={() => handleStatusChange(selectedTeacher?.id, 'Terminated')}>
                                Terminate Contract
                            </Button>
                        </Stack>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            <style>{`
                .custom-table tr:hover { background-color: #1a1a1a !important; cursor: pointer; }
                .hover-text-warning:hover { color: #fcca0c !important; }
                .custom-tabs .nav-link { color: #777; border: none; border-bottom: 2px solid transparent; padding: 12px 20px; font-weight: 500; font-size: 14px; }
                .custom-tabs .nav-link.active { background: transparent; color: #fcca0c; border-bottom: 2px solid #fcca0c; }
                .custom-tabs .nav-link:hover { color: #fff; }
                .transition-hover:hover { transform: translateY(-3px); }
                .shadow-hover:hover { box-shadow: 0 0 15px rgba(252, 202, 12, 0.05); }
                .h-200 { height: 200px; }
                .h-40 { height: 40px; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default TeacherList;
