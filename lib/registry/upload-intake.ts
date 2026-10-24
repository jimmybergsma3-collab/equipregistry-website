// A configured policy is an operational gate, never a malware verdict or release approval.
const unavailable = () => new Error('Document uploads are temporarily unavailable. Please contact support.');
export function localUploadIntake() {
  return ['test', 'development'].includes(process.env.NODE_ENV ?? '') && !process.env.VERCEL_ENV;
}
export function manualIntakePolicy() {
  const until = process.env.ER_PRIVATE_INTAKE_VALID_UNTIL ?? '';
  const expires = Date.parse(until);
  const reviewerId = process.env.ER_PRIVATE_INTAKE_REVIEWER_ID ?? '';
  const register = process.env.ER_PRIVATE_INTAKE_REVIEW_REGISTER ?? '';
  const approval = process.env.ER_PRIVATE_INTAKE_APPROVAL_SHA256 ?? '';
  if (process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV !== 'production' ||
      process.env.VERCEL_PROJECT_ID !== 'prj_22ikCaNdxbfd0f6jwUxxLdFUMLCu' ||
      process.env.ER_DATABASE_PROJECT_REF !== 'qpwoevvxrajtirlkazxm' ||
      process.env.ER_PRIVATE_INTAKE_POLICY !== 'manual-private-review-v1' ||
      !/^[A-Za-z0-9_-]{1,128}$/.test(reviewerId) || !/^[A-Za-z0-9_-]{1,80}$/.test(register) ||
      !/^[a-f0-9]{64}$/.test(approval) || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.000Z$/.test(until) ||
      !Number.isFinite(expires) || new Date(expires).toISOString() !== until ||
      expires <= Date.now() || expires - Date.now() > 7 * 86400000) throw unavailable();
  return { reviewerId, register, approval, expires };
}
export function assertUploadIntakeAvailable() {
  if (!localUploadIntake()) manualIntakePolicy();
}

// The unused legacy persistence helper has no session/uploader gate: never enable it on Vercel.
export function assertLocalUploadIntakeAvailable() {
  if (!localUploadIntake()) throw unavailable();
}

export const MAX_UPLOAD_REQUEST_BYTES = 21 * 1024 * 1024;
export const MAX_UPLOAD_BATCH_BYTES = 20 * 1024 * 1024;
export const MAX_UPLOAD_BATCH_FILES = 10;

// Bound actual bytes before multipart parsing; Content-Length alone is untrusted.
export async function boundUploadRequest(request: Request): Promise<Request> {
  const length = request.headers.get('content-length');
  if (length !== null && (!/^\d+$/.test(length) || Number(length) > MAX_UPLOAD_REQUEST_BYTES)) {
    throw new Error('Upload request is too large. Please upload fewer files at once.');
  }
  if (!request.body) throw new Error('No upload body.');
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_UPLOAD_REQUEST_BYTES) {
        void reader.cancel().catch(() => {});
        throw new Error('Upload request is too large. Please upload fewer files at once.');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return new Request(request.url, {
    method: request.method,
    headers: request.headers,
    body: Buffer.concat(chunks, size),
    signal: request.signal,
  });
}
