import { Show } from "solid-js";
import { Navigate, type RouteSectionProps } from "@solidjs/router";
import { useAuth } from "@/context/auth";

export function ProtectedRoute(props: RouteSectionProps) {
  const { user, loading } = useAuth();

  return (
    <Show
      when={!loading()}
      fallback={
        <div class="flex h-screen w-full items-center justify-center bg-base-100">
          <span class="loading loading-spinner loading-lg text-primary" />
        </div>
      }
    >
      <Show when={user()} fallback={<Navigate href="/login" />}>
        {props.children}
      </Show>
    </Show>
  );
}
