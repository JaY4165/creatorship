import React from "react";
import AuthCard from "./AuthCard";
import UserTypeForm from "./UserTypeForm";

type Props = {};

function UserTypeCard({}: Props) {
  return (
    <div className="w-full justify-center flex">
      <AuthCard>
      <UserTypeForm />
    </AuthCard>
    </div>
  );
}

export default UserTypeCard;
