import { ColumnProps } from 'antd/es/table';
import { Table, Button, Tag, Avatar } from 'antd';
import { IConsultant } from '../../../../interfaces/Consultant/consultant';
import { NavLink } from 'react-router-dom';

const ClientTable = ({ patients }) => {

    const columns: ColumnProps<IConsultant>[] = [
        {
            key: 'img',
            title: 'Photo',
            dataIndex: 'ClientDetails',
            render: (ClientDetails) => <Avatar size={40} src={`${process.env.REACT_APP_API_BASE_URL}${ClientDetails?.profile_image}`} />
        },
        {
            key: 'id',
            dataIndex: 'unique_code',
            title: 'ID',
            sorter: (a, b) => (a._id > b._id ? 1 : -1),
            render: (id) => <b className='nowrap' style={{ color: '#a5a5a5' }}>{id}</b>
        },
        {
            key: 'name',
            dataIndex: 'given_name',
            title: 'Name',
            render: (name) => <span className='nowrap'>{name}</span>
        },
        {
            key: 'visit',
            dataIndex: 'gender',
            title: 'Gender',
            render: (gender) => <span className='nowrap'>{gender}</span>
        },
        {
            key: 'email',
            dataIndex: 'email',
            title: 'Email',
            render: (email) => <span className='nowrap'>{email}</span>
        },
        {
            key: 'contact_number',
            dataIndex: 'contact_number',
            title: 'Contact Number',
            render: (contact_number) => <span className='nowrap'>{contact_number}</span>
        },
        {
            key: 'status',
            dataIndex: 'active_status',
            title: 'Status',
            render: (active_status) => <Tag style={{ borderRadius: 20 }} color={active_status === 1 ? '#b7ce63' : '#cec759'}>{active_status === 1 ? 'Active' : 'InActive'}</Tag>
        },
        {
            key: 'actions',
            title: 'Actions',
            render: (consultant: IConsultant) => <div className='buttons-list nowrap'>
                <NavLink style={{ color: 'white' }} to={`client-profile/${consultant._id}`}>
                    <Button shape='round' type='primary'>
                        View
                    </Button>
                </NavLink>
            </div>
        }
    ];

    const pagination = patients?.length <= 10 ? false : {};
    return <Table pagination={pagination} className='accent-header' rowKey='_id' dataSource={patients} columns={columns} />
};

export default ClientTable;
