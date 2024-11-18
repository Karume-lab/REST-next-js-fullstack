"use client";
import kyInstance from "@/lib/ky";
import { TasksPage } from "@/lib/types";
import { urls } from "@/lib/urls";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { PAGE_SIZE, QUERY_KEYS } from "@/lib/constants";
import FilterHeading from "./FilterHeading";
import { DataTable } from "@/components/core/DataTable";
import { tasksColumns } from "./columns";
import { TasksTableProvider } from "@/providers/TasksTableProvider";
import { SortingState, ColumnFiltersState } from "@tanstack/react-table";
import { DataTableProvider } from "@/providers/DataTableProvider";

type Task = { id: string; title: string; userId: string };

const TasksTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

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
  const totalItems = tasks.length + (hasNextPage ? PAGE_SIZE : 0);
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const handlePageChange = async (newPage: number) => {
    const pagesNeeded =
      Math.ceil((newPage * PAGE_SIZE) / PAGE_SIZE) - data?.pages.length!;

    if (pagesNeeded > 0 && hasNextPage) {
      for (let i = 0; i < pagesNeeded && hasNextPage; i++) {
        await fetchNextPage();
      }
    }

    setCurrentPage(newPage);
  };

  const getCurrentPageData = () => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return tasks.slice(start, end);
  };

  type SearchableColumn<T> = {
    key: keyof T;
    label: string;
  };

  const searchableColumns: SearchableColumn<Task>[] = [
    { key: "title", label: "Title" },
    { key: "userId", label: "User ID" },
    { key: "id", label: "ID" },
  ];

  const filterComponent = (
    <div className="flex flex-wrap gap-2">
      {/* Additional custom filters can go here */}
      <FilterHeading />
    </div>
  );

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error loading tasks</div>;
  }

  return (
    <DataTableProvider searchableColumns={searchableColumns}>
      <DataTable
        data={getCurrentPageData()}
        columns={tasksColumns}
        noun="tasks"
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        isLoadingMore={isFetchingNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        filterComponent={filterComponent}
      />
    </DataTableProvider>
  );
};

export default TasksTable;
