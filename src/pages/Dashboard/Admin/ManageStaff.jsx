import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import StaffModal from "../../Common/StaffModal";
import LoadingSpinner from "../../../Component/LoadingSpinner/LoadingSpinner";

const ManageStaff = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editStaff, setEditStaff] = useState(null);

  const {
    data: staffList = [],
    isLoading,
    refetch,
    isError,
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
        await axiosSecure.delete(`/admin/staff/${staff._id}`);
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
          <p className="text-gray-500">Add, update & remove staff members</p>
        </div>

        <button
          onClick={() => {
            setEditStaff(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full hover:bg-[#138e7a]"
        >
          <FiPlus /> Add Staff
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 text-sm uppercase text-gray-600">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {staffList.map((staff) => (
              <tr key={staff._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{staff.displayName}</td>
                <td className="px-6 py-4">{staff.email}</td>
                <td className="px-6 py-4">{staff.phone || "N/A"}</td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setEditStaff(staff);
                        setIsModalOpen(true);
                      }}
                      className="p-2 rounded-full hover:bg-blue-100 text-blue-600"
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
                <td colSpan="4" className="text-center py-12 text-gray-400">
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
