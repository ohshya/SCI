import { createResource } from "solid-js";
import { get_health } from "@/api/axios";
import { useAuth } from "@/context/auth";

export function StatusBadge() {
  const [data] = createResource(get_health);
  const { user, loading } = useAuth();

  return (
    <div class="flex gap-4 bg-base-100 border border-base-300 p-2 rounded-box shadow-lg text-xs font-mono w-fit">
      <div class="flex justify-between">
        <span>Server:</span>
        <span>{data.loading ? "🟡" : data()?.status ? "✅" : "⛔"}</span>
      </div>
      <div class="flex justify-between">
        <span>Sesión:</span>
        <span>{loading() ? "🟡" : user() ? "✅" : "⛔"}</span>
      </div>
    </div>
  );
}
