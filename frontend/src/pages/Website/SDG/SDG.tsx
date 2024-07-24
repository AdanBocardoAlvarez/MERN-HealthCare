import Header from '../../../layout/website/Header/Header';
import { SDGFirstEn, SDGFirstFr, SDGSixEn, SDGFiveFr, SDGFourFr, SDGSecondFr, SDGSixFr, SDGThirdFr, SDGFiveEn, SDGFourEn, SDGThirdEn, SDGSecond, SDGFirst, SDGSecondEn } from '../../../assets/img/index';
import Footer from '../../../layout/website/Footer/Footer';
import { useTranslation } from 'react-i18next';

const images = {
    en: [SDGFirstEn, SDGSecondEn, SDGThirdEn, SDGFourEn, SDGFiveEn, SDGSixEn],
    fr: [SDGFirstFr, SDGSecondFr, SDGThirdFr, SDGFourFr, SDGFiveFr, SDGSixFr]
}

const SDG = () => {
    const { t, i18n } = useTranslation();

    return (
        <>
            <Header />
            <div className='py-4'>
                <h1 className='h2 text-center  py-0 my-2 gradent-text'>{t('vhealthy')}'s</h1>
                <h2 className='h3 text-center py-0 my-1 text-dark'>{t('sdg-media.sub-title')}</h2>
                <p className='text-center py-0 my-1 text-color-200 fs-5 letter-spacing-1'>{t('sdg-media.sub-title-2')}</p>
            </div>
            <div className='my-5 container'>
                <div className='row no-gutters'>
                    <div className='col-12 mb-5 ml-5'>
                        <div className='h2 m-0'>{t('sdg-media.title')}</div>
                        <div className='line-with-words' style={{ maxWidth: 250 }}>{t('alternative-medicine.mental-health')}</div>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <img alt='SDG & Media' src={SDGFirst} className='w-75' />
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <div className='d-flex flex-column gap-5 text-justify'>
                            <div>{t('sdg-media.para-1')}</div>
                            <div>{t('sdg-media.para-2')}</div>
                            <div>{t('sdg-media.para-3')}</div>
                        </div>
                    </div>
                    <div className='col-12 text-center my-5'>
                        <div className='h4 m-0'>{t('sdg-media.the-sustainable-development-goals')}</div>
                        <div className="text-center">
                            <div className='line-with-words line-with-words-2 mx-auto' style={{ maxWidth: 400 }}>SDGs</div>
                        </div>
                    </div>
                    <div className='col-12 text-center my-3'>
                        <p>{t('sdg-media.para-4')}</p>
                    </div>
                    <div className='d-flex flex-wrap justify-content-center gap-2'>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <img className='rounded-3' src={images[i18n.language][0]} alt='Good Health and Well Being' />
                            <span>SDG 3</span>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <img className='rounded-3' src={images[i18n.language][1]} alt='Gender Equality' />
                            <span>SDG 5</span>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <img className='rounded-3' src={images[i18n.language][2]} alt='Decent Work Economic Growth' />
                            <span>SDG 8</span>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <img className='rounded-3' src={images[i18n.language][3]} alt='Industry Innovations and Infrastructure' />
                            <span>SDG 9</span>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <img className='rounded-3' src={images[i18n.language][4]} alt='Reduced Inequality ' />
                            <span>SDG 10</span>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <img className='rounded-3' src={images[i18n.language][5]} alt='Peace Justice and Strong Institutions' />
                            <span>SDG 16</span>
                        </div>
                    </div>
                    <div className='col-12 text-center my-3 px-md-5'>
                        <p className='px-5'>{t('sdg-media.para-5')}</p>
                    </div>
                    <div className='col-12 text-center my-5'>
                        <div className='h4 m-0'>{t('vhealthy')}</div>
                        <div className="text-center">
                            <div className='line-with-words line-with-words-3 mx-auto' style={{ maxWidth: 180 }}>{t('alternative-medicine.mental-health')}</div>
                        </div>
                    </div>
                    <div className='col-md-5 col-sm-12 mx-md-5'>
                        <div className='d-flex flex-column gap-5 text-justify'>
                            <div>{t('sdg-media.para-6')}</div>
                            <div>{t('sdg-media.para-7')}</div>
                            <div>{t('sdg-media.para-8')}</div>
                        </div>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <img alt='SDG & Media' src={SDGSecond} className='w-75' />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SDG;
