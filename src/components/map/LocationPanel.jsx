import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PhotoPlaceholder from '../common/PhotoPlaceholder';
import Badge from '../common/Badge';
import Button from '../common/Button';
import './LocationPanel.css';

export default function LocationPanel({ location, total }) {
  const navigate = useNavigate();
  return (
    <div className="location-panel">
      <span className="label-muted">
        Lokasi Aktif · {location.number} / {String(total).padStart(2, '0')}
      </span>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="location-panel__title">{location.name}</h3>
          <p className="location-panel__breadcrumb">Kelurahan Lembang · Kecamatan Bantaeng</p>

          <div className="location-panel__photo">
            {location.foto ? (
              <img 
                src={location.foto} 
                alt={location.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            ) : null}
            <div style={{ display: location.foto ? 'none' : 'block' }}>
              <PhotoPlaceholder variant={location.photoVariant} label={location.name} />
            </div>
          </div>

          <p className="location-panel__desc">{location.description}</p>

          <div className="location-panel__stats">
            <div>
              <span className="label-muted">Luas Area</span>
              <strong>{location.area}</strong>
            </div>
            <div>
              <span className="label-muted">Pembudidaya</span>
              <strong>{location.farmers} orang</strong>
            </div>
            <div>
              <span className="label-muted">Siklus</span>
              <strong>{location.cycle}</strong>
            </div>
            <div>
              <span className="label-muted">Status</span>
              <Badge status={location.status} />
            </div>
          </div>

          <div className="location-panel__cta">
            <Button variant="outline" icon="→" onClick={() => navigate(`/peta/${location.id}`)}>
              Lihat Detail
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
