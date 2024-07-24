import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Table, Button, Modal, Checkbox } from 'antd';
import { AdminApi } from '../../../../api/api';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { DeleteOutlined } from '@ant-design/icons';
import { IAdminPanel } from '../../../../interfaces/Admin/keyword';

type Props = {
  viewKeywords?: IAdminPanel[];
};

const KeywordsTable = ({ viewKeywords }: Props) => {
  const token = useSelector((state: AppState) => state.admin.Token);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [visibleModal, setVisibleModal] = useState();
  const [multipleSelect, setMultipleSelect] = useState([]);
  const [keywords, setkeywords] = useState([]);
  const iddd = viewKeywords.map((item) => item._id);
  const [multiCheckFlag, setMultiCheckFlag] = useState(false);
  const [visibleModalMulti, setVisibleModalMulti] = useState([]);
  const [checked, setChecked] = useState(true);
  const [status, setStatus] = useState({
    status: 1,
    id: ''
  });

  useEffect(() => {
    setkeywords(viewKeywords);
  }, [viewKeywords]);

  const handleCancel = () => {
    setVisibleModal(undefined);
  };

  const handleCancel3 = () => {
    setVisibleModalMulti([]);
  };
  const Navigate = useNavigate();

  function editKeywords(id, title) {
    const url = `/admin/edit-keywords/${id}/${title.name}`;
    Navigate(url);
  }

  function deleteTempKeywords(id: string) {
    AdminApi.tempDeleteBlog(`keywords/temp-delete?id=${id}`, token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          setVisibleModal(undefined);
          openNotificationWithIcon({ type: 'success', message });
          setkeywords((prevKeywords) => prevKeywords.filter((keywords) => keywords._id !== id));
        } else {
          openNotificationWithIcon({ type: 'error', message: message });
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
  }

  function deleteMultiKeywords(id: string[]) {
    AdminApi.tempDeleteBlog(`keywords/temp-multi-delete?id=${id}`, token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          setVisibleModalMulti([]);
          openNotificationWithIcon({ type: 'success', message });
          setkeywords((prevKeywords) =>
            prevKeywords.filter((keywords) => !id.includes(keywords._id))
          );
          setMultipleSelect([]);
        } else {
          openNotificationWithIcon({ type: 'error', message: message });
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
  }

  function selectKeywords(id, flag) {
    if (JSON.stringify(multipleSelect) === JSON.stringify(id) && flag === 'all') {
      multipleSelect.length = 0;
      setMultiCheckFlag(false);
    } else if (flag === 'multi') {
      setMultiCheckFlag(false);
      setMultipleSelect((prev) => {
        if (prev.includes(id)) {
          return prev.filter((item) => item !== id);
        } else {
          return [...prev, id];
        }
      });
    } else if (multipleSelect.length === 0) {
      setMultiCheckFlag(true);
      setMultipleSelect(id);
    } else {
      setMultiCheckFlag(true);
      setMultipleSelect(id);
    }
  }

  function setNavigate(nav) {
    Navigate(`${nav}`);
  }

  const activeKeywords = (check: boolean, id) => {
    AdminApi.getQuotesList('keywords/index', token)
      .then((datas) => {
        const result = datas.find((item) => item._id === id);
        if (result) {
          const statu = result.status;
          setChecked(check);
          setStatus({
            status: statu === 0 ? 1 : 0,
            id: id
          });
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
  };

  useEffect(() => {
    if (!isFirstRender && status.id) {
      const urlSearchParams = new URLSearchParams();
      for (const key in status) {
        urlSearchParams.append(key, status[key]);
      }
      const formData = urlSearchParams.toString();
      AdminApi.createPost(formData, 'keywords/status', token).then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          openNotificationWithIcon({ type: 'success', message });
        } else {
          openNotificationWithIcon({ type: 'error', message: message });
        }
      });
    } else {
      setIsFirstRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, status, token]);

  const columns: ColumnProps<IAdminPanel>[] = [
    // {
    //   key: '_id',
    //   dataIndex: '_id',
    //   title: 'Select',
    //   render: (_id) => {
    //     return <Checkbox onChange={() => selectBlog(_id)} />;
    //   }
    // },
    {
      key: '_id',
      dataIndex: '_id',
      title: <Checkbox onChange={() => selectKeywords(iddd, 'all')} checked={multiCheckFlag} />,
      render: (_id) => {
        return (
          <Checkbox
            onChange={() => selectKeywords(_id, 'multi')}
            checked={
              multiCheckFlag
                ? multiCheckFlag
                : multipleSelect.find((item) => (item === _id ? true : false))
            }
          />
        );
      }
    },
    {
      key: '_id',
      dataIndex: 'name',
      title: 'Keywords',
      render: (name) => {
        return <strong>{name}</strong>;
      }
    },

    {
      key: '_id',
      dataIndex: '_id',
      title: 'Actions',
      render: (_id, title) => (
        <div className='buttons-list nowrap'>
          <Button shape='round' type='primary' onClick={() => editKeywords(_id, title)}>
            Edit
          </Button>
          <Button shape='round' type='primary' onClick={() => setVisibleModal(_id)} danger>
            <DeleteOutlined />
          </Button>
        </div>
      )
    },
    {
      key: '_id',
      dataIndex: '_id',
      title: 'Status',
      render: (_id, keywords) => {
        return (
          <div className='buttons-list nowrap'>
            <Switch
              defaultChecked={keywords.status === 0 ? false : true}
              onChange={() => activeKeywords(!checked, _id)}
            />
          </div>
        );
      }
    }
  ];

  //   const pagination = myBooking.length <= 10 ? false : {};

  return (
    <>
      <div className='d-flex justify-content-end align-items-center'>
        {multipleSelect.length > 0 && (
          <Button
            className='mb-3'
            shape='round'
            type='primary'
            danger
            onClick={() => setVisibleModalMulti(multipleSelect)}
          >
            Delete Multiple
          </Button>
        )}
        <Button
          className='mb-3 ms-1 mx-2'
          shape='round'
          type='primary'
          danger
          onClick={() => setNavigate('/admin/view-trash-keywords')}
        >
          <DeleteOutlined />
        </Button>
        <Button
          className='mb-3 ms-1 mx-2'
          shape='round'
          type='primary'
          onClick={() => setNavigate('/admin/add-keyword')}
        >
          Add Keywords
        </Button>
      </div>
      <Table
        // pagination={pagination}
        className='accent-header'
        rowKey='_id'
        dataSource={keywords}
        columns={columns}
      />

      <Modal
        open={visibleModal}
        footer={null}
        onCancel={handleCancel}
        className='d-flex '
        title={<h3 className='title text-center'>Delete Keywords</h3>}
      >
        <Button
          shape='round'
          type='primary'
          onClick={() => deleteTempKeywords(visibleModal)}
          danger
        >
          Move to Bin
        </Button>
        <Button shape='round' type='primary' onClick={() => setVisibleModal(undefined)}>
          Cancel
        </Button>
      </Modal>

      <Modal
        open={visibleModalMulti.length > 0}
        footer={null}
        onCancel={handleCancel3}
        className='d-flex '
        title={<h3 className='title text-center'>Delete Keywords</h3>}
      >
        <Button
          shape='round'
          type='primary'
          onClick={() => deleteMultiKeywords(visibleModalMulti)}
          danger
        >
          Temporary Multiple Delete
        </Button>
        <Button shape='round' type='primary' onClick={() => setVisibleModal(undefined)}>
          Cancel
        </Button>
      </Modal>
    </>
  );
};

export default KeywordsTable;
