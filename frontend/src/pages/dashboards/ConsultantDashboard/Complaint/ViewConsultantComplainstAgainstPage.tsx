import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ConsultantComplaintTable from './ConsultantComplaintTable';
import { useGetComplaintConsultantList } from '../../../../hooks/Consultant/useMyProfileConsultant';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../../components/PageHeader';

const ViewConsultantComplaintAgainstPage = () => {

    const { t } = useTranslation();
    const [ComplaintList] = useGetComplaintConsultantList('get-complaint-against-me');

    return (
        <>
            <PageHeader title={t('cnt.view-complaint-against-me')} />
            <div className='d-flex justify-content-start mb-3'>
                <Link className='d-flex align-items-center paragraph-text gap-2' to='/consultant/dashboard'>
                    <ArrowLeftOutlined style={{ fontSize: '100%' }} />
                    <span className='text-md'>{t('dashboard')}</span>
                </Link>
            </div>
            <ConsultantComplaintTable Type='AgainstMe' clientComplaint={ComplaintList} />
        </>
    );
};

export default ViewConsultantComplaintAgainstPage;
