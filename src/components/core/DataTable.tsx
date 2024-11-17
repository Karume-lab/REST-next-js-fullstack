"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Loader from "../ui/Loader";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadingButton from "./LoadingButton";

interface DataTableProps<T_Data, T_Value> {
  data: T_Data[];
  columns: ColumnDef<T_Data, T_Value>[];
  noun: string;
  isLoading?: boolean;
  hasNextPage?: boolean;
  isFetching?: boolean;
}

const DataTable = <T_Data, T_Value>({
  columns,
  data,
  noun,
  isLoading,
  hasNextPage,
  isFetching,
}: DataTableProps<T_Data, T_Value>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const createQueryString = (params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });

    return newSearchParams.toString();
  };

  const handleNextPage = () => {
    const lastItem = data[data.length - 1] as any;
    const cursor = lastItem?.id;
    if (cursor) {
      const queryString = createQueryString({ cursor });
      router.push(`${pathname}?${queryString}`);
    }
  };

  const handlePreviousPage = () => {
    router.push(pathname);
  };

  const showingPreviousButton = searchParams.has("cursor");
  const showingNextButton = hasNextPage;

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No {noun} found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        {showingPreviousButton && (
          <LoadingButton
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            isLoading={isFetching}
            text="Previous"
          />
        )}
        {showingNextButton && (
          <LoadingButton
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            isLoading={isFetching}
            text="Next"
          />
        )}
      </div>
    </div>
  );
};

export default DataTable;
