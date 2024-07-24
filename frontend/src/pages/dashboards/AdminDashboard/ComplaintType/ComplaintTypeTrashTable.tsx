import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnProps } from 'antd/es/table';
import { Table, Button, Modal, Checkbox } from 'antd';
import { AdminApi } from '../../../../api/api';
import { openNotificationWithIcon } from '../../../components/Toast';
import { AppState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { IAdminPanel } from '../../../../interfaces/Admin/keyword';
import { IComplaintTypeClient } from '../../../../interfaces/Client/client';

type Props = {
  complaintTypeTrash?: IComplaintTypeClient[];
};

const ComplaintTypeTrashTable = ({ complaintTypeTrash = [] }: Props) => {
  const token = useSelector((state: AppState) => state.admin.Token);
  const [visibleModal, setVisibleModal] = useState();
  const [multiCheckFlag, setMultiCheckFlag] = useState(false);
  const [visibleModalMulti, setVisibleModalMulti] = useState([]);
  const [multipleSelect, setMultipleSelect] = useState([]);
  const [multipleAllSelect, setMultipleAllSelect] = useState([]);
  const [complaintType, setComplaintType] = useState([]);
  const iddd = complaintTypeTrash.map((item) => item._id);

  useEffect(() => {
    setComplaintType(complaintTypeTrash);
  }, [complaintTypeTrash]);

  const handleCancel = () => {
    setVisibleModal(undefined);
  };

  const handleCancel3 = () => {
    setVisibleModalMulti([]);
  };
  const Navigate = useNavigate();

  function restoreComplaintType(id) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    const formData = urlSearchParams.toString();

    AdminApi.RestorePatch(formData, 'complaint-type/restore', token)
      .then((datas) => {
        const message = datas.message;
        const success = datas.status;
        if (success) {
          openNotificationWithIcon({ type: 'success', message });
          setComplaintType((prevComplaintType) =>
            prevComplaintType.filter((complaintType) => complaintType._id !== id)
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

  function deleteComplaintType(id: string) {
    AdminApi.tempDeleteBlog(`complaint-type/delete?id=${id}`, token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          setVisibleModal(undefined);
          openNotificationWithIcon({ type: 'success', message });
          setComplaintType((prevComplaintType) =>
            prevComplaintType.filter((complaintType) => complaintType._id !== id)
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

  function deleteMultiComplaintType(id: string[]) {
    AdminApi.tempDeleteBlog(`complaint-type/multi-delete?id=${id}`, token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          setVisibleModalMulti([]);
          openNotificationWithIcon({ type: 'success', message });
          setComplaintType((prevComplaintType) =>
            prevComplaintType.filter((complaintType) => !id.includes(complaintType._id))
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

  function selectComplaintType(id) {
    setMultipleSelect((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }

  function selectAllComplaintType(id) {
    if (multipleAllSelect.length > 0) {
      setMultipleAllSelect([]);
      setMultiCheckFlag(false);
    } else {
      setMultipleAllSelect(id);
      setMultiCheckFlag(true);
    }
  }

  function setNavigate(nav) {
    Navigate(`${nav}`);
  }

  const columns: ColumnProps<IAdminPanel>[] = [
    // {
    //   key: '_id',
    //   dataIndex: '_id',
    //   title: 'ID',
    //   render: (_id) => (
    //     <span
    //       className='nowrap'
    //       style={{ color: '#a5a5a5' }}
    //     >
    //       {_id}
    //     </span>
    //   )
    // },

    {
      key: '_id',
      dataIndex: '_id',
      title: <Checkbox onChange={() => selectAllComplaintType(iddd)} />,
      render: (_id) => {
        return multiCheckFlag ? (
          <Checkbox onChange={() => selectComplaintType(_id)} checked={multiCheckFlag} />
        ) : (
          <Checkbox onChange={() => selectComplaintType(_id)} />
        );
      }
    },

    {
      key: '_id',
      dataIndex: 'name',
      title: 'Complaint Type',
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
          <Button
            shape='round'
            type='primary'
            className='restore'
            onClick={() => restoreComplaintType(_id)}
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

  //   const pagination = myBooking.length <= 10 ? false : {};

  return (
    <>
      <div className='d-flex justify-content-end align-items-center'>
        {((multipleSelect.length > 0 && complaintType.length > 0) ||
          (multipleAllSelect.length > 0 && complaintType.length > 0)) && (
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
          onClick={() => setNavigate('/admin/view-complaintType')}
        >
          View Complaint Type
        </Button>
      </div>

      <Table
        // pagination={pagination}
        className='accent-header'
        rowKey='_id'
        dataSource={complaintType}
        columns={columns}
      />

      <Modal
        open={visibleModal}
        footer={null}
        onCancel={handleCancel}
        className='d-flex '
        title={<h3 className='title text-center'>Delete Complaint Type</h3>}
      >
        <Button shape='round' type='primary' onClick={() => deleteComplaintType(visibleModal)}>
          <DeleteOutlined /> Permanent Delete
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
        title={<h3 className='title text-center'>Delete Complaint Type</h3>}
      >
        <Button
          shape='round'
          type='primary'
          onClick={() => deleteMultiComplaintType(visibleModalMulti)}
        >
          Permanent Multiple Delete
        </Button>
        <Button shape='round' type='primary' onClick={() => setVisibleModal(undefined)}>
          Cancel
        </Button>
      </Modal>
    </>
  );
};

export default ComplaintTypeTrashTable;
