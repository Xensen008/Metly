import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format, isSameDay } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Note {
  id: string;
  content: string;
  createdAt: string;
}

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: Note[];
  onDelete: (id: string) => void;
}

const NotesModal = ({ isOpen, onClose, notes, onDelete }: NotesModalProps) => {
  // Group notes by date
  const groupedNotes = notes.reduce((groups, note) => {
    const date = new Date(note.createdAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dateString = format(date, 'MMM dd, yyyy');
    if (isSameDay(date, today)) dateString = 'Today';
    if (isSameDay(date, yesterday)) dateString = 'Yesterday';

    if (!groups[dateString]) {
      groups[dateString] = [];
    }
    groups[dateString].push(note);
    return groups;
  }, {} as Record<string, Note[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] p-0 bg-dark-2/95 border border-white/[0.08] backdrop-blur-xl">
        <DialogHeader className="p-6 border-b border-white/[0.08]">
          <DialogTitle className="text-xl font-semibold text-white/90">Your Notes</DialogTitle>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {Object.entries(groupedNotes).map(([date, dateNotes]) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <h3 className="text-sm font-medium text-white/70">{date}</h3>
              <div className="space-y-2">
                {dateNotes.map((note) => (
                  <motion.div
                    key={note.id}
                    layout
                    className="group flex items-start gap-3 p-4 rounded-xl
                             bg-white/[0.03] hover:bg-white/[0.05]
                             transition-colors duration-200"
                  >
                    <Pencil className="flex-shrink-0 size-4 text-white/40 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/90 whitespace-pre-wrap break-words">
                        {note.content}
                      </p>
                      <p className="mt-1 text-xs text-white/50">
                        {format(new Date(note.createdAt), 'h:mm a')}
                      </p>
                    </div>
                    <button
                      onClick={() => onDelete(note.id)}
                      className="opacity-0 group-hover:opacity-100 
                               transition-opacity p-2 hover:bg-white/[0.05] rounded-lg"
                    >
                      <Trash2 className="size-4 text-red-400" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {notes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-white/50">
              <p>No notes yet</p>
              <p className="text-sm mt-1">Start writing to keep track of your thoughts</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotesModal;
