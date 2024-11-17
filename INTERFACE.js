import React, { useState } from "react";

const NotificationForm = () => {
  const [formData, setFormData] = useState({
    token: "",
    title: "",
    body: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Gestion des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gestion de l'envoi de la notification
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Notification envoyée avec succès !");
      } else {
        setResponseMessage(`Erreur : ${data.error}`);
      }
    } catch (error) {
      setResponseMessage("Une erreur s'est produite lors de l'envoi.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Envoyer une Notification</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          name="token"
          placeholder="Token de l'utilisateur"
          value={formData.token}
          onChange={handleChange}
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <input
          type="text"
          name="title"
          placeholder="Titre de la notification"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <textarea
          name="body"
          placeholder="Message de la notification"
          value={formData.body}
          onChange={handleChange}
          required
          rows="3"
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button type="submit" style={{ padding: "10px", fontSize: "16px", backgroundColor: "#007BFF", color: "#fff", border: "none", cursor: "pointer" }}>
          Envoyer
        </button>
      </form>
      {responseMessage && <p style={{ marginTop: "20px", color: "green" }}>{responseMessage}</p>}
    </div>
  );
};

export default NotificationForm;
