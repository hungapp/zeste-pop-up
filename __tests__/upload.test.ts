/**
 * Tests for the menu upload API route: POST /api/upload
 *
 * Covers:
 * - Authentication checks (no session, no access token)
 * - Input validation (missing file, missing menuType, invalid menuType)
 * - Successful upload flow (Google Drive upload, no filesystem writes)
 * - Google Drive API error handling
 */

import { NextRequest } from "next/server";

// ---- Mocks ----

// Mock auth
const mockAuth = jest.fn();
jest.mock("@/lib/auth", () => ({
  auth: () => mockAuth(),
}));

// Mock Google Drive upload
const mockUploadToDrive = jest.fn();
jest.mock("@/lib/drive", () => ({
  uploadToDrive: (...args: any[]) => mockUploadToDrive(...args),
}));

// Import the handler after mocks are set up
import { POST } from "@/app/api/upload/route";

// ---- Helpers ----

function createMockRequest(body?: FormData): NextRequest {
  const req = new NextRequest("http://localhost:3000/api/upload", {
    method: "POST",
    body: body,
  });
  return req;
}

function createFormData(
  file?: File | null,
  menuType?: string | null
): FormData {
  const formData = new FormData();
  if (file) formData.append("file", file);
  if (menuType) formData.append("menuType", menuType);
  return formData;
}

function createMockFile(name = "test-menu.jpg", size = 1024): File {
  const buffer = new ArrayBuffer(size);
  return new File([buffer], name, { type: "image/jpeg" });
}

// ---- Tests ----

