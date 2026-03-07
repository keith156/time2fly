
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
    <div className={`mb-6 md:mb-8 ${centered ? 'text-center' : ''}`}>
      {subtitle && <span className={`text-[14px] font-bold uppercase tracking-widest mb-3 md:mb-5 block ${light ? 'text-amber-500' : 'text-red-600'}`}>{subtitle}</span>}
      <h2 className={`text-h2 mb-4 md:mb-8 ${light ? 'text-white' : 'text-slate-900'} ${titleClassName}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-body-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-slate-300' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
