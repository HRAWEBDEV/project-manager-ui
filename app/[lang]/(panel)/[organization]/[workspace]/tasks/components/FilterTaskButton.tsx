import { TbFilter2Search } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { type TasksDictionary } from "@/internalization/app/dictionaries/panel/tasks/dictionary";

export default function FilterTaskButton({ dic }: { dic: TasksDictionary }) {
  return (
    <Button variant="outline">
      <TbFilter2Search className="size-4" />
      {dic.filters.filters}
    </Button>
  );
}
