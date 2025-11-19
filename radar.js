// radar.json powers the technology radar visualization
function initializeRadar(radarData) {
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
        const labelRadius = rings[rings.length - 1].radius + 22;
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
            blip.addEventListener('mouseenter', function(event) {
                const tooltipGroup = document.getElementById('blip-tooltip-group');
                const tooltipText = document.getElementById('blip-tooltip-text');
                const tooltipBg = document.getElementById('blip-tooltip-bg');
                
                // Set tooltip text
                tooltipText.textContent = d.name;
                
                // Determine if blip is on the right half of the radar
                const isOnRightSide = d.x > centerX;
                
                // Position tooltip (to the right if on left side, to the left if on right side)
                let tooltipX, textAnchor;
                if (isOnRightSide) {
                    // Blip on right side - show tooltip on the left
                    tooltipX = d.x - 18;
                    textAnchor = 'end';
                } else {
                    // Blip on left side - show tooltip on the right
                    tooltipX = d.x + 18;
                    textAnchor = 'start';
                }
                const tooltipY = d.y - 5;
                
                tooltipText.setAttribute('x', tooltipX + (isOnRightSide ? -8 : 8));
                tooltipText.setAttribute('y', tooltipY + 15);
                tooltipText.setAttribute('text-anchor', textAnchor);
                
                // Calculate background dimensions based on text
                const bbox = tooltipText.getBBox();
                tooltipBg.setAttribute('x', bbox.x - 4);
                tooltipBg.setAttribute('y', bbox.y - 2);
                tooltipBg.setAttribute('width', bbox.width + 8);
                tooltipBg.setAttribute('height', bbox.height + 4);
                
                tooltipGroup.style.display = 'block';
                
                const infoPanel = document.getElementById('info-panel');
                const infoName = document.getElementById('info-name');
                const infoDescription = document.getElementById('info-description');
                
                infoName.textContent = d.name;
                infoDescription.textContent = d.description || 'No description available.';
                infoPanel.classList.add('visible');
            });
            
            blip.addEventListener('mouseleave', function() {
                const tooltipGroup = document.getElementById('blip-tooltip-group');
                tooltipGroup.style.display = 'none';
                
                const infoPanel = document.getElementById('info-panel');
                infoPanel.classList.remove('visible');
            });
            
            // Add click handler to jump to table row
            blip.addEventListener('click', function() {
                const tableRow = document.getElementById('tech-' + d.id);
                if (tableRow) {
                    tableRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Highlight the row briefly
                    tableRow.style.backgroundColor = '#ffeb3b';
                    setTimeout(() => {
                        tableRow.style.backgroundColor = '';
                    }, 2000);
                }
            });
            
            // Make cursor pointer on hover
            blip.style.cursor = 'pointer';
            
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

    // Create tooltip group at the end so it appears on top
    const tooltipGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    tooltipGroup.setAttribute('id', 'blip-tooltip-group');
    tooltipGroup.style.display = 'none';

    const tooltipBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    tooltipBg.setAttribute('id', 'blip-tooltip-bg');
    tooltipBg.setAttribute('rx', '4');
    tooltipBg.setAttribute('ry', '4');
    tooltipBg.setAttribute('fill', 'rgba(0, 0, 0, 0.85)');

    const tooltipText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    tooltipText.setAttribute('id', 'blip-tooltip-text');
    tooltipText.setAttribute('fill', 'white');
    tooltipText.setAttribute('font-family', 'Inter, sans-serif');
    tooltipText.setAttribute('font-size', '13');
    tooltipText.setAttribute('font-weight', '500');

    tooltipGroup.appendChild(tooltipBg);
    tooltipGroup.appendChild(tooltipText);
    svg.appendChild(tooltipGroup);
}
