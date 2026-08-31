import './mrv.css';

export default function MRVTimeline({ steps }) {
  return (
    <div className="mrv-timeline">
      {steps.map((s, i) => (
        <div className="mrv-step" key={s.step}>
          <div className="mrv-step-circle">{s.step}</div>
          <div className="mrv-step-body">
            <strong>{s.title}</strong>
            <p>{s.desc}</p>
          </div>
          {i < steps.length - 1 && <div className="mrv-step-connector" />}
        </div>
      ))}
    </div>
  );
}
