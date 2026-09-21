import { useOrganizationMembers } from "./useOrganizations";

export function useCheckUserIsAMember(userId: string) {
  const memberQuery = useOrganizationMembers();
  if (!userId) return "notMember";
  if (memberQuery.isError || memberQuery.isFetching) return "pending";
  const isMember = memberQuery.data?.members.find(
    (member) => member.userId === userId,
  );
  if (isMember) return "member";
  return "notMember";
}
