package com.example.roulette21;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class GameController {

    int currentNumber = 0;
    List<String> players = new ArrayList<>();
    int currentPlayerIndex = 0;

    Random rand = new Random();

    // ===== Start =====
    @PostMapping("/start")
    public void start(@RequestBody List<String> names) {
        players = names;
        currentNumber = 0;
        currentPlayerIndex = rand.nextInt(players.size());
    }

    // ===== Next player =====
    @GetMapping("/next")
    public Map<String, Object> next() {
        currentPlayerIndex = rand.nextInt(players.size());

        Map<String, Object> res = new HashMap<>();
        res.put("playerName", players.get(currentPlayerIndex));
        res.put("number", currentNumber);
        return res;
    }

    // ===== Turn =====
    @GetMapping("/turn")
    public Map<String, Object> turn(@RequestParam int step) {
        boolean gameOver = false;

        for (int i = 0; i < step; i++) {
            currentNumber++;
            if (currentNumber == 21) {
                gameOver = true;
                break;
            }
        }

        Map<String, Object> res = new HashMap<>();
        res.put("playerName", players.get(currentPlayerIndex));
        res.put("number", currentNumber);
        res.put("gameOver", gameOver);

        if (gameOver) {
            res.put("loserName", players.get(currentPlayerIndex));
        }

        return res;
    }

    // ===== Reset =====
    @PostMapping("/reset")
    public void reset() {
        currentNumber = 0;
    }
}