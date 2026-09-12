import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import { signupSteps } from "@/app/[lang]/(auth)/signup/utils/signupSteps";

export default function SignupSteps({
  dic,
  activeStep,
  activeSignupStepIndex,
}: {
  dic: AuthDictionary;
  activeStep: (typeof signupSteps)[number];
  activeSignupStepIndex: number;
}) {
  return (
    <div className="flex justify-center py-4">
      {signupSteps.map((step, i) => {
        return (
          <div
            data-completed={activeSignupStepIndex > i}
            data-active={activeSignupStepIndex === i}
            key={step}
            className="flex items-center group"
          >
            {i > 0 && (
              <div className="h-px rounded-md min-w-14 bg-neutral-400 dark:bg-neutral-800"></div>
            )}
            <div className="flex flex-col gap-1 items-center">
              <div className="size-7 rounded-full bg-neutral-200 dark:bg-neutral-800 group-data-[active='true']:bg-primary group-data-[active='true']:text-primary-foreground group-data-[completed='true']:text-primary-foreground group-data-[completed='true']:bg-teal-700 dark:group-data-[completed='true']:bg-teal-700 grid place-content-center text-xs">
                {i + 1}
              </div>
              <span className="text-xs text-neutral-700 dark:text-neutral-400 text-center">
                {dic.signup.steps[step]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
