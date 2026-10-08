import { Link } from "react-router-dom";

// props 설명
// tag: 출력할 HTML 태그(p, span, h1 등) – 기본값은 'p'
// children: 출력할 텍스트 내용
// url: 있을 경우 텍스트를 링크로 감쌈
// className: 부모 컴포넌트에서 전달한 스타일 유틸리티 클래스
const Text = ({ children, url, className, tag: Tag = 'p' }) => {
    return <Tag className={className}>{url ? <Link to={url}>{children}</Link> : children}</Tag>;
};

export default Text;
