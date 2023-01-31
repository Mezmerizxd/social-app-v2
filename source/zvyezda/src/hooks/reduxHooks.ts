import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => Client.AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<Client.RootState> = useSelector;
