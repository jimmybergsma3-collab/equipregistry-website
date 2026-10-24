import { getSession } from "@/lib/auth/getSession";

type AssertAdminActionResult =
  | {
      ok: true;
      session: {
        isAuthenticated: true;
        user: {
          id: string;
          email: string;
          role: "user" | "admin";
        };
      };
    }
  | {
      ok: false;
      message: string;
    };

export async function assertAdminAction(): Promise<AssertAdminActionResult> {
  const session = await getSession();

  if (!session.isAuthenticated) {
    return {
      ok: false,
      message: "You must be logged in.",
    };
  }

  if (session.user.role !== "admin") {
    return {
      ok: false,
      message: "You do not have access to this action.",
    };
  }

  return {
    ok: true,
    session,
  };
}