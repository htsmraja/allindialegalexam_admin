// components/types/Descriptive.jsx
const Descriptive = ({ question }) => {
    return (
        <div>
            <h4>{question.text}</h4>
            <textarea rows="4" style={{ width: "100%" }} placeholder="Write your answer here..."></textarea>
        </div>
    );
};

export default Descriptive;
