import Text from '../ui/Text';

const ReviewList = ({ data, className, children }) => {
    return (
        <ul className={className}>
            {data?.length > 0 ? (
                data.map((item, index) => (
                    <li key={item.id ?? index} className="glass">
                        {typeof children === 'function' ? children(item, index) : null}
                    </li>
                ))
            ) : (
                <li className="glass">
                    <Text tag="h2">등록된 데이터가 없습니다.</Text>
                </li>
            )}
        </ul>
    );
};

export default ReviewList;
