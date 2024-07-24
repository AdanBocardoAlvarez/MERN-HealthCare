import { Link } from 'react-router-dom';
import ClientComplaintTable from './ClientComplaintTable';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useGetComplaintClientList } from '../../../../hooks/Client/UseClient';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../../components/PageHeader';

const ViewClientComplaintAgainstPage = () => {

    const { t } = useTranslation();
    const [ComplaintList] = useGetComplaintClientList('get-complaint-against-me');

    return (
        <>
            <PageHeader title={t('cnt.view-complaint-against-me')} />
            <div className='mb-3'>
                <Link className='d-flex align-items-center paragraph-text gap-2' to='/client/dashboard'>
                    <ArrowLeftOutlined style={{ fontSize: '100%' }} />
                    <span className='text-md'>{t('dashboard')}</span>
                </Link>
            </div>
            <ClientComplaintTable Type='AgainstMe' clientComplaint={ComplaintList} />
        </>
    );
};

export default ViewClientComplaintAgainstPage;
