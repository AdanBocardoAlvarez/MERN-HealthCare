import Header from '../../../layout/website/Header/Header';
import Footer from '../../../layout/website/Footer/Footer';
import About2 from '../../../assets/img/about/about2.jpg'
import About3 from '../../../assets/img/about/about3.png'
import { useTranslation } from 'react-i18next';

const AboutPage = () => {

    const { t } = useTranslation();

    return (
        <>
            <Header />
            <div className='py-4 about-1'>
                <h1 className='text-center py-0 my-2 text-dark fs-1' dangerouslySetInnerHTML={{ __html: t(`about-us.vhealthy-special`) }}></h1>
                <p className='text-center py-0 my-2 text-color-200 fs-5 letter-spacing-1'>{t('about-us.comprehensive-guide')}</p>
            </div>
            <section className='my-2'>
                <div className='row no-gutters'>
                    <div className='col-md-6 boxHeight aside p-md-5 p-2' style={{ backgroundColor: '#A6B3EF' }} >
                        <h2 className='text-white text-center h3'>{t('about-us.welcome-to')} {t('vhealthy')}</h2>
                        <p className='text-white mx-3 text-justify'>{t('about-us.paragraph-1')}</p>
                    </div>
                    <div className='col-md-6 boxHeight'>
                        <img src={About3} alt='' className='img-fluid' />
                    </div>
                    <div className='col-md-3 aside bg-dark boxHeight'>
                        <h2 className='text-white display-4 text-center'>{t('header.about-us')}</h2>
                    </div>
                    <div className='col-md-6 boxHeight px-md-5'>
                        <p className='p-5 text-justify'>{t('about-us.paragraph-2')}</p>
                    </div>
                    <div className='col-md-3 boxHeight d-none d-md-block' style={{ backgroundColor: '#caf0ef' }}></div>
                    <div className='col-md-6 boxHeight'>
                        <img src={About2} alt='' className='object-fit-cover' />
                    </div>
                    <div className='col-md-6 boxHeight p-5' style={{ backgroundColor: '#BF81C4' }}>
                        <p className='text-white text-justify'>{t('about-us.paragraph-3')}</p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default AboutPage;
