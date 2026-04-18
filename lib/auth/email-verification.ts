type VerificationAwareUser = {
  role: "user" | "admin";
  emailVerifiedAt: Date | null;
};

// Customer access requires verified email addresses.
// Admin access remains allowed through the permanent admin exception below.
export const TEMPORARY_ALLOW_UNVERIFIED_LOGIN = false;

export function canUseAuthenticatedApp(user: VerificationAwareUser) {
  if (user.role === "admin") {
    return true;
  }

  if (TEMPORARY_ALLOW_UNVERIFIED_LOGIN) {
    return true;
  }

  return Boolean(user.emailVerifiedAt);
}
