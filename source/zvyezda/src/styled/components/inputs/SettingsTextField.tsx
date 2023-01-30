import styled from '@emotion/styled';
import { TextField } from '@mui/material';

export default styled(TextField)({
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
