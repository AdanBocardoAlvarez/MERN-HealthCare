import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Table, Button, Modal, Image } from 'antd';
import { AdminApi } from '../../../../api/api';
import { openNotificationWithIcon } from '../../../components/Toast';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import anonymousImg from './../../../../assets/img/anonymous-400.png';
import { Link } from 'react-router-dom';
import { IDigitalProduct } from '../../../../interfaces/Admin/digitalProduct';
type Props = {
    state?: IDigitalProduct[];
    // state?: {};
    refreshData: () => void;
    Type: 'View' | 'Trash';
};

type PatientsImgProps = {
    img?: string;
};
const PatientImg = ({ img }: PatientsImgProps) => {
    if (img) {
        return <Image style={{ width: '100px' }} src={img} />;
    }

    return <Image style={{ width: '100px' }} src={anonymousImg} />;
};

const DigitalProductTable = ({ state, refreshData, Type }: Props) => {
    const token = useSelector((state: AppState) => state.admin.Token);
    const [deleteModal, setDeleteModal] = useState();
    const [descriptionModal, setDescriptionModal] = useState<boolean>(false);
    const [description, setDescription] = useState<string>();
    const [MultiDeleteModal, setMultiDeleteModal] = useState<boolean>(false);
    const [MultiDeleteTrashModal, setMultiDeleteTrashModal] = useState<boolean>(false);
    const [deleteModalTrash, setDeleteModalTrash] = useState();
    const [DigitalProduct, setDigitalProduct] = useState<IDigitalProduct[]>([]);
    const [selectedRow, setSelectedRows] = useState<string[]>([]);
    const [selectedRowTrash, setSelectedRowsTrash] = useState<string[]>([]);
    const setNavigate = useNavigate();
    useEffect(() => {
        setDigitalProduct(state);
    }, [state]);

    const onSelectChange = (selectedRowClient) => {
        setSelectedRows(selectedRowClient);
    };
    const rowSelection = {
        selectedRow,
        onChange: onSelectChange
    };
    const onSelectTrashChange = (selectedRowTrash) => {
        setSelectedRowsTrash(selectedRowTrash);
    };
    const rowSelectionTrash = {
        selectedRowTrash,
        onChange: onSelectTrashChange
    };

    function deleteTempDigitalProduct(id: string) {
        AdminApi.tempDeleteBlog(`digital-product/temp-multi-delete?id=${id}`, token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    setDeleteModal(undefined);
                    openNotificationWithIcon({ type: 'success', message });
                    refreshData();
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }
    function deleteDigitalProduct(id: string) {
        AdminApi.tempDeleteBlog(`digital-product/delete?id=${id}`, token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    setDeleteModal(undefined);
                    openNotificationWithIcon({ type: 'success', message });
                    setDeleteModalTrash(undefined);
                    refreshData();
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }

    function multiDelete(selectedRow: string[]) {
        AdminApi.tempDeleteBlog(`digital-product/temp-multi-delete?id=${selectedRow}`, token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    setDeleteModal(undefined);
                    openNotificationWithIcon({ type: 'success', message });
                    setMultiDeleteModal(false);
                    setSelectedRows([]);
                    refreshData();
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }
    function MultideleteDigitalProduct(selectedRowTrash: string[]) {
        AdminApi.tempDeleteBlog(`digital-product/multi-delete?id=${selectedRowTrash}`, token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.status;
                if (status) {
                    setDeleteModal(undefined);
                    openNotificationWithIcon({ type: 'success', message });
                    setMultiDeleteTrashModal(false);
                    setSelectedRowsTrash([]);
                    // refreshData();
                    setDigitalProduct((prev) =>
                        prev.filter((nationality) => !selectedRowTrash.includes(nationality._id))
                    );
                    // setSelectedRowsTrash([]);
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    }

    const activeDigitalProduct = (check, id: string) => {
        const formData = new URLSearchParams();
        check = 1 - check;
        formData.append('id', id);
        formData.append('status', check);

        AdminApi.createPost(formData, 'digital-product/status', token)
            .then((datas) => {
                const message = datas.message;
                const status = datas.message;
                if (status) {
                    openNotificationWithIcon({ type: 'success', message });
                    refreshData();
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };

    const restoreDigitalProduct = (id: string) => {
        const formData = new URLSearchParams();
        formData.append('id', id);
        AdminApi.RestorePatch(formData, 'digital-product/restore', token)
            .then((datas) => {
                const message = datas.message;
                const success = datas.message;
                if (success) {
                    openNotificationWithIcon({ type: 'success', message });
                    // refreshData();
                    setDigitalProduct((prev) => prev.filter((nationality) => nationality._id !== id));
                } else {
                    openNotificationWithIcon({ type: 'error', message: message });
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message;
                openNotificationWithIcon({ type: 'error', message: message });
            });
    };

    const DigitalProductTable: ColumnProps<IDigitalProduct>[] = [
        {
            key: '_id',
            dataIndex: 'title',
            title: 'Title',
            render: (title) => {
                return <strong>{title}</strong>;
            }
        },
        {
            key: '_id',
            dataIndex: 'subtitletitle',
            title: 'Sub Title',
            render: (subtitletitle) => {
                return <strong>{subtitletitle}</strong>;
            }
        },
        {
            key: '_id',
            dataIndex: 'AuthorName',
            title: 'Author Name',
            render: (AuthorName) => {
                // const name = Author.map((item) => item._id === author_name && item.name);
                return <strong>{AuthorName[0]?.given_name}</strong>;
            }
        },

        {
            key: '_id',
            dataIndex: 'image',
            title: 'Image',
            render: (img) => <PatientImg img={`${process.env.REACT_APP_API_BASE_URL}${img}`} />
        },
        {
            key: '_id',
            dataIndex: 'pdf',
            title: 'PDF',
            render: (pdf) => (
                <Link
                    target='_blank'
                    to={`${process.env.REACT_APP_API_BASE_URL}${pdf}`}
                    rel='noreferrer nofollow'
                >
                    <Button shape='round' className=''>
                        View
                    </Button>
                </Link>
            )
        },
        {
            key: '_id',
            dataIndex: 'date',
            title: 'Date',
            render: (date) => {
                return <strong>{date?.slice(0, 10)}</strong>;
            }
        },

        {
            key: '_id',
            dataIndex: 'title',
            title: 'Description',
            render: (_id, title) => (
                <div className='buttons-list nowrap'>
                    <Button
                        shape='round'
                        type='primary'
                        onClick={() => {
                            setDescriptionModal(true);
                            setDescription(title.des);
                        }}
                    >
                        View
                    </Button>
                </div>
            )
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
                        onClick={() => setNavigate(`../edit-digital-product/${_id}`)}
                    >
                        <EditFilled />
                    </Button>
                    <Button shape='round' type='primary' onClick={() => setDeleteModal(_id)} danger>
                        <DeleteOutlined />
                    </Button>
                </div>
            )
        },

        {
            key: '_id',
            dataIndex: '_id',
            title: 'Status',
            render: (_id, DigitalProduct) => (
                <div className='buttons-list nowrap'>
                    <Switch
                        defaultChecked={DigitalProduct.status === 0 ? false : true}
                        onChange={() => activeDigitalProduct(DigitalProduct.status, _id)}
                    />
                </div>
            )
        }
    ];
    const DigitalProductTrashTable: ColumnProps<IDigitalProduct>[] = [
        {
            key: '_id',
            dataIndex: 'title',
            title: 'Title',
            render: (title) => {
                return <strong>{title}</strong>;
            }
        },
        {
            key: '_id',
            dataIndex: 'AuthorName',
            title: 'Author Name',
            render: (AuthorName) => {
                return <strong>{AuthorName[0]?.given_name}</strong>;
            }
        },
        {
            key: '_id',
            dataIndex: 'subtitletitle',
            title: 'Sub Title',
            render: (subtitletitle) => {
                return <strong>{subtitletitle}</strong>;
            }
        },

        {
            key: '_id',
            dataIndex: 'image',
            title: 'Image',
            render: (img) => <PatientImg img={`${process.env.REACT_APP_API_BASE_URL}${img}`} />
        },

        {
            key: '_id',
            dataIndex: 'pdf',
            title: 'PDF',
            render: (pdf) => (
                <Link
                    target='_blank'
                    to={`${process.env.REACT_APP_API_BASE_URL}${pdf}`}
                    rel='noreferrer nofollow'
                >
                    <Button shape='round' className=''>
                        View pdf
                    </Button>
                </Link>
            )
        },
        {
            key: '_id',
            dataIndex: 'date',
            title: 'Date',
            render: (date) => {
                return <strong>{date?.slice(0, 10)}</strong>;
            }
        },
        {
            key: '_id',
            dataIndex: 'title',
            title: 'Description',
            render: (_id, title) => (
                <div className='buttons-list nowrap'>
                    <Button
                        shape='round'
                        type='primary'
                        onClick={() => {
                            setDescriptionModal(true);
                            setDescription(title.des);
                        }}
                    >
                        View
                    </Button>
                </div>
            )
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
                        onClick={() => restoreDigitalProduct(_id)}
                    >
                        Restore
                    </Button>
                    <Button shape='round' type='primary' onClick={() => setDeleteModalTrash(_id)} danger>
                        <DeleteOutlined /> Delete
                    </Button>
                </div>
            )
        }
    ];

    return (
        <>
            {Type === 'View' && (
                <div className='d-flex justify-content-end align-items-center'>
                    {selectedRow.length !== 0 && (
                        <Button
                            className='mb-3'
                            shape='round'
                            type='primary'
                            danger
                            onClick={() => setMultiDeleteModal(true)}
                        >
                            Delete Multiple
                        </Button>
                    )}
                    <Button
                        className='mb-3 ms-1 mx-2'
                        shape='round'
                        type='primary'
                        danger
                        onClick={() => setNavigate('/admin/view-trash-digital-product')}
                    >
                        <DeleteOutlined />
                    </Button>
                    <Button
                        className='mb-3 ms-1 mx-2'
                        shape='round'
                        type='primary'
                        onClick={() => setNavigate('/admin/add-digital-product')}
                    >
                        Add Digital Product
                    </Button>
                </div>
            )}
            {Type === 'Trash' && (
                <div className='d-flex justify-content-end align-items-center'>
                    {selectedRowTrash.length !== 0 && (
                        <Button
                            className='mb-3'
                            shape='round'
                            type='primary'
                            danger
                            onClick={() => setMultiDeleteTrashModal(true)}
                        >
                            Delete Multiple
                        </Button>
                    )}
                    <Button
                        className='mb-3 ms-1 mx-2'
                        shape='round'
                        type='primary'
                        onClick={() => setNavigate('/admin/view-digital-product')}
                    >
                        View Digital Product
                    </Button>
                </div>
            )}
            {Type === 'View' && (
                <Table
                    rowSelection={rowSelection}
                    className='accent-header'
                    rowKey='_id'
                    dataSource={DigitalProduct}
                    columns={DigitalProductTable}
                />
            )}

            {Type === 'Trash' && (
                <Table
                    rowSelection={rowSelectionTrash}
                    className='accent-header'
                    rowKey='_id'
                    dataSource={DigitalProduct}
                    columns={DigitalProductTrashTable}
                />
            )}
            {/* Temp Delete Modal  */}
            <Modal
                open={deleteModal}
                footer={null}
                onCancel={() => setDeleteModal(undefined)}
                className='d-flex '
                title={<h3 className='title text-center'>Delete Digital Product</h3>}
            >
                <Button
                    shape='round'
                    type='primary'
                    onClick={() => deleteTempDigitalProduct(deleteModal)}
                    danger
                >
                    Move to Bin
                </Button>
                <Button shape='round' type='primary' onClick={() => setDeleteModal(undefined)}>
                    Cancel
                </Button>
            </Modal>
            {/* Temp Delete Modal  */}

            {/* Permanent Delete Modal  */}
            <Modal
                open={deleteModalTrash}
                footer={null}
                onCancel={() => setDeleteModalTrash(undefined)}
                className='d-flex '
                title={<h3 className='title text-center'>Delete Permant Digital Product</h3>}
            >
                <Button
                    shape='round'
                    type='primary'
                    onClick={() => deleteDigitalProduct(deleteModalTrash)}
                    danger
                >
                    Delete
                </Button>
                <Button shape='round' type='primary' onClick={() => setDeleteModalTrash(undefined)}>
                    Cancel
                </Button>
            </Modal>
            {/* Permanent Delete Modal  */}
            {/* Description Modal  */}
            <Modal
                open={descriptionModal}
                footer={null}
                onCancel={() => setDescriptionModal(false)}
                className='d-flex'
                title={<h3 className='title text-center'>Description</h3>}
            >
                <span className='wrap'>{description}</span>
            </Modal>
            {/* Description Modal  */}
            {/* Multi Temp Modal  */}
            <Modal
                open={MultiDeleteModal}
                footer={null}
                onCancel={() => setMultiDeleteModal(false)}
                className='d-flex'
                title={<h4 className='title text-center'>Multiple Delete Digital Product</h4>}
            >
                <Button shape='round' type='primary' onClick={() => multiDelete(selectedRow)} danger>
                    Move to Bin
                </Button>
                <Button shape='round' type='primary' onClick={() => setMultiDeleteModal(false)}>
                    Cancel
                </Button>
            </Modal>
            {/* Multi Temp Modal  */}
            {/* Multi Per Modal  */}
            <Modal
                open={MultiDeleteTrashModal}
                footer={null}
                onCancel={() => setMultiDeleteTrashModal(false)}
                className='d-flex'
                title={<h4 className='title text-center'>Multiple Paramnent Delete Digital Product</h4>}
            >
                <Button
                    shape='round'
                    type='primary'
                    onClick={() => MultideleteDigitalProduct(selectedRowTrash)}
                    danger
                >
                    Move to Bin
                </Button>
                <Button shape='round' type='primary' onClick={() => setMultiDeleteTrashModal(false)}>
                    Cancel
                </Button>
            </Modal>
        </>
    );
};

export default DigitalProductTable;
