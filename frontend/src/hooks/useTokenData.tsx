import { useSelector } from 'react-redux';
import { AppState } from './../redux/store';
// import { ITokenData } from '../interfaces/token';
// import { setTokenData } from '../redux/token/actions';
// import { useEffect } from 'react';

export const useConTokenData = () => useSelector((state: AppState) => state?.consultant);
export const useAdminTokenData = () => useSelector((state: AppState) => state?.admin);

// export function SetTokenData(data: ITokenData) {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setTokenData({ ...data, isAuth: true }));
//   }, [data, dispatch]);
// }
