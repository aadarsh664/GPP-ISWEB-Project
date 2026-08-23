import React from 'react';

const BrandLogo: React.FC<{ className?: string; isWhite?: boolean }> = ({ className, isWhite = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 11000 3500"
    className={className}
    style={{
      ...(isWhite ? {
        '--logo-color-1': '#FFFFFF',
        '--logo-color-2': '#FFFFFF',
        '--logo-color-3': '#FFFFFF',
        '--logo-color-4': '#FFFFFF'
      } : {
        '--logo-color-1': '#00A0E3',
        '--logo-color-2': 'black',
        '--logo-color-3': '#F01570',
        '--logo-color-4': 'black'
      }) as React.CSSProperties
    }}
  >
    <use href="#brand-logo" />
  </svg>
);

export default BrandLogo;