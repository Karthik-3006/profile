import React, { useEffect, useState, useMemo } from 'react';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import { Check, Copy } from 'lucide-react';

hljs.registerLanguage('python', python);

export function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const highlightedHtml = useMemo(() => {
    try {
      return hljs.highlight(code, { language: 'python' }).value;
    } catch {
      return code;
    }
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (err) {
      console.error('Unable to copy code to clipboard.', err);
    }
  };

  return (
    <div className="code-block">
      <div className="code-block__toolbar">
        <span>Python</span>
        <button type="button" onClick={handleCopy} aria-label="Copy code">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>
        <code
          className="hljs language-python"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </pre>
    </div>
  );
}

function renderDomNode(node, key) {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }
  if (!(node instanceof HTMLElement)) {
    return null;
  }

  const tag = node.tagName.toLowerCase();
  if (tag === 'pre') {
    return <CodeBlock key={key} code={node.textContent ?? ''} />;
  }

  const children = Array.from(node.childNodes).map((child, idx) =>
    renderDomNode(child, `${key}-${idx}`)
  );

  const props = { key };
  if (tag === 'a') {
    const href = node.getAttribute('href');
    if (href) {
      props.href = href;
      props.target = '_blank';
      props.rel = 'noreferrer';
    }
  }

  const allowedTags = [
    'h1',
    'h2',
    'h3',
    'h4',
    'p',
    'ul',
    'ol',
    'li',
    'strong',
    'em',
    'blockquote',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'a',
  ];

  if (allowedTags.includes(tag)) {
    return React.createElement(tag, props, children);
  }
  if (tag === 'br') {
    return <br key={key} />;
  }
  return <span key={key}>{children}</span>;
}

function parseExperimentHtml(rawHtml) {
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'a',
      'b',
      'blockquote',
      'br',
      'em',
      'h1',
      'h2',
      'h3',
      'h4',
      'i',
      'li',
      'ol',
      'p',
      'pre',
      'strong',
      'table',
      'tbody',
      'td',
      'th',
      'thead',
      'tr',
      'ul',
    ],
    ALLOWED_ATTR: ['href'],
  });

  const doc = new DOMParser().parseFromString(cleanHtml, 'text/html');
  const elements = [];

  for (let i = 0; i < doc.body.childNodes.length; i += 1) {
    const node = doc.body.childNodes[i];
    if (node instanceof HTMLElement && node.tagName.toLowerCase() === 'pre') {
      const lines = [node.textContent ?? ''];
      while (
        doc.body.childNodes[i + 1] instanceof HTMLElement &&
        doc.body.childNodes[i + 1].tagName.toLowerCase() === 'pre'
      ) {
        i += 1;
        lines.push(doc.body.childNodes[i].textContent ?? '');
      }
      elements.push(<CodeBlock key={`code-${i}`} code={lines.join('\n')} />);
    } else {
      elements.push(renderDomNode(node, `doc-${i}`));
    }
  }

  return elements;
}

export default function DocumentViewer({ source }) {
  const [rawHtml, setRawHtml] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setRawHtml(null);
    setError(false);

    fetch(source, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Document preview request failed: ${res.status}`);
        }
        return res.text();
      })
      .then((text) => setRawHtml(text))
      .catch((err) => {
        if (err instanceof Error && err.name === 'AbortError') return;
        console.error('Unable to load the experiment document preview.', err);
        setError(true);
      });

    return () => controller.abort();
  }, [source]);

  const elements = useMemo(() => {
    if (!rawHtml) return [];
    return parseExperimentHtml(rawHtml);
  }, [rawHtml]);

  if (error) {
    return <p className="document-message">Experiment document preview unavailable.</p>;
  }

  if (rawHtml === null) {
    return <p className="document-message">Loading experiment document…</p>;
  }

  return <div className="document-content">{elements}</div>;
}
