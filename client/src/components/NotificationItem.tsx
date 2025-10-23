import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, XCircle, Info, AlertCircle, Eye, Trash2 } from "lucide-react";

interface NotificationItemProps {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  onMarkRead: () => void;
  onDelete: () => void;
  onView?: () => void;
}

export function NotificationItem({
  type,
  title,
  message,
  timestamp,
  isRead,
  onMarkRead,
  onDelete,
  onView,
}: NotificationItemProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertCircle,
  };

  const colors = {
    success: "text-success",
    error: "text-destructive",
    info: "text-info",
    warning: "text-warning",
  };

  const Icon = icons[type];

  return (
    <Card className={`p-4 ${!isRead ? "border-l-4 border-l-primary" : ""} hover-elevate`} data-testid={`notification-${type}`}>
      <div className="flex gap-4">
        <div className={`${colors[type]} mt-1`}>
          <Icon className="h-5 w-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-semibold">{title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{message}</p>
            </div>
            {!isRead && (
              <Badge variant="secondary" className="text-xs">New</Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">{timestamp}</span>
            <div className="flex gap-2">
              {onView && (
                <Button variant="ghost" size="sm" onClick={onView} data-testid="button-view-notification">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              )}
              {!isRead && (
                <Button variant="ghost" size="sm" onClick={onMarkRead} data-testid="button-mark-read">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Mark Read
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onDelete} data-testid="button-delete-notification">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
