import Header from '../../../layout/website/Header/Header';
import Footer from '../../../layout/website/Footer/Footer';
import { AlternativeFirst, AlternativeSecond, AlternativeThird, AlternativeFour, AlternativeFive, AlternativeSix, AlternativeSeven, AlternativeEight, AlternativeNine, AlternativeTen, AlternativeEleven, AlternativeTweleve, AlternativeThirteen, AlternativeFourteen, AlternativeFifteen } from '../../../assets/img/index';
import { useTranslation } from 'react-i18next';

const TraditionalMedicinePage = () => {
    const WHO = "https://www.who.int/data/gho/data/themes/theme-details/GHO/mental-health"
    const { t } = useTranslation();
    return (
        <>
            <Header />
            <section className='my-2 container'>
                <div className='row no-gutters'>
                    <div className='col-12'>
                        <h1 className='h2 m-0'>{t('alternative-medicine.traditional-medicine')}</h1>
                        <h2 className='line-with-words my-2'>{t('alternative-medicine.mental-health')}</h2>
                    </div>
                    <div className='row'>
                        <div className='col-lg-8 col-12 mt-5' style={{ textAlign: 'justify' }}>
                            <p>{t('alternative-medicine.para-1')}</p>
                            <p>{t('alternative-medicine.para-2')}</p>
                        </div>
                        <div className='col-lg-4 col-12 d-flex justify-content-end'>
                            <img src={AlternativeFirst} alt='' />
                        </div>
                    </div>
                    <div className='row mt-5'>
                        <div className='col-lg-4 col-12'>
                            <img src={AlternativeSecond} alt='' />
                        </div>
                        <div className='col-lg-8 col-12' style={{ textAlign: 'justify' }}>
                            <p dangerouslySetInnerHTML={{ __html: t('alternative-medicine.para-3', { WHO }) }}></p>
                            <p dangerouslySetInnerHTML={{ __html: t('alternative-medicine.para-4', { WHO }) }}></p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 h3 text-center mb-0'>{t('alternative-medicine.expert-practitioners')}</div>
                        <div className="text-center">
                            <span className='line-with-words mx-auto' style={{ maxWidth: 300, marginRight: 20 }}>{t('alternative-medicine.take-appointments')}</span>
                        </div>

                        <div className='col-12'>{t('alternative-medicine.para-5')}</div>
                        <div className='d-flex flex-wrap flex-lg-nowrap mt-5'>
                            <div className=' text-center font-weight-bold'>
                                <div className='d-flex flex-column justify-content-center align-items-center '>
                                    <img src={AlternativeThird} alt='' />
                                    <span>✽ {t('footer-keys.ayurveda')}</span>
                                </div>
                            </div>
                            <div className=' text-center font-weight-bold'>
                                <div className='d-flex flex-column justify-content-center align-items-center '>
                                    <img src={AlternativeFour} alt='' />
                                    <span>✽ {t('footer-keys.chinese-medicine')}</span>
                                </div>
                            </div>
                            <div className=' text-center font-weight-bold'>
                                <div className='d-flex flex-column justify-content-center align-items-center '>
                                    <img src={AlternativeFive} alt='' />
                                    <span>✽ {t('footer-keys.herbal-medicine')}</span>
                                </div>
                            </div>
                            <div className=' text-center font-weight-bold'>
                                <div className='d-flex flex-column justify-content-center align-items-center '>
                                    <img src={AlternativeFifteen} alt='' />
                                    <span>✽ {t('footer-keys.behavioral-therapy')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-5 mt-5'>
                        <div className='col-12'>
                            <div className='h3 m-0'>{t('alternative-medicine.understanding-the-nuances')}</div>
                            <span className='line-with-words' style={{ maxWidth: 355 }}>{t('alternative-medicine.terms-related-to-mental-health')}</span>

                        </div>

                        <div className='row justify-content-center mt-5'>
                            <div className='col-lg-3 text-center font-weight-bold'>
                                <img src={AlternativeSix} alt='' />
                                <span>{t('alternative-medicine.health-counseling')}</span>
                            </div>
                            <div className='col-lg-3 text-center font-weight-bold'>
                                <img src={AlternativeSeven} alt='' />
                                <span>{t('alternative-medicine.therapy')}</span>
                            </div>
                            <div className='col-lg-3 text-center font-weight-bold'>
                                <img src={AlternativeEight} alt='' />
                                <span>{t('alternative-medicine.psychotherapy')}</span>
                            </div>
                        </div>
                        <div className='col-12 '>
                            <p className='container-fluid text-center mt-5'>{t('alternative-medicine.para-6')}</p>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='h2 m-0'>{t('footer-keys.therapy')}</div>
                        <div className='line-with-words' style={{ maxWidth: 200 }}>
                            {t('alternative-medicine.mental-health')}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-8 col-12 mt-5' style={{ textAlign: 'justify' }}>
                            <p>{t('alternative-medicine.para-7')}</p>
                            <p>{t('alternative-medicine.para-8')}</p>
                        </div>
                        <div className='col-lg-4 col-12 d-flex justify-content-end  mt-5'>
                            <img src={AlternativeNine} alt='' />
                        </div>
                    </div>
                    <div className='col-12 h5 text-center'>{t('alternative-medicine.advantages-of-therapy')}</div>
                    <div className='d-flex justify-content-between flex-column flex-md-row text-center mt-3'>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <img
                                alt='advantage of therapy'
                                src={AlternativeTen}
                                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                            />
                            <div className='h5'>{t('alternative-medicine.reduced-discomfort')}</div>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <img
                                alt='advantage of therapy'
                                src={AlternativeEleven}
                                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                            />
                            <div className='h5'>{t('alternative-medicine.improved-sleep')}</div>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <img
                                alt='advantage of therapy'
                                src={AlternativeTweleve}
                                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                            />
                            <div className='h5'>{t('alternative-medicine.enhanced-communication')}</div>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <img
                                alt='advantage of therapy'
                                src={AlternativeThirteen}
                                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                            />
                            <div className='h5'>{t('alternative-medicine.reduced-stress')}</div>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <img
                                alt='advantage of therapy'
                                src={AlternativeFourteen}
                                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                            />
                            <div className='h5'>{t('alternative-medicine.life-satification')}</div>
                        </div>
                    </div>
                    <p className='text-center' style={{ textAlign: 'justify' }}>
                        {t('alternative-medicine.para-9')}
                    </p>
                </div>
            </section>
            {/* <div className='container'>
        <div className='row'>
          <div className='col-12 text-center h3'>ABOUT US</div>
          <div className='col-12' style={{ fontSize: '18px', textAlign: 'justify' }}>
            VhealTHY is a micro-enterprise aimed at bringing together experts from around the world
            specializing in various forms of traditional medicine, ranging from ancient practices
            such as Ayurveda, which emerged over 5000 years ago in India, to more contemporary
            approaches like homeopathy, naturopathy and hypnosis. The primary objective
            of VhealTHY is to promote wellbeing by adopting a holistic approach that emphasizes the
            balance between the body and mind. These traditional methods have withstood the test of
            time and continue to be widely used worldwide. They are based on self-awareness,
            understanding the body and its environment, and being mindful of what we integrate into
            our physical and mental wellbeing, as they are closely interconnected. We have all
            experienced moments of mental or physical fatigue, points of vulnerability, or a
            decrease in self- confidence, which leave an impact on our mental, physical, and/or
            psychological wellbeing. Hypnosis, for example, along with other techniques of
            realignment and neuro-linguistic programming, allows us to develop powerful mechanisms
            to prevent and address any obstacles that impede our wellbeing. While these approaches
            may be considered more time-consuming than modern medication-based solutions, they offer
            lasting and profound benefits. At VhealTHY, we believe in the importance of caring for
            our wellbeing by considering its subtleties across all aspects of our lives. By
            embracing more conscious and engaged lifestyles, VhealTHY aims to support individuals in
            their journey of self-discovery and optimal wellbeing through personal growth and
            development, with an understanding of oneself vital needs, including mental and physical
            health.
          </div>
        </div>
      </div> */}
            <Footer />
        </>
    );
};

export default TraditionalMedicinePage;
