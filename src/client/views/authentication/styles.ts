import styled from '@emotion/styled';
import { TextField, Button } from '@mui/material';

export const CustomTextField = styled(TextField)({
    width: '100%',
    marginTop: 20,
    '& label': {
        color: 'white',
    },
    '& input': {
        color: 'white',
    },
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'rgb(200, 200, 200)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
    '& svg': {
        color: 'white',
    },
});

export const CustomButton = styled(Button)({
    color: 'black',
    backgroundColor: 'white',
});
