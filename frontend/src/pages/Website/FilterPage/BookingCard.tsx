import { Tabs } from 'antd';
import './Filter.css';
import { useNavigate } from 'react-router-dom';
import { convertTo12HourFormat, encryptString, formatDateDDMMYYYY } from '../../../utils/helper';
import { useTranslation } from 'react-i18next';

const BookingCard = (props) => {

    const { t } = useTranslation();
    const navigate = useNavigate()
    const { _id, timezone = "Europe/Paris", consultantTimeSlot } = props;

    const bookMe = async (date) => {
        let message = JSON.stringify({
            consultant_id: _id,
            bookingDate: date,
        });

        const token = await encryptString(message);
        navigate(`/booking/${token}`)
    }

    const items = consultantTimeSlot.map((data, i) => {
        let shifts = ['morning', 'noon', 'afternoon', 'evening', 'night'];
        return ({
            key: i.toString(),
            label: t(`days.${data?.day}`.toLowerCase()),
            children: <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center border-bottom">
                        <p className="mb-0 text-muted fs-5">{formatDateDDMMYYYY(data?.DateList)}</p>
                        <p className="mb-0 text-muted fs-5">{t('time-zone')} : {timezone}</p>
                    </div>
                </div>
                <div className="col-12">
                    {shifts.map((shift, j) => <div key={j} className='row py-2 border-bottom'>
                        <div className='col-lg-2 col-sm-12'>
                            <p className="my-0 py-0 fs-6 text-capitalize fw-bold">{t(`shifts.${shift}`)} :</p>
                        </div>
                        <div className='col-lg-10 col-sm-12'>
                            <div className='d-flex align-content-center flex-wrap' style={{ gap: '10px' }}>
                                {data[shift]?.map((hour: string, k: number) => <button key={k} className='btn btn-sm btn-pink rounded-4 fs-6' onClick={() => bookMe(`${data?.DateList}T${hour}`)}>{convertTo12HourFormat(hour)}</button>)}
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        })
    })

    return (
        <div className="border-top my-3">
            <Tabs className='doc__section_' defaultActiveKey="0" items={items} />
        </div>
    );
};

export default BookingCard;
