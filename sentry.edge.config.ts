import * as Sentry from "@sentry/nextjs";
import { SENTRY_DSN_DEFAULT } from "@/lib/env-defaults";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? SENTRY_DSN_DEFAULT,
  tracesSampleRate: 0.1,
});
