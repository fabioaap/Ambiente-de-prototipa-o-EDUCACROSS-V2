/**
 * Unit tests for Progress component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress Component', () => {
  describe('Rendering', () => {
    it('should render linear progress by default', () => {
      render(<Progress value={50} aria-label="Test progress" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toBeInTheDocument();
      expect(progress).toHaveAttribute('aria-valuenow', '50');
      expect(progress).toHaveAttribute('aria-valuemin', '0');
      expect(progress).toHaveAttribute('aria-valuemax', '100');
    });

    it('should render circular progress', () => {
      render(<Progress value={75} variant="circular" aria-label="Circular progress" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toBeInTheDocument();
      expect(progress).toHaveClass('Progress_circular');
    });

    it('should show label when showLabel is true', () => {
      const { container } = render(<Progress value={60} showLabel />);
      
      expect(container.textContent).toContain('60%');
    });

    it('should show custom label', () => {
      const { container } = render(<Progress value={60} showLabel label="6/10" />);
      
      expect(container.textContent).toContain('6/10');
    });
  });

  describe('Value Clamping', () => {
    it('should clamp value to 0-100 range (negative)', () => {
      render(<Progress value={-10} aria-label="Negative test" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveAttribute('aria-valuenow', '0');
    });

    it('should clamp value to 0-100 range (over 100)', () => {
      render(<Progress value={150} aria-label="Over 100 test" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveAttribute('aria-valuenow', '100');
    });

    it('should handle exactly 0', () => {
      render(<Progress value={0} aria-label="Zero test" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveAttribute('aria-valuenow', '0');
    });

    it('should handle exactly 100', () => {
      render(<Progress value={100} aria-label="Full test" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveAttribute('aria-valuenow', '100');
    });
  });

  describe('Variants', () => {
    it('should apply linear variant class', () => {
      render(<Progress value={50} variant="linear" aria-label="Linear" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveClass('Progress_linear');
    });

    it('should apply circular variant class', () => {
      render(<Progress value={50} variant="circular" aria-label="Circular" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveClass('Progress_circular');
    });
  });

  describe('Sizes', () => {
    it('should apply sm size class', () => {
      render(<Progress value={50} size="sm" aria-label="Small" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveClass('Progress_sm');
    });

    it('should apply md size class by default', () => {
      render(<Progress value={50} aria-label="Medium" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveClass('Progress_md');
    });

    it('should apply lg size class', () => {
      render(<Progress value={50} size="lg" aria-label="Large" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveClass('Progress_lg');
    });
  });

  describe('Colors', () => {
    it('should apply primary color by default', () => {
      render(<Progress value={50} aria-label="Primary" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveClass('Progress_primary');
    });

    it('should apply success color', () => {
      render(<Progress value={50} color="success" aria-label="Success" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveClass('Progress_success');
    });

    it('should apply warning color', () => {
      render(<Progress value={50} color="warning" aria-label="Warning" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveClass('Progress_warning');
    });

    it('should apply error color', () => {
      render(<Progress value={50} color="error" aria-label="Error" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveClass('Progress_error');
    });

    it('should apply secondary color', () => {
      render(<Progress value={50} color="secondary" aria-label="Secondary" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveClass('Progress_secondary');
    });
  });

  describe('Accessibility', () => {
    it('should have progressbar role', () => {
      render(<Progress value={50} />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toBeInTheDocument();
    });

    it('should have aria-valuenow matching value', () => {
      render(<Progress value={75} aria-label="Test" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveAttribute('aria-valuenow', '75');
    });

    it('should have aria-valuemin of 0', () => {
      render(<Progress value={50} aria-label="Test" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveAttribute('aria-valuemin', '0');
    });

    it('should have aria-valuemax of 100', () => {
      render(<Progress value={50} aria-label="Test" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveAttribute('aria-valuemax', '100');
    });

    it('should use custom aria-label', () => {
      render(<Progress value={50} aria-label="Custom loading progress" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveAccessibleName('Custom loading progress');
    });

    it('should have default aria-label', () => {
      render(<Progress value={50} />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveAttribute('aria-label', 'Progress indicator');
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      render(<Progress value={50} className="custom-progress" aria-label="Test" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveClass('custom-progress');
    });

    it('should preserve default classes when custom className is provided', () => {
      render(<Progress value={50} className="custom-progress" variant="linear" size="md" aria-label="Test" />);
      const progress = screen.getByRole('progressbar');
      
      expect(progress).toHaveClass('Progress_progress');
      expect(progress).toHaveClass('Progress_linear');
      expect(progress).toHaveClass('Progress_md');
      expect(progress).toHaveClass('custom-progress');
    });
  });

  describe('SVG Rendering (Circular)', () => {
    it('should render SVG for circular variant', () => {
      const { container } = render(<Progress value={50} variant="circular" aria-label="Circular" />);
      const svg = container.querySelector('svg');
      
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('Progress_circularSvg');
    });

    it('should render background and progress circles', () => {
      const { container } = render(<Progress value={50} variant="circular" aria-label="Circular" />);
      const circles = container.querySelectorAll('circle');
      
      expect(circles).toHaveLength(2); // Background + progress
      expect(circles[0]).toHaveClass('Progress_circularBackground');
      expect(circles[1]).toHaveClass('Progress_circularProgress');
    });
  });
});
