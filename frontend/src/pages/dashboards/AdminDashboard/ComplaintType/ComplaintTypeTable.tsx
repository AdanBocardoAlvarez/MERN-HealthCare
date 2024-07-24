import React, { useEffect, useState } from 'react';
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
import { IComplaintTypeClient } from '../../../../interfaces/Client/client';

type Props = {
  viewComplaintType?: IComplaintTypeClient[];
};

const ComplaintTypeTable = ({ viewComplaintType }: Props) => {
  const token = useSelector((state: AppState) => state.admin.Token);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [visibleModal, setVisibleModal] = useState();
  const [multipleSelect, setMultipleSelect] = useState([]);
  const [multipleAllSelect, setMultipleAllSelect] = useState([]);
  const [complaintType, setComplaintType] = useState([]);
  const iddd = viewComplaintType.map((item) => item._id);
  const [multiCheckFlag, setMultiCheckFlag] = useState(false);
  const [visibleModalMulti, setVisibleModalMulti] = useState([]);
  const [checked, setChecked] = useState(true);
  const [status, setStatus] = useState({
    status: 1,
    id: ''
  });

  useEffect(() => {
    setComplaintType(viewComplaintType);
  }, [viewComplaintType]);

  const handleCancel = () => {
    setVisibleModal(undefined);
  };

  const handleCancel3 = () => {
    setVisibleModalMulti([]);
  };
  const Navigate = useNavigate();

  function editComplaintType(id, title) {
    const url = `/admin/edit-complaintType/${id}/${title.name}`;
    Navigate(url);
  }

  function deleteTempComplaintType(id: string) {
    AdminApi.tempDeleteBlog(`complaint-type/temp-delete?id=${id}`, token)
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
    AdminApi.tempDeleteBlog(`complaint-type/temp-multi-delete?id=${id}`, token)
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
        // If the ID is already in the array, remove it
        return prev.filter((item) => item !== id);
      } else {
        // If the ID is not in the array, add it
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

  // function activeBlog(id, flag){
  //   setStatus(pre=>!pre)
  // }

  const activeComplaintType = (checked: boolean, id) => {
    setChecked(checked);
    setStatus({
      status: checked === true ? 1 : 0,
      id: id
    });
  };

  useEffect(() => {
    if (!isFirstRender) {
      const urlSearchParams = new URLSearchParams();

      for (const key in status) {
        urlSearchParams.append(key, status[key]);
      }

      const formData = urlSearchParams.toString();

      AdminApi.createPost(formData, 'complaint-type/status', token)
        .then((datas) => {
          const message = datas.message;
          const status = datas.status;
          if (status) {
            openNotificationWithIcon({ type: 'success', message });
          } else {
            openNotificationWithIcon({ type: 'error', message: message });
          }
        })
        .catch((err) => {
          const message = err.response.data.message;
          openNotificationWithIcon({ type: 'error', message: message });
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
          <Button shape='round' type='primary' onClick={() => editComplaintType(_id, title)}>
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
      render: (_id, title) => (
        <div className='buttons-list nowrap'>
          <Switch defaultChecked={checked} onChange={() => activeComplaintType(!checked, _id)} />
        </div>
      )
    }
  ];

  //   const pagination = myBooking.length <= 10 ? false : {};

  return (
    <>
      <div className='d-flex justify-content-end align-items-center'>
        {(multipleSelect.length > 0 || multipleAllSelect.length > 0) && (
          <Button
            className='mb-3'
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
          danger
          onClick={() => setNavigate('/admin/view-trash-complaintType')}
        >
          <DeleteOutlined />
        </Button>
        <Button
          className='mb-3 ms-1 mx-2'
          shape='round'
          type='primary'
          onClick={() => setNavigate('/admin/add-complaintType')}
        >
          Add Complaint Type
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
        <Button
          shape='round'
          type='primary'
          onClick={() => deleteTempComplaintType(visibleModal)}
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
        title={<h3 className='title text-center'>Delete Complaint Type</h3>}
      >
        <Button
          shape='round'
          type='primary'
          onClick={() => deleteMultiComplaintType(visibleModalMulti)}
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

export default ComplaintTypeTable;
