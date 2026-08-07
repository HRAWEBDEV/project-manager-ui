import { Button } from "@/components/ui/button";
import { useShareDictionary } from "../../../services/share-dictionary/shareDictionaryContext";
import { type SignUpData } from "../utils/signUpData";
import { Spinner } from "@/components/ui/spinner";
import { SignUpStep } from "../utils/signUpSteps";

export default function SignUpAccountInfo({
  signUpData,
  confirmSignUp,
  confirmSignUpIsPending,
  changeSignUpStep,
}: {
  signUpData: SignUpData;
  confirmSignUp: () => unknown;
  confirmSignUpIsPending: boolean;
  changeSignUpStep: (step: SignUpStep) => unknown;
}) {
  const {
    authDictionary: { signUp: signUpDic },
  } = useShareDictionary();
  return (
    <div>
      {!!signUpData.userInfo && (
        <div className="grid gap-3 text-md border-b border-border mb-3 pb-3">
          <div className="flex justify-between gap-4 items-start">
            <span className="text-neutral-600 dark:text-neutral-400">
              {signUpDic.userInfo.username}
            </span>
            <span className="font-medium">{signUpData.userInfo.username}</span>
          </div>
          <div className="flex justify-between gap-4 items-start">
            <span className="text-neutral-600 dark:text-neutral-400">
              {signUpDic.userInfo.firstName}
            </span>
            <span className="font-medium">{signUpData.userInfo.firstName}</span>
          </div>
          <div className="flex justify-between gap-4 items-start">
            <span className="text-neutral-600 dark:text-neutral-400">
              {signUpDic.userInfo.lastName}
            </span>
            <span className="font-medium">{signUpData.userInfo.lastName}</span>
          </div>
          <div className="flex justify-between gap-4 items-start">
            <span className="text-neutral-600 dark:text-neutral-400">
              {signUpDic.userInfo.email}
            </span>
            <span className="font-medium">{signUpData.userInfo.email}</span>
          </div>
          <div className="flex justify-between gap-4 items-start">
            <span className="text-neutral-600 dark:text-neutral-400">
              {signUpDic.userInfo.phoneNumber}
            </span>
            <span className="font-medium">
              {signUpData.userInfo.phoneNumber || "---"}
            </span>
          </div>
        </div>
      )}
      {!!signUpData.organizationInfo && (
        <div className="grid gap-3 text-md border-b border-border mb-3 pb-3">
          <div className="flex justify-between gap-4 items-start">
            <span className="text-neutral-600 dark:text-neutral-400">
              {signUpDic.organizationInfo.name}
            </span>
            <span className="font-medium">
              {signUpData.organizationInfo.name}
            </span>
          </div>
          <div className="flex gap-1 flex-col">
            <span className="text-neutral-600 dark:text-neutral-400">
              {signUpDic.organizationInfo.description}
            </span>
            <span className="font-medium">
              {signUpData.organizationInfo.description || "---"}
            </span>
          </div>
        </div>
      )}
      <div className="flex gap-4 justify-between mt-4">
        <Button
          variant="outline"
          type="button"
          className="w-32"
          disabled={confirmSignUpIsPending}
          onClick={() => {
            changeSignUpStep("organizationInfo");
          }}
        >
          {confirmSignUpIsPending && <Spinner />}
          {signUpDic.previous}
        </Button>
        <Button
          type="submit"
          className="w-32"
          disabled={confirmSignUpIsPending}
          onClick={(e) => {
            e.preventDefault();
            confirmSignUp();
          }}
        >
          {confirmSignUpIsPending && <Spinner />}
          {signUpDic.confirm}
        </Button>
      </div>
    </div>
  );
}
