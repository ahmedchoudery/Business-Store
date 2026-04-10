const mongoose = require('mongoose');

const personalizationSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    input: {
      roleTarget: { type: String, default: 'frontend' },
      companyType: { type: String, default: 'startup' },
      recruiterName: { type: String, default: '' },
      companyName: { type: String, default: '' },
      jobTitle: { type: String, default: '' },
      jobDescription: { type: String, default: '' },
    },
    output: {
      headline: { type: String, default: '' },
      summary: { type: String, default: '' },
      highlightedSkills: [{ type: String }],
      featuredProjectIds: [{ type: String }],
      whyMe: [{ type: String }],
      whyMeIntro: { type: String, default: '' },
      cta: { type: String, default: '' },
      typewriterRoles: [{ type: String }],
      stackPills: [{ type: String }],
      sessionId: { type: String, default: '' },
      source: { type: String, default: 'rules' },
      promptVersion: { type: String, default: 'recruiter-portfolio-v1' },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Personalization || mongoose.model('Personalization', personalizationSchema);
