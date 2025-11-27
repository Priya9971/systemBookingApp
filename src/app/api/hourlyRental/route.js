import dbConnect from "@/lib/dbConnect";
import HourlyRental from "@/models/HourlyRental";

// ✅ GET: Fetch all hourly rentals
export async function GET() {
  try {
    await dbConnect();

    const hourlyRentals = await HourlyRental.find({}).lean();

    return new Response(
      JSON.stringify({ success: true, data: hourlyRentals }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Error fetching hourly rentals:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ✅ POST: Add a new hourly rental
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const {
      source,
      package: rentalPackage,
      carType,
      carModel,
      fuel_type,
      per_km_charges,
      extra_km,
      base_fare,
      actual_fare,
      extra_hour,
      night_charges,
      status,
      slug,
    } = body;

    // ✅ Sanitize & normalize numeric fields
    const sanitizedData = {
      source: source?.trim(),
      package: rentalPackage?.trim(),
      carType: carType?.trim(),
      carModel: carModel?.trim(),
      fuel_type: fuel_type?.trim(),
      per_km_charges: Number(per_km_charges) || 0,
      extra_km: Number(extra_km) || 0,
      base_fare: Number(base_fare) || 0,
      actual_fare: Number(actual_fare) || 0,
      extra_hour: Number(extra_hour) || 0,
      night_charges: Number(night_charges) || 0,
      status: status || "Active",
      slug: slug || `${source?.toLowerCase()?.replace(/\s+/g, "-")}-${Date.now()}`,
    };

    // ✅ Validate required fields
    if (
      !sanitizedData.source ||
      !sanitizedData.package ||
      !sanitizedData.carType ||
      !sanitizedData.fuel_type
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing required fields: source, package, carType, or fuel_type.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newHourlyRental = new HourlyRental(sanitizedData);
    const savedHourlyRental = await newHourlyRental.save();

    return new Response(
      JSON.stringify({ success: true, data: savedHourlyRental }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Error creating hourly rental:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
