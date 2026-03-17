import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Zap, CheckCircle } from "lucide-react";

/**
 * Design Philosophy: Classical Modernism - Debate Amphitheater
 * Showcases the game flow: Preparation → Argument Submission → Validation → Results
 */

type GamePhase = "preparation" | "debate" | "validation" | "results";

interface Player {
  id: string;
  name: string;
  stance: "for" | "against";
  argument?: string;
  score?: number;
}

interface ValidatorFeedback {
  clarity: number;
  coherence: number;
  persuasiveness: number;
  evidence: number;
}

export default function DebateRoom() {
  const [gamePhase, setGamePhase] = useState<GamePhase>("preparation");
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes for preparation
  const [playerArgument, setPlayerArgument] = useState("");
  const [playerStance, setPlayerStance] = useState<"for" | "against">("for");
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "You", stance: "for" },
    { id: "2", name: "DebatePro", stance: "against" },
    { id: "3", name: "LogicSeeker", stance: "for" },
    { id: "4", name: "ConsensusBuilder", stance: "against" },
  ]);

  const proposition =
    "Artificial Intelligence should be regulated by governments before widespread deployment.";

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Auto-advance phase
          if (gamePhase === "preparation") {
            setGamePhase("debate");
            return 300; // 5 minutes for debate
          } else if (gamePhase === "debate") {
            setGamePhase("validation");
            return 180; // 3 minutes for validation
          } else if (gamePhase === "validation") {
            setGamePhase("results");
            return 0;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gamePhase]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getPhaseProgress = () => {
    const phases: GamePhase[] = ["preparation", "debate", "validation", "results"];
    return ((phases.indexOf(gamePhase) + 1) / phases.length) * 100;
  };

  const handleSubmitArgument = () => {
    if (playerArgument.trim()) {
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === "1" ? { ...p, argument: playerArgument } : p
        )
      );
      setGamePhase("validation");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="proposition-title text-4xl mb-4">{proposition}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-base">
                <Clock className="w-4 h-4 mr-2" />
                {formatTime(timeRemaining)}
              </Badge>
              <Badge variant="outline" className="text-base">
                <Users className="w-4 h-4 mr-2" />
                {players.length} Players
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-foreground/70 font-montserrat font-bold">
                {gamePhase.charAt(0).toUpperCase() + gamePhase.slice(1)} Phase
              </p>
              <Progress value={getPhaseProgress()} className="w-48 mt-2" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Argument Input / Display */}
          <div className="lg:col-span-2">
            {gamePhase === "preparation" && (
              <Card className="border-2 border-accent/30">
                <CardHeader>
                  <CardTitle>Prepare Your Argument</CardTitle>
                  <CardDescription>
                    Read the proposition and think about your position. You have{" "}
                    {Math.floor(timeRemaining / 60)} minutes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-montserrat font-bold mb-2">Your Stance</p>
                      <div className="flex gap-4">
                        <Button
                          variant={playerStance === "for" ? "default" : "outline"}
                          onClick={() => setPlayerStance("for")}
                          className={
                            playerStance === "for"
                              ? "bg-accent text-accent-foreground"
                              : ""
                          }
                        >
                          For
                        </Button>
                        <Button
                          variant={playerStance === "against" ? "default" : "outline"}
                          onClick={() => setPlayerStance("against")}
                          className={
                            playerStance === "against"
                              ? "bg-accent text-accent-foreground"
                              : ""
                          }
                        >
                          Against
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70 mb-2">
                        Think about your main points before writing.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {gamePhase === "debate" && (
              <Card className="border-2 border-accent/30">
                <CardHeader>
                  <CardTitle>Submit Your Argument</CardTitle>
                  <CardDescription>
                    Write your argument ({playerArgument.length}/500 characters). You have{" "}
                    {Math.floor(timeRemaining / 60)} minutes remaining.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Present your argument clearly and persuasively. Consider: clarity, logical flow, evidence, and counter-arguments..."
                      value={playerArgument}
                      onChange={(e) => setPlayerArgument(e.target.value.slice(0, 500))}
                      className="min-h-48 resize-none"
                    />
                    <div className="flex gap-4">
                      <Button
                        onClick={handleSubmitArgument}
                        disabled={!playerArgument.trim()}
                        className="flex-1 bg-accent text-accent-foreground hover:opacity-90"
                      >
                        Submit Argument
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Save Draft
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {gamePhase === "validation" && (
              <Card className="border-2 border-accent/30">
                <CardHeader>
                  <CardTitle>AI Validators Evaluating</CardTitle>
                  <CardDescription>
                    7 AI validators are reviewing arguments. Results in{" "}
                    {Math.floor(timeRemaining / 60)} minutes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Validator Ring Visualization */}
                    <div className="flex justify-center py-8">
                      <img
                        src="https://d2xsxph8kpxj0f.cloudfront.net/310519663432987603/X3beuKQ3L9TLkrn7Lk2Txs/validator-consensus-ring-UrVQk5FPM8mVx5UuBFQuj9.webp"
                        alt="Validator Consensus Ring"
                        className="w-64 h-64 object-contain"
                      />
                    </div>
                    <p className="text-center text-foreground/70">
                      Validators are analyzing clarity, coherence, persuasiveness, and evidence quality.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {gamePhase === "results" && (
              <Card className="border-2 border-accent/30">
                <CardHeader>
                  <CardTitle>Results & XP Distribution</CardTitle>
                  <CardDescription>
                    AI validators have reached consensus. Here are the results.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Your Result */}
                    <div className="bg-accent/10 p-6 rounded-lg border-2 border-accent/30">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-montserrat font-bold text-lg">Your Argument</h3>
                        <Badge className="bg-accent text-accent-foreground">
                          <Zap className="w-4 h-4 mr-1" />
                          +150 XP
                        </Badge>
                      </div>
                      <p className="text-foreground/80 mb-4 italic">"{playerArgument}"</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-foreground/70">Clarity</p>
                          <p className="font-bold text-lg">8.5/10</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/70">Coherence</p>
                          <p className="font-bold text-lg">8.2/10</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/70">Persuasiveness</p>
                          <p className="font-bold text-lg">7.8/10</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/70">Evidence</p>
                          <p className="font-bold text-lg">8.0/10</p>
                        </div>
                      </div>
                    </div>

                    {/* Other Players */}
                    {players
                      .filter((p) => p.id !== "1")
                      .map((player) => (
                        <div key={player.id} className="p-4 border-2 border-border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-montserrat font-bold">{player.name}</h4>
                            <Badge variant="outline">
                              <Zap className="w-4 h-4 mr-1" />
                              +{Math.floor(Math.random() * 100 + 50)} XP
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground/70">
                            Stance: <span className="font-bold">{player.stance.toUpperCase()}</span>
                          </p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right: Players & Leaderboard */}
          <div className="space-y-6">
            {/* Players in Room */}
            <Card>
              <CardHeader>
                <CardTitle>Players</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {players.map((player) => (
                    <div key={player.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-montserrat font-bold text-sm">{player.name}</p>
                        <p className="text-xs text-foreground/60">
                          {player.stance === "for" ? "✓ For" : "✗ Against"}
                        </p>
                      </div>
                      {player.argument && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { rank: 1, name: "DebateMaster", xp: 2850 },
                    { rank: 2, name: "LogicSeeker", xp: 2620 },
                    { rank: 3, name: "You", xp: 1950 },
                  ].map((entry) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center justify-between p-2 rounded ${
                        entry.name === "You" ? "bg-accent/20" : "bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-montserrat font-bold">#{entry.rank}</span>
                        <span className="text-sm">{entry.name}</span>
                      </div>
                      <span className="font-bold text-accent">{entry.xp} XP</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
