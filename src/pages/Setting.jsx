import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, deleteUser, logout } from "../redux/authSlice"; // adjust path as needed
import Alert from "../components/Alert";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState({ update: false });
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  // Initialize theme from localStorage or default to dark.
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  const toggleNotification = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      setError("User not authenticated");
      setTimeout(() => setError(null), 4000);
      return;
    }
    setLoading((prev) => ({ ...prev, update: true }));
    setError(null);
    try {
      const result = await dispatch(
        updateUser({ id: user.id, userData: formData })
      ).unwrap();
      setFormData({ name: result.name, email: result.email, password: "" });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err || "Update failed");
    } finally {
      setLoading((prev) => ({ ...prev, update: false }));
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    );
    if (!confirmed || !user?.id) return;

    setLoadingDelete(true);
    try {
      await dispatch(deleteUser(user.id)).unwrap();
      setSuccess("Account deleted successfully.");
      dispatch(logout());
      navigate("/");
    } catch (err) {
      setError(err || "Account deletion failed.");
    } finally {
      setLoadingDelete(false);
    }
  };

  // Apply theme changes real-time and persist the choice.
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Container style based on theme:
  const containerStyle =
    theme === "dark"
      ? "min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-mono p-6"
      : "min-h-screen bg-white text-gray-900 font-sans p-6";

  // Card style: use a translucent background in dark mode and a solid white background in light mode.
  const cardStyle =
    "rounded-2xl shadow-lg p-6 border border-yellow-500/30 backdrop-blur-md " +
    (theme === "dark" ? "bg-white/10" : "bg-white");

  // Input style: different backgrounds & text colors for light vs. dark mode.
  const inputStyle =
    "p-2 border border-yellow-500 rounded-md focus:ring-2 focus:ring-yellow-400 " +
    (theme === "dark" ? "bg-black/30 text-white" : "bg-gray-100 text-gray-900");

  // Select style for theme picker.
  const selectStyle =
    "p-2 border border-yellow-500 rounded-md focus:ring-2 focus:ring-yellow-400 " +
    (theme === "dark" ? "bg-black/30 text-white" : "bg-gray-100 text-gray-900");

  return (
    <div className={containerStyle}>
      <h1 className="text-3xl font-bold text-center mb-8">⚙️ Settings</h1>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Left Column: Account Settings */}
        <div className="flex-1 space-y-6">
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold text-green mb-4">
              👤 Account
            </h2>

            {error && (
              <Alert
                message={error}
                type="error"
                onClose={() => setError(null)}
              />
            )}
            {success && (
              <Alert
                message={success}
                type="success"
                onClose={() => setSuccess(null)}
              />
            )}

            <form className="grid gap-4" onSubmit={handleUpdate}>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Change Name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={inputStyle}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Change Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={inputStyle}
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="New Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={inputStyle}
              />
              <button
                type="submit"
                disabled={loading.update}
                className="bg-orange hover:bg-yellow rounded-md py-2 text-white"
              >
                {loading.update ? "Saving..." : "💾 Save Changes"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Notifications, Theme, and Danger Zone */}
        <div className="flex-1 space-y-6">
          {/* Notification Settings */}
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold text-green mb-4">
              🔔 Notifications
            </h2>
            <div className="space-y-2">
              <label className="flex items-center justify-between text-green">
                <span>Email Alerts</span>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => toggleNotification("email")}
                  className="accent-yellow-500 scale-125"
                />
              </label>
              <label className="flex items-center justify-between text-green">
                <span>SMS Alerts</span>
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={() => toggleNotification("sms")}
                  className="accent-yellow-500 scale-125"
                />
              </label>
            </div>
          </div>

          {/* Theme Settings */}
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold text-green mb-4">🎨 Theme</h2>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className={selectStyle}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
            <p className="text-sm text-gray-400 mt-2">
              Your theme preference is updated in real-time.
            </p>
          </div>

          {/* Danger Zone */}
          <div className={cardStyle + " border-red-500/30"}>
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              🚮 Delete Account
            </h2>
            <button
              onClick={handleDeleteAccount}
              disabled={loadingDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              {loadingDelete ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
