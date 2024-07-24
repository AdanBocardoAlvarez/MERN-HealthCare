import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import { Form, Input, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import FormButton from '../../../components/FormButton';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useNavigate } from 'react-router-dom';
import { AdminApi } from '../../../../api/api';
import { AppState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
const FormItem = Form.Item;

type SubmitData = {
	content: string;
};

const pageData: IPageData = {
	title: 'Add Terms and Condition',
	fulFilled: true,
	breadcrumbs: [
		{
			title: 'Admin-Dashboard',
			route: 'dashboard'
		},
		{
			title: 'Add Terms and Condition'
		}
	]
};

const AddTermsConditionPage = () => {
	const token = useSelector((state: AppState) => state.admin.Token);
	const setNavigate = useNavigate();
	usePageData(pageData);
	const {
		handleSubmit,
		control,
		reset,
	} = useForm<SubmitData>();

	const submitData = (data: SubmitData) => {
		const formData = new URLSearchParams();
		formData.append('content', data.content);
		AdminApi.createPost(formData, 'terms-and-conditions/store', token)
			.then((datas) => {
				const message = datas.message;
				const status = datas.status;
				if (status) {
					openNotificationWithIcon({ type: 'success', message });
					reset();
				} else {
					openNotificationWithIcon({ type: 'error', message: message });
					reset();
				}
			})
			.catch((err) => {
				const message = err?.response?.data?.message || err.message;
				openNotificationWithIcon({ type: 'error', message: message });
				reset();
			});
	};

	return (
		<div className='stack'>
			<div className='d-flex justify-content-end align-items-center'>
				<Button
					className='mb-3 ms-1 mx-2'
					shape='round'
					type='primary'
					onClick={() => setNavigate('/admin/view-terms-condition')}
				>
					View Terms Condition
				</Button>
			</div>
			<Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
				<div className='row'>
					<div className='col-12 required' style={{ position: 'relative' }}>
						<FormItem label='Terms Condition'>
							<Controller
								render={({ field }) => (
									<Input.TextArea
										placeholder='Enter Terms and Condition'
										className='input'
										cols={10}
										{...field}
										aria-label='Terms and Condition'
										aria-describedby='Enter Terms and Condition'
									/>
								)}
								name='content'
								control={control}
								rules={{
									required: 'Terms and Condition is Required'
								}}
							/>
							{/* <span className='text-danger px-3'>{errors.name?.message}</span> */}
						</FormItem>
					</div>
				</div>
				<FormButton ClearText='Clear' PrimaryText='Save' reset={reset} />
			</Form>
		</div>
	);
};

export default AddTermsConditionPage;
