import React from 'react';
import { ProjectCaseStudy } from '../../types';

export const CaseStudyModal: React.FC<{ study: ProjectCaseStudy; projectName?: string; onClose: () => void }> = ({ study, projectName = 'Project', onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur p-4 sm:p-8 overflow-y-auto" role="dialog" aria-modal="true" aria-label={`${projectName} case study`}>
    <div className="max-w-5xl mx-auto bg-[#111215] border border-[#242730] rounded-2xl p-6 sm:p-10 text-white shadow-2xl">
      <div className="flex justify-between items-start gap-4 mb-8">
        <div>
          <p className="text-xs font-mono tracking-[0.25em] text-orange-400">ENGINEERING CASE STUDY</p>
          <h2 className="text-3xl sm:text-5xl font-bold mt-2">{projectName}</h2>
        </div>
        <button onClick={onClose} className="px-4 py-2 border border-neutral-700 rounded font-mono text-sm hover:border-orange-400">CLOSE</button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 font-mono text-sm">
        <div className="p-5 rounded border border-neutral-800 bg-black/30"><b className="text-orange-400">Challenge</b><p className="mt-3 text-neutral-300">{study.challenge}</p></div>
        <div className="p-5 rounded border border-neutral-800 bg-black/30"><b className="text-orange-400">Solution</b><p className="mt-3 text-neutral-300">{study.solution}</p></div>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div><h3 className="text-orange-400 font-mono mb-3">Architecture</h3>{study.architecture.map(item => <p key={item} className="text-neutral-300 text-sm mb-2">• {item}</p>)}</div>
        <div><h3 className="text-orange-400 font-mono mb-3">Technology</h3>{study.technologies.map(item => <span key={item} className="inline-block m-1 px-3 py-1 border border-neutral-700 rounded text-xs">{item}</span>)}</div>
        <div><h3 className="text-orange-400 font-mono mb-3">Results</h3>{study.results.map(item => <p key={item} className="text-neutral-300 text-sm mb-2">• {item}</p>)}</div>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {study.screenshots.map(image => <img key={image} src={image} alt={`${projectName} screenshot`} loading="lazy" className="rounded border border-neutral-800" />)}
      </div>
    </div>
  </div>
);
