"use client";

import { Task } from "@prisma/client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDeleteTaskMutation } from "./mutations";
import LoadingButton from "../core/LoadingButton";
import ActionConfirmationDialog from "../core/ActionConfirmationDialog";
import { QUERY_KEYS } from "@/lib/constants";

interface DeleteTaskDialogProps {
  task: Task;
}

const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({ task }) => {
  const queryClient = useQueryClient();
  const mutation = useDeleteTaskMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleOnConfirm = () => {
    mutation.mutate(task.id, {
      onSuccess: () => {
        handleCloseDialog();
      },
    });
  };

  return (
    <>
      <ActionConfirmationDialog
        verb="delete"
        noun="task"
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleOnConfirm}
        // confirmVerb="Deletion"
        triggerElement={
          <LoadingButton
            variant="destructive"
            disabled={mutation.isPending}
            text="Delete"
            loadingText="Deleting"
            onClick={handleOpenDialog}
          />
        }
      />
    </>
  );
};

export default DeleteTaskDialog;
