// Compatibility for frozen authentication/registration/passport routes.
// Registration capability only; never the shared migration connection.
export { registrationDb as prisma } from './db-capabilities';
