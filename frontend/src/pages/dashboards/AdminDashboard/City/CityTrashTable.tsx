import { useEffect, useState } from 'react';
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
    cityTrash?: IAdminPanel[];
};

const CityTrashTable = ({ cityTrash = [] }: Props) => {

    const token = useSelector((state: AppState) => state.admin.Token);
    const [visibleModal, setVisibleModal] = useState();
    const [multiCheckFlag, setMultiCheckFlag] = useState(false);
    const [visibleModalMulti, setVisibleModalMulti] = useState([]);
    const [multipleSelect, setMultipleSelect] = useState([]);
    const [city, setCity] = useState([]);
    const iddd = cityTrash.map((item) => item._id);

    useEffect(() => {
        setCity(cityTrash);
    }, [cityTrash]);

    const handleCancel = () => {
        setVisibleModal(undefined);
    };

    const handleCancel3 = () => {
        setVisibleModalMulti([]);
    };
    const Navigate = useNavigate();

    function restoreCity(id) {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', id);
        const formData = urlSearchParams.toString();

        AdminApi.RestorePatch(formData, 'city/restore', token)
            .then((datas) => {
                const message = datas.message;
                const success = datas.status;
                if (success) {
                    openNotificationWithIcon({ type: 'success', message });
                    setCity((prev) => prev.filter((city) => city._id !== id));
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }

    function deleteCity(id: string) {
        AdminApi.tempDeleteBlog(`city/delete?id=${id}`, token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    setVisibleModal(undefined);
                    openNotificationWithIcon({ type: 'success', message });
                    setCity((prev) => prev.filter((city) => city._id !== id));
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }

    function deleteMultiCity(id: string[]) {
        AdminApi.tempDeleteBlog(`city/multi-delete?id=${id}`, token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    setVisibleModalMulti([]);
                    openNotificationWithIcon({ type: 'success', message });
                    setCity((prev) => prev.filter((city) => !id.includes(city._id)));
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

    function selectCity(id, flag) {
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
        {
            key: '_id',
            dataIndex: '_id',
            title: <Checkbox onChange={() => selectCity(iddd, 'all')} checked={multiCheckFlag} />,
            render: (_id) => {
                return (
                    <Checkbox
                        onChange={() => selectCity(_id, 'multi')}
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
            title: 'Name',
            render: (name) => {
                return <strong>{name}</strong>;
            }
        },
        {
            key: 'country',
            dataIndex: 'country',
            title: 'Country',
            render: (country) => {
                return <strong>{country}</strong>;
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
                        onClick={() => restoreCity(_id)}
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
                    onClick={() => setNavigate('/admin/view-city')}
                >
                    View City
                </Button>
            </div>

            <Table
                // pagination={pagination}
                className='accent-header'
                rowKey='_id'
                dataSource={city}
                columns={columns}
            />

            <Modal
                open={visibleModal}
                footer={null}
                onCancel={handleCancel}
                className='d-flex '
                title={<h3 className='title text-center'>Delete City</h3>}
            >
                <Button shape='round' type='primary' onClick={() => deleteCity(visibleModal)}>
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
                title={<h3 className='title text-center'>Delete City</h3>}
            >
                <Button
                    shape='round'
                    type='primary'
                    onClick={() => deleteMultiCity(visibleModalMulti)}
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

export default CityTrashTable;
