import { Controller, useForm } from 'react-hook-form';
import { Form, Select } from 'antd';
import FormButton from '../../../components/FormButton';
import { AfterNoonOptions, NoonOptions, EveningOptions, MorningOptions, NightOptions } from '../../../../utils/timing';
import { ConsultantApi } from '../../../../api/api';
import { openNotificationWithIcon } from '../../../components/Toast';
import { ConsultantTiming } from '../../../../interfaces/Consultant/consultant-step1';
import FormCheckBox from '../../../components/FormCheckBox';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import PageHeader from '../../../components/PageHeader';

type Props = {};
interface DaysProps {
    key: number;
    value: string;
    label: string;
}
const Option = Select.Option;
const FormItem = Form.Item;

const Days: DaysProps[] = [
    {
        key: 1,
        value: 'Sunday',
        label: 'Sunday'
    },
    {
        key: 2,
        value: 'Monday',
        label: 'Monday'
    },
    {
        key: 3,
        value: 'Tuesday',
        label: 'Tuesday'
    },
    {
        key: 4,
        value: 'Wednesday',
        label: 'Wednesday'
    },
    {
        key: 5,
        value: 'Thursday',
        label: 'Thursday'
    },
    {
        key: 6,
        value: 'Friday',
        label: 'Friday'
    },
    {
        key: 7,
        value: 'Saturday',
        label: 'Saturday'
    }
];

const AddTimingPage = (props: Props) => {
    const token = useSelector((state: AppState) => state.consultant.Token);
    const [slotData, setSlotData] = useState({
        Sunday: { day: "Sunday", morning: [], noon: [], afternoon: [], evening: [], night: [] },
        Monday: { day: "Monday", morning: [], noon: [], afternoon: [], evening: [], night: [] },
        Tuesday: { day: "Tuesday", morning: [], noon: [], afternoon: [], evening: [], night: [] },
        Wednesday: { day: "Wednesday", morning: [], noon: [], afternoon: [], evening: [], night: [] },
        Thursday: { day: "Thursday", morning: [], noon: [], afternoon: [], evening: [], night: [] },
        Friday: { day: "Friday", morning: [], noon: [], afternoon: [], evening: [], night: [] },
        Saturday: { day: "Saturday", morning: [], noon: [], afternoon: [], evening: [], night: [] },
    })

    const { handleSubmit, control, reset, formState: { errors } } = useForm<ConsultantTiming>();

    const submitData = async (data: ConsultantTiming) => {
        const resultData = {
            Day: data.day,
            TimeSlot: [{ ...data }]
        };
        ConsultantApi.createTiming(resultData, 'consultant-time-slot', token)
            .then((data) => {
                ConsultantApi.getTimeSlot('consultant-time-slot', token).then((data) => { data && setSlotData(data) }).catch()
                openNotificationWithIcon({ type: 'success', message: data.message });
            })
            .catch((err) => { openNotificationWithIcon({ type: 'error', message: err.response?.data?.message || err.message }); });
    };

    useEffect(() => {
        (async () => {
            ConsultantApi.getTimeSlot('consultant-time-slot', token)
                .then((data) => { data && setSlotData(data); })
                .catch((err) => {
                    openNotificationWithIcon({ type: 'error', message: err.response?.data?.message || err.message });
                });
        })()
    }, [token])

    return (
        <>
            <PageHeader title={t('cons.timings')} />
            <div className='stack'>
                <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <label style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>
                                {t('day')}
                            </label>
                            <FormItem>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field} placeholder={`${t('select')} ${t('day')}`} className='mb-2 mb-md-0' onChange={(value) => { reset(slotData[value]) }}>
                                            {Days.map((data) => <Option key={data.key} value={data.value}>{data.label}</Option>)}
                                        </Select>
                                    )}
                                    name='day'
                                    control={control}
                                    rules={{ required: 'Please select day.' }}
                                />
                                <span className='text-danger'>{errors.day?.message}</span>
                            </FormItem>
                        </div>
                    </div>
                    <div className='row d-flex  align-items-center '>
                        <div className='d-flex flex-column'>
                            {/* <div className='text-center h3' style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                {t('cons.timings')}
                            </div> */}
                            <div className='col-12'>
                                <FormCheckBox
                                    label={t('cons.morning-timings')}
                                    ariaLabel={`${t('select')} ${t('cons.morning-timings')}`}
                                    control={control}
                                    options={MorningOptions}
                                    name={'morning'}
                                    error={errors.morning?.message}
                                />
                                <FormCheckBox
                                    label={t('cons.noon-timings')}
                                    ariaLabel={`${t('select')} ${t('cons.noon-timings')}`}
                                    control={control}
                                    options={NoonOptions}
                                    name={'noon'}
                                    error={errors.noon?.message}
                                />
                                <FormCheckBox
                                    label={t('cons.afternoon-timings')}
                                    ariaLabel={`${t('select')} ${t('cons.afternoon-timings')}`}
                                    control={control}
                                    options={AfterNoonOptions}
                                    name={'afternoon'}
                                    error={errors.afternoon?.message}
                                />
                                <FormCheckBox
                                    label={t('cons.evening-timings')}
                                    ariaLabel={`${t('select')} ${t('cons.evening-timings')}`}
                                    control={control}
                                    options={EveningOptions}
                                    name={'evening'}
                                    error={errors.evening?.message}
                                />
                                <FormCheckBox
                                    label={t('cons.night-timings')}
                                    ariaLabel={`${t('select')} ${t('cons.night-timings')}`}
                                    control={control}
                                    options={NightOptions}
                                    name={'night'}
                                    error={errors.night?.message}
                                />
                            </div>
                        </div>
                    </div>
                    <FormButton reset={reset} ClearText={t('clear')} isShown PrimaryText={t('save')} />
                </Form>
            </div>
        </>
    );
};

export default AddTimingPage;
