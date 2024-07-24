import { ColumnProps } from 'antd/es/table';
import { Modal, Table } from 'antd';
import { IGetClientComplaintList } from '../../../../interfaces/Client/client';
import { getComplaintDecision, getComplaintStatus } from '../../../../utils/helper';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    clientComplaint: IGetClientComplaintList[];
    Type: 'ByMe' | 'AgainstMe';
};

const ConsultantComplaintTable = ({ clientComplaint, Type }: Props) => {

    const { t } = useTranslation();
    const [isShow, setIsShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('')

    const columnsByMe: ColumnProps<IGetClientComplaintList>[] = [
        {
            key: 'raised_againstName',
            dataIndex: 'raised_againstName',
            title: t('raised-against'),
            render: (RaisedAgainst) => <strong>{RaisedAgainst}</strong>
        },
        {
            key: 'complaintType',
            dataIndex: 'complaintType',
            title: t('complaint-type'),
            render: (complaintType) => <span className='nowrap'>{complaintType}</span>
        },
        {
            key: 'attachment',
            title: t('attachment'),
            dataIndex: 'attachment',
            render: (img) => img ? <a target='_blank' rel="noreferrer" href={`${process.env.REACT_APP_API_BASE_URL}${img}`} >{t('download')}</a> : ''
        },
        {
            key: 'decision_favour',
            dataIndex: 'decision_favour',
            title: t('decision-favour'),
            render: (Favour) => <span className='nowrap'>{getComplaintDecision(Favour)}</span>
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: t('status'),
            render: (Status) => <span className='nowrap'>{getComplaintStatus(Status)}</span>
        },
        {
            key: 'action_type',
            dataIndex: 'additional_details',
            title: t('view'),
            render: (message) => <button onClick={() => {
                setIsShow(true);
                setMessage(message)
            }} className='btn btn-sm btn-primary'>View Message</button>
        }
    ];

    const columnsAgainstMe: ColumnProps<IGetClientComplaintList>[] = [
        {
            key: 'raised_byName',
            dataIndex: 'raised_byName',
            title: t('raised-by'),
            render: (RaisedAgainst) => <strong>{RaisedAgainst}</strong>
        },
        {
            key: 'complaintType',
            dataIndex: 'complaintType',
            title: t('complaint-type'),
            render: (complaintType) => <span className='nowrap'>{complaintType}</span>
        },
        {
            key: 'attachment',
            title: t('attachment'),
            dataIndex: 'attachment',
            render: (img) => img ? <a target='_blank' rel="noreferrer" href={`${process.env.REACT_APP_API_BASE_URL}${img}`} >{t('download')}</a> : ''
        },
        {
            key: 'decision_favour',
            dataIndex: 'decision_favour',
            title: t('decision-favour'),
            render: (Favour) => <span className='nowrap'>{getComplaintDecision(Favour)}</span>
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: t('status'),
            render: (Status) => <span className='nowrap'>{getComplaintStatus(Status)}</span>
        },
        {
            key: 'action_type',
            dataIndex: 'additional_details',
            title: t('view'),
            render: (message) => <button onClick={() => {
                setIsShow(true);
                setMessage(message)
            }} className='btn btn-sm btn-primary'>View Message</button>
        }
    ];

    // const pagination = clientComplaint?.length <= 10 ? false : {};
    const num = [16, 17, 18, 19, 20, 21];
    return (
        <>
            {Type === 'ByMe' && !num.includes(clientComplaint.length) && (
                <Table
                    // pagination={pagination}
                    className='accent-header'
                    rowKey='_id'
                    dataSource={clientComplaint}
                    columns={columnsByMe}
                />
            )}

            {Type === 'AgainstMe' && !num.includes(clientComplaint.length) && (
                <Table
                    // pagination={pagination}
                    className='accent-header'
                    rowKey='_id'
                    dataSource={clientComplaint}
                    columns={columnsAgainstMe}
                />
            )}

            <Modal centered title="View Message" open={isShow} onOk={() => setIsShow(false)} onCancel={() => setIsShow(false)}>
                <p className='my-0'>{message}</p>
            </Modal>
        </>
    );
};

export default ConsultantComplaintTable;
