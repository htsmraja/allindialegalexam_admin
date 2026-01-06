// import React from 'react'
// import CommonBreadcrumb from '../component/common/bread-crumb'
// import { Container, Row } from 'reactstrap'
// import TopDashboardCards from '../component/dashboard/TopDashboardCards'
// import { Card } from 'antd';

// import {
//     ArrowUpOutlined,
//     ArrowDownOutlined,
//     ClockCircleOutlined,
//     PlayCircleOutlined,
//     CheckCircleOutlined,
//     CloseCircleOutlined,
//     SyncOutlined,
//     WarningOutlined,
//     UserOutlined,
//     SafetyCertificateOutlined,
//     DollarOutlined,
//     ThunderboltOutlined,
//     DatabaseOutlined,
//     CloudServerOutlined,
//     TeamOutlined,
//     MailOutlined,
//     ReadOutlined,
//     FileTextOutlined,
//     PlusOutlined
// } from '@ant-design/icons';
// const Home = () => {
//     const statsData = [
//         { title: "Total Students", value: 1250, change: "+12%", type: "increase" },
//         { title: "Total Teachers", value: 45, change: "+5%", type: "increase" },
//         { title: "Total Courses", value: 18, change: "0%", type: "neutral" },
//         { title: "Total Tests", value: 64, change: "+8%", type: "increase" },
//         { title: "Total Batches", value: 12, change: "-2%", type: "decrease" },
//     ];

//     const kpiData = [
//         { title: "Student Growth", value: "18.5%", trend: "up" },
//         { title: "Teacher Utilization", value: "85%", trend: "up" },
//         { title: "Avg Attendance", value: "76%", trend: "down" },
//         { title: "Revenue / Student", value: "₹4,200", trend: "up" },
//     ];
//     const KPITile = ({ title, value, trend, prefix }) => (
//         <Card bordered={false} className="!bg-[#1E1E1E] !border-none text-center hover:scale-105 transition-transform duration-300 shadow-lg">
//             <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{title}</div>
//             <div className="text-white text-2xl font-bold flex items-center justify-center gap-2">
//                 {prefix}{value}
//                 {trend === 'up' ? <ArrowUpOutlined className="text-green-500 text-xs" /> : <ArrowDownOutlined className="text-red-500 text-xs" />}
//             </div>
//         </Card>
//     );
//     return (
//         <>
//             <CommonBreadcrumb title="Dashboard" parent="Dashboard" />
//             <Container fluid>
//                 <Row>
//                     <TopDashboardCards />

//                 </Row>
//                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                     {statsData.map((s, i) => <KPITile key={i} title={s.title} value={s.value} trend={s.type === 'increase' ? 'up' : 'down'} />)}
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {kpiData.map((k, i) => <KPITile key={i} title={k.title} value={k.value} trend={k.trend} prefix="" />)}
//                 </div>
//             </Container>
//         </>
//     )
// }

// export default Home


import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, ProgressBar, Form, ListGroup, OverlayTrigger, Tooltip as BootstrapTooltip, Tab, Nav } from 'react-bootstrap';
import {
    MdArrowUpward, MdArrowDownward, MdAccessTime, MdPlayCircleOutline,
    MdCheckCircle, MdCancel, MdSync, MdWarning, MdPerson, MdVerifiedUser,
    MdAttachMoney, MdFlashOn, MdStorage, MdCloudQueue, MdPeople, MdEmail,
    MdMenuBook, MdDescription, MdAdd, MdCircle
} from 'react-icons/md';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, BarChart, Bar, LineChart, Line, FunnelChart, Funnel, LabelList
} from 'recharts';
import {
    statsData, revenueData, userActivityData, paymentSuccessData,
    kpiData, auditLogData, coursePerformanceData, liveClassesData, pendingActionsData, activityHeatmapData
} from '../data/mockData';

const COLORS = ['#FFC107', '#333333', '#FFBB28', '#FF8042'];
const SUCCESS_COLORS = ['#198754', '#dc3545', '#ffc107'];

