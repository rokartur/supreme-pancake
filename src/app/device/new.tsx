import { DeviceForm } from "@/components/device-form";
import { addDevice } from "@/maintenance";

export default function NewDeviceScreen() {
  return <DeviceForm initial={{ name: "", intervalDays: "" }} save={addDevice} />;
}
