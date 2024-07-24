import React, { useState } from 'react';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import { Button, Form, Input, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import ImageLoader from '../../../../layout/components/patients/ImageLoader';
import FormButton from '../../../components/FormButton';
import { useGetAuthor } from '../../../../hooks/Admin/useAdminConsultant';
import { IBlogGet } from '../../../../interfaces/Admin/blog';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useNavigate } from 'react-router-dom';
import { AdminApi } from '../../../../api/api';
import { useGetApi } from '../../../../hooks/Consultant/useBasicProfile';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';

const pageData: IPageData = {
  title: 'Add Blog',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Blog'
    }
  ]
};

const FormItem = Form.Item;
const Option = Select.Option;

const AddBlogPage = () => {
  const token = useSelector((state: AppState) => state.admin.Token);
  const [blogPic, setBlogPic] = useState<File | null>(null);
  const [Author] = useGetAuthor('blog/get-author');
  const [Objective] = useGetApi('get-objectives');
  const [Disorder] = useGetApi('get-disorders');
  const [Keywords] = useGetApi('get-keywords');
  const Navigate = useNavigate();

  usePageData(pageData);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<IBlogGet>();

  const submitData = (data: IBlogGet) => {
    const Formdata = new FormData();
    for (const key in data) {
      Formdata.append(key, data[key] !== undefined ? data[key] : '');
    }
    Formdata.append('image', blogPic);

    AdminApi.createPost(Formdata, 'blog/store', token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          openNotificationWithIcon({ type: 'success', message });
          reset();
          setBlogPic(null);
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
      <div className='d-flex justify-content-end align-items-center'>
        <Button
          className='mb-3 ms-1 mx-2'
          shape='round'
          type='primary'
          onClick={() => Navigate('/admin/view-blog')}
        >
          View Blog
        </Button>
      </div>

      <Form layout='vertical' onSubmitCapture={handleSubmit(submitData)}>
        <div className='row'>
          <div className='col-sm-12 col-md-6 required' style={{ position: 'relative' }}>
            <FormItem label='Blog Title'>
              <Controller
                render={({ field }) => (
                  <Input
                    placeholder='Enter Blog Title'
                    className='input'
                    type='text'
                    {...field}
                    aria-label='Blog Title'
                    aria-describedby='Enter Blog Title'
                  />
                )}
                name='title'
                control={control}
                rules={{
                  required: 'Blog Title is Required'
                }}
              />
              <span className='text-danger px-3'>{errors.title?.message}</span>
            </FormItem>
          </div>
          <div className='col-sm-12 col-md-6 required'>
            <FormItem label='Blog Author'>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder='Select Blog Author'
                    className=' md-0 mb-2 required'
                    aria-label='Blog Author '
                    aria-describedby='Select Blog Author'
                  >
                    {Author?.map((res) => (
                      <Option key={res._id} value={res._id}>
                        {res.name}
                      </Option>
                    ))}
                  </Select>
                )}
                name='author_name'
                control={control}
                rules={{
                  required: 'Blog Author is Required'
                }}
              />
              <span className='text-danger px-3'>{errors.author_name?.message}</span>
            </FormItem>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12 col-md-6 required'>
            <FormItem label='Blog Image'>
              <div className={`avatar-wrapper mt-0`}>
                <ImageLoader
                  setImage={setBlogPic}
                  alt='Blog Image'
                />
              </div>
            </FormItem>
          </div>
          <div className='col-sm-12 col-md-6 '>
            <FormItem label='Keywords'>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder='Select Keywords'
                    className='mb-2 mb-md-0 selectScroll selectMultiple'
                    // style={{overflowY:'scroll', overflowX:'hidden'}}
                    // style={{minHeight:'200px'}}
                    aria-label='Keywords'
                    aria-describedby='Select Keywords'
                    mode='multiple'
                  >
                    <Option selected value=''>
                      Select Keyword
                    </Option>
                    {Keywords?.map((res) => (
                      <Option key={res._id} value={res._id}>
                        {res.name}
                      </Option>
                    ))}
                  </Select>
                )}
                name='keywords'
                control={control}
                rules={{
                  required: false
                }}
              />
            </FormItem>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12 col-md-6 '>
            <FormItem label='Disorders'>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder='Select Disorders'
                    className='mb-2 mb-md-0 selectMultiple'
                    aria-label='Disorders '
                    aria-describedby='Select Disorders'
                    mode='multiple'
                  >
                    {Disorder?.map((res) => (
                      <Option key={res._id} value={res._id}>
                        {res.name}
                      </Option>
                    ))}
                  </Select>
                )}
                name='disorder'
                control={control}
                rules={{
                  required: false
                }}
              />
            </FormItem>
          </div>
          <div className='col-sm-12 col-md-6 '>
            <FormItem label='Objectives'>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder='Select Objectives'
                    className='mb-2 mb-md-0 selectMultiple'
                    aria-label='Objectives'
                    aria-describedby='Select Objectives'
                    mode='multiple'
                  >
                    {Objective?.map((res) => (
                      <Option key={res._id} value={res._id}>
                        {res.name}
                      </Option>
                    ))}
                  </Select>
                )}
                name='objective'
                control={control}
                rules={{
                  required: false
                }}
              />
            </FormItem>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12 col-md-6 required'>
            <FormItem label='Description'>
              <Controller
                render={({ field }) => (
                  <Input.TextArea
                    placeholder='Enter Description'
                    className='input'
                    autoSize={{ minRows: 4, maxRows: 6 }}
                    {...field}
                    aria-label='Description'
                    aria-describedby='Enter Description'
                  />
                )}
                name='des'
                control={control}
                rules={{
                  required: 'Description is Required'
                }}
              />
              <span className='text-danger px-3'>{errors.des?.message}</span>
            </FormItem>
          </div>
        </div>
        <FormButton ClearText='Clear' PrimaryText='Save' reset={reset} />
      </Form>
    </div>
  );
};

export default AddBlogPage;