const Dashboard = () => {
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    };

    // --- WIDGET COMPONENTS ---

    const KPITile = ({ title, value, trend, prefix = "" }) => (
        <Card className="bg-dark border-0 text-center shadow-sm h-100 transition-hover" style={{ backgroundColor: '#1E1E1E !important' }}>
            <Card.Body className="d-flex flex-column justify-content-center py-3">
                <div className="text-secondary small text-uppercase tracking-wider mb-2" style={{ fontSize: '10px' }}>{title}</div>
                <div className="text-white h4 fw-bold mb-0 d-flex align-items-center justify-content-center gap-2">
                    {prefix}{value}
                    {trend === 'up' ?
                        <MdArrowUpward className="text-success fs-6" /> :
                        <MdArrowDownward className="text-danger fs-6" />
                    }
                </div>
            </Card.Body>
        </Card>
    );

    const LiveOperationsPanel = () => (
        <Card className="bg-dark border-0 h-100 shadow-sm" style={{ backgroundColor: '#1E1E1E !important' }}>
            <Card.Header className="bg-transparent border-secondary border-bottom py-3">
                <div className="d-flex align-items-center gap-2 fw-bold text-white">
                    <MdPlayCircleOutline className="text-danger animate-pulse" size={20} />
                    Live Operations
                </div>
            </Card.Header>
            <Card.Body className="p-0">
                <ListGroup variant="flush">
                    {liveClassesData.map((item, idx) => (
                        <ListGroup.Item key={idx} className="bg-transparent text-white border-secondary py-3 px-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="rounded-circle bg-warning text-black fw-bold d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                        {item.teacher[0]}
                                    </div>
                                    <div>
                                        <div className="fw-bold small">{item.name}</div>
                                        <div className="text-secondary small">
                                            {item.teacher} • <span className="text-warning">{item.students} watching</span>
                                        </div>
                                    </div>
                                </div>
                                <Badge bg={item.status === 'Live' ? 'danger' : 'primary'} className={item.status === 'Live' ? 'animate-pulse' : ''}>
                                    {item.status}
                                </Badge>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
            <Card.Footer className="bg-transparent border-0 py-3 text-secondary small d-flex justify-content-between mt-auto">
                <span><MdPerson className="me-1" /> 420 Students Online</span>
                <span><MdPeople className="me-1" /> 12 Teachers Active</span>
            </Card.Footer>
        </Card>
    );

    const ActionCenter = () => (
        <Card className="bg-dark border-0 h-100 shadow-sm" style={{ backgroundColor: '#1E1E1E !important' }}>
            <Card.Header className="bg-transparent border-secondary border-bottom py-3 text-white fw-bold">
                <MdFlashOn className="text-warning me-2" size={20} />
                Action Center
            </Card.Header>
            <Card.Body className="p-3">
                <Row className="g-3">
                    {pendingActionsData.map((action, idx) => (
                        <Col xs={6} key={idx}>
                            <div className="bg-black p-3 rounded border border-secondary hover-border-warning transition-colors cursor-pointer text-center">
                                <div className="d-flex justify-content-between align-items-start mb-1">
                                    <div className={`text-${action.color} h4 fw-bold mb-0`}>{action.count}</div>
                                    <MdCircle className={`text-${action.color}`} size={8} />
                                </div>
                                <div className="text-secondary small" style={{ fontSize: '11px' }}>{action.type}</div>
                                <div className="text-end mt-2">
                                    <MdArrowUpward className="text-muted opacity-25" style={{ transform: 'rotate(45deg)' }} />
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Card.Body>
        </Card>
    );

    const SystemHealth = () => (
        <Card className="bg-dark border-0 shadow-sm" style={{ backgroundColor: '#1E1E1E !important' }}>
            <Card.Header className="bg-transparent border-secondary border-bottom py-3 text-white fw-bold">
                <MdStorage className="text-primary me-2" size={20} />
                System Health
            </Card.Header>
            <Card.Body className="p-3">
                <div className="mb-4">
                    <div className="d-flex justify-content-between text-secondary small mb-2">
                        <span>Storage Usage (AWS S3)</span>
                        <span>78%</span>
                    </div>
                    <ProgressBar now={78} variant="warning" className="bg-black" style={{ height: '6px' }} />
                </div>
                <Row className="g-3 mb-4">
                    <Col xs={6}>
                        <div className="bg-black p-2 rounded d-flex align-items-center justify-content-between border border-secondary">
                            <div>
                                <div className="text-muted small" style={{ fontSize: '10px' }}>Gateway</div>
                                <div className="text-success small fw-bold">Operational</div>
                            </div>
                            <MdCheckCircle className="text-success" />
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className="bg-black p-2 rounded d-flex align-items-center justify-content-between border border-secondary">
                            <div>
                                <div className="text-muted small" style={{ fontSize: '10px' }}>Email Svc</div>
                                <div className="text-success small fw-bold">Operational</div>
                            </div>
                            <MdEmail className="text-success" />
                        </div>
                    </Col>
                </Row>
                <div className="d-flex justify-content-between align-items-center text-danger bg-danger bg-opacity-10 p-2 rounded border border-danger border-opacity-25 small">
                    <span className="d-flex align-items-center gap-1">
                        <MdWarning size={14} /> 3 Failed Login Attempts
                    </span>
                    <span className="text-secondary cursor-pointer">View Logs</span>
                </div>
            </Card.Body>
        </Card>
    );

    return (
        <Container fluid className="px-0 py-2">
            {/* Control Bar */}
            <Card className="bg-dark border-secondary shadow-lg mb-4" style={{ backgroundColor: '#1E1E1E !important' }}>
                <Card.Body className="py-2 px-3">
                    <Row className="align-items-center g-3">
                        <Col md={4}>
                            <div className="d-flex align-items-center gap-3">
                                <h4 className="fw-bold mb-0 text-warning m-0 fs-5">COMMAND CENTER</h4>
                                <div className="border-end border-secondary h-100" style={{ minHeight: '20px' }}></div>
                                <span className="text-secondary small">Real-time Overview</span>
                            </div>
                        </Col>
                        <Col md={8}>
                            <div className="d-flex flex-wrap justify-content-md-end align-items-center gap-3">
                                <Form.Control
                                    type="date"
                                    className="bg-black border-secondary text-white small"
                                    style={{ width: '150px' }}
                                />
                                <Form.Select
                                    className="bg-black border-secondary text-white small"
                                    style={{ width: '130px' }}
                                >
                                    <option>All Exams</option>
                                    <option>CLAT</option>
                                    <option>AIBE</option>
                                    <option>Judiciary</option>
                                </Form.Select>
                                <Button
                                    variant="warning"
                                    className="fw-bold text-black border-0 d-flex align-items-center gap-2 btn-sm px-3"
                                    onClick={handleRefresh}
                                >
                                    <MdSync className={loading ? 'animate-spin' : ''} />
                                    Refresh
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* KPI Tiles */}
            <Row className="g-3 mb-4">
                {statsData.map((s, i) => (
                    <Col key={i} xs={6} md={3} lg={2} className={i === 4 ? 'd-lg-block' : ''}>
                        <KPITile title={s.title} value={s.value} trend={s.type === 'increase' ? 'up' : 'down'} />
                    </Col>
                ))}
                {kpiData.map((k, i) => (
                    <Col key={`kpi-${i}`} xs={6} md={3} lg={2}>
                        <KPITile title={k.title} value={k.value} trend={k.trend} prefix="" />
                    </Col>
                ))}
            </Row>

            {/* Quick Access */}
            <Row className="g-3 mb-4">
                <Col xs={6} md={3}>
                    <Button variant="outline-secondary" className="w-100 h-100 py-3 d-flex align-items-center justify-content-center gap-2 bg-dark bg-opacity-25 text-light hover-border-warning">
                        <MdAdd /> Add Course
                    </Button>
                </Col>
                <Col xs={6} md={3}>
                    <Button variant="outline-secondary" className="w-100 h-100 py-3 d-flex align-items-center justify-content-center gap-2 bg-dark bg-opacity-25 text-light hover-border-warning">
                        <MdPerson /> Add Teacher
                    </Button>
                </Col>
                <Col xs={6} md={3}>
                    <Button variant="outline-secondary" className="w-100 h-100 py-3 d-flex align-items-center justify-content-center gap-2 bg-dark bg-opacity-25 text-light hover-border-warning">
                        <MdMenuBook /> Add Book
                    </Button>
                </Col>
                <Col xs={6} md={3}>
                    <Button variant="outline-secondary" className="w-100 h-100 py-3 d-flex align-items-center justify-content-center gap-2 bg-dark bg-opacity-25 text-light hover-border-warning">
                        <MdDescription /> Add Mock Test
                    </Button>
                </Col>
            </Row>

            {/* Main Grid */}
            <Row className="g-4 mb-4">
                <Col lg={8}>
                    <LiveOperationsPanel />
                </Col>
                <Col lg={4}>
                    <ActionCenter />
                </Col>
            </Row>

            <Row className="g-4 mb-4">
                <Col lg={8}>
                    <Card className="bg-dark border-0 shadow-sm" style={{ backgroundColor: '#1E1E1E !important' }}>
                        <Card.Header className="bg-transparent border-secondary border-bottom py-3 text-white fw-bold">
                            <MdAttachMoney className="text-success me-2" size={20} />
                            Financial Snapshot
                        </Card.Header>
                        <Card.Body>
                            <div className="bg-black rounded p-3 mb-3" style={{ height: '250px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueData}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#198754" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#198754" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                        <XAxis dataKey="name" stroke="#666" fontSize={10} />
                                        <YAxis stroke="#666" fontSize={10} />
                                        <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', color: '#fff' }} />
                                        <Area type="monotone" dataKey="revenue" stroke="#198754" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <Row className="text-center g-2 mt-2">
                                <Col xs={4}>
                                    <div className="text-secondary" style={{ fontSize: '10px' }}>Today's Revenue</div>
                                    <div className="text-white fw-bold">₹42,500</div>
                                </Col>
                                <Col xs={4}>
                                    <div className="text-secondary" style={{ fontSize: '10px' }}>Pending Payouts</div>
                                    <div className="text-warning fw-bold">₹12,000</div>
                                </Col>
                                <Col xs={4}>
                                    <div className="text-secondary" style={{ fontSize: '10px' }}>Refunds (Week)</div>
                                    <div className="text-danger fw-bold">₹1,500</div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="bg-dark border-0 shadow-sm h-100" style={{ backgroundColor: '#1E1E1E !important' }}>
                        <Card.Header className="bg-transparent border-secondary border-bottom py-3 text-white fw-bold">
                            <MdVerifiedUser className="text-primary me-2" size={20} />
                            Audit Trail
                        </Card.Header>
                        <Card.Body className="overflow-auto" style={{ maxHeight: '350px' }}>
                            <div className="timeline ps-3 position-relative">
                                <div className="position-absolute start-0 h-100 border-start border-secondary" style={{ width: '1px', marginLeft: '7px' }}></div>
                                {auditLogData.map((log, i) => (
                                    <div key={i} className="mb-4 position-relative">
                                        <MdCircle
                                            className={`position-absolute top-0 start-0 translate-middle-x bg-dark text-${log.severity === 'High' ? 'danger' : log.severity === 'Medium' ? 'warning' : 'secondary'}`}
                                            size={12}
                                            style={{ marginLeft: '-7px', zIndex: 1 }}
                                        />
                                        <div className="ms-3">
                                            <div className="text-light small fw-bold lh-sm">{log.action}</div>
                                            <div className="text-secondary small mt-1" style={{ fontSize: '10px' }}>{log.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="g-4">
                <Col lg={6}>
                    <Card className="bg-dark border-0 shadow-sm" style={{ backgroundColor: '#1E1E1E !important' }}>
                        <Card.Header className="bg-transparent border-secondary border-bottom py-3 text-white fw-bold">
                            User Activity Heatmap (24H)
                        </Card.Header>
                        <Card.Body>
                            <div className="d-flex gap-1 h-32 align-items-end" style={{ height: '100px' }}>
                                {activityHeatmapData.map((h, i) => (
                                    <OverlayTrigger
                                        key={i}
                                        placement="top"
                                        overlay={<BootstrapTooltip>{h.hour}:00 - {h.value} Users</BootstrapTooltip>}
                                    >
                                        <div
                                            className="flex-grow-1 rounded-sm cursor-pointer"
                                            style={{
                                                backgroundColor: `rgba(252, 202, 12, ${h.value / 100})`,
                                                opacity: h.value === 0 ? 0.1 : 1,
                                                height: '100%'
                                            }}
                                        ></div>
                                    </OverlayTrigger>
                                ))}
                            </div>
                            <div className="d-flex justify-content-between text-secondary mt-2" style={{ fontSize: '9px' }}>
                                <span>00:00</span>
                                <span>12:00</span>
                                <span>23:59</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <SystemHealth />
                </Col>
            </Row>

            <Row className="g-4 mt-1 mb-5">
                <Col lg={6}>
                    <Card className="bg-dark border-0 shadow-sm" style={{ backgroundColor: '#1E1E1E !important' }}>
                        <Card.Header className="bg-transparent border-secondary border-bottom py-3 text-white fw-bold">
                            Top Performing Courses
                        </Card.Header>
                        <Card.Body className="p-0">
                            <Table responsive borderless hover variant="dark" className="small m-0">
                                <thead>
                                    <tr className="border-bottom border-secondary text-secondary">
                                        <th className="px-3 py-2">Course</th>
                                        <th className="px-3 py-2">Enrolled</th>
                                        <th className="px-3 py-2 text-center">Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coursePerformanceData.map((course, i) => (
                                        <tr key={i} className="align-middle">
                                            <td className="px-3 py-2 fw-bold">{course.name}</td>
                                            <td className="px-3 py-2 text-secondary">{course.enrolled}</td>
                                            <td className="px-3 py-2 text-center">
                                                <Badge bg="warning text-black">★ {course.rating}</Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card className="bg-dark border-0 shadow-sm" style={{ backgroundColor: '#1E1E1E !important' }}>
                        <Card.Header className="bg-transparent border-secondary border-bottom py-3 text-white fw-bold">
                            Payment Success Rate
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col xs={6}>
                                    <div style={{ height: '180px' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={paymentSuccessData}
                                                    innerRadius={45}
                                                    outerRadius={65}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {paymentSuccessData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={SUCCESS_COLORS[index]} />
                                                    ))}
                                                </Pie>
                                                <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: 'none', color: '#fff' }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="pe-2">
                                        {paymentSuccessData.map((p, i) => (
                                            <div key={i} className="mb-3">
                                                <div className="d-flex justify-content-between text-secondary small mb-1" style={{ fontSize: '10px' }}>
                                                    <span>{p.name}</span>
                                                    <span>{Math.round((p.value / 1000) * 100)}%</span>
                                                </div>
                                                <ProgressBar now={Math.round((p.value / 1000) * 100)} variant={p.color} className="bg-black" style={{ height: '4px' }} />
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <style>{`
                .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
                .animate-spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .hover-border-warning:hover { border-color: #fcca0c !important; color: #fcca0c !important; }
                .transition-hover:hover { transform: translateY(-5px); transition: transform 0.3s; }
                .cursor-pointer { cursor: pointer; }
                ::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                }
            `}</style>
        </Container>
    );
};

export default Dashboard;
