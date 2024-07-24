import { useEffect, useState } from 'react';
import { FooterLinksSpeciality } from '../../utils/main-page-utils';
import './Scroller.css'
import { useTranslation } from 'react-i18next';

const Scroller = () => {

    const { t } = useTranslation()
    const max = FooterLinksSpeciality.length;
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => { setCurrent(cur => max > cur ? cur + 1 : 0) }, 2500);
        return () => clearInterval(interval);
    }, [max]);

    return (
        <div className="fs-4 m-0 text-center">
            <p className='me-2 fs-4 my-0 d-inline-block fw-normal'>{t('search-expert')}</p>
            <span className="text-primary text-scroller">
                {FooterLinksSpeciality?.map((row, i) => <span key={i} className={current === i ? 'animate__animated animate__fadeInDown' : 'hidden'}>{t(row?.translateKey)}</span>)}
            </span>
        </div>
    )

}

export default Scroller;
