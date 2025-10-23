import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, Download, BarChart3, Calendar, Edit, Trash2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FacultyManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showWorkloadModal, setShowWorkloadModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);

  const faculty = [
    {
      id: "1",
      name: "Dr. Sarah Ahmed",
      department: "Computer Science",
      designation: "Associate Professor",
      email: "sarah.ahmed@nu.edu.pk",
      expertise: ["AI", "Machine Learning", "Data Science"],
      currentLoad: 6,
      maxLoad: 8,
      availability: "Available",
    },
    {
      id: "2",
      name: "Dr. Muhammad Khan",
      department: "Software Engineering",
      designation: "Assistant Professor",
      email: "m.khan@nu.edu.pk",
      expertise: ["Web Development", "Cloud Computing", "DevOps"],
      currentLoad: 5,
      maxLoad: 6,
      availability: "Available",
    },
    {
      id: "3",
      name: "Dr. Fatima Tariq",
      department: "Data Science",
      designation: "Professor",
      email: "fatima.tariq@nu.edu.pk",
      expertise: ["Big Data", "Analytics", "Statistics"],
      currentLoad: 8,
      maxLoad: 8,
      availability: "Fully Booked",
    },
  ];

  const filteredFaculty = faculty.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddFaculty = () => {
    toast({
      title: "Faculty Added",
      description: "New faculty member has been added successfully",
    });
    setShowAddModal(false);
  };

  const handleEditFaculty = () => {
    toast({
      title: "Faculty Updated",
      description: "Faculty information has been updated",
    });
    setShowEditModal(false);
  };

  const handleRemoveFaculty = (name: string) => {
    if (confirm(`Are you sure you want to remove ${name}?`)) {
      toast({
        title: "Faculty Removed",
        description: `${name} has been removed from the system`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Faculty Management</h1>
          <p className="text-muted-foreground">Manage faculty profiles and workload distribution</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" data-testid="button-export-faculty">
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
          <Button onClick={() => setShowAddModal(true)} data-testid="button-add-faculty">
            <Plus className="h-4 w-4 mr-2" />
            Add Faculty
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Total Faculty</h3>
          <div className="text-3xl font-bold text-primary">{faculty.length}</div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-2">Available</h3>
          <div className="text-3xl font-bold text-success">
            {faculty.filter(f => f.currentLoad < f.maxLoad).length}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-2">Fully Booked</h3>
          <div className="text-3xl font-bold text-warning">
            {faculty.filter(f => f.currentLoad >= f.maxLoad).length}
          </div>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or expertise..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          data-testid="input-search-faculty"
        />
      </div>

      <div className="space-y-4">
        {filteredFaculty.map((member) => (
          <Card key={member.id} className="p-6" data-testid={`card-faculty-${member.id}`}>
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg bg-primary/10 text-primary">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-muted-foreground">{member.designation}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                  <Badge variant={member.currentLoad < member.maxLoad ? "default" : "secondary"}>
                    {member.availability}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {member.expertise.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">Workload</span>
                    <span className="text-muted-foreground">
                      {member.currentLoad} / {member.maxLoad} students
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        member.currentLoad >= member.maxLoad
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                      style={{ width: `${(member.currentLoad / member.maxLoad) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedFaculty(member);
                      setShowEditModal(true);
                    }}
                    data-testid={`button-edit-${member.id}`}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedFaculty(member);
                      setShowWorkloadModal(true);
                    }}
                    data-testid={`button-workload-${member.id}`}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Workload
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedFaculty(member);
                      setShowAvailabilityModal(true);
                    }}
                    data-testid={`button-availability-${member.id}`}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Set Availability
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveFaculty(member.name)}
                    data-testid={`button-remove-${member.id}`}
                  >
                    <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Faculty Member</DialogTitle>
            <DialogDescription>Enter details for the new faculty member</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input className="mt-2" placeholder="Dr. John Doe" data-testid="input-name" />
              </div>
              <div>
                <Label>Designation</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professor">Professor</SelectItem>
                    <SelectItem value="associate">Associate Professor</SelectItem>
                    <SelectItem value="assistant">Assistant Professor</SelectItem>
                    <SelectItem value="lecturer">Lecturer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input type="email" className="mt-2" placeholder="email@nu.edu.pk" data-testid="input-email" />
              </div>
              <div>
                <Label>Department</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="se">Software Engineering</SelectItem>
                    <SelectItem value="ds">Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Research Areas (comma-separated)</Label>
              <Input className="mt-2" placeholder="AI, Machine Learning, Data Science" data-testid="input-expertise" />
            </div>
            <div>
              <Label>Maximum Supervision Load</Label>
              <Input type="number" className="mt-2" placeholder="8" data-testid="input-max-load" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFaculty} data-testid="button-save-faculty">
              Add Faculty
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Faculty Details</DialogTitle>
            <DialogDescription>{selectedFaculty?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input type="email" className="mt-2" defaultValue={selectedFaculty?.email} data-testid="input-edit-email" />
              </div>
              <div>
                <Label>Office</Label>
                <Input className="mt-2" placeholder="Room 405" data-testid="input-office" />
              </div>
            </div>
            <div>
              <Label>Research Areas</Label>
              <Textarea className="mt-2" defaultValue={selectedFaculty?.expertise.join(", ")} data-testid="input-edit-expertise" />
            </div>
            <div>
              <Label>Maximum Supervision Load</Label>
              <Input type="number" className="mt-2" defaultValue={selectedFaculty?.maxLoad} data-testid="input-edit-max-load" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditFaculty} data-testid="button-save-edit">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showWorkloadModal} onOpenChange={setShowWorkloadModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Workload Distribution</DialogTitle>
            <DialogDescription>{selectedFaculty?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Current Load:</span>
                <span>{selectedFaculty?.currentLoad} students</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Maximum Capacity:</span>
                <span>{selectedFaculty?.maxLoad} students</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Availability:</span>
                <Badge>{selectedFaculty?.availability}</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Current Projects:</h4>
              <div className="space-y-2">
                <div className="p-2 border rounded text-sm">AI Student Predictor - John Doe</div>
                <div className="p-2 border rounded text-sm">Blockchain Verification - Jane Smith</div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowWorkloadModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAvailabilityModal} onOpenChange={setShowAvailabilityModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Availability</DialogTitle>
            <DialogDescription>{selectedFaculty?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Availability Status</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="limited">Limited Availability</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea className="mt-2" placeholder="On sabbatical, conference, etc." data-testid="input-availability-notes" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAvailabilityModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast({ title: "Availability Updated" });
              setShowAvailabilityModal(false);
            }}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
