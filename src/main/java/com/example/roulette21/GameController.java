package com.example.roulette21;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class GameController {

    int currentNumber = 0;
    int players = 0;
    int currentPlayer = 1;

    Random rand = new Random();

    // ===== Start =====
    @PostMapping("/start")
    public void start(@RequestParam int p) {
        players = p;
        currentNumber = 0;
        currentPlayer = rand.nextInt(players) + 1;
    }

    // ===== Decide next player BEFORE button press =====
    @GetMapping("/next")
    public Map<String, Object> next() {
        currentPlayer = rand.nextInt(players) + 1;

        Map<String, Object> res = new HashMap<>();
        res.put("player", currentPlayer);
        res.put("number", currentNumber);
        return res;
    }

    // ===== Apply +1 +2 +3 =====
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
        res.put("player", currentPlayer);
        res.put("step", step);
        res.put("number", currentNumber);
        res.put("gameOver", gameOver);

        if (gameOver) {
            res.put("loser", currentPlayer);
        }

        return res;
    }

    // ===== Reset =====
    @PostMapping("/reset")
    public void reset() {
        currentNumber = 0;
        currentPlayer = rand.nextInt(players) + 1;
    }
}