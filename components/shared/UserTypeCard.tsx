import React from "react";
import AuthCard from "./AuthCard";
import UserTypeForm from "./UserTypeForm";

function UserTypeCard() {
  return (
    <div className="flex w-full justify-center">
      <AuthCard>
        <UserTypeForm />
      </AuthCard>
    </div>
  );
}

export default UserTypeCard;
