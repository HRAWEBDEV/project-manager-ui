"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { type TasksDictionary } from "@/internalization/app/dictionaries/panel/tasks/dictionary";
import { type TaskInfo } from "../../services/tasksApiActions";
import { Button } from "@/components/ui/button";

export default function EditTaskDialog({
  open,
  dic,
  taskInfo,
  onOpenChange,
}: {
  open: boolean;
  dic: TasksDictionary;
  taskInfo: TaskInfo | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-h-[80svh] overflow-hidden flex flex-col">
        <DialogHeader className="p-4 border-b border-border">
          <DialogTitle>
            {taskInfo ? dic.editTask.editTask : dic.editTask.addTask}
          </DialogTitle>
          <DialogDescription className="hidden">
            {taskInfo ? dic.editTask.editTask : dic.editTask.addTask}
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 overflow-auto"></div>
        <DialogFooter className="p-4 py-2 border-t border-border">
          <Button
            type="button"
            variant="outline"
            className="sm:w-32"
            onClick={() => onOpenChange(false)}
          >
            {dic.editTask.close}
          </Button>
          <Button type="submit" className="sm:w-32">
            {dic.editTask.saveChanges}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
