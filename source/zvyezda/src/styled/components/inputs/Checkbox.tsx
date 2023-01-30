import styled from '@emotion/styled';
import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { CheckboxContainer } from './styled';

const CheckBox = styled(Checkbox)({
    '& .MuiSvgIcon-root': {
        color: 'rgb(240, 240, 240)',
    },
    '& .MuiCheckbox-root': {
        color: 'rgb(240, 240, 240)',
        fontFamily: "'Exo 2', sans-serif;",
    },
});

export default ({
    label,
    required,
    state,
    checked,
    onClick,
}: Client.Styled.Components.Inputs.Checkbox) => {
    return (
        <CheckboxContainer>
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
        </CheckboxContainer>
    );
};
