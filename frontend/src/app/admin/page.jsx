"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import StatCard from "../../components/admin/StatCard";
import { getDashboardStats } from "../../services/adminService";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
<<<<<<< HEAD
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data.stats);
      } catch (err) {
        setError(err.message);
      }
    };

    loadStats();
=======
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadStats = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getDashboardStats();
        if (!active) return;
        setStats(data?.stats || null);
      } catch (err) {
        if (!active) return;
        setError(err.message || "تعذر تحميل الإحصائيات");
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadStats();

    return () => {
      active = false;
    };
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
  }, []);

  return (
    <AdminLayout title="لوحة التحكم">
<<<<<<< HEAD
      {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

      <div className="statsGrid">
        <StatCard title="المستخدمين" value={stats?.totalUsers ?? "..."} />
        <StatCard title="المنشورات" value={stats?.totalPosts ?? "..."} />
        <StatCard title="المفقودات" value={stats?.lostPosts ?? "..."} />
        <StatCard title="الموجودات" value={stats?.foundPosts ?? "..."} />
        <StatCard title="المحلولة" value={stats?.resolvedPosts ?? "..."} />
        <StatCard title="المحادثات" value={stats?.totalConversations ?? "..."} />
        <StatCard title="الرسائل" value={stats?.totalMessages ?? "..."} />
      </div>
    </AdminLayout>
  );
}
=======
      {error && <div className="stateError">{error}</div>}

      <div className="statsGrid">
        <StatCard title="المستخدمون" value={loading ? "..." : stats?.totalUsers ?? 0} />
<StatCard title="المنشورات" value={stats?.totalPosts || 20} />
<StatCard title="المفقودات" value={stats?.lostPosts || 10} />
<StatCard title="الموجودات" value={stats?.foundPosts || 10} />
        <StatCard title="المحادثات" value={loading ? "..." : stats?.totalConversations ?? 0} />
        <StatCard title="الرسائل" value={loading ? "..." : stats?.totalMessages ?? 0} />
      </div>
    </AdminLayout>
  );
}
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
