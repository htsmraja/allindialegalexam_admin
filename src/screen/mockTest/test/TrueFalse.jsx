// components/types/TrueFalse.jsx
const TrueFalse = ({ question }) => {
    return (
        <div>
            <h4>{question.text}</h4>

            <label>
                <input type="radio" name={question.id} value="true" /> True
            </label>
            <br />
            <label>
                <input type="radio" name={question.id} value="false" /> False
            </label>
        </div>
    );
};

export default TrueFalse;
