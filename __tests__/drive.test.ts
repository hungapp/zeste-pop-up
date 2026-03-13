/**
 * Tests for the Google Drive upload utility: lib/drive.ts
 *
 * Covers:
 * - Successful file upload to Drive
 * - OAuth credential setup
 * - File naming and parent folder assignment
 * - Public URL generation (proxy route)
 * - API error handling
 */

// Mock googleapis
const mockCreate = jest.fn();
jest.mock("googleapis", () => ({
  google: {
    auth: {
      OAuth2: jest.fn().mockImplementation(() => ({
        setCredentials: jest.fn(),
      })),
    },
    drive: jest.fn(() => ({
      files: {
        create: mockCreate,
      },
    })),
  },
}));

import { uploadToDrive } from "@/lib/drive";
import { google } from "googleapis";

// ---- Helpers ----

function createMockFile(name = "test.jpg", size = 1024): File {
  const buffer = new ArrayBuffer(size);
  return new File([buffer], name, { type: "image/jpeg" });
}

// ---- Tests ----

describe("uploadToDrive", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      GOOGLE_CLIENT_ID: "test-client-id",
      GOOGLE_CLIENT_SECRET: "test-client-secret",
      GOOGLE_DRIVE_FOLDER_ID: "test-folder-id",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("sets OAuth credentials with the provided access token", async () => {
    mockCreate.mockResolvedValue({
      data: { id: "file-123", webViewLink: "https://drive.google.com/file/123" },
    });

    await uploadToDrive("my-access-token", createMockFile(), "menu.jpg");

    const OAuth2Instance = (google.auth.OAuth2 as unknown as jest.Mock).mock
      .results[0].value;
    expect(OAuth2Instance.setCredentials).toHaveBeenCalledWith({
      access_token: "my-access-token",
    });
  });

  it("uploads file with correct name and parent folder", async () => {
    mockCreate.mockResolvedValue({
      data: { id: "file-123" },
    });

    await uploadToDrive("token", createMockFile(), "dessert_menu_123.jpg");

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        requestBody: expect.objectContaining({
          name: "dessert_menu_123.jpg",
          parents: ["test-folder-id"],
        }),
      })
    );
  });

  it("omits parents when GOOGLE_DRIVE_FOLDER_ID is not set", async () => {
    delete process.env.GOOGLE_DRIVE_FOLDER_ID;
    mockCreate.mockResolvedValue({
      data: { id: "file-123" },
    });

    await uploadToDrive("token", createMockFile(), "menu.jpg");

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        requestBody: expect.objectContaining({
          name: "menu.jpg",
          parents: undefined,
        }),
      })
    );
  });

  it("returns proxy URL (not direct Drive URL)", async () => {
    mockCreate.mockResolvedValue({
      data: {
        id: "file-abc",
        webViewLink: "https://drive.google.com/file/abc/view",
      },
    });

    const result = await uploadToDrive("token", createMockFile(), "menu.jpg");

    expect(result.fileId).toBe("file-abc");
    expect(result.publicUrl).toBe("/api/image/file-abc");
    expect(result.webViewLink).toBe("https://drive.google.com/file/abc/view");
  });

  it("throws error when Drive API returns no fileId", async () => {
    mockCreate.mockResolvedValue({
      data: { id: null },
    });

    await expect(
      uploadToDrive("token", createMockFile(), "menu.jpg")
    ).rejects.toThrow("Failed to upload file");
  });

  it("propagates Google Drive API errors", async () => {
    mockCreate.mockRejectedValue(new Error("Rate limit exceeded"));

    await expect(
      uploadToDrive("token", createMockFile(), "menu.jpg")
    ).rejects.toThrow("Rate limit exceeded");
  });
});
