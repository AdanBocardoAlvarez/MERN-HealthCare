import { Card, Image, Tabs, TabsProps, Divider } from 'antd';
import { Doctor } from '../../../../assets/img';
import { convertTimeToAMPM } from '../../../../utils/helper';
import { useTranslation } from 'react-i18next';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const shifts = ['morning', 'noon', 'afternoon', 'evening', 'night'];

const ConsultantMyprofileData = ({ ConsultantProfile }) => {

    const { t } = useTranslation();

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <div style={{ fontSize: '18px' }}>{t('auth.basic-profile-details')}</div>,
            children: (
                <Card aria-label={t('auth.basic-profile-details')} className='mt-5 shadow_consultant'>
                    <section>
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto font-weight-bold'>{t('auth.id-number')}</div>
                                        <div className='col col-auto font-weight-bold'>{t('nationality')}</div>
                                        <div className='col col-auto font-weight-bold'>{t('profession')}</div>
                                    </div>
                                    <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BasicDetails[0]?.id_number}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BasicDetails[0]?.nationality[0]?.name}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BasicDetails[0]?.profession}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto font-weight-bold'>{t('auth.criminal-record')}</div>
                                        <div className='col col-auto font-weight-bold'>{t('country-of-birth')}</div>
                                        <div className='col col-auto font-weight-bold'>{t('auth.language-of-correspondence')}</div>
                                    </div>
                                    <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col paragraph-text'>
                                            {ConsultantProfile[0]?.BasicDetails[0]?.criminal_record}
                                        </div>
                                        <div className='col paragraph-text'>
                                            {ConsultantProfile[0]?.BasicDetails[0]?.countryOfBirth[0]?.name}
                                        </div>
                                        <div className='col paragraph-text'>
                                            {ConsultantProfile[0]?.BasicDetails[0]?.CorrespondenceLanguage[0]?.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-md-4 col col-auto font-weight-bold'>{t('auth.id-number-attachment')}</div>
                                    <div className='col-md-8 col-12'>
                                        <Image
                                            src={`${process.env.REACT_APP_API_BASE_URL}${ConsultantProfile[0]?.BasicDetails[0]?.id_number_attachment}`}
                                            className='img-fluid'
                                            style={{ width: '100px', height: '100px' }}
                                            alt={t('auth.id-number-attachment')}
                                            fallback={Doctor}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Card>
            )
        },
        {
            key: '2',
            label: <div style={{ fontSize: '18px' }}>{t('auth.address-details')}</div>,
            children: (
                <Card aria-label={t('auth.address-details')} className='mt-5 shadow_consultant'>
                    <section className='row'>
                        <div className='col-md-6 col-12'>
                            <div className='row'>
                                <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                    <div className='col col-auto font-weight-bold'>{t('country')}</div>
                                    <div className='col col-auto font-weight-bold'>{t('city')}</div>
                                    <div className='col col-auto font-weight-bold'>{t('postal-code')}</div>
                                </div>
                                <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                    <div className='col col-auto paragraph-text'>
                                        {ConsultantProfile[0]?.AddressDetails[0]?.CountryOfResidence[0]?.name}
                                    </div>
                                    <div className='col col-auto paragraph-text'>
                                        {ConsultantProfile[0]?.AddressDetails[0]?.City[0]?.name}
                                    </div>
                                    <div className='col col-auto paragraph-text'>
                                        {ConsultantProfile[0]?.AddressDetails[0]?.postal_code}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-12'>
                            <div className='row'>
                                <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                    <div className='col col-auto font-weight-bold'>{t('house-number')}</div>
                                    <div className='col col-auto font-weight-bold'>{t('street-name')}</div>
                                    <div className='col col-auto font-weight-bold'>{t('street-name-2')}</div>
                                </div>
                                <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                    <div className='col paragraph-text'>
                                        {ConsultantProfile[0]?.AddressDetails[0]?.house_number}
                                    </div>
                                    <div className='col paragraph-text'>
                                        {ConsultantProfile[0]?.AddressDetails[0]?.street_name}
                                    </div>
                                    <div className='col paragraph-text'>
                                        {ConsultantProfile[0]?.AddressDetails[0]?.street_name2}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Card>
            )
        },
        {
            key: '3',
            label: <div style={{ fontSize: '18px' }}>{t('auth.bank-details')}</div>,
            children: (
                <Card aria-label={t('auth.bank-details')} className='mt-5 shadow_consultant'>
                    <section>
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto font-weight-bold'>{t('country')}</div>
                                        <div className='col col-auto font-weight-bold'>{t('auth.iban')}</div>
                                        <div className='col col-auto font-weight-bold'>{t('auth.account-currency')}</div>
                                        <div className='col col-auto font-weight-bold'>{t('auth.bank-account-number')}</div>
                                        <div className='col col-auto font-weight-bold'>{t('auth.bank-name')}</div>
                                        <div className='col col-auto font-weight-bold'>{t('auth.bank-agency-name')}</div>
                                    </div>
                                    <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.AddressDetails[0]?.CountryOfResidence[0]?.name}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BankDetails[0]?.Iban ? ConsultantProfile[0]?.BankDetails[0]?.Iban : "N/A"}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BankDetails[0]?.account_currency}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BankDetails[0]?.account_number}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BankDetails[0]?.bank_name}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BankDetails[0]?.bank_Agency_name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-5 d-flex flex-fill flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto font-weight-bold'>{t('auth.agency-address')}</div>
                                        <div className='col col-auto font-weight-bold'>{t('auth.branch-code')}</div>
                                        <div className='col col-auto font-weight-bold'>{t('auth.control-key')}</div>
                                        <div className='col col-auto font-weight-bold'>{t('auth.payment-currency')}</div>
                                        <div className='col col-auto font-weight-bold'>{t('auth.swift-code')}</div>
                                        <div className='col col-auto font-weight-bold'>{t('auth.tax-information')}</div>
                                    </div>
                                    <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BankDetails[0]?.agency_address}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BankDetails[0]?.branch_code}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BankDetails[0]?.control_key}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BankDetails[0]?.payment_currency}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BankDetails[0]?.swift_code}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BankDetails[0]?.tax_information}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <Divider /> */}
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-md-4 col col-auto font-weight-bold'>{t('auth.bank-details')}</div>
                                    <div className='col-md-8 col-12'>
                                        <Image
                                            src={`${process.env.REACT_APP_API_BASE_URL}${ConsultantProfile[0]?.BankDetails[0]?.add_bank_information}`}
                                            className='img-fluid'
                                            style={{ width: '100px', height: '100px' }}
                                            alt={t('auth.bank-details')}
                                            fallback={Doctor}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 col-12'></div>
                        </div>
                    </section>
                </Card>
            )
        },
        {
            key: '4',
            label: <div style={{ fontSize: '18px' }}>{t('auth.education-details')}</div>,
            children: (
                <Card aria-label={t('auth.education-details')} className='mt-5 shadow_consultant'>
                    <section>
                        <div className='row'>
                            <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                <div className='col col-auto font-weight-bold'>{t('education')} {t('specialisation')}</div>
                                <div className='col col-auto font-weight-bold'>{t('education')} {t('disorders')}</div>
                                <div className='col col-auto font-weight-bold'>{t('resume')}</div>
                            </div>
                            <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                <div className='col paragraph-text'>
                                    {ConsultantProfile[0]?.EducationDetails[0]?.SpecializationName?.map(row => row.name).join(', ')}
                                </div>
                                <div className='col paragraph-text'>
                                    {ConsultantProfile[0]?.EducationDetails[0]?.disorderName?.map(row => row.name).join(', ')}
                                </div>
                                <div className='col paragraph-text'>
                                    <a target='_blank' rel='noopener noreferrer' href={`${process.env.REACT_APP_API_BASE_URL}${ConsultantProfile[0]?.EducationDetails[0]?.edu_resume}`}>Resume Attachment</a>
                                </div>
                            </div>

                            <div className="table-responsive mt-3">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">{t('auth.degree-name')}</th>
                                            <th scope="col">{t('auth.school-name')}</th>
                                            <th scope="col">{t('auth.year-of-graduation')}</th>
                                            <th scope="col">{t('country')}</th>
                                            <th scope="col">{t('attachment')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ConsultantProfile[0]?.consultantDegrees?.map((row, i) => (
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{row?.degree_name}</td>
                                                <td>{row?.school_name}</td>
                                                <td>{row?.year_of_graduation}</td>
                                                <td>{row?.country_name}</td>
                                                <td>
                                                    <a href={`${process.env.REACT_APP_API_BASE_URL}${row?.attachment}`} target="_blank" rel="noopener noreferrer">Download</a>
                                                </td>
                                            </tr>
                                        ))}

                                        {ConsultantProfile[0]?.consultantDegrees.length === 0 ? <tr><td colSpan={10}><span className="text-danger">No Record</span></td></tr> : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </Card >
            )
        },
        {
            key: '5',
            label: <div style={{ fontSize: '18px' }}>{t('time-slot')}</div>,
            children: (
                <Card aria-label={t('time-slot')} className='mt-5 shadow_consultant'>
                    <section>
                        <div className='d-flex flex-column' style={{ gap: '10px' }}>
                            {days.map((row, i) => {
                                if (ConsultantProfile[0]?.TimeSlot?.[0]?.[row] === undefined) return null;
                                return <div key={i}>
                                    <div className='font-weight-bold text-md text-center mb-4'>{t(`days.${row.toLowerCase()}`)}</div>
                                    {shifts.map((inRow, j) => <div className='row' key={j}>
                                        <div className='col-md-4 col col-auto font-weight-bold mb-2 text-capitalize'>{t(`shifts.${inRow}`)}</div>
                                        <div className='col-md-8 col-12'>
                                            {ConsultantProfile[0]?.TimeSlot?.[0]?.[row]?.[inRow]?.map(row => convertTimeToAMPM(row))?.join(',  ')}
                                        </div>
                                    </div>)}
                                </div>
                            })}
                        </div>
                    </section>
                </Card>
            )
        },
        {
            key: '6',
            label: <div style={{ fontSize: '18px' }}>{t('auth.profile-details')}</div>,
            children: (
                <Card aria-label={t('auth.profile-details')} className='mt-5 shadow_consultant'>
                    <section>
                        <div className='row mb-5 pb-5'>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col-auto font-weight-bold h-75'>{t('auth.bio')}</div>
                                        <div className='col-auto font-weight-bold mt-3'>{t('auth.objectives')}</div>
                                    </div>
                                    <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col-auto h-75 mb-3 paragraph-text' dangerouslySetInnerHTML={{ __html: ConsultantProfile[0]?.ProfileAndKeyword[0]?.bio }}></div>
                                        <div className='paragraph-text'>
                                            {ConsultantProfile[0]?.ObjectiveUseByConsultant[0]?.join(' , ')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto font-weight-bold'>{t('auth.keywords')}</div>
                                    </div>
                                    <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.ObjectiveUseByConsultant[0]?.join(' , ')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider className='my-5 ' />
                        <div className='row mt-5 '>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-md-4 col col-auto font-weight-bold'>{t('check-intro-video')}</div>
                                    <div className='col-md-8 col-12'>
                                        <a href={ConsultantProfile[0]?.ProfileAndKeyword[0]?.intro_vedio} target="_blank" rel="noopener noreferrer">{t('check-intro-video')}</a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-md-4 col col-auto font-weight-bold'>{t('profile-image')}</div>
                                    <div className='col-md-8 col-12'>
                                        <Image
                                            src={`${process.env.REACT_APP_API_BASE_URL}${ConsultantProfile[0]?.ProfileAndKeyword[0]?.profile_img}`}
                                            className='img-fluid'
                                            style={{ width: '100px', height: '100px' }}
                                            alt={t('profile-image')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Card>
            )
        }
    ];
    return <Tabs defaultActiveKey='1' style={{ fontSize: '20px' }} items={items} />;
};

export default ConsultantMyprofileData;
