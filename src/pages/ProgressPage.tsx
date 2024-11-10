import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock, BookOpen, Trophy } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Learning Progress</h1>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <Clock className="h-6 w-6 mb-2 text-primary" />
              <CardTitle className="text-lg">Time Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-6 w-6 mb-2 text-primary" />
              <CardTitle className="text-lg">Lessons Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0/12</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Trophy className="h-6 w-6 mb-2 text-primary" />
              <CardTitle className="text-lg">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Start Your Journey</h2>
            <p className="text-muted-foreground">
              Your progress will be displayed here as you complete lessons and earn achievements.
              Begin learning by selecting a course from the sidebar.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};