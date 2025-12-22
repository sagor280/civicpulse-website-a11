import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccessBoosting = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success-boosting?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
          setLoading(false); 
        })
        .catch((err) => {
          console.error(err);
          setLoading(false); 
        });
    } else {
      setLoading(false); 
    }
  }, [sessionId, axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center space-y-5 border border-blue-100">
        {/* ICON */}
        <div className="flex justify-center">
          <div className="bg-blue-100 p-5 rounded-full">
            <CheckCircle className="text-blue-500 w-12 h-12" />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-gray-800">
          Boost Successful 🚀
        </h2>

        {/* SUBTITLE */}
        <p className="text-gray-600">
          Your issue has been successfully boosted.
        </p>

        {/* PAYMENT INFO */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          <p>
            <span className="font-semibold">Transaction ID:</span>{" "}
            {paymentInfo.transactionId}
          </p>
          <p>
            <span className="font-semibold">Tracking ID:</span>{" "}
            {paymentInfo.trackingId}
          </p>
        </div>

        {/* BACK BUTTON */}
        <Link
          to="/dashboard/my-issues"
          className="w-full inline-flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          <ArrowLeft size={18} />
          Go Back to My Issues
        </Link>

        {/* FOOTER */}
        <p className="text-xs text-gray-400">
          You can view your boosted issues in your dashboard.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessBoosting;
