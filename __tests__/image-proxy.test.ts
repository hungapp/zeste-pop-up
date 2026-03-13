/**
 * Tests for the image proxy API route: GET /api/image/[fileId]
 *
 * Covers:
 * - Missing fileId
 * - Successful image proxy from Google Drive
 * - Google Drive fetch failures (404, 500)
 * - Correct caching headers
 * - Content-type passthrough
 */

import { NextRequest } from "next/server";
import { GET } from "@/app/api/image/[fileId]/route";

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// ---- Helpers ----

function createMockRequest(fileId: string): NextRequest {
  return new NextRequest(`http://localhost:3000/api/image/${fileId}`, {
    method: "GET",
  });
}

function createParams(fileId: string): Promise<{ fileId: string }> {
  return Promise.resolve({ fileId });
}

function createMockImageResponse(
  status = 200,
  contentType = "image/jpeg"
): Response {
  const imageBuffer = new ArrayBuffer(256);
  return new Response(imageBuffer, {
    status,
    statusText: status === 200 ? "OK" : "Not Found",
    headers: {
      "content-type": contentType,
    },
  });
}

// ---- Tests ----

describe("GET /api/image/[fileId]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ========================================
  // Input Validation
  // ========================================

  describe("Input Validation", () => {
    it("returns 400 when fileId is empty", async () => {
      const req = createMockRequest("");
      const res = await GET(req, { params: createParams("") });

      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toBe("File ID required");
    });
  });

  // ========================================
  // Successful Proxy
  // ========================================

  describe("Successful Proxy", () => {
    it("fetches image from Google Drive and returns it", async () => {
      mockFetch.mockResolvedValue(createMockImageResponse());

      const req = createMockRequest("abc123");
      const res = await GET(req, { params: createParams("abc123") });

      expect(res.status).toBe(200);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://drive.google.com/uc?export=download&id=abc123",
        expect.objectContaining({
          method: "GET",
          redirect: "follow",
        })
      );
    });

    it("sets correct caching headers", async () => {
      mockFetch.mockResolvedValue(createMockImageResponse());

      const req = createMockRequest("abc123");
      const res = await GET(req, { params: createParams("abc123") });

      expect(res.headers.get("Cache-Control")).toBe(
        "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800"
      );
      expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
    });

    it("passes through content-type from Google Drive", async () => {
      mockFetch.mockResolvedValue(createMockImageResponse(200, "image/png"));

      const req = createMockRequest("abc123");
      const res = await GET(req, { params: createParams("abc123") });

      expect(res.headers.get("Content-Type")).toBe("image/png");
    });

    it("defaults to image/jpeg when no content-type header", async () => {
      const response = new Response(new ArrayBuffer(256), {
        status: 200,
        headers: {},
      });
      mockFetch.mockResolvedValue(response);

      const req = createMockRequest("abc123");
      const res = await GET(req, { params: createParams("abc123") });

      expect(res.headers.get("Content-Type")).toBe("image/jpeg");
    });
  });

  // ========================================
  // Error Handling
  // ========================================

  describe("Error Handling", () => {
    it("returns error status when Google Drive returns 404", async () => {
      const errorResponse = new Response(null, {
        status: 404,
        statusText: "Not Found",
      });
      // Make .ok return false
      mockFetch.mockResolvedValue(errorResponse);

      const req = createMockRequest("nonexistent-id");
      const res = await GET(req, { params: createParams("nonexistent-id") });

      expect(res.status).toBe(404);
      const body = await res.json();
      expect(body.error).toBe("Failed to fetch image from Drive");
    });

    it("returns error status when Google Drive returns 403", async () => {
      const errorResponse = new Response(null, {
        status: 403,
        statusText: "Forbidden",
      });
      mockFetch.mockResolvedValue(errorResponse);

      const req = createMockRequest("private-file");
      const res = await GET(req, { params: createParams("private-file") });

      expect(res.status).toBe(403);
      const body = await res.json();
      expect(body.hint).toContain("Anyone with the link");
    });

    it("returns 500 when fetch throws a network error", async () => {
      mockFetch.mockRejectedValue(new Error("Network timeout"));

      const req = createMockRequest("abc123");
      const res = await GET(req, { params: createParams("abc123") });

      expect(res.status).toBe(500);
      const body = await res.json();
      expect(body.error).toBe("Failed to proxy image");
      expect(body.details).toBe("Network timeout");
    });
  });
});
