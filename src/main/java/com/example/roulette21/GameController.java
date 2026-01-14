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
    public Map<String, Object> turn() {
        int player = rand.nextInt(players) + 1;
        int step = rand.nextInt(3) + 1;
        boolean gameOver = false;

        for (int i = 0; i < step; i++) {
            currentNumber++;
            if (currentNumber == 21) {
                gameOver = true;
                break;
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("player", player);
        response.put("step", step);
        response.put("number", currentNumber);
        response.put("gameOver", gameOver);

        if (gameOver) {
            response.put("winner", player);
        }

        return response;
    }
}
