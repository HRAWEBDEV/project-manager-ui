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
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type UserInfoSchema,
  type OrganizationInfoSchema,
  createUserInfoSchema,
  createOrganizationInfo,
} from "@/app/[lang]/(auth)/signup/schemas/signupSchemas";

export default function SignupWrapper({ dic }: { dic: AuthDictionary }) {
  const [userInfo, setUserInfo] = useState<UserInfoSchema | null>(null);
  const [organizationInfo, setOrganizationInfo] =
    useState<OrganizationInfoSchema | null>(null);
  const userInfoUseForm = useForm<UserInfoSchema>({
    resolver: zodResolver(createUserInfoSchema({ dic })),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });
  const organizationUseForm = useForm<OrganizationInfoSchema>({
    resolver: zodResolver(createOrganizationInfo({ dic })),
    defaultValues: {
      name: "",
      description: "",
    },
  });

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
        <FormProvider {...userInfoUseForm}>
          {activeStep === "userInfo" && <SignupUserInfo dic={dic} />}
        </FormProvider>
        <FormProvider {...organizationUseForm}>
          {activeStep === "organizationInfo" && (
            <SignupOrganizationInfo dic={dic} />
          )}
        </FormProvider>
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
                  userInfoUseForm.handleSubmit((data) => {
                    setActiveStep("organizationInfo");
                    setUserInfo(data);
                  })();
                  return;
                }
                if (activeStep === "organizationInfo") {
                  organizationUseForm.handleSubmit((data) => {
                    setActiveStep("confirmInfo");
                    setOrganizationInfo(data);
                  })();
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
