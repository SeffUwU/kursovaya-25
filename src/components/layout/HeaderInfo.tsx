import type { Nullable } from '@/types/utils/utils.types';
import { House, Users, Bolt } from 'lucide-react';

const typeToIconMap = {
  employee: Users,
  part: Bolt,
};

interface HeaderInfoProps {
  title?: Nullable<string>;
  description?: Nullable<string>;
  type?: keyof typeof typeToIconMap;
}

export function HeaderInfo({ title, description, type }: HeaderInfoProps) {
  const Icon = type ? typeToIconMap[type] : House;

  return (
    <div className="w-full p-2dark:border-l-2 dark:border-l-slate-300 mb-2">
      <h3 className="pb-0 flex flex-row gap-2 items-center">
        <Icon />
        {title}
      </h3>
      <p>{description}</p>
    </div>
  );
}
