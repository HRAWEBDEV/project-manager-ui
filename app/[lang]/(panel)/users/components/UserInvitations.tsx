"use client";
import { useMyInvitations, useAnswerMyInvitation } from "../hooks/useUsers";
import SomethingWentWrong from "../../components/SomethingWentWrong";
import NoItemFound from "../../components/NoItemFound";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { Button } from "@/components/ui/button";
import LinearLoading from "@/components/LinearLoading";
import { Spinner } from "@/components/ui/spinner";

export default function UserInvitations() {
  const confirmAnswerInvitation = useAnswerMyInvitation();
  const myInvitationsQuery = useMyInvitations();
  const {
    shareDictionary: {
      components: { myInvitations: dic },
    },
  } = useShareDictionary();

  if (myInvitationsQuery.isError)
    return (
      <div>
        <SomethingWentWrong />
      </div>
    );
  if (
    myInvitationsQuery.isSuccess &&
    myInvitationsQuery.data.invitations.length === 0
  ) {
    return (
      <div>
        <NoItemFound />
      </div>
    );
  }
  return (
    <div className="p-4 relative">
      {myInvitationsQuery.isFetching && (
        <div className="absolute top-0 inset-x-0">
          <LinearLoading />
        </div>
      )}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {myInvitationsQuery.data?.invitations.map((invite) => {
          return (
            <div key={invite.id} className="relative">
              <div className="h-auto p-3 w-full text-start justify-items-stretch font-normal gap-3 items-start bg-neutral-100 dark:bg-neutral-900 flex-col border border-border rounded-md">
                <div className="grid gap-2 mb-4">
                  <div>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {dic.username}:{" "}
                    </span>
                    <span className="font-medium text-primary">
                      {invite.username}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {dic.fullName}:{" "}
                    </span>
                    <span className="font-medium">
                      {invite.userFirstName} {invite.userLastName}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {dic.organization}:{" "}
                    </span>
                    <span className="font-medium">
                      {invite.organizationName}
                    </span>
                  </div>
                </div>
                <div className="grid gap-2 grid-cols-2">
                  <Button
                    variant="destructive"
                    disabled={confirmAnswerInvitation.isPending}
                    onClick={() => {
                      confirmAnswerInvitation.mutate({
                        id: invite.id,
                        status: "declined",
                      });
                    }}
                  >
                    {confirmAnswerInvitation.isPending && <Spinner />}
                    {dic.reject}
                  </Button>
                  <Button
                    disabled={confirmAnswerInvitation.isPending}
                    onClick={() => {
                      confirmAnswerInvitation.mutate({
                        id: invite.id,
                        status: "accepted",
                      });
                    }}
                  >
                    {confirmAnswerInvitation.isPending && <Spinner />}
                    {dic.accept}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
