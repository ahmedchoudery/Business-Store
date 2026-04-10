function buildRecruiterPortfolioPrompt({ input, portfolio, fallbackOutput }) {
  return `
You are personalizing a software engineer portfolio for a recruiter.

Candidate profile:
${JSON.stringify(portfolio.profile, null, 2)}

Projects:
${JSON.stringify(portfolio.projects, null, 2)}

Skill groups:
${JSON.stringify(portfolio.skillGroups, null, 2)}

Tech stack:
${JSON.stringify(portfolio.techStack, null, 2)}

Recruiter context:
${JSON.stringify(input, null, 2)}

Fallback recommendation:
${JSON.stringify(fallbackOutput, null, 2)}

Rules:
- Keep all claims truthful
- Do not invent companies, metrics, technologies, or years
- Prefer emphasizing and reordering existing evidence
- Tone should be concise, recruiter-friendly, and specific
- Only return valid JSON

Return this exact JSON shape:
{
  "headline": "string",
  "summary": "string",
  "highlightedSkills": ["string"],
  "featuredProjectIds": ["string"],
  "whyMe": ["string"],
  "whyMeIntro": "string",
  "cta": "string",
  "typewriterRoles": ["string"],
  "stackPills": ["string"]
}
`.trim();
}

module.exports = { buildRecruiterPortfolioPrompt };
