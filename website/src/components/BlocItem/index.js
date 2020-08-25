import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './styles.module.scss';

const getIcon = (icon) => {
    switch (icon) {
        case "Cloud":
            return (
                <svg className={styles["bloc-item__icon"]} width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={styles["spot"]} d="M53 43C53 54.597 43.599 64 32 64C20.401 64 11 54.597 11 43C11 31.396 20.401 22 32 22C43.599 22 53 31.396 53 43Z" fill="#C2ECFB" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0269 16.0359C12.5268 7.09609 19.9353 0 29 0C35.1646 0 40.5921 3.04742 43.5768 8H44C47.2343 8 49.7671 9.08587 51.4848 10.9467C52.986 12.573 53.7931 14.7133 53.965 17.0401C60.09 17.5543 64 22.9458 64 29C64 36.1803 58.1792 42 51 42H47V40H51C57.0748 40 62 35.0757 62 29C62 23.4724 58.3236 19 53 19H52V18C52 15.6944 51.3096 13.7056 50.0152 12.3033C48.7329 10.9141 46.7657 10 44 10H42.4108L42.1253 9.48462C39.581 4.89232 34.6803 2 29 2C20.7163 2 14 8.71628 14 17V18H13C6.92528 18 2 22.9253 2 29C2 35.0757 6.92523 40 13 40H17V42H13C5.82077 42 0 36.1803 0 29C0 22.1481 5.30203 16.5336 12.0269 16.0359Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M23 26H41V44H23V26ZM25 28V42H39V28H25Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M27 22V27H25V22H27Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M31 22V27H29V22H31Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M35 22V27H33V22H35Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M39 22V27H37V22H39Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M31 43V64H29V43H31Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M35 43V64H33V43H35Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M45 30H40V28H45V30Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M45 34H40V32H45V34Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M45 38H40V36H45V38Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M45 42H40V40H45V42Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 30H19V28H24V30Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 34H19V32H24V34Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 38H19V36H24V38Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 42H19V40H24V42Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M29 32H35V38H29V32ZM31 34V36H33V34H31Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M25 52V43H27V54H0V52H25Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M37 43H39V52H64V54H37V43Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M27 18V20H25V18H27Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M31 18V20H29V18H31Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M31 14V16H29V14H31Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M35 14V16H33V14H35Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M35 18V20H33V18H35Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M39 18V20H37V18H39Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M15 28H17V30H15V28Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M11 28H13V30H11V28Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M15 32H17V34H15V32Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M11 32H13V34H11V32Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M15 36H17V38H15V36Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M7 28H9V30H7V28Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M49 30H47V28H49V30Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M53 30H51V28H53V30Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M49 34H47V32H49V34Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M53 34H51V32H53V34Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M49 38H47V36H49V38Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M57 30H55V28H57V30Z" fill="#6082A1" />
                </svg>
            )

        case "Genetic":
            return (
                <svg className={styles["bloc-item__icon"]} width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={styles["spot"]} d="M42 21C42 32.597 32.599 42 21 42C9.401 42 0 32.597 0 21C0 9.396 9.401 0 21 0C32.599 0 42 9.396 42 21Z" fill="#C2ECFB" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M29.5039 48.1318L30.4961 49.8683L23.5113 53.8596C23.1742 54.0699 22.7757 54.4421 22.4646 54.8813C22.1389 55.3409 22 55.7435 22 56V64H20V56C20 55.1556 20.3926 54.3461 20.8327 53.725C21.2835 53.0888 21.879 52.5153 22.4763 52.1481L22.49 52.1397L29.5039 48.1318Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M46 37V36H48V37C48 37.8443 47.6069 38.6538 47.1669 39.2747C46.7161 39.9108 46.1208 40.4845 45.5241 40.8517L45.5103 40.8602L38.4961 44.8682L37.5039 43.1318L44.4884 39.1406C44.8252 38.9303 45.2237 38.5577 45.5351 38.1183C45.8611 37.6582 46 37.2557 46 37Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 8V0H22V8C22 8.25597 22.1388 8.65849 22.4646 9.11846C22.7776 9.56025 23.1788 9.93439 23.5169 10.1439L45.5165 23.1436L45.5241 23.1483C46.1208 23.5155 46.7161 24.0892 47.1669 24.7253C47.6069 25.3462 48 26.1557 48 27V33H46V27C46 26.7443 45.8611 26.3418 45.5351 25.8817C45.222 25.4398 44.8207 25.0656 44.4828 24.8559L22.4838 11.8565L22.4763 11.8519C21.8788 11.4846 21.2833 10.9108 20.8326 10.2745C20.3927 9.65351 20 8.84403 20 8Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 37V31H22V37C22 37.256 22.1388 37.6585 22.4646 38.1185C22.7776 38.5603 23.1788 38.9344 23.5169 39.1439L45.5165 52.1436L45.5241 52.1483C46.1206 52.5154 46.716 53.0887 47.1669 53.7249C47.6069 54.3458 48 55.1553 48 56V64H46V56C46 55.7437 45.8611 55.3412 45.5351 54.8814C45.2222 54.4398 44.8209 54.0657 44.4828 53.8559L22.4838 40.8565L22.4763 40.8519C21.8788 40.4846 21.2833 39.9108 20.8326 39.2745C20.3927 38.6535 20 37.844 20 37Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M29.5039 19.1318L30.4961 20.8683L23.5113 24.8596C23.1744 25.0698 22.7759 25.4422 22.4646 25.8816C22.1388 26.3415 22 26.7441 22 27V28H20V27C20 26.156 20.3927 25.3465 20.8326 24.7255C21.2833 24.0892 21.8788 23.5154 22.4763 23.1481L22.49 23.1397L29.5039 19.1318Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M46 8V0H48V8C48 8.84426 47.6069 9.65382 47.1669 10.2747C46.7161 10.9108 46.1208 11.4845 45.5241 11.8517L45.5103 11.8602L38.4961 15.8682L37.5039 14.1318L44.4884 10.1406C44.8252 9.93026 45.2237 9.55771 45.5351 9.11834C45.8611 8.65818 46 8.25574 46 8Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M44 8H24V6H44V8Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M44 4H24V2H44V4Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M33 54H31V52H33V54Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M37 54H35V52H37V54Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M33 41H31V39H33V41Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M37 41H35V39H37V41Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M33 25H31V23H33V25Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M37 25H35V23H37V25Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M33 12H31V10H33V12Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M37 12H35V10H37V12Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M44 58H24V56H44V58Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M44 62H24V60H44V62Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M44 33H24V31H44V33Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M44 29H11V27H44V29Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M57 37H24V35H57V37Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M60 34C58.8954 34 58 34.8954 58 36C58 37.1046 58.8954 38 60 38C61.1046 38 62 37.1046 62 36C62 34.8954 61.1046 34 60 34ZM56 36C56 33.7909 57.7909 32 60 32C62.2091 32 64 33.7909 64 36C64 38.2091 62.2091 40 60 40C57.7909 40 56 38.2091 56 36Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 26C6.89543 26 6 26.8954 6 28C6 29.1046 6.89543 30 8 30C9.10457 30 10 29.1046 10 28C10 26.8954 9.10457 26 8 26ZM4 28C4 25.7909 5.79086 24 8 24C10.2091 24 12 25.7909 12 28C12 30.2091 10.2091 32 8 32C5.79086 32 4 30.2091 4 28Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M58.7359 5.41652C58.9706 5.22153 59 5.10411 59 5H61C61 5.89539 60.5294 6.52659 60.0141 6.95479C59.5483 7.34182 58.9587 7.63502 58.4941 7.86611C58.4778 7.87423 58.4616 7.88227 58.4456 7.89023C57.9172 8.15325 57.5319 8.35091 57.2641 8.57348C57.0294 8.76847 57 8.88589 57 8.99C57 9.09579 57.0304 9.21461 57.2656 9.41081C57.5338 9.63454 57.9193 9.83341 58.4477 10.0979C58.4635 10.1059 58.4796 10.1139 58.4958 10.122C58.9606 10.3545 59.5501 10.6494 60.0157 11.038C60.5306 11.4676 61 12.0997 61 12.995C61 13.8903 60.5306 14.5224 60.0157 14.952C59.5501 15.3406 58.9606 15.6355 58.4958 15.868C58.4796 15.8761 58.4635 15.8841 58.4477 15.8921C57.9193 16.1566 57.5338 16.3555 57.2656 16.5792C57.0304 16.7754 57 16.8942 57 17H55C55 16.1048 55.4696 15.4729 55.9844 15.0434C56.4498 14.6552 57.039 14.3604 57.5037 14.128C57.5201 14.1198 57.5363 14.1117 57.5523 14.1037C58.0806 13.8392 58.4661 13.6403 58.7343 13.4165C58.9694 13.2203 59 13.1012 59 12.995C59 12.8888 58.9694 12.7697 58.7343 12.5735C58.4661 12.3497 58.0806 12.1508 57.5523 11.8863C57.5363 11.8783 57.5201 11.8702 57.5037 11.862C57.039 11.6296 56.4498 11.3348 55.9844 10.9466C55.4696 10.5171 55 9.88521 55 8.99C55 8.09461 55.4706 7.46341 55.9859 7.03521C56.4517 6.64818 57.0413 6.35498 57.5059 6.12389C57.5222 6.11577 57.5384 6.10773 57.5544 6.09977C58.0828 5.83675 58.4681 5.63909 58.7359 5.41652Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.7357 41.4166C12.9707 41.2213 13 41.1038 13 41H15C15 41.8952 14.5293 42.5264 14.0143 42.9545C13.5487 43.3416 12.9594 43.635 12.4948 43.8664C12.4784 43.8745 12.4621 43.8826 12.446 43.8906C11.9177 44.1539 11.5324 44.3519 11.2644 44.5748C11.0295 44.7701 11 44.8878 11 44.992C11 45.0964 11.0297 45.2146 11.265 45.4105C11.5332 45.6339 11.9187 45.8325 12.447 46.0965C12.463 46.1045 12.4791 46.1125 12.4954 46.1207C12.9602 46.3527 13.5495 46.647 14.015 47.0347C14.5297 47.4635 15 48.0949 15 48.99C15 49.8852 14.5304 50.5171 14.0156 50.9466C13.5502 51.3348 12.961 51.6296 12.4963 51.862C12.4799 51.8702 12.4637 51.8783 12.4477 51.8863C11.9194 52.1508 11.5339 52.3497 11.2657 52.5735C11.0306 52.7697 11 52.8888 11 52.995C11 53.1012 11.0306 53.2203 11.2657 53.4165C11.5339 53.6403 11.9194 53.8392 12.4477 54.1037C12.4637 54.1117 12.4799 54.1198 12.4963 54.128C12.961 54.3604 13.5502 54.6552 14.0156 55.0434C14.5304 55.4729 15 56.1048 15 57H13C13 56.8942 12.9696 56.7754 12.7344 56.5792C12.4662 56.3555 12.0807 56.1566 11.5523 55.8921C11.5365 55.8841 11.5204 55.8761 11.5042 55.868C11.0394 55.6355 10.4499 55.3406 9.98427 54.952C9.4694 54.5224 9 53.8903 9 52.995C9 52.0997 9.4694 51.4676 9.98427 51.038C10.4499 50.6494 11.0394 50.3545 11.5042 50.122C11.5204 50.1139 11.5365 50.1059 11.5523 50.0979C12.0807 49.8334 12.4662 49.6345 12.7344 49.4108C12.9696 49.2146 13 49.0958 13 48.99C13 48.8856 12.9703 48.7674 12.735 48.5715C12.4668 48.3481 12.0813 48.1496 11.553 47.8855C11.537 47.8775 11.5209 47.8695 11.5046 47.8613C11.0398 47.6293 10.4505 47.335 9.985 46.9473C9.47026 46.5185 9 45.8871 9 44.992C9 44.0967 9.47046 43.4654 9.98559 43.037C10.4514 42.6497 11.041 42.3561 11.5058 42.1246C11.522 42.1165 11.538 42.1085 11.554 42.1006C12.0824 41.8373 12.4678 41.6393 12.7357 41.4166Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M52 45H58V47H52V45Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M4 41V39H6V41H4Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M9 12V10H11V12H9Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M13 20V14H15V20H13Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M11 16H17V18H11V16Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M51 21H53V23H51V21Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M60 48H62V50H60V48Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M52 56C52 54.8954 52.8954 54 54 54C55.1046 54 56 54.8954 56 56C56 57.1046 55.1046 58 54 58C52.8954 58 52 57.1046 52 56Z" fill="#6082A1" />
                </svg>
            )

        case "Literature":
            return (
                <svg className={styles["bloc-item__icon"]} width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={styles["spot"]} d="M53 43C53 54.597 43.599 64 32 64C20.401 64 11 54.597 11 43C11 31.396 20.401 22 32 22C43.599 22 53 31.396 53 43Z" fill="#C2ECFB" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0269 16.0359C12.5268 7.09609 19.9353 0 29 0C35.1646 0 40.5921 3.04742 43.5768 8H44C47.2343 8 49.7671 9.08587 51.4848 10.9467C52.986 12.573 53.7931 14.7133 53.965 17.0401C60.09 17.5543 64 22.9458 64 29C64 36.1803 58.1792 42 51 42H47V40H51C57.0748 40 62 35.0757 62 29C62 23.4724 58.3236 19 53 19H52V18C52 15.6944 51.3096 13.7056 50.0152 12.3033C48.7329 10.9141 46.7657 10 44 10H42.4108L42.1253 9.48462C39.581 4.89232 34.6803 2 29 2C20.7163 2 14 8.71628 14 17V18H13C6.92528 18 2 22.9253 2 29C2 35.0757 6.92523 40 13 40H17V42H13C5.82077 42 0 36.1803 0 29C0 22.1481 5.30203 16.5336 12.0269 16.0359Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M23 26H41V44H23V26ZM25 28V42H39V28H25Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M27 22V27H25V22H27Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M31 22V27H29V22H31Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M35 22V27H33V22H35Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M39 22V27H37V22H39Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M31 43V64H29V43H31Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M35 43V64H33V43H35Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M45 30H40V28H45V30Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M45 34H40V32H45V34Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M45 38H40V36H45V38Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M45 42H40V40H45V42Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 30H19V28H24V30Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 34H19V32H24V34Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 38H19V36H24V38Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 42H19V40H24V42Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M29 32H35V38H29V32ZM31 34V36H33V34H31Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M25 52V43H27V54H0V52H25Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M37 43H39V52H64V54H37V43Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M27 18V20H25V18H27Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M31 18V20H29V18H31Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M31 14V16H29V14H31Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M35 14V16H33V14H35Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M35 18V20H33V18H35Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M39 18V20H37V18H39Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M15 28H17V30H15V28Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M11 28H13V30H11V28Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M15 32H17V34H15V32Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M11 32H13V34H11V32Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M15 36H17V38H15V36Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M7 28H9V30H7V28Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M49 30H47V28H49V30Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M53 30H51V28H53V30Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M49 34H47V32H49V34Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M53 34H51V32H53V34Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M49 38H47V36H49V38Z" fill="#6082A1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M57 30H55V28H57V30Z" fill="#6082A1" />
                </svg>
            )
        default:
            throw new Error(`Icon ${icon} not supported.`);
    }
}

const BlocItem = (props) => {
    return (
        <a href="#" className={`${styles["bloc-item"]}`}>
            <svg className={styles["bloc-item__bg"]} width="260" height="224" viewBox="0 0 260 224" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 24.2071L24.2071 0.5H259.5V199.793L235.793 223.5H0.5V24.2071Z" fill="white" stroke="#B5C6D8" />
            </svg>
            <div>{getIcon(props.icon)}</div>
            <div>{props.children}</div>
        </a >
    )
}

BlocItem.propTypes = {
    icon: PropTypes.oneOf(["Cloud", "Genetic", "Literature"]).isRequired,
}

export default BlocItem;