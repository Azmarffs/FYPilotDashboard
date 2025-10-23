import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Users, Calendar, Paperclip, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Communications() {
  const { toast } = useToast();
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

  const sentMessages = [
    {
      id: "1",
      subject: "FYP Defense Schedule Announcement",
      recipients: "All Students",
      sentDate: "Nov 10, 2025",
      status: "Delivered",
    },
    {
      id: "2",
      subject: "Panel Assignment Notification",
      recipients: "Faculty Members",
      sentDate: "Nov 8, 2025",
      status: "Delivered",
    },
    {
      id: "3",
      subject: "Project Submission Deadline Reminder",
      recipients: "Final Year Students",
      sentDate: "Nov 5, 2025",
      status: "Delivered",
    },
  ];

  const recipientGroups = [
    { id: "all-students", name: "All Students", count: 145 },
    { id: "final-year", name: "Final Year Students", count: 48 },
    { id: "faculty", name: "All Faculty", count: 24 },
    { id: "supervisors", name: "Project Supervisors", count: 18 },
    { id: "committee", name: "FYP Committee", count: 5 },
  ];

  const toggleRecipient = (groupId: string) => {
    setSelectedRecipients(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSendMessage = () => {
    if (selectedRecipients.length === 0) {
      toast({
        title: "No Recipients",
        description: "Please select at least one recipient group",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Message Sent",
      description: `Announcement sent to ${selectedRecipients.length} group(s)`,
    });
    setShowComposeModal(false);
    setSelectedRecipients([]);
  };

  const handleScheduleMessage = () => {
    toast({
      title: "Message Scheduled",
      description: "Your announcement has been scheduled",
    });
    setShowScheduleModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Communications</h1>
          <p className="text-muted-foreground">Send announcements and manage communications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowScheduleModal(true)} data-testid="button-schedule">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Message
          </Button>
          <Button onClick={() => setShowComposeModal(true)} data-testid="button-compose">
            <Send className="h-4 w-4 mr-2" />
            Send Announcement
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Messages Sent</h3>
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary">{sentMessages.length}</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Recipient Groups</h3>
            <Users className="h-5 w-5 text-info" />
          </div>
          <div className="text-3xl font-bold text-info">{recipientGroups.length}</div>
          <p className="text-xs text-muted-foreground">Available groups</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Scheduled</h3>
            <Calendar className="h-5 w-5 text-warning" />
          </div>
          <div className="text-3xl font-bold text-warning">2</div>
          <p className="text-xs text-muted-foreground">Pending delivery</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Quick Send</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button variant="outline" className="justify-start h-auto p-4" data-testid="button-quick-students">
            <Users className="h-5 w-5 mr-3 text-primary" />
            <div className="text-left">
              <div className="font-semibold">Message All Students</div>
              <div className="text-xs text-muted-foreground">Send to 145 students</div>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto p-4" data-testid="button-quick-faculty">
            <Users className="h-5 w-5 mr-3 text-info" />
            <div className="text-left">
              <div className="font-semibold">Message All Faculty</div>
              <div className="text-xs text-muted-foreground">Send to 24 faculty members</div>
            </div>
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Sent Messages History</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="space-y-3">
          {sentMessages.map((message) => (
            <div key={message.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold">{message.subject}</h4>
                  <p className="text-sm text-muted-foreground">To: {message.recipients}</p>
                </div>
                <Badge variant="outline">{message.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Sent on {message.sentDate}</p>
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={showComposeModal} onOpenChange={setShowComposeModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Announcement</DialogTitle>
            <DialogDescription>Compose and send a message to selected groups</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select Recipients</Label>
              <div className="mt-2 max-h-64 overflow-y-auto space-y-2 border rounded-lg p-3">
                {recipientGroups.map((group) => (
                  <div key={group.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedRecipients.includes(group.id)}
                      onCheckedChange={() => toggleRecipient(group.id)}
                      data-testid={`checkbox-${group.id}`}
                    />
                    <label className="text-sm flex-1 cursor-pointer">
                      {group.name} ({group.count} people)
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {selectedRecipients.length} group(s) selected
              </p>
            </div>
            <div>
              <Label>Subject</Label>
              <Input className="mt-2" placeholder="Announcement subject" data-testid="input-subject" />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                className="mt-2 min-h-48"
                placeholder="Type your announcement here..."
                data-testid="input-message"
              />
            </div>
            <Button variant="outline" className="w-full">
              <Paperclip className="h-4 w-4 mr-2" />
              Attach File
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowComposeModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendMessage} data-testid="button-send">
              <Send className="h-4 w-4 mr-2" />
              Send Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule Message</DialogTitle>
            <DialogDescription>Compose a message to be sent later</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select Recipients</Label>
              <div className="mt-2 max-h-48 overflow-y-auto space-y-2 border rounded-lg p-3">
                {recipientGroups.map((group) => (
                  <div key={group.id} className="flex items-center gap-2">
                    <Checkbox data-testid={`checkbox-schedule-${group.id}`} />
                    <label className="text-sm flex-1 cursor-pointer">
                      {group.name} ({group.count} people)
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Subject</Label>
              <Input className="mt-2" placeholder="Message subject" data-testid="input-schedule-subject" />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea className="mt-2 min-h-32" placeholder="Type your message..." data-testid="input-schedule-message" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Schedule Date</Label>
                <Input type="date" className="mt-2" data-testid="input-schedule-date" />
              </div>
              <div>
                <Label>Schedule Time</Label>
                <Input type="time" className="mt-2" data-testid="input-schedule-time" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleMessage} data-testid="button-confirm-schedule">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
