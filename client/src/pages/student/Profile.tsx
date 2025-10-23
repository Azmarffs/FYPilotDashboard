import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Upload, Save, X } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "John Doe",
    studentId: "22I-2646",
    email: "john.doe@nu.edu.pk",
    phone: "+92 300 1234567",
    department: "Computer Science",
    semester: "8th",
    cgpa: "3.75",
    bio: "Passionate about AI and Machine Learning. Looking to work on innovative FYP projects.",
  });

  const [skills, setSkills] = useState(["React", "Python", "Machine Learning", "TensorFlow", "Node.js"]);
  const [interests, setInterests] = useState(["Artificial Intelligence", "Data Science", "Web Development"]);
  const [newSkill, setNewSkill] = useState("");

  const availableInterests = [
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Cybersecurity",
    "Cloud Computing",
    "Blockchain",
    "IoT",
    "Computer Vision",
    "Natural Language Processing",
    "DevOps",
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Profile & Settings</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} data-testid="button-edit-profile">
            <User className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)} data-testid="button-cancel">
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
              <p className="text-muted-foreground">{profile.studentId}</p>
              <Badge className="mt-2">{profile.department}</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
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
                <Label>Student ID</Label>
                <Input
                  value={profile.studentId}
                  disabled
                  className="mt-2"
                  data-testid="input-student-id"
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
                <Label>Semester</Label>
                <Input
                  value={profile.semester}
                  disabled
                  className="mt-2"
                  data-testid="input-semester"
                />
              </div>
              <div>
                <Label>CGPA</Label>
                <Input
                  value={profile.cgpa}
                  disabled
                  className="mt-2"
                  data-testid="input-cgpa"
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
          <h3 className="text-xl font-semibold">Skills</h3>
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                className="w-48"
                data-testid="input-add-skill"
              />
              <Button size="sm" onClick={handleAddSkill} data-testid="button-add-skill">
                Add
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
              {skill}
              {isEditing && (
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 hover:text-destructive"
                  data-testid={`button-remove-skill-${skill}`}
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
          <h3 className="text-xl font-semibold">Research Interests</h3>
          <Button variant="outline" size="sm" onClick={() => setShowInterestsModal(true)} data-testid="button-update-interests">
            Update Interests
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <Badge key={interest} className="text-sm py-1 px-3">
              {interest}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Security</h3>
        <Button variant="outline" onClick={() => setShowPasswordModal(true)} data-testid="button-change-password">
          Change Password
        </Button>
      </Card>

      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>Enter your current password and choose a new one</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Current Password</Label>
              <Input type="password" className="mt-2" data-testid="input-current-password" />
            </div>
            <div>
              <Label>New Password</Label>
              <Input type="password" className="mt-2" data-testid="input-new-password" />
            </div>
            <div>
              <Label>Confirm New Password</Label>
              <Input type="password" className="mt-2" data-testid="input-confirm-password" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({ title: "Password Updated", description: "Your password has been changed successfully" });
                setShowPasswordModal(false);
              }}
              data-testid="button-save-password"
            >
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showInterestsModal} onOpenChange={setShowInterestsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Research Interests</DialogTitle>
            <DialogDescription>Select your areas of interest for better supervisor matching</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {availableInterests.map((interest) => (
              <div
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  interests.includes(interest)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:bg-accent"
                }`}
                data-testid={`interest-${interest}`}
              >
                {interest}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInterestsModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({ title: "Interests Updated" });
                setShowInterestsModal(false);
              }}
              data-testid="button-save-interests"
            >
              Save Interests
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
