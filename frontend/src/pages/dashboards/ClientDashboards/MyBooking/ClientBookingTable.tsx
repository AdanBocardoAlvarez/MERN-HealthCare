import { ColumnProps } from 'antd/es/table';
import { Table, Button, Image } from 'antd';
import { IConsultantBooking } from '../../../../interfaces/Consultant/consultant';
import { getPaymentStatus } from '../../../../utils/helper';
import { Link } from 'react-router-dom';
import { Doctor } from '../../../../assets/img';
import { useTranslation } from 'react-i18next';

const ClientBookingTable = ({ myBooking }) => {

    const { t } = useTranslation();
    const columns: ColumnProps<IConsultantBooking>[] = [
        {
            key: 'orderId',
            dataIndex: 'orderId',
            title: t('cons.order-id'),
            render: (orderId) => <span className='nowrap'>{orderId}</span>
        },
        {
            key: 'profile_img',
            dataIndex: 'profile_img',
            title: t('photo'),
            render: (profile_img) => <div> <Image width={40} height={40} className='rounded-circle' fallback={Doctor} src={`${process.env.REACT_APP_API_BASE_URL}${profile_img}`} alt='Avatar Image' />  </div>
        },
        {
            key: 'client_bookid',
            dataIndex: 'ConsultantDetails',
            title: t('expert-name'),
            render: (ConsultantDetails) => <strong>{ConsultantDetails?.given_name}</strong>
        },
        {
            key: 'book_date',
            dataIndex: 'book_date',
            title: t('appointment-date'),
            render: (book_date) => <span className='nowrap'>{book_date}</span>
        },
        {
            key: 'paymentStatus',
            dataIndex: 'paymentStatus',
            title: t('payment-status'),
            render: (paymentStatus) => <span className='nowrap'>{getPaymentStatus(paymentStatus)}</span>
        },
        {
            key: 'status',
            dataIndex: 'fees',
            title: t('fees'),
            render: (fees) => <span className='nowrap'>€{fees} </span>
        },
        {
            key: '_id',
            dataIndex: '_id',
            title: t('actions'),
            render: (_id, row) => {
                return (row?.paymentStatus === 1 && row.is_live) ? <div className='buttons-list nowrap'>
                    <Link to={`/chat-room/${_id}`}>
                        <Button shape='round' type='primary'>{t('join')}</Button>
                    </Link>
                </div> : <Button className='disabled' aria-disabled="true" shape='round' type='primary' disabled>{t('join')}</Button>
            }
        }
    ];

    const pagination = myBooking.length <= 10 ? false : {};

    return <Table pagination={pagination} className='accent-header' rowKey='_id' dataSource={myBooking} columns={columns} />
};

export default ClientBookingTable;
