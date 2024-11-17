"use client";
import kyInstance from "@/lib/ky";
import { TasksPage } from "@/lib/types";
import { urls } from "@/lib/urls";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { QUERY_KEYS } from "@/lib/constants";
import FilterHeading from "./FilterHeading";
import DataTable from "@/components/core/DataTable";
import { tasksColumns } from "./columns";

const TasksTable = () => {
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
          urls.API_TASKS,
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<TasksPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const tasks = data?.pages.flatMap((page) => page.tasks) || [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col w-full">
        <h2 className="text-2xl font-bold">Tasks Table</h2>
      </div>
      <FilterHeading />
      <DataTable
        data={tasks}
        isLoading={isFetching}
        columns={tasksColumns}
        noun="tasks"
      />
    </div>
  );
};

export default TasksTable;
