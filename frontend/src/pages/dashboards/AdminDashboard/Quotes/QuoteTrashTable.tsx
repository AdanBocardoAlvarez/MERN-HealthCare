import { useEffect, useState } from 'react';
import { ColumnProps } from 'antd/es/table';
import { Button, Checkbox, Modal, Table } from 'antd';
import { IQuote } from '../../../../interfaces/Admin/quote';
import { useNavigate } from 'react-router-dom';
import { AdminApi } from '../../../../api/api';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { DeleteOutlined } from '@ant-design/icons';

type Props = {
  QuoteTrash?: IQuote[];
};

const QuoteTrashTable = ({ QuoteTrash = [] }: Props) => {
  const token = useSelector((state: AppState) => state.admin.Token);
  const [visibleModal, setVisibleModal] = useState();
  const [multipleSelect, setMultipleSelect] = useState([]);
  const [multiCheckFlag, setMultiCheckFlag] = useState(false);
  const [visibleModalMulti, setVisibleModalMulti] = useState([]);
  const [multipleAllSelect] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const iddd = QuoteTrash.map((item) => item._id);

  const handleCancel = () => {
    setVisibleModal(undefined);
  };

  useEffect(() => {
    setQuotes(QuoteTrash);
  }, [QuoteTrash]);

  const handleCancel3 = () => {
    setVisibleModalMulti([]);
  };
  const Navigate = useNavigate();

  function restoreQuote(id: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    const formData = urlSearchParams.toString();
    AdminApi.RestorePatch(formData, 'quote/restore', token)
      .then((datas) => {
        const message = datas.message;
        const success = datas.status;
        if (success) {
          openNotificationWithIcon({ type: 'success', message });
          setQuotes((prevObjectives) =>
            prevObjectives.filter((objectives) => objectives._id !== id)
          );
        } else {
          openNotificationWithIcon({ type: 'error', message: message });
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
  }

  function deleteQuote(id: string) {
    AdminApi.tempDeleteBlog(`quote/delete?id=${id}`, token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          setVisibleModal(undefined);
          openNotificationWithIcon({ type: 'success', message });
          setQuotes((prevQuote) => prevQuote.filter((Quote) => Quote._id !== id));
        } else {
          openNotificationWithIcon({ type: 'error', message: message });
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
  }

  function deleteMultiQuote(id: string[]) {
    AdminApi.tempDeleteBlog(`quote/multi-delete?id=${id}`, token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          setVisibleModalMulti([]);
          openNotificationWithIcon({ type: 'success', message });
          setQuotes((prevQuotes) => prevQuotes.filter((quote) => !id.includes(quote._id)));
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

  function selectQuote(id, flag) {
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

  const columns: ColumnProps<IQuote>[] = [
    // {
    //   key: '_id',
    //   dataIndex: '_id',
    //   title: 'Select',
    //   render: (_id) => {
    //     return <Checkbox onChange={() => selectQuote(_id)} />;
    //   }
    // },

    {
      key: '_id',
      dataIndex: '_id',
      title: <Checkbox onChange={() => selectQuote(iddd, 'all')} checked={multiCheckFlag} />,
      render: (_id) => {
        return (
          <Checkbox
            onChange={() => selectQuote(_id, 'multi')}
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
      dataIndex: '_id',
      title: 'S.No.',
      render: (_id) => {
        const index = QuoteTrash.findIndex((item) => item._id === _id);
        return <strong>{index + 1}</strong>;
      }
    },
    {
      key: '_id',
      dataIndex: 'quote_title',
      title: 'Quote Title',
      render: (quote_title) => {
        return <strong>{quote_title}</strong>;
      }
    },
    {
      key: '_id',
      dataIndex: 'author_name',
      title: 'Quote Author Name',
      render: (author_name) => {
        return <strong>{author_name}</strong>;
      }
    },
    {
      key: '_id',
      dataIndex: '_id',
      title: 'Actions',
      render: (_id, quote_title) => (
        <div className='buttons-list nowrap'>
          <Button
            shape='round'
            type='primary'
            className='restore'
            onClick={() => restoreQuote(_id)}
          >
            Restore
          </Button>
          <Button shape='round' type='primary' onClick={() => setVisibleModal(_id)} danger>
            <DeleteOutlined /> Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <>
      {/* {multipleSelect.length > 0 && (
        <Button className='mb-3' shape='round' type='primary'>
          Delete Multiple
        </Button>
      )} */}

      <div className='d-flex justify-content-end align-items-center'>
        {(multipleSelect.length > 0 || multipleAllSelect.length > 0) && (
          <Button
            className='mb-3 mx-2'
            shape='round'
            type='primary'
            danger
            onClick={() =>
              setVisibleModalMulti(
                multipleAllSelect.length > 0 ? multipleAllSelect : multipleSelect
              )
            }
          >
            Delete Multiple
          </Button>
        )}
        <Button
          className='mb-3 ms-1 mx-2'
          shape='round'
          type='primary'
          onClick={() => setNavigate('/admin/view-quote')}
        >
          View Quote
        </Button>
      </div>

      <Table
        // pagination={pagination}
        className='accent-header'
        rowKey='_id'
        dataSource={quotes}
        columns={columns}
      />

      <Modal
        open={visibleModal}
        footer={null}
        onCancel={handleCancel}
        className='d-flex '
        title={<h3 className='title text-center'>Permanent Delete</h3>}
      >
        <Button shape='round' type='primary' onClick={() => deleteQuote(visibleModal)}>
          Permanent Multiple Delete
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
        title={<h3 className='title text-center'>Multiple Delete Quote</h3>}
      >
        <Button shape='round' type='primary' onClick={() => deleteMultiQuote(visibleModalMulti)}>
          Permanent Multiple Delete
        </Button>
        <Button shape='round' type='primary' onClick={() => setVisibleModal(undefined)}>
          Cancel
        </Button>
      </Modal>
    </>
  );
};

export default QuoteTrashTable;
