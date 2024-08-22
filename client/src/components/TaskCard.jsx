import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import { useEffect, useState } from "react";
import { useProject } from "../context/ProjectsContext";

function TaskCard({ task }) {
    const { deleteTask } = useTasks();
    const { getONEProject } = useProject();
    const [projectName, setProjectName] = useState("Sin asignar");

    useEffect(() => {
        const loadProjectName = async () => {
            if (task.project) {
                try {
                    const projectData = await getONEProject(task.project); // Llama a getONEProject con el ID del proyecto
                    if (projectData?.name) {
                        setProjectName(projectData.name); // Establece el nombre del proyecto
                    }
                } catch (error) {
                    console.error("Error loading project:", error);
                }
            }
        };

        loadProjectName();
    }, [task.project, getONEProject]);

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{task.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <button 
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                        onClick={() => deleteTask(task._id)}
                    >
                        Delete
                    </button>
                    <Link 
                        className="bg-blue-500 text-white px-2 py-1 rounded-md"
                        to={`/tasks/${task._id}`}
                    >
                        Edit
                    </Link>
                </div>
            </header>
            <p className="text-slate-300">{task.description}</p>
            <p className="text-slate-300">Proyecto: {projectName}</p>
        </div>
    );
}

export default TaskCard;
