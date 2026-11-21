import { randomUUID } from "expo-crypto";
import { openDatabaseSync } from "expo-sqlite";

import type { Device, ServiceAction } from "./domain";

const db = openDatabaseSync("maintenance-log.db");

// ON DELETE RESTRICT backs MOB-050-BR-04 at the storage level as well.
db.execSync(`
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS devices (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL CHECK (length(trim(name)) > 0),
    intervalDays INTEGER NOT NULL CHECK (intervalDays > 0)
  );
  CREATE TABLE IF NOT EXISTS service_actions (
    id TEXT PRIMARY KEY NOT NULL,
    deviceId TEXT NOT NULL REFERENCES devices(id) ON DELETE RESTRICT,
    date TEXT NOT NULL,
    description TEXT NOT NULL CHECK (length(trim(description)) > 0),
    costCents INTEGER NOT NULL CHECK (costCents >= 0)
  );
  CREATE INDEX IF NOT EXISTS service_actions_device ON service_actions(deviceId);
`);

export type DeviceSummary = Device & { lastServiceDate: string | null };

export function listDevices() {
  return db.getAllAsync<DeviceSummary>(`
    SELECT d.id, d.name, d.intervalDays, MAX(a.date) AS lastServiceDate
    FROM devices d LEFT JOIN service_actions a ON a.deviceId = d.id
    GROUP BY d.id
    ORDER BY d.name COLLATE NOCASE
  `);
}

export function getDevice(id: string) {
  return db.getFirstAsync<DeviceSummary>(
    `SELECT d.id, d.name, d.intervalDays, MAX(a.date) AS lastServiceDate
     FROM devices d LEFT JOIN service_actions a ON a.deviceId = d.id
     WHERE d.id = ?
     GROUP BY d.id`,
    id,
  );
}

export async function insertDevice(device: Omit<Device, "id">) {
  const id = randomUUID();
  await db.runAsync("INSERT INTO devices (id, name, intervalDays) VALUES (?, ?, ?)", id, device.name, device.intervalDays);
  return id;
}

// 0 changes means the row is gone, and the edit form must not close as if it saved.
export async function updateDevice(device: Device) {
  const { changes } = await db.runAsync(
    "UPDATE devices SET name = ?, intervalDays = ? WHERE id = ?",
    device.name,
    device.intervalDays,
    device.id,
  );
  if (changes === 0) throw new Error(`Device ${device.id} not found`);
}

export async function deleteDevice(id: string) {
  await db.runAsync("DELETE FROM devices WHERE id = ?", id);
}

export function listServiceActions(deviceId: string) {
  return db.getAllAsync<ServiceAction>(
    "SELECT * FROM service_actions WHERE deviceId = ? ORDER BY date DESC",
    deviceId,
  );
}

export function getServiceAction(id: string) {
  return db.getFirstAsync<ServiceAction>("SELECT * FROM service_actions WHERE id = ?", id);
}

export async function insertServiceAction(action: Omit<ServiceAction, "id">) {
  const id = randomUUID();
  await db.runAsync(
    "INSERT INTO service_actions (id, deviceId, date, description, costCents) VALUES (?, ?, ?, ?, ?)",
    id,
    action.deviceId,
    action.date,
    action.description,
    action.costCents,
  );
  return id;
}

export async function updateServiceAction(action: Omit<ServiceAction, "deviceId">) {
  const { changes } = await db.runAsync(
    "UPDATE service_actions SET date = ?, description = ?, costCents = ? WHERE id = ?",
    action.date,
    action.description,
    action.costCents,
    action.id,
  );
  if (changes === 0) throw new Error(`Service action ${action.id} not found`);
}

export async function deleteServiceAction(id: string) {
  await db.runAsync("DELETE FROM service_actions WHERE id = ?", id);
}
