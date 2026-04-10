import {
  companyTypePlaybooks,
  companyTypeOptions,
  defaultDraftInput,
  footerLinkGroups,
  profile,
  projects,
  recruiterRoleOptions,
  rolePlaybooks,
  skillGroups,
  techStack,
  timeline,
} from '../data/portfolioContent';

const WORD_REGEX = /[a-z0-9+#.-]{2,}/gi;

function normalizeInput(raw = {}) {
  const input = raw || {};
  return {
    ...defaultDraftInput,
    ...input,
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

  return new Set(joined.match(WORD_REGEX) || []);
}

function scoreByTags(targetTags, keywords, extra = []) {
  return targetTags.reduce((score, tag) => {
    if (extra.includes(tag)) return score + 5;
    if (keywords.has(tag.toLowerCase())) return score + 3;
    return score;
  }, 0);
}

function scoreProject(projectItem, playbook, keywords) {
  const haystack = [
    projectItem.title,
    projectItem.category,
    projectItem.desc,
    projectItem.longDesc,
    projectItem.tags.join(' '),
    projectItem.focusAreas.join(' '),
  ]
    .join(' ')
    .toLowerCase();

  let score = scoreByTags(projectItem.focusAreas, keywords, playbook.priorityTags);
  for (const keyword of keywords) {
    if (haystack.includes(keyword)) score += 1;
  }
  if (projectItem.featured) score += 0.5;
  return score;
}

function buildSummary(input, playbook, companyPlaybook, aiResult) {
  if (aiResult?.summary) return aiResult.summary;

  const companyLine = companyPlaybook?.summaryAddon ? ` ${companyPlaybook.summaryAddon}` : '';
  const jobLine = input.jobTitle
    ? ` Tailored for ${input.jobTitle}${input.companyName ? ` at ${input.companyName}` : ''}.`
    : '';

  return `${playbook.summaryLead}${companyLine}${jobLine}`;
}

function buildHeadline(input, playbook, aiResult) {
  if (aiResult?.headline) return aiResult.headline;

  if (input.jobTitle && input.companyName) {
    return `${playbook.label} portfolio tailored for ${input.jobTitle} at ${input.companyName}.`;
  }

  if (input.jobTitle) {
    return `${playbook.label} portfolio tailored for ${input.jobTitle}.`;
  }

  return `${playbook.label} portfolio tailored to the role.`;
}

function rankProjects(input, aiResult) {
  const playbook = rolePlaybooks[input.roleTarget] || rolePlaybooks.frontend;
  const keywords = extractKeywords(input);

  const scored = [...projects]
    .map((projectItem) => ({
      ...projectItem,
      score: scoreProject(projectItem, playbook, keywords),
    }))
    .sort((a, b) => b.score - a.score);

  if (aiResult?.featuredProjectIds?.length) {
    const order = new Map(aiResult.featuredProjectIds.map((id, index) => [id, index]));
    scored.sort((a, b) => {
      const aIndex = order.has(a.id) ? order.get(a.id) : Number.MAX_SAFE_INTEGER;
      const bIndex = order.has(b.id) ? order.get(b.id) : Number.MAX_SAFE_INTEGER;
      if (aIndex !== bIndex) return aIndex - bIndex;
      return b.score - a.score;
    });
  }

  return scored;
}

function rankSkills(input, aiResult) {
  const playbook = rolePlaybooks[input.roleTarget] || rolePlaybooks.frontend;
  const keywords = extractKeywords(input);

  const highlightedSet = new Set((aiResult?.highlightedSkills || []).map((skill) => skill.toLowerCase()));
  const flattened = skillGroups.flatMap((group) =>
    group.skills.map((skill) => ({
      ...skill,
      groupId: group.id,
      groupTitle: group.title,
      score:
        scoreByTags(skill.tags || [], keywords, playbook.priorityTags) +
        (highlightedSet.has(skill.name.toLowerCase()) ? 7 : 0),
    }))
  );

  flattened.sort((a, b) => b.score - a.score || b.pct - a.pct);
  return flattened;
}

function rankTech(input) {
  const playbook = rolePlaybooks[input.roleTarget] || rolePlaybooks.frontend;
  const keywords = extractKeywords(input);

  return [...techStack]
    .map((item) => ({
      ...item,
      score: scoreByTags(item.tags || [], keywords, playbook.priorityTags),
    }))
    .sort((a, b) => b.score - a.score);
}

export function buildPortfolioSnapshot() {
  return {
    profile,
    projects,
    skillGroups,
    techStack,
    timeline,
  };
}

export function buildPortfolioView(rawInput, aiResult = null) {
  const hasActivePersonalization = Boolean(rawInput);
  const input = normalizeInput(rawInput);
  const playbook = rolePlaybooks[input.roleTarget] || rolePlaybooks.frontend;
  const companyPlaybook = companyTypePlaybooks[input.companyType];
  const rankedProjects = rankProjects(input, aiResult);
  const rankedSkills = rankSkills(input, aiResult);
  const rankedTech = rankTech(input);
  const highlightedSkillNames = new Set(rankedSkills.slice(0, 4).map((skill) => skill.name));

  const heroBadge = hasActivePersonalization
    ? `personalized for ${input.jobTitle || playbook.label.toLowerCase()}`
    : profile.availability.toLowerCase();

  const recruiterLabel = input.companyName
    ? `${input.companyName}${input.jobTitle ? ` - ${input.jobTitle}` : ''}`
    : input.jobTitle || playbook.label;

  return {
    meta: {
      roleLabel: playbook.label,
      companyTypeLabel: companyTypeOptions.find((item) => item.value === input.companyType)?.label || '',
      recruiterRoleOptions,
      companyTypeOptions,
      footerLinkGroups,
      personalized: hasActivePersonalization,
      recruiterLabel,
      source: aiResult?.source || 'rules',
      sessionId: aiResult?.sessionId || '',
      promptVersion: aiResult?.promptVersion || '',
    },
    hero: {
      badge: heroBadge,
      titleLines: playbook.titleLines,
      typewriterRoles: aiResult?.typewriterRoles?.length ? aiResult.typewriterRoles : profile.defaultTypewriterRoles,
      headline: buildHeadline(input, playbook, aiResult),
      summary: buildSummary(input, playbook, companyPlaybook, aiResult),
      stackPills: aiResult?.stackPills?.length ? aiResult.stackPills : playbook.stackPills,
      recruiterContext: hasActivePersonalization ? recruiterLabel : 'General portfolio view',
      quickFacts: profile.quickFacts,
      code: profile.heroCode,
    },
    portfolio: {
      featured: rankedProjects[0],
      secondary: rankedProjects.slice(1, 5),
      title: hasActivePersonalization
        ? `Projects for ${playbook.label}`
        : 'Selected Work',
      subtitle: hasActivePersonalization
        ? `The project order below emphasizes the work most relevant to ${input.jobTitle || playbook.label.toLowerCase()}.`
        : 'A mix of product UI, business-facing experiences, and practical backend workflows.',
    },
    skills: {
      title: hasActivePersonalization ? `${playbook.label} Strengths` : 'Skills & Technical Range',
      subtitle: hasActivePersonalization
        ? `These skills are highlighted because they map closely to ${input.jobTitle || playbook.label.toLowerCase()} expectations.`
        : 'The areas I rely on most often when shipping React and full-stack work.',
      groups: skillGroups.map((group) => ({
        ...group,
        skills: group.skills.map((skill) => ({
          ...skill,
          highlighted: highlightedSkillNames.has(skill.name),
        })),
      })),
      chips: rankedTech.slice(0, 8),
      highlighted: rankedSkills.slice(0, 4),
    },
    whyMe: {
      title: hasActivePersonalization ? `Why I Fit ${playbook.label} Roles` : 'How I Work',
      subtitle: aiResult?.whyMeIntro || profile.longBio,
      reasons: (aiResult?.whyMe?.length ? aiResult.whyMe : playbook.whyMe).slice(0, 4),
    },
    timeline: {
      title: 'Recent Work & Direction',
      subtitle: hasActivePersonalization
        ? 'A quick read on the projects and direction most relevant to this role.'
        : 'A quick look at recent work and the direction of my portfolio.',
      items: timeline,
    },
    cta: {
      title: hasActivePersonalization ? 'Interested In The Fit?' : "Let's Talk",
      subtitle:
        aiResult?.cta ||
        (hasActivePersonalization
          ? `If you're hiring for ${input.jobTitle || playbook.label}, I'd be happy to walk through the projects above and why they were selected.`
          : 'If you are hiring for frontend or full-stack work, I would love to talk through product, code quality, and project ownership.'),
      primaryLabel: hasActivePersonalization ? 'Discuss this version' : 'Start a conversation',
      secondaryLabel: hasActivePersonalization ? 'Copy recruiter link' : 'View recruiter mode',
    },
    contact: {
      title: hasActivePersonalization ? 'Continue The Conversation' : 'Get In Touch',
      subtitle: hasActivePersonalization
        ? `This message will include the personalized session for ${recruiterLabel}.`
        : 'Share the role, team, or project context and I will reply with the most relevant work.',
    },
  };
}

export function buildShareQuery(activeInput, sessionId) {
  if (sessionId) return `?session=${encodeURIComponent(sessionId)}`;
  if (!activeInput) return '';

  const params = new URLSearchParams();
  if (activeInput.roleTarget) params.set('role', activeInput.roleTarget);
  if (activeInput.companyType) params.set('companyType', activeInput.companyType);
  if (activeInput.jobTitle) params.set('jobTitle', activeInput.jobTitle);
  if (activeInput.companyName) params.set('companyName', activeInput.companyName);
  return `?${params.toString()}`;
}

export function buildInputFromSearch(search) {
  const params = new URLSearchParams(search);
  const roleTarget = params.get('role');
  const sessionId = params.get('session');

  if (sessionId) {
    return { sessionId };
  }

  if (!roleTarget) {
    return null;
  }

  return normalizeInput({
    roleTarget,
    companyType: params.get('companyType') || defaultDraftInput.companyType,
    companyName: params.get('companyName') || '',
    jobTitle: params.get('jobTitle') || '',
  });
}
