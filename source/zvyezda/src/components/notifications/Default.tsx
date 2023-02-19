import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { DefaultContainer, DefaultIcon, Default, DefaultMessage, DefaultClose } from './styled';
import CloseIcon from '@mui/icons-material/Close';
import { close } from './reducer';
import { useEffect } from 'react';

export default () => {
  const state: Client.Components.Notifications.Default.InitialState = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state.open === true && state.wait !== null) {
      setTimeout(() => {
        dispatch(close());
      }, state.wait);
    }
  }, [state]);

  return (
    state.open === true && (
      <DefaultContainer>
        <Default>
          {state.icon !== null && <DefaultIcon>{state.icon}</DefaultIcon>}
          <DefaultMessage>{state.message}</DefaultMessage>
          {state.closable === true && (
            <DefaultClose onClick={() => dispatch(close())}>
              <CloseIcon />
            </DefaultClose>
          )}
        </Default>
      </DefaultContainer>
    )
  );
};
