import { ColumnProps } from 'antd/es/table';
import { Table, Image } from 'antd';
import { IConsultantBooking } from '../../../../interfaces/Consultant/consultant';
import { Link } from 'react-router-dom';
import { Doctor } from '../../../../assets/img';
import { t } from 'i18next';

type Props = { myBooking?: IConsultantBooking[]; };

const BookingTable = ({ myBooking }: Props) => {
    const actions = (id: string, row: IConsultantBooking) => {
        return <div className='buttons-list nowrap'>
            <Link className='btn btn-primary me-1' to={`/consultant/my-booking/add-note/${id}/${row.client_bookid}`}>{t('cons.add-note')}</Link>
            {row.is_live ? <Link className='btn btn-primary ms-1' to={`/chat-room/${row._id}`}>{t('join')}</Link> : <button className='btn btn-dark ms-1' disabled>{t('join')}</button>}
        </div>;
    }

    const columns: ColumnProps<IConsultantBooking>[] = [
        {
            key: 'orderId',
            dataIndex: 'orderId',
            title: t('cons.order-id'),
            render: (orderId) => <span className='nowrap'>{orderId}</span>
        },
        {
            key: 'img',
            title: t('photo'),
            dataIndex: 'img',
            render: (ClientDetails) => <div> <Image width={40} height={40} className='rounded-circle' fallback={Doctor} src={`${process.env.REACT_APP_API_BASE_URL}${ClientDetails?.profile_img}`} alt='Avatar Image' />  </div>
        },
        {
            key: 'client_bookid',
            dataIndex: 'ClientDetails',
            title: t('client-name'),
            render: (ClientDetails) => <strong>{`${ClientDetails?.title} ${ClientDetails?.given_name}`.trim()}</strong>
        },
        {
            key: 'client_bookid',
            dataIndex: 'ClientDetails',
            title: t('contact-number'),
            render: (ClientDetails) => <><span className='nowrap'>{ClientDetails?.contact_number}</span> <br /> <span>{ClientDetails?.email}</span></>
        },
        {
            key: 'book_date',
            dataIndex: 'book_date',
            title: t('appointment-date'),
            render: (book_date) => <span className='nowrap'>{book_date}</span>
        },
        {
            key: 'status',
            dataIndex: 'fees',
            title: t('fees'),
            render: (fees) => <span className='nowrap'>€{fees}  </span>
        },
        {
            key: '_id',
            dataIndex: '_id',
            title: t('actions'),
            render: actions
        }
    ];

    const pagination = myBooking.length <= 10 ? false : {};

    return <Table pagination={pagination} className='accent-header' rowKey='_id' dataSource={myBooking} columns={columns} />
};

export default BookingTable;
