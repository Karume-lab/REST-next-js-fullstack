"use client";
import kyInstance from "@/lib/ky";
import { TasksPage } from "@/lib/types";
import { urls } from "@/lib/urls";
import { Task } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import InfiniteScrollContainer from "../core/InfiniteScrollContainer";
import Loader from "../ui/Loader";
import TasksContainerLoadingSkeleton from "./TasksContainerLoadingSkeleton";
import { QUERY_KEYS } from "@/lib/constants";

const TasksContainer = () => {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.tasks],
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
    return <TasksContainerLoadingSkeleton />;
  }

  if (status === "error") {
    return <p>An error occurred while loading tasks.</p>;
  }

  const tasks = data?.pages.flatMap((page) => page.tasks) || [];

  if (status === "success" && !tasks.length && !hasNextPage) {
    return <p>No tasks</p>;
  }

  return (
    <InfiniteScrollContainer
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}

      {isFetchingNextPage && <Loader className="my-4" />}

      {!hasNextPage && <p>You have reached the end</p>}
    </InfiniteScrollContainer>
  );
};

interface TaskProps {
  task: Task;
}
const TaskCard: React.FC<TaskProps> = ({ task }) => <div>{task.title}</div>;

export default TasksContainer;
