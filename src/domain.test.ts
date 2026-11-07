/// <reference types="bun" />
import { describe, expect, test } from "bun:test";

import { formatCost, isIsoDate, nextReviewDate, parseCostCents, parseDevice, parseServiceAction } from "./domain";

describe("parseDevice", () => {
  test("accepts a named device with a positive interval", () => {
    expect(parseDevice({ name: "  Wiertarka ", intervalDays: "90" })).toEqual({
      errors: {},
      value: { name: "Wiertarka", intervalDays: 90 },
    });
  });

  test("rejects an empty name and an interval of 0 (MOB-050-BR-01, BR-03)", () => {
    const { errors, value } = parseDevice({ name: "   ", intervalDays: "0" });
    expect(value).toBeNull();
    expect(Object.keys(errors).sort()).toEqual(["intervalDays", "name"]);
  });

  test("rejects a fractional or negative interval", () => {
    expect(parseDevice({ name: "A", intervalDays: "1.5" }).value).toBeNull();
    expect(parseDevice({ name: "A", intervalDays: "-3" }).value).toBeNull();
  });
});

describe("parseServiceAction", () => {
  test("accepts a valid action and stores cost in grosze", () => {
    expect(parseServiceAction({ date: "2026-11-05", description: "Smarowanie", cost: "49,99" }).value).toEqual({
      date: "2026-11-05",
      description: "Smarowanie",
      costCents: 4999,
    });
  });

  test("accepts a cost of 0 and rejects a negative cost (MOB-050-BR-01)", () => {
    expect(parseServiceAction({ date: "2026-11-05", description: "Przegląd", cost: "0" }).value?.costCents).toBe(0);
    const { errors, value } = parseServiceAction({ date: "2026-11-05", description: "Przegląd", cost: "-10" });
    expect(value).toBeNull();
    expect(errors.cost).toBeDefined();
  });

  test("rejects a missing description and an impossible date", () => {
    const { errors } = parseServiceAction({ date: "2026-02-30", description: "", cost: "10" });
    expect(Object.keys(errors).sort()).toEqual(["date", "description"]);
  });
});

test("parseCostCents keeps decimal precision", () => {
  expect(parseCostCents("0.1")).toBe(10);
  expect(parseCostCents("12.05")).toBe(1205);
  expect(parseCostCents("1.234")).toBeNull();
  expect(formatCost(1205)).toBe("12,05 zł");
});

test("isIsoDate rejects out of range months", () => {
  expect(isIsoDate("2026-13-01")).toBe(false);
  expect(isIsoDate("2028-02-29")).toBe(true);
});

describe("nextReviewDate (MOB-050-BR-02)", () => {
  test("adds the interval to the last review, across month and year ends", () => {
    expect(nextReviewDate("2026-01-31", 30)).toBe("2026-03-02");
    expect(nextReviewDate("2026-12-15", 30)).toBe("2027-01-14");
  });

  test("returns null when the device has no review yet", () => {
    expect(nextReviewDate(null, 30)).toBeNull();
  });
});
