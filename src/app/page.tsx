"use client";

import useFcmToken from "@/utils/hooks/useFcmToken";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { token, notificationPermissionStatus } = useFcmToken();

  const handleTestNotification = async () => {
    const response = await fetch("/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        title: "Test Notification",
        message: "This is a test notification",
        // link: "/contact",
      }),
    });

    const data = await response.json();
    console.log(data);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-4">
      {/* <FcmTokenComp /> Render for foreground notification handling */}
      <ToastContainer />

      <h1 className="text-3xl font-extrabold">
        Firebase NextJS Push Notifications
      </h1>

      <button
        disabled={notificationPermissionStatus !== "granted"}
        onClick={handleTestNotification}
        className="px-4 py-2 min-h-12 w-full uppercase rounded-xl bg-orange-300 text-orange-800 font-bold text-[13px] hover:text-black hover:bg-orange-400 transition-all duration-300"
      >
        Send Notification
      </button>
    </main>
  );
}
