import { useEffect, useState } from 'react';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import { Form, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import FormButton from '../../../components/FormButton';
import { openNotificationWithIcon } from '../../../components/Toast';
import { AdminApi } from '../../../../api/api';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { IWebSetting } from '../../../../interfaces/Admin/quote';
import ImageLoader from '../../../../layout/components/patients/ImageLoader';
import { useDispatch } from 'react-redux';
import { setWebSettingData } from '../../../../redux/webSetteing/actions';

const pageData: IPageData = {
	title: 'Web Setting',
	fulFilled: true,
	breadcrumbs: [
		{
			title: 'Client-Dashboard',
			route: 'dashboard'
		},
		{
			title: 'Web Setting'
		}
	]
};

const FormItem = Form.Item;
const WebSettingPage = () => {
	const token = useSelector((state: AppState) => state.admin.Token);
	const webSettings = useSelector((state: AppState) => state.webSettings);


	const dispatch = useDispatch()
	const [WebLogo, setWebLogo] = useState<File | null>(null);
	const [FooterLogo, setFooterLogo] = useState<File | null>(null);
	const [EmailLogo, setEmailLogo] = useState<File | null>(null);
	const [FabIcon, setFabIcon] = useState<File | null>(null);

	const [WebPic, setWebPic] = useState<string>();
	const [FooterPic, setFooterPic] = useState<string>();
	const [EmailPic, setEmailPic] = useState<string>();
	const [FabPic, setFabPic] = useState<string>();

	usePageData(pageData);
	const { handleSubmit, control, reset, formState: { errors } } = useForm<IWebSetting>();

	useEffect(() => {
		reset(webSettings);
		setFabPic(webSettings?.fab_icon);
		setEmailPic(webSettings?.email_logo);
		setFooterPic(webSettings?.footer_logo);
		setWebPic(webSettings?.web_logo);
	}, [webSettings, reset])

	const submitData = (data: IWebSetting) => {
		const Formdata = new FormData();
		for (const key in data) {
			Formdata.append(key, data[key] || '');
		}
		Formdata.append('web_logo', WebLogo);
		Formdata.append('footer_logo', FooterLogo);
		Formdata.append('email_logo', EmailLogo);
		Formdata.append('fab_icon', FabIcon);
		AdminApi.postWebSetting(Formdata, 'web-setting/store', token)
			.then((datas) => {

				dispatch(setWebSettingData(datas.data));
				const message = datas.message;
				const status = datas.status;
				if (status) {
					openNotificationWithIcon({ type: 'success', message });
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
			<Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
				<div className='row'>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Web Title'>
							<Controller
								render={({ field }) => (
									<Input
										{...field}
										placeholder='Enter Web Title'
										className=' md-0 mb-2 required'
										aria-label='Web Title'
										aria-describedby='Enter Web Title'
									/>
								)}
								name='web_title'
								control={control}
								rules={{
									required: 'Web is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.web_title?.message}</span>
						</FormItem>
					</div>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Domain Name Without Extension'>
							<Controller
								render={({ field }) => (
									<Input
										{...field}
										placeholder='Enter Domain Name Without Extension'
										className=' md-0 mb-2 required'
										aria-label='Domain Name Without Extension'
										aria-describedby='Enter Domain Name Without Extension'
									/>
								)}
								name='domain_name_without_extension'
								control={control}
								rules={{
									required: 'Domain Name Without Extension is Required'
								}}
							/>
							<span className='text-danger px-3'>
								{errors.domain_name_without_extension?.message}
							</span>
						</FormItem>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Web Tweet'>
							<Controller
								render={({ field }) => (
									<Input
										{...field}
										placeholder='Enter Web Tweet'
										className=' md-0 mb-2 required'
										aria-label='Web Tweet'
										aria-describedby='Enter Web Tweet'
									/>
								)}
								name='web_tw'
								control={control}
								rules={{
									required: 'Web Tweet is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.web_tw?.message}</span>
						</FormItem>
					</div>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Youtube URL'>
							<Controller
								render={({ field }) => (
									<Input
										{...field}
										placeholder='Enter Youtube URL'
										className=' md-0 mb-2 required'
										aria-label='Youtube URL'
										aria-describedby='Enter Youtube URL'
									/>
								)}
								name='web_yt'
								control={control}
								rules={{
									required: 'Youtube URL is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.web_yt?.message}</span>
						</FormItem>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Web Linkedin'>
							<Controller
								render={({ field }) => (
									<Input
										{...field}
										placeholder='Enter Web Linkedin'
										className=' md-0 mb-2 required'
										aria-label='Web Linkedin'
										aria-describedby='Enter Web Linkedin'
									/>
								)}
								name='web_linkedin'
								control={control}
								rules={{
									required: 'Web Linkedin is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.web_linkedin?.message}</span>
						</FormItem>
					</div>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Web Instagram'>
							<Controller
								render={({ field }) => (
									<Input
										{...field}
										placeholder='Enter Web Instagram'
										className=' md-0 mb-2 required'
										aria-label='Web Instagram'
										aria-describedby='Enter Web Instagram'
									/>
								)}
								name='web_insta'
								control={control}
								rules={{
									required: 'Web Instagram is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.web_insta?.message}</span>
						</FormItem>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Website Legal Name'>
							<Controller
								render={({ field }) => (
									<Input
										{...field}
										placeholder='Enter Website Legal Name'
										className=' md-0 mb-2 required'
										aria-label='Website Legal Name'
										aria-describedby='Enter Website Legal Name'
									/>
								)}
								name='web_legal_name'
								control={control}
								rules={{
									required: 'Website Legal Name is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.web_legal_name?.message}</span>
						</FormItem>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Add Footer Logo'>
							<div className={`avatar-wrapper mt-0`}>
								<ImageLoader
									src={FooterPic}
									accept='.jpg,.jpeg,.png'
									setImage={setFooterLogo}
									alt='Footer Logo'
								/>
							</div>
						</FormItem>
					</div>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Add Email Logo'>
							<div className={`avatar-wrapper mt-0`}>
								<ImageLoader
									src={EmailPic}
									accept='.jpg,.jpeg,.png'
									setImage={setEmailLogo}
									alt='Email Logo'
								/>
							</div>
						</FormItem>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Add Website Logo'>
							<div className={`avatar-wrapper mt-0`}>
								<ImageLoader
									src={WebPic}
									accept='.jpg,.jpeg,.png'
									setImage={setWebLogo}
									alt='Website Logo'
								/>
							</div>
						</FormItem>
					</div>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Add Fab Icon'>
							<div className={`avatar-wrapper mt-0`}>
								<ImageLoader
									src={FabPic}
									accept='.jpg,.jpeg,.png'
									setImage={setFabIcon}
									alt='Fab Icon'
								/>
							</div>
						</FormItem>
					</div>
				</div>
				<FormButton ClearText='Clear' PrimaryText='Save' reset={reset} />
			</Form>
		</div>
	);
};

export default WebSettingPage;
