"use client";
import kyInstance from "@/lib/ky";
import { TasksPage } from "@/lib/types";
import { urls } from "@/lib/urls";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QUERY_KEYS } from "@/lib/constants";
import FilterHeading from "./FilterHeading";
import DataTable from "@/components/core/DataTable";
import { tasksColumns } from "./columns";
import { useSearchParams } from "next/navigation";

const TasksTable = () => {
  const searchParams = useSearchParams();
  const cursor = searchParams.get("cursor");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.tasks, cursor],
    queryFn: () =>
      kyInstance
        .get(urls.API_TASKS, cursor ? { searchParams: { cursor } } : {})
        .json<TasksPage>(),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col w-full">
        <h2 className="text-2xl font-bold">Tasks Table</h2>
      </div>
      <FilterHeading />
      <DataTable
        data={data?.tasks || []}
        isLoading={isLoading}
        isFetching={isFetching}
        hasNextPage={!!data?.nextCursor}
        columns={tasksColumns}
        noun="tasks"
      />
    </div>
  );
};

export default TasksTable;
