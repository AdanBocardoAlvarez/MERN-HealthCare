import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import { Form, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import FormButton from '../../../components/FormButton';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminApi } from '../../../../api/api';
import { IAdminPanel } from '../../../../interfaces/Admin/keyword';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';

const pageData: IPageData = {
  title: 'Edit Nationality',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Edit Nationality'
    }
  ]
};

const FormItem = Form.Item;

const EditNationalityPage = () => {
  const token = useSelector((state: AppState) => state.admin.Token);

  const { id, name } = useParams();
  const Navigate = useNavigate();

  usePageData(pageData);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<IAdminPanel>();

  const submitData = (data) => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('name', data.name);
    const formData = urlSearchParams.toString();

    AdminApi.createPatch(formData, 'nationality/edit', token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          openNotificationWithIcon({ type: 'success', message });
          Navigate('/admin/view-nationality');
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
      <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
        <div className='row'>
          <div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
            <FormItem label='Nationality'>
              <Controller
                render={({ field }) => (
                  <Input
                    placeholder='Enter Nationality'
                    className='input'
                    type='text'
                    {...field}
                    aria-label='Nationality'
                    aria-describedby='Enter Nationality'
                  />
                )}
                name='name'
                control={control}
                rules={{
                  required: 'Nationality is Required'
                }}
                defaultValue={name}
              />
              <span className='text-danger px-3'>{errors.name?.message}</span>
            </FormItem>
          </div>
        </div>
        <FormButton ClearText='Clear' PrimaryText='Save' reset={reset} />
      </Form>
    </div>
  );
};

export default EditNationalityPage;
