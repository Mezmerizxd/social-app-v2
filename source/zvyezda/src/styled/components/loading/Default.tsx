import React from 'react';
import { LoadingContainer, LoadingDefault } from './styled';

export default ({
    isLoading,
    name,
    style,
}: Client.Styled.Components.Loading.Default) => {
    return (
        isLoading && (
            <LoadingContainer style={style}>
                <LoadingDefault id={name} key={name}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </LoadingDefault>
            </LoadingContainer>
        )
    );
};
