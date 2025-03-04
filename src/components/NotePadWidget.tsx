'use client';

import { useState, useEffect } from 'react';
import { Pencil, ChevronRight, ChevronLeft, Trash2 } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
import NotesModal from './NotesModal';

interface Note {
  id: string;
  content: string;
  createdAt: string;
}

const NotePadWidget = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('meeting-notes') || '[]');
    }
    return [];
  });
  const [currentNote, setCurrentNote] = useState('');
  const [isShowingNotes, setIsShowingNotes] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('meeting-notes', JSON.stringify(notes));
  }, [notes]);

  const saveNote = () => {
    if (!currentNote.trim()) return;
    setNotes(prev => [{
      id: crypto.randomUUID(),
      content: currentNote,
      createdAt: new Date().toISOString(),
    }, ...prev]);
    setCurrentNote('');
  };

  return (
    <div className="relative flex flex-col gap-4 p-6 rounded-xl 
                  border border-white/[0.08] bg-gradient-to-br 
                  from-dark-2/80 via-dark-1/90 to-dark-2/80 
                  backdrop-blur-sm h-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white/90">Quick Notes</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
                   bg-white/5 text-white/70 text-sm
                   transition-colors hover:bg-white/10"
        >
          View All Notes
        </button>
      </div>

      {/* Note Input */}
      <div className="flex-1 relative">
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              saveNote();
            }
          }}
          placeholder="Write a note... (Press Enter to save)"
          className="w-full h-full resize-none rounded-lg p-4 
                   bg-white/[0.03] border border-white/[0.08]
                   text-white/90 placeholder:text-white/30
                   focus:outline-none focus:ring-1 focus:ring-blue-500/30
                   text-sm leading-relaxed"
          maxLength={280}
        />
      </div>

      {/* Recent Notes Preview */}
      {notes.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Pencil className="size-4" />
          <span>{notes.length} note{notes.length !== 1 ? 's' : ''} saved</span>
        </div>
      )}

      {/* Notes Modal */}
      <NotesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notes={notes}
        onDelete={(id) => setNotes(prev => prev.filter(note => note.id !== id))}
      />
    </div>
  );
};

export default NotePadWidget;
