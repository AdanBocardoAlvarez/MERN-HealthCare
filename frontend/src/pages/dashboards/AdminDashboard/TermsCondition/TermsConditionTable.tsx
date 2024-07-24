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
    ViewPrivacy?: IAdminPanel[];
};

const TermsConditionTable = ({ ViewPrivacy }: Props) => {
    const token = useSelector((state: AppState) => state.admin.Token);
    const [descriptionModal, setDescriptionModal] = useState<boolean>(false);
    const [description, setDescription] = useState<string>();

    const [visibleModal, setVisibleModal] = useState();
    const [multipleSelect, setMultipleSelect] = useState([]);
    const [nationality, setNationality] = useState([]);
    const iddd = ViewPrivacy.map((item) => item._id);
    const [multiCheckFlag, setMultiCheckFlag] = useState(false);
    const [visibleModalMulti, setVisibleModalMulti] = useState([]);

    useEffect(() => {
        setNationality(ViewPrivacy);
    }, [ViewPrivacy]);

    const handleCancel = () => {
        setVisibleModal(undefined);
    };

    const handleCancel3 = () => {
        setVisibleModalMulti([]);
    };
    const Navigate = useNavigate();

    function deleteTempNationality(id: string) {
        AdminApi.tempDeleteBlog(`terms-and-conditions/temp-delete?id=${id}`, token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    setVisibleModal(undefined);
                    openNotificationWithIcon({ type: 'success', message });
                    setNationality((prevNationality) =>
                        prevNationality.filter((nationality) => nationality._id !== id)
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

    function deleteMultiNationality(id: string[]) {
        AdminApi.tempDeleteBlog(`terms-and-conditions/temp-multi-delete?id=${id}`, token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    setVisibleModalMulti([]);
                    openNotificationWithIcon({ type: 'success', message });
                    setNationality((prevNationality) =>
                        prevNationality.filter((nationality) => !id.includes(nationality._id))
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

    function setNavigate(nav) {
        Navigate(`${nav}`);
    }
    function selectNationality(id, flag) {
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

    const activeNationality = (check, id) => {
        const formData = new URLSearchParams();
        check = 1 - check;
        formData.append('id', id);
        formData.append('active_tc', check);
        AdminApi.createPost(formData, 'terms-and-conditions/status', token).then((datas) => {
            const message = datas.message;
            const status = datas.success;
            if (status) {
                openNotificationWithIcon({ type: 'success', message });
                AdminApi.getComman('terms-and-conditions/index', token)
                    .then((datas) => {
                        setNationality(datas);
                    })
                    .catch((err) => {
                        const message = err.response.data.message;
                        openNotificationWithIcon({ type: 'error', message: message });
                    });
            } else {
                openNotificationWithIcon({ type: 'error', message: message });
            }
        });
    };

    const columns: ColumnProps<IAdminPanel>[] = [
        {
            key: '_id',
            dataIndex: '_id',
            title: <Checkbox onChange={() => selectNationality(iddd, 'all')} checked={multiCheckFlag} />,
            render: (_id) => {
                return (
                    <Checkbox
                        onChange={() => selectNationality(_id, 'multi')}
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
            dataIndex: 'content',
            title: 'Content',
            render: (content) => {
                return (
                    <div className='buttons-list nowrap'>
                        <Button
                            shape='round'
                            type='primary'
                            onClick={() => {
                                setDescriptionModal(true);
                                setDescription(content);
                            }}
                        >
                            View
                        </Button>
                    </div>
                );
            }
        },
        {
            key: '_id',
            dataIndex: 'created_at',
            title: 'Created Date',
            render: (date) => {
                return <div className='buttons-list nowrap'>{date?.slice(0, 10)}</div>;
            }
        },
        {
            key: '_id',
            dataIndex: '_id',
            title: 'Actions',
            render: (_id, title) => (
                <div className='buttons-list nowrap'>
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
            render: (_id, nationality) => {
                return (
                    <div className='buttons-list nowrap'>
                        <Switch
                            checked={nationality.active_tc === 0 ? false : true}
                            onChange={() => activeNationality(nationality.active_tc, _id)}
                        />
                    </div>
                );
            }
        }
    ];

    //   const pagination = myBooking.length <= 10 ? false : {};

    return (
        <>
            <div className='d-flex justify-content-end align-items-center flex-wrap'>
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
                {/* <Button
                    className='mb-3 ms-1 mx-2'
                    shape='round'
                    type='primary'
                    danger
                    onClick={() => setNavigate('/admin/view-trash-terms-condition')}
                >
                    Go to Trash
                </Button> */}
                <Button
                    className='mb-3 ms-1 mx-2'
                    shape='round'
                    type='primary'
                    onClick={() => setNavigate('/admin/add-terms-condition')}
                >
                    Add Terms Condition
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
                open={visibleModal}
                footer={null}
                onCancel={handleCancel}
                className='d-flex '
                title={<h3 className='title text-center'>Delete Terms Condition</h3>}
            >
                <Button
                    shape='round'
                    type='primary'
                    onClick={() => deleteTempNationality(visibleModal)}
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
                title={<h3 className='title text-center'>Delete Terms Condition</h3>}
            >
                <Button
                    shape='round'
                    type='primary'
                    onClick={() => deleteMultiNationality(visibleModalMulti)}
                    danger
                >
                    Temporary Multiple Delete
                </Button>
                <Button shape='round' type='primary' onClick={() => setVisibleModal(undefined)}>
                    Cancel
                </Button>
            </Modal>
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

export default TermsConditionTable;
