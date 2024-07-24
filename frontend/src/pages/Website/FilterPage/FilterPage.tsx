import { useState, useEffect } from 'react';
import { Form, Modal, Button, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import DoctorCard from './DoctorCard';
import Header from '../../../layout/website/Header/Header';
import Footer from '../../../layout/website/Footer/Footer';
import './Filter.css';
import { ClientApi } from '../../../api/api';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetApi } from '../../../hooks/Consultant/useBasicProfile';
import { SearchOutlined } from '@ant-design/icons';
import { decodeSlug } from '../../../utils/helper';
import { useTranslation } from 'react-i18next';

const FormItem = Form.Item;
const Option = Select.Option;

const FilterPage = () => {

    const { t } = useTranslation();
    const [consultant, setConsultant] = useState([]);
    const [currPage, setCurrPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [isLoad, setIsLoad] = useState(false);
    const [searchParams] = useSearchParams();
    const [showModal, setShowModal] = useState(false)

    const { handleSubmit, control, reset } = useForm();

    const [Language] = useGetApi('get-languages');
    const [Specialization] = useGetApi('get-specialization');
    const [Disorder] = useGetApi('get-disorders');
    const [Objective] = useGetApi('get-objectives');

    type IfilterQuery = {
        keywords?: string[],
        disorders?: string[],
        objectives?: string[],
        search?: string,
        page?: number
    }

    const { search } = useParams();

    let keywords = searchParams.get("keywords"),
        disorders = searchParams.get("disorders"),
        objectives = searchParams.get("objectives");

    const filter = (data = {}) => {
        setIsLoad(false);
        ClientApi.getConsultantFilter(`get-consultant-filter`, data)
            .then((res) => {
                setMaxPage(Math.ceil(res.find(() => true).totalCount / 10));
                setConsultant(res);
                setShowModal(false);
                setIsLoad(true)
            })
            .catch((err) => {
                setMaxPage(1);
                setConsultant([]);
                setShowModal(false);
                setIsLoad(true)
            });
    };

    useEffect(() => {
        if (searchParams.get("page") && parseInt(searchParams.get("page"))) {
            setCurrPage(parseInt(searchParams.get("page")));
        }
    }, [searchParams])

    useEffect(() => {
        let filterQuery: IfilterQuery = {
            keywords: keywords ? [keywords] : [],
            disorders: disorders ? [disorders] : [],
            objectives: objectives ? [objectives] : [],
            search: search ? decodeSlug(search) : null,
            page: currPage ? currPage : 1
        }

        reset(filterQuery)
        filter(filterQuery);
    }, [keywords, disorders, objectives, search, currPage, reset]);

    const pageChange = (type) => {
        if (type === '-') {
            if (currPage > 1) setCurrPage(currPage - 1)
        } else {
            if (currPage < maxPage) setCurrPage(currPage + 1)
        }
    }

    return (
        <>
            <Header />
            <div className='container mt-5 filter' style={{ minHeight: '100rem' }}>
                <div className='text-center mb-5'>
                    <h1 className='text-dark mb-3 fs-2'>{t('header.our-experts')}</h1>
                    <button className='btn btn-secondary px-5' onClick={() => setShowModal(true)}>{t('add-preference')}</button>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-lg-10 col-md-12 d-flex flex-column' style={{ gap: '20px' }}>
                        {!isLoad ? <h2 className='text-center h4'>{t('loading')}</h2> : consultant?.map((data) => <DoctorCard key={data._id} {...data} />)}
                        {consultant?.length === 0 && isLoad && <h4 className="text-danger text-center">{t('no-record')}.</h4>}
                        {isLoad && (maxPage > 1) && <div className="d-flex justify-content-around">
                            <button disabled={currPage <= 1} onClick={() => pageChange('-')} className="btn btn-primary">{t('previous')}</button>
                            <button disabled={currPage >= maxPage} onClick={() => pageChange('+')} className="btn btn-primary">{t('next')}</button>
                        </div>}
                    </div>
                </div>
            </div>
            <Footer />

            <Modal className='filters ' open={showModal} onOk={() => null} onCancel={() => setShowModal(false)} footer={[
                <Button icon={<SearchOutlined />} key="submit" htmlType='submit' form='myFilter' ghost type="primary" loading={!isLoad}>
                    {t('search')}
                </Button>,
                <Button key="back" onClick={() => {
                    reset();
                    setShowModal(false);
                }}> {t('cancel')}</Button>
            ]} centered title={<div>
                <h4 className='my-0 py-0 text-center'>{t('add-preference')}</h4>
                <p className='my-0 py-0 text-center fw-normal'>{t('please-fill-information')}</p>
            </div>}>
                <Form layout='vertical' id='myFilter' className='w-100' onSubmitCapture={handleSubmit(filter)}>
                    <FormItem className='w-100' label={t('language')}>
                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder={`${t('select')} ${t('language')}`}
                                    className='mb-2 mb-md-0'
                                    aria-label={t('language')}
                                    aria-describedby={`${t('select')} ${t('language')}`}
                                    mode='multiple'
                                >
                                    {Language?.map((res) => (
                                        <Option key={res._id} value={res._id}>{res.name} </Option>
                                    ))}
                                </Select>
                            )}
                            name='languages'
                            control={control}
                        />
                    </FormItem>
                    <FormItem label={t('specialisation')}>
                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder={`${t('select')} ${t('specialisation')}`}
                                    className='mb-2 mb-md-0'
                                    aria-label={t('specialisation')}
                                    aria-describedby={`${t('select')} ${t('specialisation')}`}
                                    mode='multiple'
                                >
                                    {Specialization?.map((res) => (
                                        <Option key={res._id} value={res._id}> {res.name}</Option>
                                    ))}
                                </Select>
                            )}
                            name='specialization'
                            control={control}
                        />
                    </FormItem>
                    <FormItem label={t('disorders')}>
                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder={`${t('select')} ${t('disorders')}`}
                                    className='mb-2 mb-md-0'
                                    aria-label={t('disorders')}
                                    aria-describedby={`${t('select')} ${t('disorders')}`}
                                    mode='multiple'
                                >
                                    {Disorder?.map((res) => (
                                        <Option key={res._id} value={res._id}>
                                            {res.name}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                            name='disorders'
                            control={control}
                        />
                    </FormItem>
                    <FormItem label={t('footer.objectives')}>
                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder={`${t('select')} ${t('objectives')}`}
                                    className='mb-2 mb-md-0'
                                    aria-label={t('footer.objectives')}
                                    aria-describedby={`${t('select')} ${t('objectives')}`}
                                    mode='multiple'
                                >
                                    {Objective?.map((res) => (
                                        <Option key={res._id} value={res._id}>
                                            {res.name}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                            name='objectives'
                            control={control}
                        />
                    </FormItem>
                </Form>
            </Modal>
        </>
    );
};


export default FilterPage;
