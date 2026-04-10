const { buildRecruiterPortfolioPrompt } = require('../prompts/recruiterPortfolioPrompt');

const PROMPT_VERSION = 'recruiter-portfolio-v1';

const ROLE_PLAYBOOKS = {
  frontend: {
    label: 'Frontend Engineer',
    priorityTags: ['frontend', 'ui', 'react', 'performance', 'responsive', 'seo'],
    stackPills: ['React', 'Next.js', 'TypeScript', 'Responsive UI', 'Performance', 'SEO'],
    whyMe: [
      'Translates product ideas into polished, responsive UI',
      'Balances visual quality with speed and maintainability',
      'Strong instinct for conversion, clarity, and interaction design',
      'Comfortable owning implementation from hero section to form submission',
    ],
  },
  fullstack: {
    label: 'Full-Stack Engineer',
    priorityTags: ['frontend', 'backend', 'api', 'forms', 'database', 'fullstack'],
    stackPills: ['React', 'Node.js', 'MongoDB', 'APIs', 'Forms', 'Deployment'],
    whyMe: [
      'Ships end-to-end features instead of isolated screens',
      'Comfortable with frontend polish and backend data handling',
      'Builds reliable lead capture and business workflows',
      'Keeps projects practical, readable, and production-focused',
    ],
  },
  backend: {
    label: 'Backend Engineer',
    priorityTags: ['backend', 'api', 'forms', 'database', 'validation', 'server'],
    stackPills: ['Node.js', 'Express', 'MongoDB', 'Validation', 'APIs', 'Vercel'],
    whyMe: [
      'Builds practical backend flows around real product needs',
      'Cares about validation, error handling, and durable data',
      'Understands how frontend and backend decisions affect each other',
      'Prefers simple, maintainable service boundaries over unnecessary complexity',
    ],
  },
  ai: {
    label: 'AI Product Engineer',
    priorityTags: ['ai', 'automation', 'frontend', 'api', 'product'],
    stackPills: ['React', 'Prompting', 'OpenAI-ready APIs', 'Personalization', 'Product UX', 'Automation'],
    whyMe: [
      'Builds AI features as useful product experiences, not demos',
      'Combines UI thinking with integration and prompt orchestration',
      'Comfortable blending rule-based logic with model output',
      'Focuses on keeping AI experiences truthful and resilient',
    ],
  },
};

function normalizeInput(input = {}) {
  return {
    roleTarget: input.roleTarget || 'frontend',
    companyType: input.companyType || 'startup',
    recruiterName: (input.recruiterName || '').trim(),
    companyName: (input.companyName || '').trim(),
    jobTitle: (input.jobTitle || '').trim(),
    jobDescription: (input.jobDescription || '').trim(),
  };
}

