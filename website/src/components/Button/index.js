import React from 'react';
import styles from './Button.module.scss';

export const Button = ({children, className = '', type = 'primary', disabled = false, ...rest}) => {
  const disableModifier = disabled ? '--disabled' : '';

  const buttonType = {
    primary: styles['primaryButton' + disableModifier],
    secondary: styles['secondaryButton' + disableModifier],
  }
  return (
    <button disabled={disabled} className={`${buttonType[type]} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export const ResetIcon = ({ disabled }) => {
  const disableModifier = disabled ? '--disabled' : '';

  return (
    <svg className={styles['resetIcon' + disableModifier]} width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.4291 2.86152L11.658 3.46445C10.6066 2.12051 8.97149 1.25781 7.13536 1.25781C3.96485 1.25781 1.39864 3.82129 1.39454 6.99316C1.39043 10.1678 3.96211 12.7422 7.13536 12.7422C9.61407 12.7422 11.7264 11.1699 12.5303 8.96738C12.5508 8.90996 12.5207 8.8457 12.4633 8.82656L11.6881 8.55996C11.6611 8.5507 11.6315 8.55238 11.6057 8.56464C11.5799 8.5769 11.5599 8.59878 11.55 8.62559C11.5254 8.69395 11.4981 8.7623 11.4693 8.8293C11.2328 9.38984 10.8938 9.89297 10.4617 10.325C10.0332 10.7544 9.52578 11.0969 8.96739 11.334C8.38907 11.5787 7.77247 11.7031 7.13809 11.7031C6.50235 11.7031 5.88711 11.5787 5.30879 11.334C4.74985 11.0979 4.24228 10.7552 3.81446 10.325C3.38475 9.89651 3.04252 9.3885 2.80684 8.8293C2.56211 8.24961 2.4377 7.63438 2.4377 6.99863C2.4377 6.36289 2.56211 5.74766 2.80684 5.16797C3.04336 4.60742 3.38243 4.1043 3.81446 3.67227C4.24649 3.24023 4.74961 2.90117 5.30879 2.66328C5.88711 2.41855 6.50372 2.29414 7.13809 2.29414C7.77383 2.29414 8.38907 2.41855 8.96739 2.66328C9.52633 2.89932 10.0339 3.24204 10.4617 3.67227C10.5971 3.80762 10.7242 3.95117 10.8418 4.10156L10.0188 4.74414C10.0025 4.75674 9.99007 4.77368 9.98298 4.79301C9.9759 4.81234 9.97441 4.83328 9.9787 4.85341C9.98298 4.87355 9.99286 4.89207 10.0072 4.90684C10.0215 4.92161 10.0398 4.93204 10.0598 4.93691L12.4606 5.5248C12.5289 5.54121 12.5959 5.48926 12.5959 5.41953L12.6068 2.94629C12.6055 2.85605 12.5002 2.80547 12.4291 2.86152Z" />
    </svg>
  )
};

export const ResetButton = ({ children, onClick, disabled }) => (
  <Button type="secondary" onClick={onClick} disabled={disabled}>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <ResetIcon disabled={disabled} />
      {children}
    </div>
  </Button>
);

