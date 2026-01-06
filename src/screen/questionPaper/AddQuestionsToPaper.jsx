// import React, { useEffect, useState } from "react";
// import { Button, Input, Label } from "reactstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import CommonBreadcrumb from "../../component/common/bread-crumb";
// import { useCommonContext } from "../../helper/CommonProvider";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

// const AddQuestionsToPaper = () => {
//     const { id, exam_type_id } = useParams();
//     const navigate = useNavigate();

//     const {
//         addQuestionsToPaper,
//         getQuestionsByExamType,
//         questionList,
//         questionBankTypeList,
//         getquestionBankTypeList
//     } = useCommonContext();

//     /* -------------------- FILTER STATES -------------------- */
//     const [filters, setFilters] = useState({
//         question_bank_type_id: "",
//         question_type: "",
//         page: 1,
//         limit: 20
//     });

//     /* -------------------- SELECTED STATES -------------------- */
//     const [selectedQuestions, setSelectedQuestions] = useState({});
//     const [selectAll, setSelectAll] = useState(false);

//     /* -------------------- INITIAL LOAD -------------------- */
//     useEffect(() => {
//         getquestionBankTypeList();
//     }, []);

//     /* ---------------- FETCH QUESTIONS ---------------- */
//     useEffect(() => {
//         getQuestionsByExamType({
//             exam_type_id,
//             question_bank_type_id: filters.question_bank_type_id || null,
//             question_type: filters.question_type || null,
//             page: filters.page,
//             limit: filters.limit
//         });

//         // Reset selectAll when page changes
//         setSelectAll(false);
//         setSelectedQuestions({});
//     }, [filters]);

//     /* -------------------- SELECT QUESTION -------------------- */
//     const toggleSelect = (qid) => {
//         setSelectedQuestions((prev) => {
//             const updated = {
//                 ...prev,
//                 [qid]: { selected: !prev[qid]?.selected }
//             };

//             // If user unselects any item manually → uncheck select all
//             if (selectAll && prev[qid]?.selected) {
//                 setSelectAll(false);
//             }
//             return updated;
//         });
//     };

//     /* -------------------- SELECT ALL -------------------- */
//     const handleSelectAll = () => {
//         const newValue = !selectAll;
//         setSelectAll(newValue);

//         const updated = {};
//         questionList?.data?.forEach((q) => {
//             updated[q.id] = { selected: newValue };
//         });

//         setSelectedQuestions(updated);
//     };

//     /* -------------------- SUBMIT -------------------- */
//     const handleSubmit = async () => {
//         const finalList = Object.keys(selectedQuestions)
//             .filter((key) => selectedQuestions[key]?.selected)
//             .map((qid) => ({
//                 question_id: qid,
//                 marks: 1,
//                 negative_marks: 0
//             }));

//         await addQuestionsToPaper(
//             {
//                 question_paper_id: id,
//                 questions: finalList
//             },
//             id,
//             exam_type_id
//         );
//     };


//     const handlePageChange = (value) => {
//         setFilters((prev) => ({ ...prev, page: value }));
//     };

//     const totalPages = questionList?.total_pages || 1;
//     // console.log(questionList, "questionListquestionList")
//     return (
//         <>
//             <CommonBreadcrumb title="Add Questions to Paper" />

//             <div className="product-form-container p-3">
//                 <div className="card p-3">
//                     <div className="d-flex justify-content-between align-items-center">
//                         <h4>Select Questions</h4>
//                         <Button color="secondary" onClick={() => navigate(-1)}>Back</Button>
//                     </div>

//                     {/* -------------------- FILTERS -------------------- */}
//                     <div className="filters mt-3 row">
//                         <div className="col-md-4">
//                             <Label>Question Bank Type</Label>
//                             <Input
//                                 type="select"
//                                 value={filters.question_bank_type_id}
//                                 onChange={(e) =>
//                                     setFilters(prev => ({ ...prev, question_bank_type_id: e.target.value, page: 1 }))
//                                 }
//                             >
//                                 <option value="">All</option>
//                                 {questionBankTypeList?.data?.map(item => (
//                                     <option key={item.id} value={item.id}>
//                                         {item.name}
//                                     </option>
//                                 ))}
//                             </Input>
//                         </div>

