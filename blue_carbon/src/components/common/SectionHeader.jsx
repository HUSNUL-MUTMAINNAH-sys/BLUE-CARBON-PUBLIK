import './common.css';

export default function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className="section-header" style={{ textAlign: align }}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
