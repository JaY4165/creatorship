import AuthCard from "@/components/shared/AuthCard";
import SignUpForm from "@/components/signUpPage/SignUpForm";
import React from "react";

export default function SignUp() {
  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <AuthCard>
        <SignUpForm />
      </AuthCard>
    </div>
  );
}
