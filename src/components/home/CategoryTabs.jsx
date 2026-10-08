import { twMerge } from 'tailwind-merge';

const CategoryTabs = ({ categories, selectedCategory, setSelectedCategory, className }) => {
    return (
        <nav aria-label="영화 카테고리" className={twMerge('flex gap-2', className)}>
            {Object.keys(categories).map((category) => {
                const isSelected = selectedCategory === category;

                return (
                    <button
                        type="button"
                        key={category}
                        aria-pressed={isSelected}
                        onClick={() => {
                            setSelectedCategory(category);
                            window.dispatchEvent(
                                new CustomEvent('movie-category-select', { detail: category })
                            );
                        }}
                        className={twMerge(
                            `
                                h-11 shrink-0 rounded-full border border-[#c9c9c9]
                                bg-white px-5 text-sm font-medium text-black
                                transition-colors duration-200
                                hover:border-black
                            `,
                            isSelected && 'border-white bg-black font-semibold text-white'
                        )}
                    >
                        {category.toUpperCase()}
                    </button>
                );
            })}
        </nav>
    );
};

export default CategoryTabs;
