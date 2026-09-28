import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { type TasksDictionary } from "@/internalization/app/dictionaries/panel/tasks/dictionary";

export default function NewTaskButton({ dic }: { dic: TasksDictionary }) {
  return (
    <Button>
      <FaPlus className="size-3" />
      {dic.filters.newTask}
    </Button>
  );
}
