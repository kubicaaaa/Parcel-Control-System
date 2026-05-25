import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:8080/parcels";

const TABS = ["Zakładka 1", "Zakładka 2", "Zakładka 3"];

const COLUMNS = [
  { key: "id", label: "ID" },
  { key: "destination", label: "Nazwa" },
  { key: "sender", label: "Nadawca" },
  { key: "receiver", label: "Odbiorca" },
  { key: "size", label: "Rozmiar" },
  { key: "status", label: "Status" },
  { key: "akcje", label: "Akcje" },
];

const SIZE_OPTIONS = ["SMALL", "MEDIUM", "LARGE"];
const STATUS_OPTIONS = ["SENT", "DELIVERED", "CANCELLED"];

function ActionButton({ onClick, children, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 35,
        height: 35,
        background: "#000",
        border: "3px solid #D80027",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 16,
      }}
    >
      {children}
    </button>
  );
}

function EditModal({ parcel, onSave, onClose }) {
  const [form, setForm] = useState({ ...parcel });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ margin: "0 0 20px", fontFamily: "Montserrat, sans-serif", fontSize: 22, fontWeight: 700 }}>
          Edytuj przesyłkę #{parcel.id}
        </h2>

        {[
          { name: "destination", label: "Nazwa (Destination)" },
          { name: "sender", label: "Nadawca (Sender)" },
          { name: "receiver", label: "Odbiorca (Receiver)" },
        ].map(({ name, label }) => (
          <div key={name} style={{ marginBottom: 14 }}>
            <label style={labelStyle}>{label}</label>
            <input
              name={name}
              value={form[name] ?? ""}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        ))}

        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Rozmiar (Size)</label>
          <select name="size" value={form.size ?? ""} onChange={handleChange} style={inputStyle}>
            {SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Status</label>
          <select name="status" value={form.status ?? ""} onChange={handleChange} style={inputStyle}>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={cancelBtnStyle}>Anuluj</button>
          <button onClick={handleSubmit} style={saveBtnStyle}>Zapisz</button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ parcel, onConfirm, onClose }) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ margin: "0 0 12px", fontFamily: "Montserrat, sans-serif", fontSize: 22, fontWeight: 700 }}>
          Usuń przesyłkę
        </h2>
        <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: 16, marginBottom: 24 }}>
          Czy na pewno chcesz usunąć przesyłkę <strong>#{parcel.id}</strong>? Tej operacji nie można cofnąć.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={cancelBtnStyle}>Anuluj</button>
          <button onClick={onConfirm} style={{ ...saveBtnStyle, background: "#D80027" }}>Usuń</button>
        </div>
      </div>
    </div>
  );
}

