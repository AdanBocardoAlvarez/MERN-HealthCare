import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import { Form, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import FormButton from '../../../components/FormButton';
import { IQuote } from '../../../../interfaces/Admin/quote';
import { AdminApi } from '../../../../api/api';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';

const pageData: IPageData = {
  title: 'Edit Quotes',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Edit Quotes'
    }
  ]
};

const FormItem = Form.Item;

const EditQuotePage = () => {
  const token = useSelector((state: AppState) => state.admin.Token);
  const Navigate = useNavigate();
  const { id } = useParams();
  const { author_name } = useParams();
  const { quote_title } = useParams();

  usePageData(pageData);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<IQuote>();

  const submitData = (data) => {
    const urlSearchParams = new URLSearchParams();

    for (const key in data) {
      urlSearchParams.append(key, data[key]);
    }
    urlSearchParams.append('id', id);
    const formData = urlSearchParams.toString();

    AdminApi.createPatch(formData, 'quote/edit', token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          openNotificationWithIcon({ type: 'success', message });
          Navigate('/admin/view-quote');
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
            <FormItem label='Quote'>
              <Controller
                render={({ field }) => (
                  <Input
                    placeholder='Edit Quote'
                    className='input'
                    type='text'
                    {...field}
                    aria-label='Quote'
                    aria-describedby='Edit Quote'
                  />
                )}
                name='quote_title'
                control={control}
                rules={{
                  required: 'quote is Required'
                }}
                defaultValue={quote_title}
              />

              <span className='text-danger px-3'>{errors.quote_title?.message}</span>
            </FormItem>
          </div>
          <div className='col-sm-12 col-md-6 required'>
            <FormItem label='Author Name'>
              <Controller
                render={({ field }) => (
                  <Input
                    placeholder='Edit Author Name'
                    className='input'
                    type='text'
                    {...field}
                    aria-label='Author Name'
                    aria-describedby='Edit Author Name'
                  />
                )}
                name='author_name'
                control={control}
                rules={{
                  required: 'quote author is Required'
                }}
                defaultValue={author_name}
              />
              <span className='text-danger px-3'>{errors.author_name?.message}</span>
            </FormItem>
          </div>
        </div>

        <FormButton ClearText='Clear' PrimaryText='Save' reset={reset} />
      </Form>
    </div>
  );
};

export default EditQuotePage;
