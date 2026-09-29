import { axios } from "@/app/utils/defaultAxios";

interface Task {
  id: string;
  title: string;
  description: string | null;
  startAt: string | null;
  endAt: string | null;
  completedAt: string | null;
  parentTaskId: string | null;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  projectName: string;
  workspaceId: string;
  workspaceName: string;
  boardId: string | null;
  boardName: string | null;
  boardColor: string | null;
}

interface Assignee {
  id: string;
  taskId: string;
  organizationMemberId: string;
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  completedAt: string | null;
}

type TaskInfo = Task & {
  assignees: Assignee[];
};

const tasksBaseApi = "/tasks";

function getTasks({ signal }: { signal: AbortSignal }) {
  const searchParams = new URLSearchParams();
  return axios.get<{ tasks: TaskInfo[] }>(
    `${tasksBaseApi}?${searchParams.toString()}`,
    {
      signal,
    },
  );
}

export type { Task, Assignee, TaskInfo };
export { tasksBaseApi, getTasks };
