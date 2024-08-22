import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useProject } from "../context/ProjectsContext";

function TaskFormPage() {
    const { register, handleSubmit, setValue } = useForm();
    const { createTask, getTask, updateTask } = useTasks();
    const { getProjectsForCombobox } = useProject();
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(""); 

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function loadProjects() {
            try {
                const projectsData = await getProjectsForCombobox();
                setProjects(projectsData); 
            } catch (error) {
                console.error("Error loading projects:", error);
            }
        }

        async function loadTask() {
            if (id) {
                try {
                    const task = await getTask(id);
                    if (task) {
                        setValue('title', task.title);
                        setValue('description', task.description);
                        setSelectedProject(task.project || ""); 
                    }
                } catch (error) {
                    console.error("Error loading task:", error);
                }
            } else {
                setSelectedProject(""); 
            }
        }

        loadProjects();
        if (id) {
            loadTask();
        }
    }, [id, setValue, getProjectsForCombobox]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (id) {
                await updateTask(id, { ...data, project: selectedProject });
            } else {
                await createTask({ ...data, project: selectedProject });
            }
            navigate("/tasks");
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Title"
                    {...register("title")}
                    autoFocus
                />
                <textarea
                    rows="3"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Description"
                    {...register("description")}
                ></textarea>
                
                <select
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    value={selectedProject} 
                    onChange={(e) => setSelectedProject(e.target.value)} 
                >
                    <option value="">Sin asignar</option>
                    {projects.map((project) => (
                        <option key={project._id} value={project._id}>
                            {project.name}
                        </option>
                    ))}
                </select>
                
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Save</button>
            </form>
        </div>
    );
}

export default TaskFormPage;
