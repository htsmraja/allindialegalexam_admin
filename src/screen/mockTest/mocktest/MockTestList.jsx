import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Table,
    Button,
    Form,
    InputGroup,
    Spinner,
    Badge,
    Dropdown,
    Image,
    Stack
} from 'react-bootstrap';
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiSearch,
    FiMoreVertical,
    FiLayers,
    FiCheckCircle,
    FiXCircle,
    FiExternalLink
} from 'react-icons/fi';
import CommonBreadcrumb from "../../../component/common/bread-crumb";
import { useCommonContext } from "../../../helper/CommonProvider";

const MockTestList = () => {
    const navigate = useNavigate();
    const { mockTestList, getMockTestList, publishMockTest } = useCommonContext();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getMockTestList();
    }, []);

    const filteredData = mockTestList.data?.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const getImageUrl = (image) => {
        if (!image) return "/no-image.png";
        return `${import.meta.env.VITE_APP_TEACHER_DOC_URL}/uploads/mocktest/${image}`;
    };

    return (
        <div className="pb-5 text-white pt-2">


            <Container fluid className="mt-n4">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h3 className="fw-bold mb-0 text-white">Mock Test Exams</h3>
                        <p className="text-secondary small mb-0">Manage comprehensive mock examination packages</p>
                    </div>
                    <Button
                        onClick={() => navigate("/add-mock-test")}
                        className="fw-bold d-flex align-items-center gap-2 px-4 py-2 text-black border-0"
                        variant="warning"
                    >
                        <FiPlus size={20} />
                        Add Mock Test
                    </Button>
                </div>

                {/* Toolbar */}
                <Card className="bg-dark border-secondary border-opacity-10 shadow-lg mb-4" style={{ backgroundColor: '#1E1E1E' }}>
                    <Card.Body className="p-3">
                        <Row className="align-items-center">
                            <Col md={4}>
                                <InputGroup className="bg-black rounded border border-secondary border-opacity-25">
                                    <InputGroup.Text className="bg-transparent border-0 text-secondary">
                                        <FiSearch />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Search mock tests..."
                                        className="bg-transparent border-0 text-white shadow-none placeholder-secondary"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <Row>
                    <Col lg={12}>
                        <Card className="bg-dark border-secondary border-opacity-10 shadow-lg overflow-hidden" style={{ backgroundColor: '#1E1E1E' }}>
                            <div className="table-responsive">
                                <Table hover variant="dark" className="mb-0 align-middle custom-table">
                                    <thead className="bg-black bg-opacity-50 text-secondary small text-uppercase">
                                        <tr>
                                            <th className="px-4 py-3 border-secondary border-opacity-10">Mock Test</th>
                                            <th className="px-4 py-3 border-secondary border-opacity-10">Exam Type</th>
                                            <th className="px-4 py-3 border-secondary border-opacity-10 text-center">Pricing</th>
                                            <th className="px-4 py-3 border-secondary border-opacity-10 text-center">Published</th>
                                            <th className="px-4 py-3 border-secondary border-opacity-10 text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockTestList.loading ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-5">
                                                    <Spinner animation="border" variant="warning" size="sm" className="me-2" />
                                                    <span className="text-secondary">Retrieving mock tests...</span>
                                                </td>
                                            </tr>
                                        ) : filteredData.length === 0 ? (
                                            <tr>
                                                    <td colSpan="5" className="text-center py-5 text-secondary">
                                                        No mock tests found
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredData.map((item, index) => (
                                                    <tr key={item.id} className="border-secondary border-opacity-10">
                                                        <td className="px-4 py-3">
                                                            <div className="d-flex align-items-center gap-3">
                                                                <div className="position-relative">
                                                                    <Image
                                                                        src={getImageUrl(item.cover_image)}
                                                                        alt={item.title}
                                                                        style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover' }}
                                                                        className="border border-secondary border-opacity-25"
                                                                    />
                                                                    <Badge
                                                                        bg="warning"
                                                                        className="position-absolute bottom-0 end-0 text-black border border-dark rounded-circle d-flex align-items-center justify-content-center p-1"
                                                                        style={{ width: '20px', height: '20px', fontSize: '10px' }}
                                                                    >
                                                                        {index + 1}
                                                                    </Badge>
                                                                </div>
                                                                <div>
                                                                    <div className="fw-bold hover-text-warning text-white">{item.title}</div>
                                                                    <div className="text-secondary small d-flex align-items-center gap-1">
                                                                        <FiLayers size={12} />
                                                                        <span>#MT-{item.id}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="text-secondary">Type ID: {item.exam_type_id}</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            {item.is_paid ? (
                                                                <div className="d-flex flex-column">
                                                                    <span className="fw-bold text-white">₹{item.sale_price || item.price}</span>
                                                                    {item.price > item.sale_price && (
                                                                        <span className="text-secondary text-decoration-line-through small">₹{item.price}</span>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <Badge bg="success" className="bg-opacity-10 text-success fw-normal px-3 py-2 rounded-pill">FREE</Badge>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <Form.Check
                                                                type="switch"
                                                                checked={!!item.is_active} // Assuming is_active maps to published status
                                                                onChange={(e) => publishMockTest(item.id, e.target.checked)}
                                                                className="d-flex justify-content-center custom-switch"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-3 text-end">
                                                            <div className="d-flex justify-content-end gap-2">
                                                                <Button
                                                                    variant="outline-warning"
                                                                    size="sm"
                                                                    className="d-flex align-items-center gap-1 border-opacity-50"
                                                                    onClick={() => navigate(`/mock-test/${item.id}`)}
                                                                >
                                                                    <FiExternalLink size={14} /> View
                                                                </Button>
                                                                <Dropdown align="end">
                                                                    <Dropdown.Toggle variant="link" className="text-secondary p-0 border-0 no-caret shadow-none px-2">
                                                                        <FiMoreVertical />
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu variant="dark" className="border-secondary border-opacity-25 shadow border">
                                                                        <Dropdown.Item>
                                                                            <FiEdit2 className="me-2 text-info" /> Edit Details
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Divider className="bg-secondary opacity-25" />
                                                                        <Dropdown.Item className="text-danger">
                                                                            <FiTrash2 className="me-2" /> Remove Test
                                                                        </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <style>{`
                .bg-dark { background-color: #1E1E1E !important; }
                .border-secondary { border-color: #2D2D2D !important; }
                .custom-table tr:hover { background-color: #1a1a1a !important; }
                .hover-text-warning:hover { color: #fcca0c !important; cursor: pointer; }
                .no-caret::after { display: none !important; }
                .placeholder-secondary::placeholder { color: #555; font-size: 14px; }
            `}</style>
        </div>
    );
};

export default MockTestList;
