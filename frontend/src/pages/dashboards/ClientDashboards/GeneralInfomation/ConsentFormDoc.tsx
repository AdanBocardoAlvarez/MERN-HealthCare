import { useEffect, useState } from 'react'
import Dragger from 'antd/es/upload/Dragger';
import { UploadProps } from 'antd';
import { ClientApi } from '../../../../api/api';
import { AppState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../../components/PageHeader';

const ConsentFormDoc = () => {

    const { t } = useTranslation();
    const [document, setDocument] = useState(null)
    const [file, setFile] = useState<File>(null)

    const token = useSelector((state: AppState) => state.client.Token);

    useEffect(() => {
        (async () => {
            await ClientApi.getMyProfile('get-client-basic-details', token).then(async (data) => {
                setDocument(data?.consent_form);
            }).catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
        })();
    }, [token]);

    const props: UploadProps = {
        name: 'file',
        style: { height: 200 },
        multiple: false,
        accept: ".pdf",
        beforeUpload: (file) => {
            setFile(file);
            return false;
        },
    };

    const submitData = async (data) => {
        if (!file) {
            openNotificationWithIcon({ type: 'error', message: "Please select pdf file first." });
            return false;
        }

        const Formdata = new FormData();
        Formdata.append(`document`, file);
        ClientApi.updateDocument(Formdata, 'doc-consent-form', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    setDocument(datas?.data);
                    openNotificationWithIcon({ type: 'success', message })
                } else {
                    openNotificationWithIcon({ type: 'error', message: message })
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err?.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };

    return (
        <>
            <PageHeader title={t('cnt.consent-form')} subTitle={t('cnt.kindly-fill-and-upload-the-consent-form')} />

            <div className='container'>
                <div className="row">
                    <div className="col-md-3">
                        <p className='text-dark h5 my-0'>{t('document')} <span className="text-danger">*</span></p>
                        <div className='border border-primary rounded-2' style={{ width: "80%", height: 160 }}>
                            <iframe title={t('document')} width={`100%`} src={`${process.env.PUBLIC_URL}/documents/Consent form - Client.pdf`} ></iframe>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="px-3 py-2 text-center">
                            <p className="text-dark h5 mb-1"> {t('auth.please-download')} </p>
                            <a target='_blank' rel="noreferrer" href={`${process.env.PUBLIC_URL}/documents/Consent form - Client.pdf`} className='ant-btn ant-btn-primary ant-btn-background-ghost'>{t('download')}</a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="px-3 py-2 text-center">
                            <p className='text-dark h5 my-1'>{t('auth.upload-document')} <span className="text-danger">*</span></p>
                            <p className="text-dark h6 mb-1"> {t('auth.once-you-have-fill')} </p>
                            <div className="d-flex gap-2 justify-content-center">
                                {document && <a href={`${process.env.REACT_APP_API_BASE_URL}${document}`} target='_blank' rel="noreferrer" className='ant-btn ant-btn-primary ant-btn-background-ghost'>{t('download')}</a>}
                                <button onClick={submitData} className='ant-btn ant-btn-primary ant-btn-background-ghost'>{t('upload')}</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <Dragger {...props}>
                            <p className="ant-upload-text mb-0 h5">{t('select-from')}</p>
                            <p className="ant-upload-hint h5 text-primary">{t('browser')}</p>
                        </Dragger>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConsentFormDoc