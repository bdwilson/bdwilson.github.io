// Cloudflare Worker — deploy at dash.cloudflare.com > Workers > Create
// Two modes:
//   ?slug=central_nc          → 302 redirect to image (for Hubitat image tiles)
//   ?slug=central_nc&json=1   → JSON {url, recorded_at} with CORS headers (for dashboard)

const ALLOWED_SLUGS = new Set([
  "central_nc",
  "forecast_7day_wral_raleigh",
  "radar_nc2d",
  "plots_rainfall24hours_dma2d",
]);

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
};

export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug || !ALLOWED_SLUGS.has(slug)) {
      return new Response(
        "Missing or unknown slug. Valid values: " + [...ALLOWED_SLUGS].join(", "),
        { status: 400, headers: CORS }
      );
    }

    const apiRes = await fetch(
      `https://api.wral.com/wxdata/v2/maps/frames?slug=${slug}`
    );

    if (!apiRes.ok) {
      return new Response("WRAL API error: " + apiRes.status, { status: 502, headers: CORS });
    }

    const json = await apiRes.json();
    const frame = json.data.frames[0];

    if (searchParams.get("json")) {
      return new Response(
        JSON.stringify({ url: frame.url, recorded_at: frame.recorded_at }),
        { status: 200, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    return Response.redirect(frame.url, 302);
  },
};
