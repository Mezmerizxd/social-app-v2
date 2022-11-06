import styled from '@emotion/styled';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

interface CustomCheckBoxProps {
    label?: string;
    required?: boolean;
    checked?: boolean;
    state?: any;
    onClick?: () => void;
}

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

export const CustomCheckBox = ({
    label,
    required,
    state,
    checked,
    onClick,
}: CustomCheckBoxProps) => {
    const CheckBox = styled(Checkbox)({
        '& .MuiSvgIcon-root': {
            color: 'rgb(240, 240, 240)',
        },
        '& .MuiCheckbox-root': {
            color: 'rgb(240, 240, 240)',
            fontFamily: "'Exo 2', sans-serif;",
        },
    });

    return (
        <div className="CustomCheckBox">
            <FormControlLabel
                control={
                    <CheckBox
                        required={required}
                        checked={checked}
                        onChange={(e) => {
                            e.persist();
                            state(e.target.checked);
                        }}
                        onClick={onClick}
                    />
                }
                label={label}
            />
        </div>
    );
};
