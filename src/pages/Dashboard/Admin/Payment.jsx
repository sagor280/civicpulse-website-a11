import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Component/LoadingSpinner/LoadingSpinner";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFcomponent from "../../../Component/PDF/PDFcomponent";


const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const [type, setType] = useState("all");

  // Fetch payments
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", type],
    queryFn: async () => {
      const params = {};
      if (type !== "all") params.paymentType = type; // filter by paymentType
      const res = await axiosSecure.get("/payments", { params });
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Total revenue
  const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Payments</h2>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">৳{totalRevenue}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm"
        >
          <option value="all">All Types</option>
          <option value="Subscription">Subscription</option>
          <option value="Boosting">Boost</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Transaction ID</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y border-t border-gray-200">
            {payments.length > 0 ? (
              payments.map((p) => (
                <tr
                  key={p.transactionId}
                  className="hover:bg-gray-100 border-b border-gray-200"
                >
                  <td className="px-6 py-4 font-mono text-xs">
                    {p.transactionId}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {p.email || p.customerEmail || p.createrEmail || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        p.paymentType === "Subscription"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {p.paymentType === "Subscription"
                        ? "Subscription"
                        : "Boost"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">৳{p.amount}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(p.paidAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <PDFDownloadLink
                      document={<PDFcomponent payment={p} />}
                      fileName={`invoice_${p.transactionId}.pdf`}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        borderRadius: "4px",
                        fontSize: "12px",
                        textDecoration: "none",
                      }}
                    >
                      {({ loading }) =>
                        loading ? "Generating..." : "Download"
                      }
                    </PDFDownloadLink>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;
