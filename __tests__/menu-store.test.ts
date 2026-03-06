/**
 * Tests for the menu store: lib/menu-store.ts
 *
 * Covers:
 * - Returns fallback config when env vars are missing
 * - Fetches menu URLs from Google Drive folder listing
 * - Returns proxy URLs for each menu type
 * - Handles missing files gracefully (partial results)
 * - Handles Drive API errors gracefully
 * - Returns most recent file for each menu type
 */

// Mock googleapis
const mockList = jest.fn();
jest.mock("googleapis", () => ({
  google: {
    drive: jest.fn(() => ({
      files: {
        list: mockList,
      },
    })),
  },
}));

import { getMenuConfig } from "@/lib/menu-store";

describe("getMenuConfig", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      GOOGLE_DRIVE_FOLDER_ID: "test-folder-id",
      GOOGLE_API_KEY: "test-api-key",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  // ========================================
  // Fallback behavior
  // ========================================

  describe("Fallback config", () => {
    it("returns fallback when GOOGLE_DRIVE_FOLDER_ID is missing", async () => {
      delete process.env.GOOGLE_DRIVE_FOLDER_ID;

      const config = await getMenuConfig();

      expect(config.dessertMenu).toBe("/dessert_menu.jpg");
      expect(config.drinkMenu).toBe("/drink_menu.jpg");
      expect(mockList).not.toHaveBeenCalled();
    });

    it("returns fallback when GOOGLE_API_KEY is missing", async () => {
      delete process.env.GOOGLE_API_KEY;

      const config = await getMenuConfig();

      expect(config.dessertMenu).toBe("/dessert_menu.jpg");
      expect(config.drinkMenu).toBe("/drink_menu.jpg");
      expect(mockList).not.toHaveBeenCalled();
    });

    it("returns fallback when Drive API throws an error", async () => {
      mockList.mockRejectedValue(new Error("API unavailable"));

      const config = await getMenuConfig();

      expect(config.dessertMenu).toBe("/dessert_menu.jpg");
      expect(config.drinkMenu).toBe("/drink_menu.jpg");
    });
  });

  // ========================================
  // Successful Drive listing
  // ========================================

  describe("Drive folder listing", () => {
    it("returns proxy URLs for both menu types", async () => {
      mockList.mockResolvedValue({
        data: {
          files: [
            { id: "dessert-id-1", name: "dessert_menu_1700000000.jpg", createdTime: "2026-01-15T10:00:00Z" },
            { id: "drink-id-1", name: "drink_menu_1700000000.jpg", createdTime: "2026-01-14T10:00:00Z" },
          ],
        },
      });

      const config = await getMenuConfig();

      expect(config.dessertMenu).toBe("/api/image/dessert-id-1");
      expect(config.drinkMenu).toBe("/api/image/drink-id-1");
    });

    it("returns most recent file for each type (first match since sorted desc)", async () => {
      mockList.mockResolvedValue({
        data: {
          files: [
            { id: "dessert-new", name: "dessert_menu_1700002000.jpg", createdTime: "2026-01-16T10:00:00Z" },
            { id: "dessert-old", name: "dessert_menu_1700001000.jpg", createdTime: "2026-01-15T10:00:00Z" },
            { id: "drink-new", name: "drink_menu_1700002000.jpg", createdTime: "2026-01-16T09:00:00Z" },
          ],
        },
      });

      const config = await getMenuConfig();

      expect(config.dessertMenu).toBe("/api/image/dessert-new");
      expect(config.drinkMenu).toBe("/api/image/drink-new");
    });

    it("returns fallback for missing menu type when only one exists", async () => {
      mockList.mockResolvedValue({
        data: {
          files: [
            { id: "drink-id-1", name: "drink_menu_1700000000.jpg", createdTime: "2026-01-14T10:00:00Z" },
          ],
        },
      });

      const config = await getMenuConfig();

      expect(config.dessertMenu).toBe("/dessert_menu.jpg"); // fallback
      expect(config.drinkMenu).toBe("/api/image/drink-id-1");
    });

    it("returns fallback for both when folder is empty", async () => {
      mockList.mockResolvedValue({
        data: { files: [] },
      });

      const config = await getMenuConfig();

      expect(config.dessertMenu).toBe("/dessert_menu.jpg");
      expect(config.drinkMenu).toBe("/drink_menu.jpg");
    });

    it("skips files with missing id or name", async () => {
      mockList.mockResolvedValue({
        data: {
          files: [
            { id: null, name: "dessert_menu_1.jpg", createdTime: "2026-01-15T10:00:00Z" },
            { id: "drink-id", name: null, createdTime: "2026-01-15T10:00:00Z" },
            { id: "real-dessert", name: "dessert_menu_2.jpg", createdTime: "2026-01-14T10:00:00Z" },
          ],
        },
      });

      const config = await getMenuConfig();

      expect(config.dessertMenu).toBe("/api/image/real-dessert");
      expect(config.drinkMenu).toBe("/drink_menu.jpg"); // fallback — the drink file had null name
    });

    it("sets lastUpdated from the most recent file", async () => {
      mockList.mockResolvedValue({
        data: {
          files: [
            { id: "dessert-id", name: "dessert_menu_1.jpg", createdTime: "2026-02-20T12:00:00Z" },
            { id: "drink-id", name: "drink_menu_1.jpg", createdTime: "2026-02-18T12:00:00Z" },
          ],
        },
      });

      const config = await getMenuConfig();

      expect(config.lastUpdated).toBe("2026-02-20T12:00:00Z");
    });

    it("handles null files response", async () => {
      mockList.mockResolvedValue({
        data: { files: null },
      });

      const config = await getMenuConfig();

      expect(config.dessertMenu).toBe("/dessert_menu.jpg");
      expect(config.drinkMenu).toBe("/drink_menu.jpg");
    });

    it("queries the correct Drive folder", async () => {
      mockList.mockResolvedValue({ data: { files: [] } });

      await getMenuConfig();

      expect(mockList).toHaveBeenCalledWith(
        expect.objectContaining({
          q: expect.stringContaining("'test-folder-id' in parents"),
          orderBy: "createdTime desc",
        })
      );
    });
  });
});
