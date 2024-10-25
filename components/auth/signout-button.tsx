// import { signOut } from "@/auth";
import { Button } from "../ui/button";
import { SignOutServerAction } from "./auth-server-action";

export function SignOut() {
  return (
    <form action={SignOutServerAction}>
      <Button type="submit" variant={"link"}>
        Sign Out
      </Button>
    </form>
  );
}
