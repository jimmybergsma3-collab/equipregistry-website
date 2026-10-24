import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/getSession";

// Legacy writer accepted caller-selected identifiers and bypassed reservation.
// Creation now belongs exclusively to the authenticated registration workflow.
export async function POST() {
  const session = await getSession();
  if (!session.isAuthenticated) {
    return NextResponse.json({ error: "NOT_LOGGED_IN" }, { status: 401 });
  }
  if (!Number.isFinite(Number(session.user.id))) {
    return NextResponse.json({ error: "INVALID_SESSION" }, { status: 401 });
  }
  return NextResponse.json({ error: "USE_REGISTRATION_WORKFLOW" }, { status: 410 });
}
