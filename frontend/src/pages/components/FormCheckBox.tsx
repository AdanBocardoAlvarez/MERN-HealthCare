import { Form } from 'antd';
import Checkbox from 'antd/lib/checkbox';
import { Controller } from 'react-hook-form';

const FormItem = Form.Item;

const FormCheckBox = ({ label, ariaLabel, options, control, name, error = '' }) => {
	return (
		<>
			<label style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>{label}</label>
			<FormItem>
				<Controller
					render={({ field }) => (
						<Checkbox.Group
							{...field}
							aria-label={label}
							aria-describedby={ariaLabel}
							options={options}
						/>
					)}
					name={name}
					control={control}
					rules={{ required: false }}
				/>
				<span className='text-danger d-block'>{error}</span>
			</FormItem>
		</>
	);
};

export default FormCheckBox;
