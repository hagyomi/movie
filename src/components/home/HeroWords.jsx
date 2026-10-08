import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/background.css';

gsap.registerPlugin(ScrollTrigger);

const HeroWords = () => {
    const backgroundRef = useRef(null);

    useLayoutEffect(() => {
        const background = backgroundRef.current;
        const hero = background?.closest('.home-hero');
        if (!background || !hero) return undefined;

        const words = Array.from(background.querySelectorAll('.category-background-word'));
        const completeTitle = background.querySelector('.category-background-complete');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduceMotion) {
            gsap.set(words, { autoAlpha: 0 });
            gsap.set(completeTitle, { autoAlpha: 1, y: 0, scale: 0.58 });
            return undefined;
        }

        const context = gsap.context(() => {
            gsap.set(words, { autoAlpha: 0, y: 32 });
            gsap.set(completeTitle, { autoAlpha: 0, y: 32, scale: 1.28 });

            const renderProgress = (progress) => {
                const scaled = Math.min(progress * 5, 4.999);
                const phase = Math.floor(scaled);
                const phaseProgress = scaled - phase;

                words.forEach((word, index) => {
                    if (phase !== index) {
                        gsap.set(word, { autoAlpha: 0, y: index < phase ? -32 : 32 });
                        return;
                    }

                    const entering = phase === 0 ? 1 : Math.min(phaseProgress / 0.18, 1);
                    const leaving =
                        phaseProgress > 0.88 ? Math.max((1 - phaseProgress) / 0.12, 0) : 1;

                    gsap.set(word, {
                        autoAlpha: Math.min(entering, leaving),
                        y:
                            phaseProgress < 0.18
                                ? 32 * (1 - entering)
                                : phaseProgress > 0.88
                                  ? -32 * (1 - leaving)
                                  : 0,
                    });
                });

                if (phase === 4) {
                    const reveal = Math.min(phaseProgress / 0.12, 1);
                    const shrink = Math.min(Math.max((phaseProgress - 0.12) / 0.83, 0), 1);
                    gsap.set(completeTitle, {
                        autoAlpha: reveal,
                        y: 32 * (1 - reveal),
                        scale: 1.28 - shrink * 0.7,
                    });
                } else {
                    gsap.set(completeTitle, { autoAlpha: 0, y: 32, scale: 1.28 });
                }
            };

            ScrollTrigger.create({
                trigger: hero,
                start: 'top top',
                end: '+=3500',
                pin: hero,
                pinType: 'fixed',
                pinSpacing: true,
                scrub: true,
                anticipatePin: 0,
                refreshPriority: 20,
                fastScrollEnd: false,
                invalidateOnRefresh: true,
                onUpdate: ({ progress }) => renderProgress(progress),
                onRefresh: ({ progress }) => renderProgress(progress),
            });

            renderProgress(0);
            gsap.fromTo(
                words[0],
                { autoAlpha: 0, y: 28 },
                { autoAlpha: 1, y: 0, duration: 0.9, delay: 0.15, ease: 'power2.out' },
            );
        }, background);

        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        return () => context.revert();
    }, []);

    return (
        <div ref={backgroundRef} className="category-background">
            <h2
                id="home-hero-title"
                className="category-background-title"
                aria-label="Discover Your Movie Story"
            >
                <span className="category-background-word">Discover</span>
                <span className="category-background-word">Your</span>
                <span className="category-background-word">Movie</span>
                <span className="category-background-word">Story</span>
            </h2>
            <div className="category-background-complete" aria-hidden="true">
                <span>Discover Your</span>
                <span>Movie Story</span>
            </div>
        </div>
    );
};

export default HeroWords;
