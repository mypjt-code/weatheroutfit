import { fetchKmaWeather } from "@/lib/kmaWeather";
import { mockWeatherData } from "@/lib/mockWeather";
import { getLocationName } from "@/lib/locationGrid";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const location = url.searchParams.get("location")?.trim() || "판교";
	const normalizedLocation = getLocationName(location);

	try {
		const weather = await fetchKmaWeather(normalizedLocation);
		return Response.json({ ...weather, source: "kma" });
	} catch (error) {
		console.error("[API Weather] KMA API Error:", error);
		return Response.json(
			{ ...mockWeatherData, city: location, source: "mock" },
			{ status: 200 }
		);
	}
}