function extractKeywords(input) {
  const joined = [
    input.roleTarget,
    input.companyType,
    input.jobTitle,
    input.companyName,
    input.jobDescription,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return new Set(joined.match(/[a-z0-9+#.-]{2,}/g) || []);
}

function scoreTags(tags = [], keywords, priorityTags = []) {
  return tags.reduce((score, tag) => {
    if (priorityTags.includes(tag)) return score + 5;
    if (keywords.has(String(tag).toLowerCase())) return score + 2;
    return score;
  }, 0);
}

function buildFallbackOutput(input, portfolio) {
  const playbook = ROLE_PLAYBOOKS[input.roleTarget] || ROLE_PLAYBOOKS.frontend;
  const keywords = extractKeywords(input);

  const scoredProjects = [...(portfolio.projects || [])]
    .map((project) => {
      const searchable = [
        project.title,
        project.category,
        project.desc,
        project.longDesc,
        (project.tags || []).join(' '),
        (project.focusAreas || []).join(' '),
      ]
        .join(' ')
        .toLowerCase();

      let score = scoreTags(project.focusAreas || [], keywords, playbook.priorityTags);
      for (const keyword of keywords) {
        if (searchable.includes(keyword)) score += 1;
      }
      if (project.featured) score += 1;

      return { ...project, score };
    })
    .sort((a, b) => b.score - a.score);

  const flattenedSkills = (portfolio.skillGroups || []).flatMap((group) =>
    (group.skills || []).map((skill) => ({
      name: skill.name,
      pct: skill.pct,
      score: scoreTags(skill.tags || [], keywords, playbook.priorityTags),
    }))
  );

  flattenedSkills.sort((a, b) => b.score - a.score || b.pct - a.pct);

  const roleLabel = playbook.label;
  const jobLabel = input.jobTitle || roleLabel;
  const companySuffix = input.companyName ? ` at ${input.companyName}` : '';

  return {
    headline: `${roleLabel} portfolio tailored for ${jobLabel}${companySuffix}.`,
    summary: `This version emphasizes the work most relevant to ${jobLabel.toLowerCase()}, with project ordering, skills, and positioning adjusted using recruiter context.`,
    highlightedSkills: flattenedSkills.slice(0, 4).map((skill) => skill.name),
    featuredProjectIds: scoredProjects.slice(0, 4).map((project) => project.id),
    whyMe: playbook.whyMe.slice(0, 4),
    whyMeIntro: portfolio.profile?.longBio || portfolio.profile?.intro || '',
    cta: `If you are hiring for ${jobLabel}${companySuffix}, I would be happy to walk through the projects above and explain why they were prioritized.`,
    typewriterRoles: [
      roleLabel,
      portfolio.profile?.defaultTypewriterRoles?.[0] || 'Full-Stack Developer',
      portfolio.profile?.defaultTypewriterRoles?.[1] || 'React Builder',
    ],
    stackPills: playbook.stackPills,
    source: 'rules',
    promptVersion: PROMPT_VERSION,
  };
}

function safeParseJson(content) {
  try {
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

async function requestOpenAIJson(prompt) {
  if (!process.env.OPENAI_API_KEY) return null;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      temperature: 0.4,
      messages: [
        {
          role: 'system',
          content: 'You personalize truthful developer portfolios. Return valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`OpenAI personalization failed: ${message}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  return content ? safeParseJson(content) : null;
}

function mergeOutput(fallbackOutput, aiOutput) {
  if (!aiOutput) return fallbackOutput;

  return {
    headline: aiOutput.headline || fallbackOutput.headline,
    summary: aiOutput.summary || fallbackOutput.summary,
    highlightedSkills: Array.isArray(aiOutput.highlightedSkills) && aiOutput.highlightedSkills.length
      ? aiOutput.highlightedSkills
      : fallbackOutput.highlightedSkills,
    featuredProjectIds: Array.isArray(aiOutput.featuredProjectIds) && aiOutput.featuredProjectIds.length
      ? aiOutput.featuredProjectIds
      : fallbackOutput.featuredProjectIds,
    whyMe: Array.isArray(aiOutput.whyMe) && aiOutput.whyMe.length
      ? aiOutput.whyMe
      : fallbackOutput.whyMe,
    whyMeIntro: aiOutput.whyMeIntro || fallbackOutput.whyMeIntro,
    cta: aiOutput.cta || fallbackOutput.cta,
    typewriterRoles: Array.isArray(aiOutput.typewriterRoles) && aiOutput.typewriterRoles.length
      ? aiOutput.typewriterRoles
      : fallbackOutput.typewriterRoles,
    stackPills: Array.isArray(aiOutput.stackPills) && aiOutput.stackPills.length
      ? aiOutput.stackPills
      : fallbackOutput.stackPills,
    source: 'ai',
    promptVersion: PROMPT_VERSION,
  };
}

async function personalizePortfolio({ input, portfolio }) {
  const normalizedInput = normalizeInput(input);
  const fallbackOutput = buildFallbackOutput(normalizedInput, portfolio);

  if (!normalizedInput.jobDescription && !normalizedInput.jobTitle && !normalizedInput.companyName) {
    return { input: normalizedInput, output: fallbackOutput };
  }

  try {
    const prompt = buildRecruiterPortfolioPrompt({
      input: normalizedInput,
      portfolio,
      fallbackOutput,
    });
    const aiOutput = await requestOpenAIJson(prompt);
    return {
      input: normalizedInput,
      output: mergeOutput(fallbackOutput, aiOutput),
    };
  } catch (error) {
    console.error('[PERSONALIZE] Falling back to rules-based output:', error.message);
    return { input: normalizedInput, output: fallbackOutput };
  }
}

module.exports = {
  PROMPT_VERSION,
  personalizePortfolio,
};
