import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [magicItems, setMagicItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedType, setEditedType] = useState("");
  const [editedRarity, setEditedRarity] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("");
  const [newRarity, setNewRarity] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8090/magic-items", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setMagicItems(response.data);
        setFilteredItems(response.data); // Set initial items as filtered items
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching magic items:", error);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    if (e.target.value === "") {
      setFilteredItems(magicItems); // If no filter, show all items
    } else {
      setFilteredItems(
        magicItems.filter((item) =>
          item.type.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  // Delete an item
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8090/magic-items/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        setMagicItems(magicItems.filter((item) => item._id !== id));
        setFilteredItems(filteredItems.filter((item) => item._id !== id)); // Remove from filtered list as well
      })
      .catch((error) => {
        console.error("Error deleting magic item:", error);
      });
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setEditedTitle(item.title);
    setEditedType(item.type);
    setEditedRarity(item.rarity);
    setEditedDescription(item.description);
    setEditedPrice(item.price);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    axios
      .put(
        `http://localhost:8090/magic-items/${currentItem._id}`,
        {
          title: editedTitle,
          type: editedType,
          rarity: editedRarity,
          description: editedDescription,
          price: editedPrice,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setMagicItems(
          magicItems.map((item) =>
            item._id === currentItem._id ? response.data : item
          )
        );
        setFilteredItems(
          filteredItems.map((item) =>
            item._id === currentItem._id ? response.data : item
          )
        );
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating magic item:", error);
      });
  };

  // Add a new item
  const handleAdd = () => {
    if (!newTitle || !newType || !newRarity || !newDescription || !newPrice) {
      alert("Please fill in all fields.");
      return;
    }

    const newItem = {
      title: newTitle,
      type: newType,
      rarity: newRarity,
      description: newDescription,
      price: newPrice,
    };

    axios
      .post("http://localhost:8090/magic-items", newItem, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setMagicItems([...magicItems, response.data]);
        setFilteredItems([...filteredItems, response.data]);
        setIsAddModalOpen(false);
        setNewTitle("");
        setNewType("");
        setNewRarity("");
        setNewDescription("");
        setNewPrice("");
      })
      .catch((error) => {
        console.error("Error adding magic item:", error);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Magic Items</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#008CBA",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add New Item
        </button>
      </div>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <label>Filter by Type:</label>
        <input
          type="text"
          value={filterType}
          onChange={handleFilterChange}
          placeholder="Enter type to filter"
          style={{
            padding: "8px",
            marginLeft: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {filteredItems.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                width: "200px",
                padding: "16px",
                textAlign: "center",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ margin: "8px 0" }}>{item.title}</h3>
              <p>{item.type}</p>
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleEdit(item)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for editing */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "24px",
            width: "400px",
          }}
        >
          <h2>Edit Magic Item</h2>
          <div style={{ marginBottom: "16px" }}>
            <label>Title:</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>Type:</label>
            <input
              type="text"
              value={editedType}
              onChange={(e) => setEditedType(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>Rarity:</label>
            <input
              type="text"
              value={editedRarity}
              onChange={(e) => setEditedRarity(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>Description:</label>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>Price:</label>
            <input
              type="number"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <button
            onClick={handleSave}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "8px",
            }}
          >
            Save
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Modal for adding */}
      {isAddModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "24px",
            width: "400px",
          }}
        >
          <h2>Add New Magic Item</h2>
          <div style={{ marginBottom: "16px" }}>
            <label>Title:</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>Type:</label>
            <input
              type="text"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>Rarity:</label>
            <input
              type="text"
              value={newRarity}
              onChange={(e) => setNewRarity(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>Description:</label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>Price:</label>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <button
            onClick={handleAdd}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Item
          </button>
          <button
            onClick={() => setIsAddModalOpen(false)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginLeft: "8px",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
