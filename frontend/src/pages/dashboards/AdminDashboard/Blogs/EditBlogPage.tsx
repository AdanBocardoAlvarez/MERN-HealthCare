import { useEffect, useState } from 'react';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import { Form, Input, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import ImageLoader from '../../../../layout/components/patients/ImageLoader';
import FormButton from '../../../components/FormButton';
import { useGetAuthor } from '../../../../hooks/Admin/useAdminConsultant';
import { IBlogGet } from '../../../../interfaces/Admin/blog';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminApi } from '../../../../api/api';
import { useGetApi } from '../../../../hooks/Consultant/useBasicProfile';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';

const pageData: IPageData = {
	title: 'Edit Blog',
	fulFilled: true,
	breadcrumbs: [
		{
			title: 'Admin-Dashboard',
			route: 'dashboard'
		},
		{
			title: 'Edit Blog'
		}
	]
};

const FormItem = Form.Item;
const Option = Select.Option;

const EditBlogPage = () => {
	const { id } = useParams();
	const [blogImage, setBlogImage] = useState<File>();
	const [blogPic, setBlogPic] = useState<string>();

	const token = useSelector((state: AppState) => state.consultant.Token);
	const [Author] = useGetAuthor('blog/get-author');
	const [Objective] = useGetApi('get-objectives');
	const [Disorder] = useGetApi('get-disorders');
	const [Keywords] = useGetApi('get-keywords');
	const Navigate = useNavigate();

	usePageData(pageData);
	const { handleSubmit, control, reset, formState: { errors } } = useForm<IBlogGet>();

	useEffect(() => {
		(async () => {
			await AdminApi.getRecordByID(`blog/get-record-by-id?id=${id}`, token)
				.then(async (res) => {
					reset(res);
					setBlogPic(res.image);
				}).catch((err) => {
					const message = err?.response?.data?.message || err.message;
					openNotificationWithIcon({ type: 'error', message: message });
					reset();
				});
		})();
	}, [id, token, reset]);

	const submitData = (data) => {
		const Formdata = new FormData();
		for (const key in data) {
			Formdata.append(key, data[key] !== undefined ? data[key] : '');
		}
		Formdata.append('image', blogImage);

		AdminApi.createPatch(Formdata, 'blog/edit')
			.then((datas) => {
				const message = datas.message;
				const status = datas.status;
				if (status) {
					openNotificationWithIcon({ type: 'success', message });
					Navigate('/admin/view-blog');
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
			<Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
				<div className='row'>
					<div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
						<FormItem label='Blog Title'>
							<Controller
								render={({ field }) => (
									<Input
										placeholder='Enter Blog Title'
										className='input'
										type='text'
										{...field}
										aria-label='Blog Title'
										aria-describedby='Enter Blog Title'
									/>
								)}
								name='title'
								control={control}
								rules={{
									required: 'Blog Title is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.title?.message}</span>
						</FormItem>
					</div>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Blog Author'>
							<Controller
								render={({ field }) => (
									<Select
										{...field}
										placeholder='Select Blog Author'
										className=' md-0 mb-2 required'
										aria-label='Blog Author '
										aria-describedby='Select Blog Author'
									>
										{Author?.map((res) => (
											<Option key={res._id} value={res._id}>
												{res.name}
											</Option>
										))}
										{/* <Option value='Tags'>author1</Option>
                      <Option value='Tag'>author2</Option> */}
									</Select>
								)}
								name='author_name'
								control={control}
								rules={{
									required: 'Blog Author is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.author_name?.message}</span>
						</FormItem>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Blog Image'>
							<div className={`avatar-wrapper mt-0`}>
								<ImageLoader
									src={blogPic}
									setImage={setBlogImage}
									alt='Blog Pic'
								/>
							</div>
						</FormItem>
					</div>
					<div className='col-sm-12 col-md-6 '>
						<FormItem label='Keywords'>
							<Controller
								render={({ field }) => (
									<Select
										{...field}
										placeholder='Select Keywords'
										className='mb-2 mb-md-0 selectMultiple'
										aria-label='Keywords '
										aria-describedby='Select Keywords'
										mode='multiple'
									>
										{Keywords?.map((res) => (
											<Option key={res._id} value={res._id}>
												{res.name}
											</Option>
										))}
									</Select>
								)}
								name='keywords'
								control={control}
								rules={{
									required: false
								}}
							/>
						</FormItem>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-12 col-md-6 '>
						<FormItem label='Disorders'>
							<Controller
								render={({ field }) => (
									<Select
										{...field}
										placeholder='Select Disorders'
										className='mb-2 mb-md-0 selectMultiple'
										aria-label='Disorders '
										aria-describedby='Select Disorders'
										mode='multiple'
									>
										{Disorder?.map((res) => (
											<Option key={res._id} value={res._id}>
												{res.name}
											</Option>
										))}
									</Select>
								)}
								name='disorder'
								control={control}
								rules={{
									required: false
								}}
							/>
						</FormItem>
					</div>
					<div className='col-sm-12 col-md-6 '>
						<FormItem label='Objectives'>
							<Controller
								render={({ field }) => (
									<Select
										{...field}
										placeholder='Select Objectives'
										className='mb-2 mb-md-0 selectMultiple'
										aria-label='Objectives'
										aria-describedby='Select Objectives'
										mode='multiple'
									>
										{Objective?.map((res) => (
											<Option key={res._id} value={res._id}>
												{res.name}
											</Option>
										))}
									</Select>
								)}
								name='objective'
								control={control}
								rules={{
									required: false
								}}
							/>
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

export default EditBlogPage;
