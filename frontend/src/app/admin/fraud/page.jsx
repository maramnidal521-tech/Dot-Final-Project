"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import Card from "../../../components/ui/Card";
import { getFraudOverview } from "../../../services/adminService";

export default function FraudPage() {
  const [fraud, setFraud] = useState(null);
<<<<<<< HEAD
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFraud = async () => {
      try {
        const data = await getFraudOverview();
        setFraud(data.fraudSignals);
      } catch (err) {
        setError(err.message);
      }
    };

    loadFraud();
=======
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadFraud = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getFraudOverview();
        if (!active) return;
        setFraud(data?.fraudSignals || null);
      } catch (err) {
        if (!active) return;
        setError(err.message || "تعذر تحميل بيانات الاحتيال");
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadFraud();

    return () => {
      active = false;
    };
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
  }, []);

  return (
    <AdminLayout title="كشف الاحتيال">
<<<<<<< HEAD
      {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

      <div style={{ display: "grid", gap: "20px" }}>
        <Card>
          <h3>مستخدمون لديهم منشورات كثيرة</h3>
          <p>{fraud?.usersWithManyPosts?.length ?? 0} نتيجة مشبوهة</p>
=======
      {error && <div className="stateError">{error}</div>}

      <div className="postGrid">
        <Card>
          <h3>مستخدمون لديهم منشورات كثيرة</h3>
          <p>{loading ? "..." : fraud?.usersWithManyPosts?.length ?? 0} نتيجة</p>
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
        </Card>

        <Card>
          <h3>عناصر عليها بلاغات كثيرة</h3>
<<<<<<< HEAD
          <p>{fraud?.reportedTargets?.length ?? 0} نتيجة مشبوهة</p>
=======
          <p>{loading ? "..." : fraud?.reportedTargets?.length ?? 0} نتيجة</p>
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
        </Card>

        <Card>
          <h3>مستخدمون يرسلون رسائل كثيرة</h3>
<<<<<<< HEAD
          <p>{fraud?.usersWithManyMessages?.length ?? 0} نتيجة مشبوهة</p>
=======
          <p>{loading ? "..." : fraud?.usersWithManyMessages?.length ?? 0} نتيجة</p>
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
        </Card>
      </div>
    </AdminLayout>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
