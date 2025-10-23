import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Calendar, Paperclip, Archive, MailOpen } from "lucide-react";
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

export default function Communication() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showThreadModal, setShowThreadModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showBulkMessageModal, setShowBulkMessageModal] = useState(false);
  const [selectedThread, setSelectedThread] = useState<any>(null);

  const messages = [
    {
      id: "1",
      from: "John Doe",
      subject: "Question about project milestone",
      preview: "Hi Dr. Ahmed, I have a question regarding the upcoming milestone deliverable...",
      timestamp: "2 hours ago",
      isRead: false,
      projectTitle: "AI Student Predictor",
    },
    {
      id: "2",
      from: "Jane Smith",
      subject: "Progress update",
      preview: "Dear Supervisor, I wanted to update you on our recent progress with the blockchain implementation...",
      timestamp: "5 hours ago",
      isRead: false,
      projectTitle: "Blockchain Verification",
    },
    {
      id: "3",
      from: "Ahmed Ali",
      subject: "Meeting request",
      preview: "Could we schedule a meeting to discuss the system architecture?",
      timestamp: "1 day ago",
      isRead: true,
      projectTitle: "Smart Campus IoT",
    },
  ];

  const students = [
    { id: "1", name: "John Doe", project: "AI Student Predictor" },
    { id: "2", name: "Jane Smith", project: "Blockchain Verification" },
    { id: "3", name: "Ahmed Ali", project: "Smart Campus IoT" },
  ];

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const toggleStudent = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const filteredMessages = messages.filter(m =>
    m.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully",
    });
    setShowComposeModal(false);
  };

  const handleScheduleMeeting = () => {
    toast({
      title: "Meeting Scheduled",
      description: "Meeting invitation has been sent",
    });
    setShowMeetingModal(false);
  };

  const handleSendBulkMessage = () => {
    if (selectedStudents.length === 0) {
      toast({
        title: "No Recipients",
        description: "Please select at least one student",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Bulk Message Sent",
      description: `Message sent to ${selectedStudents.length} students`,
    });
    setShowBulkMessageModal(false);
    setSelectedStudents([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Student Communication</h1>
          <p className="text-muted-foreground">Communicate with your supervisees</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowBulkMessageModal(true)} data-testid="button-bulk-message">
            Send Bulk Message
          </Button>
          <Button onClick={() => setShowComposeModal(true)} data-testid="button-compose">
            <Send className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-messages"
            />
          </div>

          <div className="space-y-3">
            {filteredMessages.map((message) => (
              <Card
                key={message.id}
                className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                  !message.isRead ? "border-primary" : ""
                }`}
                onClick={() => {
                  setSelectedThread(message);
                  setShowThreadModal(true);
                }}
                data-testid={`message-${message.id}`}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {message.from.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{message.from}</p>
                        {!message.isRead && <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />}
                      </div>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <p className="font-medium text-sm mb-1">{message.subject}</p>
                    <p className="text-sm text-muted-foreground truncate">{message.preview}</p>
                    <Badge variant="secondary" className="mt-2 text-xs">{message.projectTitle}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline" onClick={() => setShowComposeModal(true)}>
                <Send className="h-4 w-4 mr-2" />
                Compose Message
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => setShowMeetingModal(true)}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MailOpen className="h-4 w-4 mr-2" />
                Mark All as Read
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Archive className="h-4 w-4 mr-2" />
                View Archived
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={showComposeModal} onOpenChange={setShowComposeModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Compose Message</DialogTitle>
            <DialogDescription>Send a message to your student</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>To</Label>
              <select className="w-full mt-2 px-3 py-2 border rounded-md" data-testid="select-recipient">
                <option value="">Select student...</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>{student.name} - {student.project}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Subject</Label>
              <Input className="mt-2" placeholder="Message subject" data-testid="input-subject" />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                className="mt-2 min-h-48"
                placeholder="Type your message here..."
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
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showThreadModal} onOpenChange={setShowThreadModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedThread?.subject}</DialogTitle>
            <DialogDescription>{selectedThread?.from}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">{selectedThread?.preview}</p>
              <p className="text-xs text-muted-foreground mt-2">{selectedThread?.timestamp}</p>
            </div>
            <div>
              <Label>Reply</Label>
              <Textarea className="mt-2 min-h-32" placeholder="Type your reply..." data-testid="input-reply" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowThreadModal(false)}>
              Close
            </Button>
            <Button onClick={() => {
              toast({ title: "Reply Sent" });
              setShowThreadModal(false);
            }}>
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showMeetingModal} onOpenChange={setShowMeetingModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Meeting</DialogTitle>
            <DialogDescription>Send a meeting invitation to your student</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Student</Label>
              <select className="w-full mt-2 px-3 py-2 border rounded-md">
                <option value="">Select student...</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>{student.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Date & Time</Label>
              <Input type="datetime-local" className="mt-2" data-testid="input-datetime" />
            </div>
            <div>
              <Label>Location / Meeting Link</Label>
              <Input className="mt-2" placeholder="e.g., Room 301 or Zoom link" data-testid="input-location" />
            </div>
            <div>
              <Label>Agenda</Label>
              <Textarea className="mt-2" placeholder="Meeting agenda..." data-testid="input-agenda" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMeetingModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleMeeting} data-testid="button-schedule-meeting">
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showBulkMessageModal} onOpenChange={setShowBulkMessageModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Bulk Message</DialogTitle>
            <DialogDescription>Send a message to multiple students at once</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select Recipients</Label>
              <div className="mt-2 max-h-48 overflow-y-auto space-y-2 border rounded-lg p-3">
                {students.map(student => (
                  <div key={student.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={() => toggleStudent(student.id)}
                      data-testid={`checkbox-student-${student.id}`}
                    />
                    <label className="text-sm flex-1 cursor-pointer">
                      {student.name} - {student.project}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {selectedStudents.length} student(s) selected
              </p>
            </div>
            <div>
              <Label>Subject</Label>
              <Input className="mt-2" placeholder="Message subject" data-testid="input-bulk-subject" />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                className="mt-2 min-h-32"
                placeholder="Type your message..."
                data-testid="input-bulk-message"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkMessageModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendBulkMessage} data-testid="button-send-bulk">
              Send to {selectedStudents.length} Student(s)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
