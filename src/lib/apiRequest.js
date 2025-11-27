
// Function to make a POST request
async function makePostRequest(endpoint, data, resourceName, reset) {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    console.log("Request Data:", JSON.stringify(data));

    const response = await fetch(`${baseURL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log("Server Response:", result);

    if (response.ok) {
      return { success: true, data: result };
    } else {
      if (response.status === 400) {
        // console.error("Validation Error:", result.message);
        return { success: false, message: result.message || "Validation Error" };
      }
      return { success: false, message: "Something went wrong. Please try again." };
    }
  } catch (error) {
    console.error("An error occurred during the POST request:", error);
    throw new Error(error.message);
  }
}


// Function to fetch coupons
async function fetchCoupons(endpoint) {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(`${baseURL}/${endpoint}`);
    const result = await response.json();

    if (response.ok) {
      // Success response
      toast.success("Coupons fetched successfully!");
      return result.data;
    } else {
      toast.error(result.error || "Failed to fetch coupons. Please try again.");
    }
  } catch (error) {
    toast.error(`An error occurred: ${error.message}`);
  }
}

// Export both functions (use named exports)
export { makePostRequest, fetchCoupons };
