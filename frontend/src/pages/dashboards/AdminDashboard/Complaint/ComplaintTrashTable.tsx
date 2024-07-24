import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnProps } from 'antd/es/table';
import { Table, Button, Modal, Checkbox } from 'antd';
import { AppState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { IAdminPanel } from '../../../../interfaces/Admin/keyword';
import {
    useGetClientName,
    useGetComplaintType,
    useGetConsultantName
} from '../../../../hooks/Admin/useAdminConsultant';

type Props = {
    complaintTrash?: IAdminPanel[];
};

const ComplaintTrashTable = ({ complaintTrash }: Props) => {
    const [ConsultantName] = useGetConsultantName('consultant/view');
    const [ComplaintType] = useGetComplaintType('complaint-type/index');
    const [ClientName] = useGetClientName('client/view');

    const token = useSelector((state: AppState) => state.admin.Token);
    const [visibleModal, setVisibleModal] = useState();
    const [multiCheckFlag, setMultiCheckFlag] = useState(false);
    const [visibleModalMulti, setVisibleModalMulti] = useState([]);
    const [multipleSelect, setMultipleSelect] = useState([]);
    const [multipleAllSelect, setMultipleAllSelect] = useState([]);
    const [complaint, setComplaint] = useState([]);
    const iddd = complaintTrash.map((item) => item._id);

    useEffect(() => {
        setComplaint(complaintTrash);
    }, [complaintTrash]);

    const handleCancel = () => {
        setVisibleModal(undefined);
    };

    const handleCancel3 = () => {
        setVisibleModalMulti([]);
    };
    const Navigate = useNavigate();

    function restoreComplaint(id) {
        // const urlSearchParams = new URLSearchParams();
        // urlSearchParams.append('id', id);
        // const formData = urlSearchParams.toString();
        // AdminApi.createPatch(formData, 'complaint/restore', token)
        //   .then((datas) => {
        //     const message = datas.message;
        //     const success = datas.message;
        //     if (success) {
        //       openNotificationWithIcon({ type: 'success', message });
        //       setTimeout(() => {
        //         setComplaint((prevComplaint) =>
        //           prevComplaint.filter((complaint) => complaint._id !== id)
        //         );
        //       }, 1000);
        //     } else {
        //       openNotificationWithIcon({ type: 'error', message: message });
        //     }
        //   })
        //   .catch((err) => {
        //     const message = err.response.data.message;
        //     openNotificationWithIcon({ type: 'error', message: message });
        //   });
    }

    function deleteComplaint(id) {
        // AdminApi.tempDelete('complaint/delete', id, token)
        //   .then((datas) => {
        //     const message = datas.message;
        //     const status = datas.status;
        //     if (status) {
        //       setVisibleModal(undefined);
        //       openNotificationWithIcon({ type: 'success', message });
        //       setTimeout(() => {
        //         setComplaint((prevComplaint) =>
        //           prevComplaint.filter((complaint) => complaint._id !== id)
        //         );
        //       }, 1000);
        //     } else {
        //       openNotificationWithIcon({ type: 'error', message: message });
        //     }
        //   })
        //   .catch((err) => {
        //     const message = err.response.data.message;
        //     openNotificationWithIcon({ type: 'error', message: message });
        //   });
    }

    function deleteMultiComplaint(ids) {
        // ids.forEach((id) => {
        //   AdminApi.tempDelete('complaint/multi-delete', id, token)
        //     .then((datas) => {
        //       const message = datas.message;
        //       const status = datas.status;
        //       if (status) {
        //         setVisibleModalMulti([]);
        //         openNotificationWithIcon({ type: 'success', message });
        //         setTimeout(() => {
        //           setComplaint((prevComplaint) =>
        //             prevComplaint.filter((complaint) => complaint._id !== id)
        //           );
        //         }, 1000);
        //       } else {
        //         openNotificationWithIcon({ type: 'error', message: message });
        //       }
        //     })
        //     .catch((err) => {
        //       const message = err.response.data.message;
        //       openNotificationWithIcon({ type: 'error', message: message });
        //     });
        // });
    }

    function selectComplaint(id) {
        setMultipleSelect((prev) => {
            if (prev.includes(id)) {
                return prev.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
    }

    function selectAllComplaint(id) {
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
            title: <Checkbox onChange={() => selectAllComplaint(iddd)} />,
            render: (_id) => {
                return multiCheckFlag ? (
                    <Checkbox onChange={() => selectComplaint(_id)} checked={multiCheckFlag} />
                ) : (
                    <Checkbox onChange={() => selectComplaint(_id)} />
                );
            }
        },

        {
            key: '_id',
            dataIndex: 'consultant_name',
            title: 'Raised Against',
            render: (consultant_name) => {
                const name = ConsultantName.map((item) => (item._id === consultant_name ? item.title : ''));
                return <strong className='wrap'>{name}</strong>;
            }
        },
        {
            key: '_id',
            dataIndex: 'client_name',
            title: 'Raised by',
            render: (client_name) => {
                const name = ClientName.map((item, index) => (item._id === client_name ? item.title : ''));
                return <strong className='wrap'>{name}</strong>;
            }
        },

        {
            key: '_id',
            dataIndex: 'attachment',
            title: 'Complaint Attachment',
            render: (attachment) => (
                <img
                    src={attachment}
                    alt='Complaint Attachment'
                    style={{ color: '#a5a5a5', width: '120px', height: '100px' }}
                />
            )
        },
        {
            key: '_id',
            dataIndex: 'complaint_type',
            title: 'Complaint Type',
            render: (complaint_type) => {
                const name = ComplaintType.map((item) => (item._id === complaint_type ? item.name : ''));
                return <strong className='wrap'>{name}</strong>;
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
                        onClick={() => restoreComplaint(_id)}
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
                    onClick={() => setNavigate('/admin/view-complaint')}
                >
                    View Complaint
                </Button>
            </div>

            <Table
                // pagination={pagination}
                className='accent-header'
                rowKey='_id'
                dataSource={complaint}
                columns={columns}
            />

            <Modal
                open={visibleModal}
                footer={null}
                onCancel={handleCancel}
                className='d-flex '
                title={<h3 className='title text-center'>Delete Complaint</h3>}
            >
                <Button shape='round' type='primary' onClick={() => deleteComplaint(visibleModal)}>
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
                title={<h3 className='title text-center'>Delete Complaint</h3>}
            >
                <Button
                    shape='round'
                    type='primary'
                    onClick={() => deleteMultiComplaint(visibleModalMulti)}
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

export default ComplaintTrashTable;
