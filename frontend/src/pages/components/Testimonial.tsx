import { ITestimonialList } from '../../interfaces/main-page';
const Testimonial = ({ Heading, age, country, profession, Content, image }: ITestimonialList) => {
    return (
        <section className='container mx-5 mx-auto'>
            <div className='row justify-content-center text-center'>
                <div className='col-md-3 col-sm-12'>
                    <div className='d-flex flex-column justify-content-center align-items-center '>
                        <img
                            src={image}
                            alt={Heading}
                            width={'200px'}
                            height={'200px'}
                            style={{ objectFit: 'cover', borderRadius: '50%' }}
                        />
                        <div className='h4'>{Heading}</div>
                        <span>{age}</span>
                        <div dangerouslySetInnerHTML={{ __html: profession }}></div>
                        <div>{country}</div>
                    </div>
                </div>
                <div className='test-box text-left col-md-9 col-sm-12'>
                    <p className='m-0' style={{ fontSize: '12px' }}>
                        {Content}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
