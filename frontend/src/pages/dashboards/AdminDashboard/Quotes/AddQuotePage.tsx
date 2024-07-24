import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import { Button, Form, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import FormButton from '../../../components/FormButton';
import { IQuote } from '../../../../interfaces/Admin/quote';
import { AdminApi } from '../../../../api/api';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../../../redux/store';
import { useSelector } from 'react-redux';

const pageData: IPageData = {
  title: 'Add Quotes',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Quotes'
    }
  ]
};

const FormItem = Form.Item;
const AddQuotePage = () => {
  const token = useSelector((state: AppState) => state.admin.Token);
  const Navigate = useNavigate();
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

    const formData = urlSearchParams.toString();

    AdminApi.createPost(formData, 'quote/store', token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          openNotificationWithIcon({ type: 'success', message });

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
  function setNavigate(nav) {
    Navigate(`${nav}`);
  }

  return (
    <div className='stack'>
      <div className='d-flex justify-content-end align-items-center'>
        <Button
          className='mb-3 ms-1 mx-2'
          shape='round'
          type='primary'
          onClick={() => setNavigate('/admin/view-quote')}
        >
          View Quote
        </Button>
      </div>
      <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
        <div className='row'>
          <div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
            <FormItem label='Quote'>
              <Controller
                render={({ field }) => (
                  <Input
                    placeholder='Enter Quote'
                    className='input'
                    type='text'
                    {...field}
                    aria-label='Quote'
                    aria-describedby='Enter Quote'
                  />
                )}
                name='quote_title'
                control={control}
                rules={{
                  required: 'quote is Required'
                }}
              />
              <span className='text-danger px-3'>{errors.quote_title?.message}</span>
            </FormItem>
          </div>
          <div className='col-sm-12 col-md-6 required'>
            <FormItem label='Author Name'>
              <Controller
                render={({ field }) => (
                  <Input
                    placeholder='Enter Author Name'
                    className='input'
                    type='text'
                    {...field}
                    aria-label='Author Name'
                    aria-describedby='Enter Author Name'
                  />
                )}
                name='author_name'
                control={control}
                rules={{
                  required: 'quote author is Required'
                }}
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

export default AddQuotePage;
