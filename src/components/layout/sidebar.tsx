'use client';

import useDarkMode from '@/hooks/useDarkMode';
import { cn } from '@/lib/utils';
import { Separator } from '@radix-ui/react-separator';
import {
  Backpack,
  Bolt,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  ClipboardList,
  Cog,
  Computer,
  House,
  Languages,
  Menu,
  Moon,
  Store,
  Sun,
  TentTree,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { DebugButtons } from '../admin/debug.buttons';
import { useContextUser, useGlobalContext } from '../contexts/global.client.context';
import { Button } from '../ui/button';
import { SideBarButton } from './SideBarButton';

export function Sidebar() {
  const {
    ui: {
      sidebar: { expanded, setExpanded },
      loading,
    },
  } = useGlobalContext();
  const { uiLocale } = useContextUser();
  const router = useRouter();
  const { toggleTheme, isDarkModeEnabled } = useDarkMode();
  const className = cn('w-full flex flex-row', { 'justify-start': expanded });
  const pathname = usePathname();

  if (loading) {
    return loading;
  }

  return (
    <>
      <div
        className={cn(
          'h-screen bg-slate-50 dark:bg-slate-800 w-12 border-r-2 items-start flex-col justify-between animate-in duration-200 hidden md:flex',
          {
            'w-40': expanded,
          },
        )}
        style={{
          transition: 'width 0.2s',
        }}
      >
        <div className="flex flex-col px-2 gap-2 w-full pt-2">
          <Link href={'/'} className="w-full flex items-center justify-center text-blue-800 hover:text-blue-400">
            <Cog className="" />
          </Link>

          <Separator orientation="horizontal" />
          <SideBarButton
            {...{
              expanded,
              className,
              title: 'Главная',
              isActive: pathname === '/',
            }}
          >
            <House />
          </SideBarButton>
          <SideBarButton
            {...{
              expanded,
              className,
              title: 'Сотрудники',
              href: '/employees',
              isActive: pathname.includes('employees'),
            }}
          >
            <Users />
          </SideBarButton>
          <SideBarButton
            {...{
              expanded,
              className,
              title: 'Магазины',
              href: '/stores',
              isActive: pathname.includes('stores'),
            }}
          >
            <Store />
          </SideBarButton>
          <SideBarButton
            {...{
              expanded,
              className,
              title: 'Детали',
              href: '/parts',
              isActive: pathname.includes('parts'),
            }}
          >
            <Bolt />
          </SideBarButton>
          <SideBarButton
            {...{
              expanded,
              className,
              title: 'Модели',
              href: '/repaired-devices',
              isActive: pathname.includes('repaired-devices'),
            }}
          >
            <Computer />
          </SideBarButton>

          <Separator orientation="horizontal" />
        </div>
        <div className="flex flex-col px-2 gap-2 w-full">
          <DebugButtons className={className} />

          <SideBarButton
            {...{
              expanded,
              className,
              title: 'Сменить тему',
              href: '#',
              onClick: () => {
                toggleTheme();
              },
            }}
          >
            {isDarkModeEnabled ? <Sun /> : <Moon />}
          </SideBarButton>
          <SideBarButton
            {...{
              expanded,
              className,
              title: 'Профиль',
              href: '/profile',
              isActive: pathname.includes('profile'),
            }}
          >
            <CircleUserRound />
          </SideBarButton>
          <Button variant="ghost" className={className} onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>
      </div>
      <div className="md:hidden absolute top-0 w-full h-12 bg-white dark:bg-slate-950">
        <div className="absolute top-4 left-2">
          <Menu />
        </div>
      </div>
    </>
  );
}
