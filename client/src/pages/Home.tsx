import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Zap, Trophy, Clock, MessageSquare } from "lucide-react";

/**
 * Design Philosophy: Classical Modernism - Debate Amphitheater
 * Color Palette: Deep slate blue (#2C3E50) + Warm gold (#D4AF37) + Soft cream (#F5F1E8)
 * Typography: Georgia (serif) for titles, Montserrat (bold) for headings, Lato for body
 * Layout: Asymmetric with emphasis on debate flow and argument visibility
 */

interface GameRoom {
  id: string;
  topic: string;
  players: number;
  maxPlayers: number;
  status: "waiting" | "active" | "finished";
  timeRemaining: number;
}

export default function Home() {
  const [gameRooms, setGameRooms] = useState<GameRoom[]>([
    {
      id: "room-1",
      topic: "Should AI regulation be stricter?",
      players: 4,
      maxPlayers: 8,
      status: "active",
      timeRemaining: 8,
    },
    {
      id: "room-2",
      topic: "Is climate change the top global priority?",
      players: 2,
      maxPlayers: 8,
      status: "waiting",
      timeRemaining: 0,
    },
    {
      id: "room-3",
      topic: "Should universal basic income be implemented?",
      players: 6,
      maxPlayers: 8,
      status: "active",
      timeRemaining: 5,
    },
  ]);

  const [playerName, setPlayerName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const handleJoinRoom = (roomId: string) => {
    if (playerName.trim()) {
      setSelectedRoom(roomId);
      // In a real app, this would connect to backend
      console.log(`Joining room ${roomId} as ${playerName}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800";
      case "waiting":
        return "bg-blue-100 text-blue-800";
      case "finished":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663432987603/X3beuKQ3L9TLkrn7Lk2Txs/hero-debate-arena-o5GGa2K68feL3Zbg3uaXn2.webp')`,
            opacity: 0.4,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="proposition-title mb-6 text-5xl md:text-7xl">
            Optimistic Orator
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 font-lato">
            Debate with AI Consensus. Compete for XP. Shape the Future.
          </p>
          <p className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto">
            Join multiplayer debate rooms where your arguments are evaluated by AI validators using GenLayer's Optimistic Democracy. Earn XP, climb the leaderboard, and prove your debating prowess.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">Multiplayer Debates</h3>
              <p className="text-sm text-foreground/70">4-8 players per room, weekly topics</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">AI Consensus</h3>
              <p className="text-sm text-foreground/70">LLM-powered validators evaluate arguments</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">XP Rewards</h3>
              <p className="text-sm text-foreground/70">Earn XP, climb leaderboards, unlock badges</p>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-accent text-accent-foreground hover:opacity-90 text-lg px-8 py-6">
                Start Debating Now
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter Your Name</DialogTitle>
                <DialogDescription>
                  Choose a name to display on the leaderboard and in debates.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="player-name">Player Name</Label>
                  <Input
                    id="player-name"
                    placeholder="Your debate name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-primary text-primary-foreground"
                  onClick={() => {
                    if (playerName.trim()) {
                      // Proceed to room selection
                      console.log("Player name set:", playerName);
                    }
                  }}
                >
                  Continue
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Game Rooms Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-montserrat font-bold mb-4 text-foreground">
            Active Debate Rooms
          </h2>
          <p className="text-foreground/70 text-lg">
            Join a room and start debating. Each game lasts 10-15 minutes with real-time AI validation.
          </p>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="waiting">Waiting</TabsTrigger>
            <TabsTrigger value="finished">Finished</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {gameRooms
              .filter((room) => room.status === "active")
              .map((room) => (
                <GameRoomCard
                  key={room.id}
                  room={room}
                  onJoin={() => handleJoinRoom(room.id)}
                  playerName={playerName}
                />
              ))}
          </TabsContent>

          <TabsContent value="waiting" className="space-y-4">
            {gameRooms
              .filter((room) => room.status === "waiting")
              .map((room) => (
                <GameRoomCard
                  key={room.id}
                  room={room}
                  onJoin={() => handleJoinRoom(room.id)}
                  playerName={playerName}
                />
              ))}
          </TabsContent>

          <TabsContent value="finished" className="space-y-4">
            {gameRooms
              .filter((room) => room.status === "finished")
              .map((room) => (
                <GameRoomCard
                  key={room.id}
                  room={room}
                  onJoin={() => handleJoinRoom(room.id)}
                  playerName={playerName}
                />
              ))}
          </TabsContent>
        </Tabs>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-montserrat font-bold mb-8 text-foreground">
            Weekly Leaderboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { rank: 1, name: "DebateMaster", xp: 2850, badge: "🏆" },
              { rank: 2, name: "LogicSeeker", xp: 2620, badge: "🥈" },
              { rank: 3, name: "ConsensusBuilder", xp: 2410, badge: "🥉" },
            ].map((player) => (
              <Card key={player.rank} className="border-2 border-accent/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{player.badge}</CardTitle>
                    <Badge variant="outline" className="text-lg">
                      #{player.rank}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-montserrat font-bold text-lg mb-2">{player.name}</p>
                  <p className="text-accent font-bold text-2xl">{player.xp} XP</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-montserrat font-bold mb-12 text-foreground">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: 1,
              title: "Join a Room",
              description: "Select a debate topic and join 4-8 other players.",
              icon: Users,
            },
            {
              step: 2,
              title: "Debate",
              description: "Write arguments for or against the proposition in 5 minutes.",
              icon: MessageSquare,
            },
            {
              step: 3,
              title: "AI Validation",
              description: "AI validators evaluate clarity, coherence, and persuasiveness.",
              icon: Zap,
            },
            {
              step: 4,
              title: "Earn XP",
              description: "Receive XP based on validator consensus and argument quality.",
              icon: Trophy,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <div className="text-3xl font-montserrat font-bold text-accent mb-2">
                  {item.step}
                </div>
                <h3 className="font-montserrat font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-4">
            Optimistic Orator is powered by GenLayer's Intelligent Contracts and Optimistic Democracy.
          </p>
          <p className="text-sm opacity-80">
            © 2026 GenLayer Community. Built for thoughtful debate and AI consensus.
          </p>
        </div>
      </footer>
    </div>
  );
}

interface GameRoomCardProps {
  room: GameRoom;
  onJoin: () => void;
  playerName: string;
}

function GameRoomCard({ room, onJoin, playerName }: GameRoomCardProps) {
  return (
    <Card className="border-2 border-border hover:border-accent/50 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{room.topic}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Badge className={getStatusColor(room.status)}>
                {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
              </Badge>
              {room.status === "active" && (
                <span className="flex items-center gap-1 text-sm">
                  <Clock className="w-4 h-4" />
                  {room.timeRemaining} min left
                </span>
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-foreground/60" />
              <span className="text-sm">
                {room.players}/{room.maxPlayers} players
              </span>
            </div>
          </div>
          <Button
            onClick={onJoin}
            disabled={!playerName.trim()}
            className="bg-accent text-accent-foreground hover:opacity-90"
          >
            Join Room
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-red-100 text-red-800";
    case "waiting":
      return "bg-blue-100 text-blue-800";
    case "finished":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
