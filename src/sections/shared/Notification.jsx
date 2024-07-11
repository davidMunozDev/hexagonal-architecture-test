import styled from 'styled-components';

const StyledErrorWrapper = styled.div`
	color: ${({ type }) => (type === 'error' ? 'white' : 'blue')};
	padding: 24px;
	background-color: ${({ type }) => (type === 'error' ? '#e26c6c' : '#EFF7FB')};
	width: ${({ width }) => width};
	border-radius: 4px;
`;

function Notification({ children, width = '100%', type = 'error' }) {
	return (
		<StyledErrorWrapper type={type} width={width}>
			{children}
		</StyledErrorWrapper>
	);
}

export default Notification;
