package com.qama.cookBook.recipe;

import com.qama.cookBook.security.JwtAuthenticationHelper;
import com.qama.cookBook.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private JwtAuthenticationHelper jwtAuthenticationHelper;

    @PostMapping("/create")
    public ResponseEntity<?> createRecipe(
            @RequestBody RecipeRequest request,
            @RequestHeader("Authorization") String authHeader) {
        try {
            User user = jwtAuthenticationHelper.getUserFromToken(authHeader);
            Recipe recipe = recipeService.createRecipe(request, user.getId());
            return ResponseEntity.ok(recipe);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
