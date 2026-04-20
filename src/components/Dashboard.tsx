import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ActivityData {
  date: string;
  hashed: number;
  verified: number;
}

const Dashboard = () => {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [stats, setStats] = useState({ totalHashed: 0, totalVerified: 0, matchRate: 0 });

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('docverifier_events') || '[]');
    
    if (events.length === 0) {
      setActivityData([
        { date: 'No Data', hashed: 0, verified: 0 }
      ]);
      setStats({ totalHashed: 0, totalVerified: 0, matchRate: 0 });
      return;
    }

    const hashedCount = events.filter((e: { type: string }) => e.type === 'hash').length;
    const verifiedEvents = events.filter((e: { type: string }) => e.type === 'verify');
    const verifiedCount = verifiedEvents.length;
    const matchesCount = verifiedEvents.filter((e: { matches: boolean }) => e.matches).length;
    const matchRate = verifiedCount > 0 ? Math.round((matchesCount / verifiedCount) * 100) : 0;

    const last7Days: Record<string, { hashed: number; verified: number }> = {};
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const key = date.toLocaleDateString('en-US', { weekday: 'short' });
      last7Days[key] = { hashed: 0, verified: 0 };
    }

    events.forEach((event: { type: string; timestamp: number }) => {
      const eventDate = new Date(event.timestamp);
      const daysDiff = Math.floor((today.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff >= 0 && daysDiff < 7) {
        const key = new Date(today.getTime() - daysDiff * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' });
        if (last7Days[key]) {
          if (event.type === 'hash') last7Days[key].hashed++;
          else if (event.type === 'verify') last7Days[key].verified++;
        }
      }
    });

    const chartData = Object.entries(last7Days).map(([date, data]) => ({
      date,
      hashed: data.hashed,
      verified: data.verified
    }));

    setActivityData(chartData);
    setStats({ totalHashed: hashedCount, totalVerified: verifiedCount, matchRate });
  }, []);

  const exportReport = () => {
    const events = JSON.parse(localStorage.getItem('docverifier_events') || '[]');
    const data = {
      generatedAt: new Date().toISOString(),
      summary: stats,
      events
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `docverifier-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const events = JSON.parse(localStorage.getItem('docverifier_events') || '[]');
    const headers = ['Event Type', 'Timestamp'];
    const rows = events.map((e: { type: string; timestamp: number }) => [e.type, new Date(e.timestamp).toISOString()]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `docverifier-events-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const pieData = [
    { name: 'Match', value: stats.matchRate },
    { name: 'Mismatch', value: 100 - stats.matchRate }
  ];
  const COLORS = ['#10b981', '#ef4444'];

  const hasData = stats.totalHashed > 0 || stats.totalVerified > 0;

  return (
    <section id="dashboard" className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Dashboard
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Statistics <span className="gradient-text">Overview</span>
          </h2>
          {hasData && <p className="text-muted-foreground">Real-time data from your sessions</p>}
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-card text-center">
            <p className="text-sm text-muted-foreground mb-1">Documents Hashed</p>
            <p className="text-3xl font-bold gradient-text">{stats.totalHashed}</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-card text-center">
            <p className="text-sm text-muted-foreground mb-1">Verified</p>
            <p className="text-3xl font-bold gradient-text">{stats.totalVerified}</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-card text-center">
            <p className="text-sm text-muted-foreground mb-1">Match Rate</p>
            <p className="text-3xl font-bold gradient-text">{stats.matchRate}%</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-card">
            <h3 className="font-semibold mb-4 text-center">Last 7 Days Activity</h3>
            {hasData ? (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={activityData}>
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="hashed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="verified" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4 text-sm">
                  <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-blue-500"></span> Hashed</span>
                  <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-500"></span> Verified</span>
                </div>
              </>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                No data yet. Use the upload/verify features.
              </div>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-card">
            <h3 className="font-semibold mb-4 text-center">Verification Results</h3>
            {hasData && stats.totalVerified > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${value}%`}>
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4 text-sm">
                  <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-500"></span> Match</span>
                  <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-red-500"></span> Mismatch</span>
                </div>
              </>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                No verifications yet.
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button onClick={exportCSV} className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition">
            Export CSV
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;