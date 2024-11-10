import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, Rocket, Users } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to Interactive Learning</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Interactive Lessons</CardTitle>
              <CardDescription>Learn through hands-on exercises and real-time feedback</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Rocket className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Self-Paced</CardTitle>
              <CardDescription>Learn at your own speed with structured content</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Get help from our AI tutor whenever you need</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="text-muted-foreground mb-4">
              Begin your learning journey by following these steps:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Select a course from the sidebar</li>
              <li>Follow the interactive lessons</li>
              <li>Complete exercises to reinforce learning</li>
              <li>Track your progress as you advance</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};