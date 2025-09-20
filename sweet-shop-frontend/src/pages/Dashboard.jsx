import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSweet, setCurrentSweet] = useState(null); // For Add/Edit
  const navigate = useNavigate();

  // Fetch sweets and current user info
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        // Fetch sweets
        const sweetsRes = await axios.get(`${API_URL}/sweets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSweets(Array.isArray(sweetsRes.data) ? sweetsRes.data : []);

        // Fetch current user info
        const userRes = await axios.get(`${API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAdmin(userRes.data.is_admin);

      } catch (err) {
        alert("Error fetching data. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  // --- User actions ---
  const purchaseSweet = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      await axios.post(
        `${API_URL}/inventory/${id}/purchase`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSweets((prev) =>
        prev.map((s) => (s.id === id ? { ...s, quantity: s.quantity - 1 } : s))
      );
      alert("Purchased!");
    } catch {
      alert("Purchase failed");
    }
  };

  // --- Admin actions ---
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/sweets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleRestock = async (id, amount = 10) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${API_URL}/inventory/${id}/restock?amount=${amount}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSweets((prev) =>
        prev.map((s) => (s.id === id ? { ...s, quantity: s.quantity + amount } : s))
      );
      alert("Restocked!");
    } catch {
      alert("Restock failed");
    }
  };

  const handleSaveSweet = async (sweet) => {
    const token = localStorage.getItem("token");
    try {
      if (sweet.id) {
        // Update
        const res = await axios.put(
          `${API_URL}/sweets/${sweet.id}`,
          sweet,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSweets((prev) =>
          prev.map((s) => (s.id === sweet.id ? res.data : s))
        );
      } else {
        // Add
        const res = await axios.post(
          `${API_URL}/sweets`,
          sweet,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSweets((prev) => [...prev, res.data]);
      }
      setModalOpen(false);
      setCurrentSweet(null);
    } catch (err) {
      alert("Save failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredSweets = sweets.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <hr />
      <input
        type="text"
        placeholder="Search sweets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20, padding: 5, width: "100%" }}
      />

      {isAdmin && (
        <button
          onClick={() => { setCurrentSweet(null); setModalOpen(true); }}
          style={{ marginBottom: 20 }}
        >
          Add New Sweet
        </button>
      )}

      {filteredSweets.map((sweet) => (
        <div key={sweet.id} style={{ margin: "10px 0" }}>
          <b>{sweet.name}</b> - {sweet.category} - ₹{sweet.price} - Qty: {sweet.quantity}
          <button
            onClick={() => purchaseSweet(sweet.id)}
            disabled={sweet.quantity === 0}
            style={{ marginLeft: 10 }}
          >
            Buy
          </button>

          {isAdmin && (
            <>
              <button
                onClick={() => { setCurrentSweet(sweet); setModalOpen(true); }}
                style={{ marginLeft: 5 }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(sweet.id)}
                style={{ marginLeft: 5 }}
              >
                Delete
              </button>
              <button
                onClick={() => handleRestock(sweet.id, 10)}
                style={{ marginLeft: 5 }}
              >
                Restock +10
              </button>
            </>
          )}
        </div>
      ))}

      {modalOpen && (
        <SweetModal
          sweet={currentSweet}
          onSave={handleSaveSweet}
          onClose={() => { setModalOpen(false); setCurrentSweet(null); }}
        />
      )}
    </div>
  );
}

// --- Sweet Modal Component ---
function SweetModal({ sweet, onSave, onClose }) {
  const [form, setForm] = useState({
    name: sweet?.name || "",
    category: sweet?.category || "",
    price: sweet?.price || 0,
    quantity: sweet?.quantity || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...sweet, ...form });
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)", display: "flex",
      justifyContent: "center", alignItems: "center"
    }}>
      <div style={{ background: "#fff", padding: 20, borderRadius: 10, width: 320 }}>
        <h3>{sweet ? "Edit Sweet" : "Add Sweet"}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block", marginBottom: 4 }}>Name</label>
            <input
              name="name"
              placeholder="Enter sweet name"
              value={form.name}
              onChange={handleChange}
              style={{ width: "100%", padding: 6 }}
              required
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block", marginBottom: 4 }}>Category</label>
            <input
              name="category"
              placeholder="E.g. Chocolate, Candy"
              value={form.category}
              onChange={handleChange}
              style={{ width: "100%", padding: 6 }}
              required
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block", marginBottom: 4 }}>Price (₹)</label>
            <input
              name="price"
              type="number"
              placeholder="Enter price"
              value={form.price}
              onChange={handleChange}
              style={{ width: "100%", padding: 6 }}
              required
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block", marginBottom: 4 }}>Quantity</label>
            <input
              name="quantity"
              type="number"
              placeholder="Enter stock quantity"
              value={form.quantity}
              onChange={handleChange}
              style={{ width: "100%", padding: 6 }}
              required
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 15 }}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

