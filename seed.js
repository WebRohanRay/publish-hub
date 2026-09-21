#!/usr/bin/env node
// ==============================================================================
// NoxWire / PublishHub — Root Database & Seed Execution Runner
// ==============================================================================

import("./scripts/seed-supabase.mjs").catch((err) => {
  console.error("Failed to execute seed runner:", err);
  process.exit(1);
});
