import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

function AuthCard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:max-w-[40%]">
      <Card className={cn("h-full w-full space-y-5 p-5")}>
        <CardHeader className="">
          <div className="text-center tracking-wider">
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight max-md:text-center lg:text-3xl">
              Welcome to Creatorship
            </h1>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}

export default AuthCard;
