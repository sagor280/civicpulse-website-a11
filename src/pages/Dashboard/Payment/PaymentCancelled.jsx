import { XCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
     <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center space-y-5 border border-red-100">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-red-100 p-5 rounded-full animate-pulse">
            <XCircle className="text-red-500 w-12 h-12" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800">
          Payment Cancelled
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 leading-relaxed">
          Looks like the payment process was interrupted.  
          <br />
          <span className="font-medium text-gray-700">
            Don’t worry — you were not charged.
          </span>
        </p>

        {/* Info Box */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          You can safely retry the payment anytime from your profile.
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-3">
          <Link
            to="/dashboard/profile"
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            <RefreshCcw size={18} />
            Try Again
          </Link>

          <Link
            to="/dashboard"
            className="w-full inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>

        {/* Footer text */}
        <p className="text-xs text-gray-400 pt-2">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
};

export default PaymentCancelled;
