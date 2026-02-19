export interface Disease {
    id: string;
    name: string;
    scientificName: string;
    confidence: number;
    severity: "Low" | "Moderate" | "Critical";
    isContagious: boolean;
    symptoms: string[];
    causes: string[];
    organicControl: string[];
    chemicalControl: string[];
    prevention: string[];
    image: string;
}

export const diseases: Record<string, Disease> = {
    "tomato-blight": {
        id: "tomato-blight",
        name: "Late Blight",
        scientificName: "Phytophthora infestans",
        confidence: 96,
        severity: "Critical",
        isContagious: true,
        symptoms: [
            "Large, irregular grey-green spots on leaves",
            "White fungal growth on undersides in humid weather",
            "Brown rotting fruit"
        ],
        causes: [
            "High humidity and cool temperatures",
            "Poor air circulation",
            "Infected soil or transplants"
        ],
        organicControl: [
            "Remove and destroy all infected plant parts immediately",
            "Apply copper-based fungicides",
            "Neem oil spray can help early stages"
        ],
        chemicalControl: [
            "Fungicides containing chlorothalonil or mancozeb",
            "Apply preventative sprays before symptoms appear"
        ],
        prevention: [
            "Water at the base of the plant, not the leaves",
            "Rotate crops annually",
            "Space plants for good airflow"
        ],
        image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=800"
    },
    "early-blight": {
        id: "early-blight",
        name: "Tomato Early Blight",
        scientificName: "Alternaria solani",
        confidence: 98,
        severity: "Moderate",
        isContagious: true,
        symptoms: [
            "Dark concentric rings on lower leaves",
            "Yellowing around spots",
            "Premature leaf drop"
        ],
        causes: [
            "Warm, wet weather",
            "Overhead watering",
            "Infected plant debris"
        ],
        organicControl: [
            "Remove infected lower leaves immediately using sterilized shears to stop spread",
            "Apply neem oil spray weekly",
            "Mulch around base to prevent soil splash"
        ],
        chemicalControl: [
            "Apply copper fungicide or neem oil spray every 7-10 days",
            "Chlorothalonil-based fungicides as preventative"
        ],
        prevention: [
            "Rotate crops every 2-3 years",
            "Water at base, never overhead",
            "Ensure good air circulation"
        ],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDx-XuttUDtUwZ-eKhTAhd3eQ-33IpZaFjfv4aOO6gxfTS2Z_04O0dMKaZEsRentaGiohXl386wJp0mKTp0GFD6K2RR8vNvvCOf21XjmvFYx2-NryzlejHLrZrxutBAajYSUIVJhs_vpvLb3aeN232MNmy5zg1zbF94JdmRIbsQ0sgoxltHPOKdCsjNPvnGpiueZUyUt6AhNFoR4HvjkUwa1odo2biw-HxzHzVmDyjQt-Xj6GLemr6PyRPjn5Hyw1RnBwlcgBhUQso"
    },
    "powdery-mildew": {
        id: "powdery-mildew",
        name: "Powdery Mildew",
        scientificName: "Podosphaera xanthii",
        confidence: 89,
        severity: "Moderate",
        isContagious: true,
        symptoms: [
            "White powdery spots on leaves and stems",
            "Leaves turning yellow and drying out",
            "Distorted growth"
        ],
        causes: [
            "High humidity at night, low humidity during day",
            "Crowded planting",
            "Shade"
        ],
        organicControl: [
            "Milk spray (40% milk, 60% water)",
            "Baking soda solution",
            "Potassium bicarbonate"
        ],
        chemicalControl: [
            "Sulfur-based fungicides",
            "Myclobutanil"
        ],
        prevention: [
            "Plant resistant varieties",
            "Ensure full sun exposure",
            "Avoid excess nitrogen fertilizer"
        ],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Powdery_mildew_on_cucumber.jpg/800px-Powdery_mildew_on_cucumber.jpg"
    }
};

export function getDiseaseById(id: string): Disease | null {
    return diseases[id] || null;
}
