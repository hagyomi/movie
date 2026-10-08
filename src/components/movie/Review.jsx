import { startTransition, useActionState, useOptimistic, useState } from 'react';
import Input from '../ui/Input';
import Text from '../ui/Text';
import ReviewList from './ReviewList';
import ReviewActions from './ReviewActions';
import { MotionWrapper } from '../ui/MotionWrapper';

async function saveReview(formData) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
        id: Number(formData.get('reviewId')),
        text: formData.get('reviewText'),
        date: new Date().toLocaleString(),
    };
}

const Review = () => {
    const [reviewText, setReviewText] = useState('');

    const [confirmedReviews, reviewAction] = useActionState(async (reviews, payload) => {
        if (payload.intent === 'delete') {
            return reviews.filter((review) => review.id !== payload.id);
        }

        const savedReview = await saveReview(payload);
        return [savedReview, ...reviews];
    }, []);

    const [optimisticReviews, updateOptimisticReviews] = useOptimistic(
        confirmedReviews,
        (reviews, action) => {
            if (action.type === 'delete') {
                return reviews.filter((review) => review.id !== action.id);
            }

            return [action.review, ...reviews];
        }
    );

    const handleReset = () => setReviewText('');

    const handleSubmit = (formData) => {
        const text = formData.get('reviewText').trim();
        if (!text) {
            alert('리뷰 내용을 작성하세요.');
            return;
        }

        const review = {
            id: Date.now(),
            text,
            date: new Date().toLocaleString(),
        };

        formData.set('reviewId', review.id);
        updateOptimisticReviews({ type: 'add', review });
        handleReset();
        reviewAction(formData);
    };

    const handleDelete = (id) => {
        startTransition(() => {
            updateOptimisticReviews({ type: 'delete', id });
            reviewAction({ intent: 'delete', id });
        });
    };

    return (
        <>
            <MotionWrapper
                disabled
                custom={{ type: 'horizontal', delay: 0.6, value: 50 }}
                tag="section"
                className="movie-review-list"
            >
                <ReviewList
                    data={optimisticReviews}
                    className="movie-review-items"
                >
                    {(review) => (
                        <>
                            <button
                                type="button"
                                aria-label="리뷰 삭제"
                                onClick={() => handleDelete(review.id)}
                                className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full text-lg text-theme opacity-45 transition-opacity hover:opacity-100"
                            >
                                ×
                            </button>
                            <Text tag="h2" className="font-bold mb-1">
                                {review.text}
                            </Text>
                            <Text className="text-xs opacity-60">{review.date}</Text>
                        </>
                    )}
                </ReviewList>
            </MotionWrapper>

            <MotionWrapper
                disabled
                custom={{ type: 'horizontal', delay: 1, value: 50 }}
                className="movie-review-form"
            >
                <Text tag="h2" className="movie-review-title">
                    Leave a Review
                </Text>

                <form action={handleSubmit}>
                    <Input
                        tag="textarea"
                        name="reviewText"
                        value={reviewText}
                        onChange={(event) => setReviewText(event.target.value)}
                        placeholder="영화 리뷰를 작성하세요"
                        rows={6}
                        className="h-30 mb-2 placeholder:text-theme-[0.5]"
                    />
                    <ReviewActions handleReset={handleReset} />
                </form>
            </MotionWrapper>
        </>
    );
};

export default Review;
