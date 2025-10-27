import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Eye, EyeOff, User } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../services/supabaseClient";
import Header2 from "../components/Header2";
import RememberSection from "../components/RememberSection";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

const Login = () => {
  const [mode, setMode] = useState("login"); // 'login', 'signup', 'forgot'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Validation
  const validate = (email, password, name = "") => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 6;
    const isNameValid = mode === "signup" ? name.trim().length > 0 : true;

    setVerified(isEmailValid && isPasswordValid && isNameValid);
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    validate(val, password, fullName);
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    validate(email, val, fullName);
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setFullName(val);
    validate(email, password, val);
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!verified) {
      toast.error("Please enter a valid email and password.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Login successful!");
        localStorage.setItem("supabaseUser", JSON.stringify(data.user));
        dispatch(setUser(data.user));
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!verified) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created! Please check your email to verify.");
        // Optionally redirect or switch to login
        setMode("login");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password reset link sent! Check your email.");
        setMode("login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google OAuth
  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/home`,
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Google authentication failed.");
      setLoading(false);
    }
  };

  // Handle Twitter OAuth
  const handleTwitterAuth = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "twitter",
        options: {
          redirectTo: `${window.location.origin}/home`,
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Twitter authentication failed.");
      setLoading(false);
    }
  };

  // Switch between modes
  const switchMode = (newMode) => {
    setMode(newMode);
    setPassword("");
    setVerified(false);
  };

  // Render form based on mode
  const renderForm = () => {
    if (mode === "forgot") {
      return (
        <form onSubmit={handleForgotPassword}>
          <div>
            <label
              className="font-medium text-sm text-[#101928]"
              htmlFor="email"
            >
              EMAIL ADDRESS
            </label>
            <div className="relative flex items-center mt-1 mb-6">
              <input
                className="w-full p-4 rounded-lg border border-[#D0D5DD] hover:border-[#FA9874] outline-none shadow-md"
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
              <Mail className="absolute right-4 text-gray-400" size={20} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold text-base text-white py-4 px-6 rounded-lg mb-4 bg-[#EB5017] hover:bg-[#d14413] disabled:opacity-50 transition-all"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <button
              type="button"
              onClick={() => switchMode("login")}
              className="text-[#EB5017] font-medium hover:underline"
            >
              Log In
            </button>
          </p>
        </form>
      );
    }

    if (mode === "signup") {
      return (
        <form onSubmit={handleSignup}>
          {/* FULL NAME */}
          <div>
            <label
              className="font-medium text-sm text-[#101928]"
              htmlFor="fullName"
            >
              FULL NAME
            </label>
            <div className="relative flex items-center mt-1 mb-6">
              <input
                className="w-full p-4 rounded-lg border border-[#D0D5DD] hover:border-[#FA9874] outline-none shadow-md"
                id="fullName"
                type="text"
                placeholder="Enter full name"
                value={fullName}
                onChange={handleNameChange}
              />
              <User className="absolute right-4 text-gray-400" size={20} />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label
              className="font-medium text-sm text-[#101928]"
              htmlFor="email"
            >
              EMAIL ADDRESS
            </label>
            <div className="relative flex items-center mt-1 mb-2">
              <input
                className="w-full p-4 rounded-lg border border-[#D0D5DD] hover:border-[#FA9874] outline-none shadow-md"
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
              <Mail className="absolute right-4 text-gray-400" size={20} />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label
              className="font-medium text-sm text-[#101928]"
              htmlFor="password"
            >
              PASSWORD
            </label>
            <div className="relative flex items-center mt-1 mb-4">
              <input
                className="w-full p-4 rounded-lg border border-[#D0D5DD] hover:border-[#FA9874] outline-none shadow-md"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password (min 6 characters)"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-4 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!verified || loading}
            className={`w-full font-semibold text-base text-white py-4 px-6 rounded-lg mb-4 transition-all ${
              verified && !loading
                ? "bg-[#EB5017] hover:bg-[#d14413]"
                : "bg-[#EB5017] opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => switchMode("login")}
              className="text-[#EB5017] font-medium hover:underline"
            >
              Log In
            </button>
          </p>
        </form>
      );
    }

    // Default: Login form
    return (
      <form onSubmit={handleLogin}>
        {/* EMAIL */}
        <div>
          <label className="font-medium text-sm text-[#101928]" htmlFor="email">
            EMAIL ADDRESS
          </label>
          <div className="relative flex items-center mt-1 mb-4">
            <input
              className="w-full p-4 rounded-lg border border-[#D0D5DD] hover:border-[#FA9874] outline-none shadow-md"
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
            <Mail className="absolute right-4 text-gray-400" size={20} />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label
            className="font-medium text-sm text-[#101928]"
            htmlFor="password"
          >
            PASSWORD
          </label>
          <div className="relative flex items-center mt-1 mb-4">
            <input
              className="w-full p-4 rounded-lg border border-[#D0D5DD] hover:border-[#FA9874] outline-none shadow-md"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-4 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <RememberSection />
          <button
            type="button"
            onClick={() => switchMode("forgot")}
            className="text-sm text-[#EB5017] font-medium hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={!verified || loading}
          className={`w-full font-semibold text-base text-white py-4 px-6 rounded-lg mb-4 transition-all ${
            verified && !loading
              ? "bg-[#EB5017] hover:bg-[#d14413]"
              : "bg-[#EB5017] opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Logging in..." : "Log into Account"}
        </button>

        <p className="text-center text-sm text-gray-600 mb-4">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => switchMode("signup")}
            className="text-[#EB5017] font-medium hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    );
  };

  const getHeaderText = () => {
    switch (mode) {
      case "signup":
        return {
          heading: "Create Account",
          paragraph: "Sign up to get started with your account",
        };
      case "forgot":
        return {
          heading: "Reset Password",
          paragraph: "Enter your email to receive a reset link",
        };
      default:
        return {
          heading: "Log In",
          paragraph: "Enter your credentials to access your account",
        };
    }
  };

  const headerText = getHeaderText();

  return (
    <div className="m-auto flex flex-col justify-center h-screen gap-2 lg:w-[400px] px-4">
      <Header2 heading={headerText.heading} paragraph={headerText.paragraph} />
      <Toaster />

      {renderForm()}

      {/* Social Auth - Only show on login and signup */}
      {mode !== "forgot" && (
        <>
          <div className="relative flex items-center my-1">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">
              Or continue with
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>

            <button
              type="button"
              onClick={handleTwitterAuth}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="#1DA1F2" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              <span className="text-sm font-medium">Twitter</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
