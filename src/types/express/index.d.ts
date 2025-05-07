// types/express/index.d.ts
export {}; // ensures this file is treated as a module

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}
