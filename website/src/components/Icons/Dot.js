import React from 'react'

const Dot = ({className, fill = 'currentColor'}) => (
  <svg className={className} width="10" height="10" viewBox="0 0 10 10" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="5" r="4.5" />
  </svg>
);

export default Dot;
