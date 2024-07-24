import { Link } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import ConsultantComplaintTable from './ConsultantComplaintTable';
import { useGetComplaintConsultantList } from '../../../../hooks/Consultant/useMyProfileConsultant';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../../components/PageHeader';

const ViewConsultantComplaintPage = () => {

    const { t } = useTranslation();
    const [ComplaintList] = useGetComplaintConsultantList('get-complaint-raised-by-me');

    return (
        <>
            <PageHeader title={t('cnt.view-complaint-by-me')} />
            <div className='d-flex justify-content-between mb-3'>
                <Link className='d-flex align-items-center paragraph-text gap-2' to='/consultant/dashboard'>
                    <ArrowLeftOutlined style={{ fontSize: '100%' }} />
                    <span className='text-md'>{t('dashboard')}</span>
                </Link>
                <Link className='d-flex align-items-center paragraph-text gap-2' to='/consultant/add-complaint'>
                    <span className='text-md'>{t('add-complaint')}</span>
                    <ArrowRightOutlined style={{ fontSize: '100%' }} />
                </Link>
            </div>
            {ComplaintList.length !== 0 && (
                <ConsultantComplaintTable Type='ByMe' clientComplaint={ComplaintList} />
            )}
        </>
    );
};

export default ViewConsultantComplaintPage;
