import { Link } from 'react-router-dom';
import ClientComplaintTable from './ClientComplaintTable';
import { PlusSquareOutlined } from '@ant-design/icons';
import { useGetComplaintClientList } from '../../../../hooks/Client/UseClient';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../../components/PageHeader';

const ViewClientComplaintPage = () => {

    const { t } = useTranslation();
    const [ComplaintList] = useGetComplaintClientList('get-complaint-raised-by-me');

    return (
        <>
            <PageHeader title={t('cnt.view-complaint-by-me')} />
            <div className='d-flex justify-content-end mb-3'>
                <Link className='d-flex align-items-center paragraph-text gap-2' to='/client/add-complaint'>
                    <PlusSquareOutlined style={{ fontSize: '100%' }} />
                    <span className='text-md'>{t('add-complaint')}</span>
                </Link>
            </div>
            <ClientComplaintTable Type='ByMe' clientComplaint={ComplaintList} />
        </>
    );
};

export default ViewClientComplaintPage;
