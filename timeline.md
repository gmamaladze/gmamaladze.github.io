---
layout: cv
title: George Mamaladze - Career Timeline
---
# George Mamaladze
---
![George Mamaladze](gmamaladze-profile.png){: .profile-image}

<div class="timeline-details-wrapper">
<div id="timeline"></div>
<div id="details" markdown="1">
`<<< Hover over a job strip to see details here.`
</div>
</div>

<div id="SFA" markdown="1">
`May 2022 - Present`  
__Senior Software Architect__, *Siemens AG – Factory Automation, Human Machine Interface*, Munich, Germany

The SIMATIC WinCC Unified System is a new generation of Siemens HMI and SCADA visualization products designed for industrial applications in machine building and factory automation ([siemens.com/wincc-unified](https://www.siemens.com/wincc-unified)). It addresses the modern challenges of digitization in manufacturing by providing a flexible and open platform with IT/OT integration capabilities.

**Responsibilities**
- Defining technology strategy, aligning product roadmap with business goals and partners
- Led and mentored the engineering team Architects
- Drove the technology roadmap, scanning for innovations, defining development guidelines and tool chains
- Oversaw the entire development lifecycle, allocating technical resources, collaborating with product owners, finance, and executive leadership to ensure timely delivery and market fit

**Key Achievement**
- After 3 years of development of the newly founded business line, delivered the first version of the product to market (currently in limited release, broad release planned)
</div>

<div id="SYN" markdown="1">
`Jul 2022 - Present`  
__Chief Technical Advisor (part-time, freelance)__, *Syniotec*, Bremen, Germany (remote)

[Syniotec](https://www.syniotec.com) is a fast-growing startup providing digital solutions to the construction industry, enabling companies to optimize operations through IoT-driven telematics and software platforms. As Chief Technical Advisor, I function in practice as the part-time CTO.  

**Responsibilities**  
- Defining the technical roadmap ensuring scalability, security, and maintainability.  
- Advising the founding team and management.  
- Mentoring engineering teams on best practices in microservices, DevOps, and cloud infrastructure.  
- Managing technology stack, vendor partnerships, and integration strategies.  

**Key Achievements**  
- Established technical standards and processes that enabled Syniotec's transition from startup to scaling vendor.  
- Redesigned the cloud-native backbone of Syniotec software to scale for thousands of concurrent users and data streams.  
</div>

<div id="SCT" markdown="1">
`May 2018 - May 2022`  
__Senior Software Architect__, *Siemens AG – Corporate Technology*, Munich, Germany

Siemens Corporate Technology served as the central research and innovation hub for Siemens AG.  

**Responsibilities**  
- Designed and conceived cloud-native system architectures for strategic projects.  
- Advised business units on cloud transformation and innovation.  
- Performed architecture reviews and mentored development teams.  
- Conducted technology research, academic collaboration, and conference talks.  

**Key Achievements**  
- Led the architecture for Spectrum Power NG digital grid control system (real-time platform with Kubernetes, Kafka, Flink).  
- Architected "Energy as a Service," a scalable microservice platform for renewable energy analytics.  
</div>

<div id="TRN" markdown="1">
`Feb 2020 - Jun 2022`  
__Technical Trainer & Consultant__, *Independent*, Germany (part-time, freelance)

Provided training and consulting services to multiple software companies, focusing on modern cloud-native architecture and microservices implementation.

**Responsibilities**
- Created and delivered training programs on microservices architecture and cloud-native development: Microservice Patterns, Microservices implementation in Quarkus vs. Spring Boot, Testing strategies for microservices
- Conducted architecture review workshops

**Key Achievement**
- Trained over 100 developers across multiple companies, overwhelming positive feedback and measurable improvements in project outcomes
</div>

<div id="EBR" markdown="1">
`Oct 2018 - Jan 2020`  
__International Advisor for Small Businesses (ASB)__, *EBRD (European Bank for Reconstruction and Development)*, Global (part-time, freelance)

- Provided strategic guidance and coaching to small businesses in Eastern Europe & CIS
- Mentored software teams in modern engineering practices and agile methods
- Reworked system architectures to align with business objectives
- Introduced structured processes, tools, and templates to improve execution
</div>

<div id="HUA" markdown="1">
`Mar 2017 - Apr 2018`  
__Principal Software Architect__, *Huawei – European Research Center*, Munich, Germany

- Provided technical leadership for 3–5 concurrent high-impact research projects
- Drove project acquisition, requirement analysis, and technical consulting at HQ in China
- Disseminated research findings and knowledge

**Key Achievements** 
- Architected methodology and toolchain for modularizing large-scale Java projects. 
- Designed scalable microservice architecture for Huawei Cloud IDE.
</div>

<div id="SDF" markdown="1">
`Jul 2009 - Feb 2017`  
__Senior Software Architect__, *Siemens AG – Digital Factory*, Fuerth, Germany

- Software Architect, promoted to Certified Senior Software Architect (2015).  
- Worked on [TIA-Portal](https://www.siemens.com/tia-portal), Siemens' flagship automation IDE, shipping 5 major releases.  
- Managed development across full stack (hardware, firmware, application).  
- Interfaced with customers and partners for product launches
</div>

<div id="ENC" markdown="1">
`Feb 2008 - Jun 2009`  
__Senior Software Architect__, *encad Ing. mbH*, Nuremberg, Germany

- Assigned to a customer project with 50+ developers
- Conducted architecture reviews and systemic root cause analyses
- Introduced CI, static code analysis, and quality assurance measures
</div>

<div id="IQO" markdown="1">
`Aug 2001 - Jan 2008`  
__Software Project Lead__, *IQ-optimize Software AG*, Nuremberg, Germany

- Launched Germany's first digital prepaid voucher distribution system with a 10-person team.  
- Managed lifecycle of a back-office workflow system (product ownership → development → customer training).  
</div>

<div id="TBC" markdown="1">
`Jan 1999 - Jul 2001`  
__Head of IT Department__, *TBC Bank*, Tbilisi, Georgia

- Managed IT infrastructure, ATMs, POS systems, and integrations
- Oversaw administration and supervision of hardware and software
</div>

<script src="https://d3js.org/d3.v7.min.js"></script>
<style>
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
        padding-left: 10px;
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
</style>

<script>
var cvData = {{ site.data.cv | jsonify }};

// Label offset adjustments by experience ID
const labelOffsets = {
    "SFA": { x: 0, y: 40 }, // Adjust Syniotec to avoid overlap
    "TRN": { x: 0, y: 40 },   // Training position
    "EBR": { x: 0, y: 0 },   // EBRD
};

const margin = {top: 0, right: 0, bottom: 0, left: 50};
const width = 410 - margin.left - margin.right;
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

function showEmploymentDetails(id) {
    // Hide all employment sections
    const allSections = ["SFA","SYN","SCT","TRN","EBR","HUA","SDF","ENC","IQO","TBC"];
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
        .attr("fill", d => getCompanyColor(d.company, d.id))
        .attr("fill-opacity", xOffset === 50 ? 0.3 : 1); // 70% opacity for part-time jobs (xOffset 80)

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