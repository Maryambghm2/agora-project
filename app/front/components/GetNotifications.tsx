"use client";

import { useEffect, useState } from "react";
import { Notifications } from "../types/page";


export default function GetNotifications() {
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        setUnreadCount(data.filter((notification: any) => !notification.read_status).length);
      })
      .catch((err) => console.error("Erreur lors du chargement des notifications", err));
  }, []);

  const markAllAsRead = async () => {
    await fetch("/api/notifications", { method: "PUT" });
    setNotifications(notifications.map((n) => ({ ...n, read_status: true })));
    setUnreadCount(0);
  };

  return (
    <>
      <button
        className="relative flex items-center justify-center"
        onClick={() => setOpen(!open)}
      >
        <img src="/cloche.png" width={24} height={24} alt="Notifications" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed top-5 right-5 w-80 p-4 bg-gray-300 rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto transition-transform duration-300 ease-in-out transform">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Notifications</h2>

          {notifications.length > 0 ? (
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {notifications.map((notif) => (
                <li
                  key={notif.id_notification}
                  className={`p-3 rounded-lg ${notif.read_status ? "bg-gray-200" : "bg-gray-100"} transition duration-200 ease-in-out`}
                >
                  <p className="text-sm text-gray-800">{notif.message}</p>
                  <span className="text-xs text-gray-500">{new Date(notif.notification_date).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Aucune notification</p>
          )}

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={markAllAsRead}
              className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Tout marquer comme lu
            </button>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}