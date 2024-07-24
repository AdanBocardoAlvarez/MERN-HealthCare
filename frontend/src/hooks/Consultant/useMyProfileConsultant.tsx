import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppState } from '../../redux/store';
import { IConsultantProfile } from '../../interfaces/Consultant/consultantprofile';
import { ConsultantApi } from '../../api/api';
import {
  IComplaintTypeConsultant,
  IGetClientListConsultant,
  IGetConsultanttComplaintList
} from '../../interfaces/Consultant/consultant';
import { openNotificationWithIcon } from '../../pages/components/Toast';

export function useMyProfileConsultant(url: string): [IConsultantProfile[], React.Dispatch<any>] {
  const [state, setState] = useState<IConsultantProfile[]>([]);
  const token = useSelector((state: AppState) => state.consultant.Token);
  useEffect(() => {
    ConsultantApi.getMyProfileConsultant(url, token)
      .then((res) => {
        setState(res);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
  }, [url, token]);

  return [state, setState];
}

export function useGetClientNameConsultant(
  url: string
): [IGetClientListConsultant[], React.Dispatch<IGetClientListConsultant[]>] {
  const [state, setState] = useState<IGetClientListConsultant[]>([]);
  const token = useSelector((state: AppState) => state.consultant.Token);
  useEffect(() => {
    ConsultantApi.getComplaintClientNameList(url, token)
      .then((res) => {
        setState(res);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
  }, [url, token]);

  return [state, setState];
}

export function useGetComplaintConsultantType(
  url: string
): [IComplaintTypeConsultant[], React.Dispatch<any>] {
  const [state, setState] = useState<IComplaintTypeConsultant[]>([]);
  const token = useSelector((state: AppState) => state.consultant.Token);
  useEffect(() => {
    ConsultantApi.getComplaintTypeListConsultant(url, token)
      .then((res) => {
        setState(res);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
  }, [url, token]);

  return [state, setState];
}

export function useGetComplaintConsultantList(
  url: string
): [IGetConsultanttComplaintList[], React.Dispatch<IGetConsultanttComplaintList[]>] {
  const [state, setState] = useState<IGetConsultanttComplaintList[]>([]);
  const token = useSelector((state: AppState) => state.consultant.Token);
  useEffect(() => {
    ConsultantApi.getComplaintConsultantList(url, token)
      .then((res) => {
        if (res.length !== 0) {
          setState(res);
        } else setState([]);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
  }, [url, token]);

  return [state, setState];
}
