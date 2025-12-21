import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import StaffModal from "../../Common/StaffModal";
import LoadingSpinner from "../../../Component/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";

const ManageStaff = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editStaff, setEditStaff] = useState(null);

  const {
    data: staffList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["staff-list"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/staff");
      return res.data;
    },
  });

  const handleDeleteStaff = (staff) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${staff.displayName} will be removed permanently`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/staff/${staff._id}`);
        Swal.fire("Deleted!", "Staff removed successfully", "success");
        refetch();
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Manage Staff</h2>
          <p className="text-gray-500">Add and manage staff members</p>
        </div>

        <button
          onClick={() => {
            setEditStaff(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full hover:bg-[#1a8472]"
        >
          <FiPlus /> Add Staff
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          {/* Table Head */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-sm font-semibold text-gray-600">
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Joined</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {staffList.map((staff) => (
              <tr key={staff._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {staff.displayName}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {staff.email}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {staff.phone || "N/A"}
                </td>

                <td className="px-6 py-4 text-gray-500 text-sm">
                  {staff.createdAt
                    ? new Date(staff.createdAt).toLocaleDateString()
                    : "—"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setEditStaff(staff);
                        setIsModalOpen(true);
                      }}
                      className="p-2 rounded-full hover:bg-blue-100 text-primary"
                    >
                      <FiEdit />
                    </button>

                    <button
                      onClick={() => handleDeleteStaff(staff)}
                      className="p-2 rounded-full hover:bg-red-100 text-red-600"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {staffList.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-12 text-gray-400"
                >
                  No staff found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <StaffModal
          closeModal={() => setIsModalOpen(false)}
          refetch={refetch}
          editStaff={editStaff}
        />
      )}
    </div>
  );
};

export default ManageStaff;
