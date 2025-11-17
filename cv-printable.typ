#let cv = json("_data/cv.json")
#let name = "George Mamaladze"
#let version = "1.3.3"

// Helper functions
#let parse-date(date-str) = {
  if date-str == none {
    none
  } else {
    datetime(
      year: int(date-str.slice(0, 4)),
      month: int(date-str.slice(5, 7)),
      day: int(date-str.slice(8, 10))
    )
  }
}

#let format-date(date-str) = {
  if date-str == none {
    "Present"
  } else {
    let dt = parse-date(date-str)
    dt.display("[month repr:short] [year]")
  }
}

#let format-period(start, end) = {
  format-date(start) + " - " + format-date(end)
}

// Document setup
#set page(
  paper: "a4",
  margin: (x: 2cm, y: 1.5cm),
  header: [
    #align(right)[
      #text(size: 8pt, fill: gray.lighten(50%))[v#version]
    ]
  ],
  footer: [
    #align(center)[
      #text(size: 9pt, fill: gray)[#context counter(page).display("1")]
    ]
  ]
)
#set text(
  font: "Libertinus Serif",
  size: 10.5pt
)
#set par(
  justify: true,
  leading: 0.65em
)
#show heading.where(level: 1): it => [
  #set text(size: 14pt, weight: "bold")
  #block(above: 1.2em, below: 1.2em)[#upper(it.body)]
]
#show heading.where(level: 2): it => [
  #set text(size: 12pt, weight: "bold")
  #block(above: 0.8em, below: 0.9em)[#it.body]
]

// Title
#align(center)[
  #text(size: 16pt, weight: "bold")[#name]
  #v(-0.3em)
  #line(length: 60%, stroke: 1pt)
]

#v(0.3em)

// Profile section
#align(center)[
  #link("https://linkedin.com/in/gmamaladze")[linkedin.com/in/gmamaladze] 
  | 
  #link("https://cv.mamala.info")[cv.mamala.info] 
]

#v(0.8em)

// Currently section
#heading(level: 2, numbering: none)[Currently]

#for job in cv.experience [
  #if job.period.end == none [
    - *#job.title* at #emph[#job.company#if job.at("division", default: none) != none [, #job.division]], #job.location

  ]
]

#v(0.5em)


// Summary section
#heading(level: 2, numbering: none)[Summary]
#par[#cv.summary]

#v(0.8em)

// Experience section
#heading(level: 1, numbering: none)[Experience]

#for job in cv.experience [
  #block(breakable: false)[
    // Build job meta (timeCommitment, employmentType)
    #let meta-parts = ()
    #if job.at("timeCommitment", default: none) != none [
      #meta-parts.push(job.timeCommitment)
    ]
    #if job.at("employmentType", default: none) != none [
      #meta-parts.push(job.employmentType)
    ]
    #let job-meta = if meta-parts.len() == 0 { "" } else { meta-parts.join(", ") }
    
    #grid(
      columns: (1fr, auto),
      align: (left, right),
      [*#job.title#if job-meta != "" [ (#job-meta)]*],
      [#text(size: 9pt, fill: gray)[#format-period(job.period.start, job.period.end)]]
    )
    
    #v(-0.4em)
    
    #emph[#job.company#if job.at("division", default: none) != none [ – #job.division]], #job.location
    
    #v(0.2em)
    
    // Description
    #if job.at("description", default: none) != none [
      #par[#job.description]
      #v(0.2em)
    ]
    
    // Website
    #if job.at("website", default: none) != none [
      #text(size: 9pt)[#link(job.website)[#job.website.replace("https://", "").replace("http://", "")]]
      #v(0.2em)
    ]
    
    // Responsibilities
    #if job.at("responsibilities", default: none) != none and job.responsibilities.len() > 0 [
      *Responsibilities:*
      #text(size: 9.5pt)[
        #list(indent: 0.5em, tight: true, ..job.responsibilities)
      ]
    ]
    
    // Key Achievements
    #if job.at("keyAchievements", default: none) != none and job.keyAchievements.len() > 0 [
      *Key Achievement#if job.keyAchievements.len() > 1 [s]:*
      #text(size: 9.5pt)[
        #list(indent: 0.5em, tight: true, ..job.keyAchievements)
      ]
    ]
    
    #v(0.6em)
    #line(length: 100%, stroke: (thickness: 0.5pt, dash: "dotted", paint: gray.lighten(40%)))
    #v(0.4em)
  ]
]

// Education section
#heading(level: 1, numbering: none)[Education]

#for edu in cv.education [
  #grid(
    columns: (1fr, auto),
    align: (left, right),
    [*#edu.program*],
    [#text(size: 9pt, fill: gray)[#format-period(edu.period.start, edu.period.end)]]
  )
  
  #v(-0.4em)
  
  #emph[#edu.institution], #edu.location
  
  #v(0.2em)
  
  #if edu.at("notes", default: none) != none and edu.notes.len() > 0 [
    #list(indent: 0.5em, tight: false, ..edu.notes)
  ]
  
  #v(0.5em)
]

// Achievements section
#block(breakable: false)[
  #heading(level: 1, numbering: none)[Achievements]

  #for achievement in cv.achievements [
    - *#achievement.year* - #achievement.description
  ]
]

#v(0.5em)

// Languages section
#heading(level: 1, numbering: none)[Languages]

#for lang in cv.languages [
  - *#lang.name* - #lang.fluency
]

#v(0.5em)

// Technical Skills section
#heading(level: 1, numbering: none)[Technical Skills]

#for category in cv.technicalSkills [
  #par[
    *#category.category:*
  ]
  #pad(left: 1em)[
    #par[
      #for (i, item) in category.items.enumerate() [#item#if i < category.items.len() - 1 [ #h(0.5em) • #h(0.5em) ]]
    ]
  ]
  
  #v(0.3em)
]
