// components/types/AssertionReason.jsx
const AssertionReason = ({ question }) => {
    return (
        <div>
            <h4>Assertion: {question.assertion}</h4>
            <h4>Reason: {question.reason}</h4>

            <label><input type="radio" name={question.id} value="true-true" /> Both True and Related</label><br />
            <label><input type="radio" name={question.id} value="true-false" /> Assertion True, Reason False</label><br />
            <label><input type="radio" name={question.id} value="false-true" /> Assertion False, Reason True</label><br />
            <label><input type="radio" name={question.id} value="false-false" /> Both False</label>
        </div>
    );
};

export default AssertionReason;
