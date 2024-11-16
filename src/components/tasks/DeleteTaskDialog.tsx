"use client";

import { Task } from "@prisma/client";
import React, { useState } from "react";
import { useDeleteTaskMutation } from "./mutations";
import LoadingButton from "../core/LoadingButton";
import ActionConfirmationDialog from "../core/ActionConfirmationDialog";
import { Trash2 } from "lucide-react";

interface DeleteTaskDialogProps {
  task: Task;
}

const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({ task }) => {
  const mutation = useDeleteTaskMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOnConfirm = () => {
    mutation.mutate(task.id, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
    });
  };

  return (
    <ActionConfirmationDialog
      verb="delete"
      noun="task"
      isLoading={mutation.isPending}
      loadingVerb="Deleting"
      isOpen={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      onConfirm={handleOnConfirm}
      confirmVerb="deletion"
      triggerElement={
        <LoadingButton
          variant="destructive"
          text="Delete"
          icon={<Trash2 />}
          loadingText="Deleting"
          onClick={() => setIsDialogOpen(true)}
        />
      }
    />
  );
};

export default DeleteTaskDialog;
