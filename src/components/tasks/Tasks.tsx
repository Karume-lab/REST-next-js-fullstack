"use client";
import kyInstance from "@/lib/ky";
import { urls } from "@/lib/urls";
import { Task } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

const Tasks = () => {
  const query = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: kyInstance.get(urls.API_POSTS).json<Task[]>,
  });

  if (query.status === "pending") {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (query.status === "error") {
    return <p>An error occurred while loading posts.</p>;
  }
  return (
    <div>
      {query.data.map((data) => (
        <TaskCard key={data.id} task={data} />
      ))}
    </div>
  );
};

interface TaskProps {
  task: Task;
}
const TaskCard: React.FC<TaskProps> = ({ task }) => {
  return <div>{task.title}</div>;
};

export default Tasks;
