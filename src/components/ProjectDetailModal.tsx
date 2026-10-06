import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import { LiveProjectButton } from './LiveProjectButton';

export interface ProjectData {
  number: string;
  title: string;
  category: 'Client' | 'Personal';
  images: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
  description?: string;
  tools?: string[];
  deliverables?: string[];
}

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenContact,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#111111] border border-[#D7E2EA]/20 rounded-[36px] p-6 sm:p-8 md:p-10 shadow-2xl text-[#D7E2EA] z-10 my-8 overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-6 right-6 text-[#D7E2EA]/60 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer z-10"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-mono text-[#BBCCD7] px-2.5 py-0.5 rounded-full bg-white/10 uppercase tracking-wider">
                  {project.number}
                </span>
                <span className="text-xs uppercase tracking-widest text-purple-400 font-medium">
                  {project.category} Project
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                {project.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.images.col2}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer px-6 py-2.5 text-xs sm:text-sm inline-flex items-center gap-2"
              >
                <span>View Full Resolution</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#D7E2EA]/80 font-light leading-relaxed mb-6">
            {project.description ||
              `A high-profile ${project.category.toLowerCase()} commission crafted with meticulous attention to 3D spatial dynamics, photorealistic shader surfaces, and brand storytelling. Built to captivate audiences and deliver elevated digital fidelity across all devices.`}
          </p>

          {/* Image Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
            <div className="md:col-span-5 flex flex-col gap-4">
              <img
                src={project.images.col1Top}
                alt={`${project.title} detail 1`}
                className="w-full h-48 sm:h-56 object-cover rounded-[24px] border border-white/10"
              />
              <img
                src={project.images.col1Bottom}
                alt={`${project.title} detail 2`}
                className="w-full h-56 sm:h-64 object-cover rounded-[24px] border border-white/10"
              />
            </div>
            <div className="md:col-span-7">
              <img
                src={project.images.col2}
                alt={`${project.title} hero`}
                className="w-full h-full min-h-[300px] object-cover rounded-[24px] border border-white/10"
              />
            </div>
          </div>

          {/* Metadata badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 mb-6 text-xs sm:text-sm">
            <div>
              <span className="text-[#BBCCD7] uppercase tracking-wider block font-medium mb-1">
                Tools & Pipeline
              </span>
              <p className="text-white/80 font-mono">
                {project.tools ? project.tools.join(' • ') : 'Blender 4.2 • Cinema 4D • Octane Render • Figma'}
              </p>
            </div>
            <div>
              <span className="text-[#BBCCD7] uppercase tracking-wider block font-medium mb-1">
                Deliverables
              </span>
              <p className="text-white/80">
                {project.deliverables ? project.deliverables.join(' • ') : 'High-Res CGI Renders • Interactive Assets • Social Cutdowns'}
              </p>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-xs text-[#D7E2EA]/60 uppercase tracking-widest">
              Ready for a custom creation like this?
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="text-sm font-semibold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
            >
              Discuss Your Project &rarr;
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
