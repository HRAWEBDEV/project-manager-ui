import LoginForm from "./components/LoginForm";

export default function SignInPage() {
  return (
    <div className="flex min-h-svh flex-col bg-muted p-6 md:p-10 overflow-hidden">
      <div className="flex flex-col w-full max-w-sm md:max-w-4xl m-auto overflow-hidden">
        <LoginForm />
      </div>
    </div>
  );
}
