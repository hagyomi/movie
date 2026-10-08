import { DEFAULT_CATEGORY } from './constants';

export const createUiSlice = (set) => ({
    listOpen: false,
    selectedCategory: DEFAULT_CATEGORY,

    toggleList: () => set(
        (state) => ({ listOpen: !state.listOpen }),
        false,
        'home/toggleList'
    ),

    setSelectedCategory: (selectedCategory) => set(
        { selectedCategory },
        false,
        'home/setSelectedCategory'
    ),
});

