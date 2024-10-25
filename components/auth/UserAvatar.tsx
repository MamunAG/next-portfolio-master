/* eslint-disable @next/next/no-img-element */
import { auth } from "../../auth";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex justify-center items-center">
      <img
        src={session?.user?.image!}
        alt="User Avatar"
        width={30}
        height={30}
      />
    </div>
  );
}
