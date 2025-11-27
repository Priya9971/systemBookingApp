import dbConnect from "@/lib/dbConnect";
import SurgeData from "@/models/surgeDataSchema"; // Create this schema

// GET: Fetch all surge data
export async function GET() {
  try {
    await dbConnect();
    const surgeData = await SurgeData.find({});
    return new Response(JSON.stringify({ success: true, data: surgeData }), {
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

// POST: Create new surge entry
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const {
      startDate,
      endDate,
      taxiType,
      surgeFareType,
      sourceCity,
      destinationCity,
      appliedDateTime,
      breakOn,
    } = body;

    // Validate required fields
    if (!startDate || !endDate || !sourceCity || !destinationCity) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create a new surgeData entry
    const newSurgeData = new SurgeData({
      startDate,
      endDate,
      taxiType,
      surgeFareType,
      sourceCity,
      destinationCity,
      appliedDateTime,
      breakOn,
    });

    const savedSurge = await newSurgeData.save();

    return new Response(JSON.stringify({ success: true, data: savedSurge }), {
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
