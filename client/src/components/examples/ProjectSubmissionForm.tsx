import { ProjectSubmissionForm } from "../ProjectSubmissionForm";

export default function ProjectSubmissionFormExample() {
  return (
    <div className="p-6 max-w-4xl">
      <ProjectSubmissionForm
        onCheckDuplicates={(title, description) => console.log("Checking duplicates for:", title)}
        onSubmit={(data) => console.log("Submitting project:", data)}
        onSaveDraft={(data) => console.log("Saving draft:", data)}
      />
    </div>
  );
}
