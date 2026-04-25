import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params;

    if (!fileId) {
      return NextResponse.json({ error: "File ID required" }, { status: 400 });
    }

    // Use Google Drive's direct download URL for publicly shared files
    // This requires the folder and files to be set to "Anyone with the link can view"
    const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    // Fetch the image from Google Drive
    // Note: fetch automatically follows redirects by default
    const response = await fetch(driveUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      redirect: "follow", // Explicitly follow redirects
    });

    if (!response.ok) {
      console.error(`Failed to fetch from Drive: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        {
          error: "Failed to fetch image from Drive",
          status: response.status,
          hint: "Make sure the Google Drive folder is set to 'Anyone with the link can view'"
        },
        { status: response.status }
      );
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    // Return the image with proper caching headers
    return new NextResponse(Buffer.from(imageBuffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    console.error("Error proxying image from Drive:", error.message);

    return NextResponse.json(
      { error: "Failed to proxy image", details: error.message },
      { status: 500 }
    );
  }
}
