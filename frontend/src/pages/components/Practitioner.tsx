import { Card } from 'antd';
import './style.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Practitioner = ({ title, text, image, heading }) => {
    const { t } = useTranslation();
    return (
        <Card className='card-practitioner' hoverable classNames={{ body: 'h-100' }}>
            <div className='d-flex justify-content-center flex-column align-items-center  w-100 px-3 mb-5 gap-3'>
                <h3 aria-label={title} className='fs-5 fw-bold'>{title}</h3>
                <img className='img-fluid w-50' src={image} alt={title} />
                <div
                    aria-label={text}
                    className=' pt-2 pb-2 card__practitioner__text'
                    style={{ fontSize: '14px', textAlign: 'justify' }}
                >
                    <span style={{ fontWeight: 'bold' }}>{heading}</span> {text}
                </div>
                <Link to="/" className='read_more'>{t('read-more')}</Link>
            </div>
        </Card>
    );
};

export default Practitioner;
