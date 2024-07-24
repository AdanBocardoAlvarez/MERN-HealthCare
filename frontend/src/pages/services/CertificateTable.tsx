import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnProps } from 'antd/es/table';
import { Table, Button, Modal } from 'antd';
import { IGetMyAllCerificate } from '../../interfaces/Consultant/consultantprofile';
import { DeleteOutlined } from '@ant-design/icons';
import { openNotificationWithIcon } from '../components/Toast';
import { ConsultantApi } from '../../api/api';
import { AppState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

type Props = {
    Certificate?: IGetMyAllCerificate[];
};

const CertificateTable = ({ Certificate }: Props) => {

    const { t } = useTranslation();
    const [nationality, setNationality] = useState([]);
    const [visibleModal, setVisibleModal] = useState();

    useEffect(() => {
        setNationality(Certificate);
    }, [Certificate]);

    const Navigate = useNavigate();

    const columns: ColumnProps<IGetMyAllCerificate>[] = [
        {
            key: 'certificate_name',
            dataIndex: 'certificate_name',
            title: t('auth.certificate-name'),
            render: (certificateName) => <span className='nowrap'>{certificateName}</span>
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: t('auth.school-name-for-certificate'),
            render: (schoolName) => <span className='nowrap'>{schoolName}</span>
        },
        {
            key: 'year_of_certificate',
            dataIndex: 'year_of_certificate',
            title: t('auth.year-of-certification'),
            render: (certificateYear) => <span className='nowrap'>{certificateYear}</span>
        },
        {
            key: 'num_of_certificate',
            dataIndex: 'num_of_certificate',
            title: t('auth.number-of-certificate'),
            render: (noOfCertificate) => <span className='nowrap'>{noOfCertificate}</span>
        },
        {
            key: '_id',
            dataIndex: '_id',
            title: t('actions'),
            render: (id) => (
                <>
                    <Button onClick={() => Navigate(`/consultant/edit-account/certificate-detail/edit/${id}`)} shape='round' type='primary'>
                        {t('edit')}
                    </Button>
                    <Button shape='round' type='primary' onClick={() => setVisibleModal(id)} danger>
                        <DeleteOutlined />
                    </Button>
                </>
            )
        }
    ];

    const pagination = Certificate.length <= 10 ? false : {};

    const token = useSelector((state: AppState) => state.consultant.Token);
    const handleCancel = () => {
        setVisibleModal(undefined);
    };

    function deleteTempNationality(id: string) {
        ConsultantApi.deleteCertificate(`delete-consultant-certificates?id=${id}`, token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    setVisibleModal(undefined);
                    setNationality(Certificate.filter(row => row._id !== id));
                    openNotificationWithIcon({ type: 'success', message })
                } else {
                    openNotificationWithIcon({ type: 'error', message: message })
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err?.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }

    return (
        <>
            <Table pagination={pagination} className='accent-header' rowKey='_id' dataSource={nationality} columns={columns} />

            <Modal open={visibleModal} footer={null} onCancel={handleCancel} className='d-flex ' title={<h3 className='title text-center'>{t('auth.delete-certificate')}</h3>} >
                <Button shape='round' type='primary' onClick={() => deleteTempNationality(visibleModal)} danger >
                    {t('delete')}
                </Button>
                <Button shape='round' type='primary' onClick={() => setVisibleModal(undefined)}>
                    {t('cancel')}
                </Button>
            </Modal>
        </>
    );
}

export default CertificateTable;
