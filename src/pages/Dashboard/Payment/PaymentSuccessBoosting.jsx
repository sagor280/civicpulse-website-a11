import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccessBoosting = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success/boosting?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        })
        .catch((err) => console.error(err));
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center space-y-5 border border-blue-100">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-blue-100 p-5 rounded-full animate-pulse">
            <CheckCircle className="text-blue-500 w-12 h-12" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800">
          Boost Successful
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 leading-relaxed">
          Your issue has been successfully boosted.
          <br />
          <span className="font-medium text-gray-700">
            Thank you for boosting your issue!
          </span>
        </p>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          <p>
            <span className="font-semibold">Transaction ID:</span>{" "}
            <span className="break-all">{paymentInfo.transactionId}</span>
          </p>
          <p>
            <span className="font-semibold">Tracking ID:</span>{" "}
            <span className="break-all">{paymentInfo.trackingId}</span>
          </p>
        </div>

        {/* Button */}
        <div className="pt-3">
          <Link
            to="my-issues"
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            <ArrowLeft size={18} />
            Go Back to My Issues
          </Link>
        </div>

        {/* Footer text */}
        <p className="text-xs text-gray-400 pt-2">
          You can view your boosted issues in your dashboard.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessBoosting;
