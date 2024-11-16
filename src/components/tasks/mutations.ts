import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createTask } from "./actions";

export const useCreateTaskMutation = () => {
  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create a task. Kindly try again");
    },
  });

  return mutation;
};
