import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import './carbon.css';

export default function CarbonChart({ data }) {
  return (
    <motion.div 
      className="carbon-chart-wrap"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid stroke="rgba(245,247,244,0.08)" vertical={false} />
          <XAxis dataKey="month" stroke="#A4B5B8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#A4B5B8" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: '#0B3540', border: '1px solid rgba(245,247,244,0.1)', borderRadius: 10, color: '#F5F7F4' }}
            labelStyle={{ color: '#6DE4DE' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#16C7C2"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#16C7C2' }}
            activeDot={{ r: 6 }}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
