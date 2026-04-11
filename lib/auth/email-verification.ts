type VerificationAwareUser = {
  role: "user" | "admin";
  emailVerifiedAt: Date | null;
};

// Temporary development bypass while SMTP delivery is unavailable.
// Keep the verification flow and database field intact so this can be removed cleanly later.
export const TEMPORARY_ALLOW_UNVERIFIED_LOGIN = true;

export function canUseAuthenticatedApp(user: VerificationAwareUser) {
  if (user.role === "admin") {
    return true;
  }

  if (TEMPORARY_ALLOW_UNVERIFIED_LOGIN) {
    return true;
  }

  return Boolean(user.emailVerifiedAt);
}

export function isUsingVerificationBypass(user: VerificationAwareUser) {
  return (
    TEMPORARY_ALLOW_UNVERIFIED_LOGIN &&
    user.role !== "admin" &&
    !user.emailVerifiedAt
  );
}
