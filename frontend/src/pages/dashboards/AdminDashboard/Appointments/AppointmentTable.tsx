import { ColumnProps } from 'antd/es/table';
import { Table, Button } from 'antd';
import { IConsultantBooking } from '../../../../interfaces/Consultant/consultant';

type Props = {
	myBooking?: IConsultantBooking[];
};

const AppointmentTable = ({ myBooking }: Props) => {

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
			key: 'actions',
			title: 'Actions',
			render: actions
		}
	];

	const pagination = myBooking.length <= 10 ? false : {};

	return (
		<>
			<Table
				pagination={pagination}
				className='accent-header'
				rowKey='_id'
				dataSource={myBooking}
				columns={columns}
			/>
		</>
	);
};

export default AppointmentTable;
