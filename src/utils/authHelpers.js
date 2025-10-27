import { supabase } from "../services/supabaseClient";
import { clearCart } from "../features/cartSlice";
import { setUser } from "../features/userSlice";
import toast from "react-hot-toast";

/**
 * Logout helper function
 * Clears user session, cart, and local storage
 */
export const handleLogout = async (dispatch, navigate) => {
  try {
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Error logging out: " + error.message);
      return;
    }

    // Clear Redux state
    dispatch(setUser(null));
    dispatch(clearCart());

    // Clear localStorage
    localStorage.removeItem("supabaseUser");

    toast.success("Logged out successfully!");

    // Navigate to login page
    navigate("/login");
  } catch (err) {
    console.error("Logout error:", err);
    toast.error("Something went wrong during logout");
  }
};
