import { useNavigate } from 'react-router-dom';
import { useGetAllCertificate } from '../../hooks/Consultant/useGetMyCertificate';
import CertificateTable from './CertificateTable';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';

const CertificateDetailPage = () => {

    const { t } = useTranslation();
    const setNavigate = useNavigate();

    const [Certificate] = useGetAllCertificate('get-all-consultant-certificates');
    return (
        <>
            <PageHeader title={t('auth.view-certificate')} />
            <Button className='mb-3 ms-1 mx-2' shape='round' type='primary' onClick={() => setNavigate('/consultant/edit-account/add-certificate')}>
                {t('auth.add-certificate')}
            </Button>
            <CertificateTable Certificate={Certificate} />
        </>
    );
};

export default CertificateDetailPage;
