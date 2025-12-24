// components/types/MatchColumn.jsx
const MatchColumn = ({ question }) => {
    return (
        <div>
            <h4>Match the Following</h4>

            {question.colA.map((itemA, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                    {itemA} →
                    <select>
                        {question.colB.map((itemB, j) => (
                            <option key={j} value={itemB}>{itemB}</option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
};

export default MatchColumn;
