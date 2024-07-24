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

type Props = {
  objectivesTrash?: IAdminPanel[];
};

const ObjectivesTrashTable = ({ objectivesTrash = [] }: Props) => {
  const token = useSelector((state: AppState) => state.admin.Token);
  const [visibleModal, setVisibleModal] = useState();
  const [multiCheckFlag, setMultiCheckFlag] = useState(false);
  const [visibleModalMulti, setVisibleModalMulti] = useState([]);
  const [multipleSelect, setMultipleSelect] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const iddd = objectivesTrash.map((item) => item._id);

  useEffect(() => {
    setObjectives(objectivesTrash);
  }, [objectivesTrash]);

  const handleCancel = () => {
    setVisibleModal(undefined);
  };

  const handleCancel3 = () => {
    setVisibleModalMulti([]);
  };
  const Navigate = useNavigate();

  function restoreObjectives(id) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    const formData = urlSearchParams.toString();

    AdminApi.RestorePatch(formData, 'objectives/restore', token)
      .then((datas) => {
        const message = datas.message;
        const success = datas.status;
        if (success) {
          openNotificationWithIcon({ type: 'success', message });
          setObjectives((prevObjectives) =>
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

  function deleteObjectives(id) {
    AdminApi.tempDeleteBlog(`objectives/delete?id=${id}`, token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          setVisibleModal(undefined);
          openNotificationWithIcon({ type: 'success', message });
          setObjectives((prevObjectives) =>
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

  function deleteMultiObjectives(id: string[]) {
    AdminApi.tempDeleteBlog(`objectives/multi-delete?id=${id}`, token)
      .then((datas) => {
        const message = datas.message;
        const status = datas.status;
        if (status) {
          setVisibleModalMulti([]);
          openNotificationWithIcon({ type: 'success', message });
          setObjectives((prevObjectives) =>
            prevObjectives.filter((objectives) => !id.includes(objectives._id))
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

  function selectObjectives(id, flag) {
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
      title: <Checkbox onChange={() => selectObjectives(iddd, 'all')} checked={multiCheckFlag} />,
      render: (_id) => {
        return (
          <Checkbox
            onChange={() => selectObjectives(_id, 'multi')}
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
      title: 'Objectives',
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
            onClick={() => restoreObjectives(_id)}
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
        {multipleSelect.length > 0 && (
          <Button
            className='mb-3 mx-2'
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
          onClick={() => setNavigate('/admin/view-objectives')}
        >
          View Objectives
        </Button>
      </div>

      <Table
        // pagination={pagination}
        className='accent-header'
        rowKey='_id'
        dataSource={objectives}
        columns={columns}
      />

      <Modal
        open={visibleModal}
        footer={null}
        onCancel={handleCancel}
        className='d-flex '
        title={<h3 className='title text-center'>Delete Objectives</h3>}
      >
        <Button shape='round' type='primary' onClick={() => deleteObjectives(visibleModal)}>
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
        title={<h3 className='title text-center'>Delete Objectives</h3>}
      >
        <Button
          shape='round'
          type='primary'
          onClick={() => deleteMultiObjectives(visibleModalMulti)}
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

export default ObjectivesTrashTable;
