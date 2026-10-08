import { motion } from 'motion/react';
import { containerVariants, innerVariants } from '../../animations/variants';

export const MotionWrapper = ({
    children,
    custom,
    tag: Tag = 'div',
    className = '',
    disabled = false,
    ...rest
}) => {
    if (disabled) {
        return (
            <Tag className={className} {...rest}>
                {children}
            </Tag>
        );
    }

    const MotionTag = motion[Tag];

    return (
        <MotionTag
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={custom}
            className={className}
            {...rest}
        >
            {children}
        </MotionTag>
    );
};

export const Motion = ({
    children,
    custom,
    tag: Tag = 'div',
    transition = { duration: 0.5 },
    className = '',
    disabled = false,
    ...rest
}) => {
    if (disabled) {
        return (
            <Tag className={className} {...rest}>
                {children}
            </Tag>
        );
    }

    const MotionTag = motion[Tag];

    return (
        <MotionTag
            variants={innerVariants}
            custom={custom}
            transition={transition}
            className={className}
            {...rest}
        >
            {children}
        </MotionTag>
    );
};
