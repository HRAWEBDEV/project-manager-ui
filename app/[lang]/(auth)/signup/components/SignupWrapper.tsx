"use client";
import { useState } from "react";
import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import SignupSteps from "./SignupSteps";
import { signupSteps } from "@/app/[lang]/(auth)/signup/utils/signupSteps";
import SignupUserInfo from "./SignupUserInfo";
import SignupOrganizationInfo from "./SignupOrganizationInfo";
import SignupConfirm from "./SignupConfirm";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export default function SignupWrapper({ dic }: { dic: AuthDictionary }) {
  const [activeStep, setActiveStep] =
    useState<(typeof signupSteps)[number]>("userInfo");
  const activeSignupStepIndex = signupSteps.findIndex(
    (item) => item === activeStep,
  );
  const isLastStep = activeSignupStepIndex === 2;
  const isFirstStep = activeSignupStepIndex === 0;
  return (
    <div className="md:min-h-112.5 flex flex-col">
      <SignupSteps
        dic={dic}
        activeStep={activeStep}
        activeSignupStepIndex={activeSignupStepIndex}
      />
      <FieldGroup className="gap-3 p-4 pt-2 grow">
        {activeStep === "userInfo" && <SignupUserInfo dic={dic} />}
        {activeStep === "organizationInfo" && (
          <SignupOrganizationInfo dic={dic} />
        )}
        {activeStep === "confirmInfo" && <SignupConfirm dic={dic} />}
        <div className="flex justify-between gap-4 mt-auto">
          <div>
            {!isFirstStep && (
              <Button
                className="w-28"
                variant="outline"
                onClick={() => {
                  if (activeStep === "organizationInfo") {
                    setActiveStep("userInfo");
                    return;
                  }
                  if (activeStep === "confirmInfo") {
                    setActiveStep("organizationInfo");
                    return;
                  }
                }}
              >
                {dic.signup.steps.prev}
              </Button>
            )}
          </div>
          <div>
            <Button
              className="w-28"
              onClick={() => {
                if (activeStep === "userInfo") {
                  setActiveStep("organizationInfo");
                  return;
                }
                if (activeStep === "organizationInfo") {
                  setActiveStep("confirmInfo");
                  return;
                }
                if (activeStep === "confirmInfo") {
                }
              }}
            >
              {dic.signup.steps.confirm}
            </Button>
          </div>
        </div>
      </FieldGroup>
    </div>
  );
}
