import { A } from "@solidjs/router";
import { FiHome } from "solid-icons/fi";

export default function NotFound() {
  return (
    <div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div class="max-w-xs w-full text-center">
        <h1 class="text-7xl font-black text-primary mb-2">404</h1>
        <h2 class="text-2xl font-bold text-base-content mb-3">
          Página no encontrada
        </h2>
        <p class="text-base-content/70 text-sm mb-8">
          La dirección a la que intentas acceder no existe.
        </p>
        <A href="/" class="btn btn-primary w-full sm:w-auto sm:px-8">
          <FiHome size={18} />
          Ir al inicio
        </A>
      </div>
    </div>
  );
}
