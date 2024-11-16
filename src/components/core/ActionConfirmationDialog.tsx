import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ActionConfirmationDialogProps {
  verb: string;
  noun: string;
  isOpen: boolean;
  canCancel?: boolean;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
  confirmVerb?: string;
  triggerElement: React.ReactNode;
}

const ActionConfirmationDialog: React.FC<ActionConfirmationDialogProps> = ({
  verb,
  noun,
  isOpen,
  canCancel = false,
  onConfirm,
  onOpenChange,
  triggerElement,
  confirmVerb = "",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger>{triggerElement}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to {verb} this {noun}?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently {verb} this{" "}
            {noun}.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            disabled={canCancel}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm {confirmVerb}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionConfirmationDialog;
