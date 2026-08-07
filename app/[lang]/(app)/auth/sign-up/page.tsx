import SignUpForm from "./components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh flex-col bg-muted p-2 sm:p-6 md:p-10 overflow-hidden">
      <div className="flex flex-col w-full max-w-sm md:max-w-4xl m-auto overflow-hidden">
        <SignUpForm />
      </div>
    </div>
  );
}
