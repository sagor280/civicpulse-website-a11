import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Component/LoadingSpinner/LoadingSpinner";
import AllIssuesCard from "../../Component/Cards/AllIssuesCard";

// Debounce hook
import { useEffect } from "react";
function useDebounce(value, delay) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debounced;
}

const AllIssues = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const categoryData = useLoaderData();
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const limit = 6;

    // Debounced search to reduce API calls
    const debouncedSearch = useDebounce(searchText, 400);

    // Generic handler for filters
    const handleFilterChange = (type, value) => {
        setPage(1); // reset page
        if (type === "search") setSearchText(value);
        else if (type === "status") setStatus(value);
        else if (type === "priority") setPriority(value);
        else if (type === "category") setCategory(value);
    };

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["all-issues", debouncedSearch, status, priority, category, page],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/issues?searchText=${debouncedSearch}&page=${page}&limit=${limit}&status=${status}&priority=${priority}&category=${category}`
            );
            return res.data;
        },
        keepPreviousData: true, 
    });

    const allIssues = Array.isArray(data) ? data : data?.issues || [];
    const totalPages = data?.totalPages || 1;

    const priorityOrder = { high: 1, normal: 2 };

    const handleUpvotes = async (issue) => {
        if (!user?.email) {
            navigate("/login");
            return;
        }

        try {
            const res = await axiosSecure.patch(`/issues/upvote/${issue._id}`, {
                email: user.email,
                createrEmail: issue.email
            });

            if (res.data.success) {
                Swal.fire({ icon: "success", title: res.data.message });
                refetch();
            } else {
                Swal.fire({ icon: "warning", title: "Already upvoted" });
            }
        } catch (err) {
            Swal.fire({ icon: "error", title: err.response?.data?.message || "Upvote failed" });
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">All Issues</h1>
                <p className="text-gray-500 mt-1">Browse and search through all reported infrastructure issues.</p>
            </div>

            {/* Filters */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-10 shadow-sm flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Search by title, location..."
                    className="input input-bordered w-full md:flex-1"
                    value={searchText}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                />

                <select
                    className="select select-bordered w-full md:w-44"
                    value={status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                    <option value="rejected">Rejected</option>
                </select>

                <select
                    className="select select-bordered w-full md:w-44"
                    value={priority}
                    onChange={(e) => handleFilterChange("priority", e.target.value)}
                >
                    <option value="">All Priority</option>
                    <option value="high">High</option>
                    <option value="normal">Normal</option>
                </select>

                <select
                    className="select select-bordered w-full md:w-44"
                    value={category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categoryData.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {/* Cards */}
            {allIssues.length === 0 ? (
                <div className="text-center text-gray-500 text-xl py-20">❌ No issues found</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...allIssues]
                        .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
                        .map((issue) => (
                            <AllIssuesCard
                                key={issue._id}
                                issue={issue}
                                onUpvote={handleUpvotes}
                            />
                        ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-12">
                <button
                    className="btn btn-outline"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >Prev</button>

                {[...Array(totalPages).keys()].map((num) => (
                    <button
                        key={num}
                        className={`btn ${page === num + 1 ? "btn-primary" : "btn-outline"}`}
                        onClick={() => setPage(num + 1)}
                    >
                        {num + 1}
                    </button>
                ))}

                <button
                    className="btn btn-outline"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >Next</button>
            </div>

        </div>
    );
};

export default AllIssues;
