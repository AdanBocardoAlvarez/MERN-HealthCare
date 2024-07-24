import { ColumnProps } from 'antd/es/table';
import { Table, Button } from 'antd';
import { IConsultantBooking } from '../../../../interfaces/Consultant/consultant';

type Props = {
	myBooking?: IConsultantBooking[];
};

// const ActiveVerify = (id, status, fieldName, url) => {
//   const params = new URLSearchParams();
//   params.append('id', id);
//   params.append(fieldName, status);
//   AdminApi.VerifyStatus(params, url)
//     .then((datas) => {
//       const message = datas.message;
//       openNotificationWithIcon({ type: 'success', message: message });
//     })
//     .catch((err) => {
//       const message = err.response.data.message;
//       openNotificationWithIcon({ type: 'error', message: message });
//     });
// };

// type PatientsImgProps = {
//   img: string;
// };

// const PatientImg = ({ img }: PatientsImgProps) => {
//   const isData = img.startsWith('data:image');
//   const isWithPath = img.startsWith('http');

//   if (isData || isWithPath) {
//     return <Avatar size={40} src={img} />;
//   }

//   return <Avatar size={40} src={`${window.location.origin}/${img}`} />;
// };

const TransactionsTable = ({ myBooking }: Props) => {
	// const navigate = useNavigate();

	// const handleShowInfo = () => navigate('/vertical/patient-profile');

	// const VerifyStatus = (id) => {
	//   const params = new URLSearchParams();
	//   params.append('id', id);
	//   params.append('verified_status', `${1}`);
	//   AdminApi.VerifyStatus(params, 'consultant/verify')
	//     .then((datas) => {
	//       const message = datas.message;
	//       openNotificationWithIcon({ type: 'success', message: message });
	//     })
	//     .catch((err) => {
	//       const message = err.response.data.message;
	//       openNotificationWithIcon({ type: 'error', message: message });
	//     });
	// };

	// const ActiveStatus = (id) => {
	//   const params = new URLSearchParams();
	//   params.append('id', id);
	//   params.append('active_status', `${1}`);
	//   AdminApi.VerifyStatus(params, 'consultant/status')
	//     .then((datas) => {
	//       const message = datas.message;
	//       openNotificationWithIcon({ type: 'success', message: message });
	//     })
	//     .catch((err) => {
	//       const message = err.response.data.message;
	//       openNotificationWithIcon({ type: 'error', message: message });
	//     });
	// };

	const actions = () => (
		<div className='buttons-list nowrap'>
			<Button shape='round' type='primary'>
				View Details
			</Button>
		</div>
	);

	const columns: ColumnProps<IConsultantBooking>[] = [
		{
			key: 'client_bookid',
			dataIndex: 'client_bookid',
			title: 'Booking ID',
			render: (client_bookid) => (
				<span
					className='nowrap'
				// style={{ color: '#a5a5a5' }}
				>
					{client_bookid}
				</span>
			)
		},
		{
			key: 'client_bookid',
			dataIndex: 'ClientDetails',
			title: 'Consultant Name',
			render: (ClientDetails) => {
				const { given_name } = ClientDetails[0];
				return <strong>{given_name}</strong>;
			}
		},
		{
			key: 'client_bookid',
			dataIndex: 'ClientDetails',
			title: 'Client Name',
			render: (ClientDetails) => {
				const { given_name } = ClientDetails[0];
				return <strong>{given_name}</strong>;
			}
		},
		{
			key: 'book_date',
			dataIndex: 'book_date',
			title: 'Appointment Date',
			render: (book_date) => <span className='nowrap'>{book_date}</span>
		},
		{
			key: 'book_time',
			dataIndex: 'book_time',
			title: 'Appointment Time',
			render: (book_time) => <span className='nowrap'>{book_time}</span>
		},
		{
			key: 'status',
			dataIndex: 'fees',
			title: 'Status',
			//   sorter: (a, b) => a.fees - b.fees,
			render: (fees) => (
				<span className='nowrap' style={{ color: '#a5a5a5' }}>
					{fees}
				</span>
			)
		},
		{
			key: 'paymentID',
			dataIndex: 'book_time',
			title: 'Payment ID',
			render: (book_time) => <span className='nowrap'>{book_time}</span>
		},
		{
			key: 'amount',
			dataIndex: 'book_time',
			title: 'Amount',
			render: (book_time) => <span className='nowrap'>{book_time}</span>
		},
		{
			key: 'currency',
			dataIndex: 'book_time',
			title: 'Currency',
			render: (book_time) => <span className='nowrap'>{book_time}</span>
		},
		{
			key: 'actions',
			title: 'Actions',
			render: actions
		}
	];

	//   const pagination = myBooking.length <= 10 ? false : {};

	return (
		<>
			<Table
				// pagination={pagination}
				className='accent-header'
				rowKey='_id'
				dataSource={myBooking}
				columns={columns}
			/>
		</>
	);
};

export default TransactionsTable;
