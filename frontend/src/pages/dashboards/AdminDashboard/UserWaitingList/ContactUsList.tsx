import { Button, Table } from 'antd';
import { IPageData } from '../../../../interfaces/page';
import { usePageData } from '../../../../hooks/usePage';
import { AdminApi } from '../../../../api/api';
import { IContactUSlist } from '../../../../interfaces/Admin/keyword';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import moment from 'moment';
import { openNotificationWithIcon } from '../../../components/Toast';

const pageData: IPageData = {
    title: 'View Contact Us List',
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Admin-Dashboard',
            route: 'dashboard'
        },
        {
            title: 'View Contact Us List'
        }
    ]
};

const ContactUsList = () => {
    usePageData(pageData);

    const [dataList, setdataList] = useState<IContactUSlist[]>([]);
    const [show, setShow] = useState(false);
    const [showDetails, setShowDetails] = useState({ title: '', message: '', })

    useEffect(() => {
        (async () => {
            try {
                const data = await AdminApi.simpleGet('common/get-contact-us-list');
                setdataList(data);
            } catch (error: any) {
                const message = error?.response?.data?.message || error.message;
                openNotificationWithIcon({ type: 'error', message: message });
            }
        })()
    }, [])

    const columns = [
        {
            key: '_id',
            dataIndex: 'name',
            title: 'Name',
            render: (name) => {
                return <strong>{name}</strong>;
            }
        },
        {
            key: '_id',
            dataIndex: 'email',
            title: 'Email',
            render: (email) => {
                return <span>{email}</span>;
            }
        },
        {
            key: '_id',
            dataIndex: 'phone',
            title: 'Phone',
            render: (phone) => {
                return <span>{phone || 'N/A'}</span>;
            }
        },
        {
            key: '_id',
            dataIndex: 'organization',
            title: 'Organization',
            render: (organization) => {
                return <span>{organization || 'N/A'}</span>;
            }
        },
        {
            key: '_id',
            dataIndex: 'created_at',
            title: 'Date',
            render: (created_at) => {
                return <span>{moment(created_at).format('LLL')}</span>;
            }
        },
        {
            key: '_id',
            dataIndex: 'message',
            title: 'Date',
            render: (message, row) => {
                return <Button size='small' ghost onClick={() => {
                    setShow(true);
                    setShowDetails({ title: row.subject, message });
                }}>View Message</Button>
            }
        },
    ];

    return <>
        <Table className='accent-header' rowKey='_id' dataSource={dataList} columns={columns} />
        <Modal title="Message Details" open={show} footer={null} onCancel={() => setShow(false)} centered>
            <div className='w-100'>
                <h5 className='mt-0 mb-2'>{showDetails.title}</h5>
                <p className='mt-0'>{showDetails.message}</p>
            </div>
        </Modal>
    </>
}

export default ContactUsList