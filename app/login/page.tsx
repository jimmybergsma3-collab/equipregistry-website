import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const sp = await searchParams;

  return (
    <div className="p-10">
      <LoginForm error={sp.error} next={sp.next} />
    </div>
  );
}
