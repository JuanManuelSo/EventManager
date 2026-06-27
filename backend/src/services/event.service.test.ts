import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateAttendancePercentage,
  calculateAverageAttendance,
} from "./event.service.js";

test("calculateAttendancePercentage uses checked-in guests over invited guests", () => {
  assert.equal(
    calculateAttendancePercentage({ checkedInCount: 12, totalGuests: 100 }),
    12,
  );
});

test("calculateAverageAttendance averages stored event attendance values", () => {
  assert.equal(
    calculateAverageAttendance([
      { porcentajeAsistencia: 12 },
      { porcentajeAsistencia: 0 },
      { porcentajeAsistencia: 38 },
    ]),
    17,
  );
});

test("calculateAverageAttendance returns zero for empty events", () => {
  assert.equal(calculateAverageAttendance([]), 0);
});
