import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

// POST — Save a new scan
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, imageUrl, diseaseName, scientificName, confidence, severity, symptoms, treatments, prevention, proTip, isHealthy } = body;

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const supabase = createServiceClient();

        const { data, error } = await supabase
            .from("scans")
            .insert({
                user_id: userId,
                image_url: imageUrl || null,
                disease_name: diseaseName || "Unknown",
                scientific_name: scientificName || null,
                confidence: confidence || 0,
                severity: severity || "Unknown",
                symptoms: symptoms || [],
                treatments: treatments || {},
                prevention: prevention || [],
                pro_tip: proTip || null,
                is_healthy: isHealthy || false,
            })
            .select()
            .single();

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ scan: data });
    } catch (err) {
        console.error("Save scan error:", err);
        return NextResponse.json({ error: "Failed to save scan" }, { status: 500 });
    }
}

// GET — Fetch scans for a user
export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const supabase = createServiceClient();

        const { data, error } = await supabase
            .from("scans")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
            .limit(20);

        if (error) {
            console.error("Supabase fetch error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ scans: data });
    } catch (err) {
        console.error("Fetch scans error:", err);
        return NextResponse.json({ error: "Failed to fetch scans" }, { status: 500 });
    }
}
