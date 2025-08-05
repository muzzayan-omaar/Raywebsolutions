import { useState } from "react";
import axios from "axios";
import { useVerified } from "../context/VerifiedContext";

export default function EmailVerification() {
  const { setIsVerified } = useVerified();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/email/send-otp`, { email });
    setStep(2);
    alert("OTP sent to your email");
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/email/verify-otp`, { otp });
      if (res.data.verified) {
        alert("Email verified!");
        setIsVerified(true);
      }
    } catch {
      alert("Wrong OTP");
    }
  };

  return (
    <div className="text-white p-6">
      {step === 1 && (
        <>
          <input placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}
      {step === 2 && (
        <>
          <input placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify</button>
        </>
      )}
    </div>
  );
}
