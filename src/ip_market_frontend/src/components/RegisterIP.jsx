import React, { useState } from "react";
import { backend } from "/declarations/backend"; // Uncomment when ready

export function RegisterIP() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ip_type: "",
    metadata: "",
    image_url: "",
    additional_files: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = {
        title: formData.title,
        description: formData.description,
        ip_type: formData.ip_type,
        metadata: formData.metadata,
        image_url: formData.image_url || [],
        additional_files: formData.additional_files
          ? formData.additional_files.split(",").map((file) => file.trim())
          : [],
      };

      const result = await backend.register_ip(request); // Uncomment this

      setMessage("✅ IP registered successfully!");
      setFormData({
        title: "",
        description: "",
        ip_type: "",
        metadata: "",
        image_url: "",
        additional_files: "",
      });
    } catch (err) {
      setMessage("❌ Error: " + (err.message || err));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register New IP</h2>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full border rounded px-3 py-2"
        />

        <input
          name="ip_type"
          value={formData.ip_type}
          onChange={handleChange}
          placeholder="IP Type (e.g., Patent, Trademark)"
          required
          className="w-full border rounded px-3 py-2"
        />

        <input
          name="metadata"
          value={formData.metadata}
          onChange={handleChange}
          placeholder="Metadata (optional)"
          className="w-full border rounded px-3 py-2"
        />

        <input
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className="w-full border rounded px-3 py-2"
        />

        <input
          name="additional_files"
          value={formData.additional_files}
          onChange={handleChange}
          placeholder="Additional Files (comma separated URLs)"
          className="w-full border rounded px-3 py-2"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
        >
          Register
        </button>

        {message && (
          <div className="text-center text-sm font-medium text-gray-700 mt-2">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
