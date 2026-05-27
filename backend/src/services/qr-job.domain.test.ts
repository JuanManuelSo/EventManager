import test from "node:test";
import assert from "node:assert/strict";
import { ensureQrJobCanStart } from "./qr-job.domain.js";

test("permite iniciar cuando condiciones son validas", () => {
  assert.doesNotThrow(() => {
    ensureQrJobCanStart({ eventExists: true, isProcessing: false, guestCount: 2 });
  });
});

test("falla cuando el evento no existe o no pertenece al usuario", () => {
  assert.throws(
    () => ensureQrJobCanStart({ eventExists: false, isProcessing: false, guestCount: 1 }),
    (err: any) => err?.statusCode === 404,
  );
});

test("falla cuando ya hay un job en PROCESSING", () => {
  assert.throws(
    () => ensureQrJobCanStart({ eventExists: true, isProcessing: true, guestCount: 1 }),
    (err: any) => err?.statusCode === 409,
  );
});

test("falla cuando no hay invitados", () => {
  assert.throws(
    () => ensureQrJobCanStart({ eventExists: true, isProcessing: false, guestCount: 0 }),
    (err: any) => err?.statusCode === 400,
  );
});
