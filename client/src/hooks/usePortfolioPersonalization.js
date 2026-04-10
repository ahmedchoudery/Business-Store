import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { defaultDraftInput } from '../data/portfolioContent';
import {
  buildInputFromSearch,
  buildPortfolioSnapshot,
  buildPortfolioView,
  buildShareQuery,
} from '../lib/personalization';

function mergeServerPayload(payload) {
  return {
    sessionId: payload.sessionId || '',
    source: payload.source || 'rules',
    promptVersion: payload.promptVersion || '',
    headline: payload.headline || '',
    summary: payload.summary || '',
    highlightedSkills: payload.highlightedSkills || [],
    featuredProjectIds: payload.featuredProjectIds || [],
    whyMe: payload.whyMe || [],
    whyMeIntro: payload.whyMeIntro || '',
    cta: payload.cta || '',
    typewriterRoles: payload.typewriterRoles || [],
    stackPills: payload.stackPills || [],
  };
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const input = document.createElement('textarea');
  input.value = value;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

export function usePortfolioPersonalization() {
  const [draftInput, setDraftInput] = useState(defaultDraftInput);
  const [activeInput, setActiveInput] = useState(null);
  const [activeResult, setActiveResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function hydrateFromSearch() {
      const hydrated = buildInputFromSearch(window.location.search);
      if (!hydrated) return;

      if (hydrated.sessionId) {
        setLoading(true);
        try {
          const response = await api.get(`/personalize/${hydrated.sessionId}`);
          if (cancelled) return;

          const payload = response.data?.data;
          if (!payload?.input) {
            throw new Error('Saved personalization payload is incomplete.');
          }

          setDraftInput({ ...defaultDraftInput, ...payload.input });
          setActiveInput({ ...defaultDraftInput, ...payload.input });
          setActiveResult(mergeServerPayload(payload.output || {}));
        } catch (error) {
          if (!cancelled) {
            toast.error(error.userMessage || 'Unable to load the saved recruiter view.');
          }
        } finally {
          if (!cancelled) setLoading(false);
        }

        return;
      }

      setDraftInput({ ...defaultDraftInput, ...hydrated });
      setActiveInput({ ...defaultDraftInput, ...hydrated });
      setActiveResult(null);
    }

    hydrateFromSearch();
    return () => {
      cancelled = true;
    };
  }, []);

  const view = buildPortfolioView(activeInput, activeResult);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setDraftInput((current) => ({ ...current, [name]: value }));
  };

  const handleGenerate = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const requestPayload = {
        input: draftInput,
        portfolio: buildPortfolioSnapshot(),
      };
      const response = await api.post('/personalize', requestPayload);
      const payload = response.data?.data;

      setActiveInput({ ...defaultDraftInput, ...draftInput });
      setActiveResult(mergeServerPayload(payload.output || {}));

      const nextSearch = buildShareQuery(draftInput, payload.output?.sessionId);
      window.history.replaceState({}, '', `${window.location.pathname}${nextSearch}`);

      toast.success(payload.output?.source === 'ai'
        ? 'Personalized recruiter view generated with AI.'
        : 'Recruiter view generated using portfolio rules.');
    } catch (error) {
      setActiveInput({ ...defaultDraftInput, ...draftInput });
      setActiveResult(null);
      window.history.replaceState({}, '', `${window.location.pathname}${buildShareQuery(draftInput)}`);
      toast.error(error.userMessage || 'Using local personalization fallback.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDraftInput(defaultDraftInput);
    setActiveInput(null);
    setActiveResult(null);
    window.history.replaceState({}, '', window.location.pathname);
    toast.success('Returned to the default portfolio view.');
  };

  const handleCopyLink = async () => {
    const query = buildShareQuery(activeInput || draftInput, activeResult?.sessionId);
    const url = `${window.location.origin}${window.location.pathname}${query}`;
    try {
      await copyText(url);
      toast.success('Share link copied to clipboard.');
    } catch (error) {
      toast.error('Could not copy the share link automatically.');
    }
  };

  return {
    draftInput,
    view,
    loading,
    handleFieldChange,
    handleGenerate,
    handleReset,
    handleCopyLink,
  };
}
