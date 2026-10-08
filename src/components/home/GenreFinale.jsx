import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const GenreFinale = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return undefined;

        const title = section.querySelector('.genre-finale-title');
        const details = section.querySelectorAll('.genre-finale-detail');
        const reveal = section.querySelector('.genre-finale-reveal');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduceMotion) {
            gsap.set([title, details], { autoAlpha: 1, x: 0, y: 0 });
            gsap.set(reveal, { autoAlpha: 0 });
            return undefined;
        }

        const context = gsap.context(() => {
            gsap.set(details, { autoAlpha: 0, y: 22 });
            gsap.set(reveal, { autoAlpha: 1 });
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '+=2200',
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onEnter: () => gsap.to(reveal, {
                        autoAlpha: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: true,
                    }),
                    onEnterBack: () => gsap.to(reveal, {
                        autoAlpha: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: true,
                    }),
                    onLeaveBack: () => gsap.set(reveal, { autoAlpha: 1 }),
                },
            });

            timeline
                .fromTo(title, { xPercent: 12 }, { xPercent: -58, ease: 'none', duration: 3 }, 0)
                .to(details, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.45 }, 0.18)
                .to(details, { autoAlpha: 0, y: -18, duration: 0.3 }, 2.65);
        }, section);

        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        return () => context.revert();
    }, []);

    return (
        <section ref={sectionRef} className="genre-finale" aria-labelledby="genre-finale-title">
            <div className="genre-finale-reveal" aria-hidden="true" />
            <div className="genre-finale-grain" aria-hidden="true" />
            <p className="genre-finale-kicker genre-finale-detail">
                Crime is whispered.<br />Truth walks alone.<br />Shadows remember.
            </p>
            <h2 id="genre-finale-title" className="genre-finale-title">NOIR</h2>
            <img
                className="genre-finale-character-static"
                src="/images/noir-walk/frame-01.png"
                alt="트렌치코트와 페도라를 입은 느와르 탐정"
            />
            <div className="genre-finale-meta genre-finale-detail">
                <span>FEATURED GENRE</span>
                <strong>NOIR</strong>
                <small>1940 — FOREVER</small>
            </div>
            <Button
                className="genre-finale-link genre-finale-detail"
                onClick={() => document.querySelector('.home-movie-scroll-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
                EXPLORE THE PROJECT
            </Button>
        </section>
    );
};

export default GenreFinale;
