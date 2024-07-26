import LogInForm from "@/components/logInPage/LogInForm";
import AuthCard from "@/components/shared/AuthCard";
import React from "react";
function Login() {
  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <AuthCard>
        <LogInForm />
      </AuthCard>
    </div>
  );
}

export default Login;
