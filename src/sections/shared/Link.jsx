import { Link as ExternalLink } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledLink = styled(ExternalLink)`
	color: #1974cf;
	&:hover {
		color: #093d6b;
	}
`;

function Link({ children, href, ...rest }) {
	return (
		<StyledLink to={href} {...rest}>
			{children}
		</StyledLink>
	);
}

export default Link;
