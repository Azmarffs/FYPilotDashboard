import { EvaluationForm } from "../EvaluationForm";

export default function EvaluationFormExample() {
  const criteria = [
    {
      id: "technical",
      name: "Technical Implementation",
      description: "Quality of code, architecture, and technical execution",
      maxScore: 25,
    },
    {
      id: "innovation",
      name: "Innovation & Creativity",
      description: "Originality of approach and creative problem-solving",
      maxScore: 20,
    },
    {
      id: "documentation",
      name: "Documentation",
      description: "Quality of technical documentation and user guides",
      maxScore: 15,
    },
    {
      id: "presentation",
      name: "Presentation & Communication",
      description: "Clarity of presentation and ability to explain concepts",
      maxScore: 20,
    },
    {
      id: "impact",
      name: "Impact & Feasibility",
      description: "Practical value and real-world applicability",
      maxScore: 20,
    },
  ];

  return (
    <div className="p-6 max-w-4xl">
      <EvaluationForm
        projectTitle="AI-Powered Student Performance Predictor"
        criteria={criteria}
        onSaveDraft={(data) => console.log("Saving draft:", data)}
        onSubmit={(data) => console.log("Submitting evaluation:", data)}
      />
    </div>
  );
}
