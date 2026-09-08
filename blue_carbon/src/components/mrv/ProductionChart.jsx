import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import './production-chart.css';

// data: array of { period: string, [seriesKey]: number }
// series: array of { key, name, color }
// unit / valueLabel: opsional, default untuk grafik Produksi (kg). Dipakai ulang untuk grafik lain (mis. Penghasilan Panen).
export default function ProductionChart({ data, series, unit = ' kg', valueLabel = 'Produksi', formatValue }) {
  const formatTooltip = formatValue || ((value) => `${value}${unit}`);

  return (
    <motion.div
      className="production-chart-wrap"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={data} margin={{ top: 10, right: 24, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--border-subtle)" vertical={false} />
          <XAxis
            dataKey="period"
            stroke="var(--muted)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="var(--muted)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            unit={unit}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--teal-panel)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 10,
              color: 'var(--ink)',
            }}
            labelStyle={{ color: 'var(--accent-teal)', fontWeight: 600 }}
            formatter={(value) => [formatTooltip(value), valueLabel]}
          />
          {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12.5, color: 'var(--muted)' }} />}
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color}
              strokeWidth={2.5}
              dot={{ r: 4, fill: s.color }}
              activeDot={{ r: 6 }}
              connectNulls
              animationDuration={1200}
              animationEasing="ease-out"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
