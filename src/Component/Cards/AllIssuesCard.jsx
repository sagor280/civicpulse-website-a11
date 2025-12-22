import { ThumbsUp, MapPin, Clock, Eye } from "lucide-react";
import { Link } from "react-router";
import { formatDistanceToNow } from 'date-fns';

const statusColor = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  "in-progress": "bg-blue-50 text-blue-700 border-blue-200",
  closed: "bg-gray-100 text-gray-700 border-gray-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

const AllIssuesCard = ({ issue, onUpvote }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image */}
      <div className="relative">
        <img
          src={issue.image}
          alt={issue.title}
          className="w-full h-52 object-cover"
        />

        {/* Category badge */}
        <span className="absolute bottom-3 left-3 bg-gray-900/80 text-white text-xs px-3 py-1 rounded-full">
          {issue.category}
        </span>

        {/* Boosted */}
        {issue.priority === "high" && (
          <span className="absolute bottom-3 right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
            ⚡ Boosted
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Title + Status */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1">
            {issue.title}
          </h3>

          <span
            className={`text-xs px-3 py-1 rounded-full border ${
              statusColor[issue.status]
            }`}
          >
            {issue.status}
          </span>
        </div>

        {/* Meta */}
        <div className="flex gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {issue.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {formatDistanceToNow(new Date(issue.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>

        {/* Priority */}
        <div>
          {issue.priority === "high" ? (
            <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-700">
              High Priority
            </span>
          ) : (
            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
              Normal
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-4 py-3 flex justify-between items-center">
        <button
          onClick={onUpvote}
          className="flex items-center gap-2 text-gray-600 hover:text-primary"
        >
          <ThumbsUp size={18} />
          {issue.upvotes ?? 0}
        </button>

        <Link
          to={`/issue-details/${issue._id}`}
          className="flex items-center gap-2 bg-primary  text-white text-sm px-4 py-2 rounded-lg"
        >
          <Eye size={16} />
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AllIssuesCard;
