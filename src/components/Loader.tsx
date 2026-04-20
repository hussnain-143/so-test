import React from 'react';
import './Loader.css';

interface LoaderProps {
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  fullScreen = false, 
  size = 'medium',
  color = '#52d244' 
}) => {
  const containerClass = fullScreen ? 'loader-container-full' : 'loader-container-inline';
  
  return (
    <div className={containerClass}>
      <div className={`solo-unique-loader ${size}`} style={{ color }}>
        <div className="loader-arc outer"></div>
        <div className="loader-arc inner"></div>
      </div>
    </div>
  );
};

export default Loader;
