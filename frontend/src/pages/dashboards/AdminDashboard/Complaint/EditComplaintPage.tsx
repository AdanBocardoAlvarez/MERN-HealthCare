import { useEffect, useState } from 'react';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import { Form, Input, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import FormButton from '../../../components/FormButton';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminApi } from '../../../../api/api';
import { IPostComplaint } from '../../../../interfaces/Admin/keyword';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { formatDateDDMMYYYY } from '../../../../utils/helper';

const pageData: IPageData = {
	title: 'Edit Complaint',
	fulFilled: true,
	breadcrumbs: [
		{
			title: 'Admin-Dashboard',
			route: 'dashboard'
		},
		{
			title: 'Edit Complaint'
		}
	]
};

const FormItem = Form.Item;
type Status = {
	name: string;
	value: string | number;
	ids: number;
	index: number;
};


const Option = Select.Option;
const EditComplaintPage = () => {
	const token = useSelector((state: AppState) => state.admin.Token);

	const [status] = useState<Status[]>([
		{
			name: 'Raised',
			value: 0,
			ids: 0,
			index: 1,
		},
		{
			name: 'Under Review',
			value: 1,
			ids: 1,
			index: 2,
		},
		{
			name: 'Resolved',
			value: 2,
			ids: 2,
			index: 3,
		}
	]);

	const [action] = useState<Status[]>([
		{
			name: 'Warning',
			value: 'Warning',
			ids: 0,
			index: 1
		},
		{
			name: 'Block',
			value: 'Block',
			ids: 1,
			index: 2
		},
	]);

	const [Decision] = useState<Status[]>([
		{
			name: 'No Decision',
			value: 0,
			ids: 0,
			index: 1
		},
		{
			name: 'Client',
			value: 1,
			ids: 1,
			index: 2
		},
		{
			name: 'Consultant',
			value: 2,
			ids: 2,
			index: 3
		}
	]);

	const { id } = useParams();
	const [data, setData] = useState<any>({
		_id: "",
		action_type: null,
		status: 0,
		decision_favour: 0,
		desc: null,
		additional_details: "",
		created_at: "",
		ConsultantDetails: {
			given_name: "",
			profileImg: ""
		},
		clientDetails: {
			given_name: "",
			profileImg: ""
		},
		complaintType: "",
		againstClientName: "",
		raisedByClientName: "",
		raisedByConsultantName: "",
		againstConsultantName: "",
	})

	const Navigate = useNavigate();

	usePageData(pageData);
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors }
	} = useForm<IPostComplaint>();

	useEffect(() => {
		(() => {
			AdminApi.getComplaintRecord(`complaint/get-record-by-id?id=${id}`, token).then((res) => {
				setData(res)
				reset(res);
			}).catch((err) => {
				const message = err?.response?.data?.message || err.message;
				openNotificationWithIcon({ type: 'error', message: message });
			});
		})();
	}, [id, token, reset]);

	const submitData = (data: IPostComplaint) => {
		const FormData = new URLSearchParams();
		for (const key in data) {
			FormData.append(key, data[key]);
		}
		FormData.append('id', id);
		AdminApi.createPatch(FormData, 'complaint/edit', token)
			.then((datas) => {
				const message = datas.message;
				const status = datas.status;
				if (status) {
					openNotificationWithIcon({ type: 'success', message });
					Navigate(-1);
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
					<div className="col-12 border-bottom mb-4">
						<h5 className='my-1 py-0 fs-5'><span className='text-primary'>Client Name :: </span>{data?.againstClientName || data?.raisedByClientName}</h5>
						<h5 className='my-1 py-0 fs-5'><span className='text-primary'>Consultant Name :: </span>{data?.raisedByConsultantName || data?.againstConsultantName}</h5>
						<h5 className='my-1 py-0 fs-5'><span className='text-primary'>Date :: </span>{formatDateDDMMYYYY(data?.created_at)}</h5>
						<p><span className='text-dark fw-bold'>Message ::</span> {data?.additional_details}</p>
					</div>
					<div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
						<FormItem label='Status'>
							<Controller
								render={({ field }) => (
									<Select
										{...field}
										placeholder='Select Status'
										className='mb-2 mb-md-0'
										aria-label='Status'
										aria-describedby='Select Status'
									>
										{status?.map((res) => <Option key={res.index} value={res.value}>{res.name}</Option>)}
									</Select>
								)}
								name='status'
								control={control}
								rules={{
									required: 'Status is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.status?.message}</span>
						</FormItem>
					</div>
					<div className='col-sm-12 col-md-6 required'>
						<FormItem label='Action Type'>
							<Controller
								render={({ field }) => (
									<Select
										{...field}
										placeholder='Select Action Type'
										className='mb-2 mb-md-0'
										aria-label='action_type'
										aria-describedby='Select Action Type'
									>
										{action?.map((res) => (
											<Option key={res.index} value={res.value}>
												{res.name}
											</Option>
										))}
									</Select>
								)}
								name='action_type'
								control={control}
								rules={{
									required: 'Action Type is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.action_type?.message}</span>
						</FormItem>
					</div>
				</div>

				<div className='row'>
					<div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
						<FormItem label='Decision Favour'>
							<Controller
								render={({ field }) => (
									<Select
										{...field}
										placeholder='Select Decision Favour'
										className='mb-2 mb-md-0'
										aria-label='action_type'
										aria-describedby='Select Decision Favour'
									>
										{Decision?.map((res) => (
											<Option key={res.index} value={res.value}>
												{res.name}
											</Option>
										))}
									</Select>
								)}
								name='decision_favour'
								control={control}
								rules={{
									required: 'Decision Favour is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.decision_favour?.message}</span>
						</FormItem>
					</div>
					<div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
						<FormItem label='Description'>
							<Controller
								render={({ field }) => (
									<Input
										{...field}
										placeholder='Enter Description'
										className='input'
										type='text'
										aria-label='Description'
										aria-describedby='Enter Description'
									/>
								)}
								name='desc'
								control={control}
								rules={{
									required: 'Description is Required'
								}}
							/>
							<span className='text-danger px-3'>{errors.desc?.message}</span>
						</FormItem>
					</div>
				</div>
				<FormButton ClearText='Clear' PrimaryText='Save' reset={reset} />
			</Form >
		</div >
	);
};

export default EditComplaintPage;
