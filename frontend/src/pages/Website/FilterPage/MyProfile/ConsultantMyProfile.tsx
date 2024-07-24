import { IPageData } from '../../../../interfaces/page';
import { usePageData } from '../../../../hooks/usePage';
import { useParams } from 'react-router-dom';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Card, Image, Modal } from 'antd';
import { Link } from 'react-router-dom';
import Header from '../../../../layout/website/Header/Header';
import Footer from '../../../../layout/website/Footer/Footer';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Doctor } from '../../../../assets/img';
import { IConsultantProfile } from '../../../../interfaces/Consultant/consultantprofile';
import { ClientApi } from '../../../../api/api';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
type Props = {};

const pageData: IPageData = {
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Admin-Dashboard',
            route: 'dashboard'
        },
        {
            title: 'Consultant',
            route: 'consultant'
        },
        {
            title: 'Consultant Profile'
        }
    ]
};

const ConsultantSingleProfilePage = (props: Props) => {

    const { id } = useParams();
    const { t } = useTranslation();
    usePageData(pageData);

    const [MyProfile, setMyProfile] = useState<IConsultantProfile>(undefined);
    const token = useSelector((state: AppState) => state.consultant.Token);
    useEffect(() => {
        ClientApi.getMyProfileConsultantSingle(`get-single-consultant-record?userId=${id}`, token)
            .then((res) => {
                setMyProfile(res);
            })
            .catch((err) => {
                openNotificationWithIcon({ type: 'error', message: err.response?.data?.message || err.message });
                setMyProfile(null);
            });
    }, [token, id]);

    const video = MyProfile?.ProfileAndKeyword?.[0]?.intro_vedio;
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (MyProfile) {
        return (
            <>
                <Header />
                <section className='container mt-5'>
                    <Link style={{ gap: '10px', color: '#626364' }} className='d-flex align-items-center paragraph-text my-3' to='/our-experts'>
                        <ArrowLeftOutlined style={{ fontSize: '150%' }} />
                        <span className='text-md'>{t('go-back')}</span>
                    </Link>
                    <Card className='shadow_consultant'>
                        <div className='row'>
                            <div className='col-md-8 col-12'>
                                <div className='row'>
                                    <div className='col-md-4 col-12'>
                                        <Image
                                            src={`${process.env.REACT_APP_API_BASE_URL}${MyProfile?.ProfileAndKeyword?.[0]?.profile_img}`}
                                            className='rounded-full'
                                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                            alt='Consultant Profile Picture'
                                            fallback={Doctor}
                                        />
                                    </div>
                                    <div className='col-md-8 col-12'>
                                        <div className='paragraph-text d-flex justify-content-between align-items-start '>
                                            <div className='h3 m-0'>{MyProfile?.given_name}</div>
                                            <div className='h5 m-0'>
                                            </div>
                                        </div>
                                        <div className='paragraph-text' dangerouslySetInnerHTML={{ __html: MyProfile?.ProfileAndKeyword[0]?.bio }} ></div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4 col-12' style={{ fontSize: '16px' }}>
                                <div className='row align-items-center mb-3'>
                                    <div className='col-6 col-auto font-weight-bold'>{t('language-spoken')}</div>
                                    <div className='col-6 col-auto paragraph-text'>
                                        {MyProfile?.SpokenLanguageName[0]?.spokenLanguageName[0]?.name}
                                    </div>
                                </div>
                                <div className='row align-items-center mb-3'>
                                    <div className='col-6 col-auto font-weight-bold'>{t('experience')}</div>
                                    <div className='col-6 col-auto paragraph-text'>
                                        <div>
                                            {MyProfile?.BasicDetails[0]?.year_of_experience
                                                ? MyProfile?.BasicDetails[0]?.year_of_experience
                                                : 0} {` `}
                                            Years
                                        </div>
                                    </div>
                                </div>
                                <div className='row align-items-center'>
                                    <div className='col-6 col-auto font-weight-bold'>{t('location')}</div>
                                    <div className='col-6 col-auto paragraph-text'>
                                        <div>
                                            {MyProfile?.AddressDetails[0]?.CountryOfResidence
                                                ? MyProfile?.AddressDetails[0]?.CountryOfResidence[0]?.name +
                                                ',' +
                                                MyProfile?.AddressDetails[0]?.City[0]?.name
                                                : 'Not Mentioned'}
                                        </div>
                                    </div>
                                </div>
                                {video && <div className='row align-items-center my-3'>
                                    <button className='btn btn-primary' onClick={() => setIsModalOpen(true)}>
                                        {t('check-intro-video')}
                                    </button>
                                </div>}
                            </div>
                        </div>
                    </Card>

                    <div className="ant-card ant-card-bordered shadow_consultant text-dark">
                        <div className="ant-card-head">
                            <div className="ant-card-head-wrapper pb-3">
                                <div className="row align-items-center">
                                    <div className="col-lg-5">
                                        <div className="ant-card-head-title">{t('profession')}</div>
                                    </div>
                                    <div className="col-lg-5">
                                        <p className='my-0 py-0 paragraph-text'>{MyProfile?.BasicDetails?.[0]?.profession}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Card title={t('background-experience')} aria-label={t('background-experience')} className='mt-5 shadow_consultant'>
                        <section dangerouslySetInnerHTML={{ __html: MyProfile?.ProfileAndKeyword[0]?.professionalCounseling }} ></section>
                    </Card>


                    {/* <Card title={`${t('basic')} ${t('details')}`} aria-label={`${t('basic')} ${t('details')}`} className='mt-5 shadow_consultant'>
                        <section>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                            <div className='col col-auto font-weight-bold'>{t('nationality')}</div>
                                            <div className='col col-auto font-weight-bold'>{t('profession')}</div>
                                            <div className='col col-auto font-weight-bold'>{t('country-of-birth')}</div>

                                        </div>
                                        <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                            <div className='col col-auto paragraph-text'>
                                                {MyProfile?.BasicDetails[0]?.nationality[0]?.name}
                                            </div>
                                            <div className='col col-auto paragraph-text'>
                                                {MyProfile?.BasicDetails[0]?.profession}
                                            </div>
                                            <div className='col paragraph-text'>
                                                {MyProfile?.BasicDetails[0]?.countryOfBirth[0]?.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Card> */}

                    <Card
                        title={t('education')}
                        aria-label={t('education')}
                        className='mt-5 shadow_consultant'
                    >
                        <section>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                            <div className='col col-auto font-weight-bold'>{t('disorders')}</div>
                                            <div className='col col-auto font-weight-bold'>{t('specialisation')}</div>
                                        </div>
                                        <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>

                                            <div className='col col-auto paragraph-text'>
                                                {MyProfile?.EducationDetails[0]?.disorderName?.map(row => row?.name).join(', ')}
                                            </div>
                                            <div className='col col-auto paragraph-text'>
                                                {MyProfile?.EducationDetails[0]?.SpecializationName?.map(row => row?.name).join(', ')}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="table-responsive mt-3">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Degree Name</th>
                                                    <th scope="col">School Name</th>
                                                    <th scope="col">Year of Graduation</th>
                                                    <th scope="col">Country</th>
                                                    {/* <th scope="col">Attachment</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {MyProfile?.consultantDegrees?.map((row, i) => (
                                                    <tr>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{row?.degree_name}</td>
                                                        <td>{row?.school_name}</td>
                                                        <td>{row?.year_of_graduation}</td>
                                                        <td>{row?.country_name}</td>
                                                        {/* <td>
                                                            <a href={`${process.env.REACT_APP_API_BASE_URL}${row?.attachment}`} target="_blank" rel="noopener noreferrer">Download</a>
                                                        </td> */}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Card>

                    <div className="ant-card ant-card-bordered shadow_consultant text-dark">
                        <div className="ant-card-head">
                            <div className="ant-card-head-wrapper pb-3">
                                <div className="row align-items-center">
                                    <div className="col-lg-5">
                                        <div className="ant-card-head-title">{t('footer.objectives')}</div>
                                    </div>
                                    <div className="col-lg-5">
                                        <p className='my-0 py-0 paragraph-text'>
                                            {MyProfile?.ObjectiveUseByConsultant[0]?.join(', ')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ant-card ant-card-bordered shadow_consultant text-dark">
                        <div className="ant-card-head">
                            <div className="ant-card-head-wrapper pb-3">
                                <div className="row align-items-center">
                                    <div className="col-lg-5">
                                        <div className="ant-card-head-title">{t('price')}</div>
                                    </div>
                                    <div className="col-lg-5">
                                        <p className='my-0 py-0 paragraph-text'>€{MyProfile?.consultantFees?.[0]?.fees}/Session</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <Footer />

                <Modal width={1000} title="Intro Video" centered open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                    <iframe title='video' width="100%" height="350px" src={video}> </iframe>
                </Modal>
            </>
        );
    } else if (MyProfile === null) {
        return <>
            <Header />
            <h3 className='text-center text-danger py-5 mt-'>Consultant Not Found</h3>
            <Footer />
        </>
    } else {
        return <>
            <Header />
            <h3 className='text-center py-5 mt-'><LoadingOutlined /></h3>
            <Footer />
        </>
    }
};


export default ConsultantSingleProfilePage;
