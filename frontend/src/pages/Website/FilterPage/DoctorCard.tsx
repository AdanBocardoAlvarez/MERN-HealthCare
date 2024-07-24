import { useState } from 'react';
import anonymousImg from './../../../assets/img/anonymous-400.png';
import './Filter.css';
import Button from 'antd/lib/button';
import BookingCard from './BookingCard';
import { useNavigate } from 'react-router-dom';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

const DoctorCard = (props) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { given_name, title, _id, ProfileAndKeyword, EducationDetails, BasicDetails } = props;

    const [showTiming, setShowTiming] = useState(false);

    return (
        <section>
            <div className="card rounded-7 card-shadow">
                <div className="card-body ">
                    <div className="row">
                        <div className="col-lg-3 h-100 d-flex flex-column align-items-center justify-content-between" style={{ minHeight: 180 }}>
                            <Image
                                src={`${process.env.REACT_APP_API_BASE_URL}${ProfileAndKeyword?.profile_img}`}
                                alt={given_name}
                                fallback={anonymousImg}
                                className='rounded-circle border'
                                style={{ width: 120, height: 120, objectFit: 'contain', aspectRatio: 1 }}
                            />
                            <div className='w-100'>
                                <h2 className='text-start h5 text-md-center mt-0 mb-1 py-0'>{`${title} ${given_name}`}</h2>
                                <p className="text-center mt-0 mb-1 py-0 text-muted">{BasicDetails?.profession}</p>
                                {/* <p className='text-start text-md-center mt-0 mb-1 py-0 text-muted'> € {consultantFees}/ Session</p> */}
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-lg-5 h-100 d-flex flex-column align-items-center justify-content-between" style={{ minHeight: 125 }}>
                                    <div className='w-100'>
                                        <p className='py-0 mt-0 mb-2'><b>{t('expert-in')} : </b> {EducationDetails?.SpecializationName?.join(', ')} </p>
                                        <p className='py-0 mt-0 mb-2'><b>{t('language')} : </b> {BasicDetails?.CorrespondenceLanguage} </p>
                                        <p className='py-0 mt-0 mb-2'><b>{t('experience')} : </b> {BasicDetails?.year_of_experience ? BasicDetails?.year_of_experience : 0} Years</p>
                                    </div>
                                </div>
                                <div className="col-lg-7 pe-4">
                                    <p className="mb-0"><b>{t('expertise')} : </b> {ProfileAndKeyword?.KeywordsName?.join(', ')}</p>
                                </div>
                                <div className="col-12">
                                    <div className='d-flex justify-content-between'>
                                        <Button className='px-5' ghost type="primary" onClick={() => navigate(`/our-experts/details/${_id}`)}>
                                            {t('view-profile')}
                                        </Button>
                                        <button className='btn px-5 btn-grad' onClick={() => setShowTiming(!showTiming)}>{t('book')}</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>{showTiming && <BookingCard {...props} />}</div>
                </div>
            </div>
        </section>
    );
};

export default DoctorCard;
