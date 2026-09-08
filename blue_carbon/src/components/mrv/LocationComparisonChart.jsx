import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import './production-chart.css';

// data: array of { lokasi, total, color }
export default function LocationComparisonChart({ data }) {
  return (
    <motion.div
      className="production-chart-wrap"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.15 }}
    >
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 8, bottom: 4 }}>
          <CartesianGrid stroke="var(--border-subtle)" horizontal={false} />
          <XAxis type="number" stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false} unit=" kg" />
          <YAxis type="category" dataKey="lokasi" stroke="var(--muted)" fontSize={12.5} tickLine={false} axisLine={false} width={100} />
          <Tooltip
            contentStyle={{
              background: 'var(--teal-panel)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 10,
              color: 'var(--ink)',
            }}
            labelStyle={{ color: 'var(--accent-teal)', fontWeight: 600 }}
            formatter={(value) => [`${value} kg`, 'Total Produksi']}
          />
          <Bar dataKey="total" radius={[0, 6, 6, 0]} barSize={22}>
            {data.map((entry) => (
              <Cell key={entry.lokasi} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
