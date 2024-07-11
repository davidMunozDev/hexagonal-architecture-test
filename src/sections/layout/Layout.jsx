import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';

import Link from '@/sections/shared/Link';
import Text from '@/sections/shared/Text';
import { IconList } from '@/sections/shared/Icons';
import { PATHS } from '@/router/paths';
import translations from '@/translations';

const StyledHeader = styled.header`
	display: flex;
	gap: 32px;
	align-items: center;
	justify-content: center;
	padding-top: 40px;
`;

const StyledContent = styled.div`
	padding: 16px 30px;
	max-width: 1000px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 40px;
	position: relative;
`;

const StyledBackLink = styled(Link)`
	position: absolute;
	left: 30px;
	color: #a4a9ae;
	font-size: 14px;
	font-weight: 700;
	&:hover {
		color: #4c4c4c;
	}
	> svg {
		width: 24px;
		height: 24px;
	}
`;

function Layout() {
	const location = useLocation();
	const { name, country } = useParams();
	const isDetailPage = location.pathname !== PATHS.dashboard;

	return (
		<div>
			<StyledHeader>
				{isDetailPage && (
					<StyledBackLink aria-label='back-link' to={PATHS.dashboard}>
						<IconList />
					</StyledBackLink>
				)}
				{isDetailPage ? (
					<Text element='h1'>
						{name}, {country}
					</Text>
				) : (
					<Text element='h1'>{translations.global.header_text}</Text>
				)}
			</StyledHeader>
			<StyledContent>
				<Outlet />
			</StyledContent>
		</div>
	);
}

export default Layout;
