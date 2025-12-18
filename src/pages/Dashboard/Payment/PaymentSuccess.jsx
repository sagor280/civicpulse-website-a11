import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
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
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center space-y-5 border border-green-100">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 p-5 rounded-full animate-pulse">
            <CheckCircle className="text-green-500 w-12 h-12" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800">
          Payment Successful
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 leading-relaxed">
          Your payment was completed successfully.
          <br />
          <span className="font-medium text-gray-700">
            Thank you for upgrading to Premium!
          </span>
        </p>

        {/* Info Box */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
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
            to="/dashboard/profile"
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            <ArrowLeft size={18} />
            Go Back to Profile
          </Link>
        </div>

        {/* Footer text */}
        <p className="text-xs text-gray-400 pt-2">
          You can manage your Premium features from your profile.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
