import { Card, Image, Tabs, TabsProps, Divider } from 'antd';
import moment from 'moment';
import { convertTimeToAMPM } from '../../../../utils/helper';
import { Doctor } from '../../../../assets/img';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const shifts = ['morning', 'noon', 'afternoon', 'evening', 'night'];

const ConsultantSingleTable = ({ consultantProfile }) => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <div style={{ fontSize: '18px' }}>Basic Details</div>,
            children: (
                <Card aria-label='Basic Details' className='mt-5 shadow_consultant'>
                    <section>
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto font-weight-bold'>ID Number</div>
                                        <div className='col col-auto font-weight-bold'>Nationality</div>
                                        <div className='col col-auto font-weight-bold'>Profession</div>
                                    </div>
                                    <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto paragraph-text'>
                                            {consultantProfile?.BasicDetails?.id_number}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {consultantProfile?.BasicDetails?.nationality}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {consultantProfile?.BasicDetails?.profession}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto font-weight-bold'>Criminal Record</div>
                                        <div className='col col-auto font-weight-bold'>Country Of Birth</div>
                                        <div className='col col-auto font-weight-bold'>Correspondence Language</div>
                                        <div className='col col-auto font-weight-bold'>Spoken Language</div>
                                    </div>
                                    <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col paragraph-text'>
                                            {consultantProfile?.BasicDetails?.criminal_record}
                                        </div>
                                        <div className='col paragraph-text'>
                                            {consultantProfile?.BasicDetails?.countryOfBirth}
                                        </div>
                                        <div className='col paragraph-text'>
                                            {consultantProfile?.BasicDetails?.CorrespondenceLanguage}
                                        </div>
                                        <div className='col paragraph-text'>
                                            {consultantProfile?.SpokenLanguageName?.join(', ')}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-md-4 col col-auto font-weight-bold'>ID Number attachment</div>
                                    <div className='col-md-8 col-12'>
                                        <Image
                                            src={`${process.env.REACT_APP_API_BASE_URL}${consultantProfile?.BasicDetails?.id_number_attachment}`}
                                            className='img-fluid'
                                            style={{ width: '100px', height: '100px' }}
                                            alt='ID Number attachment'
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
            label: <div style={{ fontSize: '18px' }}>Address Details</div>,
            children: (
                <Card aria-label='Address Details' className='mt-5 shadow_consultant'>
                    <section className='row'>
                        <div className='col-md-6 col-12'>
                            <div className='row'>
                                <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                    <div className='col col-auto font-weight-bold'>Country</div>
                                    <div className='col col-auto font-weight-bold'>City</div>
                                    <div className='col col-auto font-weight-bold'>Postal</div>
                                </div>
                                <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                    <div className='col col-auto paragraph-text'>
                                        {consultantProfile?.AddressDetails?.CountryOfResidence}
                                    </div>
                                    <div className='col col-auto paragraph-text'>
                                        {consultantProfile?.AddressDetails?.City}
                                    </div>
                                    <div className='col col-auto paragraph-text'>
                                        {consultantProfile?.AddressDetails?.postal_code}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-12'>
                            <div className='row'>
                                <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                    <div className='col col-auto font-weight-bold'>House Number</div>
                                    <div className='col col-auto font-weight-bold'>Street Name</div>
                                    <div className='col col-auto font-weight-bold'>Street Name 2</div>
                                </div>
                                <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                    <div className='col paragraph-text'>
                                        {consultantProfile?.AddressDetails?.house_number}
                                    </div>
                                    <div className='col paragraph-text'>
                                        {consultantProfile?.AddressDetails?.street_name}
                                    </div>
                                    <div className='col paragraph-text'>
                                        {consultantProfile?.AddressDetails?.street_name2}
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
            label: <div style={{ fontSize: '18px' }}>Bank Details</div>,
            children: (
                <Card aria-label='Bank Details' className='mt-5 shadow_consultant'>
                    <section>
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto font-weight-bold'>Country</div>
                                        <div className='col col-auto font-weight-bold'>IBan</div>
                                        <div className='col col-auto font-weight-bold'>Account Currency</div>
                                        <div className='col col-auto font-weight-bold'>Account Number</div>

                                        <div className='col col-auto font-weight-bold'>Bank Name</div>
                                        <div className='col col-auto font-weight-bold'>Bank Agency Name</div>
                                    </div>
                                    <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto paragraph-text'>
                                            {consultantProfile?.AddressDetails?.CountryOfResidence}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {consultantProfile?.BankDetails?.Iban}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {consultantProfile?.BankDetails?.account_currency}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {consultantProfile?.BankDetails?.account_number}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {consultantProfile?.BankDetails?.bank_name}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {consultantProfile?.BankDetails?.bank_Agency_name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto font-weight-bold'>Agency Address</div>
                                        <div className='col col-auto font-weight-bold'>Branch Code</div>
                                        <div className='col col-auto font-weight-bold'>Control Key</div>
                                        <div className='col col-auto font-weight-bold'>Payment Currency</div>
                                        <div className='col col-auto font-weight-bold'>Swift Code</div>
                                        <div className='col col-auto font-weight-bold'>Tax Information</div>
                                    </div>
                                    <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto paragraph-text'>
                                            {consultantProfile?.BankDetails?.agency_address}
                                        </div>
                                        <div className='col paragraph-text'>
                                            {consultantProfile?.BankDetails?.branch_code}
                                        </div>
                                        <div className='col paragraph-text'>
                                            {consultantProfile?.BankDetails?.control_key}
                                        </div>
                                        <div className='col paragraph-text'>
                                            {consultantProfile?.BankDetails?.payment_currency}
                                        </div>
                                        <div className='col paragraph-text'>
                                            {consultantProfile?.BankDetails?.swift_code}
                                        </div>
                                        <div className='col paragraph-text'>
                                            {consultantProfile?.BankDetails?.tax_information}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-md-5 col col-auto font-weight-bold'>Bank Information</div>
                                    <div className='col-md-7 col-12'>
                                        {consultantProfile?.BankDetails?.add_bank_information ? <a rel='noreferrer nofollow' target='_blank' href={`${process.env.REACT_APP_API_BASE_URL}${consultantProfile?.BankDetails?.add_bank_information}`}>
                                            View Document
                                        </a> : "Not Available"}
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
            label: <div style={{ fontSize: '18px' }}>Education Details</div>,
            children: (
                <Card aria-label='Education Details' className='mt-5 shadow_consultant'>
                    <section>
                        <div className='row'>
                            <div className='col-md-12 col-12'>
                                <div className='row'>
                                    <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto font-weight-bold'>Education Specialisation</div>
                                        <div className='col col-auto font-weight-bold'>Education Disorders</div>
                                        <div className='col col-auto font-weight-bold'>Resume</div>
                                    </div>
                                    <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col paragraph-text'>
                                            {consultantProfile?.EducationDetails?.SpecializationName?.map(row => row.name).join(', ')}
                                        </div>
                                        <div className='col paragraph-text'>
                                            {consultantProfile?.EducationDetails?.disorderName?.map(row => row.name).join(', ')}
                                        </div>
                                        <div className='col paragraph-text'>
                                            {consultantProfile?.EducationDetails?.edu_resume &&
                                                <a rel='noreferrer nofollow' target='_blank' href={`${process.env.REACT_APP_API_BASE_URL}${consultantProfile?.EducationDetails?.edu_resume}`}>
                                                    View Resume
                                                </a>}
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
                                                <th scope="col">Attachment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {consultantProfile?.consultantDegrees?.map((row, i) => (
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

                                            {consultantProfile?.consultantDegrees?.length === 0 ? <tr><td colSpan={10}><span className="text-danger">No Record</span></td></tr> : null}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <Divider />

                        {consultantProfile?.EducationDetails?.gra_degree_attachment && <div className='row mb-2'>
                            <div className='col-md-4 col col-auto font-weight-bold'>
                                Graduation Degree
                            </div>
                            <div className='col-md-8 col-12'>
                                {consultantProfile?.EducationDetails?.edu_resume && <a
                                    rel='noreferrer nofollow'
                                    target='_blank'
                                    href={`${process.env.REACT_APP_API_BASE_URL}${consultantProfile?.EducationDetails?.gra_degree_attachment}`}
                                >
                                    Download
                                </a>}
                            </div>
                        </div>}

                        {consultantProfile?.EducationDetails?.gra_degree_attachment && <div className='row'>
                            <div className='col-md-4 col col-auto font-weight-bold'>
                                Post Degree Attachment
                            </div>
                            <div className='col-md-8 col-12'>
                                {consultantProfile?.EducationDetails?.edu_resume && <a
                                    rel='noreferrer nofollow'
                                    target='_blank'
                                    href={`${process.env.REACT_APP_API_BASE_URL}${consultantProfile?.EducationDetails?.post_degree_attachment}`}
                                >
                                    Download
                                </a>}
                            </div>
                        </div>}
                    </section>
                </Card>
            )
        },
        {
            key: '5',
            label: <div style={{ fontSize: '18px' }}>Time Slot</div>,
            children: (
                <Card aria-label='Time Slot' className='mt-5 shadow_consultant'>
                    <section>
                        <div className='d-flex flex-column' style={{ gap: '10px' }}>
                            {days.map((row, i) => {
                                if (consultantProfile?.TimeSlot?.[row] === undefined) return null;
                                return <div key={i}>
                                    <div className='font-weight-bold text-md text-center mb-4'>{row}</div>
                                    {shifts.map((inRow, j) => <div className='row' key={j}>
                                        <div className='col-md-4 col col-auto font-weight-bold mb-4 text-capitalize'>{inRow}</div>
                                        <div className='col-md-8 col-12'>
                                            {consultantProfile?.TimeSlot?.[row]?.[inRow]?.map(row => convertTimeToAMPM(row))?.join(',  ')}
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
            label: <div style={{ fontSize: '18px' }}>Profile And Keyword</div>,
            children: (
                <Card aria-label='Profile And Keyword' className='mt-5 shadow_consultant'>
                    <section>
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-5 d-flex flex-column p-0 gap-2'>
                                        <div className='col col-auto font-weight-bold'>Objectives</div>
                                        <div className='col col-auto font-weight-bold mt-4'>Bio</div>
                                    </div>
                                    <div className='col-7 d-flex flex-column p-0 gap-2'>
                                        <div className='paragraph-text'>
                                            {consultantProfile?.ProfileAndKeyword?.ObjectivesName?.join(' , ')}
                                        </div>
                                        <div className='col-auto paragraph-text mt-4'>
                                            <div dangerouslySetInnerHTML={{ __html: consultantProfile?.ProfileAndKeyword?.bio }}></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-5 d-flex flex-column p-0 gap-2'>
                                        <div className='col-auto font-weight-bold'>Keywords</div>
                                    </div>
                                    <div className='col-7 d-flex flex-column p-0 gap-2'>
                                        <div className='col-auto paragraph-text'>
                                            {consultantProfile?.ProfileAndKeyword?.KeywordsName?.join(', ')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                {consultantProfile?.ProfileAndKeyword?.intro_vedio && <div className='row'>
                                    <div className='col-md-4 col col-auto font-weight-bold'>Intro Video</div>
                                    <div className='col-md-8 col-12'>
                                        <a target='_blank' rel='noreferrer nofollow' href={consultantProfile?.ProfileAndKeyword?.intro_vedio}>View Intro Video</a>
                                    </div>
                                </div>}
                            </div>
                            <div className='col-md-6 col-12'>
                                <div className='row'>
                                    <div className='col-md-4 col col-auto font-weight-bold'>Profile Image</div>
                                    <div className='col-md-8 col-12'>
                                        <Image
                                            src={`${process.env.REACT_APP_API_BASE_URL}${consultantProfile?.ProfileAndKeyword?.profile_img}`}
                                            className='img-fluid'
                                            style={{ width: '100px', height: '100px' }}
                                            alt='Profile Image'
                                            fallback={Doctor}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div className='row'>
                            <div className='col-12'>
                                <h5 className='mb-2'>Background Experience / Publication</h5>
                                <div dangerouslySetInnerHTML={{ __html: consultantProfile?.ProfileAndKeyword?.professionalCounseling }}></div>
                            </div>
                        </div>
                    </section>
                </Card >
            )
        },
        {
            key: '7',
            label: <div style={{ fontSize: '18px' }}>Certificates</div>,
            children: (
                <Card aria-label='Certificates' className='mt-5 shadow_consultant'>
                    <div className="table-responsive">
                        <table className="table align-middle text-center">
                            <thead>
                                <tr>
                                    <th className='text-center' scope="col">#</th>
                                    <th className='text-center' scope="col">Certificate Name</th>
                                    <th className='text-center' scope="col">School Name of Certificate</th>
                                    <th className='text-center' scope="col">Year Of Certificate</th>
                                    <th className='text-center' scope="col">Certificate No.</th>
                                    <th className='text-center' scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultantProfile?.Certificates?.map((row, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{row?.name}</td>
                                        <td>{row?.certificate_name}</td>
                                        <td>{moment(row?.year_of_certificate).format('ll')}</td>
                                        <td>{row?.num_of_certificate}</td>
                                        <td>
                                            {row?.certificate_attachment && <a href={`${process.env.REACT_APP_API_BASE_URL}${row?.certificate_attachment}`} target="_blank" rel="noopener noreferrer">View</a>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card >
            )
        }
    ];
    return <Tabs defaultActiveKey='1' style={{ fontSize: '20px' }} items={items} />;
};

export default ConsultantSingleTable;
