"use client";
import { urls } from "@/lib/urls";
import { Task } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

const Tasks = () => {
  const query = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch(urls.API_POSTS);

      if (!res.ok) {
        throw Error(`Request faied with status code ${res.status}`);
      }

      return res.json();
    },
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
