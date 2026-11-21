import { type DeviceInput, type ServiceActionInput, parseDevice, parseServiceAction } from "./domain";
import {
  deleteDevice,
  insertDevice,
  insertServiceAction,
  listServiceActions,
  updateDevice,
  updateServiceAction,
} from "./repository";

export async function addDevice(input: DeviceInput) {
  const { errors, value } = parseDevice(input);
  if (!value) return { errors, id: null };
  return { errors, id: await insertDevice(value) };
}

export async function editDevice(id: string, input: DeviceInput) {
  const { errors, value } = parseDevice(input);
  if (!value) return { errors, id: null };
  await updateDevice({ id, ...value });
  return { errors, id };
}

// MOB-050-BR-04: a device with service actions stays. ON DELETE RESTRICT refuses it in SQLite as well.
export async function removeDevice(id: string) {
  const actionCount = (await listServiceActions(id)).length;
  if (actionCount > 0) return { deleted: false, actionCount };
  await deleteDevice(id);
  return { deleted: true, actionCount };
}

// A deviceId that does not exist fails on the foreign key (MOB-050-BR-04) and throws.
export async function addServiceAction(deviceId: string, input: ServiceActionInput) {
  const { errors, value } = parseServiceAction(input);
  if (!value) return { errors, id: null };
  return { errors, id: await insertServiceAction({ ...value, deviceId }) };
}

export async function editServiceAction(id: string, input: ServiceActionInput) {
  const { errors, value } = parseServiceAction(input);
  if (!value) return { errors, id: null };
  await updateServiceAction({ id, ...value });
  return { errors, id };
}
