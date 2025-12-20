import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const StaffModal = ({ closeModal, refetch, editStaff }) => {
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: editStaff?.displayName || "",
    email: editStaff?.email || "",
    phone: editStaff?.phone || "",
    photoURL: editStaff?.photoURL || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* =========================
        Submit Handler
     ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editStaff) {
        // UPDATE
        await axiosSecure.patch(`/admin/staff/${editStaff._id}`, {
          displayName: formData.name,
          phone: formData.phone,
          photoURL: formData.photoURL,
        });

        Swal.fire("Updated!", "Staff updated successfully", "success");
      } else {
        // CREATE
        await axiosSecure.post("/admin/staff", {
          displayName: formData.name,
          email: formData.email,
          phone: formData.phone,
          photoURL: formData.photoURL,
          password: formData.password,
        });

        Swal.fire("Created!", "Staff account created", "success");
      }

      refetch();
      closeModal();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-semibold mb-4">
          {editStaff ? "Update Staff" : "Add New Staff"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="w-full border rounded-xl px-4 py-3"
            disabled={editStaff}
            required
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            placeholder="Photo URL"
            className="w-full border rounded-xl px-4 py-3"
          />

          {!editStaff && (
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
              className="w-full border rounded-xl px-4 py-3"
              required
            />
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2 rounded-full bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-primary text-white hover:bg-[#138e7a]"
            >
              {editStaff ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffModal;
