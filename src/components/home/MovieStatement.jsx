import { useLayoutEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MovieStatement = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return undefined;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const lines = section.querySelectorAll('.movie-statement-line');
        const caption = section.querySelector('.movie-statement-caption');
        const arrow = section.querySelector('.movie-statement-arrow');

        if (reduceMotion) {
            gsap.set([caption, lines, arrow], { autoAlpha: 1, x: 0, y: 0 });
            return undefined;
        }

        const context = gsap.context(() => {
            gsap.set(section, { autoAlpha: 0 });
            gsap.set(caption, { autoAlpha: 0, y: -30 });
            gsap.set(arrow, { autoAlpha: 0, y: 30 });
            lines.forEach((line, index) => {
                gsap.set(line, {
                    autoAlpha: 0,
                    xPercent: index % 2 === 0 ? -140 : 140,
                });
            });

            const timeline = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: section,
                    start: 'top 20px',
                    end: '+=1500',
                    pin: section,
                    pinType: 'fixed',
                    pinSpacing: true,
                    scrub: 1,
                    anticipatePin: 0,
                    refreshPriority: 0,
                    invalidateOnRefresh: true,
                    onEnter: () => gsap.set(section, { autoAlpha: 1 }),
                    onEnterBack: () => gsap.set(section, { autoAlpha: 1 }),
                    onLeaveBack: () => gsap.set(section, { autoAlpha: 0 }),
                },
            });

            timeline
                .to(caption, { autoAlpha: 1, y: 0, duration: 0.5 })
                .to(lines, { autoAlpha: 1, xPercent: 0, duration: 1, stagger: 0.32 })
                .to(arrow, { autoAlpha: 1, y: 0, duration: 0.5 })
                .to({}, { duration: 0.35 });
        }, section);

        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        return () => context.revert();
    }, []);

    return (
        <section ref={sectionRef} className="movie-statement" aria-labelledby="movie-statement-title">
            <p className="movie-statement-caption">A NEW WAY TO WATCH</p>
            <h2 id="movie-statement-title" className="movie-statement-title">
                <span className="movie-statement-line movie-statement-line-one">
                    <span>where</span> <em>Cinema</em>
                </span>
                <span className="movie-statement-line movie-statement-line-two"><em>Becomes</em></span>
                <span className="movie-statement-line movie-statement-line-three">pure</span>
                <span className="movie-statement-line movie-statement-line-four">emotion</span>
            </h2>
            <span className="movie-statement-arrow" aria-hidden="true">⌄</span>
        </section>
    );
};

export default MovieStatement;
