import { Table } from 'antd';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import { ColumnProps } from 'antd/es/table';
import { IWaitingUserlist } from '../../../../interfaces/Admin/keyword';
import { useGetWatingUser } from '../../../../hooks/Admin/useAdminConsultant';
import { formatDateDDMMYYYY } from '../../../../utils/helper';

const pageData: IPageData = {
    title: 'View User Waiting List',
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Admin-Dashboard',
            route: 'dashboard'
        },
        {
            title: 'View User Waiting List'
        }
    ]
};

const ViewUserWaitingList = () => {
    usePageData(pageData);

    const [waitinglist] = useGetWatingUser('common/get-user-waiting-list');
    const columns: ColumnProps<IWaitingUserlist>[] = [
        {
            key: '_id',
            dataIndex: 'email',
            title: 'Email',
            render: (email) => {
                return <strong>{email}</strong>;
            }
        },
        {
            key: '_id',
            dataIndex: 'created_at',
            title: 'Registration Date',
            render: (created_at) => {
                return <strong>{formatDateDDMMYYYY(created_at)}</strong>;
            }
        },
    ];

    return <Table className='accent-header' rowKey='_id' dataSource={waitinglist} columns={columns} />
};

export default ViewUserWaitingList;
