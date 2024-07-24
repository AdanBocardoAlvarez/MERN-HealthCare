import { Link } from 'react-router-dom';
import './style.css';
const Pricing = ({
    btnTitle,
    link,
    image,
    content,
}: {
    btnTitle: string;
    link: string;
    image: string;
    content: string;
}) => {
    return (
        <div className=' text-center joinus mb-4'>
            <div className='our-pricing'>
                <div className='our-pri text-white'>
                    <div className='text-center m-0 py-2 px-1'>
                        <p className='m-0 p-0'>{content}</p>
                    </div>
                    <img src={image} className='w-100 object-fit-contain' alt=''></img>
                </div>
            </div>

            <Link to={link} className='read_more read'>{btnTitle}</Link>
        </div>
    );
};

export default Pricing;
