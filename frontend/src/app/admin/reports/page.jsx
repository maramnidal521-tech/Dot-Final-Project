"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminTable from "../../../components/admin/AdminTable";
import Button from "../../../components/ui/Button";
import { getReports, updateReportStatus } from "../../../services/adminService";

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);
<<<<<<< HEAD
  const [error, setError] = useState("");

  const loadReports = async () => {
    try {
      const data = await getReports();
      setReports(data.reports || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleResolve = async (id) => {
    await updateReportStatus(id, {
      status: "resolved",
      adminNote: "تمت المراجعة",
    });

    loadReports();
=======
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadReports = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getReports();
        if (!active) return;
        setReports(data?.reports || []);
      } catch (err) {
        if (!active) return;
        setError(err.message || "تعذر تحميل البلاغات");
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadReports();

    return () => {
      active = false;
    };
  }, []);

  const handleResolve = async (id) => {
    try {
      await updateReportStatus(id, { status: "resolved", adminNote: "تمت المراجعة" });
      setReports((prev) =>
        prev.map((report) => (report._id === id ? { ...report, status: "resolved" } : report))
      );
    } catch (err) {
      setError(err.message || "تعذر تحديث البلاغ");
    }
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
  };

  return (
    <AdminLayout title="إدارة البلاغات">
<<<<<<< HEAD
      {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

      <AdminTable columns={["المبلّغ", "النوع", "السبب", "الحالة", "إجراء"]}>
        {reports.map((report) => (
          <tr key={report._id}>
            <td>{report.reportedBy?.name || "غير معروف"}</td>
            <td>{report.targetType}</td>
            <td>{report.reason}</td>
            <td>{report.status}</td>
            <td>
              <Button variant="success" onClick={() => handleResolve(report._id)}>
                حل البلاغ
              </Button>
            </td>
          </tr>
        ))}
      </AdminTable>
    </AdminLayout>
  );
}
=======
      {error && <div className="stateError">{error}</div>}

      {loading ? (
        <div className="skeletonCard" />
      ) : reports.length === 0 ? (
        <div className="stateEmpty">لا توجد بلاغات</div>
      ) : (
        <AdminTable columns={["المبلّغ", "النوع", "السبب", "الحالة", "إجراء"]}>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{report.reportedBy?.name || "غير معروف"}</td>
              <td>{report.targetType}</td>
              <td>{report.reason}</td>
              <td>{report.status}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => void handleResolve(report._id)}
                  disabled={report.status === "resolved"}
                >
                  حل البلاغ
                </Button>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </AdminLayout>
  );
}
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
