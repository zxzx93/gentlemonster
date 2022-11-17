import React, { LegacyRef, ChangeEvent } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

type InputProps = {
	label_kr: string;
	label_en: Path<any>;
	register: UseFormRegister<any>;
	handleFieldChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
	label_kr,
	label_en,
	register,
	handleFieldChange,
}: InputProps) {
	const passwordInputType =
		label_en === 'password' || label_en === 'confirmPassword'
			? 'password'
			: 'text';

	return (
		<>
			<label htmlFor={label_en} className='mb-2 block text-sm'>
				{label_kr}
			</label>
			<input
				{...register(label_en, {
					onChange: e => {
						if (handleFieldChange) handleFieldChange(e);
					},
				})}
				className='loginInput'
				type={passwordInputType}
			/>
		</>
	);
}

export const Select = React.forwardRef<
	HTMLSelectElement,
	{ label: string } & ReturnType<UseFormRegister<any>>
>(({ onChange, onBlur, name, label }, ref) => (
	<>
		<label>{label}</label>
		<select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
			<option value='20'>20</option>
			<option value='30'>30</option>
		</select>
	</>
));

export const Checkbox = React.forwardRef(
	(
		{ label, name, value, onChange, defaultChecked, ...rest }: any,
		forwardedRef: LegacyRef<HTMLInputElement> | undefined,
	) => {
		const [checked, setChecked] = React.useState(defaultChecked);

		React.useEffect(() => {
			if (onChange) {
				onChange(checked);
			}
		}, [checked]);

		return (
			<div
				onClick={() => setChecked(!checked)}
				style={{ cursor: 'pointer' }}
				role='presentation'
			>
				<input
					style={{ display: 'none' }}
					ref={forwardedRef}
					type='checkbox'
					name={name}
					value={value}
					checked={checked}
					onChange={e => {
						setChecked(e.target.checked);
					}}
				/>
				[{checked ? 'X' : ' '}]{label}
			</div>
		);
	}
);
