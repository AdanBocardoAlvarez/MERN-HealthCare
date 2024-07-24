import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Table, Button, Modal, Image } from 'antd';
import { AdminApi } from '../../../../api/api';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useGetAuthor } from '../../../../hooks/Admin/useAdminConsultant';
import { useGetApi } from '../../../../hooks/Consultant/useBasicProfile';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { IBlogGet } from '../../../../interfaces/Admin/blog';
import anonymousImg from './../../../../assets/img/anonymous-400.png';
type Props = {
  state?: IBlogGet[];
  refreshData: () => void;
  Type: 'View' | 'Trash';
};

type PatientsImgProps = {
  img?: string;
};
const PatientImg = ({ img }: PatientsImgProps) => {
  if (img) {
    return <Image style={{ width: '100px' }} src={img} />;
  }

  return <Image style={{ width: '100px' }} src={anonymousImg} />;
};

const BlogTable = ({ state, refreshData, Type }: Props) => {
  const token = useSelector((state: AppState) => state.admin.Token);
  const [Author] = useGetAuthor('blog/get-author');
  const [Keywords] = useGetApi('get-keywords');
  const [deleteModal, setDeleteModal] = useState();
  const [descriptionModal, setDescriptionModal] = useState<boolean>(false);
  const [description, setDescription] = useState<string>();
  const [MultiDeleteModal, setMultiDeleteModal] = useState<boolean>(false);
  const [MultiDeleteTrashModal, setMultiDeleteTrashModal] = useState<boolean>(false);
  const [deleteModalTrash, setDeleteModalTrash] = useState();
  const [selectedRow, setSelectedRows] = useState<string[]>([]);
  const [selectedRowTrash, setSelectedRowsTrash] = useState<string[]>([]);
  const setNavigate = useNavigate();

  const onSelectChange = (selectedRowClient) => {
    setSelectedRows(selectedRowClient);
  };
  const rowSelection = {
    selectedRow,
    onChange: onSelectChange
  };
  const onSelectTrashChange = (selectedRowTrash) => {
    setSelectedRowsTrash(selectedRowTrash);
  };
  const rowSelectionTrash = {
    selectedRowTrash,
    onChange: onSelectTrashChange
  };

  function deleteTempBlog(id: string) {
    AdminApi.tempDeleteBlog(`blog/temp-delete?id=${id}`, token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          setDeleteModal(undefined);
          openNotificationWithIcon({ type: 'success', message });
          refreshData();
        } else {
          openNotificationWithIcon({ type: 'error', message: message });
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
  }
  function deleteBlog(id: string) {
    AdminApi.tempDeleteBlog(`blog/delete?id=${id}`, token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          setDeleteModal(undefined);
          openNotificationWithIcon({ type: 'success', message });
          setDeleteModalTrash(undefined);
          refreshData();
        } else {
          openNotificationWithIcon({ type: 'error', message: message });
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
  }

  function multiDelete(selectedRow: string[]) {
    AdminApi.tempDeleteBlog(`blog/temp-multi-delete?id=${selectedRow}`, token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          setDeleteModal(undefined);
          openNotificationWithIcon({ type: 'success', message });
          setMultiDeleteModal(false);
          setSelectedRows([]);
          refreshData();
        } else {
          openNotificationWithIcon({ type: 'error', message: message });
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
  }
  function MultideleteBlog(selectedRowTrash: string[]) {
    AdminApi.tempDeleteBlog(`blog/multi-delete?id=${selectedRowTrash}`, token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          setDeleteModal(undefined);
          openNotificationWithIcon({ type: 'success', message });
          setMultiDeleteTrashModal(false);
          setSelectedRowsTrash([]);
          refreshData();
        } else {
          openNotificationWithIcon({ type: 'error', message: message });
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
  }

  const activeBlog = (check, id: string) => {
    const formData = new URLSearchParams();
    check = 1 - check;
    formData.append('id', id);
    formData.append('status', check);

    AdminApi.createPost(formData, 'blog/status', token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          openNotificationWithIcon({ type: 'success', message });
          refreshData();
        } else {
          openNotificationWithIcon({ type: 'error', message: message });
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
  };

  const restoreQuote = (id: string) => {
    const formData = new URLSearchParams();
    formData.append('id', id);
    AdminApi.createPatch(formData, 'blog/restore', token)
      .then((datas) => {
        const message = datas.message;
        const success = datas.status;
        if (success) {
          openNotificationWithIcon({ type: 'success', message });
          refreshData();
        } else {
          openNotificationWithIcon({ type: 'error', message: message });
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
  };

  const BlogTable: ColumnProps<IBlogGet>[] = [
    {
      key: '_id',
      dataIndex: 'title',
      title: 'Blog Title',
      render: (title) => {
        return <strong>{title}</strong>;
      }
    },
    {
      key: '_id',
      dataIndex: 'author_name',
      title: 'Blog Author Name',
      render: (author_name) => {
        const name = Author.map((item) => item._id === author_name && item.name);
        return <strong>{name}</strong>;
      }
    },

    {
      key: '_id',
      dataIndex: 'image',
      title: 'Blog Image',
      render: (img) => <PatientImg img={img} />
    },
    {
      key: '_id',
      dataIndex: 'keywords',
      title: 'Keywords',
      render: (keywords) => {
        const matchedNames = Keywords.filter((item) => keywords.includes(item._id)).map(
          (item) => item.name
        );
        const result = matchedNames.join(', ');
        return <strong className='wrap'>{result}</strong>;
      }
    },

    {
      key: '_id',
      dataIndex: 'title',
      title: 'Description',
      render: (_id, title) => (
        <div className='buttons-list nowrap'>
          <Button
            shape='round'
            type='primary'
            onClick={() => {
              setDescriptionModal(true);
              setDescription(title.des);
            }}
          >
            View
          </Button>
        </div>
      )
    },

    {
      key: '_id',
      dataIndex: '_id',
      title: 'Actions',
      render: (_id, title) => (
        <div className='buttons-list nowrap'>
          <Button shape='round' type='primary' onClick={() => setNavigate(`../edit-blog/${_id}`)}>
            <EditFilled />
          </Button>
          <Button shape='round' type='primary' onClick={() => setDeleteModal(_id)} danger>
            <DeleteOutlined />
          </Button>
        </div>
      )
    },

    {
      key: '_id',
      dataIndex: '_id',
      title: 'Status',
      render: (_id, blog) => (
        <div className='buttons-list nowrap'>
          <Switch
            defaultChecked={blog.status === 0 ? false : true}
            onChange={() => activeBlog(blog.status, _id)}
          />
        </div>
      )
    }
  ];
  const BlogTrashTable: ColumnProps<IBlogGet>[] = [
    {
      key: '_id',
      dataIndex: 'title',
      title: 'Blog Title',
      render: (title) => {
        return <strong>{title}</strong>;
      }
    },
    {
      key: '_id',
      dataIndex: 'author_name',
      title: 'Blog Author Name',
      render: (author_name) => {
        const name = Author.map((item) => item._id === author_name && item.name);
        return <strong>{name}</strong>;
      }
    },

    {
      key: '_id',
      dataIndex: 'image',
      title: 'Blog Image',
      render: (img) => <PatientImg img={img} />
    },
    {
      key: '_id',
      dataIndex: 'keywords',
      title: 'Keywords',
      render: (keywords) => {
        const matchedNames = Keywords.filter((item) => keywords.includes(item._id)).map(
          (item) => item.name
        );
        const result = matchedNames.join(', ');
        return <strong className='wrap'>{result}</strong>;
      }
    },

    {
      key: '_id',
      dataIndex: 'title',
      title: 'Description',
      render: (_id, title) => (
        <div className='buttons-list nowrap'>
          <Button
            shape='round'
            type='primary'
            onClick={() => {
              setDescriptionModal(true);
              setDescription(title.des);
            }}
          >
            View
          </Button>
        </div>
      )
    },

    {
      key: '_id',
      dataIndex: '_id',
      title: 'Actions',
      render: (_id, title) => (
        <div className='buttons-list nowrap'>
          <Button
            shape='round'
            type='primary'
            className='restore'
            onClick={() => restoreQuote(_id)}
          >
            Restore
          </Button>
          <Button shape='round' type='primary' onClick={() => setDeleteModalTrash(_id)} danger>
            <DeleteOutlined /> Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <>
      {Type === 'View' && (
        <div className='d-flex justify-content-end align-items-center'>
          {selectedRow.length !== 0 && (
            <Button
              className='mb-3'
              shape='round'
              type='primary'
              danger
              onClick={() => setMultiDeleteModal(true)}
            >
              Delete Multiple
            </Button>
          )}
          <Button
            className='mb-3 ms-1 mx-2'
            shape='round'
            type='primary'
            danger
            onClick={() => setNavigate('/admin/view-trash-blog')}
          >
            <DeleteOutlined />
          </Button>
          <Button
            className='mb-3 ms-1 mx-2'
            shape='round'
            type='primary'
            onClick={() => setNavigate('/admin/add-blog')}
          >
            Add Blog
          </Button>
        </div>
      )}
      {Type === 'Trash' && (
        <div className='d-flex justify-content-end align-items-center'>
          {selectedRowTrash.length !== 0 && (
            <Button
              className='mb-3'
              shape='round'
              type='primary'
              danger
              onClick={() => setMultiDeleteTrashModal(true)}
            >
              Delete Multiple
            </Button>
          )}
          <Button
            className='mb-3 ms-1 mx-2'
            shape='round'
            type='primary'
            onClick={() => setNavigate('/admin/view-blog')}
          >
            View Table
          </Button>
        </div>
      )}
      {Type === 'View' && (
        <Table
          rowSelection={rowSelection}
          className='accent-header'
          rowKey='_id'
          dataSource={state}
          columns={BlogTable}
        />
      )}

      {Type === 'Trash' && (
        <Table
          rowSelection={rowSelectionTrash}
          className='accent-header'
          rowKey='_id'
          dataSource={state}
          columns={BlogTrashTable}
        />
      )}
      {/* Temp Delete Modal  */}
      <Modal
        open={deleteModal}
        footer={null}
        onCancel={() => setDeleteModal(undefined)}
        className='d-flex '
        title={<h3 className='title text-center'>Delete Blog</h3>}
      >
        <Button shape='round' type='primary' onClick={() => deleteTempBlog(deleteModal)} danger>
          Move to Bin
        </Button>
        <Button shape='round' type='primary' onClick={() => setDeleteModal(undefined)}>
          Cancel
        </Button>
      </Modal>
      {/* Temp Delete Modal  */}

      {/* Permanent Delete Modal  */}
      <Modal
        open={deleteModalTrash}
        footer={null}
        onCancel={() => setDeleteModalTrash(undefined)}
        className='d-flex '
        title={<h3 className='title text-center'>Delete Permant Blog</h3>}
      >
        <Button shape='round' type='primary' onClick={() => deleteBlog(deleteModalTrash)} danger>
          Move to Bin
        </Button>
        <Button shape='round' type='primary' onClick={() => setDeleteModalTrash(undefined)}>
          Cancel
        </Button>
      </Modal>
      {/* Permanent Delete Modal  */}
      {/* Description Modal  */}
      <Modal
        open={descriptionModal}
        footer={null}
        onCancel={() => setDescriptionModal(false)}
        className='d-flex'
        title={<h3 className='title text-center'>Description</h3>}
      >
        <span className='wrap'>{description}</span>
      </Modal>
      {/* Description Modal  */}
      {/* Multi Temp Modal  */}
      <Modal
        open={MultiDeleteModal}
        footer={null}
        onCancel={() => setMultiDeleteModal(false)}
        className='d-flex'
        title={<h4 className='title text-center'>Multiple Delete Blog</h4>}
      >
        <Button shape='round' type='primary' onClick={() => multiDelete(selectedRow)} danger>
          Move to Bin
        </Button>
        <Button shape='round' type='primary' onClick={() => setMultiDeleteModal(false)}>
          Cancel
        </Button>
      </Modal>
      {/* Multi Temp Modal  */}
      {/* Multi Per Modal  */}
      <Modal
        open={MultiDeleteTrashModal}
        footer={null}
        onCancel={() => setMultiDeleteTrashModal(false)}
        className='d-flex'
        title={<h4 className='title text-center'>Multiple Paramnent Delete Blog</h4>}
      >
        <Button
          shape='round'
          type='primary'
          onClick={() => MultideleteBlog(selectedRowTrash)}
          danger
        >
          Move to Bin
        </Button>
        <Button shape='round' type='primary' onClick={() => setMultiDeleteTrashModal(false)}>
          Cancel
        </Button>
      </Modal>
    </>
  );
};

export default BlogTable;
