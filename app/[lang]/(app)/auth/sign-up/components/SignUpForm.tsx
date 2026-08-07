"use client";
import { useState, Activity } from "react";
import { type SignUpStep } from "../utils/signUpSteps";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useShareDictionary } from "../../../services/share-dictionary/shareDictionaryContext";
import { useForm, FormProvider } from "react-hook-form";
import { createUserInfoSchema } from "../schemas/userInfoSchema";
import { createOrganizationSchema } from "../schemas/organizationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpOrganizationInfo from "./SignUpOrganizationInfo";
import SignUpAccountInfo from "./SignUpAccountInfo";
import SignUpUserInfo from "./SignUpUserInfo";
import { useRouter } from "next/navigation";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/authApiActions";
import { type SignUpData } from "../utils/signUpData";

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    authDictionary: { signUp: signUpDic },
  } = useShareDictionary();
  const router = useRouter();
  const { locale } = useBaseConfig();
  const userInfoUseForm = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phoneNumber: "",
    },
    resolver: zodResolver(createUserInfoSchema(signUpDic)),
  });
  const organizationUseForm = useForm({
    defaultValues: {
      description: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(createOrganizationSchema(signUpDic)),
  });
  const [signUpData, setSignUpData] = useState<SignUpData>({
    userInfo: null,
    organizationInfo: null,
  });
  const [activeStep, setActiveStep] = useState<SignUpStep>("userInfo");

  function changeSignUpStep(step: SignUpStep) {
    setActiveStep(step);
  }

  function handleSubmitStep(stepName: SignUpStep) {
    if (stepName === "userInfo") {
      userInfoUseForm.handleSubmit(
        (data) => {
          setSignUpData((pre) => ({
            ...pre,
            userInfo: data,
          }));
          changeSignUpStep("organizationInfo");
        },
        () => {
          changeSignUpStep(stepName);
        },
      )();
      return;
    }
    if (stepName === "organizationInfo") {
      organizationUseForm.handleSubmit(
        (data) => {
          setSignUpData((pre) => ({
            ...pre,
            organizationInfo: data,
          }));
          changeSignUpStep("accountInfo");
        },
        () => {
          changeSignUpStep(stepName);
        },
      )();
      return;
    }
  }

  function handleReturnToLogin() {
    router.push(`/${locale}/auth/sign-in`);
  }

  const { mutate: confirmSignUp, isPending: confirmSignUpIsPending } =
    useMutation({
      mutationFn() {
        return signUp({
          user: {
            ...signUpData.userInfo!,
            password: signUpData.organizationInfo!.password,
          },
          organization: {
            ...signUpData.organizationInfo!,
          },
        });
      },
      onSuccess() {
        router.replace(`/${locale}`);
      },
    });

  return (
    <div
      className={cn("flex flex-col grow overflow-hidden gap-6", className)}
      {...props}
    >
      <Card className="overflow-hidden p-0 grow flex flex-col">
        <CardContent className="grid p-0 md:grid-cols-2 grow overflow-hidden">
          <div className="p-6 md:p-8 overflow-auto">
            <div className="flex flex-col items-center gap-2 text-center mb-5">
              <h1 className="text-2xl font-bold">{signUpDic.title}</h1>
              {/*<p className="text-balance text-muted-foreground">
                  Login to your Acme Inc account
                </p>*/}
            </div>
            <FormProvider {...userInfoUseForm}>
              <Activity mode={activeStep === "userInfo" ? "visible" : "hidden"}>
                <SignUpUserInfo
                  onSubmitStep={handleSubmitStep}
                  onReturnToLogin={handleReturnToLogin}
                />
              </Activity>
            </FormProvider>
            <FormProvider {...organizationUseForm}>
              <Activity
                mode={activeStep === "organizationInfo" ? "visible" : "hidden"}
              >
                <SignUpOrganizationInfo
                  onSubmitStep={handleSubmitStep}
                  changeSignUpStep={changeSignUpStep}
                />
              </Activity>
            </FormProvider>
            <Activity
              mode={activeStep === "accountInfo" ? "visible" : "hidden"}
            >
              <SignUpAccountInfo
                signUpData={signUpData}
                confirmSignUp={confirmSignUp}
                confirmSignUpIsPending={confirmSignUpIsPending}
                changeSignUpStep={changeSignUpStep}
              />
            </Activity>
          </div>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/images/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      {/*<FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>*/}
    </div>
  );
}
