import React from 'react';
import { useState } from 'react';
import styles from './styles.module.scss';

const BlocItem = (props) => {
    const [hover, setHover] = useState(false);
    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={styles["bloc-item"]}>
            <div className={styles["bloc-item__background"]}>
                {
                    (!hover) ?
                        <svg width="284" height="248" viewBox="0 0 284 248" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 30.2071L36.2071 6.5H271.5V205.793L247.793 229.5H12.5V30.2071Z" fill="white" stroke="#B5C6D8" />
                        </svg> :

                        <svg width="284" height="248" viewBox="0 0 284 248" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_dd)">
                                <path d="M36 6H272V206L248 230H12V30L36 6Z" fill="white" />
                                <path d="M12.5 30.2071L36.2071 6.5H271.5V205.793L247.793 229.5H12.5V30.2071Z" stroke="#91DCF8" />
                            </g>
                            <defs>
                                <filter id="filter0_dd" x="0.25532" y="0.12766" width="283.489" height="247.489" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                    <feOffset dy="5.87234" />
                                    <feGaussianBlur stdDeviation="5.87234" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.682353 0 0 0 0 0.937255 0 0 0 0.2 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                    <feOffset />
                                    <feGaussianBlur stdDeviation="0.183511" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.682353 0 0 0 0 0.937255 0 0 0 1 0" />
                                    <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                }
            </div>

            <div className={styles["bloc-item__content"]}>
                {props.children}
            </div>

        </div>
    )
}

export default BlocItem;