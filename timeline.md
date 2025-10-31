---
layout: cv
title: George Mamaladze - Career Timeline
---

# George Mamaladze
![George Mamaladze](gmamaladze-profile.png){: .profile-image}

---

[Download PDF](George_Mamaladze_CV.pdf){: .download-link}
[Classic View](./){: .download-link}



<div class="timeline-details-wrapper">
<div id="timeline"></div>
<div id="details" markdown="1">
`<<< Hover over a job strip to see details here.`
</div>
</div>


{% assign jobs = site.data.cv.experience | sort: "period.start" | reverse %}
{% for job in jobs %}
{% capture job_meta %}
{% if job.timeCommitment %}{{ job.timeCommitment | capitalize }}{% endif %}{% if job.employmentType %}{% if job.timeCommitment %}, {% endif %}{{ job.employmentType | replace: "-", " " | capitalize }}{% endif %}
{% endcapture %}
{% assign job_meta = job_meta | strip %}
<div id="{{ job.id }}" class="employment-detail" markdown="1">
`{{ job.period.start | date: "%b %Y" }} - {% if job.period.end %}{{ job.period.end | date: "%b %Y" }}{% else %}Present{% endif %}`  
__{{ job.title }}{% if job_meta != "" %} ({{ job_meta }}){% endif %}__, *{{ job.company }}{% if job.division %} – {{ job.division }}{% endif %}*, {{ job.location }}

{% if job.description %}{{ job.description }}
{% endif %} {% if job.website %}[[{{ job.website | replace: "https://", "" | replace: "http://", "" }}]({{ job.website }})]{% endif %}


{% if job.responsibilities %}
**Responsibilities**
{% for item in job.responsibilities %}- {{ item }}
{% endfor %}
{% endif %}

{% if job.keyAchievements %}
{% assign achievementCount = job.keyAchievements | size %}
**Key Achievement{% if achievementCount > 1 %}s{% endif %}**
{% for achievement in job.keyAchievements %}- {{ achievement }}
{% endfor %}
{% endif %}
</div>
{% endfor %}

<!-- D3 timeline below reuses the same cv.json dataset for visualization -->
<script src="https://d3js.org/d3.v7.min.js"></script>
<style>
    /* Layout styling keeps timeline and details panel aligned */
    .timeline-details-wrapper {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 0;
    }
    #timeline {
        flex: 0 0 auto;
    }
    #details {
        flex: 1 1 0;
        min-width: 300px;
        max-width: 600px;
        padding-left: 15px;
        margin-top: 70px;
    }
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
    #details, #details * {
        position: static !important;
        left: auto !important;
        width: auto !important;
        text-align: left !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        box-sizing: border-box;
    }
    /* Hidden employment detail blocks stay out of layout until populated into #details */
    .employment-detail {
        display: none;
    }
</style>

<script>
// cv.json powers both the textual details above and this D3 timeline
var cvData = {{ site.data.cv | jsonify }};

// Label offset adjustments by experience ID
const labelOffsets = {
    "SFA": { x: 0, y: 40 }, // Adjust Syniotec to avoid overlap
    "TRN": { x: 0, y: 40 },   // Training position
    "EBR": { x: 0, y: 0 },   // EBRD
};

const margin = {top: 0, right: 0, bottom: 0, left: 50};
const width = 410 - margin.left - margin.right;
const height = Math.round((1000 - margin.top - margin.bottom) * 0.85);

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

// Prefer brand color from data; fall back to palette when missing
const getCompanyColor = job => job.brandColor || colorScale(job.company);

const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%b %Y"));
svg.append("g")
    .call(yAxis);

function showEmploymentDetails(id) {
    clearTimeout(clearDetailsTimeout);
    // Hide all employment sections
    const allSections = cvData.experience.map(d => d.id);
    allSections.forEach(secId => {
        const sec = document.getElementById(secId);
        if (sec) sec.style.display = "none";
    });
    // Show the selected section inside #details
    const detailsDiv = document.getElementById("details");
    const section = document.getElementById(id);
    if (detailsDiv && section) {
        detailsDiv.innerHTML = section.innerHTML;
    }
}

let clearDetailsTimeout;

function clearEmploymentDetails() {
    clearTimeout(clearDetailsTimeout);
    clearDetailsTimeout = setTimeout(() => {
        document.getElementById("details").innerHTML = "";
    }, 5000);
}

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
        .attr("class", `job-group`)
        .on("mouseover", (event, d) => showEmploymentDetails(d.id))
        .on("mouseout", (event, d) => clearEmploymentDetails());

    // Draw the strips
    jobGroups.append("rect")
        .attr("class", `job-strip-${xOffset}`)
        .attr("x", xOffset)
        .attr("y", d => Math.min(yScale(d.startDate), yScale(d.endDate)))
        .attr("width", stripWidth)
        .attr("height", d => Math.abs(yScale(d.endDate) - yScale(d.startDate)) - 2)
    .attr("fill", d => getCompanyColor(d))
    .attr("fill-opacity", xOffset === 80 ? 0.5 : 1);

    // Draw connector lines
    jobGroups.append("line")
        .attr("class", "connector-line")
        .attr("x1", xOffset + stripWidth)
        .attr("x2", d => xOffset + stripWidth + 65 + getOffset(d).x)
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
        .attr("x", d => xOffset + stripWidth + 70 + getOffset(d).x)
        .attr("y", d => yScale(d.endDate) + 15 + getOffset(d).y);

    labels.append("tspan")
        .text(d => d.company)
        .attr("x", d => xOffset + stripWidth + 70 + getOffset(d).x)
        .style("font-weight", "bold");

    labels.append("tspan")
        .text(d => d.title)
        .attr("x", d => xOffset + stripWidth + 70 + getOffset(d).x)
        .attr("dy", "1.2em");
}

drawStrips(mainJobs, 10, 60);
drawStrips(partTimeJobs, 80, 40);
</script>