import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../services/supabaseClient";
import Header2 from "../components/Header2";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const navigate = useNavigate();

  // Check if user arrived with valid reset token
  useEffect(() => {
    const checkResetToken = async () => {
      // Check if there's a recovery token in the URL hash
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const type = hashParams.get("type");

      if (type === "recovery" && accessToken) {
        setValidToken(true);
        toast.success("You can now reset your password.");
      } else {
        // Check if user has an active session (already authenticated)
        const { data } = await supabase.auth.getSession();
        if (data?.session) {
          setValidToken(true);
        } else {
          toast.error(
            "Invalid or expired reset link. Please request a new one."
          );
          setTimeout(() => navigate("/login"), 3000);
        }
      }
    };

    checkResetToken();
  }, [navigate]);

  // Validation
  const validate = (password, confirm) => {
    const isPasswordValid = password.length >= 6;
    const isConfirmValid = confirm === password && confirm.length > 0;
    setVerified(isPasswordValid && isConfirmValid);
  };

  const handleNewPasswordChange = (e) => {
    const val = e.target.value;
    setNewPassword(val);
    validate(val, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const val = e.target.value;
    setConfirmPassword(val);
    validate(newPassword, val);
  };

  const toggleNewPassword = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  // Handle password reset
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verified) {
      toast.error("Please enter matching passwords (min 6 characters).");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password updated successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking token
  if (!validToken) {
    return (
      <div className="m-auto flex flex-col justify-center items-center h-screen gap-6 lg:w-[400px] px-4">
        <Toaster />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EB5017] mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="m-auto flex flex-col justify-center h-screen gap-6 lg:w-[400px] px-4">
      <Header2
        heading="Reset Password"
        paragraph="Enter your new password below"
      />
      <Toaster />

      <form onSubmit={handleSubmit}>
        {/* NEW PASSWORD */}
        <div>
          <label
            className="font-medium text-sm text-[#101928]"
            htmlFor="newPassword"
          >
            NEW PASSWORD
          </label>
          <div className="relative flex items-center mt-1 mb-6">
            <input
              className="w-full p-4 rounded-lg border border-[#D0D5DD] hover:border-[#FA9874] outline-none shadow-md"
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Enter new password (min 6 characters)"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <button
              type="button"
              onClick={toggleNewPassword}
              className="absolute right-4 text-gray-500"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label
            className="font-medium text-sm text-[#101928]"
            htmlFor="confirmPassword"
          >
            CONFIRM PASSWORD
          </label>
          <div className="relative flex items-center mt-1 mb-6">
            <input
              className="w-full p-4 rounded-lg border border-[#D0D5DD] hover:border-[#FA9874] outline-none shadow-md"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <button
              type="button"
              onClick={toggleConfirmPassword}
              className="absolute right-4 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Password strength indicator */}
        {newPassword.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Password strength:</span>
              <span
                className={`font-medium ${
                  newPassword.length < 6
                    ? "text-red-500"
                    : newPassword.length < 10
                      ? "text-yellow-500"
                      : "text-green-500"
                }`}
              >
                {newPassword.length < 6
                  ? "Weak"
                  : newPassword.length < 10
                    ? "Medium"
                    : "Strong"}
              </span>
            </div>
            <div className="flex gap-1 mt-2">
              <div
                className={`h-1 flex-1 rounded ${
                  newPassword.length >= 6 ? "bg-yellow-500" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`h-1 flex-1 rounded ${
                  newPassword.length >= 10 ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
            </div>
          </div>
        )}

        {/* Password match indicator */}
        {confirmPassword.length > 0 && (
          <div className="mb-6">
            <p
              className={`text-sm ${
                newPassword === confirmPassword
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {newPassword === confirmPassword
                ? "✓ Passwords match"
                : "✗ Passwords do not match"}
            </p>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={!verified || loading}
          className={`w-full font-semibold text-base text-white py-4 px-6 rounded-lg mb-4 transition-all ${
            verified && !loading
              ? "bg-[#EB5017] hover:bg-[#d14413]"
              : "bg-[#EB5017] opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Updating Password..." : "Reset Password"}
        </button>

        {/* Back to login */}
        <p className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#EB5017] font-medium hover:underline"
          >
            Back to Login
          </button>
        </p>
      </form>

      {/* Password requirements */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
        <h3 className="font-medium text-sm text-[#101928] mb-2">
          Password Requirements:
        </h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li className="flex items-center gap-2">
            <span
              className={`${
                newPassword.length >= 6 ? "text-green-600" : "text-gray-400"
              }`}
            >
              {newPassword.length >= 6 ? "✓" : "○"}
            </span>
            At least 6 characters long
          </li>
          <li className="flex items-center gap-2">
            <span
              className={`${
                newPassword === confirmPassword && confirmPassword.length > 0
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              {newPassword === confirmPassword && confirmPassword.length > 0
                ? "✓"
                : "○"}
            </span>
            Both passwords match
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResetPassword;
