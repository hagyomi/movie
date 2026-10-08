import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createMovieSlice } from './createMovieSlice';
import { createUiSlice } from './createUiSlice';

export const useHomeStore = create(
    devtools(
        (...args) => ({
            ...createUiSlice(...args),
            ...createMovieSlice(...args),
        }),
        { name: 'byunse-home-store' }
    )
);