//                         <div className="col-md-4">
//                             <Label>Question Type</Label>
//                             <Input
//                                 type="select"
//                                 value={filters.question_type}
//                                 onChange={(e) =>
//                                     setFilters(prev => ({ ...prev, question_type: e.target.value, page: 1 }))
//                                 }
//                             >
//                                 <option value="">All</option>
//                                 <option value="MCQ">MCQ</option>
//                                 <option value="TRUE_FALSE">TRUE / FALSE</option>
//                                 <option value="MATCH_COLUMN">Match the Column</option>
//                                 <option value="ASSERTION_REASON">Assertion / Reason</option>
//                             </Input>
//                         </div>
//                     </div>

//                     {/* -------------------- TABLE -------------------- */}
//                     <div className="table-responsive mt-3">
//                         <table className="table">
//                             <thead>
//                                 <tr>
//                                     <th>
//                                         <Input
//                                             type="checkbox"
//                                             checked={selectAll}
//                                             onChange={handleSelectAll}
//                                         />
//                                     </th>
//                                     <th>Question</th>
//                                     <th>Type</th>
//                                     <th>Marks</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {questionList?.data?.map((q) => (
//                                     <tr key={q.id}>
//                                         <td>
//                                             <Input
//                                                 type="checkbox"
//                                                 checked={selectedQuestions[q.id]?.selected || false}
//                                                 onChange={() => toggleSelect(q.id)}
//                                             />
//                                         </td>
//                                         <td>{q.question_text}</td>
//                                         <td>{q.question_type}</td>
//                                         <td>{q.marks}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* -------------------- PAGINATION -------------------- */}
//                     <Stack className="rightPagination mt10" spacing={2}>
//                         <Pagination
//                             color="primary"
//                             count={totalPages}
//                             page={filters.page}
//                             shape="rounded"
//                             onChange={(_, value) => handlePageChange(value)}
//                         />
//                     </Stack>

//                     {/* -------------------- BUTTON -------------------- */}
//                     <div className="text-end mt-3">
//                         <Button color="primary" onClick={handleSubmit}>
//                             Add Selected Questions
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AddQuestionsToPaper;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Table,
    InputGroup,
    Badge,
    Stack,
    Pagination,
    Spinner
} from 'react-bootstrap';
import {
    FiArrowLeft,
    FiSearch,
    FiFilter,
    FiCheckSquare,
    FiSquare,
    FiSave,
    FiFileText,
    FiList
} from 'react-icons/fi';
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCommonContext } from "../../helper/CommonProvider";

