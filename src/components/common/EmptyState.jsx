import './common.css';

export default function EmptyState({ title = 'Data belum tersedia.', description, icon = '-' }) {
  return (
    <div className="state-block">
      <div className="state-icon">{icon}</div>
      <strong style={{ color: 'var(--ink)' }}>{title}</strong>
      {description && <p>{description}</p>}
    </div>
  );
}
