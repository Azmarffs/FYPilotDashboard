import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, UserPlus, Mail, X } from "lucide-react";
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

export default function TeamFormation() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [myTeam, setMyTeam] = useState([
    { id: "1", name: "John Doe", skills: ["React", "Node.js", "Python"], role: "Lead" },
  ]);

  const students = [
    {
      id: "2",
      name: "Jane Smith",
      studentId: "22I-2345",
      skills: ["Machine Learning", "Python", "TensorFlow"],
      interests: ["AI", "Data Science"],
      cgpa: 3.8,
    },
    {
      id: "3",
      name: "Ali Hassan",
      studentId: "22I-3456",
      skills: ["Full Stack", "React", "Node.js", "MongoDB"],
      interests: ["Web Development", "Cloud Computing"],
      cgpa: 3.6,
    },
    {
      id: "4",
      name: "Sara Khan",
      studentId: "22I-4567",
      skills: ["UI/UX", "Figma", "React", "TypeScript"],
      interests: ["Design", "Frontend"],
      cgpa: 3.9,
    },
  ];

  const invitations = [
    { id: "5", name: "Ahmed Raza", studentId: "22I-5678", status: "pending" },
  ];

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleInvite = (student: any) => {
    toast({
      title: "Invitation Sent",
      description: `Team invitation sent to ${student.name}`,
    });
  };

  const handleRemoveMember = (memberId: string) => {
    setMyTeam(myTeam.filter(m => m.id !== memberId));
    toast({ title: "Member Removed" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Team Formation</h1>
        <p className="text-muted-foreground">Find and invite team members for your project</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-students"
            />
          </div>

          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="p-6 hover-elevate" data-testid={`card-student-${student.id}`}>
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {student.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">{student.studentId}</p>
                      </div>
                      <Badge variant="outline">CGPA: {student.cgpa}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {student.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setSelectedStudent(student)} data-testid={`button-view-${student.id}`}>
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleInvite(student)} data-testid={`button-invite-${student.id}`}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Invite
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">My Team ({myTeam.length}/4)</h3>
            <div className="space-y-3">
              {myTeam.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  {member.role !== "Lead" && (
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveMember(member.id)}>
                      <X className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {invitations.length > 0 && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Pending Invitations</h3>
              <div className="space-y-3">
                {invitations.map((inv) => (
                  <div key={inv.id} className="p-3 bg-card rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">{inv.name}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">Pending</Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedStudent?.name}</DialogTitle>
            <DialogDescription>{selectedStudent?.studentId}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {selectedStudent?.skills.map((skill: string) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Interests</p>
              <div className="flex flex-wrap gap-2">
                {selectedStudent?.interests.map((interest: string) => (
                  <Badge key={interest} variant="outline">{interest}</Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedStudent(null)}>Close</Button>
            <Button onClick={() => {
              handleInvite(selectedStudent);
              setSelectedStudent(null);
            }}>Send Invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
