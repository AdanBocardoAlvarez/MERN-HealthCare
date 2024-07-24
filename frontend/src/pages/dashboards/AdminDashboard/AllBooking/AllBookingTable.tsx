import { ColumnProps } from 'antd/es/table';
import { Table } from 'antd';
import { AllBooking } from '../../../../interfaces/Admin/allbooking';
import { getPaymentStatus, myMoment } from '../../../../utils/helper';

type Props = {
	myBooking?: AllBooking[];
};

const AllBookingTable = ({ myBooking }: Props) => {
	const columns: ColumnProps<AllBooking>[] = [
		{
			key: 'orderId',
			dataIndex: 'orderId',
			title: 'Order ID',
			render: (orderId) => <span className='nowrap'>{orderId}</span>
		},
		{
			key: 'client_bookid',
			dataIndex: 'clientDetails',
			title: 'Client Name',
			render: (clientDetails) => <><strong>{`${clientDetails?.title} ${clientDetails?.given_name}`.trim()}</strong><br /><span>{clientDetails?.email}</span></>
		},
		{
			key: 'client_id',
			dataIndex: 'ConsultantDetails',
			title: 'Consultant Name',
			render: (ConsultantDetails) => <><strong>{`${ConsultantDetails?.title} ${ConsultantDetails?.given_name}`.trim()}</strong><br /><span>{ConsultantDetails?.email}</span></>
		},
		{
			key: 'book_date',
			dataIndex: 'book_date',
			title: 'Appointment Date',
			render: (book_date) => <span className='nowrap'>{myMoment(book_date).format("lll")}</span>
		},
		{
			key: 'paymentId',
			dataIndex: 'paymentId',
			title: 'Payment Id',
			render: (paymentId) => <span className='nowrap'>{paymentId || "Not Available"}  </span>
		},
		{
			key: 'paymentStatus',
			dataIndex: 'paymentStatus',
			title: 'Payment Status',
			render: (paymentStatus) => <span className='nowrap'>{getPaymentStatus(paymentStatus)}</span>
		},
		{
			key: 'fees',
			dataIndex: 'fees',
			title: 'Fees',
			render: (fees) => <span className='nowrap'>€{fees}  </span>
		}
	];

	const pagination = myBooking.length <= 10 ? false : {};
	return <Table pagination={pagination} className='accent-header' rowKey='_id' dataSource={myBooking} columns={columns} />
};

export default AllBookingTable;