export default function PackageTable() {
  const [activeTab, setActiveTab] = useState(0);
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingParcel, setEditingParcel] = useState(null);
  const [deletingParcel, setDeletingParcel] = useState(null);

  const fetchParcels = () => {
    setLoading(true);
    setError(null);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setParcels(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  const handleSave = (updatedParcel) => {
    fetch(`${API_URL}/${updatedParcel.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedParcel),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        setEditingParcel(null);
        fetchParcels();
      })
      .catch((err) => alert(`Błąd zapisu: ${err.message}`));
  };

  const handleDelete = (parcel) => {
    fetch(`${API_URL}/${parcel.id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        setDeletingParcel(null);
        fetchParcels();
      })
      .catch((err) => alert(`Błąd usuwania: ${err.message}`));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#E9E9E9",
        fontFamily: "Montserrat, sans-serif",
        padding: 22,
        boxSizing: "border-box",
      }}
    >
      {/* Edit modal */}
      {editingParcel && (
        <EditModal
          parcel={editingParcel}
          onSave={handleSave}
          onClose={() => setEditingParcel(null)}
        />
      )}

      {/* Delete confirmation modal */}
      {deletingParcel && (
        <DeleteModal
          parcel={deletingParcel}
          onConfirm={() => handleDelete(deletingParcel)}
          onClose={() => setDeletingParcel(null)}
        />
      )}

      {/* Header / Nav */}
      <header
        style={{
          background: "rgba(217, 217, 217, 0.20)",
          boxShadow: "10px 15px 30px rgba(0,0,0,0.25)",
          borderRadius: 25,
          border: "4px solid #D80027",
          padding: "0 32px",
          height: 116,
          display: "flex",
          alignItems: "center",
          gap: 32,
          marginBottom: 48,
        }}
      >
        <img
          src="https://placehold.co/256x128"
          alt="Logo"
          style={{ height: 80, marginRight: 16 }}
        />
        <nav style={{ display: "flex", gap: 32 }}>
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 24,
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                textDecoration: activeTab === i ? "underline" : "none",
                color: activeTab === i ? "#D80027" : "#000",
                padding: "4px 0",
              }}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* Main layout */}
      <div style={{ display: "flex", gap: 16 }}>
        <aside
          style={{
            width: 232,
            minHeight: 902,
            background: "#D9D9D9",
            borderRadius: 4,
            flexShrink: 0,
          }}
        />

        <main style={{ flex: 1 }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#E9E9E9",
              border: "1px solid #000",
            }}
          >
            <thead>
              <tr style={{ background: "#E9E9E9", border: "1px solid #000" }}>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    style={{
                      padding: "16px 12px",
                      textAlign: "left",
                      fontSize: 20,
                      fontWeight: 700,
                      fontFamily: "Montserrat, sans-serif",
                      color: "#000",
                      borderBottom: "1px solid #000",
                    }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={COLUMNS.length} style={{ ...cellStyle, textAlign: "center", padding: 32 }}>
                    Ładowanie...
                  </td>
                </tr>
              )}

              {error && (
                <tr>
                  <td colSpan={COLUMNS.length} style={{ ...cellStyle, textAlign: "center", padding: 32, color: "#D80027" }}>
                    Błąd: {error}
                  </td>
                </tr>
              )}

              {!loading && !error && parcels.map((row, i) => (
                <tr
                  key={row.id}
                  style={{ background: i % 2 === 0 ? "#D9D9D9" : "#E9E9E9", height: 51 }}
                >
                  <td style={cellStyle}>{row.id}</td>
                  <td style={cellStyle}>{row.destination}</td>
                  <td style={cellStyle}>{row.sender}</td>
                  <td style={cellStyle}>{row.receiver}</td>
                  <td style={cellStyle}>{row.size}</td>
                  <td style={cellStyle}>{row.status}</td>
                  <td style={{ ...cellStyle, display: "flex", gap: 8, alignItems: "center", paddingTop: 8 }}>
                    <ActionButton title="Edytuj" onClick={() => setEditingParcel(row)}>✎</ActionButton>
                    <ActionButton title="Usuń" onClick={() => setDeletingParcel(row)}>✕</ActionButton>
                  </td>
                </tr>
              ))}

              {!loading && !error && Array.from({ length: Math.max(0, 14 - parcels.length) }).map((_, i) => (
                <tr
                  key={`empty-${i}`}
                  style={{ background: (i + parcels.length) % 2 === 0 ? "#D9D9D9" : "#E9E9E9", height: 51 }}
                >
                  {COLUMNS.map((col) => (
                    <td key={col.key} style={cellStyle} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

const cellStyle = {
  padding: "8px 12px",
  fontSize: 20,
  fontWeight: 700,
  fontFamily: "Montserrat, sans-serif",
  color: "#000",
  height: 51,
  verticalAlign: "middle",
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  borderRadius: 12,
  border: "3px solid #D80027",
  padding: 32,
  width: 480,
  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
};

const labelStyle = {
  display: "block",
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  fontSize: 14,
  marginBottom: 6,
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "8px 12px",
  fontSize: 15,
  fontFamily: "Montserrat, sans-serif",
  border: "2px solid #ccc",
  borderRadius: 6,
  boxSizing: "border-box",
  outline: "none",
};

const saveBtnStyle = {
  background: "#000",
  color: "#fff",
  border: "3px solid #D80027",
  borderRadius: 6,
  padding: "8px 24px",
  fontSize: 15,
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 700,
  cursor: "pointer",
};

const cancelBtnStyle = {
  background: "#E9E9E9",
  color: "#000",
  border: "2px solid #ccc",
  borderRadius: 6,
  padding: "8px 24px",
  fontSize: 15,
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  cursor: "pointer",
};