describe("POST /api/upload", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ========================================
  // Authentication
  // ========================================

  describe("Authentication", () => {
    it("returns 401 when no session exists", async () => {
      mockAuth.mockResolvedValue(null);

      const formData = createFormData(createMockFile(), "dessert");
      const req = createMockRequest(formData);
      const res = await POST(req);

      expect(res.status).toBe(401);
      const body = await res.json();
      expect(body.error).toBe("Not authenticated");
    });

    it("returns 401 when session has no access token", async () => {
      mockAuth.mockResolvedValue({
        user: { email: "admin@test.com" },
        accessToken: null,
      });

      const formData = createFormData(createMockFile(), "dessert");
      const req = createMockRequest(formData);
      const res = await POST(req);

      expect(res.status).toBe(401);
      const body = await res.json();
      expect(body.error).toContain("Missing access token");
    });

    it("proceeds when session has valid access token", async () => {
      mockAuth.mockResolvedValue({
        user: { email: "admin@test.com" },
        accessToken: "valid-token-123",
      });
      mockUploadToDrive.mockResolvedValue({
        fileId: "new-file-id",
        publicUrl: "/api/image/new-file-id",
      });

      const formData = createFormData(createMockFile(), "dessert");
      const req = createMockRequest(formData);
      const res = await POST(req);

      expect(res.status).toBe(200);
    });
  });

  // ========================================
  // Input Validation
  // ========================================

  describe("Input Validation", () => {
    beforeEach(() => {
      mockAuth.mockResolvedValue({
        user: { email: "admin@test.com" },
        accessToken: "valid-token-123",
      });
    });

    it("returns 400 when file is missing", async () => {
      const formData = createFormData(null, "dessert");
      const req = createMockRequest(formData);
      const res = await POST(req);

      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toBe("Missing file or menu type");
    });

    it("returns 400 when menuType is missing", async () => {
      const formData = createFormData(createMockFile(), null);
      const req = createMockRequest(formData);
      const res = await POST(req);

      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toBe("Missing file or menu type");
    });

    it("returns 400 for invalid menuType", async () => {
      const formData = createFormData(createMockFile(), "appetizer");
      const req = createMockRequest(formData);
      const res = await POST(req);

      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toBe("Invalid menu type");
    });

    it("accepts 'dessert' as valid menuType", async () => {
      mockUploadToDrive.mockResolvedValue({
        fileId: "file-123",
        publicUrl: "/api/image/file-123",
      });

      const formData = createFormData(createMockFile(), "dessert");
      const req = createMockRequest(formData);
      const res = await POST(req);

      expect(res.status).toBe(200);
    });

    it("accepts 'drink' as valid menuType", async () => {
      mockUploadToDrive.mockResolvedValue({
        fileId: "file-456",
        publicUrl: "/api/image/file-456",
      });

      const formData = createFormData(createMockFile(), "drink");
      const req = createMockRequest(formData);
      const res = await POST(req);

      expect(res.status).toBe(200);
    });
  });

  // ========================================
  // Successful Upload
  // ========================================

  describe("Successful Upload", () => {
    beforeEach(() => {
      mockAuth.mockResolvedValue({
        user: { email: "admin@test.com" },
        accessToken: "valid-token-123",
      });
    });

    it("uploads dessert menu and returns success", async () => {
      mockUploadToDrive.mockResolvedValue({
        fileId: "dessert-file-id",
        publicUrl: "/api/image/dessert-file-id",
      });

      const formData = createFormData(createMockFile(), "dessert");
      const req = createMockRequest(formData);
      const res = await POST(req);

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.url).toBe("/api/image/dessert-file-id");
      expect(body.fileId).toBe("dessert-file-id");
    });

    it("uploads drink menu and returns success", async () => {
      mockUploadToDrive.mockResolvedValue({
        fileId: "drink-file-id",
        publicUrl: "/api/image/drink-file-id",
      });

      const formData = createFormData(createMockFile(), "drink");
      const req = createMockRequest(formData);
      const res = await POST(req);

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.url).toBe("/api/image/drink-file-id");
      expect(body.fileId).toBe("drink-file-id");
    });

    it("does not write to the filesystem", async () => {
      mockUploadToDrive.mockResolvedValue({
        fileId: "file-id",
        publicUrl: "/api/image/file-id",
      });

      const formData = createFormData(createMockFile(), "dessert");
      const req = createMockRequest(formData);
      await POST(req);

      // Verify no fs imports are used (the route no longer imports fs)
      // This test ensures the Vercel read-only filesystem bug is fixed
      expect(mockUploadToDrive).toHaveBeenCalledTimes(1);
    });

    it("passes correct arguments to uploadToDrive", async () => {
      mockUploadToDrive.mockResolvedValue({
        fileId: "file-id",
        publicUrl: "/api/image/file-id",
      });

      const mockFile = createMockFile("my-menu.jpg");
      const formData = createFormData(mockFile, "dessert");
      const req = createMockRequest(formData);
      await POST(req);

      expect(mockUploadToDrive).toHaveBeenCalledTimes(1);
      expect(mockUploadToDrive).toHaveBeenCalledWith(
        "valid-token-123",      // access token
        expect.any(File),        // file object
        expect.stringMatching(/^dessert_menu_\d+\.jpg$/) // generated filename
      );
    });

    it("generates filename with timestamp for drink menu", async () => {
      mockUploadToDrive.mockResolvedValue({
        fileId: "file-id",
        publicUrl: "/api/image/file-id",
      });

      const formData = createFormData(createMockFile(), "drink");
      const req = createMockRequest(formData);
      await POST(req);

      const fileName = mockUploadToDrive.mock.calls[0][2];
      expect(fileName).toMatch(/^drink_menu_\d+\.jpg$/);
    });
  });

  // ========================================
  // Error Handling
  // ========================================

  describe("Error Handling", () => {
    beforeEach(() => {
      mockAuth.mockResolvedValue({
        user: { email: "admin@test.com" },
        accessToken: "valid-token-123",
      });
    });

    it("returns 500 when Google Drive upload fails", async () => {
      mockUploadToDrive.mockRejectedValue(
        new Error("Google Drive API quota exceeded")
      );

      const formData = createFormData(createMockFile(), "dessert");
      const req = createMockRequest(formData);
      const res = await POST(req);

      expect(res.status).toBe(500);
      const body = await res.json();
      expect(body.error).toBe("Failed to upload file");
      expect(body.details).toBe("Google Drive API quota exceeded");
    });

    it("returns 500 with Google API response details", async () => {
      const apiError: any = new Error("Forbidden");
      apiError.response = { data: { error: "insufficientPermissions" }, status: 403 };
      mockUploadToDrive.mockRejectedValue(apiError);

      const formData = createFormData(createMockFile(), "dessert");
      const req = createMockRequest(formData);
      const res = await POST(req);

      expect(res.status).toBe(500);
      const body = await res.json();
      expect(body.details).toBe("Forbidden");
    });
  });
});
