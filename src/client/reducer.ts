import { createSlice } from '@reduxjs/toolkit';

export interface InitialStateProps {
    name: any;
    version: any;
    description: any;
    repository: any;
    author: any;
    license: any;
}

export const InitialState: InitialStateProps = {
    name: null,
    version: null,
    description: null,
    repository: null,
    author: null,
    license: null,
};

export const SourceSlice = createSlice({
    name: 'source',
    initialState: InitialState,
    reducers: {
        setInfo: (state, action) => {
            state.name = action.payload.name;
            state.version = action.payload.version;
            state.description = action.payload.description;
            state.repository = action.payload.repository;
            state.author = action.payload.author;
            state.license = action.payload.license;
        },
    },
});

export const { setInfo } = SourceSlice.actions;

export default SourceSlice.reducer;
