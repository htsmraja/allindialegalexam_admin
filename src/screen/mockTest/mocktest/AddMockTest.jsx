import React, { useEffect, useState } from "react";
import { Button, Input, Label, FormGroup, Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useCommonContext } from "../../../helper/CommonProvider";

const AddMockTest = () => {
    const navigate = useNavigate();
    const { examTypeList, getExamTypeList, questionPaperList, getQuestionPaperList, addMockTest } = useCommonContext();

    const [form, setForm] = useState({
        title: "",
        subtitle: "",
        description: "",
        exam_type_id: "",
        is_paid: 0,
        price: 0,
        sale_price: 0,
        offer_price: 0,
        offer_start: "",
        offer_end: "",
        mark_as_offer: 0,
        cover_image: null,
        created_by_type: 'admin'
    });

    const [coverPreview, setCoverPreview] = useState(null);
    const [selectedPapers, setSelectedPapers] = useState({});

    useEffect(() => {
        getExamTypeList();
    }, []);

    const handlePaperSelect = (id) => {
        setSelectedPapers(prev => ({
            ...prev,
            [id]: {
                selected: !prev[id]?.selected,
                attempt_limit: prev[id]?.attempt_limit || 1 // default attempt limit = 1
            }
        }));
    };

    const handleAttemptLimitChange = (id, value) => {
        setSelectedPapers(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                attempt_limit: value
            }
        }));
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, cover_image: file });
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setCoverPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const paper_list = Object.keys(selectedPapers)
            .filter(key => selectedPapers[key].selected)
            .map((pid, index) => ({
                question_paper_id: pid,
                sort_order: index + 1,
                attempt_limit: selectedPapers[pid].attempt_limit
            }));

        const payload = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value !== null) payload.append(key, value);
        });
        payload.append("paper_list", JSON.stringify(paper_list));
        console.log(payload, "payload")
        const res = await addMockTest(payload);
        //if (res?.status) navigate("/mock-test-list");
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Add New Mock Test</h2>

            {/* Basic Information */}
            <Card>
                <CardHeader className="bg-primary text-white">Basic Information</CardHeader>
                <CardBody>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Subtitle</Label>
                                <Input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                    </FormGroup>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Exam Type</Label>
                                <Input type="select" value={form.exam_type_id} onChange={e => {
                                    const selectedId = e.target.value;
                                    setForm({ ...form, exam_type_id: selectedId });
                                    getQuestionPaperList({ exam_type_id: selectedId });
                                }}>
                                    <option value="">Select</option>
                                    {examTypeList?.data?.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Cover Image</Label>
                                <Input type="file" accept="image/*" onChange={handleCoverChange} />
                                {coverPreview && <img src={coverPreview} alt="Cover Preview" style={{ marginTop: 10, maxWidth: 200, borderRadius: 5 }} />}
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            {/* Pricing & Offer */}
            <Card className="mt-4">
                <CardHeader className="bg-success text-white">Pricing & Offer</CardHeader>
                <CardBody>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label>Is Paid?</Label>
                                <Input type="select" value={form.is_paid} onChange={e => setForm({ ...form, is_paid: e.target.value })}>
                                    <option value={0}>Free</option>
                                    <option value={1}>Paid</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        {form.is_paid == 1 && (
                            <>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Price</Label>
                                        <Input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Sale Price</Label>
                                        <Input type="number" value={form.sale_price} onChange={e => setForm({ ...form, sale_price: e.target.value })} />
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" checked={form.mark_as_offer} onChange={e => setForm({ ...form, mark_as_offer: e.target.checked ? 1 : 0 })} /> Mark as Sell
                                        </Label>
                                    </FormGroup>
                                </Col>
                                {form.mark_as_offer == 1 && (
                                    <>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>Offer Price</Label>
                                                <Input type="number" value={form.offer_price} onChange={e => setForm({ ...form, offer_price: e.target.value })} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>Offer Start Date</Label>
                                                <Input type="date" value={form.offer_start} onChange={e => setForm({ ...form, offer_start: e.target.value })} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>Offer End Date</Label>
                                                <Input type="date" value={form.offer_end} onChange={e => setForm({ ...form, offer_end: e.target.value })} />
                                            </FormGroup>
                                        </Col>
                                    </>
                                )}
                            </>
                        )}
                    </Row>
                </CardBody>
            </Card>

            {/* Select Papers */}
            <Card className="mt-4">
                <CardHeader className="bg-warning text-dark">Select Papers</CardHeader>
                <CardBody>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Paper Title</th>
                                    <th>Attempt Limit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questionPaperList?.data?.map(p => (
                                    <tr key={p.id}>
                                        <td>
                                            <Input type="checkbox" checked={selectedPapers[p.id]?.selected || false} onChange={() => handlePaperSelect(p.id)} />
                                        </td>
                                        <td>{p.title}</td>
                                        <td>
                                            {selectedPapers[p.id]?.selected && (
                                                <Input type="number" min={1} value={selectedPapers[p.id]?.attempt_limit} onChange={e => handleAttemptLimitChange(p.id, parseInt(e.target.value))} />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>

            {/* Submit Button */}
            <div className="text-end mt-3">
                <Button color="primary" onClick={handleSubmit}>Save Mock Test</Button>
            </div>
        </div>
    );
};

export default AddMockTest;
