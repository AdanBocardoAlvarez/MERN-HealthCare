import { Carousel } from 'antd';
import { CourselList, PractitionerList, TestimonialList } from '../../../utils/main-page-utils';
import CarouselItem from '../../components/CarouselItem';
import './../../../assets/css/MainPage.css';
import './../../../assets/css/media-query.css';
import Practitioner from '../../components/Practitioner';
import Pricing from '../../components/Pricing';
import Testimonial from '../../components/Testimonial';
import Footer from '../../../layout/website/Footer/Footer';
import Header from '../../../layout/website/Header/Header';
import { Client, Consultant } from '../../../assets/img';
import 'animate.css/animate.css'
import Scroller from '../../components/Scroller';
import Search from './Search';
import { useTranslation } from 'react-i18next';

const MainPage = () => {

    const { t, i18n: { language } } = useTranslation();
    return (
        <>
            <Header />
            <div className='container banner-home'>
                <div className="row">
                    <div className="col-12">
                        <div className='py-4'>
                            <h1 className='text-center py-0 my-0 gradent-text fs-3'>
                                {t('global-experts-in-traditional')}
                            </h1>
                            <h2 className='font-family-poppins text-center py-0 mt-3 text-color-600 fs-5 letter-spacing-1 fw-normal'>{t('discover-healthier-you')}</h2>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row justify-content-center align-items-center">
                            <div className="col col-lg-6">
                                <Scroller />
                                <Search />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-5'>
                <Carousel autoplay>
                    {CourselList[language].map((data, i) => <CarouselItem key={i} id={data.id} Content={data.Content} subContent={data.subContent} HeadingText={data.HeadingText} TopText={data.TopText} link={data.link} list={data.list} ImageList={data.ImageList} />)}
                </Carousel>
            </div>
            <section className='mt-5'>
                <h2 className='card-head text-center' style={{ fontSize: '2rem;' }}>{t('our-practitioner')}</h2>
                <div className='container'>
                    <div className='practitioner__list'>
                        {PractitionerList[language].map(({ title, text, image, heading }, i) => (
                            <div key={i} className='card-class'>
                                <Practitioner title={title} text={text} image={image} heading={heading} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className='bg-dark bg-dark-1'>
                <div className='heading-title text-center'>
                    <h2>{t('join-us')}</h2>
                    <p>{t('start-my-wellbeing')}</p>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <Pricing image={Consultant}
                                content={t('join-us-block.consultant.content')}
                                link='/public/sign-up'
                                btnTitle={t('join-us-block.consultant.btnTitle')} />
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <Pricing image={Client}
                                content={t('join-us-block.client.content')}
                                link='/public/client/sign-in'
                                btnTitle={t('join-us-block.client.btnTitle')} />
                        </div>
                    </div>
                </div>
            </section>
            <section className='mt-5'>
                <div className='heading-title text-center'>
                    <div className='text-dark pt-0 pb-3 heading-title_h2'>{t('testimonials')}</div>
                </div>
                <Carousel autoplay>
                    {TestimonialList.map((data, i) => <Testimonial key={i} {...data} />)}
                </Carousel>
            </section>
            <Footer />
        </>
    );
};

export default MainPage;
