import React from 'react';
import { Controller } from 'react-hook-form';
import { Form, Input } from 'antd';
import ImageLoader from '../../layout/components/patients/ImageLoader';
import { CloseOutlined } from '@ant-design/icons/lib';
import { Tooltip } from 'antd';

const FormItem = Form.Item;
interface CertificateComponentProps {
	index: number;
	control: any;
	onRemove: () => void;
	setCertificate: () => void;
	certificate: File;
	errors: any;
}

const CertificateForm: React.FC<CertificateComponentProps> = ({
	index,
	control,
	onRemove,
	setCertificate,
	certificate,
	errors
}) => {
	return (
		<div>
			<section className='text-lg text-contrast-500 py-3 mb-3 bg-color-indigo d-flex align-items-center justify-content-between '>
				<div className=' ml-2 text-center flex-grow'>{`Certificate ${index + 1}`}</div>
				<Tooltip title='Remove'>
					<CloseOutlined onClick={onRemove} className='widthicon' />
				</Tooltip>
			</section>
			<div className='row mt-5'>
				<div className='col-sm-12 col-md-6 required'>
					<FormItem label={`Certificate Name `}>
						<Controller
							render={({ field }) => (
								<Input
									{...field}
									placeholder='Enter Certificate Name'
									autoComplete='off'
									aria-label='Certificate Name'
									aria-describedby='Enter Certificate Name'
								/>
							)}
							name={`certificate_name[${index}].name`}
							control={control}
							rules={{
								required: 'Certificate Name is Required'
							}}
						/>
						{errors.certificates && errors.certificates[index] && <span className='text-danger px-3'>{errors.certificate_name[index].name?.message}</span>}
					</FormItem>
				</div>
				<div className='col-sm-12 col-md-6 required'>
					<FormItem label='Year of Certification' className='form-group'>
						<Controller
							render={({ field }) => (
								<Input
									{...field}
									type='date'
									placeholder='Select Year of Graduation'
									className='md-0 mb-2'
									aria-label='Year of Graduation'
									aria-describedby='Select Year of Graduation'
								/>
							)}
							name={`year_of_certificate[${index}].name`}
							control={control}
							rules={{
								required: 'Year of Certification is Required'
							}}
						/>
						{errors.year_of_certificate && errors.year_of_certificate[index] && (
							<span className='text-danger px-3'>
								{errors.year_of_certificate[index].name?.message}
							</span>
						)}
					</FormItem>
				</div>
				<div className='col-sm-12 col-md-6 required'>
					<FormItem label='School Name for certificate'>
						<Controller
							render={({ field }) => (
								<Input
									{...field}
									placeholder='Enter School Name for certificate'
									autoComplete='off'
									aria-label='School Name for certificate'
									aria-describedby='Enter School Name for certificate'
								/>
							)}
							name={`name[${index}].name`}
							control={control}
							rules={{
								required: 'School Name for certificate is Required'
							}}
						/>
						<span className='text-danger px-3'>
							{errors.certi_school_name &&
								errors.certi_school_name[index] &&
								errors.certi_school_name[index].name?.message}
						</span>
						{/* )} */}
					</FormItem>
				</div>
			</div>
			<div className='row'>
				<div className='col-sm-12 col-md-6'>
					<FormItem label='Number of Certificate (Optional)'>
						<Controller
							render={({ field }) => (
								<Input
									{...field}
									placeholder='Enter number of Certificate (Optional)'
									autoComplete='off'
									aria-label='Number of Certificate (Optional)'
									aria-describedby='Enter Number of certificate (Optional)'
								/>
							)}
							name={`num_of_certificate[${index}].name`}
							control={control}
						/>
					</FormItem>
				</div>
				<div className='col-sm-12 col-md-6 required'>
					<FormItem label='Certificate Attachment '>
						<div className={`avatar-wrapper mt-0`} key={index}>
							<ImageLoader setImage={setCertificate} />
						</div>
					</FormItem>
				</div>
			</div>
		</div>
	);
};

export default CertificateForm;
