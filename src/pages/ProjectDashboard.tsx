import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { KanbanBoard } from "@/components/dashboard/KanbanBoard";
import { ProjectOptions } from "@/components/dashboard/ProjectOptions";
import { ProjectDetails } from "@/components/project/ProjectDetails";
import { ProjectChat } from "@/components/project/ProjectChat";
import { ProjectFilesView } from "@/components/project/ProjectFilesView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectDashboardView } from "@/components/project/ProjectDashboardView";

const ProjectDashboard = () => {
  const [isProjectOptionsOpen, setIsProjectOptionsOpen] = useState(false);
  const { projectId } = useParams();

  const projectTypes = [
    { name: "Automation", duration: "1 week" },
    { name: "Design", duration: "48 hours" },
    { name: "Landing Page", duration: "48 hours" },
    { name: "Micro-Saas", duration: "3 weeks" },
    { name: "Blog", duration: "48 hours" },
    { name: "Other", duration: "" },
  ];

  // If we have a projectId, show the project detail view
  if (projectId) {
    return (
      <div className="p-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <ProjectDashboardView projectId={projectId} />
          </TabsContent>
          <TabsContent value="chat">
            <ProjectChat projectId={projectId} />
          </TabsContent>
          <TabsContent value="files">
            <ProjectFilesView />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Otherwise, show the projects list view
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Button 
          onClick={() => setIsProjectOptionsOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Project
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <KanbanBoard />
      </div>

      {/* Project Options Dialog */}
      <ProjectOptions 
        projectTypes={projectTypes}
        open={isProjectOptionsOpen}
        onOpenChange={setIsProjectOptionsOpen}
        onSelectProject={() => {
          setIsProjectOptionsOpen(false);
        }}
      />
    </div>
  );
};

export default ProjectDashboard;
