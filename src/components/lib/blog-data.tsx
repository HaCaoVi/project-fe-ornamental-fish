// Sample blog data - replace with your actual data source (CMS, database, etc.)

export interface BlogPost {
    slug: string
    title: string
    description: string
    image: string
    author: string
    date: string
    category: string
    content: string
}

const blogPosts: BlogPost[] = [
    {
        slug: "beginner-guide-tropical-fish",
        title: "The Complete Beginner's Guide to Tropical Fish",
        description:
            "Everything you need to know to start your tropical fish aquarium journey, from choosing the right tank to selecting compatible fish species.",
        image: "/colorful-tropical-fish-in-aquarium.jpg",
        author: "Sarah Johnson",
        date: "March 15, 2024",
        category: "care-tips",
        content: `
      <h2>Getting Started with Tropical Fish</h2>
      <p>Starting a tropical fish aquarium is an exciting journey that brings the beauty of underwater life into your home. This comprehensive guide will walk you through everything you need to know.</p>
      
      <h3>Choosing Your First Tank</h3>
      <p>The size of your tank matters more than you might think. A larger tank (20-30 gallons) is actually easier to maintain than a smaller one because the water chemistry remains more stable.</p>
      
      <blockquote>
        <p>"The best advice I can give new aquarists is to start with a tank that's larger than you think you need. Your fish will thank you, and maintenance becomes much easier."</p>
      </blockquote>
      
      <h3>Essential Equipment</h3>
      <ul>
        <li><strong>Filter:</strong> Choose a filter rated for at least 1.5x your tank volume</li>
        <li><strong>Heater:</strong> Tropical fish need consistent temperatures between 75-80°F</li>
        <li><strong>Lighting:</strong> LED lights are energy-efficient and great for plant growth</li>
        <li><strong>Test Kit:</strong> Monitor ammonia, nitrite, nitrate, and pH levels</li>
      </ul>
      
      <h3>The Nitrogen Cycle</h3>
      <p>Before adding fish, your tank needs to establish beneficial bacteria that convert harmful ammonia into less toxic compounds. This process takes 4-6 weeks.</p>
      
      <h3>Selecting Compatible Fish</h3>
      <p>Research is key! Some great beginner-friendly tropical fish include:</p>
      <ol>
        <li>Neon Tetras - peaceful schooling fish</li>
        <li>Guppies - colorful and easy to care for</li>
        <li>Corydoras Catfish - excellent bottom cleaners</li>
        <li>Platies - hardy and come in many colors</li>
      </ol>
      
      <p>Remember to add fish gradually, starting with just a few hardy species and building up your community over several weeks.</p>
    `,
    },
    {
        slug: "best-fish-food-nutrition",
        title: "Best Fish Food: A Complete Nutrition Guide",
        description:
            "Learn about different types of fish food and how to create a balanced diet that keeps your aquatic pets healthy and vibrant.",
        image: "/fish-food-flakes-and-pellets.jpg",
        author: "Michael Chen",
        date: "March 12, 2024",
        category: "food",
        content: `
      <h2>Understanding Fish Nutrition</h2>
      <p>Proper nutrition is the foundation of fish health. Different species have different dietary needs, and understanding these requirements is crucial for maintaining a thriving aquarium.</p>
      
      <h3>Types of Fish Food</h3>
      <p>There are several main categories of fish food, each with its own benefits:</p>
      
      <h4>Flake Food</h4>
      <p>The most common type of fish food, flakes are suitable for most tropical fish. They float on the surface initially, then slowly sink, making them accessible to fish at different water levels.</p>
      
      <h4>Pellets</h4>
      <p>Available in floating and sinking varieties, pellets are more nutrient-dense than flakes and create less waste. They're excellent for larger fish.</p>
      
      <h4>Frozen Food</h4>
      <p>Frozen foods like bloodworms, brine shrimp, and daphnia provide excellent nutrition and are closer to a fish's natural diet.</p>
      
      <h3>Feeding Schedule</h3>
      <p>Most fish should be fed once or twice daily, with only as much food as they can consume in 2-3 minutes. Overfeeding is one of the most common mistakes in fishkeeping.</p>
      
      <blockquote>
        <p>"A slightly underfed fish is healthier than an overfed one. When in doubt, feed less."</p>
      </blockquote>
    `,
    },
    {
        slug: "aquarium-setup-step-by-step",
        title: "Aquarium Setup: Step-by-Step Installation Guide",
        description:
            "Follow our detailed guide to set up your aquarium correctly from day one, ensuring a healthy environment for your fish.",
        image: "/modern-aquarium-setup-with-plants.jpg",
        author: "Emily Rodriguez",
        date: "March 10, 2024",
        category: "aquarium-setup",
        content: `
      <h2>Setting Up Your Aquarium</h2>
      <p>Proper aquarium setup is crucial for long-term success. Follow these steps to create the perfect aquatic environment.</p>
      
      <h3>Step 1: Choose Your Location</h3>
      <p>Select a sturdy, level surface away from direct sunlight and heat sources. Ensure the stand can support the weight of a filled tank (approximately 10 pounds per gallon).</p>
      
      <h3>Step 2: Clean Everything</h3>
      <p>Rinse the tank, decorations, and substrate with clean water. Never use soap or chemicals, as residue can harm fish.</p>
      
      <h3>Step 3: Add Substrate</h3>
      <p>Add 1-2 inches of gravel or sand. Rinse thoroughly before adding to remove dust and debris.</p>
      
      <h3>Step 4: Install Equipment</h3>
      <ul>
        <li>Place the filter according to manufacturer instructions</li>
        <li>Install the heater near water flow for even heat distribution</li>
        <li>Position the thermometer where it's easy to read</li>
      </ul>
      
      <h3>Step 5: Add Decorations and Plants</h3>
      <p>Arrange rocks, driftwood, and plants to create hiding spots and visual interest. Live plants help maintain water quality.</p>
      
      <h3>Step 6: Fill with Water</h3>
      <p>Add dechlorinated water slowly to avoid disturbing the substrate. Fill to about an inch below the rim.</p>
    `,
    },
    {
        slug: "betta-fish-care-guide",
        title: "Betta Fish Care: Everything You Need to Know",
        description:
            "Discover the secrets to keeping beautiful, healthy betta fish with proper tank setup, feeding, and maintenance.",
        image: "/colorful-betta-fish.jpg",
        author: "David Kim",
        date: "March 8, 2024",
        category: "species",
        content: `
      <h2>Caring for Betta Fish</h2>
      <p>Betta fish, also known as Siamese fighting fish, are stunning creatures that deserve proper care despite common misconceptions about their needs.</p>
      
      <h3>Tank Requirements</h3>
      <p>Contrary to popular belief, bettas need more than a tiny bowl. A minimum 5-gallon tank with a filter and heater is essential for their wellbeing.</p>
      
      <h3>Water Parameters</h3>
      <ul>
        <li>Temperature: 76-82°F</li>
        <li>pH: 6.5-7.5</li>
        <li>Ammonia/Nitrite: 0 ppm</li>
        <li>Nitrate: Below 20 ppm</li>
      </ul>
      
      <h3>Feeding Your Betta</h3>
      <p>Bettas are carnivores and need a protein-rich diet. Feed high-quality betta pellets once or twice daily, supplemented with frozen bloodworms or brine shrimp.</p>
    `,
    },
    {
        slug: "common-fish-diseases-treatment",
        title: "Common Fish Diseases and How to Treat Them",
        description:
            "Identify and treat the most common fish diseases to keep your aquarium inhabitants healthy and thriving.",
        image: "/healthy-aquarium-fish.jpg",
        author: "Dr. Lisa Martinez",
        date: "March 5, 2024",
        category: "health",
        content: `
      <h2>Fish Disease Prevention and Treatment</h2>
      <p>Recognizing and treating fish diseases early is crucial for maintaining a healthy aquarium. Here are the most common issues and their solutions.</p>
      
      <h3>Ich (White Spot Disease)</h3>
      <p>Characterized by small white spots on the fish's body and fins. Treat by raising the temperature to 86°F and adding aquarium salt or ich medication.</p>
      
      <h3>Fin Rot</h3>
      <p>Bacterial infection causing frayed, discolored fins. Improve water quality and treat with antibacterial medication.</p>
      
      <h3>Prevention is Key</h3>
      <ul>
        <li>Maintain excellent water quality</li>
        <li>Quarantine new fish for 2-4 weeks</li>
        <li>Avoid overfeeding</li>
        <li>Perform regular water changes</li>
      </ul>
    `,
    },
    {
        slug: "planted-aquarium-guide",
        title: "Creating a Stunning Planted Aquarium",
        description: "Transform your tank into a lush underwater garden with our comprehensive guide to planted aquariums.",
        image: "/planted-aquarium-with-green-plants.jpg",
        author: "Sarah Johnson",
        date: "March 1, 2024",
        category: "aquarium-setup",
        content: `
      <h2>The Art of Planted Aquariums</h2>
      <p>A planted aquarium is not only beautiful but also provides numerous benefits for your fish, including improved water quality and natural hiding spots.</p>
      
      <h3>Choosing the Right Plants</h3>
      <p>Start with easy, low-light plants like Java Fern, Anubias, and Amazon Sword. These hardy species are perfect for beginners.</p>
      
      <h3>Lighting Requirements</h3>
      <p>Most aquarium plants need 8-10 hours of light daily. LED lights are energy-efficient and provide the spectrum plants need for photosynthesis.</p>
      
      <h3>Substrate and Fertilization</h3>
      <p>Use nutrient-rich substrate or add root tabs for plants that feed through their roots. Liquid fertilizers supplement nutrients in the water column.</p>
    `,
    },
]

export function getAllBlogPosts(): BlogPost[] {
    return blogPosts
}

export function getBlogPost(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogSlugs(): string[] {
    return blogPosts.map((post) => post.slug)
}

export function getAdjacentPosts(currentSlug: string): { previous: BlogPost | null; next: BlogPost | null } {
    const currentIndex = blogPosts.findIndex((post) => post.slug === currentSlug)

    return {
        previous: currentIndex > 0 ? blogPosts[currentIndex - 1] : null,
        next: currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null,
    }
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
    return blogPosts.filter((post) => post.slug !== currentSlug && post.category === category).slice(0, limit)
}
