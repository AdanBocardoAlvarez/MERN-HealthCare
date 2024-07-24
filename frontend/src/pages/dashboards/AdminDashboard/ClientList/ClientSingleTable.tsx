import { Card, Divider } from 'antd';

const ClientSingleTable = ({ BasicInfo }) => {
	return (
		<Card aria-label='Basic Details' className='mt-5 shadow_consultant'>
			<section>
				<div className='row'>
					<div className='col-md-6 col-12'>
						<div className='row'>
							<div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
								<div className='col col-auto font-weight-bold'>Title</div>
								<div className='col col-auto font-weight-bold'>Gender</div>
								<div className='col col-auto font-weight-bold'>Family Name/Surname</div>
							</div>
							<div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
								<div className='col col-auto paragraph-text'>{BasicInfo?.title}</div>
								<div className='col col-auto paragraph-text'>{BasicInfo?.gender}</div>
								<div className='col col-auto paragraph-text'>{BasicInfo?.family_name}</div>
							</div>
						</div>
					</div>
					<div className='col-md-6 col-12'>
						<div className='row row mt-2 mt-lg-0'>
							<div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
								<div className='col col-auto font-weight-bold'>Given Name</div>
								<div className='col col-auto font-weight-bold'>Date of Birth</div>
								<div className='col col-auto font-weight-bold'>Contact Number</div>
								<div className='col col-auto font-weight-bold'>Email</div>
							</div>
							<div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
								<div className='col paragraph-text'>{BasicInfo?.given_name}</div>
								<div className='col paragraph-text'>{BasicInfo?.DOB}</div>
								<div className='col paragraph-text'> {BasicInfo?.contact_number_isd}{BasicInfo?.contact_number}</div>
								<div className='col paragraph-text'>{BasicInfo?.email}</div>
							</div>
						</div>
					</div>
				</div>
				<Divider />
				<div className='row'>
					<div className='col-md-6 col-12'>
						<div className='row '>
							<div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
								<div className='col col-auto font-weight-bold'>Nationality</div>
								<div className='col col-auto font-weight-bold'>Corresponse Language</div>
								<div className='col col-auto font-weight-bold'>Country of Birth</div>
								<div className='col col-auto font-weight-bold'>Currency used</div>
							</div>
							<div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
								<div className='col col-auto paragraph-text'>
									{BasicInfo?.BasicDetails?.nationalitys}
								</div>
								<div className='col col-auto paragraph-text'>
									{BasicInfo?.BasicDetails?.CorrespondenceLanguage}
								</div>
								<div className='col col-auto paragraph-text'>
									{BasicInfo?.BasicDetails?.countryOfBirth}
								</div>
								<div className='col paragraph-text'>{BasicInfo?.BasicDetails?.currency_used}</div>
							</div>
						</div>
					</div>
					<div className='col-md-6 col-12'>
						<div className='row mt-2 mt-lg-0'>
							<div className='col-5 d-flex flex-column p-0' style={{ gap: '10px' }}>
								<div className='col col-auto font-weight-bold'>House Number</div>
								<div className='col col-auto font-weight-bold'>Street Name</div>
								<div className='col col-auto font-weight-bold'>Street Name 2</div>
								<div className='col col-auto font-weight-bold'>Postal Code</div>
							</div>
							<div className='col-7 d-flex flex-column p-0' style={{ gap: '10px' }}>
								<div className='col paragraph-text'>{BasicInfo?.BasicDetails?.house_number}</div>
								<div className='col paragraph-text'>{BasicInfo?.BasicDetails?.street_name}</div>
								<div className='col paragraph-text'>{BasicInfo?.BasicDetails?.street_name2}</div>
								<div className='col paragraph-text'>{BasicInfo?.BasicDetails?.postal_code}</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Card>
	);
};

export default ClientSingleTable;
