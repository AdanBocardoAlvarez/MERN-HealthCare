import { UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger'
import { openNotificationWithIcon } from '../components/Toast';
import { ConsultantApi } from '../../api/api';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { useMyProfileConsultant } from '../../hooks/Consultant/useMyProfileConsultant';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';

const DocumentPage = () => {

    const { t } = useTranslation();
    const [file, setFile] = useState<File>(null)
    const [document, setDocument] = useState(null)

    const [MyProfile] = useMyProfileConsultant(`my-profile`);
    const token = useSelector((state: AppState) => state.consultant.Token);

    useEffect(() => {
        setDocument(MyProfile?.[0]?.document)
    }, [MyProfile])

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

    const submitData = data => {
        if (!file) {
            openNotificationWithIcon({ type: 'error', message: "Please select pdf file first." });
            return false;
        }

        const Formdata = new FormData();
        Formdata.append(`document`, file);
        ConsultantApi.updateDocument(Formdata, 'consultant-document', token)
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
    }



    return (
        <>
            <PageHeader title={t('auth.document-page')} subTitle={t('auth.please-fill-the-information')} />
            <div className='container'>
                <div className="row">
                    <div className="col-md-3">
                        <p className='text-dark h5 my-0'>{t('document')} <span className="text-danger">*</span></p>
                        <div className='border border-primary rounded-2' style={{ width: "80%", height: 160 }}>
                            <iframe title="Document" width={`100%`} src={`${process.env.PUBLIC_URL}/documents/Etherna_Consultant_Contract_Vhealthy.pdf`} ></iframe>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="px-3 py-2 text-center">
                            <p className="text-dark h5 mb-1"> {t('auth.please-download')} </p>
                            <a target='_blank' rel="noreferrer" href={`${process.env.PUBLIC_URL}/documents/Etherna_Consultant_Contract_Vhealthy.pdf`} className='ant-btn ant-btn-primary ant-btn-background-ghost'>{t('download')}</a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="px-3 py-2 text-center">
                            <p className='text-dark h5 my-1'>{t('auth.upload-document')}<span className="text-danger">*</span></p>
                            <p className="text-dark h6 mb-1">{t('auth.once-you-have-fill')}</p>
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

export default DocumentPage