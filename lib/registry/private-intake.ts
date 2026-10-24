import { prisma } from '@/lib/db';
import { localUploadIntake, manualIntakePolicy } from '@/lib/registry/upload-intake';

// Run after auth and complete batch validation, immediately before the first object write.
// No result is cached: reviewer revocation, policy expiry and bucket visibility are checked per batch.
export async function assertPrivateIntakeReady(): Promise<void> {
  if (localUploadIntake()) return;
  try {
    const policy = manualIntakePolicy();
    const reviewer = await prisma.user.findUnique({ where: { id: policy.reviewerId }, select: { id: true, role: true, emailVerifiedAt: true } });
    if (!reviewer || reviewer.role !== 'admin' || !reviewer.emailVerifiedAt) throw new Error();
    const expected = 'https://qpwoevvxrajtirlkazxm.supabase.co';
    for (const key of ['SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL']) {
      const value = process.env[key]?.trim();
      if (value && value.replace(/\/+$/, '') !== expected) throw new Error();
    }
    if (!process.env.SUPABASE_URL?.trim() && !process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()) throw new Error();
    for (const key of ['SUPABASE_UPLOAD_BUCKET', 'SUPABASE_STORAGE_BUCKET']) {
      if (process.env[key] && process.env[key] !== 'equipregistry-uploads') throw new Error();
    }
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    if (!key) throw new Error();
    const result = await fetch(expected + '/storage/v1/bucket/equipregistry-uploads', {
      method: 'GET', headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(5000),
    });
    if (!result.ok) throw new Error();
    const bucket = await result.json();
    if (bucket.id !== 'equipregistry-uploads' || bucket.name !== 'equipregistry-uploads' || bucket.public !== false) throw new Error();
    // Re-check expiry after the asynchronous provider call.
    manualIntakePolicy();
  } catch {
    // Never expose provider bodies, credentials, reviewer identity or internal diagnostics.
    throw new Error('Document uploads are temporarily unavailable. Please contact support.');
  }
}
