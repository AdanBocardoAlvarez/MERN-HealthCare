import { Button } from 'antd';

interface FormButtonProp {
	PrimaryText: string;
	ClearText: string;
	isShown?: boolean;
	reset?: () => void;
	web?: boolean;
}

const FormButton = ({ PrimaryText, ClearText, isShown, reset, web }: FormButtonProp) => {
	return (
		<div className='elem-list justify-content-between'>
			<Button htmlType='submit' style={{ background: web && '#bf81c4', border: web && 'none' }} className={`${web ? '' : 'bg-color-success'}`}>
				<span className='text-color-500'>{PrimaryText}</span>
			</Button>
			{!isShown && <Button onClick={() => reset()} ghost danger className='ml-auto'>{ClearText}</Button>}
		</div>
	);
};

export default FormButton;
