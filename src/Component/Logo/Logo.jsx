import React from 'react';
import logo from '../../assets/medical-report.png';

const Logo = () => {
    return (
        <div className="flex items-center gap-2 select-none">
            <img
                className="h-10 w-10 object-contain drop-shadow-sm"
                src={logo}
                alt="CivicPulse Logo"
            />
          <span className="font-display text-2xl font-bold tracking-wide">
  <span className="bg-linear-to-r from-[#33B09F] to-[#19A48E] text-transparent bg-clip-text">Civic</span>
  <span className="text-[#f66aa3]">Pulse</span>
</span>
    
        </div>
    );
};

export default Logo;
