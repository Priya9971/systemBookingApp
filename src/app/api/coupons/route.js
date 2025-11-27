import dbConnect from "@/lib/dbConnect";
import Coupon from "@/models/Coupon";

// GET: Fetch all coupons
export async function GET() {
    try {
        await dbConnect();
        const coupons = await Coupon.find();
        return new Response(JSON.stringify({ success: true, data: coupons }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

// POST: Create a new coupon
export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();

        const {
            couponName,
            code,
            discount,
            image,
            startDate,
            endDate,
            status,
            slug,
        } = body;

        // Validate required fields
        if (!couponName || !code || !discount || !startDate || !endDate) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing required fields." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Check if code already exists
        const existing = await Coupon.findOne({ code });
        if (existing) {
            return new Response(
                JSON.stringify({ success: false, message: "Coupon code already exists." }),
                { status: 409, headers: { "Content-Type": "application/json" } }
            );
        }

        const newCoupon = new Coupon({
            couponName,
            code,
            discount,
            image,
            startDate,
            endDate,
            status,
            slug,
        });

        const savedCoupon = await newCoupon.save();

        return new Response(JSON.stringify({ success: true, data: savedCoupon }), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
