import React, { useEffect, useRef } from "react";
import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type boxDataType = {
    icon: string;
    info: string;
};

type serviceProps = {
    boxData : boxDataType[]
}

export function Service({ boxData } : serviceProps) {
    const serviceRef = useRef<HTMLDivElement | null>(null);
    const boxesRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (boxesRef.current.length > 0) {
            gsap.fromTo(boxesRef.current, {
                opacity: 0,
                y: 50,
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
            });
        }
    }, []);

    // const dataBox: BoxDataType[] = [
    //     {
    //         info: "Sécurité",
    //         icon: "security",
    //     },
    //     {
    //         info: "Protection",
    //         icon: "protect",
    //     },
    //     {
    //         info: "Anonymat",
    //         icon: "anonym",
    //     },
    // ];

    return (
        <div className="services-container" ref={serviceRef}>
            <div className="title">
                <>
                    <img src="/icons/service.svg" alt="" />
                    <h1>
                        Nos services
                    </h1>
                </>
            </div>
            <div className="service">
                {boxData.map((data, index) => (
                    <BoxService
                        key={index}
                        data={data}
                        ref={(el) => boxesRef.current[index] = el}
                    />
                ))}
            </div>
        </div>
    );
}

const BoxService = React.forwardRef<HTMLDivElement, { data: boxDataType }>(({ data }, ref) => (
    <div className="box-service" ref={ref}>
        <div className="image-contain">
            <img src={"/icons/" + data.icon + ".png"} alt="" />
        </div>
        <p>{data.info}</p>
    </div>
));
