import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SignInServerAction } from "@/components/auth/auth-server-action";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function SignIn() {
  const session = await auth();
  if (session) {
    redirect("/admin");
  }
  const session2 = await auth();
  if (session2) {
    redirect("/admin");
  }
  const session3 = await auth();
  if (session3) {
    redirect("/admin");
  }
  const session4 = await auth();
  if (session4) {
    redirect("/admin");
  }
  
  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen">
      <form action={SignInServerAction}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Sign in</CardTitle>
            {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="email@example.com"
                  type="email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  placeholder="Your password"
                  type="password"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button> */}
            <Button className="w-full">Sign in</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
