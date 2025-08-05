import { useState } from "react";
import { auth, RecaptchaVerifier } from "../firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import { useVerified } from "../context/VerifiedContext";

export default function PhoneVerification() {
  const { setIsVerified } = useVerified();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", { size: "invisible" }, auth);
  };

  const sendOTP = () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmation) => {
        setConfirmationResult(confirmation);
        alert("OTP sent to " + phone);
      })
      .catch((err) => console.error("Error:", err));
  };

  const verifyOTP = () => {
    confirmationResult
      .confirm(otp)
      .then(() => {
        alert("Phone verified!");
        setIsVerified(true);
      })
      .catch(() => alert("Invalid OTP"));
  };

  return (
    <div className="text-white p-6">
      <input placeholder="+256..." value={phone} onChange={e => setPhone(e.target.value)} />
      <button onClick={sendOTP}>Send OTP</button>

      <input placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
      <button onClick={verifyOTP}>Verify</button>

      <div id="recaptcha-container"></div>
    </div>
  );
}
