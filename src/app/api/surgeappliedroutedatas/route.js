import dbConnect from "@/lib/dbConnect";
import SurgeAppliedRouteData from "@/models/surgeAppliedRouteDataSchema";

// GET: Fetch all entries
export async function GET() {
  try {
    await dbConnect();
    const data = await SurgeAppliedRouteData.find({});
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}

// POST: Add new entry
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const requiredFields = ["source", "destination", "tripType", "carType", "total_price", "appliedSurgeSlug"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(
          JSON.stringify({ success: false, message: `Missing required field: ${field}` }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    const newData = new SurgeAppliedRouteData(body);
    const savedData = await newData.save();

    return new Response(JSON.stringify({ success: true, data: savedData }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}