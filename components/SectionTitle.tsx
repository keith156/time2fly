
import React from 'react';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  titleClassName?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ subtitle, title, description, centered = true, light = false, titleClassName = '' }) => {
  return (
    <div className={`mb-8 md:mb-16 ${centered ? 'text-center' : ''}`}>
      {subtitle && <span className="text-red-600 font-black tracking-widest uppercase text-xs md:text-sm mb-3 md:mb-5 block">{subtitle}</span>}
      <h2 className={`text-4xl md:text-5xl font-black mb-4 md:mb-8 tracking-tighter uppercase leading-[0.95] ${light ? 'text-white' : 'text-slate-900'} ${titleClassName}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base md:text-lg font-medium max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-slate-300' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
