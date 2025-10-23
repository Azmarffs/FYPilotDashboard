import { NotificationItem } from "../NotificationItem";
import { useState } from "react";

export default function NotificationItemExample() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "success" as const,
      title: "Project Approved",
      message: "Your project 'AI-Powered Student Predictor' has been approved by the committee.",
      timestamp: "2 hours ago",
      isRead: false,
    },
    {
      id: "2",
      type: "info" as const,
      title: "New Supervisor Response",
      message: "Dr. Sarah Ahmed has accepted your supervision request.",
      timestamp: "5 hours ago",
      isRead: false,
    },
    {
      id: "3",
      type: "warning" as const,
      title: "Milestone Deadline Approaching",
      message: "Your next milestone is due in 3 days. Please ensure all deliverables are ready.",
      timestamp: "1 day ago",
      isRead: true,
    },
  ]);

  return (
    <div className="space-y-4 p-6 max-w-3xl">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          {...notification}
          onMarkRead={() => {
            setNotifications(notifications.map(n => 
              n.id === notification.id ? { ...n, isRead: true } : n
            ));
          }}
          onDelete={() => {
            setNotifications(notifications.filter(n => n.id !== notification.id));
          }}
          onView={() => console.log("Viewing notification", notification.id)}
        />
      ))}
    </div>
  );
}
