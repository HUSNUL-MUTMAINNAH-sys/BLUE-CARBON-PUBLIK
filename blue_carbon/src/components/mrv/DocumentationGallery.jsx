import { useState } from 'react';
import Image from '../common/Image';
import Modal from '../common/Modal';
import './mrv.css';

export default function DocumentationGallery({ items }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="doc-gallery-grid">
        {items.map((item) => (
          <button key={item.id} className="doc-gallery-item" onClick={() => setSelected(item)}>
            <Image src={item.src} alt={item.caption} style={{ height: 90 }} />
          </button>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <Image src={selected.src} alt={selected.caption} style={{ height: 420 }} />
            <div style={{ padding: '18px 22px' }}>
              <strong style={{ color: 'var(--ink)' }}>{selected.caption}</strong>
              <p style={{ marginTop: 6 }}>{selected.date}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
