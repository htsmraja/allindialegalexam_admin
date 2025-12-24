import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCommonContext } from "../../helper/CommonProvider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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
        setSelectedQuestions({});
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

        const updated = {};
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
    // console.log(questionList, "questionListquestionList")
    return (
        <>
            <CommonBreadcrumb title="Add Questions to Paper" />

            <div className="product-form-container p-3">
                <div className="card p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>Select Questions</h4>
                        <Button color="secondary" onClick={() => navigate(-1)}>Back</Button>
                    </div>

                    {/* -------------------- FILTERS -------------------- */}
                    <div className="filters mt-3 row">
                        <div className="col-md-4">
                            <Label>Question Bank Type</Label>
                            <Input
                                type="select"
                                value={filters.question_bank_type_id}
                                onChange={(e) =>
                                    setFilters(prev => ({ ...prev, question_bank_type_id: e.target.value, page: 1 }))
                                }
                            >
                                <option value="">All</option>
                                {questionBankTypeList?.data?.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Input>
                        </div>

                        <div className="col-md-4">
                            <Label>Question Type</Label>
                            <Input
                                type="select"
                                value={filters.question_type}
                                onChange={(e) =>
                                    setFilters(prev => ({ ...prev, question_type: e.target.value, page: 1 }))
                                }
                            >
                                <option value="">All</option>
                                <option value="MCQ">MCQ</option>
                                <option value="TRUE_FALSE">TRUE / FALSE</option>
                                <option value="MATCH_COLUMN">Match the Column</option>
                                <option value="ASSERTION_REASON">Assertion / Reason</option>
                            </Input>
                        </div>
                    </div>

                    {/* -------------------- TABLE -------------------- */}
                    <div className="table-responsive mt-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        <Input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                    <th>Question</th>
                                    <th>Type</th>
                                    <th>Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questionList?.data?.map((q) => (
                                    <tr key={q.id}>
                                        <td>
                                            <Input
                                                type="checkbox"
                                                checked={selectedQuestions[q.id]?.selected || false}
                                                onChange={() => toggleSelect(q.id)}
                                            />
                                        </td>
                                        <td>{q.question_text}</td>
                                        <td>{q.question_type}</td>
                                        <td>{q.marks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* -------------------- PAGINATION -------------------- */}
                    <Stack className="rightPagination mt10" spacing={2}>
                        <Pagination
                            color="primary"
                            count={totalPages}
                            page={filters.page}
                            shape="rounded"
                            onChange={(_, value) => handlePageChange(value)}
                        />
                    </Stack>

                    {/* -------------------- BUTTON -------------------- */}
                    <div className="text-end mt-3">
                        <Button color="primary" onClick={handleSubmit}>
                            Add Selected Questions
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddQuestionsToPaper;
