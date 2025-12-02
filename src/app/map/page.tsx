import auth from "@/auth";
import { redirect, RedirectType } from "next/navigation";
import PathMap from "./PathMap";

export default async function Map() {
  const authElement = await auth();

  if(!authElement?.session) return redirect('/login', RedirectType.push);

  return (
    <div>
      <PathMap path={{id:1, name:'test', userId:1}}  cords={[]} />
    </div>
  );
}
