// Add React import to resolve the 'React' namespace for ReactNode
import React from 'react';

export interface Skill {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface SampleProject {
  id: string;
  title: string;
  category: string;
  snippet: string;
  fullContent: string;
  accuracy: string;
  turnaround: string;
}

export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
  rating: number;
}