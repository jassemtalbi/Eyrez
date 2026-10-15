import Image from "next/image";
import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/admin";
import LoginForm from "./LoginForm";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  if (await currentAdmin()) redirect("/admin");
  const { next } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center bg-espresso px-4">
      <div className="w-full max-w-sm bg-ivory p-10 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <Image src="/brand/logo.png" alt="Eyrez" width={84} height={84} className="rounded-full ring-1 ring-gold/40" priority />
          <h1 className="mt-6 text-3xl">Admin</h1>
          <p className="mt-1 text-sm text-cocoa">Sign in to manage your store</p>
        </div>
        <LoginForm next={next ?? ""} />
      </div>
    </div>
  );
}
