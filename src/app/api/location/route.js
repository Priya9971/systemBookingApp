import dbConnect from "@/lib/dbConnect";
import Location from "@/models/locationSchema"; 

// GET: Fetch all locations
export async function GET() {
  try {
    await dbConnect();
    const locations = await Location.find({});
    return new Response(JSON.stringify({ success: true, data: locations }), {
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

// POST: Create a new location
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Destructure the request body
    const {
      tripType,
      distance,
      duration,
      pickupLocation,
      dropLocation,
      pickupDate,
      returnDate,
    } = body;

    // Validate required fields
    if (!tripType || !pickupLocation || !dropLocation || !pickupDate || !duration) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create a new location entry
    const newLocation = new Location({
      tripType,
      distance,
      duration,
      pickupLocation,
      dropLocation,
      pickupDate,
      returnDate: returnDate || null, // Optional for one-way trips
    });

    // Save location in the database
    const savedLocation = await newLocation.save();

    return new Response(JSON.stringify({ success: true, data: savedLocation }), {
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
