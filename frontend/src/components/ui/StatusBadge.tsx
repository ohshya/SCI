import { useServerStatus } from "@/context/serverStatus";
import { useAuth } from "@/context/auth";

export function StatusBadge() {
  const { online } = useServerStatus();
  const { user, loading } = useAuth();

  return (
    <div class="flex gap-4 bg-base-100 border border-base-300 p-2 rounded-box shadow-lg text-xs font-mono w-fit">
      <div class="flex justify-between">
        <span>Server:</span>
        <span>{online() ? "✅" : "⛔"}</span>
      </div>
      <div class="flex justify-between">
        <span>Sesión:</span>
        <span>{loading() ? "🟡" : user() ? "✅" : "⛔"}</span>
      </div>
    </div>
  );
}
