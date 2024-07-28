import MultiStepCreatorForm from "@/components/creators/MultiStepCreatorForm";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import { UserType } from "@prisma/client";

async function CreatorForm() {
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

  if (userRoleType?.role !== UserType.CREATOR) {
    redirect("/");
  }
  return (
    <div className="my-20 mb-20 h-screen w-full overflow-x-hidden px-36 pb-20 max-md:px-2">
      <MultiStepCreatorForm />
    </div>
  );
}

export default CreatorForm;
