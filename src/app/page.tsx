import Image from "next/image";
import LogoutButton from "./LogoutButton";
import auth from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const isAuth = await auth();
  if(!isAuth) redirect('/login');

  return (
    <div>
      <LogoutButton />
    </div>
  );
}
