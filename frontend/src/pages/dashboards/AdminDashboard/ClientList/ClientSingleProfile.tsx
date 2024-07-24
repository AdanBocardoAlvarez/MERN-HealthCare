import { IPageData } from '../../../../interfaces/page';
import { usePageData } from '../../../../hooks/usePage';
import { useParams } from 'react-router-dom';
import { useClientSingleGetApi } from '../../../../hooks/Admin/useAdminConsultantProfile';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { CalculateAge } from '../../../../utils/dob';
import { AdminApi } from '../../../../api/api';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { useState } from 'react';
import { Modal } from 'antd';
import { openNotificationWithIcon } from '../../../components/Toast';
import type { MenuProps } from 'antd';
import ClientSingleTable from './ClientSingleTable';

const pageData: IPageData = {
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Admin-Dashboard',
            route: 'dashboard'
        },
        {
            title: 'Client',
            route: 'Client'
        },
        {
            title: 'Client Profile'
        }
    ]
};

const ClientSingleProfile = () => {
    const token = useSelector((state: AppState) => state.admin.Token);
    usePageData(pageData);
    const { id } = useParams();
    const [visibleConfirmVerify, setVisibleConfirmVerify] = useState<boolean>(false);

    const { state, refreshData } = useClientSingleGetApi(`client/get-client-single-record?userId=${id}`);

    const verifyConsultant = (id: string, status) => {
        const formData = new URLSearchParams();
        status = 1 - status;
        formData.append('id', id);
        formData.append('verified_status', status);
        AdminApi.createPost(formData, 'client/verify', token).then((datas) => {
            const message = datas.message;
            const status = datas.message;
            refreshData();
            setVisibleConfirmVerify(false);
            if (status) {
                openNotificationWithIcon({ type: 'success', message });
            } else {
                openNotificationWithIcon({ type: 'error', message: message });
            }
        });
    };
    const ActiveConsultant = (id, status) => {
        const formData = new URLSearchParams();
        formData.append('id', id);
        formData.append('active_status', status);
        AdminApi.createPost(formData, 'client/status', token).then((datas) => {
            const message = datas.message;
            const status = datas.message;
            refreshData();
            if (status) {
                openNotificationWithIcon({ type: 'success', message });
            } else {
                openNotificationWithIcon({ type: 'error', message: message });
            }
        });
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <div onClick={() => ActiveConsultant(id, 1)}>Active</div>
        },
        {
            key: '2',
            label: <div onClick={() => ActiveConsultant(id, 0)}>Deactive</div>
        },
        {
            key: '3',
            label: <div onClick={() => ActiveConsultant(id, 2)}>Suspend</div>
        }
    ];

    return (
        <section>
            <Link style={{ gap: '10px', color: '#626364' }} className='d-flex align-items-center paragraph-text' to='/admin/client'>
                <ArrowLeftOutlined style={{ fontSize: '150%' }} />
                <span className='text-md'>Back to Search Result</span>
            </Link>
            <Card className='mt-5 shadow_consultant'>
                <div className='row'>
                    <div className='col-md-8 col-12'>
                        <div className='row'>
                            <div className='col-md-4 col-12'>
                                <Avatar
                                    src={`${process.env.REACT_APP_API_BASE_URL}${state?.BasicDetails?.profile_image}`}
                                    size={180}
                                    alt='Profile'
                                />
                            </div>
                            <div className='col-md-8 col-12'>
                                <div className='paragraph-text d-flex justify-content-between align-items-center '>
                                    <div className='h2 my-2 ms-2'>{state?.given_name}</div>
                                </div>

                                <p className='paragraph-text ms-2' style={{ fontSize: '16px' }}>
                                    Age : {CalculateAge(state?.DOB)}
                                </p>
                                <div className='d-flex gap-2'>
                                    <Button shape='round' className={`${state?.verified_status === 0 ? 'bg-danger' : 'bg-success'} mx-2 `} onClick={() => setVisibleConfirmVerify(true)} >
                                        {state?.verified_status === 0 ? 'Verify' : 'Verified'}
                                    </Button>

                                    {state?.health_assessment && <a className='ant-btn css-dev-only-do-not-override-1pem0an ant-btn-round ant-btn-default bg-primary' href={`${process.env.REACT_APP_API_BASE_URL}${state?.health_assessment}`} target="_blank" rel="noopener noreferrer">Health Assessment</a>}
                                    {state?.consent_form && <a className='ant-btn css-dev-only-do-not-override-1pem0an ant-btn-round ant-btn-default bg-primary' href={`${process.env.REACT_APP_API_BASE_URL}${state?.consent_form}`} target="_blank" rel="noopener noreferrer">Consent Form</a>}

                                    <Dropdown menu={{ items }} placement='bottomLeft' className={`${state?.active_status === 2 ? 'bg-danger' : (state?.active_status === 1 ? 'bg-success' : 'bg-danger')} mx-2`}>
                                        <Button aria-label='Status Active Deactive Suspend Changed' shape='round'>
                                            {state?.active_status === 0 ? 'Deactive' : state?.active_status === 1 ? 'Active' : 'Suspend'}
                                        </Button>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <ClientSingleTable BasicInfo={state} />
            <Modal open={visibleConfirmVerify} footer={null} onCancel={() => setVisibleConfirmVerify(false)} className='d-flex' title={<h4 className='title text-center'>Do you want to Verify?</h4>}>
                <div className='text-center w-100'>
                    <br />
                    <Button aria-label='Confirm' shape='round' type='primary' onClick={() => verifyConsultant(id, state?.verified_status)}> Confirm </Button>
                    <Button aria-label='Cancel' shape='round' type='primary' onClick={() => setVisibleConfirmVerify(false)} danger> Cancel </Button>
                </div>
            </Modal>
        </section>
    );
};

export default ClientSingleProfile;
