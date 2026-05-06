# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *
import json

class OptimisticOrator(gl.Contract):
    total_games: int
    total_xp_distributed: int
    leaderboard: dict[str, int]
    arguments: dict[str, dict]
    appeals: dict[str, dict]

    def __init__(self):
        self.total_games = 0
        self.total_xp_distributed = 0
        self.leaderboard = {}
        self.arguments = {}
        self.appeals = {}

    def _run_llm_evaluation(self, prompt: str) -> dict:
        try:
            result = LLM.call(prompt)
            return json.loads(result.strip())
        except:
            return {
                "clarity": 5, "coherence": 5, "persuasiveness": 5,
                "evidence": 5, "overall_score": 5.0,
                "feedback": "Evaluation error."
            }

    @gl.public.write
    def submit_argument(self, argument_id: str, player: str, proposition: str, stance: str, text: str):
        prompt = f"""
        Evaluate this debate argument fairly.

        Proposition: {proposition}
        Stance: {stance}
        Argument: {text}

        Return ONLY valid JSON:
        {{
          "clarity": <1-10>,
          "coherence": <1-10>,
          "persuasiveness": <1-10>,
          "evidence": <1-10>,
          "overall_score": <average>,
          "feedback": "short feedback"
        }}
        """
        scores = self._run_llm_evaluation(prompt)

        self.arguments[argument_id] = {
            "player": player,
            "proposition": proposition,
            "stance": stance,
            "text": text,
            "scores": scores,
            "final_score": scores["overall_score"]
        }

    @gl.public.write
    def submit_batch(self, proposition: str, submissions: list) -> dict:
        results = []
        for sub in submissions:
            arg_id = sub.get("argument_id", f"arg_{len(self.arguments)+1}")
            self.submit_argument(arg_id, sub["player"], proposition, sub["stance"], sub["text"])
            results.append(self.arguments[arg_id])

        self.total_games += 1
        return {"results": results, "status": "success"}

    @gl.public.write
    def distribute_xp(self, player: str, amount: int):
        if player not in self.leaderboard:
            self.leaderboard[player] = 0
        self.leaderboard[player] += amount
        self.total_xp_distributed += amount

    @gl.public.view
    def get_leaderboard(self, limit: int = 10) -> dict:
        sorted_lb = sorted(self.leaderboard.items(), key=lambda x: x[1], reverse=True)
        return dict(sorted_lb[:limit])

    @gl.public.view
    def get_stats(self) -> dict:
        return {
            "total_games": self.total_games,
            "total_xp_distributed": self.total_xp_distributed,
            "total_arguments": len(self.arguments)
  }
