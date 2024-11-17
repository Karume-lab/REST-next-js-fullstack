"use client";
import { Task } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TaskActionsDropdown from "@/components/tasks/TaskActionsDropdown";
import TasksTableActionsDropdown from "./TasksTableActionsDropdown";

export const tasksColumns: ColumnDef<Task>[] = [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Actions",
    cell: ({ row }) => <TasksTableActionsDropdown taskId={row.original.id} />,
  },
];
