---
layout: cv
title: Career Timeline
---
# George Mamaladze
## Career Timeline
<div id="timeline"></div>

<script src="https://d3js.org/d3.v7.min.js"></script>
<style>
    .job-label {
        font-size: 12px;
        fill: #333;
    }
    .date-label {
        font-size: 10px;
        fill: #666;
    }
    .domain {
        stroke: #ccc;
    }
    .tick line {
        stroke: #ccc;
    }
    /* details box and its connector removed */
</style>

<script>
var cvData = {{ site.data.cv | jsonify }};

// Label offset adjustments by experience ID
const labelOffsets = {
    "SFA": { x: 0, y: 0 },    // Current Siemens FA position
    "SYN": { x: 20, y: 40 }, // Adjust Syniotec to avoid overlap
    "SCT": { x: 0, y: 0 },   // Siemens CT slight vertical adjustment
    "TRN": { x: 20, y: 40 },   // Training position
    "EBR": { x: 20, y: 0 },   // EBRD
    "HUA": { x: 0, y: 0 }, // Huawei
    "SDF": { x: 0, y: 0 },    // Siemens DF
    "ENC": { x: 0, y: 0 }, // encad
    "IQO": { x: 0, y: 0 },    // IQ-optimize
    "TBC": { x: 0, y: 0 }     // TBC Bank
};

const margin = {top: 20, right: 150, bottom: 30, left: 200};
const width = 800 - margin.left - margin.right;
const height = 1000 - margin.top - margin.bottom;

const svg = d3.select("#timeline").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const experiences = cvData.experience.map(d => {
    const startDate = new Date(d.period.start);
    const endDate = d.period.end ? new Date(d.period.end) : new Date();
    return { ...d, startDate, endDate };
});

const minDate = d3.min(experiences, d => d.startDate);
const maxDate = d3.max(experiences, d => d.endDate);

const yScale = d3.scaleTime()
    .domain([maxDate, minDate])
    .range([0, height]);

const mainJobs = experiences.filter(d => d.timeCommitment === 'full-time');
const partTimeJobs = experiences.filter(d => d.timeCommitment === 'part-time');

const colorScale = d3.scaleOrdinal(d3.schemeTableau10);

// Map company IDs to brand-like colors (override palette when provided)
const companyColors = {
    // Siemens divisions: Persian/Petrol green-like
    "SFA": "#00A693", // Factory Automation
    "SCT": "#00A693", // Corporate Technology
    "SDF": "#00A693", // Digital Factory
    // Huawei: brand red
    "HUA": "#E60012",
    // Syniotec: bright red
    "SYN": "#FF3B30",
    // EBRD: Professional blue
    "EBR": "#004C9F"  // European Bank for Reconstruction and Development
};

// Fallback color scale for companies without specific color assignments
const getCompanyColor = (company, id) => companyColors[id] || colorScale(company);

const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%b %Y"));
svg.append("g")
    .call(yAxis);

function drawStrips(jobs, xOffset, stripWidth) {
    // Get offset for a specific job entry
    const getOffset = (job) => {
        return labelOffsets[job.id] || { x: 0, y: 0 };
    };

    // Create a group for each job to handle hover events
    const jobGroups = svg.selectAll(`.job-group-${xOffset}`)
        .data(jobs)
        .enter()
        .append("g")
        .attr("class", `job-group`);

    // Draw the strips
    jobGroups.append("rect")
        .attr("class", `job-strip-${xOffset}`)
        .attr("x", xOffset)
        .attr("y", d => Math.min(yScale(d.startDate), yScale(d.endDate)))
        .attr("width", stripWidth)
        .attr("height", d => Math.abs(yScale(d.endDate) - yScale(d.startDate)) - 2)
        .attr("fill", d => getCompanyColor(d.company, d.id))
        .attr("fill-opacity", xOffset === 80 ? 0.3 : 1); // 70% opacity for part-time jobs (xOffset 80)

    // Draw connector lines
    jobGroups.append("line")
        .attr("class", "connector-line")
        .attr("x1", xOffset + stripWidth)
        .attr("x2", d => xOffset + stripWidth + 95 + getOffset(d).x)
        .attr("y1", d => yScale(d.endDate) + 15 + getOffset(d).y)
        .attr("y2", d => yScale(d.endDate) + 15 + getOffset(d).y)
        .style("stroke", "#999")
        .style("stroke-width", "1px");

    // Add dots at the end of connectors
    jobGroups.append("circle")
        .attr("class", "connector-dot")
        .attr("cx", xOffset + stripWidth)
        .attr("cy", d => yScale(d.endDate) + 15 + getOffset(d).y)
        .attr("r", 3)
        .style("fill", "#999");

    // Draw labels
    const labels = jobGroups.append("text")
        .attr("class", `job-label job-label-${xOffset}`)
        .attr("x", d => xOffset + stripWidth + 100 + getOffset(d).x)
        .attr("y", d => yScale(d.endDate) + 15 + getOffset(d).y);

    labels.append("tspan")
        .text(d => d.company)
        .attr("x", d => xOffset + stripWidth + 100 + getOffset(d).x)
        .style("font-weight", "bold");

    labels.append("tspan")
        .text(d => d.title)
        .attr("x", d => xOffset + stripWidth + 100 + getOffset(d).x)
        .attr("dy", "1.2em");

    // details removed: connector to details and foreignObject content have been removed
}

drawStrips(mainJobs, 10, 60);
drawStrips(partTimeJobs, 80, 40);
</script>