import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/admin/ui/Button';
import { Field } from '@/components/admin/ui/Field';
import type { TeamMember } from '@/types/studio';

interface TeamEditorProps {
  team: TeamMember[];
  onChange: (team: TeamMember[]) => void;
}

/** About page: instructor profiles list (name, role, bio). */
export function TeamEditor({ team, onChange }: TeamEditorProps) {
  const updateMember = (index: number, patch: Partial<TeamMember>) =>
    onChange(team.map((p, j) => (j === index ? { ...p, ...patch } : p)));

  return (
    <div className="subsection">
      <h3>Instructor profiles</h3>
      <p>Profiles can be entered after names, biographies and photos are approved.</p>
      <Button
        variant="secondary"
        icon={Plus}
        onClick={() => onChange([...team, { name: '', role: '', bio: '' }])}
      >
        Add person
      </Button>

      {team.map((person, i) => (
        <div className="team-row" key={i}>
          <Field label="Name" value={person.name} onChange={(v) => updateMember(i, { name: v })} />
          <Field label="Role" value={person.role} onChange={(v) => updateMember(i, { role: v })} />
          <Field
            label="Bio"
            value={person.bio}
            type="textarea"
            onChange={(v) => updateMember(i, { bio: v })}
          />
        </div>
      ))}
    </div>
  );
}
