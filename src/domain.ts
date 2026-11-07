export type Device = {
  id: string;
  name: string;
  intervalDays: number;
};

export type ServiceAction = {
  id: string;
  deviceId: string;
  date: string;
  description: string;
  costCents: number;
};

export type DeviceInput = { name: string; intervalDays: string };
export type ServiceActionInput = { date: string; description: string; cost: string };
export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export function parseDevice(input: DeviceInput) {
  const errors: FieldErrors<DeviceInput> = {};
  const name = input.name.trim();
  const intervalText = input.intervalDays.trim();

  if (!name) errors.name = "Nazwa urządzenia jest wymagana.";
  if (!/^\d+$/.test(intervalText) || Number(intervalText) <= 0) {
    errors.intervalDays = "Interwał musi być liczbą całkowitą większą od 0.";
  }

  const value = Object.keys(errors).length ? null : { name, intervalDays: Number(intervalText) };
  return { errors, value };
}

export function parseServiceAction(input: ServiceActionInput) {
  const errors: FieldErrors<ServiceActionInput> = {};
  const description = input.description.trim();
  const date = input.date.trim();
  const costCents = parseCostCents(input.cost);

  if (!isIsoDate(date)) errors.date = "Podaj poprawną datę w formacie RRRR-MM-DD.";
  if (!description) errors.description = "Opis czynności jest wymagany.";
  if (costCents === null) {
    errors.cost = "Koszt musi być liczbą większą lub równą 0, maks. 2 miejsca po przecinku.";
  }

  const value = Object.keys(errors).length || costCents === null ? null : { date, description, costCents };
  return { errors, value };
}

// Costs are integer grosze, so 0.1 + 0.2 never meets a binary float.
export function parseCostCents(text: string) {
  const normalized = text.trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;
  const [whole, fraction = ""] = normalized.split(".");
  return Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
}

export function formatCost(costCents: number) {
  const whole = Math.floor(costCents / 100);
  const fraction = String(costCents % 100).padStart(2, "0");
  return `${whole},${fraction} zł`;
}

export function isIsoDate(text: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return false;
  const [year, month, day] = text.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toISOString().startsWith(text);
}

// MOB-050-BR-02: next review = last review + interval.
export function nextReviewDate(lastServiceDate: string | null, intervalDays: number) {
  if (!lastServiceDate) return null;
  const [year, month, day] = lastServiceDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + intervalDays)).toISOString().slice(0, 10);
}

export function todayIsoDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}
