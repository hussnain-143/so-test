import React from 'react';
import './InternalLoader.css';

interface InternalLoaderProps {
  size?: 'small' | 'medium';
  color?: string;
}

const InternalLoader: React.FC<InternalLoaderProps> = ({
  size = 'medium',
  color = '#52d244'
}) => {
  return (
    <div className={`solo-internal-loader ${size}`} style={{ color }}>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default InternalLoader;
