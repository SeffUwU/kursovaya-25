'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Ellipsis } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Arrow } from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import { leaveCampaign } from '@/server/actions/campaigns/leaveCampaign';

interface CampaignActionsProps {
  campaignId: string;
  canEditCampaign: boolean;
}
export function CampaignActions({ campaignId, canEditCampaign }: CampaignActionsProps) {
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <Ellipsis />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2" side="left">
        {canEditCampaign && (
          <>
            <Button>Edit</Button>
            <Button>Copy Invite Link</Button>
          </>
        )}
        <Button
          variant="destructive"
          className={cn({
            'bg-gray-400': canEditCampaign,
          })}
        >
          {canEditCampaign ? "Can't leave create campaign" : 'Leave'}
        </Button>
      </PopoverContent>
    </Popover>
  );

  function handleLeave() {
    leaveCampaign(campaignId).then((response) => {

    } )
  }
}
