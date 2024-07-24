import { Timeline } from 'antd';
import { UserOutlined, SafetyCertificateTwoTone, HomeOutlined, ReadOutlined, BankOutlined, FileProtectOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { t } from 'i18next';
import PageHeader from '../components/PageHeader';

const EditAccountPage = () => {

    return (
        <>
            <PageHeader title={t('cons.edit-account')} className='mb-3' />
            <div className='stack'>
                <Timeline
                    items={[
                        {
                            dot: <div className='timeline-head bg-color-indigo'><UserOutlined className='text-contrast-500' /></div>,
                            children: <NavLink to={'basic-profile'}> <span style={{ color: 'gray ' }} className='text-md'> {t('auth.basic-profile-details')}</span></NavLink>
                        },
                        {
                            dot: <div className='timeline-head bg-color-pink'><HomeOutlined className='text-contrast-500' /></div>,
                            children: <NavLink to={'address-detail'}> <span style={{ color: 'gray ' }} className='text-md'> {t('auth.address-details')}</span></NavLink>
                        },
                        {
                            dot: <div className='timeline-head bg-color-green'><ReadOutlined className='text-contrast-500' /></div>,
                            children: <NavLink to={'education-detail'}> <span style={{ color: 'gray ' }} className='text-md'> {t('auth.education-details')}</span></NavLink>
                        },
                        {
                            dot: <div className='timeline-head bg-color-green'><SafetyCertificateTwoTone className='text-contrast-500' /></div>,
                            children: <NavLink to={'certificate-detail'}> <span style={{ color: 'gray ' }} className='text-md'> {t('auth.certificate-details')}</span></NavLink>
                        },
                        {
                            dot: <div className='timeline-head bg-color-blue'><BankOutlined className='text-contrast-500' /></div>,
                            children: <NavLink to={'bank-detail'}> <span style={{ color: 'gray ' }} className='text-md'> {t('auth.bank-details')}</span></NavLink>
                        },
                        {
                            dot: <div className='timeline-head bg-color-orange'><UserOutlined className='text-contrast-500' /></div>,
                            children: <NavLink to={'profile-detail'}> <span style={{ color: 'gray ' }} className='text-md'> {t('auth.profile-details')}</span></NavLink>
                        },
                        {
                            dot: <div className='timeline-head bg-danger'><FileProtectOutlined className='text-contrast-500' /></div>,
                            children: <NavLink to={'document'}> <span style={{ color: 'gray ' }} className='text-md'> {t('auth.document')}</span></NavLink>
                        }
                    ]}
                    className='ml-4'
                />
            </div>
        </>
    );
};

export default EditAccountPage;
