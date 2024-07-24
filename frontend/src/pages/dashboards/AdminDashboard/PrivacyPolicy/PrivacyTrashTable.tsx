import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnProps } from 'antd/es/table';
import { Table, Button, Modal } from 'antd';
import { AdminApi } from '../../../../api/api';
import { openNotificationWithIcon } from '../../../components/Toast';
import { AppState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { IAdminPanel } from '../../../../interfaces/Admin/keyword';

type Props = {
  PrivacyPolicyTrash?: IAdminPanel[];
};

const PrivacyPolicyTrashTable = ({ PrivacyPolicyTrash }: Props) => {
  const token = useSelector((state: AppState) => state.admin.Token);
  const [description, setDescription] = useState<string>();
  const [descriptionModal, setDescriptionModal] = useState<boolean>(false);
  const [nationality, setNationality] = useState([]);
  // const iddd = PrivacyPolicyTrash.map((item) => item._id);

  useEffect(() => {
    setNationality(PrivacyPolicyTrash);
  }, [PrivacyPolicyTrash]);

  const Navigate = useNavigate();

  function restoreNationality(id) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    const formData = urlSearchParams.toString();

    AdminApi.RestorePatch(formData, 'privacy-policy/restore', token)
      .then((datas) => {
        const message = datas.message;
        const success = datas.status;
        if (success || datas.success === 200) {
          openNotificationWithIcon({ type: 'success', message });
          setNationality((prevNationality) => prevNationality.filter((nationality) => nationality._id !== id));
        } else {
          openNotificationWithIcon({ type: 'error', message: message });
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message;
        openNotificationWithIcon({ type: 'error', message: message });
      });
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
      dataIndex: 'content',
      title: 'Content',
      render: (name) => {
        return (
          <Button
            shape='round'
            type='primary'
            onClick={() => {
              setDescriptionModal(true);
              setDescription(name);
            }}
          >
            View
          </Button>
        );
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
            onClick={() => restoreNationality(_id)}
          >
            Restore
          </Button>
        </div>
      )
    }
  ];

  //   const pagination = myBooking.length <= 10 ? false : {};

  return (
    <>
      <div className='d-flex justify-content-end align-items-center'>
        <Button
          className='mb-3 ms-1 mx-2'
          shape='round'
          type='primary'
          onClick={() => setNavigate('/admin/view-privacy-policy')}
        >
          View Privacy Policy
        </Button>
      </div>

      <Table
        // pagination={pagination}
        className='accent-header'
        rowKey='_id'
        dataSource={nationality}
        columns={columns}
      />
      <Modal
        open={descriptionModal}
        footer={null}
        onCancel={() => setDescriptionModal(false)}
        className='d-flex'
        title={<h3 className='title text-center'>Description</h3>}
      >
        <span className='wrap'>{description}</span>
      </Modal>
    </>
  );
};

export default PrivacyPolicyTrashTable;
