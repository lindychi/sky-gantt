import "@testing-library/jest-dom";

// 기본 mock 구현
const mockSupabaseClient = {
  from: jest.fn().mockReturnValue({
    select: jest.fn().mockResolvedValue({ data: [], error: null }),
    insert: jest.fn().mockResolvedValue({ data: null, error: null }),
    update: jest.fn().mockResolvedValue({ data: null, error: null }),
    delete: jest.fn().mockResolvedValue({ data: null, error: null }),
    upsert: jest.fn().mockResolvedValue({ data: null, error: null }),
  }),
  auth: {
    signIn: jest
      .fn()
      .mockResolvedValue({ user: null, session: null, error: null }),
    signOut: jest.fn().mockResolvedValue({ error: null }),
    onAuthStateChange: jest.fn().mockReturnValue({
      data: null,
      error: null,
      unsubscribe: jest.fn(),
    }),
    getSession: jest
      .fn()
      .mockResolvedValue({ data: { session: null }, error: null }),
  },
  storage: {
    from: jest.fn().mockReturnValue({
      upload: jest.fn().mockResolvedValue({ data: null, error: null }),
      download: jest.fn().mockResolvedValue({ data: null, error: null }),
      remove: jest.fn().mockResolvedValue({ data: null, error: null }),
    }),
  },
};

// Supabase 모듈 mock
jest.mock("@/supabase", () => ({
  supabase: mockSupabaseClient,
}));

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));
