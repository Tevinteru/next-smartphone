import { vi } from "vitest";

export const mockSession = {
  data: null,
  status: "unauthenticated",
};

export const mockUseSession = vi.fn(() => mockSession);

export const setMockSession = (session: typeof mockSession) => {
  mockSession.data = session.data;
  mockSession.status = session.status;
};

export default {
  useSession: mockUseSession,
};