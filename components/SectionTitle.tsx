
import React from 'react';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ subtitle, title, description, centered = true, light = false }) => {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      {subtitle && <span className="text-red-600 font-black tracking-[0.3em] uppercase text-lg mb-5 block">{subtitle}</span>}
      <h2 className={`text-3xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-[0.95] ${light ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base font-medium max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-slate-300' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
