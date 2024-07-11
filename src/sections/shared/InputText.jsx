import styled from 'styled-components';

const StyledSearchInput = styled.input`
	width: 100%;
	max-width: 600px;
	padding: 16px;
	border-radius: 6px;
	border: none;
	background-color: white;
	box-shadow: rgba(54, 60, 75, 0.1) 0px 16px 32px;

	&:focus {
		outline: none;
	}
`;

function InputText({
	onFocus = () => {},
	onBlur = () => {},
	value,
	onChange = () => {},
	placeholder = 'placeholder',
	name = 'input',
}) {
	return (
		<StyledSearchInput
			name={name}
			type='text'
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			onFocus={onFocus}
			onBlur={onBlur}
			autoComplete='off'
		/>
	);
}

export default InputText;
