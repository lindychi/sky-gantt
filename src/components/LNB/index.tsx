import React from "react";

interface Project {
  id: string;
  name: string;
}

interface LNBProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onCreateProject: () => void;
}

const LNB: React.FC<LNBProps> = ({
  projects,
  onSelectProject,
  onCreateProject,
}) => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white p-4">
      <h2 className="text-2xl mb-4">Projects</h2>
      <button
        onClick={onCreateProject}
        className="mb-4 bg-blue-500 p-2 rounded"
      >
        Create Project
      </button>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="mb-2">
            <button
              onClick={() => onSelectProject(project.id)}
              className="w-full text-left"
            >
              {project.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LNB;
