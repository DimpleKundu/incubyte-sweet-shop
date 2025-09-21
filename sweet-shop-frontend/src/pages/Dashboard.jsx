import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSweet, setCurrentSweet] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const sweetsRes = await axios.get(`${API_URL}/sweets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSweets(Array.isArray(sweetsRes.data) ? sweetsRes.data : []);
        const userRes = await axios.get(`${API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAdmin(userRes.data.is_admin);
      } catch {
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const purchaseSweet = async (id) => {
    if (!window.confirm("Do you want to buy this sweet?")) return;

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${API_URL}/inventory/${id}/purchase`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSweets((prev) =>
        prev.map((s) => (s.id === id ? { ...s, quantity: s.quantity - 1 } : s))
      );
      alert("Purchase successful 🎉");
    } catch {
      alert("Purchase failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;

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
        prev.map((s) =>
          s.id === id ? { ...s, quantity: s.quantity + amount } : s
        )
      );
    } catch {
      alert("Restock failed");
    }
  };

  const handleSaveSweet = async (sweet) => {
    const token = localStorage.getItem("token");
    try {
      if (sweet.id) {
        const res = await axios.put(`${API_URL}/sweets/${sweet.id}`, sweet, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSweets((prev) =>
          prev.map((s) => (s.id === sweet.id ? res.data : s))
        );
      } else {
        const res = await axios.post(`${API_URL}/sweets`, sweet, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSweets((prev) => [...prev, res.data]);
      }
      setModalOpen(false);
      setCurrentSweet(null);
    } catch {
      alert("Save failed");
    }
  };

  const filteredSweets = sweets.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🍬 Sweet Shop</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-actions">
        <input
          className="search-box"
          type="text"
          placeholder="🔍 Search sweets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isAdmin && (
          <button
            className="add-btn"
            onClick={() => {
              setCurrentSweet(null);
              setModalOpen(true);
            }}
          >
            ➕ Add Sweet
          </button>
        )}
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading sweets...</p>
      ) : (
        <div className="sweets-grid">
          {filteredSweets.map((sweet) => (
            <div key={sweet.id} className="sweet-card">
              <div className="sweet-icon">🍭</div>
              <h3>{sweet.name}</h3>
              <p>{sweet.category}</p>
              <p className="price">₹{sweet.price}</p>
              <p className="stock">
                Stock: {sweet.quantity === 0 ? "Out of stock" : sweet.quantity}
              </p>

              <div className="card-actions">
                <button
                  className="buy-btn"
                  disabled={sweet.quantity === 0}
                  onClick={() => purchaseSweet(sweet.id)}
                >
                  🛒 Buy
                </button>

                {isAdmin && (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setCurrentSweet(sweet);
                        setModalOpen(true);
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(sweet.id)}
                    >
                      🗑 Delete
                    </button>
                    <button
                      className="restock-btn"
                      onClick={() => handleRestock(sweet.id, 10)}
                    >
                      🔄 Restock
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <SweetModal
          sweet={currentSweet}
          onSave={handleSaveSweet}
          onClose={() => {
            setModalOpen(false);
            setCurrentSweet(null);
          }}
        />
      )}
    </div>
  );
}

/* Sweet Modal */
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
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...sweet, ...form });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h3 className="text-xl font-bold mb-4">
          {sweet ? "Edit Sweet" : "Add Sweet"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border rounded-md"
            name="name"
            placeholder="Sweet name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 border rounded-md"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 border rounded-md"
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 border rounded-md"
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
