// import { useEffect, useState } from 'react';
// import { Button } from 'antd';
// import { Link } from 'react-router-dom';
// import { ClientApi } from '../../../api/api';
// import { IDigitalProduct } from '../../../interfaces/Admin/digitalProduct';
// import { AppState } from '../../../redux/store';
// import { useSelector } from 'react-redux';
import Footer from '../../../layout/website/Footer/Footer';
import Header from '../../../layout/website/Header/Header';
import { digitalProductHeader } from '../../../assets/img';
import outImage1 from '../../../assets/img/out-image-1.png';
import outImage2 from '../../../assets/img/out-image-2.png';
import outImage3 from '../../../assets/img/out-image-3.png';
import HurbsCarousel from './HurbsCarousel';
import { useTranslation } from 'react-i18next';

const LifestyleProducts = () => {

    const { t } = useTranslation();
    // const [state, setState] = useState<IDigitalProduct[]>([]);
    // const token = useSelector((state: AppState) => state.client.Token);
    // useEffect(() => {
    //     ClientApi.getLifestyleList('get-digital-product', token)
    //         .then((res) => setState(res))
    //         .catch((err) => {
    //             const message = err?.response?.data?.message || err.message;
    //             openNotificationWithIcon({ type: 'error', message: message });
    //         });
    // }, []);

    return (
        <>
            <Header />
            <div className='py-5'>
                <h1 className='h2 text-center py-0 my-2 text-dark'>{t('lifestyle-product.elevate-wellness-naturally')}</h1>
                <p className='text-center py-0 my-2 text-color-200 fs-5 letter-spacing-1'>{t('lifestyle-product.sub-heading')}</p>
            </div>
            <div className='mb-5'>
                <img src={digitalProductHeader} alt='' className='w-100 mb-2' style={{ height: '500px', objectFit: 'cover' }} />
            </div>
            <div className='container'>
                <div className='text-justify' style={{ fontSize: '18px' }}>
                    <p className='text-dark'>{t('lifestyle-product.para-1')}</p>
                    <div className='col-12 text-center my-5'>
                        <div className='h2 m-0 text-dark'>{t('lifestyle-product.zoom-on')}</div>
                        <div className="text-center">
                            <div className='line-with-words mx-auto' style={{ maxWidth: 180 }}>{t('footer-keys.ayurveda')}</div>
                        </div>
                    </div>
                    <p className='text-dark'>{t('lifestyle-product.para-2')}</p>
                    <p className='text-dark'>{t('lifestyle-product.para-3')}</p>
                </div>

                <div className="row">
                    <div className='col-12 text-center my-5'>
                        <div className='h2 m-0 text-dark'>{t('lifestyle-product.single-herbs')}</div>
                        <div className="text-center">
                            <div className='line-with-words mx-auto' style={{ maxWidth: 250 }}>{t('lifestyle-product.herbs')}</div>
                        </div>
                    </div>
                    <div className="col-12">
                        <HurbsCarousel />
                    </div>
                    <div className='col-12 text-center my-5'>
                        <div className='h2 m-0 text-dark'>{t('lifestyle-product.compilations')}</div>
                        <div className="text-center">
                            <div className='line-with-words mx-auto' style={{ maxWidth: 250 }}>{t('lifestyle-product.herbs')}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-7 order-0 order-lg-0 my-3">
                                <img src={outImage1} alt="" className='w-100' />
                            </div>
                            <div className="col-lg-5 order-1 order-lg-1 my-3">
                                <div className='d-flex flex-column justify-content-center align-items-center h-100'>
                                    <h3 className="text-dark mb-1">Triphala Churna</h3>
                                    <h3 className="h5 text-dark mb-2">(Herbal blend)</h3>
                                    <ul className='life-style-list'>
                                        <li>{t('lifestyle-product.benefits.general-tonic')}</li>
                                        <li>{t('lifestyle-product.benefits.digestive-health')}</li>
                                        <li>{t('lifestyle-product.benefits.detoxification')}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-5 order-3 order-lg-2 my-3">
                                <div className='d-flex flex-column justify-content-center align-items-center h-100'>
                                    <h3 className='text-dark mb-3'>Trikatu Churna</h3>
                                    <ul className='life-style-list'>
                                        <li>{t('lifestyle-product.benefits.respiratory-health')}</li>
                                        <li>{t('lifestyle-product.benefits.digestive-health')}</li>
                                        <li>{t('lifestyle-product.benefits.anti-inflammatory')}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-7 order-2 order-lg-3 my-3">
                                <img src={outImage2} alt="" className='w-100' />
                            </div>
                            <div className="col-lg-7 order-4 order-lg-4 my-3">
                                <img src={outImage3} alt="" className='w-100' />
                            </div>
                            <div className="col-lg-5 order-5 order-lg-5 my-3">
                                <div className='d-flex flex-column justify-content-center align-items-center h-100'>
                                    <h3 className='text-dark mb-3'> Chyawanprash</h3>
                                    <ul className='life-style-list'>
                                        <li>{t('lifestyle-product.benefits.support-immune-function')}</li>
                                        <li>{t('lifestyle-product.benefits.enhance-digestion')}</li>
                                        <li>{t('lifestyle-product.benefits.promote-uitality')}</li>
                                        <li>{t('lifestyle-product.benefits.rejuvenating-tonic')}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 order-6 order-lg-6">
                        <h3 className='h5 text-center text-dark mb-2'>{t('lifestyle-product.go-through-this-link')}</h3>
                        <p className='text-center text-primary fw-bold'>
                            <a className='d-inline-block h5' style={{ maxWidth: 350 }} target='_blank' rel="noopener noreferrer" href={`${process.env.PUBLIC_URL}/documents/Catalog Ayurveda.pdf`}>
                                {t('lifestyle-product.view-ayurveda-catalog')}
                            </a>
                        </p>
                    </div>
                </div>

                {/* <div className='row g-2 justify-content-center digital__Container'>
                    {state.map((item, id) => <figure key={id} className='snip1527 hover'>
                        <div className='image'>
                            <img
                                src={`${process.env.REACT_APP_API_BASE_URL}${item.image}`}
                                className='w-100' style={{ height: '300px', objectFit: 'cover' }} alt=''
                            />
                        </div>
                        <figcaption>
                            <div className='date'> <span className='day'>{item?.date?.slice(0, 10)}</span></div>
                            <div>{item?.title}</div>
                            <Link target='_blank' to={`${process.env.REACT_APP_API_BASE_URL}${item.pdf}`} rel='noreferrer nofollow'>
                                <Button shape='round' style={{ backgroundColor: 'white', color: 'black' }} >
                                    Read More...
                                </Button>
                            </Link>
                        </figcaption>
                    </figure>)}
                </div> */}
            </div>
            <Footer />
        </>
    );
};

export default LifestyleProducts;
