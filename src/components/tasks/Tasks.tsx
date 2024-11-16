"use client";
import kyInstance from "@/lib/ky";
import { TasksPage } from "@/lib/types";
import { urls } from "@/lib/urls";
import { Task } from "@prisma/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

const Tasks = () => {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["tasks"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          urls.API_POSTS,
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<TasksPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (status === "pending") {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (status === "error") {
    return <p>An error occurred while loading tasks.</p>;
  }

  const tasks = data?.pages.flatMap((page) => page.tasks) || [];

  return (
    <div>
      {tasks.map((task) => (
        <>
          <TaskCard key={task.id} task={task} />
        </>
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
