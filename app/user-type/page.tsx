import UserTypeForm from "@/components/shared/UserTypeCard";
import React from "react";
import prisma from "@/utils/db";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Roles } from "@/utils/validations";

async function UserTypePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/");
  }
  const userRoleType = await prisma.user.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      role: true,
    },
  });

  if (userRoleType?.role !== null) {
    redirect("/");
  }
  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <UserTypeForm />
    </div>
  );
}

export default UserTypePage;
