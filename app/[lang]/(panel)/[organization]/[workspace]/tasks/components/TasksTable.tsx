import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type TasksDictionary } from "@/internalization/app/dictionaries/panel/tasks/dictionary";

export default function TasksTable({ dic }: { dic: TasksDictionary }) {
  return (
    <div className="p-4 pt-0 grow flex flex-col">
      <Table>
        <TableCaption>{dic.tasks.tableDescription}.</TableCaption>
        <TableHeader>
          <TableRow className="text-neutral-200">
            <TableHead className="text-start text-neutral-600 dark:text-neutral-400 font-normal min-w-[14rem] h-8">
              {dic.tasks.title}
            </TableHead>
            <TableHead className="text-start text-neutral-600 dark:text-neutral-400 font-normal min-w-[20rem] h-8">
              {dic.tasks.description}
            </TableHead>
            <TableHead className="text-start text-neutral-600 dark:text-neutral-400 font-normal min-w-[10rem] w-[12rem] h-8">
              {dic.tasks.assignees}
            </TableHead>
            <TableHead className="text-start text-neutral-600 dark:text-neutral-400 font-normal min-w-[10rem] w-[12rem] h-8">
              {dic.tasks.project}
            </TableHead>
            <TableHead className="text-start text-neutral-600 dark:text-neutral-400 font-normal min-w-[10rem] w-[12rem] h-8">
              {dic.tasks.priority}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </div>
  );
}
