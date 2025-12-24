// components/QuestionRenderer.jsx

import AssertionReason from "./AssertionReason";
import Descriptive from "./Descriptive";
import MatchColumn from "./MatchColumn";
import MCQ from "./MCQ";
import TrueFalse from "./TrueFalse";


const QuestionRenderer = ({ question }) => {
    switch (question.type) {
        case "MCQ":
            return <MCQ question={question} />;

        case "TRUE_FALSE":
            return <TrueFalse question={question} />;

        case "DESCRIPTIVE":
            return <Descriptive question={question} />;

        case "ASSERTION_REASON":
            return <AssertionReason question={question} />;

        case "MATCH_COLUMN":
            return <MatchColumn question={question} />;

        default:
            return <div>{question.text}</div>;
    }
};

export default QuestionRenderer;
