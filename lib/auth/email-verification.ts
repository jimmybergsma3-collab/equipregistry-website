type VerificationAwareUser = {
  role: "user" | "admin";
  emailVerifiedAt: Date | null;
};

// Launch behavior: keep account creation and login non-blocking for customer users
// even when verification delivery fails. The verification flow and database field stay intact.
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
