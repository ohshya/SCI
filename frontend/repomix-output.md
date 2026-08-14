  This file is a merged representation of the entire codebase, combined into a single document by Repomix.
  The content has been processed where comments have been removed, empty lines have been removed.
  
  # File Summary
  
  ## Purpose
  This file contains a packed representation of the entire repository's contents.
  It is designed to be easily consumable by AI systems for analysis, code review,
  or other automated processes.
  
  ## File Format
  The content is organized as follows:
  1. This summary section
  2. Repository information
  3. Directory structure
  4. Repository files (if enabled)
  5. Multiple file entries, each consisting of:
    a. A header with the file path (## File: path/to/file)
    b. The full contents of the file in a code block
  
  ## Usage Guidelines
  - This file should be treated as read-only. Any changes should be made to the
    original repository files, not this packed version.
  - When processing this file, use the file path to distinguish
    between different files in the repository.
  - Be aware that this file may contain sensitive information. Handle it with
    the same level of security as you would the original repository.
  
  ## Notes
  - Some files may have been excluded based on .gitignore rules and Repomix's configuration
  - Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
  - Files matching patterns in .gitignore are excluded
  - Files matching default ignore patterns are excluded
  - Code comments have been removed from supported file types
  - Empty lines have been removed from all files
  - Files are sorted by Git change count (files with more changes are at the bottom)
  
  # Directory Structure
  ```
  index.html
  package.json
  public/icon.svg
  src/api/auth.api.ts
  src/api/axios.ts
  src/api/logs.api.ts
  src/api/system.api.ts
  src/api/users.api.ts
  src/components/Check.tsx
  src/components/layout/ProtectedRoute.tsx
  src/components/ui/Input.tsx
  src/components/ui/PasswordInput.tsx
  src/components/ui/StatusBadge.tsx
  src/context/AuthContext.tsx
  src/features/auth/UserProfile.tsx
  src/features/logs/LogsViewer.tsx
  src/features/sessions/SessionsList.tsx
  src/features/system/SystemTester.tsx
  src/features/users/UsersList.tsx
  src/index.css
  src/index.tsx
  src/pages/Beta.tsx
  src/pages/components/Input.tsx
  src/pages/components/Login.tsx
  src/pages/components/PasswordInput.tsx
  src/pages/components/Sessions.tsx
  src/pages/components/status.tsx
  src/pages/components/UserProfile.tsx
  src/pages/components/Users.tsx
  src/pages/Dashboard.tsx
  src/pages/Login.tsx
  src/pages/Missing.tsx
  src/pages/NotFound.tsx
  tsconfig.app.json
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
  ```
  
  # Files
  
  ## File: index.html
  ```html
  <!doctype html>
  <html lang="en">
  	<head>
  		<meta charset="UTF-8" />
  		<link rel="icon" type="image/svg+xml" href="/icon.svg" />
  		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
  		<title>ApiTest</title>
  	</head>
  	<body>
  		<div id="root"></div>
  		<script type="module" src="/src/index.tsx"></script>
  	</body>
  </html>
  ```
  
  ## File: package.json
  ```json
  {
    "name": "frontend",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "tsc -b && vite build",
      "preview": "vite preview"
    },
    "dependencies": {
      "@modular-forms/solid": "^0.25.1",
      "@solidjs/router": "^0.15.4",
      "@tailwindcss/vite": "^4.3.1",
      "axios": "^1.18.1",
      "solid-icons": "^1.2.0",
      "solid-js": "^1.9.13",
      "tailwindcss": "^4.3.1"
    },
    "devDependencies": {
      "@types/node": "^24.13.2",
      "daisyui": "^5.5.23",
      "typescript": "~5.9.3",
      "vite": "npm:rolldown-vite@7.2.5",
      "vite-plugin-solid": "^2.11.12"
    },
    "overrides": {
      "vite": "npm:rolldown-vite@7.2.5"
    }
  }
  ```
  
  ## File: public/icon.svg
  ```xml
  <?xml version="1.0" encoding="iso-8859-1"?>
  <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
  	 viewBox="0 0 500.267 500.267" xml:space="preserve">
  <path style="fill:#E0E0DF;" d="M373.867,230.4H173.333v26.667H190.4v161.067c0,45.867,37.333,82.133,82.133,82.133
  	s82.133-37.333,82.133-82.133V257.067h17.067V230.4H373.867z"/>
  <path style="fill:#F16D6E;" d="M201.067,346.667V419.2c0,39.467,32,72.533,72.533,72.533s72.533-32,72.533-72.533v-72.533H201.067z"
  	/>
  <g>
  	<rect x="291.733" y="262.4" style="fill:#637888;" width="53.333" height="10.667"/>
  	<rect x="313.067" y="291.2" style="fill:#637888;" width="33.067" height="10.667"/>
  	<rect x="291.733" y="321.067" style="fill:#637888;" width="53.333" height="10.667"/>
  	<rect x="313.067" y="350.933" style="fill:#637888;" width="33.067" height="10.667"/>
  	<rect x="291.733" y="380.8" style="fill:#637888;" width="53.333" height="10.667"/>
  	<rect x="313.067" y="409.6" style="fill:#637888;" width="33.067" height="10.667"/>
  </g>
  <path style="fill:#4FAF96;" d="M82.667,93.867c1.067,41.6,22.4,82.133,60.8,105.6s84.267,24.533,121.6,7.467L82.667,93.867z"/>
  <path style="fill:#60C3AB;" d="M265.067,206.933c-1.067-41.6-22.4-82.133-60.8-105.6S120,76.8,82.667,93.867L265.067,206.933z"/>
  <path style="fill:#4FAF96;" d="M284.267,186.667c27.733,12.8,61.867,11.733,89.6-6.4s43.733-48,43.733-78.933L284.267,186.667z"/>
  <path style="fill:#60C3AB;" d="M417.6,101.333c-27.733-12.8-61.867-11.733-89.6,6.4s-43.733,48-43.733,78.933L417.6,101.333z"/>
  <g>
  	<rect x="262.933" y="82.133" style="fill:#4FAF96;" width="21.333" height="264.533"/>
  	<path style="fill:#4FAF96;" d="M217.067,0c-9.6,21.333-8.533,46.933,5.333,68.267c13.867,21.333,36.267,33.067,59.733,33.067
  		L217.067,0z"/>
  </g>
  <path style="fill:#60C3AB;" d="M282.133,101.333c9.6-21.333,8.533-46.933-5.333-68.267C262.933,11.733,240.533,0,217.067,0
  	L282.133,101.333z"/>
  </svg>
  ```
  
  ## File: src/api/auth.api.ts
  ```typescript
  import { api } from "./axios";
  export const authApi = {
  	fetchMe: async () => {
  		const response = await api.get("/auth/me");
  		return response.data;
  	},
  	LoginRequest: async (username: string, password: string) => {
  		const response = await api.post("/auth/login", { username, password });
  		return response.data;
  	},
  	LogoutRequest: async () => {
  		const response = await api.post("/auth/logout");
  		return response.data;
  	},
  	getSessions: async () => {
  		const response = await api.get("/auth/sessions");
  		return response.data;
  	},
  	deleteSession: async (sessionId: string) => {
  		const response = await api.delete(`/auth/sessions/${sessionId}`);
  		return response.data;
  	},
  	deleteOtherAllSessions: async () => {
  		const response = await api.post("/auth/sessions/all");
  		return response.data;
  	},
  };
  ```
  
  ## File: src/api/axios.ts
  ```typescript
  import axios from "axios";
  export const api = axios.create({
  	baseURL: "http://127.0.0.1:8000/api/",
  	withCredentials: true,
  });
  api.interceptors.response.use(
  	(response) => response,
  	async (error) => {
  		const originalRequest = error.config;
  		if (
  			error.response?.status === 401 &&
  			!originalRequest._retry &&
  			originalRequest.url !== "/auth/login"
  		) {
  			originalRequest._retry = true;
  			try {
  				await api.post("/auth/refresh");
  				return api(originalRequest);
  			} catch (refreshError) {
  				window.location.href = "/login";
  				return Promise.reject(refreshError);
  			}
  		}
  		return Promise.reject(error);
  	},
  );
  export const get_health = async () => {
  	try {
  		const r = await api.get("health");
  		return r.data;
  	} catch (error) {
  		alert(error);
  	}
  };
  ```
  
  ## File: src/api/logs.api.ts
  ```typescript
  import { api } from "./axios";
  export type LogResponse = {
  	id: number;
  	userId: number | null;
  	logType: string;
  	message: string;
  	ipAddress: string;
  	date: string;
  };
  export type PaginatedLogs = {
  	items: LogResponse[];
  	total: number;
  	page: number;
  	size: number;
  	pages: number;
  };
  export const LogsApi = {
  	getLogs: async (params?: {
  		page?: number;
  		size?: number;
  		log_type?: string;
  		user_id?: number;
  	}) => {
  		const response = await api.get("/logs/", { params });
  		return response.data as PaginatedLogs;
  	},
  };
  ```
  
  ## File: src/api/system.api.ts
  ```typescript
  import { api } from "./axios";
  export const SystemApi = {
  	testError: async (statusCode: number, toast: boolean = false) => {
  		const response = await api.get(`/system/test-error/${statusCode}`, {
  			params: { toast },
  		});
  		return response.data;
  	},
  };
  ```
  
  ## File: src/api/users.api.ts
  ```typescript
  import { api } from "./axios";
  export type UserResponse = {
  	id: number;
  	username: string;
  	is_active: boolean;
  	is_admin: boolean;
  	created_at: string;
  };
  export type UserCreate = {
  	username: string;
  	password: string;
  	is_admin?: boolean;
  };
  export type UserUpdate = {
  	username?: string;
  	is_active?: boolean;
  	is_admin?: boolean;
  };
  export const UsersApi = {
  	getUsers: async (params?: {
  		is_active?: boolean;
  		is_admin?: boolean;
  		search?: string;
  	}) => {
  		const response = await api.get("/users/", { params });
  		return response.data as UserResponse[];
  	},
  	createUser: async (userData: UserCreate) => {
  		const response = await api.post("/users/", userData);
  		return response.data;
  	},
  	updateUser: async (userId: number, userData: UserUpdate) => {
  		const response = await api.patch(`/users/${userId}`, userData);
  		return response.data;
  	},
  	disableUser: async (userId: number) => {
  		const response = await api.patch(`/users/disable/${userId}`);
  		return response.data;
  	},
  	deleteUser: async (userId: number) => {
  		const response = await api.delete(`/users/${userId}`);
  		return response.data;
  	},
  	changeUserPassword: async (userId: number, newPassword: string) => {
  		const response = await api.post(`/users/${userId}/password`, {
  			new_password: newPassword,
  		});
  		return response.data;
  	},
  	closeAllSessionsOfUser: async (userId: number) => {
  		const response = await api.delete(`/auth/sessions/all/${userId}`);
  		return response.data;
  	},
  };
  ```
  
  ## File: src/components/Check.tsx
  ```typescript
  import { Show } from "solid-js";
  import { Navigate } from "@solidjs/router";
  import { useAuth } from "@/context/AuthContext";
  export const Check = (props: any) => {
    const { user, loading } = useAuth();
    return (
      <Show
        when={!loading()}
        fallback={
          <div class="flex justify-center items-center h-screen">
            <span class="loading loading-spinner loading-lg" />
          </div>
        }
      >
        <Show when={user()} fallback={<Navigate href="/login" />}>
          {props.children}
        </Show>
      </Show>
    );
  };
  ```
  
  ## File: src/components/layout/ProtectedRoute.tsx
  ```typescript
  import { Show, children, JSX } from "solid-js";
  import { Navigate } from "@solidjs/router";
  import { useAuth } from "@/context/AuthContext";
  export const ProtectedRoute = (props: { children: JSX.Element }) => {
    const { user, loading } = useAuth();
    const resolved = children(() => props.children);
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
          {resolved()}
        </Show>
      </Show>
    );
  };
  ```
  
  ## File: src/components/ui/Input.tsx
  ```typescript
  import type { JSX } from "solid-js/jsx-runtime";
  import { splitProps } from "solid-js";
  interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
    loading?: boolean;
    label?: string;
    error?: string;
    icon?: any;
    required?: boolean;
  }
  export const Input = (allProps: Props) => {
    const [props, inputProps] = splitProps(allProps, [
      "label",
      "error",
      "icon",
      "loading",
      "required",
    ]);
    return (
      <fieldset class="fieldset w-full">
        <legend class="fieldset-legend">
          {props?.label}
          {props.required && <span class="font-bold text-error">*</span>}
        </legend>
        <label
          class="input w-full flex items-center gap-2"
          classList={{ "input-error": !!props.error }}
        >
          {props.icon && <span>{props.icon}</span>}
          <input
            type="text"
            class="grow"
            {...inputProps}
            disabled={props.loading}
          />
        </label>
        {props.error && (
          <p class="label text-error text-xs mt-1">{props.error}</p>
        )}
      </fieldset>
    );
  };
  ```
  
  ## File: src/components/ui/PasswordInput.tsx
  ```typescript
  import { IoEye, IoEyeOff } from "solid-icons/io";
  import { createSignal, splitProps } from "solid-js";
  import type { JSX } from "solid-js/jsx-runtime";
  interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    loading?: boolean;
  }
  export const PasswordInput = (allProps: Props) => {
    const [visible, setVisible] = createSignal(false);
    const [props, inputProps] = splitProps(allProps, [
      "label",
      "error",
      "loading",
    ]);
    return (
      <fieldset class="fieldset w-full">
        <legend class="fieldset-legend">{props?.label}</legend>
        <div class="join w-full">
          <label
            class="input join-item grow flex items-center"
            classList={{ "input-error": !!props.error }}
          >
            <input
              type={visible() ? "text" : "password"}
              class="grow"
              {...inputProps}
              disabled={props.loading}
            />
          </label>
          <button
            type="button"
            onclick={() => setVisible((e) => !e)}
            class="btn join-item text-base-content"
            disabled={props.loading}
          >
            {visible() ? <IoEyeOff /> : <IoEye />}
          </button>
        </div>
        {props.error && (
          <p class="label text-error text-xs mt-1">{props.error}</p>
        )}
      </fieldset>
    );
  };
  ```
  
  ## File: src/components/ui/StatusBadge.tsx
  ```typescript
  import { createResource, createSignal, Show } from "solid-js";
  import { get_health } from "@/api/axios";
  import { useAuth } from "@/context/AuthContext";
  export const StatusBadge = () => {
    const [open, setOpen] = createSignal(false);
    const [data] = createResource(get_health);
    const { user, loading } = useAuth();
    return (
      <div class="flex items-center gap-2 ml-4 relative">
        <button class="btn btn-xs btn-outline" onclick={() => setOpen((e) => !e)}>
          {open() ? "Ocultar Estado" : "Ver Estado"}
        </button>
        <Show when={open()}>
          <div class="absolute top-8 left-0 bg-base-100 border border-base-300 p-2 rounded-box shadow-lg z-50 flex flex-col gap-1 text-xs font-mono w-32">
            <div class="flex justify-between">
              <span>Server:</span>
              <span>{data.loading ? "🟡" : data()?.status ? "✅" : "⛔"}</span>
            </div>
            <div class="flex justify-between">
              <span>Sesión:</span>
              <span>{loading() ? "🟡" : user() ? "✅" : "⛔"}</span>
            </div>
          </div>
        </Show>
      </div>
    );
  };
  ```
  
  ## File: src/context/AuthContext.tsx
  ```typescript
  import { authApi } from "@/api/auth.api";
  import { createSignal } from "solid-js";
  type User = {
    id: number;
    username: string;
    is_active: boolean;
    is_admin: boolean;
  };
  const [user, setUser] = createSignal<User | null>(null);
  const [loading, setLoading] = createSignal<boolean>(true);
  export const refreshUser = async () => {
    setLoading(true);
    try {
      const r = await authApi.fetchMe();
      setUser(r);
    } catch {
      console.error("Failed to fetch user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  if (typeof window !== "undefined") {
    refreshUser();
  }
  export const useAuth = () => {
    return {
      user: () => user(),
      setUser: (u: User | null) => setUser(u),
      loading: () => loading(),
      refreshUser,
    };
  };
  ```
  
  ## File: src/features/auth/UserProfile.tsx
  ```typescript
  import { useAuth } from "@/context/AuthContext";
  import { Show } from "solid-js";
  import { AiOutlineCheckCircle } from "solid-icons/ai";
  export const UserProfile = () => {
    const { user } = useAuth();
    return (
      <Show when={user()}>
        <div class="card bg-base-100 shadow border border-base-300">
          <div class="card-body items-center text-center p-6">
            <AiOutlineCheckCircle class="text-success text-6xl mb-2" />
            <h3 class="card-title text-xl">Sesión Activa</h3>
            <div class="flex flex-col gap-1 w-full mt-4 bg-base-200 p-4 rounded-box text-sm">
              <div class="flex justify-between border-b border-base-300 pb-1">
                <span class="font-bold">ID:</span>
                <span>{user()?.id}</span>
              </div>
              <div class="flex justify-between border-b border-base-300 py-1">
                <span class="font-bold">Usuario:</span>
                <span>{user()?.username}</span>
              </div>
              <div class="flex justify-between border-b border-base-300 py-1">
                <span class="font-bold">Estado:</span>
                <span class="badge badge-success badge-sm">
                  {user()?.is_active ? "Activo" : "Inactivo"}
                </span>
              </div>
              <div class="flex justify-between pt-1">
                <span class="font-bold">Rol:</span>
                <span class="badge badge-primary badge-sm">
                  {user()?.is_admin ? "Admin" : "Usuario"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Show>
    );
  };
  ```
  
  ## File: src/features/logs/LogsViewer.tsx
  ```typescript
  import { createResource, For, Show, createSignal } from "solid-js";
  import { LogsApi } from "@/api/logs.api";
  import { useAuth } from "@/context/AuthContext";
  export const LogsViewer = () => {
    const { user } = useAuth();
    const [page, setPage] = createSignal(1);
    const [logs, { refetch }] = createResource(
      () => ({ page: page(), size: 10 }),
      LogsApi.getLogs,
    );
    return (
      <Show
        when={user()?.is_admin}
        fallback={<div class="alert alert-warning">Acceso denegado a Logs.</div>}
      >
        <div class="overflow-x-auto w-full">
          <table class="table table-sm table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Mensaje</th>
                <th>IP</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <Show when={logs.loading}>
                <tr>
                  <td colspan="5" class="text-center">
                    Cargando logs...
                  </td>
                </tr>
              </Show>
              <For each={logs()?.items}>
                {(log) => (
                  <tr>
                    <td>{log.id}</td>
                    <td>
                      <span class="badge badge-ghost badge-sm">
                        {log.logType}
                      </span>
                    </td>
                    <td class="whitespace-normal break-words max-w-xs">
                      {log.message}
                    </td>
                    <td class="font-mono text-xs">{log.ipAddress}</td>
                    <td>{new Date(log.date).toLocaleString()}</td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
          {}
          <div class="join w-full justify-center mt-4">
            <button
              class="join-item btn btn-sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page() === 1}
            >
              «
            </button>
            <button class="join-item btn btn-sm no-animation">
              Página {page()} de {logs()?.pages || 1}
            </button>
            <button
              class="join-item btn btn-sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={page() === (logs()?.pages || 1)}
            >
              »
            </button>
          </div>
        </div>
      </Show>
    );
  };
  ```
  
  ## File: src/features/sessions/SessionsList.tsx
  ```typescript
  import { authApi } from "@/api/auth.api";
  import { createResource, Show, For, createSignal } from "solid-js";
  import { useAuth } from "@/context/AuthContext";
  export const SessionsList = () => {
    const { user } = useAuth();
    const [sessions, { refetch }] = createResource(authApi.getSessions);
    const [expandedId, setExpandedId] = createSignal<string | null>(null);
    const [closingIds, setClosingIds] = createSignal(new Set<string>());
    const handleCloseSession = async (id: string) => {
      setClosingIds((prev) => new Set(prev).add(id));
      try {
        await authApi.deleteSession(id);
        refetch();
      } catch (error) {
        console.error(error);
      } finaly {
        setClosingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    };
    const handleCloseAll = async () => {
      try {
        await authApi.deleteOtherAllSessions();
        refetch();
      } catch (error) {
        console.error(error);
      }
    };
    const toggleDetails = (id: string) => {
      setExpandedId((prev) => (prev === id ? null : id));
    };
    const formatDate = (dateString: string) => {
      if (!dateString) return "—";
      return new Date(dateString).toLocaleString();
    };
    return (
      <Show when={user()} fallback={<div class="alert alert-info shadow-sm">Inicia sesión para mostrar la lista</div>}>
        <div class="flex flex-col gap-4">
          <div class="flex justify-end">
            <button class="btn btn-error btn-sm text-white" onClick={handleCloseAll}>Cerrar otras sesiones</button>
          </div>
          <div class="max-h-[50vh] overflow-y-auto pr-1 space-y-3">
            <Show when={!sessions.loading} fallback={<div class="flex justify-center p-4"><span class="loading loading-spinner loading-md"></span></div>}>
              <For each={sessions()} fallback={<div class="alert alert-ghost">No hay sesiones activas.</div>}>
                {(session) => (
                  <div class="border border-base-300 rounded-box bg-base-50 p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex justify-between items-start gap-2">
                      <div class="flex-1 cursor-pointer" onClick={() => toggleDetails(session.id)}>
                        <div class="flex flex-col gap-1">
                          <span class="font-bold text-sm block truncate max-w-xs">{session.user_agent || "Dispositivo desconocido"}</span>
                          <span class="text-xs text-base-content/70">Última actividad: {formatDate(session.last_activity)}</span>
                        </div>
                        <div class="text-xs font-mono text-base-content/50 mt-1">{session.ip_address || "IP desconocida"}</div>
                      </div>
                      <button class="btn btn-ghost btn-sm btn-circle" onClick={(e) => { e.stopPropagation(); handleCloseSession(session.id); }} disabled={closingIds().has(session.id)}>
                        <Show when={closingIds().has(session.id)} fallback={<span class="text-error font-bold">✕</span>}>
                          <span class="loading loading-spinner loading-xs"></span>
                        </Show>
                      </button>
                    </div>
                    <Show when={expandedId() === session.id}>
                      <div class="mt-3 pt-3 border-t border-base-200 text-xs space-y-1 font-mono bg-base-100 p-2 rounded-md">
                        <p><span class="font-bold">ID:</span> {session.id}</p>
                        <p><span class="font-bold">Ubicación:</span> {session.location || "No disponible"}</p>
                        <p><span class="font-bold">Creada:</span> {formatDate(session.created_at)}</p>
                        <p><span class="font-bold">Expira:</span> {formatDate(session.expires_at)}</p>
                      </div>
                    </Show>
                  </div>
                )}
              </For>
            </Show>
          </div>
        </div>
      </Show>
    );
  };
  ```
  
  ## File: src/features/system/SystemTester.tsx
  ```typescript
  import { createSignal } from "solid-js";
  import { SystemApi } from "@/api/system.api";
  export const SystemTester = () => {
    const [code, setCode] = createSignal(500);
    const [toast, setToast] = createSignal(false);
    const [loading, setLoading] = createSignal(false);
    const testError = async () => {
      setLoading(true);
      try {
        await SystemApi.testError(code(), toast());
        alert("La petición fue exitosa (No se generó error)");
      } catch (error: any) {
        alert(
          `Error capturado: ${error.response?.data?.error?.message || error.message}`,
        );
      } finally {
        setLoading(false);
      }
    };
    return (
      <div class="card bg-base-100 shadow-sm border border-base-300">
        <div class="card-body p-4">
          <h3 class="card-title text-lg">Probar Manejo de Errores</h3>
          <div class="flex flex-col sm:flex-row gap-2 mt-2 items-end">
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">Código HTTP</span>
              </div>
              <input
                type="number"
                class="input input-bordered input-sm w-full"
                value={code()}
                onInput={(e) => setCode(Number(e.currentTarget.value))}
              />
            </label>
            <label class="cursor-pointer label justify-start gap-2 mb-1">
              <input
                type="checkbox"
                class="checkbox checkbox-sm"
                checked={toast()}
                onChange={(e) => setToast(e.currentTarget.checked)}
              />
              <span class="label-text">Forzar Toast</span>
            </label>
            <button
              class="btn btn-warning btn-sm sm:ml-auto w-full sm:w-auto"
              onClick={testError}
              disabled={loading()}
            >
              {loading() ? "Enviando..." : "Lanzar Error"}
            </button>
          </div>
        </div>
      </div>
    );
  };
  ```
  
  ## File: src/features/users/UsersList.tsx
  ```typescript
  import {
    For,
    Show,
    createSignal,
    createResource,
    createEffect,
  } from "solid-js";
  import { createForm } from "@modular-forms/solid";
  import { useAuth } from "@/context/AuthContext";
  import { PasswordInput } from "@/components/ui/PasswordInput";
  import { Input } from "@/components/ui/Input";
  import {
    AiOutlineEdit,
    AiOutlineDelete,
    AiOutlineKey,
    AiOutlineUserAdd,
    AiOutlinePoweroff,
  } from "solid-icons/ai";
  import {
    UsersApi,
    type UserResponse,
    type UserCreate,
    type UserUpdate,
  } from "@/api/users.api";
  export const UsersList = () => {
    const { user } = useAuth();
    const [search, setSearch] = createSignal("");
    const [isActive, setIsActive] = createSignal<boolean | undefined>(undefined);
    const [isAdmin, setIsAdmin] = createSignal<boolean | undefined>(undefined);
    const [showAddModal, setShowAddModal] = createSignal(false);
    const [showEditModal, setShowEditModal] = createSignal(false);
    const [showPasswordModal, setShowPasswordModal] = createSignal(false);
    const [selectedUser, setSelectedUser] = createSignal<UserResponse | null>(
      null,
    );
    const [users, { refetch }] = createResource(
      () => ({ search: search(), is_active: isActive(), is_admin: isAdmin() }),
      UsersApi.getUsers,
    );
    createEffect(() => {
      refetch();
    });
    const handleAddUser = async (values: UserCreate) => {
      try {
        await UsersApi.createUser({
          ...values,
          username: values.username.trim(),
        });
        refetch();
        setShowAddModal(false);
        alert("Usuario creado exitosamente");
      } catch (error: any) {
        alert(error.response?.data?.detail?.message || "Error al crear usuario");
      }
    };
    const handleUpdateUser = async (values: UserUpdate) => {
      if (!selectedUser()) return;
      try {
        await UsersApi.updateUser(selectedUser()!.id, {
          ...values,
          username: values.username?.trim(),
        });
        refetch();
        setShowEditModal(false);
        alert("Usuario actualizado");
      } catch (error: any) {
        alert(
          error.response?.data?.detail?.message || "Error al actualizar usuario",
        );
      }
    };
    const handleChangePassword = async (newPassword: string) => {
      if (!selectedUser()) return;
      try {
        await UsersApi.changeUserPassword(selectedUser()!.id, newPassword);
        setShowPasswordModal(false);
        alert("Contraseña cambiada");
      } catch (error: any) {
        alert(
          error.response?.data?.detail?.message || "Error al cambiar contraseña",
        );
      }
    };
    const handleToggleActive = async (targetUser: UserResponse) => {
      try {
        if (targetUser.is_active) {
          await UsersApi.disableUser(targetUser.id);
          alert("Usuario deshabilitado");
        } else {
          await UsersApi.updateUser(targetUser.id, { is_active: true });
          alert("Usuario habilitado");
        }
        refetch();
      } catch (error: any) {
        alert(error.response?.data?.detail?.message || "Error al cambiar estado");
      }
    };
    const handleDeleteUser = async (targetUser: UserResponse) => {
      if (!confirm(`¿Eliminar a ${targetUser.username}?`)) return;
      try {
        await UsersApi.deleteUser(targetUser.id);
        refetch();
        alert("Usuario eliminado");
      } catch (error: any) {
        alert(
          error.response?.data?.detail?.message || "Error al eliminar usuario",
        );
      }
    };
    const handleForceDisconnect = async (targetUser: UserResponse) => {
      if (!confirm(`¿Cerrar todas las sesiones de ${targetUser.username}?`))
        return;
      try {
        await UsersApi.closeAllSessionsOfUser(targetUser.id);
        alert(`Sesiones cerradas para ${targetUser.username}`);
      } catch (error: any) {
        alert(
          error.response?.data?.detail?.message ||
            "Error al desconectar sesiones",
        );
      }
    };
    const [, { Form: AddForm, Field: AddField }] = createForm<UserCreate>({
      validateOn: "blur",
      validate: (values) => {
        const errors: Partial<Record<keyof UserCreate, string>> = {};
        if (!values.username?.trim()) errors.username = "Requerido";
        if (!values.password) errors.password = "Requerido";
        if (values.password && values.password.length < 6)
          errors.password = "Mínimo 6 caracteres";
        return errors;
      },
    });
    const [, { Form: EditForm, Field: EditField }] = createForm<UserUpdate>({
      validateOn: "blur",
      validate: (values) => {
        const errors: Partial<Record<keyof UserUpdate, string>> = {};
        if (values.username && !values.username.trim())
          errors.username = "No puede estar vacío";
        return errors;
      },
    });
    const [, { Form: PasswordForm, Field: PasswordField }] = createForm<{
      new_password: string;
    }>({
      validateOn: "blur",
      validate: (values) => {
        const errors: Partial<{ new_password: string }> = {};
        if (!values.new_password) errors.new_password = "Requerido";
        if (values.new_password && values.new_password.length < 6)
          errors.new_password = "Mínimo 6 caracteres";
        return errors;
      },
    });
    return (
      <Show
        when={user()?.is_admin}
        fallback={
          <div class="alert alert-error shadow-sm">
            Requiere permisos de administrador.
          </div>
        }
      >
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
            <input
              type="text"
              placeholder="Buscar usuario..."
              class="input input-bordered input-sm w-full sm:w-48"
              value={search()}
              onInput={(e) => setSearch(e.currentTarget.value)}
            />
            <button
              type="button"
              class="btn btn-primary btn-sm text-white w-full sm:w-auto gap-1"
              onClick={() => setShowAddModal(true)}
            >
              <AiOutlineUserAdd size={16} /> Crear
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="table table-sm w-full">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Estado</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <Show when={users.loading}>
                  <tr>
                    <td colspan="4" class="text-center">
                      Cargando...
                    </td>
                  </tr>
                </Show>
                <For each={users()}>
                  {(u) => (
                    <tr>
                      <td class="font-bold">{u.username}</td>
                      <td>
                        <span
                          class={`badge badge-sm ${u.is_active ? "badge-success" : "badge-error"}`}
                        >
                          {u.is_active ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td>
                        <span
                          class={`badge badge-sm ${u.is_admin ? "badge-primary" : "badge-ghost"}`}
                        >
                          {u.is_admin ? "Admin" : "User"}
                        </span>
                      </td>
                      <td class="flex flex-wrap gap-1">
                        <button
                          class="btn btn-square btn-xs btn-outline"
                          onClick={() => {
                            setSelectedUser(u);
                            setShowEditModal(true);
                          }}
                          title="Editar"
                        >
                          <AiOutlineEdit size={14} />
                        </button>
                        <button
                          class="btn btn-square btn-xs btn-outline"
                          onClick={() => {
                            setSelectedUser(u);
                            setShowPasswordModal(true);
                          }}
                          title="Password"
                        >
                          <AiOutlineKey size={14} />
                        </button>
                        <button
                          class={`btn btn-square btn-xs ${u.is_active ? "btn-warning" : "btn-success"}`}
                          onClick={() => handleToggleActive(u)}
                          title={u.is_active ? "Deshabilitar" : "Habilitar"}
                        >
                          <AiOutlinePoweroff size={14} />
                        </button>
                        <button
                          class="btn btn-square btn-xs btn-error text-white"
                          onClick={() => handleForceDisconnect(u)}
                          title="Cerrar sesiones de este usuario"
                        >
                          <AiOutlinePoweroff size={14} />
                        </button>
                        <button
                          class="btn btn-square btn-xs btn-error text-white"
                          onClick={() => handleDeleteUser(u)}
                          title="Eliminar"
                        >
                          <AiOutlineDelete size={14} />
                        </button>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
          <dialog class={`modal ${showAddModal() ? "modal-open" : ""}`}>
            <div class="modal-box max-w-sm">
              <h3 class="font-bold text-lg mb-2">Agregar Usuario</h3>
              <AddForm onSubmit={handleAddUser}>
                <AddField name="username">
                  {(field, props) => (
                    <Input
                      label="Nombre de usuario"
                      value={field.value}
                      error={field.error}
                      {...props}
                    />
                  )}
                </AddField>
                <AddField name="password">
                  {(field, props) => (
                    <PasswordInput
                      label="Contraseña"
                      value={field.value}
                      error={field.error}
                      {...props}
                    />
                  )}
                </AddField>
                <AddField name="is_admin" type="boolean">
                  {(field, props) => (
                    <label class="label cursor-pointer gap-2 justify-start mt-2">
                      <input
                        type="checkbox"
                        class="checkbox checkbox-primary checkbox-sm"
                        checked={field.value || false}
                        onChange={(e) => props.onChange(e)}
                      />
                      <span class="label-text">Administrador</span>
                    </label>
                  )}
                </AddField>
                <div class="modal-action">
                  <button type="submit" class="btn btn-primary btn-sm text-white">
                    Crear
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </AddForm>
            </div>
          </dialog>
          <dialog class={`modal ${showEditModal() ? "modal-open" : ""}`}>
            <div class="modal-box max-w-sm">
              <h3 class="font-bold text-lg mb-2">Editar Usuario</h3>
              <Show when={selectedUser()}>
                <EditForm
                  onSubmit={handleUpdateUser}
                  initialValues={{
                    username: selectedUser()?.username,
                    is_active: selectedUser()?.is_active,
                    is_admin: selectedUser()?.is_admin,
                  }}
                >
                  <EditField name="username">
                    {(field, props) => (
                      <Input
                        label="Nombre de usuario"
                        value={field.value}
                        error={field.error}
                        {...props}
                      />
                    )}
                  </EditField>
                  <EditField name="is_active" type="boolean">
                    {(field, props) => (
                      <label class="label cursor-pointer gap-2 justify-start mt-2">
                        <input
                          type="checkbox"
                          class="checkbox checkbox-primary checkbox-sm"
                          checked={field.value ?? false}
                          onChange={(e) => props.onChange(e)}
                        />
                        <span class="label-text">Activo</span>
                      </label>
                    )}
                  </EditField>
                  <EditField name="is_admin" type="boolean">
                    {(field, props) => (
                      <label class="label cursor-pointer gap-2 justify-start">
                        <input
                          type="checkbox"
                          class="checkbox checkbox-primary checkbox-sm"
                          checked={field.value ?? false}
                          onChange={(e) => props.onChange(e)}
                        />
                        <span class="label-text">Administrador</span>
                      </label>
                    )}
                  </EditField>
                  <div class="modal-action">
                    <button
                      type="submit"
                      class="btn btn-primary btn-sm text-white"
                    >
                      Actualizar
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </EditForm>
              </Show>
            </div>
          </dialog>
          <dialog class={`modal ${showPasswordModal() ? "modal-open" : ""}`}>
            <div class="modal-box max-w-sm">
              <h3 class="font-bold text-lg mb-2">Cambiar Contraseña</h3>
              <Show when={selectedUser()}>
                <p class="text-sm mb-2">
                  Usuario:{" "}
                  <span class="font-bold">{selectedUser()?.username}</span>
                </p>
                <PasswordForm
                  onSubmit={(values) => handleChangePassword(values.new_password)}
                >
                  <PasswordField name="new_password">
                    {(field, props) => (
                      <PasswordInput
                        label="Nueva contraseña"
                        value={field.value}
                        error={field.error}
                        {...props}
                      />
                    )}
                  </PasswordField>
                  <div class="modal-action">
                    <button
                      type="submit"
                      class="btn btn-primary btn-sm text-white"
                    >
                      Cambiar
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm"
                      onClick={() => setShowPasswordModal(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </PasswordForm>
              </Show>
            </div>
          </dialog>
        </div>
      </Show>
    );
  };
  ```
  
  ## File: src/index.css
  ```css
  @import "tailwindcss";
  @plugin "daisyui" {
  	themes: light --default;
  	exclude: rootscrollgutter;
  }
  ```
  
  ## File: src/index.tsx
  ```typescript
  import { Check } from "./components/Check";
  import { Router } from "@solidjs/router";
  import { render } from "solid-js/web";
  import { lazy } from "solid-js";
  import "./index.css";
  const routes = [
    {
      path: "/login",
      component: lazy(() => import("./pages/components/Login")),
    },
    {
      component: Check,
      children: [
        {
          path: "/",
          component: lazy(() => import("./pages/Beta")),
        },
        {
          path: "/*",
          component: lazy(() => import("./pages/Missing")),
        },
      ],
    },
  ];
  render(() => <Router>{routes}</Router>, document.getElementById("root")!);
  ```
  
  ## File: src/pages/Beta.tsx
  ```typescript
  import { Sessions } from "./components/Sessions";
  import { Status } from "./components/status";
  import { Users } from "./components/Users";
  import { UserProfile } from "./components/UserProfile";
  export default function Beta() {
    return (
      <div class={`h-screen w-full`}>
        <Status />
        <div class="p-10 place-items-center">
          <UserProfile />
          <Sessions />
          <Users />
        </div>
      </div>
    );
  }
  ```
  
  ## File: src/pages/components/Input.tsx
  ```typescript
  import type { JSX } from "solid-js/jsx-runtime";
  import { splitProps } from "solid-js";
  interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
    loading?: boolean;
    label?: string;
    error?: string;
    icon?: any;
    required?: boolean;
  }
  export const Input = (allProps: Props) => {
    const [props, inputProps] = splitProps(allProps, [
      "label",
      "error",
      "icon",
      "loading",
      "required",
    ]);
    return (
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          {props?.label}
          {props.required && <span class="font-bold text-error">*</span>}
        </legend>
        <label class="input w-full" classList={{ "input-error": !!props.error }}>
          {props.icon && <span class="label">{props.icon}</span>}
          <input type="text" {...inputProps} disabled={props.loading} />
        </label>
        <p class="label text-error">{props.error}</p>
      </fieldset>
    );
  };
  ```
  
  ## File: src/pages/components/Login.tsx
  ```typescript
  import { authApi } from "@/api/auth.api";
  import { useAuth } from "@/context/AuthContext";
  import { createForm, type SubmitHandler } from "@modular-forms/solid";
  import { createSignal, createEffect, Show } from "solid-js";
  import { Input } from "./Input";
  import { PasswordInput } from "./PasswordInput";
  import { useNavigate } from "@solidjs/router";
  type LoginForm = {
    username: string;
    password: string;
  };
  export default function LoginForm() {
    const navigate = useNavigate();
    const { user, refreshUser } = useAuth();
    const [loading, setLoading] = createSignal(false);
    const [checkingAuth, setCheckingAuth] = createSignal(true);
    createEffect(() => {
      if (user()) {
        navigate("/", { replace: true });
      } else {
        setCheckingAuth(false);
      }
    });
    const [_, { Form, Field }] = createForm<LoginForm>({
      validateOn: "blur",
    });
    const handleLogin: SubmitHandler<LoginForm> = async (values) => {
      try {
        setLoading(true);
        await authApi.LoginRequest(values.username, values.password).then(() => {
          refreshUser().then(() => {
            navigate("/");
          });
        });
      } finally {
        setLoading(false);
      }
    };
    return (
      <Show
        when={!checkingAuth() && !user()}
        fallback={
          <div class="flex justify-center items-center h-40">
            <span class="loading loading-spinner loading-lg text-primary"></span>
          </div>
        }
      >
        <Form onSubmit={handleLogin}>
          <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend class="fieldset-legend">Login</legend>
            <Field name="username">
              {(field, props) => (
                <Input
                  label="Nombre de usuario"
                  disabled={loading()}
                  value={field.value}
                  error={field.error}
                  loading={loading()}
                  {...props}
                />
              )}
            </Field>
            <Field name="password">
              {(field, props) => (
                <PasswordInput
                  label="Password"
                  disabled={loading()}
                  value={field.value}
                  error={field.error}
                  class="join-item"
                  loading={loading()}
                  {...props}
                />
              )}
            </Field>
            <button class="btn btn-neutral mt-4" disabled={loading()}>
              Login
            </button>
          </fieldset>
        </Form>
      </Show>
    );
  }
  ```
  
  ## File: src/pages/components/PasswordInput.tsx
  ```typescript
  import { IoEye, IoEyeOff } from "solid-icons/io";
  import { createSignal, splitProps } from "solid-js";
  import type { JSX } from "solid-js/jsx-runtime";
  interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    loading?: boolean;
  }
  export const PasswordInput = (allProps: Props) => {
    const [visible, setVisible] = createSignal(false);
    const [props, inputProps] = splitProps(allProps, [
      "label",
      "error",
      "loading",
    ]);
    return (
      <fieldset class="fieldset">
        <legend class="fieldset-legend">{props?.label}</legend>
        <div class="join">
          <label
            class="input w-full join-item"
            classList={{ "input-error": !!props.error }}
          >
            <input
              type={visible() ? "text" : "password"}
              {...inputProps}
              disabled={props.loading}
            />
          </label>
          <button
            type="button"
            onclick={() => setVisible((e) => !e)}
            class="btn join-item text-black"
            disabled={props.loading}
          >
            {visible() ? <IoEyeOff /> : <IoEye />}
          </button>
        </div>
        <p class="label text-error">{props.error}</p>
      </fieldset>
    );
  };
  ```
  
  ## File: src/pages/components/Sessions.tsx
  ```typescript
  import { authApi } from "@/api/auth.api";
  import { createResource, Show, For, createSignal } from "solid-js";
  import { useAuth } from "@/context/AuthContext";
  export const Sessions = () => {
    const { user } = useAuth();
    const [sessions, { refetch }] = createResource(authApi.getSessions);
    const [expandedId, setExpandedId] = createSignal<string | null>(null);
    const [closingIds, setClosingIds] = createSignal(new Set<string>());
    const handleCloseSession = async (id: any) => {
      setClosingIds((prev) => new Set(prev).add(id));
      try {
        await authApi.deleteSession(id);
        refetch();
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      } finally {
        setClosingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    };
    const handleCloseAll = async () => {
      try {
        await authApi.deleteOtherAllSessions();
        refetch();
      } catch (error) {
        console.error("Error al cerrar todas las sesiones:", error);
      }
    };
    const toggleDetails = (id: string) => {
      setExpandedId((prev) => (prev === id ? null : id));
    };
    const formatDate = (dateString: string) => {
      if (!dateString) return "—";
      return new Date(dateString).toLocaleString();
    };
    const getDeviceName = (userAgent: string) => {
      if (!userAgent) return "Dispositivo desconocido";
      const browserMatch = userAgent.match(
        /(Chrome|Firefox|Safari|Edge)\/[\d.]+/,
      );
      const osMatch = userAgent.match(/\((.*?)\)/);
      const browser = browserMatch ? browserMatch[1] : "";
      const os = osMatch ? osMatch[1].split(";")[0] : "";
      return `${browser}${os ? ` en ${os}` : ""}`.trim() || userAgent;
    };
    return (
      <Show
        when={user()}
        fallback={
          <div class="bg-base-200 border-base-300 rounded-box w-xs border p-4 text-center">
            <span class="font-semibold">Inicia sesión para mostrar la lista</span>
          </div>
        }
      >
        <div class="flex flex-col gap-4 p-4">
          {}
          <div class="flex justify-end">
            <button class="btn btn-error btn-sm" onClick={handleCloseAll}>
              Cerrar todo
            </button>
          </div>
          {}
          <div class="max-h-[70vh] overflow-y-auto">
            <Show
              when={!sessions.loading}
              fallback={
                <div class="flex justify-center p-8">
                  <span class="loading loading-spinner loading-lg"></span>
                </div>
              }
            >
              <Show
                when={sessions()}
                fallback={
                  <div class="alert alert-info shadow-lg">
                    <span>No hay sesiones activas.</span>
                  </div>
                }
              >
                <div class="flex flex-col gap-3">
                  <For each={sessions()}>
                    {(session) => (
                      <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                        <div class="card-body p-4">
                          {}
                          <div class="flex justify-between items-start gap-2">
                            <div
                              class="flex-1 cursor-pointer"
                              onClick={() => toggleDetails(session.id)}
                            >
                              <div class="flex flex-col justify-between gap-2">
                                <span class="font-semibold">
                                  {getDeviceName(session.user_agent)}
                                </span>
                                <span class="text-sm text-base-content/70">
                                  Última actividad:{" "}
                                  {formatDate(session.last_activity)}
                                </span>
                              </div>
                              <div class="text-sm text-base-content/50 mt-1">
                                {session.ip_address || "IP desconocida"}
                              </div>
                            </div>
                            <button
                              class="btn btn-ghost btn-sm btn-circle"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCloseSession(session.id);
                              }}
                              disabled={closingIds().has(session.id)}
                            >
                              <Show
                                when={closingIds().has(session.id)}
                                fallback={<span class="text-error">✕</span>}
                              >
                                <span class="loading loading-spinner loading-xs"></span>
                              </Show>
                            </button>
                          </div>
                          {}
                          <Show when={expandedId() === session.id}>
                            <div class="mt-2 pt-2 border-t border-base-200 text-sm space-y-1">
                              <p>
                                <span class="font-medium">User Agent:</span>{" "}
                                {session.user_agent}
                              </p>
                              <p>
                                <span class="font-medium">IP:</span>{" "}
                                {session.ip_address}
                              </p>
                              <p>
                                <span class="font-medium">Ubicación:</span>{" "}
                                {session.location || "No disponible"}
                              </p>
                              <p>
                                <span class="font-medium">Creada:</span>{" "}
                                {formatDate(session.created_at)}
                              </p>
                              <p>
                                <span class="font-medium">Expira:</span>{" "}
                                {formatDate(session.expires_at)}
                              </p>
                            </div>
                          </Show>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </Show>
            </Show>
          </div>
        </div>
      </Show>
    );
  };
  ```
  
  ## File: src/pages/components/status.tsx
  ```typescript
  import { createResource, createSignal, Show } from "solid-js";
  import { get_health } from "@/api/axios";
  import { useAuth } from "@/context/AuthContext";
  export const Status = () => {
    const [open, setOpen] = createSignal(false);
    const [data] = createResource(get_health);
    const { user, loading } = useAuth();
    return (
      <span class="p-1 flex absolute top-1 left-1 rounded-xl">
        <button
          class="btn btn-xs"
          onclick={() => {
            setOpen((e) => !e);
          }}
        >
          {open() ? "<" : ">"}
        </button>
        <Show when={open()}>
          <div class="flex flex-col">
            <div class="flex flex-col">
              <div class="flex">
                <p class="font-mono">server:</p>
                <p>{data.loading ? "🟡" : data()?.status ? "✅" : "⛔"}</p>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="flex">
                <p class="font-mono">logged:</p>
                <p>{loading() ? "🟡" : user() ? "✅" : "⛔"}</p>
              </div>
            </div>
          </div>
        </Show>
      </span>
    );
  };
  ```
  
  ## File: src/pages/components/UserProfile.tsx
  ```typescript
  import { authApi } from "@/api/auth.api";
  import { useAuth } from "@/context/AuthContext";
  import { Show } from "solid-js";
  import { AiOutlineCheckCircle } from "solid-icons/ai";
  export function UserProfile() {
    const { user, refreshUser } = useAuth();
    const handleLogout = async () => {
      await authApi.LogoutRequest().then(() => {
        refreshUser();
        alert("Cerraste sesión");
      });
    };
    return (
      <Show when={user()}>
        <div class="bg-base-200 gap-2 flex flex-col justify-center items-center border-base-300 rounded-box w-xs h-full border py-6">
          <AiOutlineCheckCircle class="size-[30%] text-success" />
          <span class="font-bold">You have successfully logged in</span>
          <div class="gap-2 flex flex-col px-4 text-xs mt-2">
            <span>Id: {user()?.id}</span>
            <span>Username: {user()?.username}</span>
            <span>Is active: {user()?.is_active ? "Yes" : "No"}</span>
            <span>Is admin: {user()?.is_admin ? "Yes" : "No"}</span>
          </div>
          <button type="button" class="btn btn-sm mt-4" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </Show>
    );
  }
  ```
  
  ## File: src/pages/components/Users.tsx
  ```typescript
  import {
    For,
    Show,
    createSignal,
    createResource,
    createEffect,
  } from "solid-js";
  import { createForm } from "@modular-forms/solid";
  import { useAuth } from "@/context/AuthContext";
  import { PasswordInput } from "./PasswordInput";
  import { Input } from "./Input";
  import {
    AiOutlineEdit,
    AiOutlineDelete,
    AiOutlineKey,
    AiOutlineUserAdd,
  } from "solid-icons/ai";
  import {
    UsersApi,
    type UserResponse,
    type UserCreate,
    type UserUpdate,
  } from "@/api/users.api";
  export const Users = () => {
    const { user } = useAuth();
    const [search, setSearch] = createSignal("");
    const [isActive, setIsActive] = createSignal<boolean | undefined>(undefined);
    const [isAdmin, setIsAdmin] = createSignal<boolean | undefined>(undefined);
    const [showAddModal, setShowAddModal] = createSignal(false);
    const [showEditModal, setShowEditModal] = createSignal(false);
    const [showPasswordModal, setShowPasswordModal] = createSignal(false);
    const [selectedUser, setSelectedUser] = createSignal<UserResponse | null>(
      null,
    );
    const [users, { refetch }] = createResource(
      () => ({
        search: search(),
        is_active: isActive(),
        is_admin: isAdmin(),
      }),
      UsersApi.getUsers,
    );
    createEffect(() => {
      refetch();
    });
    const handleAddUser = async (values: UserCreate) => {
      try {
        const trimmedValues = {
          ...values,
          username: values.username.trim(),
        };
        await UsersApi.createUser(trimmedValues);
        refetch();
        setShowAddModal(false);
        alert("Usuario creado exitosamente");
      } catch (error: any) {
        alert(error.response?.data?.detail || "Error al crear usuario");
      }
    };
    const handleUpdateUser = async (values: UserUpdate) => {
      if (!selectedUser()) return;
      try {
        const trimmedValues = { ...values };
        if (trimmedValues.username) {
          trimmedValues.username = trimmedValues.username.trim();
        }
        await UsersApi.updateUser(selectedUser()!.id, trimmedValues);
        refetch();
        setShowEditModal(false);
        alert("Usuario actualizado");
      } catch (error: any) {
        alert(error.response?.data?.detail || "Error al actualizar usuario");
      }
    };
    const handleChangePassword = async (newPassword: string) => {
      if (!selectedUser()) return;
      try {
        await UsersApi.changeUserPassword(selectedUser()!.id, newPassword);
        setShowPasswordModal(false);
        alert("Contraseña cambiada");
      } catch (error: any) {
        alert(error.response?.data?.detail || "Error al cambiar contraseña");
      }
    };
    const handleToggleActive = async (user: UserResponse) => {
      try {
        if (user.is_active) {
          await UsersApi.disableUser(user.id);
          alert("Usuario deshabilitado");
        } else {
          await UsersApi.updateUser(user.id, { is_active: true });
          alert("Usuario habilitado");
        }
        refetch();
      } catch (error: any) {
        alert(error.response?.data?.detail || "Error al cambiar estado");
      }
    };
    const handleDeleteUser = async (user: UserResponse) => {
      if (!confirm(`¿Eliminar a ${user.username}?`)) return;
      try {
        await UsersApi.deleteUser(user.id);
        refetch();
        alert("Usuario eliminado");
      } catch (error: any) {
        alert(error.response?.data?.detail || "Error al eliminar usuario");
      }
    };
    const [, { Form: AddForm, Field: AddField }] = createForm<UserCreate>({
      validateOn: "blur",
      validate: (values) => {
        const errors: Partial<Record<keyof UserCreate, string>> = {};
        const trimmedUsername = values.username?.trim();
        if (!trimmedUsername) errors.username = "Requerido";
        if (!values.password) errors.password = "Requerido";
        if (values.password && values.password.length < 6)
          errors.password = "Mínimo 6 caracteres";
        return errors;
      },
    });
    const [, { Form: EditForm, Field: EditField }] = createForm<UserUpdate>({
      validateOn: "blur",
      initialValues: {
        username: selectedUser()?.username || "",
        is_active: selectedUser()?.is_active,
        is_admin: selectedUser()?.is_admin,
      },
      validate: (values) => {
        const errors: Partial<Record<keyof UserUpdate, string>> = {};
        if (values.username && !values.username.trim()) {
          errors.username = "El nombre no puede estar vacío";
        }
        return errors;
      },
    });
    const [, { Form: PasswordForm, Field: PasswordField }] = createForm<{
      new_password: string;
    }>({
      validateOn: "blur",
      validate: (values) => {
        const errors: Partial<{ new_password: string }> = {};
        if (!values.new_password) errors.new_password = "Requerido";
        if (values.new_password && values.new_password.length < 6)
          errors.new_password = "Mínimo 6 caracteres";
        return errors;
      },
    });
    return (
      <Show
        when={user()}
        fallback={
          <div class="flex justify-center items-center h-64">
            <div class="alert alert-info shadow-lg">
              <span>Por favor, inicia sesión para acceder a esta sección.</span>
            </div>
          </div>
        }
      >
        <Show
          when={user()?.is_admin}
          fallback={
            <div class="flex justify-center items-center h-64">
              <div class="alert alert-error shadow-lg">
                <span>
                  No autorizado. Se requieren permisos de administrador.
                </span>
              </div>
            </div>
          }
        >
          <div class="p-4 col-span-2 mt-10">
            <div class="flex flex-wrap gap-4 items-center justify-between mb-6">
              <div class="flex flex-wrap gap-2 items-center">
                <input
                  type="text"
                  placeholder="Buscar usuario..."
                  class="input input-bordered input-sm w-64"
                  value={search()}
                  onInput={(e) => setSearch(e.currentTarget.value)}
                />
                <label class="label cursor-pointer gap-2">
                  <span class="label-text">Activos</span>
                  <input
                    type="checkbox"
                    class="toggle toggle-sm"
                    checked={isActive() === true}
                    onChange={(e) =>
                      setIsActive(e.currentTarget.checked ? true : undefined)
                    }
                  />
                </label>
                <label class="label cursor-pointer gap-2">
                  <span class="label-text">Administradores</span>
                  <input
                    type="checkbox"
                    class="toggle toggle-sm"
                    checked={isAdmin() === true}
                    onChange={(e) =>
                      setIsAdmin(e.currentTarget.checked ? true : undefined)
                    }
                  />
                </label>
              </div>
              <button
                type="button"
                class="btn btn-primary btn-sm"
                onClick={() => setShowAddModal(true)}
              >
                <AiOutlineUserAdd /> Agregar Usuario
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Activo</th>
                    <th>Admin</th>
                    <th>Creado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <Show when={users.loading}>
                    <tr>
                      <td colspan="6" class="text-center">
                        Cargando...
                      </td>
                    </tr>
                  </Show>
                  <Show when={users.error}>
                    <tr>
                      <td colspan="6" class="text-center text-error">
                        Error al cargar usuarios
                      </td>
                    </tr>
                  </Show>
                  <For each={users()}>
                    {(user) => (
                      <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>
                          <span
                            class={`badge ${user.is_active ? "badge-success" : "badge-error"}`}
                          >
                            {user.is_active ? "Sí" : "No"}
                          </span>
                        </td>
                        <td>
                          <span
                            class={`badge ${user.is_admin ? "badge-primary" : "badge-ghost"}`}
                          >
                            {user.is_admin ? "Sí" : "No"}
                          </span>
                        </td>
                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                        <td class="flex gap-2">
                          <button
                            type="button"
                            class="btn btn-xs btn-outline"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowEditModal(true);
                            }}
                          >
                            <AiOutlineEdit /> Editar
                          </button>
                          <button
                            type="button"
                            class="btn btn-xs btn-outline"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowPasswordModal(true);
                            }}
                          >
                            <AiOutlineKey /> Cambiar contraseña
                          </button>
                          <button
                            type="button"
                            class={`btn btn-xs ${user.is_active ? "btn-warning" : "btn-success"}`}
                            onClick={() => handleToggleActive(user)}
                          >
                            {user.is_active ? "Deshabilitar" : "Habilitar"}
                          </button>
                          <button
                            type="button"
                            class="btn btn-xs btn-error"
                            onClick={() => handleDeleteUser(user)}
                          >
                            <AiOutlineDelete /> Eliminar
                          </button>
                        </td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
            <dialog class={`modal ${showAddModal() ? "modal-open" : ""}`}>
              <div class="modal-box">
                <h3 class="font-bold text-lg">Agregar Usuario</h3>
                <AddForm onSubmit={handleAddUser}>
                  <AddField name="username">
                    {(field, props) => (
                      <Input
                        label="Nombre de usuario"
                        value={field.value}
                        error={field.error}
                        {...props}
                      />
                    )}
                  </AddField>
                  <AddField name="password">
                    {(field, props) => (
                      <PasswordInput
                        label="Contraseña"
                        value={field.value}
                        error={field.error}
                        {...props}
                      />
                    )}
                  </AddField>
                  <AddField name="is_admin" type="boolean">
                    {(field, props) => (
                      <label class="label cursor-pointer gap-2 justify-start">
                        <span class="label-text">Administrador</span>
                        <input
                          type="checkbox"
                          class="checkbox checkbox-primary"
                          checked={field.value || false}
                          onChange={(e) => props.onChange(e)}
                        />
                      </label>
                    )}
                  </AddField>
                  <div class="modal-action">
                    <button type="submit" class="btn btn-primary">
                      Crear
                    </button>
                    <button
                      type="button"
                      class="btn"
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </AddForm>
              </div>
            </dialog>
            <dialog class={`modal ${showEditModal() ? "modal-open" : ""}`}>
              <div class="modal-box">
                <h3 class="font-bold text-lg">Editar Usuario</h3>
                <Show when={selectedUser()}>
                  <EditForm onSubmit={handleUpdateUser}>
                    <EditField name="username">
                      {(field, props) => (
                        <Input
                          label="Nombre de usuario"
                          value={field.value}
                          error={field.error}
                          {...props}
                        />
                      )}
                    </EditField>
                    <EditField name="is_active" type="boolean">
                      {(_, props) => (
                        <label class="label cursor-pointer gap-2 justify-start">
                          <span class="label-text">Activo</span>
                          <input
                            type="checkbox"
                            class="checkbox checkbox-primary"
                            {...props}
                          />
                        </label>
                      )}
                    </EditField>
                    <EditField name="is_admin" type="boolean">
                      {(_, props) => (
                        <label class="label cursor-pointer gap-2 justify-start">
                          <span class="label-text">Administrador</span>
                          <input
                            type="checkbox"
                            class="checkbox checkbox-primary"
                            {...props}
                          />
                        </label>
                      )}
                    </EditField>
                    <div class="modal-action">
                      <button type="submit" class="btn btn-primary">
                        Actualizar
                      </button>
                      <button
                        type="button"
                        class="btn"
                        onClick={() => setShowEditModal(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </EditForm>
                </Show>
              </div>
            </dialog>
            <dialog class={`modal ${showPasswordModal() ? "modal-open" : ""}`}>
              <div class="modal-box">
                <h3 class="font-bold text-lg">Cambiar Contraseña</h3>
                <Show when={selectedUser()}>
                  <p>Usuario: {selectedUser()?.username}</p>
                  <PasswordForm
                    onSubmit={(values) =>
                      handleChangePassword(values.new_password)
                    }
                  >
                    <PasswordField name="new_password">
                      {(field, props) => (
                        <PasswordInput
                          label="Nueva contraseña"
                          value={field.value}
                          error={field.error}
                          {...props}
                        />
                      )}
                    </PasswordField>
                    <div class="modal-action">
                      <button type="submit" class="btn btn-primary">
                        Cambiar
                      </button>
                      <button
                        type="button"
                        class="btn"
                        onClick={() => setShowPasswordModal(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </PasswordForm>
                </Show>
              </div>
            </dialog>
          </div>
        </Show>
      </Show>
    );
  };
  ```
  
  ## File: src/pages/Dashboard.tsx
  ```typescript
  import { useAuth } from "@/context/AuthContext";
  import { UsersList } from "@/features/users/UsersList";
  import { SessionsList } from "@/features/sessions/SessionsList";
  import { LogsViewer } from "@/features/logs/LogsViewer";
  import { SystemTester } from "@/features/system/SystemTester";
  import { StatusBadge } from "@/components/ui/StatusBadge";
  import { AiOutlineLogout } from "solid-icons/ai";
  export default function Dashboard() {
    const { user, logout } = useAuth();
    return (
      <div class="min-h-screen bg-base-200">
        {}
        <div class="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4">
          <div class="flex-1">
            <a class="btn btn-ghost text-xl font-bold">API Test Panel</a>
            <StatusBadge />
          </div>
          <div class="flex-none gap-2">
            <div class="hidden sm:block text-sm text-right mr-2">
              <p class="font-bold">{user()?.username}</p>
              <p class="text-xs text-base-content/70">
                {user()?.is_admin ? "Admin" : "User"}
              </p>
            </div>
            <button
              onClick={logout}
              class="btn btn-square btn-ghost text-error"
              title="Cerrar Sesión"
            >
              <AiOutlineLogout size={24} />
            </button>
          </div>
        </div>
        {}
        <main class="container mx-auto p-4 lg:p-8 space-y-8 max-w-7xl">
          {}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SystemTester />
            {}
          </div>
          {}
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div class="bg-base-100 rounded-box shadow p-4 lg:p-6 overflow-hidden">
              <h2 class="text-2xl font-bold mb-4 border-b pb-2">
                Gestión de Usuarios
              </h2>
              <UsersList />
            </div>
            <div class="bg-base-100 rounded-box shadow p-4 lg:p-6 overflow-hidden">
              <h2 class="text-2xl font-bold mb-4 border-b pb-2">
                Sesiones Activas
              </h2>
              <SessionsList />
            </div>
          </div>
          {}
          <div class="bg-base-100 rounded-box shadow p-4 lg:p-6 overflow-hidden">
            <h2 class="text-2xl font-bold mb-4 border-b pb-2">
              Registros del Sistema (Logs)
            </h2>
            <LogsViewer />
          </div>
        </main>
      </div>
    );
  }
  ```
  
  ## File: src/pages/Login.tsx
  ```typescript
  import { authApi } from "@/api/auth.api";
  import { useAuth } from "@/context/AuthContext";
  import { createForm, type SubmitHandler } from "@modular-forms/solid";
  import { createSignal, createEffect, Show } from "solid-js";
  import { Input } from "@/components/ui/Input";
  import { PasswordInput } from "@/components/ui/PasswordInput";
  import { useNavigate } from "@solidjs/router";
  type LoginFormValues = {
    username: string;
    password: string;
  };
  export default function Login() {
    const navigate = useNavigate();
    const { user, refreshUser } = useAuth();
    const [loading, setLoading] = createSignal(false);
    const [checkingAuth, setCheckingAuth] = createSignal(true);
    createEffect(() => {
      if (user()) {
        navigate("/", { replace: true });
      } else {
        setCheckingAuth(false);
      }
    });
    const [_, { Form, Field }] = createForm<LoginFormValues>({
      validateOn: "blur",
    });
    const handleLogin: SubmitHandler<LoginFormValues> = async (values) => {
      try {
        setLoading(true);
        await authApi.LoginRequest(values.username, values.password);
        await refreshUser();
        navigate("/");
      } catch (error) {
        setLoading(false);
      }
    };
    return (
      <div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <Show
          when={!checkingAuth() && !user()}
          fallback={
            <div class="flex justify-center items-center">
              <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>
          }
        >
          <Form
            onSubmit={handleLogin}
            class="card bg-base-100 w-full max-w-sm shadow-xl border border-base-300"
          >
            <div class="card-body p-6">
              <h2 class="card-title text-2xl font-black justify-center mb-4">
                API Test Panel
              </h2>
              <Field name="username">
                {(field, props) => (
                  <Input
                    label="Nombre de usuario"
                    disabled={loading()}
                    value={field.value}
                    error={field.error}
                    loading={loading()}
                    {...props}
                  />
                )}
              </Field>
              <Field name="password">
                {(field, props) => (
                  <PasswordInput
                    label="Contraseña"
                    disabled={loading()}
                    value={field.value}
                    error={field.error}
                    loading={loading()}
                    {...props}
                  />
                )}
              </Field>
              <div class="card-actions mt-6">
                <button
                  type="submit"
                  class="btn btn-primary w-full text-white"
                  disabled={loading()}
                >
                  {loading() ? "Iniciando sesión..." : "Ingresar"}
                </button>
              </div>
            </div>
          </Form>
        </Show>
      </div>
    );
  }
  ```
  
  ## File: src/pages/Missing.tsx
  ```typescript
  import { A } from "@solidjs/router";
  import { FiHome } from "solid-icons/fi";
  export default function Missing() {
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
  ```
  
  ## File: src/pages/NotFound.tsx
  ```typescript
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
  ```
  
  ## File: tsconfig.app.json
  ```json
  {
    "compilerOptions": {
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
      "target": "ES2022",
      "useDefineForClassFields": true,
      "module": "ESNext",
      "lib": ["ES2022", "DOM", "DOM.Iterable"],
      "types": ["vite/client"],
      "skipLibCheck": true,
  
      /* Bundler mode */
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "verbatimModuleSyntax": true,
      "moduleDetection": "force",
      "noEmit": true,
      "jsx": "preserve",
      "jsxImportSource": "solid-js",
  
      /* Linting */
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "erasableSyntaxOnly": true,
      "noFallthroughCasesInSwitch": true,
      "noUncheckedSideEffectImports": true,
  
      /* Alias */
      "paths": {
        "@/*": ["./src/*"],
      },
    },
    "include": ["src"],
  }
  ```
  
  ## File: tsconfig.json
  ```json
  {
    "files": [],
    "references": [
      { "path": "./tsconfig.app.json" },
      { "path": "./tsconfig.node.json" },
    ],
  }
  ```
  
  ## File: tsconfig.node.json
  ```json
  {
    "compilerOptions": {
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
      "target": "ES2023",
      "lib": ["ES2023"],
      "module": "ESNext",
      "types": ["node"],
      "skipLibCheck": true,
  
      /* Bundler mode */
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "verbatimModuleSyntax": true,
      "moduleDetection": "force",
      "noEmit": true,
  
      /* Linting */
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "erasableSyntaxOnly": true,
      "noFallthroughCasesInSwitch": true,
      "noUncheckedSideEffectImports": true,
    },
    "include": ["vite.config.ts"],
  }
  ```
  
  ## File: vite.config.ts
  ```typescript
  import tailwindcss from "@tailwindcss/vite";
  import solid from "vite-plugin-solid";
  import { defineConfig } from "vite";
  export default defineConfig({
    plugins: [tailwindcss(), solid()],
    resolve: {
      alias: { "@": "/src" },
    },
  });
  ```
