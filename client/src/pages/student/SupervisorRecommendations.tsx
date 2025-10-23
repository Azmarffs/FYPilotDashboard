import { SupervisorRecommendationCard } from "@/components/SupervisorRecommendationCard";
import { SupervisorProfileModal } from "@/components/modals/SupervisorProfileModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SupervisorRecommendations() {
  const { toast } = useToast();
  const [selectedSupervisor, setSelectedSupervisor] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("match");

  const supervisors = [
    {
      name: "Dr. Sarah Ahmed",
      department: "Computer Science",
      expertise: ["Machine Learning", "AI", "Data Science", "Neural Networks", "Deep Learning"],
      matchScore: 95,
      successRate: 92,
      projectsSupervised: 24,
      publications: 45,
      researchAreas: ["Computer Vision", "NLP", "Reinforcement Learning"],
      pastProjects: [
        "Real-time Object Detection using YOLO",
        "Sentiment Analysis for Urdu Language",
        "Predictive Analytics for Healthcare",
      ],
    },
    {
      name: "Dr. Muhammad Khan",
      department: "Software Engineering",
      expertise: ["Web Development", "Cloud Computing", "DevOps", "Microservices"],
      matchScore: 88,
      successRate: 87,
      projectsSupervised: 18,
      publications: 32,
      researchAreas: ["Distributed Systems", "Cloud Architecture", "Container Orchestration"],
      pastProjects: [
        "Scalable E-commerce Platform",
        "CI/CD Pipeline Automation",
        "Serverless Application Framework",
      ],
    },
    {
      name: "Dr. Fatima Tariq",
      department: "Data Science",
      expertise: ["Big Data", "Data Mining", "Statistical Analysis", "Python"],
      matchScore: 85,
      successRate: 90,
      projectsSupervised: 21,
      publications: 38,
      researchAreas: ["Big Data Analytics", "Data Visualization", "Business Intelligence"],
      pastProjects: [
        "Sales Forecasting with Time Series",
        "Customer Segmentation Analysis",
        "Real-time Data Pipeline",
      ],
    },
    {
      name: "Dr. Ali Hassan",
      department: "Cybersecurity",
      expertise: ["Network Security", "Cryptography", "Ethical Hacking", "Blockchain"],
      matchScore: 82,
      successRate: 89,
      projectsSupervised: 16,
      publications: 28,
      researchAreas: ["Security Protocols", "Blockchain Security", "Penetration Testing"],
      pastProjects: [
        "Blockchain-based Voting System",
        "Intrusion Detection System",
        "Secure Communication Protocol",
      ],
    },
  ];

  const filteredSupervisors = supervisors
    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  s.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === "match") return b.matchScore - a.matchScore;
      if (sortBy === "success") return b.successRate - a.successRate;
      return 0;
    });

  const handleSendRequest = (name: string) => {
    toast({
      title: "Request Sent",
      description: `Your supervision request has been sent to ${name}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Supervisor Recommendations</h1>
        <p className="text-muted-foreground">AI-powered matching based on your project requirements</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or expertise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-supervisors"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48" data-testid="select-sort">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match">Match Score</SelectItem>
            <SelectItem value="success">Success Rate</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" data-testid="button-filters">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
        <Button variant="outline" data-testid="button-refresh">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {filteredSupervisors.map((supervisor) => (
          <SupervisorRecommendationCard
            key={supervisor.name}
            {...supervisor}
            onSendRequest={() => handleSendRequest(supervisor.name)}
            onViewProfile={() => setSelectedSupervisor(supervisor)}
          />
        ))}
      </div>

      {selectedSupervisor && (
        <SupervisorProfileModal
          open={!!selectedSupervisor}
          onClose={() => setSelectedSupervisor(null)}
          supervisor={selectedSupervisor}
        />
      )}
    </div>
  );
}
