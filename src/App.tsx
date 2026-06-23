import React, { useState, useEffect, useCallback } from 'react';

interface GridNode {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'warning';
  solarOutput: number;
  batteryLevel: number;
  consumption: number;
  lastUpdated: Date;
}

const generateMockData = (): GridNode[] => [
  { id: 'node-001', name: 'Kibera Hub A', location: 'Nairobi, Kenya', status: 'online', solarOutput: 4.2, batteryLevel: 87, consumption: 3.1, lastUpdated: new Date() },
  { id: 'node-002', name: 'Mathare Hub B', location: 'Nairobi, Kenya', status: 'warning', solarOutput: 1.8, batteryLevel: 42, consumption: 3.5, lastUpdated: new Date() },
  { id: 'node-003', name: 'Mukuru Hub C', location: 'Nairobi, Kenya', status: 'online', solarOutput: 5.1, batteryLevel: 94, consumption: 2.8, lastUpdated: new Date() },
  { id: 'node-004', name: 'Kawangware D', location: 'Nairobi, Kenya', status: 'offline', solarOutput: 0, batteryLevel: 12, consumption: 0, lastUpdated: new Date() },
  { id: 'node-005', name: 'Korogocho Hub E', location: 'Nairobi, Kenya', status: 'online', solarOutput: 3.7, batteryLevel: 76, consumption: 2.2, lastUpdated: new Date() },
  { id: 'node-006', name: 'Huruma Hub F', location: 'Nairobi, Kenya', status: 'online', solarOutput: 4.9, batteryLevel: 88, consumption: 3.9, lastUpdated: new Date() },
];

const simulateUpdate = (nodes: GridNode[]): GridNode[] =>
  nodes.map(node => ({
    ...node,
    solarOutput: node.status === 'offline' ? 0 : Math.max(0, node.solarOutput + (Math.random() - 0.5) * 0.4),
    batteryLevel: node.status === 'offline'
      ? Math.max(0, node.batteryLevel - 0.5)
      : Math.min(100, node.batteryLevel + (node.solarOutput > node.consumption ? 0.8 : -0.6)),
    consumption: node.status === 'offline' ? 0 : Math.max(0, node.consumption + (Math.random() - 0.5) * 0.3),
    lastUpdated: new Date(),
  }));

const StatusBadge: React.FC<{ status: GridNode['status'] }> = ({ status }) => {
  const colors: Record<GridNode['status'], string> = {
    online: '#22c55e', warning: '#f59e0b', offline: '#ef4444',
  };
  return (
    <span style={{ background: colors[status], color: '#fff', padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>
      {status}
    </span>
  );
};

const BatteryBar: React.FC<{ level: number }> = ({ level }) => {
  const color = level > 60 ? '#22c55e' : level > 30 ? '#f59e0b' : '#ef4444';
  return (
    <div style={{ background: '#e5e7eb', borderRadius: 4, height: 10, width: '100%', overflow: 'hidden' }}>
      <div style={{ width: `${level}%`, background: color, height: '100%', borderRadius: 4, transition: 'width 0.5s' }} />
    </div>
  );
};

const NodeCard: React.FC<{ node: GridNode }> = ({ node }) => (
  <div style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb', minWidth: 260 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: 16 }}>{node.name}</div>
        <div style={{ color: '#6b7280', fontSize: 12 }}>{node.location}</div>
      </div>
      <StatusBadge status={node.status} />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
      <div style={{ background: '#f0fdf4', borderRadius: 6, padding: 10, textAlign: 'center' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#16a34a' }}>{node.solarOutput.toFixed(1)}</div>
        <div style={{ fontSize: 11, color: '#6b7280' }}>Solar kW</div>
      </div>
      <div style={{ background: '#fefce8', borderRadius: 6, padding: 10, textAlign: 'center' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#ca8a04' }}>{node.consumption.toFixed(1)}</div>
        <div style={{ fontSize: 11, color: '#6b7280' }}>Load kW</div>
      </div>
    </div>
    <div style={{ marginBottom: 4, display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
      <span>Battery</span><span style={{ fontWeight: 600 }}>{node.batteryLevel.toFixed(0)}%</span>
    </div>
    <BatteryBar level={node.batteryLevel} />
    <div style={{ marginTop: 8, fontSize: 11, color: '#9ca3af' }}>Updated: {node.lastUpdated.toLocaleTimeString()}</div>
  </div>
);

const App: React.FC = () => {
  const [nodes, setNodes] = useState<GridNode[]>(generateMockData);
  const [running, setRunning] = useState(true);
  const [tick, setTick] = useState(0);

  const totalSolar = nodes.reduce((s, n) => s + n.solarOutput, 0);
  const totalLoad = nodes.reduce((s, n) => s + n.consumption, 0);
  const avgBattery = nodes.reduce((s, n) => s + n.batteryLevel, 0) / nodes.length;
  const onlineCount = nodes.filter(n => n.status === 'online').length;

  const refresh = useCallback(() => {
    setNodes(prev => simulateUpdate(prev));
    setTick(t => t + 1);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(refresh, 2000);
    return () => clearInterval(id);
  }, [running, refresh]);

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #16a34a 100%)', color: '#fff', padding: '24px 32px' }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>☀️ Jua Grid Monitor</h1>
        <p style={{ margin: '4px 0 0', opacity: 0.85, fontSize: 14 }}>Real-time community solar micro-grid dashboard</p>
      </div>
      <div style={{ padding: '24px 32px' }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
          {[{ label: 'Total Solar', value: `${totalSolar.toFixed(1)} kW`, color: '#16a34a' },
            { label: 'Total Load', value: `${totalLoad.toFixed(1)} kW`, color: '#ca8a04' },
            { label: 'Avg Battery', value: `${avgBattery.toFixed(0)}%`, color: '#2563eb' },
            { label: 'Nodes Online', value: `${onlineCount} / ${nodes.length}`, color: '#7c3aed' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '16px 24px', flex: '1 1 160px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
            <span style={{ fontSize: 12, color: '#6b7280' }}>Tick #{tick}</span>
            <button onClick={() => setRunning(r => !r)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: running ? '#ef4444' : '#16a34a', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
              {running ? '⏸ Pause' : '▶ Resume'}
            </button>
            <button onClick={refresh} style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid #d1d5db', background: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
              🔄 Refresh
            </button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {nodes.map(node => <NodeCard key={node.id} node={node} />)}
        </div>
      </div>
    </div>
  );
};

export default App;
