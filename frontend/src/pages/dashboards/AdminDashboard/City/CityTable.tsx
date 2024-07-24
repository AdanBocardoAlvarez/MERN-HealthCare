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
    viewCity?: IAdminPanel[];
};

const CityTable = ({ viewCity }: Props) => {
    const token = useSelector((state: AppState) => state.admin.Token);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [visibleModal, setVisibleModal] = useState();
    const [multipleSelect, setMultipleSelect] = useState([]);
    const [city, setCity] = useState([]);
    const iddd = viewCity.map((item) => item._id);
    const [multiCheckFlag, setMultiCheckFlag] = useState(false);
    const [visibleModalMulti, setVisibleModalMulti] = useState([]);
    const [checked, setChecked] = useState(true);
    const [status, setStatus] = useState({
        status: 1,
        id: ''
    });

    useEffect(() => {
        setCity(viewCity);
    }, [viewCity]);

    const handleCancel = () => {
        setVisibleModal(undefined);
    };

    const handleCancel3 = () => {
        setVisibleModalMulti([]);
    };
    const Navigate = useNavigate();

    function deleteTempCity(id: string) {
        AdminApi.tempDeleteBlog(`city/temp-delete?id=${id}`, token)
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
        AdminApi.tempDeleteBlog(`city/temp-multi-delete?id=${id}`, token)
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

    const activeCity = (check: boolean, id) => {
        AdminApi.getQuotesList('city/index', token)
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
            AdminApi.createPost(formData, 'city/status', token).then((datas) => {
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
            title: 'City',
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
                        onClick={() => Navigate(`/admin/edit-city/${_id}`)}
                    >
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
            render: (_id, city) => {
                return (
                    <div className='buttons-list nowrap'>
                        <Switch
                            defaultChecked={city.status === 0 ? false : true}
                            onChange={() => activeCity(!checked, _id)}
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
                    onClick={() => setNavigate('/admin/view-trash-city')}
                >
                    <DeleteOutlined />
                </Button>
                <Button
                    className='mb-3 ms-1 mx-2'
                    shape='round'
                    type='primary'
                    onClick={() => setNavigate('/admin/add-city')}
                >
                    Add City
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
                <Button
                    shape='round'
                    type='primary'
                    onClick={() => deleteTempCity(visibleModal)}
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
                title={<h3 className='title text-center'>Delete City</h3>}
            >
                <Button
                    shape='round'
                    type='primary'
                    onClick={() => deleteMultiCity(visibleModalMulti)}
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

export default CityTable;
