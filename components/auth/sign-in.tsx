import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SignInServerAction } from "@/components/auth/auth-server-action";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";

export async function SignIn({ redirectUrl }: { redirectUrl: string }) {
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

// <div className="w-full flex justify-center items-center mt-44">
//         <form
//           className="w-6/12"
//           action={SignInServerAction}
//         >
//           <Label>
//             Email
//             <Input name="email" type="email" />
//           </Label>
//           <Label>
//             Password
//             <Input name="password" type="password" />
//           </Label>
//           <Button className="mt-7">Sign In</Button>
//         </form>
//       </div>