const AddQuestionsToPaper = () => {
    const { id, exam_type_id } = useParams();
    const navigate = useNavigate();

    const {
        addQuestionsToPaper,
        getQuestionsByExamType,
        questionList,
        questionBankTypeList,
        getquestionBankTypeList
    } = useCommonContext();

    /* -------------------- FILTER STATES -------------------- */
    const [filters, setFilters] = useState({
        question_bank_type_id: "",
        question_type: "",
        page: 1,
        limit: 20
    });

    /* -------------------- SELECTED STATES -------------------- */
    const [selectedQuestions, setSelectedQuestions] = useState({});
    const [selectAll, setSelectAll] = useState(false);

    /* -------------------- INITIAL LOAD -------------------- */
    useEffect(() => {
        getquestionBankTypeList();
    }, []);

    /* ---------------- FETCH QUESTIONS ---------------- */
    useEffect(() => {
        getQuestionsByExamType({
            exam_type_id,
            question_bank_type_id: filters.question_bank_type_id || null,
            question_type: filters.question_type || null,
            page: filters.page,
            limit: filters.limit
        });

        // Reset selectAll when page changes
        setSelectAll(false);
        // setSelectedQuestions({}); // Keep selections if user navigates pages? Usually better to clear or manage globally.
    }, [filters]);

    /* -------------------- SELECT QUESTION -------------------- */
    const toggleSelect = (qid) => {
        setSelectedQuestions((prev) => {
            const updated = {
                ...prev,
                [qid]: { selected: !prev[qid]?.selected }
            };

            // If user unselects any item manually → uncheck select all
            if (selectAll && prev[qid]?.selected) {
                setSelectAll(false);
            }
            return updated;
        });
    };

    /* -------------------- SELECT ALL -------------------- */
    const handleSelectAll = () => {
        const newValue = !selectAll;
        setSelectAll(newValue);

        const updated = { ...selectedQuestions };
        questionList?.data?.forEach((q) => {
            updated[q.id] = { selected: newValue };
        });

        setSelectedQuestions(updated);
    };

    /* -------------------- SUBMIT -------------------- */
    const handleSubmit = async () => {
        const finalList = Object.keys(selectedQuestions)
            .filter((key) => selectedQuestions[key]?.selected)
            .map((qid) => ({
                question_id: qid,
                marks: 1,
                negative_marks: 0
            }));

        if (finalList.length === 0) {
            alert("Please select at least one question.");
            return;
        }

        await addQuestionsToPaper(
            {
                question_paper_id: id,
                questions: finalList
            },
            id,
            exam_type_id
        );
    };

    const handlePageChange = (value) => {
        setFilters((prev) => ({ ...prev, page: value }));
    };

    const totalPages = questionList?.total_pages || 1;

    // Helper for pagination items
    const renderPagination = () => {
        let items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === filters.page}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }
        return items;
    };

    return (
        <div className="pb-5 text-white pt-4">

            <Container fluid className="mt-n4">
                {/* Header & Quick Filters */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => navigate(-1)}
                            className="border-secondary text-white rounded-circle p-2 d-flex align-items-center justify-content-center"
                        >
                            <FiArrowLeft size={18} />
                        </Button>
                        <div>
                            <h2 className="fw-bold mb-0 text-white">Select Questions</h2>
                            <p className="text-secondary small mb-0">Browsing questions for Paper ID #{id}</p>
                        </div>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        className="fw-bold d-flex align-items-center gap-2 px-4 py-2 text-black border-0"
                        style={{ backgroundColor: '#fcca0c', borderColor: '#fcca0c' }}
                    >
                        <FiSave size={20} />
                        Add Selected ({Object.values(selectedQuestions).filter(v => v.selected).length})
                    </Button>
                </div>

                {/* Filters Section */}
                <Card className="bg-dark border-secondary shadow-sm mb-4" style={{ backgroundColor: '#1E1E1E !important' }}>
                    <Card.Body className="p-3">
                        <Row className="g-3 align-items-end">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label className="text-secondary small fw-bold mb-2">
                                        <FiFilter className="me-1" /> QUESTION BANK TYPE
                                    </Form.Label>
                                    <Form.Select
                                        value={filters.question_bank_type_id}
                                        onChange={(e) => setFilters(prev => ({ ...prev, question_bank_type_id: e.target.value, page: 1 }))}
                                        className="bg-black border-secondary text-white py-2 focus-none"
                                    >
                                        <option value="">All Categories</option>
                                        {questionBankTypeList?.data?.map(item => (
                                            <option key={item.id} value={item.id} className="bg-dark">{item.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label className="text-secondary small fw-bold mb-2">
                                        <FiList className="me-1" /> QUESTION TYPE
                                    </Form.Label>
                                    <Form.Select
                                        value={filters.question_type}
                                        onChange={(e) => setFilters(prev => ({ ...prev, question_type: e.target.value, page: 1 }))}
                                        className="bg-black border-secondary text-white py-2 focus-none"
                                    >
                                        <option value="">All Types</option>
                                        <option value="MCQ">MCQ</option>
                                        <option value="TRUE_FALSE">TRUE / FALSE</option>
                                        <option value="MATCH_COLUMN">Match the Column</option>
                                        <option value="ASSERTION_REASON">Assertion / Reason</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Table Section */}
                <Card className="bg-dark border-secondary shadow-sm overflow-hidden mb-4" style={{ backgroundColor: '#1E1E1E !important' }}>
                    <div className="table-responsive">
                        <Table hover variant="dark" className="mb-0 align-middle custom-table">
                            <thead className="bg-black text-secondary small text-uppercase">
                                <tr>
                                    <th className="px-4 py-3 border-secondary" style={{ width: '50px' }}>
                                        <Form.Check
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                            className="custom-checkbox"
                                        />
                                    </th>
                                    <th className="px-4 py-3 border-secondary">Question Content</th>
                                    <th className="px-4 py-3 border-secondary text-center">Type</th>
                                    <th className="px-4 py-3 border-secondary text-center">Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questionList.loading ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-5">
                                            <Spinner animation="border" variant="warning" size="sm" className="me-2" />
                                            <span className="text-secondary">Loading available questions...</span>
                                        </td>
                                    </tr>
                                ) : questionList?.data?.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-5 text-secondary">
                                            <FiSearch size={48} className="mb-3 opacity-25 d-block mx-auto" />
                                            No questions found matching your criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    questionList?.data?.map((q) => (
                                        <tr key={q.id} className="border-secondary" onClick={() => toggleSelect(q.id)} style={{ cursor: 'pointer' }}>
                                            <td className="px-4 py-3">
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={selectedQuestions[q.id]?.selected || false}
                                                    onChange={() => { }} // Handled by tr onClick
                                                    className="custom-checkbox"
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="text-white text-wrap" style={{ maxWidth: '600px' }}>
                                                    {q.question_text}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <Badge bg="dark" className="text-warning border border-warning border-opacity-25 px-2 py-1 fw-normal">
                                                    {q.question_type}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-center fw-bold text-white">
                                                {q.marks}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>

                    {/* Pagination Footer */}
                    {totalPages > 1 && (
                        <Card.Footer className="bg-black bg-opacity-25 border-secondary p-3">
                            <Pagination className="justify-content-center mb-0 custom-pagination">
                                <Pagination.Prev
                                    disabled={filters.page === 1}
                                    onClick={() => handlePageChange(filters.page - 1)}
                                />
                                {renderPagination()}
                                <Pagination.Next
                                    disabled={filters.page === totalPages}
                                    onClick={() => handlePageChange(filters.page + 1)}
                                />
                            </Pagination>
                        </Card.Footer>
                    )}
                </Card>

                {/* Floating Selection Bar for Mobile/Quick Save */}
                {Object.values(selectedQuestions).filter(v => v.selected).length > 0 && (
                    <div className="position-fixed bottom-0 start-0 end-0 p-3 d-flex justify-content-center" style={{ zIndex: 1000 }}>
                        <div className="bg-warning text-black px-4 py-3 rounded-pill shadow-lg d-flex align-items-center gap-4 fw-bold">
                            <span>{Object.values(selectedQuestions).filter(v => v.selected).length} Questions Selected</span>
                            <div className="vr bg-black bg-opacity-25" style={{ height: '20px' }}></div>
                            <Button variant="link" className="text-black p-0 fw-bold text-decoration-none" onClick={handleSubmit}>
                                CONFIRM & ADD
                            </Button>
                        </div>
                    </div>
                )}
            </Container>

            <style>{`
                .bg-dark { background-color: #1E1E1E !important; }
                .border-secondary { border-color: #2D2D2D !important; }
                .focus-none:focus { background-color: #000 !important; border-color: #fcca0c !important; color: white !important; }
                .custom-table tr:hover { background-color: #1a1a1a !important; }
                
                /* Custom Pagination Styling */
                .custom-pagination .page-link {
                    background-color: transparent !important;
                    border-color: #2D2D2D !important;
                    color: #888 !important;
                    margin: 0 2px;
                    border-radius: 4px;
                }
                .custom-pagination .page-item.active .page-link {
                    background-color: #fcca0c !important;
                    border-color: #fcca0c !important;
                    color: #000 !important;
                    font-weight: bold;
                }
                .custom-pagination .page-link:hover {
                    background-color: #2D2D2D !important;
                    color: #fff !important;
                }
                .custom-pagination .page-item.disabled .page-link {
                    color: #444 !important;
                }

                /* Custom Checkbox */
                .custom-checkbox .form-check-input {
                    background-color: transparent;
                    border-color: #444;
                    cursor: pointer;
                }
                .custom-checkbox .form-check-input:checked {
                    background-color: #fcca0c;
                    border-color: #fcca0c;
                }
                .custom-checkbox .form-check-input:focus {
                    box-shadow: none;
                    border-color: #fcca0c;
                }
            `}</style>
        </div>
    );
};

export default AddQuestionsToPaper;
