import { Form, Input } from 'antd';

import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IPageData } from '../../../../interfaces/page';
import { usePageData } from '../../../../hooks/usePage';
import { AdminApi } from '../../../../api/api';
import { openNotificationWithIcon } from '../../../components/Toast';
import FormButton from '../../../components/FormButton';
import { useDispatch } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { IAdminPassword } from '../../../../interfaces/Admin/consultant-change-pass';
import { resetTokenData } from '../../../../redux/token/actions';
const pageData: IPageData = {
  title: 'Change Password',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'DashBoard',
      route: 'dashboard'
    },
    {
      title: 'Change Password'
    }
  ]
};

const FormItem = Form.Item;

const ChangePasswordPage = () => {
  const token = useSelector((state: AppState) => state.admin.Token);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors }
  } = useForm<IAdminPassword>();

  usePageData(pageData);
  const SubmitData = (data: IAdminPassword) => {
    const Formdata = new URLSearchParams();
    for (const key in data) {
      Formdata.append(key, data[key] || '');
    }
    AdminApi.changePassword(Formdata, 'setting/change-password', token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          openNotificationWithIcon({ type: 'success', message });
          dispatch(resetTokenData());
          Navigate('/public/sign-in');
          reset();
        } else {
          openNotificationWithIcon({ type: 'error', message: message });
          reset();
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
        reset();
      });
  };
  return (
    <div className='stack'>
      <Form
        layout='vertical'
        className='d-flex flex-column'
        onSubmitCapture={handleSubmit(SubmitData)}
      >
        <div className='col-sm-12 col-md-6 mx-auto required'>
          <FormItem label='Current Password'>
            <Controller
              render={({ field }) => (
                <Input.Password
                  {...field}
                  maxLength={10}
                  placeholder='Enter Current Password'
                  autoComplete='off'
                  aria-label='Current Password'
                  aria-describedby='Enter Current Password'
                />
              )}
              name='current_password'
              control={control}
              rules={{
                required: 'Current Password is Required'
              }}
            />
            <span className='text-danger mb'>{errors.current_password?.message}</span>{' '}
          </FormItem>
        </div>
        <div className='col-sm-12 col-md-6 mx-auto required'>
          <FormItem label='New Password'>
            <Controller
              render={({ field }) => (
                <Input.Password
                  {...field}
                  maxLength={10}
                  placeholder='Enter New Password'
                  autoComplete='off'
                  aria-label='New Password'
                  aria-describedby='Enter New Password'
                />
              )}
              name='new_password'
              control={control}
              rules={{
                required: 'New Password is Required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long.'
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/,
                  message:
                    'Password must contain at least 1 capital letter, 1 small letter, 1 special character, and 1 number *'
                }
              }}
            />
            <span className='text-danger mb'>{errors.new_password?.message}</span>{' '}
          </FormItem>
        </div>
        <div className='col-sm-12 col-md-6 mx-auto'>
          <FormItem label='Confirm Password'>
            <Controller
              render={({ field }) => (
                <Input.Password
                  {...field}
                  maxLength={10}
                  placeholder='Enter Confirm Password'
                  autoComplete='off'
                  aria-label='Confirm Password'
                  aria-describedby='Enter Confirm Password'
                />
              )}
              name='confirm_password'
              control={control}
              rules={{
                required: 'Confirm Password is Required',
                validate: (val) => {
                  if (watch('new_password') !== val) {
                    return 'Your passwords do no match';
                  }
                }
              }}
            />
            <span className='text-danger mb'>{errors.confirm_password?.message}</span>{' '}
          </FormItem>
        </div>
        <FormButton reset={reset} ClearText='Clear' PrimaryText='Save' />
      </Form>
    </div>
  );
};

export default ChangePasswordPage;
