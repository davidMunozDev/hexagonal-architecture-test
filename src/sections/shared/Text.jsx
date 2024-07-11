import styled from 'styled-components';

const StyledText = styled.p`
	${({ as }) => {
		const textElementStyles = {
			p: `
        font-size: 16px;
        line-height: 1.5;
      `,
			h1: `
        font-size: 1.7rem;
      `,
			h2: `
        font-size: 1.5rem;
      `,
		};
		return textElementStyles[as];
	}}
	font-weight: ${({ weight }) => (weight === 'bold' ? 700 : 500)};
	margin: 0;
`;

function Text({ children, weight = 'normal', element = 'p', ...rest }) {
	return (
		<StyledText weight={weight} {...rest} as={element}>
			{children}
		</StyledText>
	);
}

export default Text;
