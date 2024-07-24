import { useState } from 'react';
import { ColumnProps } from 'antd/es/table';
import { Table, Button, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { IAdminAllComplaint } from '../../../../interfaces/Admin/keyword';
import { Link } from 'react-router-dom';
import { getComplaintStatus } from '../../../../utils/helper';

type Props = {
    viewComplaint?: IAdminAllComplaint[];
    Type: 'Consultant' | 'Client';
};

const ComplaintTable = ({ viewComplaint, Type }: Props) => {
    const [selectedRowClient, setSelectedRowsClient] = useState<string[]>([]);
    const [selectedRowsConsultant, setSelectedRowsConsultant] = useState<string[]>([]);

    const [isShow, setIsShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('')

    const onSelectChangeClient = (selectedRowClient) => {
        setSelectedRowsClient(selectedRowClient);
    };

    const rowSelectionClient = {
        selectedRowClient,
        onChange: onSelectChangeClient
    };

    const onSelectChangeConsultant = (selectedRowClient) => {
        setSelectedRowsConsultant(selectedRowClient);
    };

    const rowSelectionConsultant = {
        selectedRowsConsultant,
        onChange: onSelectChangeConsultant
    };

    const columnsConsultant: ColumnProps<IAdminAllComplaint>[] = [
        {
            key: 'againstClientName',
            dataIndex: 'againstClientName',
            title: 'Client Name',
            render: (againstClientName) => {
                return <div className='wrap'>{againstClientName}</div>;
            }
        },
        {
            key: 'attachment',
            title: 'Attachment',
            dataIndex: 'attachment',
            render: (img) => img ? <a target='_blank' rel="noreferrer" href={`${process.env.REACT_APP_API_BASE_URL}${img}`} >Download</a> : ''
        },
        {
            key: 'complaintType',
            dataIndex: 'complaintType',
            title: 'Complaint Type',
            render: (complaintType) => {
                return <strong className='wrap'>{complaintType}</strong>;
            }
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: 'Status',
            render: (Status) => <span className='nowrap'>{getComplaintStatus(Status)}</span>
        },
        {
            key: 'action_type',
            dataIndex: 'additional_details',
            title: 'View',
            render: (message) => <Button onClick={() => {
                setIsShow(true);
                setMessage(message)
            }} shape='round' type='primary'>View Message</Button>
        },
        {
            key: '_id',
            dataIndex: '_id',
            title: 'Actions',
            render: (id) => (
                <div className='buttons-list nowrap' style={{ gap: '10px' }}>
                    <Link to={`../edit-complaint/${id}`}>
                        <Button shape='round' type='primary'>
                            <EditOutlined style={{ fontSize: '20px' }} />
                        </Button>
                    </Link>
                </div>
            )
        },

    ];

    const columnsClient: ColumnProps<IAdminAllComplaint>[] = [
        {
            key: 'againstConsultantName',
            dataIndex: 'againstConsultantName',
            title: 'Consultant Name',
            render: (againstConsultantName) => {
                return <div className='wrap'>{againstConsultantName}</div>;
            }
        },
        {
            key: 'attachment',
            title: 'Attachment',
            dataIndex: 'attachment',
            render: (img) => img ? <a target='_blank' rel="noreferrer" href={`${process.env.REACT_APP_API_BASE_URL}${img}`} >Download</a> : ''
        },
        {
            key: 'complaintType',
            dataIndex: 'complaintType',
            title: 'Complaint Type',
            render: (complaintType) => {
                return <strong className='wrap'>{complaintType}</strong>;
            }
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: 'Status',
            render: (Status) => <span className='nowrap'>{getComplaintStatus(Status)}</span>
        },
        {
            key: 'action_type',
            dataIndex: 'additional_details',
            title: 'View',
            render: (message) => <Button onClick={() => {
                setIsShow(true);
                setMessage(message)
            }} shape='round' type='primary'>View Message</Button>
        },
        {
            key: '_id',
            dataIndex: '_id',
            title: 'Actions',
            render: (id) => (
                <div className='buttons-list nowrap' style={{ gap: '10px' }}>
                    <Link to={`../edit-complaint/${id}`}>
                        <Button shape='round' type='primary'>
                            <EditOutlined style={{ fontSize: '20px' }} />
                        </Button>
                    </Link>
                </div>
            )
        },
    ];

    const consultantComplaints = viewComplaint.filter((data) => data?.againstClientName && data?.raisedByConsultantName);
    const clientsComplaints = viewComplaint.filter((data) => data?.raisedByClientName && data?.againstConsultantName);

    const paginationConsultant = viewComplaint.length <= 10 ? false : {};
    const paginationClients = viewComplaint.length <= 10 ? false : {};

    return (
        <>
            {Type === 'Consultant' && (
                <Table
                    rowSelection={rowSelectionConsultant}
                    pagination={paginationConsultant}
                    className='accent-header'
                    rowKey='_id'
                    dataSource={consultantComplaints}
                    columns={columnsConsultant}
                />
            )}

            {Type === 'Client' && (
                <Table
                    rowSelection={rowSelectionClient}
                    pagination={paginationClients}
                    className='accent-header'
                    rowKey='_id'
                    dataSource={clientsComplaints}
                    columns={columnsClient}
                />
            )}

            <Modal centered title="View Message" open={isShow} onOk={() => setIsShow(false)} onCancel={() => setIsShow(false)}>
                <p className='my-0'>{message}</p>
            </Modal>
        </>
    );
};

export default ComplaintTable;
