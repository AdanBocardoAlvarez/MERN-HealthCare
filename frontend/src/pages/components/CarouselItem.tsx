import { Link, useLocation } from 'react-router-dom';
import { ICourselList } from '../../interfaces/main-page';
const CarouselItem = ({
    TopText,
    HeadingText,
    Content,
    link,
    subContent,
    ImageList,
    list
}: ICourselList) => {
    const location = useLocation();
    const LocationUrl = location.pathname;
    return (
        <section className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h2 className='label-bnr my-3 fs-5'>{TopText}</h2>
                </div>
            </div>
            <div className='row first-banner'>
                <div className='creative col-xl-6 col-lg-6 col-md-12'>
                    <h3 className='slider__headingtext'>{HeadingText}</h3>
                    <p className='slider__content p-0 mt-2' dangerouslySetInnerHTML={{ __html: Content }}></p>
                    <p className='slider__content p-0 mt-2' dangerouslySetInnerHTML={{ __html: subContent }}></p>
                    {!!list && list.length > 0 && <ul className='slider__content m-0 p-0'>{list.map((data, id) => <li key={id}>{data}</li>)}</ul>}
                    <Link className='read_more mt-2' to={link}>{LocationUrl === '/fr' ? 'En savoir plus' : 'Read More'}</Link>
                </div>
                {ImageList.map((data, id) =>
                    <div key={id} className='col-xl-3 col-lg-3 col-md-6 bnr-img mt-5'>
                        <img src={data} className='object-fit-cover mt-5' style={{ width: '300px', height: '200px' }} alt="" />
                    </div>
                )}
            </div>
        </section>
    );
};

export default CarouselItem;
