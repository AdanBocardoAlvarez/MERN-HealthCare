import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const WaitForApprove = () => {
    const { t } = useTranslation();
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: 300 }}>
            <h2 className="mb-5 text-dark">{t('about-us.welcome-to')} <span className="gradent-text">{t('vhealthy')}</span></h2>
            <p className="text-dark fw-bold h5 py-0 my-0">"{t('cons.please-complete-your-profile')}"</p>
            <p className="text-dark fw-bold h5 py-0 my-0">{t('cons.once-completed-and-approved')},</p>
            <p className="text-dark fw-bold h5 py-0 my-0">{t('cons.you-will-start-receiving-the-appointments')}</p>
            <div className="text-center mt-5">
                <Link to="/consultant/edit-account" className="btn btn-grad fw-normal btn-lg px-5">{t('cons.set-up-profile')}</Link>
            </div>
        </div>
    )
}

export default WaitForApprove