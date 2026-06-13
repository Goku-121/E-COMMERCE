import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import AdminStore from "../../store/AdminStore";

const AdminDashboard = () => {
    const { Summary, AdminSummaryRequest, isAdminLogin } = AdminStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdminLogin()) { window.location.href = "/admin/login"; return; }
        (async () => { await AdminSummaryRequest(); })();
    }, []);

    const stats = [
        { label: "Total Users", value: Summary?.totalUsers ?? "...", icon: "bi-people-fill", bg: "#EEEDFE", color: "#534AB7", sub: "view all users", path: "/admin/users" },
        { label: "Total Products", value: Summary?.totalProducts ?? "...", icon: "bi-box-seam-fill", bg: "#E1F5EE", color: "#0F6E56", sub: "manage products", path: "/admin/products" },
        { label: "Total Orders", value: Summary?.totalOrders ?? "...", icon: "bi-receipt-cutoff", bg: "#FAEEDA", color: "#854F0B", sub: "view all orders", path: "/admin/orders" },
        { label: "Pending Orders", value: Summary?.pendingOrders ?? "...", icon: "bi-hourglass-split", bg: "#FCEBEB", color: "#A32D2D", sub: "needs attention", path: "/admin/orders" },
    ];

    const quickLinks = [
        { label: "Manage products", icon: "bi-box-seam", path: "/admin/products" },
        { label: "Manage orders", icon: "bi-receipt", path: "/admin/orders" },
        { label: "Manage users", icon: "bi-people", path: "/admin/users" },
    ];

    return (
        <AdminLayout>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold mb-0">Dashboard</h5>
                    <small className="text-muted">Welcome back, Admin</small>
                </div>
                <span className="badge bg-light text-muted border px-3 py-2">
                    <i className="bi bi-calendar3 me-1"></i>
                    {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </span>
            </div>

            {/* Stat Cards */}
            <div className="row g-3 mb-4">
                {stats.map((s, i) => (
                    <div key={i} className="col-xl-3 col-md-6">
                        <div className="card border-0 shadow-sm h-100" style={{ cursor: "pointer" }}
                            onClick={() => navigate(s.path)}>
                            <div className="card-body">
                                <div className="rounded-3 d-inline-flex p-2 mb-3" style={{ background: s.bg }}>
                                    <i className={`bi ${s.icon} fs-4`} style={{ color: s.color }}></i>
                                </div>
                                <div className="text-muted small">{s.label}</div>
                                <div className="fw-bold fs-3 lh-1 my-1">{s.value}</div>
                                <small className="text-muted">
                                    <i className="bi bi-arrow-up-right me-1"></i>{s.sub}
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-3">
                {/* Recent Orders */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="fw-semibold mb-3">
                                <i className="bi bi-receipt me-2 text-muted"></i>Recent orders
                            </div>
                            {Summary?.recentOrders?.length > 0 ? (
                                Summary.recentOrders.map((order, i) => (
                                    <div key={i} className="d-flex align-items-center gap-3 py-2 border-bottom">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center fw-semibold"
                                            style={{ width: 36, height: 36, background: "#EEEDFE", color: "#534AB7", fontSize: 13, flexShrink: 0 }}>
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <div className="fw-semibold text-truncate" style={{ fontSize: 13 }}>{order._id}</div>
                                            <small className="text-muted">{new Date(order.createdAt).toLocaleDateString()}</small>
                                        </div>
                                        <div className="fw-semibold text-success">৳{order.payable || order.total || 0}</div>
                                        <span className={`badge rounded-pill ${order.delivery_status === "Delivered" ? "bg-success" : "bg-warning text-dark"}`}>
                                            {order.delivery_status || "pending"}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted small">No recent orders</p>
                            )}
                            <button className="btn btn-sm btn-light w-100 mt-3 text-muted"
                                onClick={() => navigate("/admin/orders")}>
                                View all orders →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="col-lg-4 d-flex flex-column gap-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="fw-semibold mb-3">
                                <i className="bi bi-lightning me-2 text-muted"></i>Quick actions
                            </div>
                            {quickLinks.map((q, i) => (
                                <div key={i} className="d-flex align-items-center gap-2 p-2 rounded-3 mb-2"
                                    style={{ background: "#f8f9fa", cursor: "pointer" }}
                                    onClick={() => navigate(q.path)}>
                                    <i className={`bi ${q.icon} text-muted`}></i>
                                    <span style={{ fontSize: 13 }}>{q.label}</span>
                                    <i className="bi bi-chevron-right ms-auto text-muted" style={{ fontSize: 11 }}></i>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="fw-semibold mb-3">
                                <i className="bi bi-bar-chart me-2 text-muted"></i>Payment status
                            </div>
                            {[
                                { label: "Paid", count: Summary?.totalOrders || 0, max: Summary?.totalOrders || 1, color: "#1D9E75" },
                                { label: "Delivered", count: 0, max: Summary?.totalOrders || 1, color: "#534AB7" },
                                { label: "Pending", count: Summary?.pendingOrders || 0, max: Summary?.totalOrders || 1, color: "#BA7517" },
                            ].map((b, i) => (
                                <div key={i} className="d-flex align-items-center gap-2 mb-2">
                                    <small className="text-muted text-end" style={{ width: 60 }}>{b.label}</small>
                                    <div className="flex-grow-1 rounded-pill" style={{ height: 8, background: "#f0f0f0", overflow: "hidden" }}>
                                        <div className="rounded-pill" style={{ height: "100%", width: `${(b.count / b.max) * 100}%`, background: b.color, transition: "width 0.4s" }}></div>
                                    </div>
                                    <small className="fw-semibold" style={{ width: 16 }}>{b.count}</small>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;