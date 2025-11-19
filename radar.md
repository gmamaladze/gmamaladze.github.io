---
layout: cv
title: George Mamaladze - Technology Radar
permalink: /radar
---

# George Mamaladze
![George Mamaladze](picture.png){: .profile-image}

---

<div style="text-align: center;" markdown="1">
[Classic View](./classic){: .download-link}
[Download PDF](George_Mamaladze_CV.pdf){: .download-link}
</div>

<link rel="stylesheet" href="{{ '/radar.css' | relative_url }}">

## Technology Radar

This **Personal Technology Radar** is inspired by the well-know [Thoughtworks Technology Radar](https://www.thoughtworks.com/en-us/radar/faq). Just like the original, it helps visualize and structure the evolution of the technologies I use, explore, and evaluate. It serves as a **living map** of my technical landscape — showing what I rely on today, what I’m experimenting with, and what I may revisit in the future.

### Purpose of This Radar

- Track what I *actually* use vs. what I *want to explore*.  
- Make intentional decisions about adopting, archiving, or trialing technologies.  
- Maintain a clear, structured view of my technical growth.  
- Serve as a personal reference over time.

This radar will evolve as I learn, adopt, or phase out technologies — acting as a dynamic snapshot of my engineering landscape.

### Quadrants

The radar uses the same four quadrants as Thoughtworks:

| Quadrant | Meaning |
|---------|---------|
| **Techniques** | Approaches, design principles, architectural patterns, workflow methods, and engineering practices. |
| **Tools** | Software tools, utilities, CLIs, editors, assistants, and development helpers used in day-to-day work. |
| **Platforms** | Execution environments, cloud platforms, operating systems, infrastructure products, runtimes. |
| **Languages & Frameworks** | Programming languages, backend/frontend frameworks, libraries, and major ecosystem stacks. |

## Rings

My rings differ from Thoughtworks and are personalized to reflect my own usage patterns:

| Ring | Description |
|------|-------------|
| **Active** | Technologies I am actively using in my daily work and current projects. High familiarity and ongoing commitment. |
| **Archive** | Technologies I used for years but not recently. Knowledge may be partially outdated, but I still consider them for future work. |
| **Trial** | Technologies I’m evaluating in a few limited or controlled use cases. Not yet adopted, but promising. |
| **Access** | Early exploration stage: reading, experimenting, PoCs, discussions. Curiosity-driven discovery without commitments. |


<div id="radar-container">
    <svg id="radar" width="800" height="800"></svg>
</div>

<script src="https://d3js.org/d3.v7.min.js"></script>


<script>
// radar.json powers the technology radar visualization
var radarData = {{ site.data.radar | jsonify }};

const svg = document.getElementById('radar');
const width = 800;
const height = 800;
const centerX = width / 2;
const centerY = height / 2;

// Configuration
const ringGap = 1; // 1px gap between rings
const rings = [
    { name: 'Archive', radius: 110 },
    { name: 'Active', radius: 205 + ringGap },
    { name: 'Trial', radius: 300 + ringGap * 2 },
    { name: 'Assess', radius: 395 + ringGap * 3 },
];

const quadrants = [
    { name: 'Techniques', color: '#8B4789', startAngle: 0, endAngle: 90 },
    { name: 'Tools', color: '#1EBCCD', startAngle: 90, endAngle: 180 },
    { name: 'Platforms', color: '#F38A3E', startAngle: 180, endAngle: 270 },
    { name: 'Languages & Frameworks', color: '#86B782', startAngle: 270, endAngle: 360 }
];

// Build lookup maps
const quadrantMap = {};
quadrants.forEach(q => {
    quadrantMap[q.name] = q;
});

const ringMap = {};
rings.forEach((r, i) => {
    ringMap[r.name] = {
        index: i,
        innerRadius: i === 0 ? 0 : rings[i - 1].radius + ringGap,
        outerRadius: r.radius
    };
});

// Helper function to convert degrees to radians
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

// Helper function to create SVG path for arc with offset
function describeArc(x, y, innerRadius, outerRadius, startAngle, endAngle, offsetX = 0, offsetY = 0) {
    const startAngleRad = toRadians(startAngle - 90); // -90 to start from top
    const endAngleRad = toRadians(endAngle - 90);
    
    const x1 = x + offsetX + innerRadius * Math.cos(startAngleRad);
    const y1 = y + offsetY + innerRadius * Math.sin(startAngleRad);
    const x2 = x + offsetX + outerRadius * Math.cos(startAngleRad);
    const y2 = y + offsetY + outerRadius * Math.sin(startAngleRad);
    const x3 = x + offsetX + outerRadius * Math.cos(endAngleRad);
    const y3 = y + offsetY + outerRadius * Math.sin(endAngleRad);
    const x4 = x + offsetX + innerRadius * Math.cos(endAngleRad);
    const y4 = y + offsetY + innerRadius * Math.sin(endAngleRad);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${x2} ${y2} 
            A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x3} ${y3}
            L ${x4} ${y4}
            A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1}
            Z`;
}

// Draw quadrants
quadrants.forEach(quadrant => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    rings.forEach((ring, index) => {
        const innerRadius = index === 0 ? 0 : rings[index - 1].radius + ringGap;
        const outerRadius = ring.radius;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', describeArc(centerX, centerY, innerRadius, outerRadius, 
            quadrant.startAngle, quadrant.endAngle, 0, 0));
        path.setAttribute('fill', quadrant.color);
        path.setAttribute('class', 'quadrant');
        path.setAttribute('data-quadrant', quadrant.name);
        path.setAttribute('data-ring', ring.name);
        
        g.appendChild(path);
    });
    
    svg.appendChild(g);
});

// Draw white strips on top
const stripWidth = 25;
const maxRadius = rings[rings.length - 1].radius;

// Horizontal strip
const horizontalStrip = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
horizontalStrip.setAttribute('x', centerX - maxRadius);
horizontalStrip.setAttribute('y', centerY - stripWidth / 2);
horizontalStrip.setAttribute('width', maxRadius * 2);
horizontalStrip.setAttribute('height', stripWidth);
horizontalStrip.setAttribute('fill', 'white');
svg.appendChild(horizontalStrip);

// Vertical strip
const verticalStrip = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
verticalStrip.setAttribute('x', centerX - stripWidth / 2);
verticalStrip.setAttribute('y', centerY - maxRadius);
verticalStrip.setAttribute('width', stripWidth);
verticalStrip.setAttribute('height', maxRadius * 2);
verticalStrip.setAttribute('fill', 'white');
svg.appendChild(verticalStrip);

// Add ring labels
rings.forEach((ring, index) => {
    const labelRadius = index === 0 ? ring.radius / 2 : (rings[index - 1].radius + ring.radius) / 2;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', centerX - labelRadius);
    text.setAttribute('y', centerY + 5);
    text.setAttribute('class', 'ring-label');
    text.textContent = ring.name;
    svg.appendChild(text);
});

// Add quadrant labels
quadrants.forEach(quadrant => {
    const angle = toRadians((quadrant.startAngle + quadrant.endAngle) / 2 - 90);
    const labelRadius = rings[rings.length - 1].radius + 25;
    const x = centerX + labelRadius * Math.cos(angle);
    const y = centerY + labelRadius * Math.sin(angle);
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('class', 'quadrant-label');
    text.textContent = quadrant.name;
    svg.appendChild(text);
});

// Plot technologies
function plotTechnologies(technologies) {
    // Prepare data with initial positions
    const nodes = technologies.map(tech => {
        const quadrant = quadrantMap[tech.quadrant];
        const ring = ringMap[tech.ring];
        
        if (!quadrant || !ring) return null;
        
        // Calculate initial random position within the quadrant sector and ring
        const angleRange = quadrant.endAngle - quadrant.startAngle;
        const radiusRange = ring.outerRadius - ring.innerRadius;
        
        // Use deterministic randomness based on tech.id for consistent initial layout
        const random1 = (tech.id * 0.61) % 1; 
        const random2 = (tech.id * 0.38) % 1; 
        
        // Initial position within ring
        const radiusOffset = ring.innerRadius + radiusRange * (0.3 + random1 * 0.4);
        const angleOffset = quadrant.startAngle + angleRange * (0.15 + random2 * 0.7);
        
        // Convert to cartesian coordinates
        const angleRad = toRadians(angleOffset - 90);
        const x = centerX + radiusOffset * Math.cos(angleRad);
        const y = centerY + radiusOffset * Math.sin(angleRad);
        
        // Calculate random target radius for each blip within the ring
        const random3 = (tech.id * 0.73) % 1;
        const targetRadius = ring.innerRadius + radiusRange * random3;
        
        return {
            ...tech,
            x: x,
            y: y,
            quadrant: quadrant,
            ring: ring,
            targetRadius: targetRadius
        };
    }).filter(n => n !== null);
    
    // Create D3 force simulation
    const simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-50)) // Repulsion between blips
        .force('collision', d3.forceCollide().radius(15)) // Prevent overlap
        .force('radial', d3.forceRadial(d => {
            // Each blip has its own random target radius
            return d.targetRadius;
        }, centerX, centerY).strength(0.3))
        .force('stripRepulsion', () => {
            // Push blips away from the white strips (horizontal and vertical)
            const stripWidth = 25;
            const repulsionDistance = 20; // Distance from strip edge where repulsion starts
            const repulsionStrength = 2; // Strength of the push
            
            nodes.forEach(d => {
                // Repulsion from horizontal strip (centerY ± stripWidth/2)
                const distFromHorizontal = Math.abs(d.y - centerY);
                if (distFromHorizontal < stripWidth / 2 + repulsionDistance) {
                    const pushStrength = repulsionStrength * (1 - distFromHorizontal / (stripWidth / 2 + repulsionDistance));
                    d.y += (d.y > centerY ? pushStrength : -pushStrength);
                }
                
                // Repulsion from vertical strip (centerX ± stripWidth/2)
                const distFromVertical = Math.abs(d.x - centerX);
                if (distFromVertical < stripWidth / 2 + repulsionDistance) {
                    const pushStrength = repulsionStrength * (1 - distFromVertical / (stripWidth / 2 + repulsionDistance));
                    d.x += (d.x > centerX ? pushStrength : -pushStrength);
                }
            });
        })
        .force('boundary', () => {
            // Custom force to keep blips within their ring and quadrant
            nodes.forEach(d => {
                const dx = d.x - centerX;
                const dy = d.y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angle = (Math.atan2(dy, dx) * 180 / Math.PI + 90 + 360) % 360;
                
                // Constrain to ring boundaries
                const minRadius = d.ring.innerRadius + 15;
                const maxRadius = d.ring.outerRadius - 15;
                
                if (distance < minRadius) {
                    const scale = minRadius / distance;
                    d.x = centerX + dx * scale;
                    d.y = centerY + dy * scale;
                } else if (distance > maxRadius) {
                    const scale = maxRadius / distance;
                    d.x = centerX + dx * scale;
                    d.y = centerY + dy * scale;
                }
                
                // Constrain to quadrant boundaries
                const minAngle = d.quadrant.startAngle + 5;
                const maxAngle = d.quadrant.endAngle - 5;
                
                if (angle < minAngle || angle > maxAngle) {
                    const clampedAngle = Math.max(minAngle, Math.min(maxAngle, angle));
                    const clampedRad = toRadians(clampedAngle - 90);
                    const currentRadius = Math.sqrt(dx * dx + dy * dy);
                    d.x = centerX + currentRadius * Math.cos(clampedRad);
                    d.y = centerY + currentRadius * Math.sin(clampedRad);
                }
            });
        })
        .alphaDecay(0.02)
        .on('tick', () => {
            nodes.forEach(d => {
                if (d.blipGroup) {
                    d.blipGroup.querySelector('.blip-circle').setAttribute('cx', d.x);
                    d.blipGroup.querySelector('.blip-circle').setAttribute('cy', d.y);
                    d.blipGroup.querySelector('.blip-text').setAttribute('x', d.x);
                    d.blipGroup.querySelector('.blip-text').setAttribute('y', d.y);
                }
            });
        });
    
    // Create blip elements
    nodes.forEach(d => {
        // Create blip group
        const blip = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        blip.setAttribute('class', 'blip');
        blip.setAttribute('data-id', d.id);
        blip.setAttribute('data-name', d.name);
        blip.setAttribute('data-description', d.description || '');
        
        // Add hover handlers
        blip.addEventListener('mouseenter', function() {
            const infoPanel = document.getElementById('info-panel');
            const infoName = document.getElementById('info-name');
            const infoDescription = document.getElementById('info-description');
            
            infoName.textContent = d.name;
            infoDescription.textContent = d.description || 'No description available.';
            infoPanel.classList.add('visible');
        });
        
        blip.addEventListener('mouseleave', function() {
            const infoPanel = document.getElementById('info-panel');
            infoPanel.classList.remove('visible');
        });
        
        // Create circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', d.x);
        circle.setAttribute('cy', d.y);
        circle.setAttribute('r', 12);
        circle.setAttribute('class', 'blip-circle');
        
        // Create text (number)
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', d.x);
        text.setAttribute('y', d.y);
        text.setAttribute('class', 'blip-text');
        text.textContent = d.id;
        
        blip.appendChild(circle);
        blip.appendChild(text);
        
        svg.appendChild(blip);
        
        // Store reference to update position during simulation
        d.blipGroup = blip;
    });
}

plotTechnologies(radarData.technologies);
</script>