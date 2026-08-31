import './carbon.css';

export default function MethodologyPanel({ items }) {
  return (
    <div className="methodology-panel glass-panel">
      <h4>Metodologi</h4>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <span className="check">✓</span>
            {item}
          </li>
        ))}
      </ul>
      <a href="#metodologi-lengkap" className="methodology-link">Lihat Metodologi Lengkap →</a>
    </div>
  );
}
