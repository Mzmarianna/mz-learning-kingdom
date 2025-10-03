
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { BookOpen, MessageSquare, Compass, Award, Shield } from "lucide-react";
import dynamic from 'next/dynamic';
import Image from 'next/image';

const AvatarCustomizer = dynamic(() => import('@/app/components/profile/AvatarCustomizer'), { ssr: false });

export default function ProfilePage() {
  // Mock data - this will be replaced with real data from Firebase
  const student = {
    name: "Alex Ryder",
    level: "Explorer",
    xp: 65,
    avatarUrl: "/wowl.png", // Placeholder avatar
    quest: {
      title: "The Quest for the Lost Glyphs",
      challenges: 16,
      completed: 10,
    },
    tutor: {
      name: "Wowl the Owl",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-kingdom-background-start to-kingdom-background-end text-kingdom-foreground p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        
        {/* Student Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="w-24 h-24 border-4 border-kingdom-accent-gold shadow-glow-gold">
              <Image src={student.avatarUrl} alt={student.name} width={96} height={96} />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold font-serif text-white">{student.name}</h1>
              <div className="flex items-center gap-2 text-xl text-kingdom-accent-teal">
                <Shield size={24} />
                <span>{student.level}</span>
              </div>
            </div>
          </div>
          <div className="text-right mt-4 sm:mt-0">
            <p className="text-lg text-kingdom-muted">Level Progress</p>
            <Progress value={student.xp} className="w-48 mt-1 bg-kingdom-background-start border-2 border-kingdom-accent-purple shadow-glow-purple" />
            <p className="text-sm text-kingdom-accent-purple mt-1">{student.xp}% to next level</p>
          </div>
        </header>

        {/* Main Dashboard Grid */}
        <main className="grid md:grid-cols-3 gap-6">

          {/* Left Column: Quest & Map */}
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-kingdom-background-start/50 border-kingdom-muted/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-kingdom-accent-gold font-serif">
                  <BookOpen />
                  Current Quest
                </CardTitle>
                <CardDescription>From your mentor, {student.tutor.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-bold text-white mb-2">{student.quest.title}</h3>
                <p className="text-kingdom-muted mb-4">You have completed {student.quest.completed} of {student.quest.challenges} challenges.</p>
                <Progress value={(student.quest.completed / student.quest.challenges) * 100} className="bg-kingdom-background-start border border-kingdom-accent-teal shadow-glow-teal" />
                <Button className="mt-4 bg-kingdom-accent-teal text-kingdom-background-start font-bold shadow-glow-teal hover:bg-teal-300">
                  Continue Quest
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-kingdom-background-start/50 border-kingdom-muted/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-kingdom-accent-purple font-serif">
                  <Compass />
                  Your Personalized Map
                </CardTitle>
                <CardDescription>Explore the realms you&apos;ve unlocked and see your journey.</CardDescription>
              </CardHeader>
              <CardContent>
                 {/* Placeholder for the map component */}
                 <div className="w-full h-64 bg-kingdom-background-end rounded-lg flex items-center justify-center border-2 border-dashed border-kingdom-muted/30">
                   <p className="text-kingdom-muted">Map coming soon...</p>
                 </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Messaging & Badges */}
          <div className="space-y-6">
            <Card className="bg-kingdom-background-start/50 border-kingdom-muted/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-kingdom-accent-gold font-serif">
                  <MessageSquare />
                  Tutor Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Placeholder for messaging component */}
                <div className="h-48 bg-kingdom-background-end rounded-lg flex items-center justify-center border-2 border-dashed border-kingdom-muted/30">
                  <p className="text--muted">Messaging coming soon...</p>
                </div>
                <Button className="w-full mt-4 bg-kingdom-accent-gold text-kingdom-background-start font-bold shadow-glow-gold hover:bg-yellow-300">
                  New Message
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-kingdom-background-start/50 border-kingdom-muted/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-kingdom-accent-purple font-serif">
                  <Award />
                  My Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Placeholder for badges component */}
                <div className="h-32 bg-kingdom-background-end rounded-lg flex items-center justify-center border-2 border-dashed border-kingdom-muted/30">
                  <p className="text-kingdom-muted">Badge collection coming soon...</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-kingdom-background-start/50 border-kingdom-muted/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-kingdom-accent-gold font-serif">
                  <AvatarCustomizer />
                  Customize Avatar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AvatarCustomizer />
              </CardContent>
            </Card>
          </div>

        </main>
      </div>
    </div>
  );
}
