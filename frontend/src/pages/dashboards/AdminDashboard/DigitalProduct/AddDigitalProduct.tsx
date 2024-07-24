import { useState } from 'react';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import { Button, Form, Input, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import ImageLoader from '../../../../layout/components/patients/ImageLoader';
import FormButton from '../../../components/FormButton';
import { useGetAuthor } from '../../../../hooks/Admin/useAdminConsultant';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useNavigate } from 'react-router-dom';
import { AdminApi } from '../../../../api/api';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { IDigitalProduct } from '../../../../interfaces/Admin/digitalProduct';

const pageData: IPageData = {
	title: 'Add Digital Product',
	fulFilled: true,
	breadcrumbs: [
		{
			title: 'Admin-Dashboard',
			route: 'dashboard'
		},
		{
			title: 'Add Add Digital Product'
		}
	]
};

const FormItem = Form.Item;
const Option = Select.Option;

const AddDigitalProduct = () => {
	const token = useSelector((state: AppState) => state.admin.Token);
	const [digitalProductPic, setDigitalProductPic] = useState<File | null>(null);
	const [digitalProductPDF, setDigitalProductPDF] = useState<File | null>(null);
	const [Author] = useGetAuthor('blog/get-author');
	const Navigate = useNavigate();

	usePageData(pageData);
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors }
	} = useForm<IDigitalProduct>();

	const submitData = (data: IDigitalProduct) => {
		const Formdata = new FormData();
		for (const key in data) {
			Formdata.append(key, data[key] !== undefined ? data[key] : '');
		}
		Formdata.append('image', digitalProductPic);
		Formdata.append('pdf', digitalProductPDF);

		AdminApi.createPost(Formdata, 'digital-product/store', token)
			.then((datas) => {
				const message = datas.message;
				const status = datas.status;
				if (status) {
					openNotificationWithIcon({ type: 'success', message });

					reset();
					setDigitalProductPic(null);
					setDigitalProductPDF(null);
				} else {
					openNotificationWithIcon({ type: 'error', message: message });
				}
			})
			.catch((err) => {
				const message = err?.response?.data?.message || err.message;
				openNotificationWithIcon({ type: 'error', message: message });
			});
	};

	return (
		<div className='stack'>
			<div className='d-flex justify-content-end align-items-center'>
				<Button
					className='mb-3 ms-1 mx-2'
					shape='round'
					type='primary'
					onClick={() => Navigate('/admin/view-digital-product')}
				>
					View Add Digital Product
				</Button>
			</div>

			<Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
				<div className='row'>
					<div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
						<FormItem label='Add Digital Product Title'>
							<Controller
								render={({ field }) => (
									<Input
										placeholder='Enter Add Digital Product Title'
										className='input'
										type='text'
										{...field}
										aria-label='Add Digital Product Title'
										aria-describedby='Enter Add Digital Product Title'
									/>
								)}
								name='title'
								control={control}
								rules={{
									required: 'Add Digital Product Title is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.title?.message}</span>
						</FormItem>
					</div>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Add Digital Product Author'>
							<Controller
								render={({ field }) => (
									<Select
										{...field}
										placeholder='Select Add Digital Product Author'
										className=' md-0 mb-2 required'
										aria-label='Add Digital Product Author '
										aria-describedby='Select Add Digital Product Author'
									>
										{Author?.map((res) => (
											<Option key={res._id} value={res._id}>
												{res.name}
											</Option>
										))}
									</Select>
								)}
								name='author_name'
								control={control}
								rules={{
									required: 'Add Digital Product Author is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.author_name?.message}</span>
						</FormItem>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Add Digital Product Image'>
							<div className={`avatar-wrapper mt-0`}>
								<ImageLoader
									setImage={setDigitalProductPic}
									alt='Add Digital Product Image'
								/>
							</div>
						</FormItem>
					</div>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Add Digital Product Pdf'>
							<div className={`avatar-wrapper mt-0`}>
								<ImageLoader
									setImage={setDigitalProductPDF}
									alt='Add Digital Product Pdf'
								/>
							</div>
						</FormItem>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Date ' className='form-group'>
							<Controller
								render={({ field }) => (
									<Input
										{...field}
										type='date'
										placeholder='Select Date'
										className='md-0 mb-2'
										aria-label='Date'
										aria-describedby='Select Date'
									/>
								)}
								name='date'
								control={control}
								rules={{
									required: 'Select Date is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.date?.message}</span>
						</FormItem>
					</div>
					<div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
						<FormItem label='Add Digital Product Subtitle'>
							<Controller
								render={({ field }) => (
									<Input
										placeholder='Enter Add Digital Product Subtitle'
										className='input'
										type='text'
										{...field}
										aria-label='Add Digital Product Subtitle'
										aria-describedby='Enter Add Digital Product Subtitle'
									/>
								)}
								name='subtitletitle'
								control={control}
								rules={{
									required: 'Add Digital Product Subtitle is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.subtitletitle?.message}</span>
						</FormItem>
					</div>
				</div>

				<div className='row'>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Description'>
							<Controller
								render={({ field }) => (
									<Input.TextArea
										placeholder='Enter Description'
										className='input'
										autoSize={{ minRows: 4, maxRows: 6 }}
										{...field}
										aria-label='Description'
										aria-describedby='Enter Description'
									/>
								)}
								name='des'
								control={control}
								rules={{
									required: 'Description is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.des?.message}</span>
						</FormItem>
					</div>
				</div>
				<FormButton ClearText='Clear' PrimaryText='Save' reset={reset} />
			</Form>
		</div>
	);
};

export default AddDigitalProduct;
