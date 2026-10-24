// Operational review thresholds only. No scheduler, legal retention claim or purge.
export const governanceRetentionPolicy = Object.freeze({
  version: "4C-3-2026-10-09",
  mandateProposalDays: 7,
  completedSourceFileDays: 7,
  incompleteStagingDays: 30,
  sanitizedRowResultDays: 90,
  unboundDraftRestoreDays: 90,
  authorityFirstReviewMonths: 12,
  authorityRepeatReviewMonths: 12,
  automaticPurge: false,
  stagingClockOrigin: "INCOMPLETE_IMPORT_CREATED",
  rejectedSensitiveImportDeadline: "BEFORE_ANY_ASSET_IMPORT_NO_CONTENT_STORAGE",
});

export function draftRestoreAvailable(archivedAt: Date, now: Date) {
  return now.getTime() < archivedAt.getTime() + governanceRetentionPolicy.unboundDraftRestoreDays * 86400000;
}
