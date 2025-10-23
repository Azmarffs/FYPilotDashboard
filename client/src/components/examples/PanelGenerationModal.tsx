import { PanelGenerationModal } from "../modals/PanelGenerationModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PanelGenerationModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Generate Panels</Button>
      <PanelGenerationModal
        open={open}
        onClose={() => setOpen(false)}
        onGenerate={() => console.log("Panels generated and published")}
      />
    </div>
  );
}
