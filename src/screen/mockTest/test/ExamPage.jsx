// ExamPage.jsx
import React, { useState, useEffect } from "react";
import QuestionRenderer from "./QuestionRenderer";


const ExamPage = () => {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Dummy questions (replace with API)
        setQuestions([
            {
                id: 1,
                type: "MCQ",
                text: "Which is the capital of India?",
                options: ["Mumbai", "Delhi", "Kolkata", "Chennai"]
            },
            {
                id: 2,
                type: "TRUE_FALSE",
                text: "The sun rises in the West."
            },
            {
                id: 3,
                type: "DESCRIPTIVE",
                text: "Explain the water cycle."
            },
            {
                id: 4,
                type: "ASSERTION_REASON",
                assertion: "All metals conduct electricity.",
                reason: "Metals have free electrons.",
            },
            {
                id: 5,
                type: "MATCH_COLUMN",
                colA: ["Dog", "Cat", "Cow"],
                colB: ["Meow", "Moo", "Bark"]
            }
        ]);
    }, []);

    return (
        <div style={{ padding: 40 }}>
            <h2>Exam Questions</h2>

            {questions.map(q => (
                <div key={q.id} style={{ marginBottom: 30 }}>
                    <QuestionRenderer question={q} />
                </div>
            ))}
        </div>
    );
};

export default ExamPage;
