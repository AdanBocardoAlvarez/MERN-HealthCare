import { useEffect, useState } from 'react';
import { ColumnProps } from 'antd/es/table';
import { Table, Button, Modal, Tag, Input, Form } from 'antd';
import { IConsultant } from '../../../../interfaces/Consultant/consultant';
import { AdminApi } from '../../../../api/api';
import { openNotificationWithIcon } from '../../../components/Toast';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { Controller, useForm } from 'react-hook-form';
import FormButton from '../../../components/FormButton';

type Props = {
	patients: IConsultant[];
};

const FormItem = Form.Item;

const ConsultantTable = ({ patients }: Props) => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors }
	} = useForm<IConsultant>();

	const token = useSelector((state: AppState) => state.admin.Token);
	const [visibleModal, setVisibleModal] = useState('');
	const [isFirstRender, setIsFirstRender] = useState(true);
	const [checked] = useState(true);
	const [status] = useState({
		verified_status: 1,
		id: ''
	});

	const submitData = (data: IConsultant) => {
		const urlSearchParams = new URLSearchParams();
		for (const key in data) {
			urlSearchParams.append(key, data[key]);
		}

		urlSearchParams.append('id', visibleModal);

		const formData = urlSearchParams.toString();
		AdminApi.createPost(formData, 'consultant/add-fees', token).then((datas) => {
			const message = datas.message;
			const status = datas.message;
			if (status) {
				openNotificationWithIcon({ type: 'success', message });
				setVisibleModal(undefined);
			} else {
				openNotificationWithIcon({ type: 'error', message: message });
			}
		});
	};

	useEffect(() => {
		if (!isFirstRender && status.id) {
			const urlSearchParams = new URLSearchParams();
			for (const key in status) {
				urlSearchParams.append(key, status[key]);
			}
			const formData = urlSearchParams.toString();
			AdminApi.createPost(formData, 'consultant/verify', token).then((datas) => {
				const message = datas.message;
				const status = datas.message;
				if (status) {
					openNotificationWithIcon({ type: 'success', message });
				} else {
					openNotificationWithIcon({ type: 'error', message: message });
				}
			});
		} else {
			setIsFirstRender(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checked, status, token]);

	const actions = (consultant: IConsultant) => {
		return (
			<div className='buttons-list nowrap'>
				<NavLink style={{ color: 'white' }} to={`consultant-profile/${consultant._id}`}>
					<Button shape='round' type='primary'>
						View
					</Button>
				</NavLink>
			</div>
		);
	};

	const columns: ColumnProps<IConsultant>[] = [
		{
			key: 'id',
			dataIndex: 'unique_code',
			title: 'ID',
			sorter: (a, b) => (a._id > b._id ? 1 : -1),
			render: (id) => (
				<span className='nowrap' style={{ color: '#a5a5a5' }}>
					{id}
				</span>
			)
		},
		{
			key: 'name',
			dataIndex: 'given_name',
			title: 'Name',
			//   sorter: (a, b) => (a.name > b.name ? 1 : -1),
			render: (name) => <strong>{name}</strong>
		},
		{
			key: 'visit',
			dataIndex: 'gender',
			title: 'Gender',
			render: (gender) => (
				<span className='nowrap' style={{ color: '#a5a5a5' }}>
					{gender}
				</span>
			)
		},

		{
			key: 'email',
			dataIndex: 'email',
			title: 'Email',
			//   sorter: (a, b) => a.age - b.age,
			render: (email) => (
				<span className='nowrap' style={{ color: '#a5a5a5' }}>
					{email}
				</span>
			)
		},
		{
			key: 'contact_number',
			dataIndex: 'contact_number',
			title: 'Contact Number',
			render: (contact_number) => <span>{`${contact_number}`}</span>
		},
		// {
		//   key: 'number',
		//   dataIndex: 'number',
		//   title: 'Number',
		//   render: (phone) => (
		//     <span className='d-flex align-baseline nowrap' style={{ color: '#336cfb' }}>
		//       <span className='icofont icofont-ui-cell-phone mr-1' style={{ fontSize: 16 }} />
		//       {phone}
		//     </span>
		//   )
		// },
		{
			key: 'status',
			dataIndex: 'verified_status',
			title: 'Status',
			render: (verified_status) => (
				<Tag style={{ borderRadius: 20 }} color={verified_status === 1 ? '#b7ce63' : '#cec759'}>
					{verified_status === 1 ? 'Approved' : 'Pending'}
				</Tag>
			)
			//   sorter: (a, b) => (a.status > b.status ? 1 : -1)
		},
		{
			key: 'actions',
			title: 'Actions',
			render: actions
		}
	];

	const pagination = patients?.length <= 10 ? false : {};

	return (
		<>
			<Table
				pagination={pagination}
				className='accent-header'
				rowKey='_id'
				dataSource={patients}
				columns={columns}
			/>

			<Modal
				open={visibleModal ? true : false}
				footer={null}
				onCancel={null}
				className='d-flex '
				title={<h3 className='title text-center'>Add Fees</h3>}
			>
				{/* <Button shape='round' type='primary' onClick={() => addFees(visibleModal)} danger>
          Move to Bin
        </Button> */}
				<Form onSubmitCapture={handleSubmit(submitData)}>
					<FormItem label='Fees'>
						<Controller
							render={({ field }) => (
								<Input
									placeholder='Enter Fees'
									className='input'
									type='text'
									{...field}
									aria-label='Fees'
									aria-describedby='Enter Fees'
								/>
							)}
							name='fees'
							control={control}
							rules={{
								required: 'Fees is Required'
							}}
						/>
						<span className='text-danger px-3'>{errors.fees?.message}</span>
					</FormItem>
					<FormButton ClearText='Clear' PrimaryText='Save' reset={reset} />
				</Form>
				<Button shape='round' type='primary' onClick={() => setVisibleModal(undefined)}>
					Cancel
				</Button>
			</Modal>
		</>
	);
};

export default ConsultantTable;
