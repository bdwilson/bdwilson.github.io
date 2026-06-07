// Cloudflare Worker — deploy at dash.cloudflare.com > Workers
// Returns a 302 redirect to the latest WRAL weather image for a given slug.
// Usage: https://your-worker.your-subdomain.workers.dev/?slug=central_nc

const ALLOWED_SLUGS = new Set([
  "central_nc",
  "forecast_7day_wral_raleigh",
  "radar_nc2d",
  "plots_rainfall24hours_dma2d",
]);

export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug || !ALLOWED_SLUGS.has(slug)) {
      return new Response(
        "Missing or unknown slug. Valid values: " + [...ALLOWED_SLUGS].join(", "),
        { status: 400 }
      );
    }

    const apiRes = await fetch(
      `https://api.wral.com/wxdata/v2/maps/frames?slug=${slug}`
    );

    if (!apiRes.ok) {
      return new Response("WRAL API error: " + apiRes.status, { status: 502 });
    }

    const json = await apiRes.json();
    const imageUrl = json.data.frames[0].url;

    return Response.redirect(imageUrl, 302);
  },
};
