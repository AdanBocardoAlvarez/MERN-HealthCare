import { AutoComplete } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { ClientApi } from '../../../api/api';
import { encodeSlug } from '../../../utils/helper';
import { openNotificationWithIcon } from '../../components/Toast';
import { useTranslation } from 'react-i18next';

const Search = () => {

    const navigate = useNavigate();
    const { t } = useTranslation()

    const [allOptions, setAllOptions] = useState<{ value: string }[]>([]);
    const [options, setOptions] = useState<{ value: string }[]>(allOptions);

    useEffect(() => {
        (async () => {
            try {
                var data = await ClientApi.simpleGet('get-search-keys', null);
                setAllOptions(data);
            } catch (error: any) {
                const message = error?.response?.data?.message || error.message;
                openNotificationWithIcon({ type: 'error', message: message });
            }
        })()
    }, [])

    const onSelect = (search: string) => navigate(`/our-experts/${encodeSlug(search)}`);
    const onSearch = (search: string) => setOptions(allOptions.filter(row => row.value.toLowerCase().indexOf(search.toLowerCase()) !== -1));

    return <div className='position-relative' id='search'>
        <AutoComplete options={options.slice(0, 5)} className='bg-white rounded-3 ' onSelect={onSelect} onSearch={onSearch} placeholder={t('enter-search')} />
        <SearchOutlined className='position-absolute h5 m-0 p-0' style={{ right: 16, top: 10 }} />
    </div>
}

export default Search