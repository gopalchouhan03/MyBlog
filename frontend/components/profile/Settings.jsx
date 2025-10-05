import React, { useState } from "react";
import { Link } from "react-router-dom";


const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Account Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Account</h2>
        <div className="flex items-center justify-between mb-3">
          <span>Email Notifications</span>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
            className="h-5 w-5"
          />
        </div>
        <div className="flex items-center justify-between mb-3">
          <span>Push Notifications</span>
          <input
            type="checkbox"
            checked={pushNotifications}
            onChange={() => setPushNotifications(!pushNotifications)}
            className="h-5 w-5"
          />
        </div>
        <div className="flex items-center justify-between">
          <span>Private Account</span>
          <input
            type="checkbox"
            checked={privateAccount}
            onChange={() => setPrivateAccount(!privateAccount)}
            className="h-5 w-5"
          />
        </div>
      </div>

      {/* Security Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Security</h2>
        <button className="w-full text-left px-4 py-2 border rounded-md mb-2 hover:bg-gray-100 transition">
          Change Password
        </button>
        <button className="w-full text-left px-4 py-2 border rounded-md hover:bg-gray-100 transition">
          Two-Factor Authentication
        </button>
      </div>

      {/* Privacy Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Privacy</h2>
        <button className="w-full text-left px-4 py-2 border rounded-md mb-2 hover:bg-gray-100 transition">
          Blocked Accounts
        </button>
        <button className="w-full text-left px-4 py-2 border rounded-md hover:bg-gray-100 transition">
          Activity Status
        </button>
      </div>

      {/* Save Button */}
      <Link to={"/profile"}
        onClick={handleSave}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
      >
        Save Changes
      </Link>
    </div>
  );
};

export default Settings;
