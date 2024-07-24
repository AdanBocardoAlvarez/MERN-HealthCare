import { ArrowLeftOutlined } from '@ant-design/icons';
import { Card, Image } from 'antd';
import { Link } from 'react-router-dom';
import ConsultantMyprofileData from './ConsultantMyprofileData';
import { useMyProfileConsultant } from '../../../../hooks/Consultant/useMyProfileConsultant';
import { CalculateAge } from '../../../../utils/dob';
import { Doctor } from '../../../../assets/img';
import { useTranslation } from 'react-i18next';

type Props = {};

const ConsultantSingleProfilePage = (props: Props) => {

    const { t } = useTranslation();
    const [MyProfile] = useMyProfileConsultant(`my-profile`);

    return (
        <>
            <section>
                <Link className='d-flex align-items-center paragraph-text gap-2' to='/consultant/dashboard'>
                    <ArrowLeftOutlined style={{ fontSize: '150%' }} />
                    <span className='text-md'>{t('dashboard')}</span>
                </Link>
                <Card className='mt-5 shadow_consultant'>
                    <div className='row'>
                        <div className='col-md-8 col-12'>
                            <div className='row'>
                                <div className='col-md-4 col-12'>
                                    <Image
                                        src={`${process.env.REACT_APP_API_BASE_URL}${MyProfile[0]?.ProfileAndKeyword[0]?.profile_img}`}
                                        className='rounded-full'
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                        alt='Consultant Profile Picture'
                                        fallback={Doctor}
                                    />
                                </div>
                                <div className='col-md-8 col-12'>
                                    <div className='paragraph-text d-flex justify-content-between align-items-center '>
                                        <div className='h2'>{MyProfile[0]?.given_name}</div>
                                        {MyProfile[0]?.Fees?.length > 0 && <div className='h4'>
                                            €{MyProfile[0]?.Fees}/<span className='paragraph-text'>{t('session')}</span>
                                        </div>}
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: MyProfile[0]?.ProfileAndKeyword?.[0]?.bio }}></div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 col-12' style={{ fontSize: '16px' }}>
                            <div className='row align-items-center mb-3'>
                                <div className='col-4 col-auto font-weight-bold'>{t('age')}</div>
                                <div className='col-8 col-auto paragraph-text'>
                                    <div>{CalculateAge(MyProfile[0]?.DOB)} {t('years')}</div>
                                </div>
                            </div>
                            <div className='row align-items-center mb-3'>
                                <div className='col-4 col-auto font-weight-bold'>{t('experience')}</div>
                                <div className='col-8 col-auto paragraph-text'>
                                    <div>
                                        {MyProfile[0]?.BasicDetails[0]?.year_of_experience ? MyProfile[0]?.BasicDetails[0]?.year_of_experience : 0}{' '} {t('years')}
                                    </div>
                                </div>
                            </div>
                            <div className='row align-items-center'>
                                <div className='col-4 col-auto font-weight-bold'>{t('location')}</div>
                                <div className='col-8 col-auto paragraph-text'>
                                    <div>
                                        {MyProfile[0]?.AddressDetails[0]?.CountryOfResidence[0]?.name},{' '} {MyProfile[0]?.AddressDetails[0]?.City[0]?.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                <ConsultantMyprofileData ConsultantProfile={MyProfile} />
            </section>
        </>
    );
};

export default ConsultantSingleProfilePage;
