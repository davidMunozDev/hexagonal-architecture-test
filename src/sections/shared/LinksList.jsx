import styled from 'styled-components';

import Link from '@/sections/shared/Link';

const StyledSuggestionsItemLink = styled(Link)`
	height: 100%;
	display: block;
	line-height: 40px;
	color: #a4a9ae;
	padding: 0 4px;
`;

const StyledSuggestionsItem = styled.li`
	border-radius: 4px;
	&:hover {
		background-color: #f5f5f5;
	}
`;

function LinksList({ options = [], getPath = () => {}, render = () => {} }) {
	return (
		<ul>
			{options.map(option => (
				<StyledSuggestionsItem key={option.id}>
					<StyledSuggestionsItemLink href={getPath(option)}>
						{render(option)}
					</StyledSuggestionsItemLink>
				</StyledSuggestionsItem>
			))}
		</ul>
	);
}

export default LinksList;
