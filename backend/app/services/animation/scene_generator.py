from typing import List, Dict, Any
from backend.app.models.domain import VisualScene

class AnimationSceneEngine:
    """
    Deterministic educational animation engine.
    Translates high-level educational scene instructions into SVG/Canvas coordinate scripts
    that can be rendered deterministically by the frontend without expensive GPU video rendering.
    """

    @staticmethod
    def get_default_scenes_for_concept(concept: str) -> List[VisualScene]:
        concept_lower = concept.lower()
        if "photo" in concept_lower:
            return [
                VisualScene(
                    scene=1,
                    title="The Warm Sun Appears",
                    description="The bright yellow sun rises and casts warm golden light.",
                    visual_elements=["sun", "sky", "soil", "sprout"],
                    animation_action="sun_glow",
                    caption="Step 1: The sun shines warm light.",
                    duration_seconds=3
                ),
                VisualScene(
                    scene=2,
                    title="Sunlight Reaches the Leaves",
                    description="Golden photon rays stream downward from the sun into the leaves.",
                    visual_elements=["sun_rays", "leaves", "stem"],
                    animation_action="sunlight_to_plant",
                    caption="Step 2: Sunlight reaches the green leaves.",
                    duration_seconds=4
                ),
                VisualScene(
                    scene=3,
                    title="Roots Absorb Water",
                    description="Blue water droplets move from soil upward through roots.",
                    visual_elements=["roots", "water_droplets", "soil"],
                    animation_action="water_up_roots",
                    caption="Step 3: Roots drink water from the soil.",
                    duration_seconds=4
                ),
                VisualScene(
                    scene=4,
                    title="Leaves Take In Carbon Dioxide",
                    description="Air particles (CO2) enter tiny openings in the leaf surface.",
                    visual_elements=["air_particles", "leaf_stomata"],
                    animation_action="co2_into_leaf",
                    caption="Step 4: Leaves breathe in carbon dioxide from the air.",
                    duration_seconds=4
                ),
                VisualScene(
                    scene=5,
                    title="The Plant Makes Food",
                    description="Sunlight, water, and air combine inside green chloroplasts to create sweet sugar.",
                    visual_elements=["chloroplast", "glucose_sparkles"],
                    animation_action="make_food_sparkle",
                    caption="Step 5: The plant makes sweet food (sugar) to grow big and strong.",
                    duration_seconds=4
                ),
                VisualScene(
                    scene=6,
                    title="Fresh Oxygen Released",
                    description="Clean oxygen bubbles float out of the leaves into the sky.",
                    visual_elements=["oxygen_bubbles", "happy_tree", "breeze"],
                    animation_action="oxygen_released",
                    caption="Step 6: The plant gives off fresh oxygen for us to breathe!",
                    duration_seconds=4
                )
            ]
        elif "water" in concept_lower:
            return [
                VisualScene(
                    scene=1,
                    title="Sun Warms Lake",
                    description="The hot sun shines on the water surface.",
                    visual_elements=["sun", "lake", "steam"],
                    animation_action="evaporation_rise",
                    caption="Step 1: Warm sun turns lake water into vapor.",
                    duration_seconds=3
                ),
                VisualScene(
                    scene=2,
                    title="Clouds Form",
                    description="Water vapor rises high into the sky and cools into clouds.",
                    visual_elements=["clouds", "sky"],
                    animation_action="cloud_condensation",
                    caption="Step 2: Water vapor cools and forms clouds.",
                    duration_seconds=4
                ),
                VisualScene(
                    scene=3,
                    title="Rain Falls",
                    description="Clouds grow heavy and drop rain back down.",
                    visual_elements=["rain", "cloud", "ground"],
                    animation_action="precipitation_rain",
                    caption="Step 3: Rain falls back to Earth.",
                    duration_seconds=4
                )
            ]
        elif "fraction" in concept_lower:
            return [
                VisualScene(
                    scene=1,
                    title="One Whole Pizza",
                    description="A whole uncut cheese pizza.",
                    visual_elements=["whole_pizza", "board"],
                    animation_action="whole_object",
                    caption="Step 1: One whole complete pizza.",
                    duration_seconds=4
                ),
                VisualScene(
                    scene=2,
                    title="Two Equal Halves (1/2)",
                    description="Cutting the pizza in half.",
                    visual_elements=["pizza_halves", "knife"],
                    animation_action="cut_half",
                    caption="Step 2: Cut down the middle into 2 equal halves (1/2).",
                    duration_seconds=4
                ),
                VisualScene(
                    scene=3,
                    title="Four Equal Quarters (1/4)",
                    description="Cutting into 4 quarter slices.",
                    visual_elements=["pizza_quarters"],
                    animation_action="cut_quarter",
                    caption="Step 3: Cut again into 4 equal quarters (1/4).",
                    duration_seconds=4
                )
            ]
        elif "solar" in concept_lower or "planet" in concept_lower or "earth" in concept_lower:
            return [
                VisualScene(
                    scene=1,
                    title="The Sun at Center",
                    description="Giant warm star shining in space.",
                    visual_elements=["sun", "stars"],
                    animation_action="sun_center",
                    caption="Step 1: The giant Sun shines at the center.",
                    duration_seconds=4
                ),
                VisualScene(
                    scene=2,
                    title="Earth Orbiting the Sun",
                    description="Blue Earth orbiting around the Sun.",
                    visual_elements=["sun", "earth", "orbit"],
                    animation_action="planet_orbit",
                    caption="Step 2: Earth travels in an orbit around the Sun.",
                    duration_seconds=4
                ),
                VisualScene(
                    scene=3,
                    title="Moon Circling Earth",
                    description="The Moon circling Earth.",
                    visual_elements=["earth", "moon"],
                    animation_action="moon_orbit",
                    caption="Step 3: The Moon circles around Earth.",
                    duration_seconds=4
                )
            ]
        elif "gravity" in concept_lower or "fall" in concept_lower:
            return [
                VisualScene(
                    scene=1,
                    title="Apple on Tree",
                    description="A ripe red apple rests on a tree branch.",
                    visual_elements=["tree", "apple", "sky"],
                    animation_action="apple_on_tree",
                    caption="Step 1: The apple rests high on the tree branch.",
                    duration_seconds=4
                ),
                VisualScene(
                    scene=2,
                    title="Gravity Pulls Downward",
                    description="The apple drops straight down pulled by invisible gravity.",
                    visual_elements=["falling_apple", "gravity_arrows", "grass"],
                    animation_action="apple_falling",
                    caption="Step 2: Earth's invisible gravity pulls the apple down!",
                    duration_seconds=4
                ),
                VisualScene(
                    scene=3,
                    title="Safe on the Ground",
                    description="The apple rests safely on Earth's green grass.",
                    visual_elements=["apple_ground", "grass", "smile"],
                    animation_action="apple_on_ground",
                    caption="Step 3: Gravity holds everything safely on Earth.",
                    duration_seconds=4
                )
            ]
        elif "shape" in concept_lower or "color" in concept_lower:
            return [
                VisualScene(scene=1, title="Round Circle (Sun)", description="A bright yellow round circle.", visual_elements=["circle"], animation_action="shape_circle", caption="Step 1: A circle is completely round with no corners, like the sun!", duration_seconds=4),
                VisualScene(scene=2, title="Four-Sided Square", description="A blue square with 4 equal sides.", visual_elements=["square"], animation_action="shape_square", caption="Step 2: A square has 4 equal straight sides, like a picture frame.", duration_seconds=4),
                VisualScene(scene=3, title="Three-Cornered Triangle", description="A red triangle with 3 pointy corners.", visual_elements=["triangle"], animation_action="shape_triangle", caption="Step 3: A triangle has 3 pointy corners, like a delicious pizza slice!", duration_seconds=4)
            ]
        elif "count" in concept_lower or "number" in concept_lower:
            return [
                VisualScene(scene=1, title="One Apple (1)", description="One red apple.", visual_elements=["apple_1"], animation_action="counting_apple_1", caption="Step 1: Here is ONE red apple. (1)", duration_seconds=4),
                VisualScene(scene=2, title="Two Apples (2)", description="Two red apples.", visual_elements=["apple_2"], animation_action="counting_apple_2", caption="Step 2: Add one more. Now we have TWO apples! (1, 2)", duration_seconds=4),
                VisualScene(scene=3, title="Three Apples (3)", description="Three red apples.", visual_elements=["apple_3"], animation_action="counting_apple_3", caption="Step 3: Add another. Now we have THREE apples! (1, 2, 3)", duration_seconds=4)
            ]
        elif "matter" in concept_lower or "solid" in concept_lower or "liquid" in concept_lower or "gas" in concept_lower:
            return [
                VisualScene(scene=1, title="Solid Ice Cube", description="Rigid solid ice cube.", visual_elements=["ice_cube"], animation_action="matter_solid_ice", caption="Step 1: Solid! Ice is hard, cold, and holds its own rigid shape.", duration_seconds=4),
                VisualScene(scene=2, title="Liquid Melting Water", description="Melting liquid water.", visual_elements=["water_liquid"], animation_action="matter_liquid_water", caption="Step 2: Liquid! Warmth melts ice into water that pours and splashes freely.", duration_seconds=4),
                VisualScene(scene=3, title="Gas Rising Steam", description="Rising steam gas vapor.", visual_elements=["steam_gas"], animation_action="matter_gas_steam", caption="Step 3: Gas! Heated water turns into steam that floats freely in the air.", duration_seconds=4)
            ]
        elif "magnet" in concept_lower or "pole" in concept_lower:
            return [
                VisualScene(scene=1, title="Bar Magnet (N and S)", description="North and South poles.", visual_elements=["magnet"], animation_action="magnet_single_bar", caption="Step 1: Every magnet has two ends: a North pole (N) and a South pole (S).", duration_seconds=4),
                VisualScene(scene=2, title="Opposite Poles Attract!", description="North attracts South.", visual_elements=["attract"], animation_action="magnet_attract_poles", caption="Step 2: Opposite poles pull together (Attract)!", duration_seconds=4),
                VisualScene(scene=3, title="Like Poles Repel!", description="North pushes North.", visual_elements=["repel"], animation_action="magnet_repel_poles", caption="Step 3: Same poles push away from each other (Repel)!", duration_seconds=4)
            ]
        elif "acid" in concept_lower or "base" in concept_lower or "litmus" in concept_lower:
            return [
                VisualScene(scene=1, title="Sour Acid (Litmus Red)", description="Acid turns litmus red.", visual_elements=["acid_beaker"], animation_action="acid_litmus_red", caption="Step 1: Acids! Lemon juice is sour. Dipping litmus turns it RED!", duration_seconds=4),
                VisualScene(scene=2, title="Slippery Base (Litmus Blue)", description="Base turns litmus blue.", visual_elements=["base_beaker"], animation_action="base_litmus_blue", caption="Step 2: Bases! Soapy water is slippery. Dipping litmus turns it BLUE!", duration_seconds=4),
                VisualScene(scene=3, title="Neutralization to Salt", description="Acid + Base neutralization.", visual_elements=["salt_crystals"], animation_action="neutralization_salt", caption="Step 3: Neutralization! Acid + Base combine into safe Salt and Water!", duration_seconds=4)
            ]
        elif "circulat" in concept_lower or "heart" in concept_lower or "blood" in concept_lower:
            return [
                VisualScene(scene=1, title="Four Heart Chambers", description="The 4 heart chambers.", visual_elements=["heart_chambers"], animation_action="circulatory_four_chambers", caption="Step 1: The heart has 4 rooms: 2 atria on top and 2 strong ventricles below.", duration_seconds=4),
                VisualScene(scene=2, title="Oxygen in the Lungs", description="Blood taking oxygen in lungs.", visual_elements=["lungs_oxygen"], animation_action="circulatory_lung_oxygen", caption="Step 2: Blood visits the lungs, takes in fresh oxygen, and turns bright red!", duration_seconds=4),
                VisualScene(scene=3, title="Pumping to Whole Body", description="Pumping blood to organs.", visual_elements=["body_pump"], animation_action="circulatory_body_pulse", caption="Step 3: The powerful heart pumps oxygen-rich blood to your brain, arms, and legs!", duration_seconds=4)
            ]
        elif "electric" in concept_lower or "ohm" in concept_lower or "volt" in concept_lower or "circuit" in concept_lower:
            return [
                VisualScene(scene=1, title="Battery Pushes Current", description="Voltage push from battery.", visual_elements=["battery_voltage"], animation_action="circuit_battery_push", caption="Step 1: Voltage! The battery provides the push (V) that starts electrical flow.", duration_seconds=4),
                VisualScene(scene=2, title="Resistor Controls Speed", description="Resistance regulating flow.", visual_elements=["resistor"], animation_action="circuit_resistor_flow", caption="Step 2: Resistance! The resistor (R) gently controls how much current can pass.", duration_seconds=4),
                VisualScene(scene=3, title="Glowing Light Bulb", description="Ohm's law powers bulb.", visual_elements=["glowing_bulb"], animation_action="circuit_bulb_light", caption="Step 3: Ohm's Law in Action: V = I * R powers the glowing light bulb!", duration_seconds=4)
            ]
        elif "trig" in concept_lower or "triangle" in concept_lower or "hypotenuse" in concept_lower:
            return [
                VisualScene(scene=1, title="Right Triangle Parts", description="Opposite, Adjacent, Hypotenuse.", visual_elements=["right_triangle"], animation_action="trig_triangle_parts", caption="Step 1: The right triangle! The longest side is the Hypotenuse slide.", duration_seconds=4),
                VisualScene(scene=2, title="Looking Up at Angle θ", description="Angle of elevation to tree.", visual_elements=["angle_theta"], animation_action="trig_angle_view", caption="Step 2: Looking up at angle θ! The tree is the Opposite side; ground is Adjacent.", duration_seconds=4),
                VisualScene(scene=3, title="Calculating Height", description="Tangent ratio gives height.", visual_elements=["height_result"], animation_action="trig_solve_height", caption="Step 3: Math magic! Tangent lets us calculate tree height without climbing!", duration_seconds=4)
            ]

        # Universal Procedural Fallback for ANY Topic
        return [
            VisualScene(scene=1, title=f"Discovering {concept}", description=f"Initial observation of {concept}.", visual_elements=["intro_graphic"], animation_action="generic_stage_intro", caption=f"Step 1: Welcome to {concept}! Let's observe how it begins.", duration_seconds=4),
            VisualScene(scene=2, title=f"How {concept} Works", description=f"Process flow of {concept}.", visual_elements=["process_flow"], animation_action="generic_stage_process", caption=f"Step 2: Notice how {concept} transforms and moves step-by-step.", duration_seconds=4),
            VisualScene(scene=3, title=f"Mastering {concept}", description=f"Completed understanding of {concept}.", visual_elements=["completion_star"], animation_action="generic_stage_result", caption=f"Step 3: Great job! Now we understand the wonder of {concept}!", duration_seconds=4)
        ]

animation_scene_engine = AnimationSceneEngine()
