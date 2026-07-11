'use client';

import clsx from "clsx";
import { useLayoutEffect, useState, useRef } from "react";
import { Plus, Minus } from 'lucide-react';
import { gsap } from "../../lib/gsap";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface FaqCardProps {
    question: string;
    answer: string;
}

const FaqCard: React.FC<FaqCardProps> = ({ question, answer }) => {
    const [expanded, setExpanded] = useState(false);
    const [answerHeight, setAnswerHeight] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const answerRef = useRef<HTMLDivElement>(null);
    const reducedMotion = usePrefersReducedMotion();

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const setAnswerHeightFn = () => {
        if (!answerRef.current) return;
        
        const box = answerRef.current.getBoundingClientRect();
        const { height } = box;

        setAnswerHeight(height);
    }

    useLayoutEffect(() => {
        setAnswerHeightFn();
    }, [expanded]);

    useLayoutEffect(() => {
        const card = cardRef.current;

        if (!card || reducedMotion) {
            return;
        }

        let hasAnimated = false;

        const ctx = gsap.context(() => {
            gsap.set(card, {
                y: 26,
                opacity: 0,
            });
        }, card);

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                if (!entry?.isIntersecting || hasAnimated) {
                    return;
                }

                hasAnimated = true;
                observer.disconnect();

                gsap.to(card, {
                    y: 0,
                    opacity: 1,
                    duration: 0.75,
                    ease: 'power3.out',
                    overwrite: true,
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -8% 0px',
            }
        );

        observer.observe(card);

        return () => {
            observer.disconnect();
            ctx.revert();
        };
    }, [reducedMotion]);

    return (
        <div className={clsx(
            'group/faq faq-card py-4 px-6 rounded-[16px] border-[1px] border-border-light',
            (expanded ? '-active' : '')
        )} ref={cardRef}>
            <div className="faq-card__top flex justify-between gap-4 cursor-pointer" onClick={toggleExpanded}>
                <h3 className="faq-question">{question}</h3>
                <div className="faq-icon flex relative top-[2px] text-primary">
                    {expanded ? <Minus size={20} /> : <Plus size={20} />}
                </div>
            </div>
            <div className={clsx(
                `faq-card__answer wc-body-sm overflow-hidden opacity-0 group-[.-active]/faq:mt-4 group-[.-active]/faq:max-h-[${answerHeight}px] group-[.-active]/faq:opacity-100`,
                !expanded ? 'max-h-0' : ''
            )}>
                <div className="faq-card__answer-text translate-y-6 group-[.-active]/faq:translate-y-0" ref={answerRef}>
                    {answer}
                </div>
            </div>
        </div>
    );
};

export default FaqCard;
