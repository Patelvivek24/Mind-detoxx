import React from 'react';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { getAdminNavItem } from '@/data/admin/navigation';
import { Button } from '@/components/admin/ui/Button';

export const WelcomeBanner: React.FC = () => {
  return (
    <div className="welcome">
      <div>
        <span className="overline">TUESDAY · 29 SEPTEMBER 2026</span>
        <h2>A little more clarity for every day.</h2>
        <p>Manage classes, content and bookings from one calm workspace.</p>
        <Link href={getAdminNavItem('schedule').href}>
          <Button variant="light" icon={CalendarDays}>
            Open calendar
          </Button>
        </Link>
      </div>
      <div className="welcome-orb" aria-hidden="true">
        <i />
        <i />
        <i />✺
      </div>
    </div>
  );
};

export default WelcomeBanner;
