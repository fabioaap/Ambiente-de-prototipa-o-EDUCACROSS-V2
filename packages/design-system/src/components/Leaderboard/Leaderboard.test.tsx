import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Leaderboard, type LeaderboardEntry } from './Leaderboard';

const mockEntries: LeaderboardEntry[] = [
  { id: '1', name: 'Alice Johnson', score: 1500, avatar: 'https://example.com/alice.jpg' },
  { id: '2', name: 'Bob Smith', score: 1350, avatar: 'https://example.com/bob.jpg' },
  { id: '3', name: 'Charlie Brown', score: 1200 },
  { id: '4', name: 'Diana Prince', score: 1100, badge: 'Champion' },
  { id: '5', name: 'Eve Wilson', score: 950 },
];

describe('Leaderboard Component', () => {
  describe('Rendering', () => {
    it('renders leaderboard with entries', () => {
      render(<Leaderboard entries={mockEntries} />);
      
      // Check if all entries are rendered
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(
        <Leaderboard entries={mockEntries} className="custom-class" />
      );
      
      const leaderboard = container.querySelector('.leaderboard');
      expect(leaderboard).toHaveClass('custom-class');
    });

    it('renders empty state when no entries', () => {
      render(<Leaderboard entries={[]} />);
      
      expect(screen.getByText(/no entries/i)).toBeInTheDocument();
    });
  });

  describe('Sorting', () => {
    it('sorts entries by score in descending order', () => {
      const { container } = render(<Leaderboard entries={mockEntries} />);
      
      const entryElements = container.querySelectorAll('.leaderboard__entry');
      const firstEntry = entryElements[0];
      const secondEntry = entryElements[1];
      
      // Alice (1500) should be first
      expect(firstEntry?.textContent).toContain('Alice Johnson');
      expect(firstEntry?.textContent).toContain('1500');
      
      // Bob (1350) should be second
      expect(secondEntry?.textContent).toContain('Bob Smith');
      expect(secondEntry?.textContent).toContain('1350');
    });

    it('maintains correct ranking after sorting', () => {
      const unsortedEntries: LeaderboardEntry[] = [
        { id: '1', name: 'Low Score', score: 100 },
        { id: '2', name: 'High Score', score: 500 },
        { id: '3', name: 'Mid Score', score: 300 },
      ];
      
      const { container } = render(<Leaderboard entries={unsortedEntries} />);
      
      const positions = container.querySelectorAll('.leaderboard__position');
      expect(positions[0]?.textContent).toBe('1');
      expect(positions[1]?.textContent).toBe('2');
      expect(positions[2]?.textContent).toBe('3');
    });
  });

  describe('Limit', () => {
    it('displays all entries when no limit is set', () => {
      render(<Leaderboard entries={mockEntries} />);
      
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
      expect(screen.getByText('Diana Prince')).toBeInTheDocument();
      expect(screen.getByText('Eve Wilson')).toBeInTheDocument();
    });

    it('limits displayed entries when limit is set', () => {
      render(<Leaderboard entries={mockEntries} limit={3} />);
      
      // Top 3 should be visible
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
      
      // 4th and 5th should not be visible
      expect(screen.queryByText('Diana Prince')).not.toBeInTheDocument();
      expect(screen.queryByText('Eve Wilson')).not.toBeInTheDocument();
    });
  });

  describe('Highlighting', () => {
    it('highlights entry when highlightId matches', () => {
      const { container } = render(
        <Leaderboard entries={mockEntries} highlightId="2" />
      );
      
      const entries = container.querySelectorAll('.leaderboard__entry');
      const bobEntry = Array.from(entries).find(entry => 
        entry.textContent?.includes('Bob Smith')
      );
      
      expect(bobEntry).toHaveClass('leaderboard__entry--highlighted');
    });

    it('does not highlight when highlightId does not match', () => {
      const { container } = render(
        <Leaderboard entries={mockEntries} highlightId="999" />
      );
      
      const highlightedEntries = container.querySelectorAll('.leaderboard__entry--highlighted');
      expect(highlightedEntries.length).toBe(0);
    });
  });

  describe('Top Badges', () => {
    it('shows badges for top 3 when showTopBadges is true', () => {
      const { container } = render(
        <Leaderboard entries={mockEntries} showTopBadges={true} />
      );
      
      const badges = container.querySelectorAll('.leaderboard__badge');
      expect(badges.length).toBeGreaterThanOrEqual(3);
    });

    it('does not show badges when showTopBadges is false', () => {
      const { container } = render(
        <Leaderboard entries={mockEntries} showTopBadges={false} />
      );
      
      // Should not have position badges (🥇, 🥈, 🥉)
      const firstEntry = container.querySelector('.leaderboard__entry');
      expect(firstEntry?.textContent).not.toContain('🥇');
    });

    it('displays correct medal emojis for top 3', () => {
      render(<Leaderboard entries={mockEntries} showTopBadges={true} />);
      
      // Check for medal emojis in the document
      expect(screen.getByText('🥇')).toBeInTheDocument(); // Gold
      expect(screen.getByText('🥈')).toBeInTheDocument(); // Silver
      expect(screen.getByText('🥉')).toBeInTheDocument(); // Bronze
    });
  });

  describe('Avatar Display', () => {
    it('renders avatar image when avatar URL is provided', () => {
      render(<Leaderboard entries={mockEntries} />);
      
      const avatar = screen.getByAlt('Alice Johnson avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', 'https://example.com/alice.jpg');
    });

    it('renders initials when no avatar URL is provided', () => {
      render(<Leaderboard entries={mockEntries} />);
      
      // Charlie Brown has no avatar
      expect(screen.getByText('CB')).toBeInTheDocument();
    });

    it('generates correct initials for single name', () => {
      const singleNameEntry: LeaderboardEntry[] = [
        { id: '1', name: 'Madonna', score: 1000 },
      ];
      
      render(<Leaderboard entries={singleNameEntry} />);
      expect(screen.getByText('M')).toBeInTheDocument();
    });

    it('generates correct initials for multi-word name', () => {
      const multiWordEntry: LeaderboardEntry[] = [
        { id: '1', name: 'Mary Jane Watson Parker', score: 1000 },
      ];
      
      render(<Leaderboard entries={multiWordEntry} />);
      expect(screen.getByText('MJ')).toBeInTheDocument();
    });
  });

  describe('Score Display', () => {
    it('displays scores with correct formatting', () => {
      const highScoreEntry: LeaderboardEntry[] = [
        { id: '1', name: 'High Scorer', score: 1234567 },
      ];
      
      render(<Leaderboard entries={highScoreEntry} />);
      
      // Score should be formatted with thousands separators
      expect(screen.getByText(/1[,.]234[,.]567/)).toBeInTheDocument();
    });

    it('displays zero score correctly', () => {
      const zeroScoreEntry: LeaderboardEntry[] = [
        { id: '1', name: 'New User', score: 0 },
      ];
      
      render(<Leboard entries={zeroScoreEntry} />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('Badge Display', () => {
    it('renders custom badge when provided', () => {
      render(<Leaderboard entries={mockEntries} />);
      
      // Diana Prince has a "Champion" badge
      expect(screen.getByText('Champion')).toBeInTheDocument();
    });

    it('does not render badge component when badge prop is missing', () => {
      const noBadgeEntry: LeaderboardEntry[] = [
        { id: '1', name: 'No Badge User', score: 100 },
      ];
      
      const { container } = render(<Leaderboard entries={noBadgeEntry} />);
      
      // Should not have any Badge components
      const badges = container.querySelectorAll('.badge');
      expect(badges.length).toBe(0);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA label', () => {
      render(<Leaderboard entries={mockEntries} aria-label="Top Players" />);
      
      expect(screen.getByLabelText('Top Players')).toBeInTheDocument();
    });

    it('uses default ARIA label when not provided', () => {
      const { container } = render(<Leaderboard entries={mockEntries} />);
      
      const leaderboard = container.querySelector('.leaderboard');
      expect(leaderboard).toHaveAttribute('aria-label');
    });

    it('maintains semantic list structure', () => {
      const { container } = render(<Leaderboard entries={mockEntries} />);
      
      const list = container.querySelector('[role="list"]');
      expect(list).toBeInTheDocument();
    });
  });

  describe('Empty States', () => {
    it('renders empty message with zero entries', () => {
      render(<Leaderboard entries={[]} />);
      
      expect(screen.getByText(/no entries/i)).toBeInTheDocument();
    });

    it('renders correctly after all entries are filtered out by limit', () => {
      render(<Leaderboard entries={mockEntries} limit={0} />);
      
      // Should show empty state
      expect(screen.getByText(/no entries/i)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles duplicate scores correctly', () => {
      const duplicateScores: LeaderboardEntry[] = [
        { id: '1', name: 'User 1', score: 100 },
        { id: '2', name: 'User 2', score: 100 },
        { id: '3', name: 'User 3', score: 100 },
      ];
      
      const { container } = render(<Leaderboard entries={duplicateScores} />);
      
      const entries = container.querySelectorAll('.leaderboard__entry');
      expect(entries.length).toBe(3);
    });

    it('handles very long names gracefully', () => {
      const longNameEntry: LeaderboardEntry[] = [
        {
          id: '1',
          name: 'Very Long Name That Should Be Truncated Or Handled Properly',
          score: 1000,
        },
      ];
      
      const { container } = render(<Leaderboard entries={longNameEntry} />);
      
      const nameElement = container.querySelector('.leaderboard__name');
      expect(nameElement).toBeInTheDocument();
    });

    it('handles negative scores', () => {
      const negativeScoreEntry: LeaderboardEntry[] = [
        { id: '1', name: 'Penalty User', score: -50 },
      ];
      
      render(<Leaderboard entries={negativeScoreEntry} />);
      expect(screen.getByText('-50')).toBeInTheDocument();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to container element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Leaderboard entries={mockEntries} ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('leaderboard');
    });
  });
});
