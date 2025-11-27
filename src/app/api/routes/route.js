import dbConnect from "@/lib/dbConnect";
import Route from "@/models/routeSchema";

// GET: Fetch all routes
export async function GET() {
  try {
    await dbConnect();
    const routes = await Route.find({});
    return new Response(JSON.stringify({ success: true, data: routes }), {
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

// POST: Create a new route
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Destructure the request body
    const {
      source,
      destination,
      basekm,
      per_km_charges,
      per_km_extra_charges,
      driver_charges_perday,
      tripType,
      carType,
      carModel,
      basic_type,
      fuel_type,
      toll_tax,
      airport_parking,
      state_tax,
      night_charges,
      gst,
      total_price,
      isState_tax_include,
      isAirport_parking,
      status,
      slug,
    } = body;

    // Basic validation
    if (!source || !destination || !tripType || !carType || !total_price) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create a new route entry
    const newRoute = new Route({
      source,
      destination,
      basekm,
      per_km_charges,
      per_km_extra_charges,
      driver_charges_perday,
      tripType,
      carType,
      carModel,
      basic_type,
      fuel_type,
      toll_tax,
      airport_parking,
      state_tax,
      night_charges,
      gst,
      total_price,
      isState_tax_include,
      isAirport_parking,
      status,
      slug,
    });

    // Save route to the database
    const savedRoute = await newRoute.save();

    return new Response(JSON.stringify({ success: true, data: savedRoute }), {
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
