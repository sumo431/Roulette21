package com.example.roulette21;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class GameController {

    int currentNumber = 0;
    int players = 0;
    Random rand = new Random();

    @PostMapping("/start")
    public void start(@RequestParam int p) {
        players = p;
        currentNumber = 0;
    }

    @GetMapping("/turn")
    public Map<String, Object> turn(@RequestParam int step) {

        int player = rand.nextInt(players) + 1;
        boolean gameOver = false;
        Integer loser = null;

        for (int i = 0; i < step; i++) {
            currentNumber++;
            if (currentNumber == 21) {
                gameOver = true;
                loser = player; // 21を言った人が負け
                break;
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("player", player);
        response.put("step", step);
        response.put("number", currentNumber);
        response.put("gameOver", gameOver);

        if (gameOver) {
            response.put("loser", loser);
        }

        return response;
    }
}
