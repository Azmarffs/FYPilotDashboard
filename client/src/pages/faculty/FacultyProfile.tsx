import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Save, Upload, X, Plus } from "lucide-react";
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

export default function FacultyProfile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showPublicationModal, setShowPublicationModal] = useState(false);
  const [showResearchModal, setShowResearchModal] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Ahmed",
    employeeId: "F-2018-123",
    email: "sarah.ahmed@nu.edu.pk",
    phone: "+92 300 9876543",
    department: "Computer Science",
    designation: "Associate Professor",
    office: "Room 405, CS Building",
    bio: "Specializing in Artificial Intelligence, Machine Learning, and Data Science with over 10 years of research experience.",
  });

  const [researchAreas, setResearchAreas] = useState([
    "Artificial Intelligence",
    "Machine Learning", 
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing"
  ]);

  const [publications, setPublications] = useState([
    {
      id: "1",
      title: "Deep Learning Approaches for Medical Image Analysis",
      journal: "IEEE Transactions on Medical Imaging",
      year: "2024",
    },
    {
      id: "2",
      title: "Attention Mechanisms in Neural Machine Translation",
      journal: "Journal of Artificial Intelligence Research",
      year: "2023",
    },
  ]);

  const [supervisionLimit, setSupervisionLimit] = useState("6");
  const [newResearchArea, setNewResearchArea] = useState("");

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handleAddResearchArea = () => {
    if (newResearchArea && !researchAreas.includes(newResearchArea)) {
      setResearchAreas([...researchAreas, newResearchArea]);
      setNewResearchArea("");
    }
  };

  const handleRemoveResearchArea = (area: string) => {
    setResearchAreas(researchAreas.filter(a => a !== area));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Profile & Expertise</h1>
          <p className="text-muted-foreground">Manage your professional profile and research interests</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} data-testid="button-edit">
            <User className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} data-testid="button-save">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                {profile.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button variant="outline" size="sm" data-testid="button-upload-photo">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            )}
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.designation}</p>
              <Badge className="mt-2">{profile.department}</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold mb-6">Professional Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  disabled={!isEditing}
                  className="mt-2"
                  data-testid="input-name"
                />
              </div>
              <div>
                <Label>Employee ID</Label>
                <Input
                  value={profile.employeeId}
                  disabled
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  disabled={!isEditing}
                  className="mt-2"
                  data-testid="input-email"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  disabled={!isEditing}
                  className="mt-2"
                  data-testid="input-phone"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Designation</Label>
                <Input
                  value={profile.designation}
                  disabled
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Office</Label>
                <Input
                  value={profile.office}
                  onChange={(e) => setProfile({...profile, office: e.target.value})}
                  disabled={!isEditing}
                  className="mt-2"
                  data-testid="input-office"
                />
              </div>
            </div>

            <div>
              <Label>Bio</Label>
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                disabled={!isEditing}
                className="mt-2 min-h-24"
                data-testid="input-bio"
              />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Research Areas</h3>
          <Button variant="outline" size="sm" onClick={() => setShowResearchModal(true)} data-testid="button-update-research">
            Update Research Areas
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {researchAreas.map((area) => (
            <Badge key={area} className="text-sm py-1 px-3">
              {area}
              {isEditing && (
                <button
                  onClick={() => handleRemoveResearchArea(area)}
                  className="ml-2 hover:text-destructive-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Publications</h3>
          <Button variant="outline" size="sm" onClick={() => setShowPublicationModal(true)} data-testid="button-add-publication">
            <Plus className="h-4 w-4 mr-2" />
            Add Publication
          </Button>
        </div>
        <div className="space-y-3">
          {publications.map((pub) => (
            <div key={pub.id} className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-1">{pub.title}</h4>
              <p className="text-sm text-muted-foreground">{pub.journal} ({pub.year})</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Supervision Preferences</h3>
        <div className="max-w-md">
          <Label>Maximum Students to Supervise</Label>
          <Input
            type="number"
            value={supervisionLimit}
            onChange={(e) => setSupervisionLimit(e.target.value)}
            disabled={!isEditing}
            className="mt-2"
            data-testid="input-supervision-limit"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Set the maximum number of FYP students you can supervise simultaneously
          </p>
        </div>
      </Card>

      <Dialog open={showPublicationModal} onOpenChange={setShowPublicationModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Publication</DialogTitle>
            <DialogDescription>Enter publication details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input className="mt-2" placeholder="Publication title" data-testid="input-pub-title" />
            </div>
            <div>
              <Label>Journal/Conference</Label>
              <Input className="mt-2" placeholder="Name of journal or conference" data-testid="input-pub-journal" />
            </div>
            <div>
              <Label>Year</Label>
              <Input type="number" className="mt-2" placeholder="2024" data-testid="input-pub-year" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPublicationModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast({ title: "Publication Added" });
              setShowPublicationModal(false);
            }}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showResearchModal} onOpenChange={setShowResearchModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Research Areas</DialogTitle>
            <DialogDescription>Add or remove your research interests</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter research area..."
                value={newResearchArea}
                onChange={(e) => setNewResearchArea(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddResearchArea()}
                data-testid="input-new-research"
              />
              <Button onClick={handleAddResearchArea} data-testid="button-add-research">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {researchAreas.map((area) => (
                <Badge key={area} variant="secondary" className="text-sm py-1 px-3">
                  {area}
                  <button
                    onClick={() => handleRemoveResearchArea(area)}
                    className="ml-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => {
              toast({ title: "Research Areas Updated" });
              setShowResearchModal(false);
            }}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
