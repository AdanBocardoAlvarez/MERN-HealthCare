import { Card, Tabs, TabsProps, Divider } from 'antd';

const ConsultantMyprofileData = ({ ConsultantProfile }) => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <div style={{ fontSize: '18px' }}>Basic Details</div>,
            children: (
                <Card title='Basic Details' aria-label='Basic Details' className='mt-5 shadow_consultant'>
                    <section>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto font-weight-bold'>Nationality</div>
                                        <div className='col col-auto font-weight-bold'>Profession</div>
                                        <div className='col col-auto font-weight-bold'>Country Of Birth</div>
                                        <div className='col col-auto font-weight-bold'>Language Spoken</div>
                                    </div>
                                    <div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BasicDetails[0]?.nationality[0]?.name}
                                        </div>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.BasicDetails[0]?.profession}
                                        </div>
                                        <div className='col paragraph-text'>
                                            {ConsultantProfile[0]?.BasicDetails[0]?.countryOfBirth[0]?.name}
                                        </div>
                                        <div className='col paragraph-text'>
                                            {ConsultantProfile[0]?.SpokenLanguageName[0]?.spokenLanguageName[0]?.name}
                                        </div>
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
                <Card
                    title='Address Details'
                    aria-label='Address Details'
                    className='mt-5 shadow_consultant'
                >
                    <section className='row'>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-6 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                    <div className='row'>
                                        <div className='col col-auto font-weight-bold'>Country</div>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.AddressDetails[0]?.CountryOfResidence[0]?.name}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                    <div className='row'>
                                        <div className='col col-auto font-weight-bold'>City</div>
                                        <div className='col col-auto paragraph-text'>
                                            {ConsultantProfile[0]?.AddressDetails[0]?.City[0]?.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-6 p-0' style={{ gap: '10px' }}>
                                        <div className='text-center text-md mb-3'>Graduate</div>
                                        <div className='row'>
                                            <div className='col col-auto font-weight-bold'>
                                                {ConsultantProfile[0]?.EducationDetails[0]?.gra_degree_name}
                                            </div>
                                            <div className='col col-auto paragraph-text'>
                                                {`${ConsultantProfile[0]?.EducationDetails[0]?.gra_school_name}, ${ConsultantProfile[0]?.EducationDetails[0]?.graduate_country[0]?.name}, ${ConsultantProfile[0]?.EducationDetails[0]?.gra_year_of_graduation}`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-6 d-flex flex-column p-0' style={{ gap: '10px' }}>
                                        <div className='text-center text-md mb-3 mt-md-0 mt-4'>Post Graduation</div>
                                        <div className='row'>
                                            <div className='col col-auto font-weight-bold'>
                                                {ConsultantProfile[0]?.EducationDetails[0]?.post_degree_name}
                                            </div>
                                            <div className='col col-auto paragraph-text'>
                                                {`${ConsultantProfile[0]?.EducationDetails[0]?.post_school_name}, ${ConsultantProfile[0]?.EducationDetails[0]?.post_country[0]?.name}, ${ConsultantProfile[0]?.EducationDetails[0]?.post_year_of_graduation}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='col-md-6 col-12'>
                <div className='text-center text-md mb-3 mt-md-0 mt-4'>Post Graduation</div>
                <div className='row'>
                  <div className='col-6 p-0' style={{ gap: '10px' }}>
                    <div className='col col-auto font-weight-bold'>
                      {ConsultantProfile[0]?.EducationDetails[0]?.post_degree_name}
                    </div>
                  </div>
                  <div className='col-6 p-0' style={{ gap: '10px' }}>
                    <div className='col col-auto paragraph-text'>
                      {`${ConsultantProfile[0]?.EducationDetails[0]?.post_school_name}, ${ConsultantProfile[0]?.EducationDetails[0]?.post_country[0]?.name}, ${ConsultantProfile[0]?.EducationDetails[0]?.post_year_of_graduation}`}
                    </div>
                  </div>
                </div>
              </div> */}
                        </div>
                        <Divider />
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <div className='col col-auto font-weight-bold'>Disorders</div>
                            </div>
                            <div className='col-md-6 col-12'>
                                <div className='col paragraph-text'>
                                    {ConsultantProfile[0]?.EducationDetails[0]?.disorderName[0]?.name}
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-md-6 col-12'>
                                <div className='col col-auto font-weight-bold'>Specialisation</div>
                            </div>
                            <div className='col-md-6 col-12'>
                                <div className='col paragraph-text'>
                                    {ConsultantProfile[0]?.EducationDetails[0]?.SpecializationName[0]?.name}
                                </div>
                            </div>
                        </div>
                    </section>
                </Card>
            )
        }
        // {
        //   key: '5',
        //   label: <div style={{ fontSize: '18px' }}>Time Slot</div>,
        //   children: (
        //     <Card aria-label='Time Slot' className='mt-5 shadow_consultant'>
        //       {ConsultantProfile[0]?.TimeSlot.length !== 0 && (
        //         <section>
        //           <div className='d-flex flex-column' style={{ gap: '10px' }}>
        //             <div>
        //               <div className='font-weight-bold text-md text-center mb-4'>Monday</div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Morning</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Monday?.morning?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Afternoon</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Monday?.afternoon?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Noon</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Monday?.afternoon?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Evening</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Monday?.evening?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Night</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Monday?.night?.join(' , ')}
        //                 </div>
        //               </div>
        //             </div>
        //             <div>
        //               <div className='font-weight-bold text-md text-center mb-4'>Tuesday</div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Morning</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Tuesday?.morning?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Afternoon</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Tuesday?.afternoon?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Noon</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Tuesday?.afternoon?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Evening</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Tuesday?.evening?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Night</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Tuesday?.night?.join(' , ')}
        //                 </div>
        //               </div>
        //             </div>
        //             <div>
        //               <div className='font-weight-bold text-md text-center mb-4'>Wednesday</div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Morning</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Wednesday?.morning?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Afternoon</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Wednesday?.afternoon?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Noon</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Wednesday?.afternoon?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Evening</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Wednesday?.evening?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Night</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Wednesday?.night?.join(' , ')}
        //                 </div>
        //               </div>
        //             </div>
        //             <div>
        //               <div className='font-weight-bold text-md text-center mb-4'>Thursday</div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Morning</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Thursday?.morning?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Afternoon</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Thursday?.afternoon?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Noon</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Thursday?.afternoon?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Evening</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Thursday?.evening?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Night</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Thursday?.night?.join(' , ')}
        //                 </div>
        //               </div>
        //             </div>
        //             <div>
        //               <div className='font-weight-bold text-md text-center mb-4'>Friday</div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Morning</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Friday?.morning?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Afternoon</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Friday?.afternoon?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Noon</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Friday?.afternoon?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Evening</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Friday?.evening?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Night</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Friday?.night?.join(' , ')}
        //                 </div>
        //               </div>
        //             </div>
        //             <div>
        //               <div className='font-weight-bold text-md text-center mb-4'>Saturday</div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Morning</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Saturday?.morning?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Afternoon</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Saturday?.afternoon?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Noon</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Saturday?.afternoon?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Evening</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Saturday?.evening?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Night</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Saturday?.night?.join(' , ')}
        //                 </div>
        //               </div>
        //             </div>
        //             <div>
        //               <div className='font-weight-bold text-md text-center mb-4'>Sunday</div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Morning</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Sunday?.morning?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Afternoon</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Sunday?.afternoon?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Noon</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Sunday?.afternoon?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Evening</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Sunday?.evening?.join(' , ')}
        //                 </div>
        //               </div>
        //               <div className='row'>
        //                 <div className='col-md-4 col col-auto font-weight-bold mb-4'>Night</div>
        //                 <div className='col-md-8 col-12'>
        //                   {ConsultantProfile[0]?.TimeSlot[0]?.Sunday?.night?.join(' , ')}
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //         </section>
        //       )}
        //     </Card>
        //   )
        // },
    ];
    return <Tabs defaultActiveKey='1' style={{ fontSize: '20px' }} items={items} />;
};

export default ConsultantMyprofileData;
