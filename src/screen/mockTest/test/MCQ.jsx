// components/types/MCQ.jsx
const MCQ = ({ question }) => {
    return (
        <div>
            <h4>{question.text}</h4>

            {question.options.map((opt, i) => (
                <label key={i} style={{ display: "block" }}>
                    <input type="radio" name={question.id} value={opt} />
                    {opt}
                </label>
            ))}
        </div>
    );
};

export default MCQ;
