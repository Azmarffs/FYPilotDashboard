import { NotificationItem } from "@/components/NotificationItem";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Notifications() {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
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
    {
      id: "4",
      type: "info" as const,
      title: "Team Invitation Accepted",
      message: "Jane Smith has accepted your team invitation.",
      timestamp: "2 days ago",
      isRead: true,
    },
    {
      id: "5",
      type: "error" as const,
      title: "Document Upload Failed",
      message: "Failed to upload project proposal. Please try again or contact support.",
      timestamp: "3 days ago",
      isRead: true,
    },
  ]);

  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read") return n.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast({ title: "All Marked as Read" });
  };

  const handleMarkRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast({ title: "Notification Deleted" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleMarkAllRead} data-testid="button-mark-all-read">
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48" data-testid="select-filter">
            <SelectValue placeholder="Filter..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Notifications</SelectItem>
            <SelectItem value="unread">Unread Only</SelectItem>
            <SelectItem value="read">Read Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            {...notification}
            onMarkRead={() => handleMarkRead(notification.id)}
            onDelete={() => handleDelete(notification.id)}
            onView={() => toast({ title: "View Details" })}
          />
        ))}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No notifications to display</p>
          </div>
        )}
      </div>
    </div>
  );
}
