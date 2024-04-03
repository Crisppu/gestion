export { default } from "next-auth/middleware"

// export const config = { matcher: ["/dashboard",'/otrasRutasmas'] } //si solo querremos proteger una ruta especifica
export const config = { matcher: ["/dashboard/:path*",'/otrasRutasmas/:path*'] } //todas las sub carpetas estaran protegidas