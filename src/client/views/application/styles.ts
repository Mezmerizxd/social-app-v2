import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';

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

export const CustomSettingsInputField = styled(TextField)({
    width: '100%',
    marginTop: '10px',
    marginBottom: '10px',
    '& label': {
        color: '#fff',
    },
    '& input': {
        color: '#fff',
    },
    '& label.Mui-focused': {
        color: 'rgb(240, 240, 240)',
    },
    '& label.Mui-disabled': {
        color: '#fff',
    },
    '& input.Mui-disabled': {
        color: '#fff',
    },
    '& label.Mui-focused.Mui-disabled': {
        color: 'rgb(240, 240, 240)',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgb(240, 240, 240)',
        },
        '&:hover fieldset': {
            borderColor: 'rgb(220, 220, 220)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgb(255, 255, 255)',
        },
    },
    '& .MuiInputBase-root.Mui-disabled': {
        '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
        },
        '&:hover fieldset': {
            borderColor: 'rgb(220, 220, 220)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgb(255, 255, 255)',
        },
    },
});
