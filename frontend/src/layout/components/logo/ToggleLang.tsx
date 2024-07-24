import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { updateLangData } from '../../../redux/langugage/actions';

type Props = {}

const ToggleLang = (props: Props) => {

    const dispatch = useDispatch();
    const Language = useSelector((state: AppState) => state.language.type);

    return (
        <select style={{ borderRadius: '20px' }} className='px-3 py-2 mx-2 border-0' onChange={(e) => dispatch(updateLangData({ type: e.target.value }))} value={Language}>
            <option value="en">English</option>
            <option value="fr">French</option>
        </select>
    )
}

export default ToggleLang