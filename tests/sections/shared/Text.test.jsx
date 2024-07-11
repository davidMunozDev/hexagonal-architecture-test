import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Text from '@/sections/shared/Text';

// component test example

describe('Text', () => {
	it('should render correctly the html element', () => {
		render(<Text element='h1'>Test</Text>);

		screen.getByRole('heading', { level: 1, name: 'Test' });
	});
	it('should render p as default html element', () => {
		const { container } = render(<Text>Test</Text>);

		const element = container.querySelector('p');
		expect(element).toBeInTheDocument();
	});

	it('should render bold when value of property weight is bold', () => {
		render(
			<Text weight='bold' element='h1'>
				Test
			</Text>,
		);

		const textElement = screen.getByRole('heading', { level: 1, name: 'Test' });
		expect(textElement).toHaveStyle('font-weight: bold');
	});
});
