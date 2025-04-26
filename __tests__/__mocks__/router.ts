import { vi } from "vitest";

export const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  pathname: "/",
  query: {},
};

export const mockUseRouter = () => mockRouter;
export const mockUsePathname = () => "/";

export default {
  useRouter: mockUseRouter,
  usePathname: mockUsePathname,
};