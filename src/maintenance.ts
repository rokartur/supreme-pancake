import { type DeviceInput, type ServiceActionInput, parseDevice, parseServiceAction } from "./domain";
import { insertDevice, insertServiceAction } from "./repository";

export async function addDevice(input: DeviceInput) {
  const { errors, value } = parseDevice(input);
  if (!value) return { errors, id: null };
  return { errors, id: await insertDevice(value) };
}

// A deviceId that does not exist fails on the foreign key (MOB-050-BR-04) and throws.
export async function addServiceAction(deviceId: string, input: ServiceActionInput) {
  const { errors, value } = parseServiceAction(input);
  if (!value) return { errors, id: null };
  return { errors, id: await insertServiceAction({ ...value, deviceId }) };
}
