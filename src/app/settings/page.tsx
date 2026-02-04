import { updatePasswordAction } from "../action"; // Adjust path to your actions file

export default function SettingsPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Account Security</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Since email resets are rate-limited, you can update your password directly here while logged in.
      </p>

      <form action={updatePasswordAction} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="Enter new password"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}