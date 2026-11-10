import './SectionTitle.css';

const SectionTitle = ({ title, subtitle, eyebrow, align = 'left' }) => {
  return (
    <div className={`section-title section-title--${align}`}>
      {eyebrow && <span className="section-title__eyebrow">{eyebrow}</span>}
      <h2 className="section-title__title">{title}</h2>
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
